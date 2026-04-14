import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = 8787;

app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY が設定されていません");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.RA_CONTEXT_MODEL || "gpt-5.4-mini";

function cleanText(value) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim();
}

function normalizeContextDraft(text) {
  const fallback =
    "患者さんはやり取りの中で何らかの引っかかりや不安を抱えたままになっている可能性がある。説明自体は行われているものの、その内容が自分の状況として十分に結びついて理解されておらず、納得感よりも距離感や置いていかれる感覚が残っているようにも見える。そのため、どの部分で理解や受け取りにずれが生じているのかを、もう少し具体的に見極める必要がある。";

  if (typeof text !== "string") return fallback;

  const normalized = text
    .replace(/^「|」$/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/^\s*[-*・]\s*/gm, "")
    .replace(/以下のように整理できます。?/g, "")
    .replace(/以下のように言えます。?/g, "")
    .replace(/整理すると/gi, "")
    .replace(/記録向け|共有向け|申し送り向け|用途別|原因別/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return normalized || fallback;
}

function normalizeFollowups(list) {
  const fallback = [
    "患者さんは、どの説明のあとで反応が変わったように見えましたか？",
    "内容そのものではなく、伝わり方や順番に引っかかりがあった可能性はありますか？",
    "患者さんが繰り返し気にしていた言葉や場面はありましたか？",
  ];

  if (!Array.isArray(list)) return fallback;

  const normalized = list
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);

  while (normalized.length < 3) {
    normalized.push(fallback[normalized.length]);
  }

  return normalized;
}

function normalizeFinalContext(text) {
  const fallback =
    "補足情報を踏まえると、表面上は不満や怒りとして現れていても、その背景には説明内容そのものへの拒否というより、自分の状況として十分に受け取れないまま不安や距離感が強まっていた可能性がある。やり取りの緊張は、情報不足だけでなく、説明と本人の理解実感がうまく接続しなかったことに由来していたと考えられる。";

  if (typeof text !== "string") return fallback;

  const normalized = text
    .replace(/^「|」$/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/^\s*[-*・]\s*/gm, "")
    .replace(/以下のように整理できます。?/g, "")
    .replace(/以下のように言えます。?/g, "")
    .replace(/整理すると/gi, "")
    .replace(/記録向け|共有向け|申し送り向け|用途別|原因別/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return normalized || fallback;
}

function buildContextPrompt({ observationRaw, emotion, urgency, note }) {
  return [
    "【観察メモ】",
    observationRaw || "（未入力）",
    "",
    "【観察者メモ】",
    `感情トーン: ${emotion || "未入力"}`,
    `緊急度: ${urgency || "未入力"}`,
    `補足: ${note || "なし"}`,
    "",
    "【タスク】",
    "この観察を、説明や要約ではなく、関係の状態として読み直してください。",
    "一次Contextは自然文で書き、観察記録としてそのまま読める文章にしてください。",
    "そのうえで、次に補足すべき観察ポイントを3件だけ生成してください。",
  ].join("\n");
}

function buildFinalContextPrompt({
  observationRaw,
  contextDraft,
  selectedFollowups,
  userFollowupNote,
  note,
}) {
  const followupText = Array.isArray(selectedFollowups)
    ? selectedFollowups.filter(Boolean).join("\n- ")
    : "";

  return [
    "【観察メモ】",
    observationRaw || "（未入力）",
    "",
    "【一次Context】",
    contextDraft || "（未入力）",
    "",
    "【選択されたfollowups】",
    followupText ? `- ${followupText}` : "（なし）",
    "",
    "【補足入力】",
    userFollowupNote || "（なし）",
    "",
    "【追加メモ】",
    note || "（なし）",
    "",
    "【タスク】",
    "一次Contextと補足情報を統合し、より確からしい関係理解へ整えてください。",
    "これは応答文ではなく、Step2分析へ渡すためのFinal Contextです。",
  ].join("\n");
}

const CONTEXT_SYSTEM_PROMPT = `
あなたは RA-SS（Relational Architecture Sensing System）の一次Context生成エンジンです。
あなたの役割は、出来事を説明することではありません。
観察された違和感を、関係の状態として読み直すことです。

【最重要Goal】
一次Contextとは、
「観察された違和感を、関係の状態として読み直し、
次に何を補足すべきかが自然に立ち上がる文」
です。

【役割定義】
この出力は未完成でよい。
目的は、関係の仮説を立ち上げることであり、完成した理解を提示することではない。

【一次Contextの構造】
以下の4要素を、自然文の中ににじませること。

1. 何が起きているか
2. どう受け取られている可能性があるか
3. 関係のずれ・緊張・距離
4. 次に何を見極める必要があるか

【文体ルール】
- 必ず自然文で書く
- 観察記録としてそのまま読める文章にする
- 「可能性がある」「ように見える」を適切に使う
- ただし曖昧に逃げすぎない
- 説明調・解説調にしない
- メタ表現を書かない

【禁止】
- 「以下のように整理できます」
- 「以下のように言えます」
- 箇条書き
- 見出し（###など）
- 用途説明（記録向け、共有向け、申し送り向け など）
- 単純な感情ラベル化（例：「怒っている状態です」）
- 助言・指導（〜すべき）
- 結論の確定
- 応答案の提示

【重要制約】
入力が抽象的（例：「怒っている」「不満がある」など）の場合でも、
説明や分類に逃げてはいけない。
必ず、やり取りの場面を仮定し、関係の状態として読み直すこと。
単語の説明や分類に逃げることは禁止。

【停止ルール（最重要）】
この出力は未完成で止めること。
- 原因を確定しない
- 状況を閉じない
- 応答方針に進まない
文末は、「次に何を確かめる必要があるか」が自然に立ち上がる位置で止めること。

【followupsのルール】
- 必ず3件
- すべて日本語
- このケースで次に補足すべき観察ポイントにする
- 単なる一般論は禁止
- UIでそのまま選択できる自然な問いにする

【出力形式】
必ずJSONのみを返すこと。コードフェンス禁止。マークダウン禁止。

{
  "contextDraft": "自然文の一次Context",
  "followups": [
    "補足観察ポイント1",
    "補足観察ポイント2",
    "補足観察ポイント3"
  ]
}
`.trim();

const FINAL_SYSTEM_PROMPT = `
あなたは RA-SS（Relational Architecture Sensing System）の分析前処理エンジンです。

あなたの役割は、
一次Contextと補足情報を統合し、
より確からしい関係理解へ整理することです。

ただし、これはまだ応答ではなく、
分析（Step2）に渡すための整理された関係理解です。

【最重要Goal】
Final Contextとは、
「一次Contextの仮説を、補足情報によって調整し、
関係のずれの焦点が一段明確になった状態」
です。

【役割定義】
- 一次Context = 仮説（未完成）
- Final Context = 仮説の再統合（中間完成）

【入力として扱う情報】
- 観察メモ
- 一次Context
- followupsへの応答
- 補足記述

【やること】
1. 一次Contextの仮説を受け取る
2. 補足情報によってズレの位置を見直す
3. 関係の緊張や距離の焦点を少し絞る
4. 次の分析に渡せる粒度に整える

【出力に含める要素】
- 起きている関係の状態
- ズレや緊張の焦点
- 表面感情の背後にある構造
- 仮説としての一貫性

【文体ルール】
- 必ず自然文で書く
- 箇条書きにしない
- 一次Contextより少し整理されている
- ただし説明文にしない
- 断定しすぎないが、焦点はぼかしすぎない
- 個人の意図や悪意を決めつけない
- 責任追及に寄せない
- 「〜に見える」「〜可能性がある」を適切に使う

【禁止】
- 応答文を書くこと
- 助言を書くこと
- 「〜すべき」と書くこと
- 一次Contextの言い換えだけにすること
- 長文化だけすること
- 分析ラベル（APCE、SRPLなど）を出すこと
- メタ説明
- 用途説明
- 個人攻撃的な断定
- 「心ない発言」「尊重していない」などの断定表現

【統合ルール（最重要）】
- 一次Contextの単純な繰り返しは禁止
- 補足によって何が変わったかを反映すること
- ズレの焦点が少し絞られていること
- 関係理解として一段締まっていること
- ただし、言い切りすぎず仮説として開いておくこと

【理想の出力イメージ】
患者さんの怒りは、単なる説明不足への反応というより、やり取りの中で受け止められていない感覚が強まった状態として表れている可能性がある。表面は強い反発として出ているが、その奥には「もう分かってもらえない」という諦めに近いトーンが混じっており、対立というより信頼に至る手前で関係が冷えているようにも見える。ズレの焦点は説明内容そのものより、言葉の受け取られ方や関わりの積み重ねにあり、納得できていないというより、関係の中で十分に尊重されていないと感じる方向に傾いている可能性がある。

【文末ルール】
- 状態がある程度まとまっている
- しかし完全な断定ではない
- 応答方針には進まない

【出力形式】
必ずJSONのみを返すこと。コードフェンス禁止。マークダウン禁止。

{
  "finalContext": "統合された関係理解の自然文"
}
`.trim();

const CONTEXT_OUTPUT_SCHEMA = {
  name: "ra_context_draft",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      contextDraft: {
        type: "string",
      },
      followups: {
        type: "array",
        items: {
          type: "string",
        },
        minItems: 3,
        maxItems: 3,
      },
    },
    required: ["contextDraft", "followups"],
  },
};

const FINAL_OUTPUT_SCHEMA = {
  name: "ra_final_context",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      finalContext: {
        type: "string",
      },
    },
    required: ["finalContext"],
  },
};

app.post("/api/context-draft", async (req, res) => {
  try {
    const body = req.body || {};
    const observationRaw = cleanText(body.observationRaw);
    const emotion = cleanText(body.emotion);
    const urgency = cleanText(body.urgency);
    const note = cleanText(body.note);

    if (!observationRaw) {
      return res.status(400).json({
        error: "observationRaw is required",
      });
    }

    const userPrompt = buildContextPrompt({
      observationRaw,
      emotion,
      urgency,
      note,
    });

    const response = await client.responses.create({
      model: MODEL,
      reasoning: { effort: "medium" },
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: CONTEXT_SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: userPrompt }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          ...CONTEXT_OUTPUT_SCHEMA,
        },
      },
      max_output_tokens: 700,
    });

    let parsed = null;

    try {
      parsed = JSON.parse(response.output_text || "{}");
    } catch {
      parsed = null;
    }

    if (!parsed || typeof parsed !== "object") {
      parsed = {
        contextDraft:
          "患者さんはやり取りの中で何らかの引っかかりや不安を抱えたままになっている可能性がある。説明自体は行われているものの、その内容が自分の状況として十分に結びついて理解されておらず、納得感よりも距離感や置いていかれる感覚が残っているようにも見える。そのため、どの部分で理解や受け取りにずれが生じているのかを、もう少し具体的に見極める必要がある。",
        followups: [
          "患者さんは、どの説明のあとで反応が変わったように見えましたか？",
          "内容そのものではなく、伝わり方や順番に引っかかりがあった可能性はありますか？",
          "患者さんが繰り返し気にしていた言葉や場面はありましたか？",
        ],
      };
    }

    return res.json({
      contextDraft: normalizeContextDraft(parsed.contextDraft),
      followups: normalizeFollowups(parsed.followups),
    });
  } catch (error) {
    console.error("OpenAI error (context-draft):", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : "AI生成エラー",
      contextDraft:
        "患者さんはやり取りの中で何らかの引っかかりや不安を抱えたままになっている可能性がある。説明自体は行われているものの、その内容が自分の状況として十分に結びついて理解されておらず、納得感よりも距離感や置いていかれる感覚が残っているようにも見える。そのため、どの部分で理解や受け取りにずれが生じているのかを、もう少し具体的に見極める必要がある。",
      followups: [
        "患者さんは、どの説明のあとで反応が変わったように見えましたか？",
        "内容そのものではなく、伝わり方や順番に引っかかりがあった可能性はありますか？",
        "患者さんが繰り返し気にしていた言葉や場面はありましたか？",
      ],
    });
  }
});

app.post("/api/final-context", async (req, res) => {
  try {
    const body = req.body || {};
    const observationRaw = cleanText(body.observationRaw);
    const contextDraft = cleanText(body.contextDraft || body.primaryContextDraft);
    const userFollowupNote = cleanText(body.userFollowupNote || body.contextEdited);
    const note = cleanText(body.note);
    const selectedFollowups = Array.isArray(body.selectedFollowups)
      ? body.selectedFollowups.map((item) => cleanText(String(item))).filter(Boolean)
      : [];

    if (!observationRaw && !contextDraft) {
      return res.status(400).json({
        error: "observationRaw or contextDraft is required",
      });
    }

    const userPrompt = buildFinalContextPrompt({
      observationRaw,
      contextDraft,
      selectedFollowups,
      userFollowupNote,
      note,
    });

    const response = await client.responses.create({
      model: MODEL,
      reasoning: { effort: "medium" },
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: FINAL_SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: userPrompt }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          ...FINAL_OUTPUT_SCHEMA,
        },
      },
      max_output_tokens: 700,
    });

    let parsed = null;

    try {
      parsed = JSON.parse(response.output_text || "{}");
    } catch {
      parsed = null;
    }

    if (!parsed || typeof parsed !== "object" || !parsed.finalContext) {
      parsed = {
        finalContext:
          "補足情報を踏まえると、表面上は不満や怒りとして現れていても、その背景には説明内容そのものへの拒否というより、自分の状況として十分に受け取れないまま不安や距離感が強まっていた可能性がある。やり取りの緊張は、情報不足だけでなく、説明と本人の理解実感がうまく接続しなかったことに由来していたと考えられる。",
      };
    }

    return res.json({
      finalContext: normalizeFinalContext(parsed.finalContext),
      analysis: {
        MAX_DELTA: 3,
        Trigger: "Yes",
        AK_Primary: "R",
        APCE_Miss: "E",
        R_Failure: "ミスマッチ",
        Case_Phase: "Trigger時"
      }
    });
  } catch (error) {
    console.error("OpenAI error (final-context):", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : "AI生成エラー",
      finalContext:
        "補足情報を踏まえると、表面上は不満や怒りとして現れていても、その背景には説明内容そのものへの拒否というより、自分の状況として十分に受け取れないまま不安や距離感が強まっていた可能性がある。やり取りの緊張は、情報不足だけでなく、説明と本人の理解実感がうまく接続しなかったことに由来していたと考えられる。",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
