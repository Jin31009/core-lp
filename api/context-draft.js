import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.RA_CONTEXT_MODEL || "gpt-5.4-mini";

const FALLBACK_CONTEXT_DRAFT =
  "患者さんはやり取りの中で何らかの引っかかりや不安を抱えたままになっている可能性がある。説明自体は行われているものの、その内容が自分の状況として十分に結びついて理解されておらず、納得感よりも距離感や置いていかれる感覚が残っているようにも見える。そのため、どの部分で理解や受け取りにずれが生じているのかを、もう少し具体的に見極める必要がある。";

const FALLBACK_FOLLOWUPS = [
  "患者さんは、どの説明のあとで反応が変わったように見えましたか？",
  "内容そのものではなく、伝わり方や順番に引っかかりがあった可能性はありますか？",
  "患者さんが繰り返し気にしていた言葉や場面はありましたか？",
];

const CONTEXT_SYSTEM_PROMPT = `あなたは医療・ケア現場の観察メモを短く整理するアシスタントです。
出力は必ずJSONのみで返してください。

ルール:
- contextDraft は日本語で2〜4文
- 断定しすぎず、観察から推測できる範囲に留める
- followups は日本語の短い確認質問を2〜3件
- マークダウンや見出しやコードブロックは使わない`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
    }

    const body = req.body || {};
    const observationRaw = cleanText(body.observationRaw);
    const emotion = cleanText(body.emotion);
    const urgency = cleanText(body.urgency);
    const note = cleanText(body.note);

    if (!observationRaw) {
      return res.status(400).json({ error: "observationRaw is required" });
    }

    const response = await client.responses.create({
      model: MODEL,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: CONTEXT_SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: buildContextPrompt({ observationRaw, emotion, urgency, note }) }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "context_draft_response",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              contextDraft: { type: "string" },
              followups: {
                type: "array",
                items: { type: "string" },
                minItems: 2,
                maxItems: 3,
              },
            },
            required: ["contextDraft", "followups"],
          },
        },
      },
      max_output_tokens: 700,
    });

    const parsed = parseResponsePayload(response.output_text);

    return res.status(200).json({
      contextDraft: normalizeContextDraft(parsed?.contextDraft),
      followups: normalizeFollowups(parsed?.followups),
    });
  } catch (error) {
    console.error("context-draft error:", error);

    return res.status(500).json({
      error: error instanceof Error ? error.message : "AI処理失敗",
      contextDraft: FALLBACK_CONTEXT_DRAFT,
      followups: FALLBACK_FOLLOWUPS,
    });
  }
}

function cleanText(value) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim();
}

function buildContextPrompt({ observationRaw, emotion, urgency, note }) {
  return [
    `観察:\n${observationRaw}`,
    `感情:\n${emotion || "未入力"}`,
    `緊急度:\n${urgency || "未入力"}`,
    `補足:\n${note || "未入力"}`,
  ].join("\n\n");
}

function parseResponsePayload(text) {
  if (typeof text !== "string" || !text.trim()) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function normalizeContextDraft(text) {
  if (typeof text !== "string") return FALLBACK_CONTEXT_DRAFT;

  const normalized = text
    .replace(/^「|」$/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/^\s*[-*・]\s*/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return normalized || FALLBACK_CONTEXT_DRAFT;
}

function normalizeFollowups(list) {
  if (!Array.isArray(list)) return [...FALLBACK_FOLLOWUPS];

  const normalized = list
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);

  while (normalized.length < 3) {
    normalized.push(FALLBACK_FOLLOWUPS[normalized.length]);
  }

  return normalized;
}
