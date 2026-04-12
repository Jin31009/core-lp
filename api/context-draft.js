import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      observationRaw = "",
      emotion = "",
      urgency = "",
      note = "",
    } = req.body || {};

    const prompt = `
あなたは、医療現場の観察情報を「一次Context」として整理する支援AIです。
目的は、観察内容を自然な文章で一次整理し、さらに追加補足として深めるための観点を短い候補で示すことです。

【入力情報】
観察内容:
${observationRaw || "（未入力）"}

感情トーン:
${emotion || "（未入力）"}

緊急度:
${urgency || "（未入力）"}

補足メモ:
${note || "（未入力）"}

【出力ルール】
- 日本語で書く
- 一次Contextは箇条書きにしない
- 見出しや ### や記号を出さない
- 一次Contextは180〜320字程度
- 状況だけでなく、患者や家族がどう受け取っているか、
  何に違和感や不満が集まっているかが自然ににじむように書く
- 断定しすぎず、観察記録として使える慎重なトーンにする
- followups は 2〜3個
- followups は「このあと追加補足として書くとよい観点」を、短い一文で返す
- followups は箇条書き用の短文にする
- 出力は JSON のみ

【JSON形式】
{
  "contextDraft": "ここに一次Context本文",
  "followups": [
    "ここに補足候補1",
    "ここに補足候補2",
    "ここに補足候補3"
  ]
}
`.trim();

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: prompt,
    });

    const text = response.output_text || "{}";

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        contextDraft: text,
        followups: [],
      };
    }

    return res.status(200).json({
      contextDraft: parsed.contextDraft || "",
      followups: Array.isArray(parsed.followups) ? parsed.followups : [],
    });
  } catch (error) {
    console.error("context-draft error:", error);
    return res.status(500).json({
      error: "Failed to generate context draft",
    });
  }
}