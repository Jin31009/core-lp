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
目的は、単なる要約ではなく、状況・受け取り・関係上の緊張が自然に読める短い文章へ整えることです。
さらに、追加補足として何を書くと文脈が深まるかを簡潔に示してください。

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
- 箇条書きにしない
- 見出しや ### や記号を出さない
- 「一次Context」は180〜320字程度
- 状況説明だけで終わらせず、患者や家族がどう受け取っているか、
  何に違和感や不満が集まっているかが自然ににじむように書く
- 断定しすぎず、「〜と受け取っている可能性がある」「〜への不安や不満が高まりつつあるように見える」など、
  記録として使える慎重なトーンにする
- 「追加補足の方向」は1〜2文で、
  このあと何を追記すると文脈理解が深まるかを示す
- 余計な前置き（「以下のように整理できます」等）は書かない
- 出力は JSON のみ

【JSON形式】
{
  "contextDraft": "ここに一次Context本文",
  "followupGuide": "ここに追加補足の方向"
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
        followupGuide: "",
      };
    }

    return res.status(200).json({
      contextDraft: parsed.contextDraft || "",
      followupGuide: parsed.followupGuide || "",
    });
  } catch (error) {
    console.error("context-draft error:", error);
    return res.status(500).json({
      error: "Failed to generate context draft",
    });
  }
}