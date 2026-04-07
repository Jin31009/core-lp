import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = 8787;

app.use(cors());
app.use(express.json());

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

    res.json({
      contextDraft: response.output_text?.trim(),
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({
      error: error?.message || "AI生成エラー",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
