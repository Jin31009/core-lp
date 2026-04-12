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
      contextNote = "",
    } = req.body || {};

    const prompt = `
あなたは、医療現場の観察記録を「関係の文脈」として一次整理する支援AIです。
以下の入力をもとに、観察情報をそのまま言い換えるのではなく、
状況・受け取り・関係上の緊張が自然に読める短い文章へ整えてください。

【入力情報】
観察内容:
${observationRaw || "（未入力）"}

感情トーン:
${emotion || "（未入力）"}

緊急度:
${urgency || "（未入力）"}

補足メモ:
${contextNote || "（未入力）"}

【出力ルール】
- 日本語で書く
- 箇条書きにしない
- 見出しや ### や記号を出さない
- 180〜320字程度
- 「患者が怒っている」などの表面情報だけで終わらせず、
  その背景にある受け取り方や、関係上の緊張がにじむようにまとめる
- 断定しすぎず、「〜と受け取っている可能性がある」「〜への不満が高まっているように見える」などの書き方を適度に使う
- 説明文ではなく、記録としてそのまま読める自然な文章にする
- 余計な前置き（「以下のように整理できます」等）は書かない
- 出力は JSON のみ

【JSON形式】
{
  "contextDraft": "ここに一次整理の本文"
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
      };
    }

    return res.status(200).json({
      contextDraft: parsed.contextDraft || "",
    });
  } catch (error) {
    console.error("context-draft error:", error);
    return res.status(500).json({
      error: "Failed to generate context draft",
    });
  }
}