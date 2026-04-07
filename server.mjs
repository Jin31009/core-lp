import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = 8787;

app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY が設定されていません");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/context-draft", async (req, res) => {
  try {
    const { observationRaw, emotion, urgency } = req.body ?? {};

    if (!observationRaw && !emotion && !urgency) {
      return res.status(400).json({
        error: "入力が空です",
      });
    }

    const input = `
以下の情報をもとに、医療接点における状況整理（Context）を日本語で1段落で作成してください。
判断は避け、場面・反応・必要性を整理してください。

そのうえで、追加で確認したほうがよい質問を2〜3個、短い文章で作成してください。

出力形式は必ず以下にしてください：

Context:
（ここに1段落）

Followups:
- （質問1）
- （質問2）
- （質問3）

【自由記述】
${observationRaw || ""}

【感情】
${emotion || ""}

【対応意図】
${urgency || ""}
`;

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input,
    });

    const text = response.output_text || "";

    // --- ここが追加ポイント（パース処理） ---
    const contextMatch = text.match(/Context:\s*([\s\S]*?)Followups:/);
    const followupsMatch = text.match(/Followups:\s*([\s\S]*)/);

    const contextDraft = contextMatch
      ? contextMatch[1].trim()
      : text.trim();

    const followups = followupsMatch
      ? followupsMatch[1]
          .split("\n")
          .map((l) => l.replace(/^-\s*/, "").trim())
          .filter((l) => l.length > 0)
      : [];

    res.json({
      contextDraft,
      followups,
    });
  } catch (error) {
    console.error("OpenAI error:", error);

    res.status(500).json({
      error: error instanceof Error ? error.message : "AI生成エラー",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});