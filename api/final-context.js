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
      primaryContextDraft = "",
      contextEdited = "",
      note = "",
    } = req.body || {};

    const prompt = `
あなたは、医療現場の観察情報を「最終Context」として整える支援AIです。
目的は、状況・患者や家族の受け取り・関係上の緊張・今後の観察や対応で焦点になる点が、
自然な日本語の一続きの文章として読めるようにすることです。

【観察内容】
${observationRaw || "（未入力）"}

【感情トーン】
${emotion || "（未入力）"}

【緊急度】
${urgency || "（未入力）"}

【一次Context】
${primaryContextDraft || "（未入力）"}

【編集後Context】
${contextEdited || "（未入力）"}

【補足メモ】
${note || "（未入力）"}

【出力ルール】
- 日本語で書く
- 箇条書きにしない
- 見出しや ### や記号を出さない
- 260〜420字程度
- 観察事実だけでなく、相手がどう受け止めているか、
  その結果どのような関係上の緊張が生まれているかが読めるようにする
- なぜそうした反応になっているように見えるかを、断定しすぎずににじませる
- 最後に、今後の対応や観察で何が焦点になるかが自然に含まれるようにする
- 「以下のように整理します」「最終Contextです」などの前置きは不要
- 出力は JSON のみ

【JSON形式】
{
  "finalContext": "ここに最終Context本文"
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
        finalContext: text,
      };
    }

    return res.status(200).json({
      finalContext: parsed.finalContext || "",
    });
  } catch (error) {
    console.error("final-context error:", error);
    return res.status(500).json({
      error: "Failed to generate final context",
    });
  }
}