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
    "患者さんはやり取りの中で何らかの引っかかりや不安を抱えたままになっている可能性がある。説明自体は行われているものの、その内容が自分の状況として十分に結びついて理解されておらず、納得感よりも距離感や置いていかれる感覚が残っているようにも見える。そのため、情報を追加する前に、どの部分で理解や受け取りにずれが生じているのかを丁寧に見極める必要がある。";

  if (typeof text !== "string") return fallback;

  const normalized = text
    .replace(/^「|」$/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/^\s*[-*・]\s*/gm, "")
    .replace(/以下のように整理できます。?/g, "")
    .replace(/整理すると/gi, "")
    .replace(/記録向け|共有向け|申し送り向け|用途別/gi, "")
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

【一次Contextの構造】
次の4要素が、文章の中に自然に含まれていること。
1. 何が起きているか
2. どう受け取られているか
3. 関係のずれ・緊張
4. 次に何を見極めるかが自然ににじむこと

【文体ルール】
- 必ず自然文で書く
- 観察記録として読める文章にする
- 断定しすぎず、「可能性がある」「ように見える」を適切に使う
- ただし曖昧に逃げすぎない
- 助言しない
- 指導しない
- 結論を言い切らない
- 診断しない
- 責任追及しない
- 相手を単純化しない
- 一段落でも複数段落でもよいが、箇条書きは禁止

【禁止】
- 「以下のように整理できます」
- 「###」などの見出し
- 箇条書き
- 用途説明（記録向け、共有向け、申し送り向け など）
- 「患者が怒っている状態です」のような単純断定
- 「〜すべきです」「〜してください」などの助言
- メタ説明
- 過度に整いすぎた報告書調

【followups のルール】
- 必ず3件
- すべて日本語
- UIでそのまま選択される自然な問いにする
- 単なる一般論にしない
- このケースで次に補足すべき観察点を示す
- 関係のずれを見極める方向を持たせる
- 短すぎない
- 深掘りを誘発する

【重要】
- 説明AIにならない
- 要約AIにならない
- 相談助言AIにならない
- 「関係解釈AI」として振る舞う
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
        description: "自然文の一次Context",
      },
      followups: {
        type: "array",
        description: "次に補足すべき観察ポイント。必ず3件。",
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

    const userPrompt = buildUserPrompt({
      observationRaw,
      emotion,
      urgency,
      note,
    });

    const response = await client.responses.create({
      model: MODEL,
      reasoning: { effort: "medium" },
      temperature: 0.3,
      max_output_tokens: 700,
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
          "患者さんはやり取りの中で何らかの引っかかりや不安を抱えたままになっている可能性がある。説明自体は行われているものの、その内容が自分の状況として十分に結びついて理解されておらず、納得感よりも距離感や置いていかれる感覚が残っているようにも見える。そのため、情報を追加する前に、どの部分で理解や受け取りにずれが生じているのかを丁寧に見極める必要がある。",
        followups: [
          "患者さんは、どの説明のあとで反応が変わったように見えましたか？",
          "内容そのものではなく、伝わり方や順番に引っかかりがあった可能性はありますか？",
          "患者さんが繰り返し気にしていた言葉や場面はありましたか？",
        ],
      };
    }

    const contextDraft = normalizeContextDraft(parsed.contextDraft);
    const followups = normalizeFollowups(parsed.followups);

    return res.status(200).json({
      contextDraft,
      followups,
      meta: {
        model: MODEL,
      },
    });
  } catch (error) {
    console.error("context-draft error:", error);

    return res.status(500).json({
      error: "AIによる一次Context生成に失敗しました。",
      details:
        process.env.NODE_ENV === "development"
          ? String(error?.message || error)
          : undefined,
      contextDraft:
        "患者さんはやり取りの中で何らかの引っかかりや不安を抱えたままになっている可能性がある。説明自体は行われているものの、その内容が自分の状況として十分に結びついて理解されておらず、納得感よりも距離感や置いていかれる感覚が残っているようにも見える。そのため、情報を追加する前に、どの部分で理解や受け取りにずれが生じているのかを丁寧に見極める必要がある。",
      followups: [
        "患者さんは、どの説明のあとで反応が変わったように見えましたか？",
        "内容そのものではなく、伝わり方や順番に引っかかりがあった可能性はありますか？",
        "患者さんが繰り返し気にしていた言葉や場面はありましたか？",
      ],
      meta: {
        model: MODEL,
      },
    });
  }
}