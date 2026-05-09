import OpenAI from "openai";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const textsDir = path.join(projectRoot, "scripts", "audio", "rass-2026-texts");
const outDir = path.join(projectRoot, "public", "audio", "rass-2026");

const force = process.argv.includes("--force");
const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const only = onlyArg ? onlyArg.split("=")[1] : null;

const files = [
  { text: "00-cover.txt", audio: "00-cover.mp3" },
  { text: "01-problem.txt", audio: "01-problem.mp3" },
  { text: "02-purpose.txt", audio: "02-purpose.mp3" },
  { text: "03-structure.txt", audio: "03-structure.mp3" },
  { text: "04-rass.txt", audio: "04-rass.mp3" },
  { text: "05-data.txt", audio: "05-data.mp3" },
  { text: "06-case.txt", audio: "06-case.mp3" },
  { text: "07-sensor.txt", audio: "07-sensor.mp3" },
  { text: "08-next.txt", audio: "08-next.mp3" },
];

const styleInstructions =
  "落ち着いた日本語ナレーション。病院関係者に向けて丁寧に説明する雰囲気。現在より少しだけテンポよく、ただし早口にはしない。1文ごとの間は短めにする。医療・学会発表向けなので、煽らず、信頼感を重視。声のトーンは温かく、知的で、聞き取りやすく。";

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY が未設定です。");
  process.exit(1);
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function generateOne({ text, audio }) {
  const textPath = path.join(textsDir, text);
  const outPath = path.join(outDir, audio);

  if (!force && (await exists(outPath))) {
    console.log(`skip: ${audio} (already exists)`);
    return;
  }

  console.log(`generate: ${audio}`);

  const rawText = await readFile(textPath, "utf8");
  const input = rawText.trim();

  const response = await client.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "onyx",
    response_format: "mp3",
    instructions: styleInstructions,
    input,
  });

  const audioBuffer = Buffer.from(await response.arrayBuffer());
  await writeFile(outPath, audioBuffer);
  console.log(`done: ${audio}`);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const targetFiles = only
    ? files.filter((file) => file.text.startsWith(`${only}-`) || file.audio.startsWith(`${only}-`) || file.text === only || file.audio === only)
    : files;

  if (only && targetFiles.length === 0) {
    console.error(`error: --only=${only} に一致する対象がありません`);
    process.exit(1);
  }

  for (const file of targetFiles) {
    try {
      await generateOne(file);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`error: ${file.audio} -> ${message}`);
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`fatal: ${message}`);
  process.exit(1);
});
