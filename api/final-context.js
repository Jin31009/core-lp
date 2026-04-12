import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.RA_CONTEXT_MODEL || "gpt-5.4-mini";

function cleanText(value) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim();
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

function buildUserPrompt({
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

const SYSTEM_PROMPT = `
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

const OUTPUT_SCHEMA = {
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

    const userPrompt = buildUserPrompt({
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
          content: [{ type: "input_text", text: SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: userPrompt }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          ...OUTPUT_SCHEMA,
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

    return res.status(200).json({
      finalContext: normalizeFinalContext(parsed.finalContext),
    });
  } catch (error) {
    console.error("final-context error:", error);

    return res.status(500).json({
      error: "AIによるFinal Context生成に失敗しました。",
      finalContext:
        "補足情報を踏まえると、表面上は不満や怒りとして現れていても、その背景には説明内容そのものへの拒否というより、自分の状況として十分に受け取れないまま不安や距離感が強まっていた可能性がある。やり取りの緊張は、情報不足だけでなく、説明と本人の理解実感がうまく接続しなかったことに由来していたと考えられる。",
    });
  }
}