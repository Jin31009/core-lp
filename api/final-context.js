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
      contextNote = "",
    } = req.body || {};

    const prompt = `
あなたは、医療現場の観察情報を「最終Context」として整える支援AIです。
以下の材料をもとに、状況・患者側の受け取り・関係上の緊張・次に見ておくべき含意が、
自然な日本語で一続きに読める文章へまとめてください。

【観察内容】
${observationRaw || "（未入力）"}

【感情トーン】
${emotion || "（未入力）"}

【緊急度】
${urgency || "（未入力）"}

【一次整理】
${primaryContextDraft || "（未入力）"}

【編集後Context】
${contextEdited || "（未入力）"}

【補足メモ】
${contextNote || "（未入力）"}

【出力ルール】
- 日本語で書く
- 箇条書きにしない
- 見出しや ### や記号を出さない
- 260〜420字程度
- 観察事実を踏まえつつ、患者や家族がどう受け取っているか、
  その結果どんな関係上の緊張が生まれているかが読めるようにする
- 「何が起きたか」だけでなく、「なぜその反応になっているように見えるか」までにじませる
- ただし断定しすぎず、観察記録として使える慎重なトーンを保つ
- 最後に、今後の対応や観察で焦点になりそうな点が自然に含まれるようにする
- 余計な前置き（「最終整理します」「以下です」など）は書かない
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