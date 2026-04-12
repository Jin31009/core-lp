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
役割は、観察された出来事を単に説明したり分類したりすることではなく、
患者・家族・医療者のあいだで、どのような受け取りのズレや関係上の緊張が生まれているかを、
自然な日本語の一次Contextとして整理することです。

【絶対条件】
- 出力は説明メモではなく、観察記録としてそのまま読める自然な文章にする
- 「以下のように整理できます」「〜と言い換えられます」などの前置きは禁止
- 「### 状況」「### 状態」などの見出しは禁止
- 箇条書きは禁止
- 用途説明（記録向け、報告向け、柔らかい表現など）は禁止
- 表層ラベルだけで終わらせず、なぜその反応になっているように見えるかをにじませる
- 断定しすぎず、観察に基づく慎重なトーンを保つ
- 医療者を責める文にも、患者を断定する文にもせず、「受け取りのズレ」として扱う
- 一次Contextは、あとで少し補足すれば最終Contextに育つ途中の文脈として書く

【入力情報】
観察内容:
${observationRaw || "（未入力）"}

感情トーン:
${emotion || "（未入力）"}

緊急度:
${urgency || "（未入力）"}

補足メモ:
${note || "（未入力）"}

【一次Contextの書き方】
- 180〜320字程度
- 1〜3段落相当の自然な文章
- まず、いま何が起きているかを短くつかむ
- 次に、その場で相手がどう受け取っているように見えるかを書く
- その結果として、どのような関係上の緊張や不安が生じているかを書く
- 最後は、何を見極めるとよさそうかが自然ににじむところで止める
- 「患者が怒っている」「説明不足」などの表層ラベルだけで終わらせない
- 「〜と受け取っている可能性がある」「〜への不安や不満が高まっているように見える」などの慎重表現を使ってよい

【followups の作り方】
- 必ず3件返す
- 追加補足として書くと文脈が深まる観点を短文で返す
- 質問文でもよい
- 1件あたり28〜55字程度
- 抽象論ではなく、その場の文脈を深める具体的観点にする
- 例:
  - 何についての説明が特に伝わっていないように見えたか
  - 怒りの前に、戸惑いや不安を示す反応はあったか
  - その場のやり取りの直前に、関係が揺れたきっかけはあったか

【悪い出力例】
- 「以下のように整理できます」
- 「患者が怒っている状態です」
- 「記録向けには〜」
- 見出しつきの説明
- 箇条書き

【良い出力イメージ】
患者は説明を受けていてもなお不安が十分に解消されておらず、その不安が苛立ちとして表出している可能性がある。情報自体は伝えられていても、患者側では内容を自分ごととして受け取りきれておらず、納得よりも置いていかれる感覚が残っているように見える。そのため、説明を重ねること以上に、何が不安として残っているのかを確かめる必要がある。

【出力形式】
JSONのみを返すこと。

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
