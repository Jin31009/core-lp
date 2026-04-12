import OpenAI from "openai";

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

function buildUserPrompt({ observationRaw, emotion, urgency, note }) {
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

const SYSTEM_PROMPT = `
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

const OUTPUT_SCHEMA = {
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const startedAt = Date.now();

  try {
    const body = req.body || {};
    const observationRaw = cleanText(body.observationRaw);
    const emotion = cleanText(body.emotion);
    const urgency = cleanText(body.urgency);
    const note = cleanText(body.note);

    console.log("CONTEXT_DRAFT_INPUT:", {
      model: MODEL,
      observationRaw,
      emotion,
      urgency,
      note,
      timestamp: new Date().toISOString(),
    });

    if (!observationRaw) {
      console.warn("CONTEXT_DRAFT_BAD_REQUEST:", {
        reason: "observationRaw is required",
      });

      return res.status(400).json({
        error: "observationRaw is required",
      });
    }

    const userPrompt = buildUserPrompt({
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
    } catch (parseError) {
      console.error("CONTEXT_DRAFT_PARSE_ERROR:", {
        message: parseError instanceof Error ? parseError.message : "Unknown parse error",
        outputText: response.output_text || "",
      });
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

    const normalizedOutput = {
      contextDraft: normalizeContextDraft(parsed.contextDraft),
      followups: normalizeFollowups(parsed.followups),
    };

    console.log("CONTEXT_DRAFT_OUTPUT:", {
      durationMs: Date.now() - startedAt,
      output: normalizedOutput,
    });

    return res.status(200).json(normalizedOutput);
  } catch (error) {
    console.error("CONTEXT_DRAFT_ERROR:", {
      durationMs: Date.now() - startedAt,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return res.status(500).json({
      error: "AIによる一次Context生成に失敗しました。",
      contextDraft:
        "患者さんはやり取りの中で何らかの引っかかりや不安を抱えたままになっている可能性がある。説明自体は行われているものの、その内容が自分の状況として十分に結びついて理解されておらず、納得感よりも距離感や置いていかれる感覚が残っているようにも見える。そのため、どの部分で理解や受け取りにずれが生じているのかを、もう少し具体的に見極める必要がある。",
      followups: [
        "患者さんは、どの説明のあとで反応が変わったように見えましたか？",
        "内容そのものではなく、伝わり方や順番に引っかかりがあった可能性はありますか？",
        "患者さんが繰り返し気にしていた言葉や場面はありましたか？",
      ],
    });
  }
}