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

【大前提】
- 出力は「説明文」ではなく「観察記録としてそのまま読める文章」にする
- 「以下のように整理できます」「### 状況」などの見出し・記号・箇条書きは使わない
- 表面的な言い換えではなく、「なぜその反応が起きているように見えるか」をにじませる
- ただし断定しすぎず、観察に基づく慎重なトーンを保つ
- 医療者を責める文にも、患者を断定する文にもせず、「受け取りのズレ」として扱う
- 一次Contextは、あとで少し補足すれば最終Contextに育つ“途中の文脈”として書く

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
- 2〜3件
- 追加補足として書くと文脈が深まる観点を短文で返す
- 質問文でもよい
- 1件あたり30〜60字程度
- 「不足している説明の中身」「不安の対象」「その場の前後関係」など、
  一次Contextを深めるための具体的観点にする
- 抽象的すぎる言い方は避ける

【悪い例】
- 「### 状況」「### 状態」などの見出し
- 「患者が怒っている状態です」のような説明だけの文
- 箇条書き
- マニュアル調、評論調、助言調
- 「看護記録向けには〜」のような用途説明

【良い出力イメージ】
患者は説明を受けていてもなお不安が十分に解消されておらず、その不安が苛立ちとして表出している可能性がある。情報自体は伝えられていても、患者側では内容を自分ごととして受け取りきれておらず、納得よりも置いていかれる感覚が残っているように見える。そのため、説明を重ねること以上に、何が不安として残っているのかを確かめる必要がある。

【出力形式】
JSONのみを返すこと。前置きは不要。

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