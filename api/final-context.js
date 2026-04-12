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

  try {
    const { contextEdited = "" } = req.body || {};

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: `最終整理してください:\n${contextEdited}`,
    });

    return res.status(200).json({
      finalContext: response.output_text || "",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "error" });
  }
}
