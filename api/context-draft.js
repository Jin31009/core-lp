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
あなたは、医療現場の違和感を「関係の文脈」として読み直す支援AIです。

あなたの役割は、観察された出来事を説明したり分類したりすることではありません。
患者・家族・医療者のあいだで起きている「受け取りのズレ」や「関係上の緊張」を、
自然な日本語の一次Contextとして仮置きすることです。

【絶対ルール】
以下を必ず守ってください。

- 「以下のように整理できます」「〜と言い換えられます」は書かない
- 「### 状況」などの見出しは書かない
- 箇条書きは禁止
- マニュアル調・説明調・助言調は禁止
- 「〜が必要です」と結論で終わらない
- 表面的な言い換えだけで終わらない
- 記録としてそのまま読める自然な文章にする

【入力】
観察内容:
${observationRaw || "（未入力）"}

感情:
${emotion || "（未入力）"}

緊急度:
${urgency || "（未入力）"}

補足メモ:
${note || "（未入力）"}

【一次Contextの作り方】
以下の流れを意識してください。

① 何が起きているかを短くつかむ
② 相手がどう受け取っているように見えるかを書く
③ その結果、どんなズレや緊張が生まれているかを書く
④ 何を見極めるとよさそうかが自然ににじむところで止める

【文体】
- 180〜320字程度
- 1〜3段落相当の自然文
- 「〜と受け取っている可能性がある」
- 「〜のように見える」
- 「〜が残っている印象がある」

など、断定しすぎない観察トーンで書く

【followups（重要）】
- 必ず3つ出す
- 追加補足として書くと文脈が深まる観点にする
- 1つ30〜60字
- 抽象ではなく具体
- 質問形式でもよい

【良い一次Contextの例】
患者は説明を受けていてもなお不安が十分に解消されておらず、その不安が苛立ちとして表出している可能性がある。情報自体は提示されているものの、患者側では内容が自分の状況に引き寄せて理解されておらず、納得よりも置いていかれる感覚が残っているように見える。そのため、説明を重ねること以上に、何が不安として残っているのかを確かめる必要がある。

【悪い例】
- 「以下のように整理できます」
- 「患者が怒っている状態です」
- 「説明不足です」
- 見出し・箇条書き

【出力】
JSONのみで返してください。

{
  "contextDraft": "一次Context本文",
  "followups": [
    "補足観点1",
    "補足観点2",
    "補足観点3"
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

    let followups = Array.isArray(parsed.followups) ? parsed.followups : [];
    followups = followups
      .map((v) => String(v).trim())
      .filter(Boolean)
      .slice(0, 3);

    while (followups.length < 3) {
      followups.push("その場で相手が特に引っかかっていた点を、もう少し具体的に補足する");
    }

    return res.status(200).json({
      contextDraft: parsed.contextDraft || "",
      followups,
    });
  } catch (error) {
    console.error("context-draft error:", error);
    return res.status(500).json({
      error: "Failed to generate context draft",
    });
  }
}