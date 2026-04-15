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

const MODEL = process.env.RA_CONTEXT_MODEL || "gpt-5.4-mini";

/* =========================
   Utility
========================= */

function cleanText(value) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim();
}

function normalizeText(value) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
}

function normalizeFreeText(text, fallback = "") {
  if (typeof text !== "string") return fallback;
  const normalized = text
    .replace(/^```(?:json)?/gm, "")
    .replace(/```$/gm, "")
    .replace(/^「|」$/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/^\s*[-*・]\s*/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return normalized || fallback;
}

function normalizeAkBreakType(list) {
  if (!Array.isArray(list)) return [];
  return [...new Set(list.filter((v) => ["R", "P", "L", "S"].includes(v)))];
}

function safeStringArray(list, fallback, max = 3) {
  if (!Array.isArray(list)) return fallback;
  const normalized = list
    .filter((item) => typeof item === "string")
    .map((item) => normalizeText(item))
    .filter(Boolean)
    .slice(0, max);

  return normalized.length ? normalized : fallback;
}

function tryParseJSONObject(rawText) {
  if (typeof rawText !== "string" || !rawText.trim()) return null;

  try {
    return JSON.parse(rawText);
  } catch {
    // noop
  }

  const codeBlockMatch = rawText.match(/```json\s*([\s\S]*?)```/i);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1]);
    } catch {
      // noop
    }
  }

  const firstBrace = rawText.indexOf("{");
  const lastBrace = rawText.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = rawText.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch {
      // noop
    }
  }

  return null;
}

/* =========================
   Normalize payloads
========================= */

function normalizeAnalysisPayload(analysis) {
  const fallback = {
    MAX_DELTA: 2,
    Trigger: "No",
    R_Plus: "No",
    AK_Break_Type: ["P"],
    AK_Primary: "P",
    APCE_Miss: "P",
    R_Failure_Reason: "記述不足",
    Case_Phase: "Trigger前",
    Trigger_Memo:
      "[主因AK] P によりΔ上昇。[補助要因] なし が重なりTrigger未成立。",
    R_Memo: "主因AKはPで、修復状況は記述不足です。",
  };

  if (!analysis || typeof analysis !== "object") return fallback;

  const maxDeltaNum = Number(analysis.MAX_DELTA);
  const MAX_DELTA =
    Number.isInteger(maxDeltaNum) && maxDeltaNum >= 0 && maxDeltaNum <= 4
      ? maxDeltaNum
      : fallback.MAX_DELTA;

  const Trigger =
    analysis.Trigger === "Yes" || analysis.Trigger === "No"
      ? analysis.Trigger
      : fallback.Trigger;

  const R_Plus =
    analysis.R_Plus === "Yes" || analysis.R_Plus === "No"
      ? analysis.R_Plus
      : fallback.R_Plus;

  const AK_Break_Type = normalizeAkBreakType(analysis.AK_Break_Type);
  const safeBreak = AK_Break_Type.length ? AK_Break_Type : fallback.AK_Break_Type;

  const AK_Primary =
    ["R", "P", "L", "S"].includes(analysis.AK_Primary)
      ? analysis.AK_Primary
      : fallback.AK_Primary;

  const APCE_Miss =
    ["A", "P", "C", "E", ""].includes(analysis.APCE_Miss)
      ? analysis.APCE_Miss
      : fallback.APCE_Miss;

  const R_Failure_Reason =
    ["未介入", "遅延", "ミスマッチ", "記述不足", ""].includes(
      analysis.R_Failure_Reason
    )
      ? analysis.R_Failure_Reason
      : fallback.R_Failure_Reason;

  const Case_Phase =
    ["Trigger前", "Trigger時", "Trigger後"].includes(analysis.Case_Phase)
      ? analysis.Case_Phase
      : MAX_DELTA === 4
        ? "Trigger後"
        : Trigger === "Yes"
          ? "Trigger時"
          : "Trigger前";

  return {
    MAX_DELTA,
    Trigger,
    R_Plus,
    AK_Break_Type: safeBreak,
    AK_Primary,
    APCE_Miss,
    R_Failure_Reason,
    Case_Phase,
    Trigger_Memo:
      normalizeText(analysis.Trigger_Memo) || fallback.Trigger_Memo,
    R_Memo:
      normalizeText(analysis.R_Memo) || fallback.R_Memo,
  };
}

function normalizeAnalysisTextPayload(analysisText, analysis) {
  const fallback = {
    signal: "何らかの引っかかりが前面に出ています。",
    delta:
      analysis.MAX_DELTA >= 3
        ? "関係の緊張は高まっています。"
        : "不満や懸念が見え始めています。",
    ak:
      analysis.AK_Primary === "R"
        ? "主因は尊重の不足です。"
        : analysis.AK_Primary === "L"
          ? "主因は役割や担当の不明瞭さです。"
          : analysis.AK_Primary === "S"
            ? "主因は安全への不安です。"
            : "主因は見通しの不足です。",
    apce:
      analysis.APCE_Miss === "E"
        ? "まず受け止めを置く必要があります。"
        : analysis.APCE_Miss === "C"
          ? "まず接続や整理を整える必要があります。"
          : analysis.APCE_Miss === "A"
            ? "まず認識をそろえる必要があります。"
            : "まず見通しを補う必要があります。",
    r:
      analysis.R_Plus === "Yes"
        ? "関係は回復方向に向いています。"
        : "関係はまだ回復方向に向いていません。",
    trigger:
      analysis.Trigger === "Yes"
        ? "局所的な出来事が緊張を押し上げています。"
        : "決定的な分岐イベントはまだ明確ではありません。",
    phase:
      analysis.Case_Phase === "Trigger後"
        ? "このケースは崩れが表面化した段階です。"
        : analysis.Case_Phase === "Trigger時"
          ? "このケースは分岐点にあります。"
          : "このケースは分岐前の段階です。",
    insight: "関係の読み取りと見通し整理が必要な構造です。",
  };

  if (!analysisText || typeof analysisText !== "object") return fallback;

  return {
    signal: normalizeText(analysisText.signal) || fallback.signal,
    delta: normalizeText(analysisText.delta) || fallback.delta,
    ak: normalizeText(analysisText.ak) || fallback.ak,
    apce: normalizeText(analysisText.apce) || fallback.apce,
    r: normalizeText(analysisText.r) || fallback.r,
    trigger: normalizeText(analysisText.trigger) || fallback.trigger,
    phase: normalizeText(analysisText.phase) || fallback.phase,
    insight: normalizeText(analysisText.insight) || fallback.insight,
  };
}

function normalizeAcexItems(acexItems) {
  const fallback = [
    {
      key: "A",
      label: "A",
      title: "Accept",
      body: "まず相手の引っかかりや不安を受け止める。",
    },
    {
      key: "C",
      label: "C",
      title: "Clarify",
      body: "何が問題の中心かを一つに絞って確かめる。",
    },
    {
      key: "E",
      label: "E",
      title: "Explain",
      body: "必要な説明を短く補い、流れを整える。",
    },
    {
      key: "X",
      label: "X",
      title: "Assist",
      body: "必要に応じて次の動きや担当につなぐ。",
    },
  ];

  if (!Array.isArray(acexItems)) return fallback;

  const normalized = acexItems
    .filter((item) => item && typeof item === "object")
    .slice(0, 4)
    .map((item, index) => {
      const fb = fallback[index] || fallback[0];
      return {
        key:
          typeof item.key === "string" && item.key.trim()
            ? item.key.trim()
            : fb.key,
        label:
          typeof item.label === "string" && item.label.trim()
            ? item.label.trim()
            : fb.label,
        title:
          typeof item.title === "string" && item.title.trim()
            ? item.title.trim()
            : fb.title,
        body:
          typeof item.body === "string" && normalizeText(item.body)
            ? normalizeText(item.body)
            : fb.body,
      };
    });

  while (normalized.length < 4) {
    normalized.push(fallback[normalized.length]);
  }

  return normalized;
}

function normalizeResponsePayload(response, analysis) {
  const fallback = {
    statusLabel: analysis.MAX_DELTA >= 3 ? "注意" : "安定",
    statusSub:
      analysis.Trigger === "Yes"
        ? "局所イベントで関係の緊張が押し上がっている"
        : "まだ大きな崩れの手前にある",
    statusIcon: analysis.MAX_DELTA >= 3 ? "🔥" : "—",
    statusColorClass:
      analysis.MAX_DELTA >= 3 ? "text-yellow-500" : "text-stone-400",
    actionSummary:
      analysis.AK_Primary === "R"
        ? "まず受け止めを先に置き、どこで反応が変わったかを短く確かめる。"
        : analysis.AK_Primary === "L"
          ? "まず担当と役割を整理し、誰が何を担うかを明確にする。"
          : analysis.AK_Primary === "S"
            ? "まず安全への不安を受け止め、何が危険かを確認する。"
            : "まず見通しを補い、何が見えにくくなっているかを短く確かめる。",
    flowItems: [
      "まず、状況の中心にある引っかかりを一つに絞って確認する。",
      "次に、必要な説明や整理を短く補う。",
      "最後に、次の一手や担当を明確にする。",
    ],
    ngItems: ["すぐ反論する", "説明だけで押し切る", "不安を軽く扱う"],
    acexItems: normalizeAcexItems([]),
  };

  if (!response || typeof response !== "object") return fallback;

  return {
    statusLabel:
      typeof response.statusLabel === "string" && response.statusLabel.trim()
        ? response.statusLabel.trim()
        : fallback.statusLabel,
    statusSub:
      typeof response.statusSub === "string" && normalizeText(response.statusSub)
        ? normalizeText(response.statusSub)
        : fallback.statusSub,
    statusIcon:
      typeof response.statusIcon === "string" && response.statusIcon.trim()
        ? response.statusIcon.trim()
        : fallback.statusIcon,
    statusColorClass:
      typeof response.statusColorClass === "string" &&
      response.statusColorClass.trim()
        ? response.statusColorClass.trim()
        : fallback.statusColorClass,
    actionSummary:
      typeof response.actionSummary === "string" &&
      normalizeText(response.actionSummary)
        ? normalizeText(response.actionSummary)
        : fallback.actionSummary,
    flowItems: safeStringArray(response.flowItems, fallback.flowItems, 3),
    ngItems: safeStringArray(response.ngItems, fallback.ngItems, 3),
    acexItems: normalizeAcexItems(response.acexItems),
  };
}

/* =========================
   Prompt builders
========================= */

function buildContextPrompt({ observationRaw, emotion, urgency, note }) {
  return [
    "【観察メモ】",
    observationRaw || "（未入力）",
    "",
    "【観察者メモ】",
    `感情トーン: ${emotion || "未入力"}`,
    `対応意図: ${urgency || "未入力"}`,
    `補足: ${note || "なし"}`,
    "",
    "【タスク】",
    "この観察を、説明や助言ではなく、関係の状態として一次整理してください。",
    "3文から5文の自然文で書いてください。",
    "途中で切れず、必ず完結させてください。",
    "followups は3件、日本語、自然な問いで返してください。",
    "必ずJSONのみを返してください。",
  ].join("\n");
}

function buildFinalPrompt(body) {
  const observationRaw = cleanText(body.observationRaw) || "（観察未入力）";
  const primaryContext =
    cleanText(body.primaryContextDraft || body.contextDraft) ||
    "（一次Context未入力）";
  const contextEdited =
    cleanText(body.contextEdited || body.userFollowupNote) || "（補足なし）";
  const emotion = cleanText(body.emotion) || "（未入力）";
  const urgency = cleanText(body.urgency) || "（未入力）";

  return [
    "【観察メモ】",
    observationRaw,
    "",
    "【一次Context】",
    primaryContext,
    "",
    "【補足入力】",
    contextEdited,
    "",
    "【感情】",
    emotion,
    "",
    "【対応意図】",
    urgency,
    "",
    "【タスク】",
    "1. Final Contextを自然文で作成する",
    "2. analysis を返す",
    "3. analysisText を返す",
    "4. response を返す",
    "5. 必ずJSONのみを返す",
  ].join("\n");
}

/* =========================
   Prompts
========================= */

const CONTEXT_SYSTEM_PROMPT = `
あなたはRA-SSの一次Context生成エンジンです。
観察された違和感を、関係の状態として未完成の自然文に整理してください。
助言や応答文は禁止です。
followups は3件、日本語、自然な問いにしてください。
一次Contextは3文から5文で、必ず途中で切れずに完結させてください。

必ずJSONのみを返してください。

{
  "contextDraft": "自然文の一次Context",
  "followups": ["質問1", "質問2", "質問3"]
}
`.trim();

const FINAL_SYSTEM_PROMPT = `
あなたはRA-SSのFinal Context生成エンジンです。
入力された観察、一次Context、補足情報をもとに、Final Contextと分析結果を返してください。
必ずJSONのみを返してください。コードフェンスは禁止です。

【目的】
- Final Contextは要約ではなく、分析に使える解像度で整える
- 出来事、反応変化、関係の変化点を残す
- 応答文は作らない



【重要（出力ルール）】
Final Contextでは必ず以下を含めること：

1. 何が起きたか（具体的な出来事）
2. その直後に何が変化したか
3. 関係がどう変わったか

禁止：
・抽象語だけで終わる（例：不満、距離、緊張）
・出来事を省略する

良い例：
「待ち時間が長く、患者が強い口調で訴えたことで、スタッフとの関係の緊張が一段高まった可能性がある」



【最終補正（重要）】

Final Contextでは以下を厳守する：

・内面の推測を書かない（例：信頼感、納得感、安心感）
・観察できる変化のみを書く（発言、態度、トーン）
・出来事 → 変化 → 関係 の順で書く

禁止：
・「〜と感じた可能性がある」などの心理推測
・状態の抽象化だけで終わる




【R優先ルール】
以下の場合はRを優先する：
・最後まで聞かない
・話を途中で遮る
・相手の話を軽く扱う
・「それ前にも言いましたよね」などの切り返し

この場合、感情が戸惑いでもAK_PrimaryはRとする

【Trigger抑制ルール】
以下の場合はTriggerとしない：
・軽い沈黙
・表情変化のみ
・発言量の減少

Triggerは「関係が一段切れた」場合のみ



【最優先の主因判定ルール】

次のような出来事がある場合、AK_Primary は P ではなく R とする：

・最後まで聞かない
・話を途中で遮る
・相手の話を軽く扱う
・症状や訴えに対して突き放すように返す
・「それは前にも言われましたよね」など、話す意欲を下げる返し

重要：
この場合、相手の反応が「戸惑い」「不安」「黙る」であっても、
それは結果であり主因ではない。
主因は「受け止められなさ」「尊重の欠如」であるため、
AK_Primary = R を優先する。

【Pにしてはいけない条件】

以下の場合は P にしてはいけない：
・問題の中心が見通し不足ではない
・説明不足より、聞かれ方・返し方・扱われ方が原因である
・相手が話すこと自体をやめている、または減らしている


【分析ルール】
- Triggerはイベントである
- AK_Primaryは原因イベントである
- 推測しすぎない
- 不明な場合は最小限にまとめる

【出力形式】
{
  "finalContext": "自然文",
  "analysis": {
    "MAX_DELTA": 2,
    "Trigger": "No",
    "R_Plus": "No",
    "AK_Break_Type": ["P"],
    "AK_Primary": "P",
    "APCE_Miss": "P",
    "R_Failure_Reason": "記述不足",
    "Case_Phase": "Trigger前",
    "Trigger_Memo": "短い説明",
    "R_Memo": "短い説明"
  },
  "analysisText": {
    "signal": "",
    "delta": "",
    "ak": "",
    "apce": "",
    "r": "",
    "trigger": "",
    "phase": "",
    "insight": ""
  },
  "response": {
    "statusLabel": "注意",
    "statusSub": "",
    "statusIcon": "🔥",
    "statusColorClass": "text-yellow-500",
    "actionSummary": "",
    "flowItems": ["", "", ""],
    "ngItems": ["", "", ""],
    "acexItems": [
      { "key": "A", "label": "A", "title": "Accept", "body": "" },
      { "key": "C", "label": "C", "title": "Clarify", "body": "" },
      { "key": "E", "label": "E", "title": "Explain", "body": "" },
      { "key": "X", "label": "X", "title": "Assist", "body": "" }
    ]
  }
}
`.trim();

/* =========================
   Fallback builders
========================= */

function fallbackContextPayload(observationRaw) {
  return {
    contextDraft:
      normalizeFreeText(
        observationRaw,
        "観察内容から一次整理を十分に生成できませんでした。"
      ) ||
      "観察内容から一次整理を十分に生成できませんでした。",
    followups: [
      "どの場面で反応が変わりましたか？",
      "説明の順番に違和感はありましたか？",
      "特に気にしていた言葉はありますか？",
    ],
  };
}

function fallbackFinalPayload(body, rawText = "") {
  const observationRaw = cleanText(body.observationRaw) || "";
  const primaryContext =
    cleanText(body.primaryContextDraft || body.contextDraft) || "";
  const baseText =
    normalizeFreeText(rawText) ||
    normalizeFreeText(primaryContext) ||
    normalizeFreeText(observationRaw) ||
    "観察内容から最終Contextを十分に生成できませんでした。";

  return {
    finalContext: baseText,
    analysis: {
      MAX_DELTA: 2,
      Trigger: "No",
      R_Plus: "No",
      AK_Break_Type: ["P"],
      AK_Primary: "P",
      APCE_Miss: "P",
      R_Failure_Reason: "記述不足",
      Case_Phase: "Trigger前",
      Trigger_Memo:
        "[主因AK] P によりΔ上昇。[補助要因] なし が重なりTrigger未成立。",
      R_Memo: "主因AKはPで、修復状況は記述不足です。",
    },
    analysisText: {},
    response: {},
  };
}

/* =========================
   API: Context Draft
========================= */

app.post("/api/context-draft", async (req, res) => {
  try {
    const body = req.body || {};
    const observationRaw = cleanText(body.observationRaw);
    const emotion = cleanText(body.emotion);
    const urgency = cleanText(body.urgency);
    const note = cleanText(body.note);

    if (!observationRaw) {
      return res.status(400).json({
        error: "observationRaw is required",
      });
    }

    const prompt = buildContextPrompt({
      observationRaw,
      emotion,
      urgency,
      note,
    });

    const response = await client.responses.create({
      model: MODEL,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: CONTEXT_SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: prompt }],
        },
      ],
      max_output_tokens: 1200,
    });

    const raw = response.output_text || "";
    let parsed = tryParseJSONObject(raw);

    if (!parsed || typeof parsed !== "object") {
      parsed = fallbackContextPayload(observationRaw);
    }

    return res.json({
      contextDraft: normalizeFreeText(
        parsed.contextDraft,
        fallbackContextPayload(observationRaw).contextDraft
      ),
      followups: safeStringArray(
        parsed.followups,
        fallbackContextPayload(observationRaw).followups,
        3
      ),
    });
  } catch (e) {
    console.error("OpenAI error (context-draft):", e);
    const fallback = fallbackContextPayload(req.body?.observationRaw || "");
    return res.status(200).json(fallback);
  }
});

/* =========================
   API: Final Context + Analysis
========================= */

app.post("/api/final-context", async (req, res) => {
  try {
    const body = req.body || {};
    const userPrompt = buildFinalPrompt(body);

    const response = await client.responses.create({
      model: MODEL,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: FINAL_SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: userPrompt }],
        },
      ],
      max_output_tokens: 1800,
    });

    const raw = response.output_text || "";
    let parsed = tryParseJSONObject(raw);

    if (!parsed || typeof parsed !== "object") {
      parsed = fallbackFinalPayload(body, raw);
    }

    const normalizedAnalysis = normalizeAnalysisPayload(parsed.analysis);
    const normalizedAnalysisText = normalizeAnalysisTextPayload(
      parsed.analysisText,
      normalizedAnalysis
    );
    const normalizedResponse = normalizeResponsePayload(
      parsed.response,
      normalizedAnalysis
    );

    return res.json({
      finalContext:
        normalizeFreeText(
          parsed.finalContext,
          fallbackFinalPayload(body, raw).finalContext
        ) || fallbackFinalPayload(body, raw).finalContext,
      analysis: normalizedAnalysis,
      analysisText: normalizedAnalysisText,
      response: normalizedResponse,
    });
  } catch (e) {
    console.error("OpenAI error (final-context):", e);
    const fallback = fallbackFinalPayload(req.body || {});
    return res.status(200).json({
      finalContext: fallback.finalContext,
      analysis: normalizeAnalysisPayload(fallback.analysis),
      analysisText: normalizeAnalysisTextPayload(
        fallback.analysisText,
        normalizeAnalysisPayload(fallback.analysis)
      ),
      response: normalizeResponsePayload(
        fallback.response,
        normalizeAnalysisPayload(fallback.analysis)
      ),
    });
  }
});

/* =========================
   Start Server
========================= */

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});