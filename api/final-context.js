import OpenAI from "openai";
import { analyzeCase } from "../src/lib/rassEngineCore.js";

export const config = {
  runtime: "nodejs",
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.RA_CONTEXT_MODEL || "gpt-5.4-mini";

const CORD_SYSTEM_PROMPT = `あなたはCORD Ver1.1｜RA完全整合版に基づき、
医療・ケア場面のナラティブを、人が確認するための一次整理JSONへ構造化します。
出力は必ずJSONのみで返してください。

原則:
- 判定は構造（Δ・e）で行う
- CORDは補助
- TriggerはCORDではなく e3 で確定
- 言葉でΔを決めない
- Δで言葉を確認する
- eは言語ではなくΔ変化で決まる
- R+は実際のΔ低下イベントとして扱う
- 「こうすれば安心できた」はR+成立ではなくR+候補として扱う
- AKは補助ラベルであり、主判定ではない
- 医療者、患者、家族の誰かを断定的に責めない
- AIによる最終判断ではなく、人が確認するための一次整理として出力する
- e3 は関係が閉じる・相談できなくなる・信頼が急に下がるなど、Δが悪化方向にΔ2→Δ3へ移る転換点のみを指す
- 不安が軽くなる、理解が進む、確認できるようになる等の回復方向のΔ低下は e3 ではなく R+ として扱う
- 「〜できると安心だった」「〜があれば安心だった」「確認できる機会があればよかった」「整理してもらえると安心だった」は、実際のΔ低下ではないため R+ established ではなく、回復導線が明確な R+ candidate として扱う
- 「少し安心した」「少し落ち着いた」「気持ちは楽になった」などのΔ低下表現があり、同時に「まだ分からない」「不安が残る」「連絡先が分からない」「家での対応には不安が残る」など未解消要素が残る場合は、casePhase に「部分回復 / 未解消要素あり」を含める
- 部分回復ケースの rPlus.status は文脈により candidate または established とし、humanReviewNotes には未解消要素が残っていることを明記する
- 「部分回復 / 未解消要素あり」は、未解消を示す表現が本文に明示されている場合だけ使う。慎重な推測表現や一次整理の曖昧さだけで未解消扱いにしない
- R+ established で「一言説明」「理由説明」「次の見通し提示」「分かる言葉で整理」など再利用可能な行動がある場合は、preAsset または humanReviewNotes に「再利用可能な好事例」または「Best Practice候補」を含める
- preAsset は空にしない。人が確認する観点、回復導線、または再利用できる行動を2〜5件の自然な日本語で入れる
- Trigger Yes の場合も preAsset を空にせず、「質問し直せる場の再設定」「確認先の明示」「遮られた質問内容の再確認」など、関係修復に向けて人が確認できる候補を出す
- 相談しようと思っていた状態から「もう聞いてはいけない」「質問できない」へ変わる一言や場面は e3 候補として確認する
- 回復ケースでは、maxDelta は回復前の最大悪化Δを示し、R+ established と casePhase で回復を明示する
- 理解不足に加えて、今後の見通し・準備・確認事項が分からない状態が不安として維持される場合は、単なるΔ1ではなくΔ1-Δ2帯として確認する
- casePhase は日本語で、「Trigger前 / e2蓄積段階」「Trigger発生 / 関係転換後」「回復 / R+成立」など、発表画面でそのまま読める表現にする

手順:
1. ナラティブを t1, t2, t3... に分解する
2. 各tでΔの発生・維持・増幅・低下を観察する
3. e1 はΔを初めて上げた行
4. e2 はΔを維持・増幅した行
5. e3 は悪化方向にΔ2→Δ3へ変化し、相談・確認・信頼の関係が転換した行
6. Triggerは悪化方向の e3 がある場合のみ Yes
7. R+ established は実際にΔが低下したイベントがある場合のみ。R+だけではTrigger Yesにしない
8. R+ candidate は、未実施だが回復導線が具体的に示されている場合に使う。R+ none は回復導線も実際の回復も読み取れない場合に限る
9. 部分回復と未解消要素が同時にある場合は、casePhase と humanReviewNotes の両方で人が確認できるように残す。ただし未解消要素は本文の明示表現に基づく
10. preAsset はStep03以降に表示されるため、内部語ではなく人が確認できる候補として自然な日本語で必ず出す
11. AKは補助として primary/secondary/note に留める`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      observationRaw = "",
      contextEdited = "",
      primaryContextDraft = "",
    } = req.body || {};

    const finalContext = buildFinalContext({
      observationRaw,
      primaryContextDraft,
      contextEdited,
    });

    if (!finalContext) {
      return res.status(400).json({
        error: "No input text provided",
      });
    }

    const result = analyzeCase({ context: finalContext });
    const cordResult = await buildCordAssessment({
      observationRaw: String(observationRaw).trim(),
      primaryContextDraft: String(primaryContextDraft).trim(),
      contextEdited: String(contextEdited).trim(),
      finalContext,
    });

    return res.status(200).json({
      finalContext,
      analysis: mapAnalysis(result.analysis),
      response: mapResponse(result),
      cordAssessment: cordResult.cordAssessment,
      cordAssessmentError: cordResult.error,
    });
  } catch (error) {
    console.error("final-context error:", error);
    return res.status(500).json({
      error: "Server error",
    });
  }
}

async function buildCordAssessment({
  observationRaw,
  primaryContextDraft,
  contextEdited,
  finalContext,
}) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      cordAssessment: null,
      error: "CORD判定未取得。OPENAI_API_KEY が設定されていません。",
    };
  }

  try {
    const response = await client.responses.create({
      model: MODEL,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: CORD_SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: buildCordPrompt({
                observationRaw,
                primaryContextDraft,
                contextEdited,
                finalContext,
              }),
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "cord_assessment_response",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              summary: { type: "string" },
              maxDelta: {
                type: "string",
                enum: ["Δ0", "Δ1", "Δ1-Δ2", "Δ2", "Δ2-Δ3", "Δ3", "Δ4"],
              },
              casePhase: { type: "string" },
              timeline: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    id: { type: "string" },
                    text: { type: "string" },
                    deltaObservation: { type: "string" },
                    cordRole: {
                      type: "string",
                      enum: [
                        "context",
                        "e1",
                        "e2",
                        "e3",
                        "r_plus_candidate",
                        "r_plus_established",
                      ],
                    },
                  },
                  required: ["id", "text", "deltaObservation", "cordRole"],
                },
              },
              e: {
                type: "object",
                additionalProperties: false,
                properties: {
                  e1: { type: ["string", "null"] },
                  e2: { type: ["string", "null"] },
                  e3: { type: ["string", "null"] },
                },
                required: ["e1", "e2", "e3"],
              },
              trigger: {
                type: "object",
                additionalProperties: false,
                properties: {
                  value: { type: "string", enum: ["Yes", "No"] },
                  reason: { type: "string" },
                },
                required: ["value", "reason"],
              },
              rPlus: {
                type: "object",
                additionalProperties: false,
                properties: {
                  status: {
                    type: "string",
                    enum: ["none", "candidate", "established"],
                  },
                  event: { type: ["string", "null"] },
                },
                required: ["status", "event"],
              },
              ak: {
                type: "object",
                additionalProperties: false,
                properties: {
                  primary: { type: ["string", "null"] },
                  secondary: { type: ["string", "null"] },
                  note: { type: "string" },
                },
                required: ["primary", "secondary", "note"],
              },
              preAsset: {
                type: "array",
                items: { type: "string" },
              },
              humanReviewNotes: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: [
              "summary",
              "maxDelta",
              "casePhase",
              "timeline",
              "e",
              "trigger",
              "rPlus",
              "ak",
              "preAsset",
              "humanReviewNotes",
            ],
          },
        },
      },
      max_output_tokens: 1600,
    });

    const parsed = parseResponsePayload(response.output_text);

    if (!parsed) {
      return {
        cordAssessment: null,
        error: "CORD判定未取得。JSONを解析できませんでした。",
      };
    }

    return {
      cordAssessment: normalizeCordAssessment(parsed),
      error: null,
    };
  } catch (error) {
    console.error("cord assessment error:", error);

    return {
      cordAssessment: null,
      error: "CORD判定未取得。人による確認が必要です。",
    };
  }
}

function buildCordPrompt({
  observationRaw,
  primaryContextDraft,
  contextEdited,
  finalContext,
}) {
  return [
    "以下のナラティブをCORD Ver1.1｜RA完全整合版で一次整理してください。",
    "",
    "元の観察:",
    observationRaw || "未入力",
    "",
    "一次整理:",
    primaryContextDraft || "未入力",
    "",
    "人による補足:",
    contextEdited || "未入力",
    "",
    "今回分析に使う確認用Context:",
    finalContext,
  ].join("\n");
}

function buildFinalContext({ observationRaw, primaryContextDraft, contextEdited }) {
  const raw = cleanString(observationRaw);
  const draft = chooseBaseContext(cleanString(primaryContextDraft), raw);
  const supplement = cleanString(contextEdited);

  if (!supplement) return draft || raw;
  if (!draft) return supplement || raw;

  if (looksLikeEditedFullContext(supplement, draft, raw)) {
    return supplement;
  }

  return `${draft}\n\n補足：${supplement}`;
}

function chooseBaseContext(draft, raw) {
  if (!draft) return raw;
  if (isShortHeadingOnly(draft, raw)) return raw || draft;
  return draft;
}

function isShortHeadingOnly(text, raw) {
  if (!raw) return text.length < 20;

  const sentenceLikeCount = (text.match(/[。！？\n]/g) || []).length;
  const rawHasNarrative = raw.length >= 80 || raw.includes("\n");

  return rawHasNarrative && text.length < 60 && sentenceLikeCount < 2;
}

function looksLikeEditedFullContext(text, draft, raw) {
  const sentenceLikeCount = (text.match(/[。！？\n]/g) || []).length;
  const questionCount = (text.match(/[？?]/g) || []).length;
  const referenceLength = Math.max(draft.length, raw.length);

  return (
    text.length >= 100 &&
    sentenceLikeCount >= 2 &&
    questionCount < sentenceLikeCount &&
    text.length >= Math.min(100, referenceLength * 0.6)
  );
}

function parseResponsePayload(text) {
  if (typeof text !== "string" || !text.trim()) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function normalizeCordAssessment(value) {
  return {
    summary: cleanString(value?.summary) || "判定概要を取得できませんでした。",
    maxDelta: cleanString(value?.maxDelta) || "Δ0",
    casePhase: cleanString(value?.casePhase) || "判定未取得",
    timeline: normalizeTimeline(value?.timeline),
    e: {
      e1: cleanNullableString(value?.e?.e1),
      e2: cleanNullableString(value?.e?.e2),
      e3: cleanNullableString(value?.e?.e3),
    },
    trigger: {
      value: value?.trigger?.value === "Yes" ? "Yes" : "No",
      reason:
        cleanString(value?.trigger?.reason) ||
        "Trigger判定理由を取得できませんでした。",
    },
    rPlus: {
      status: normalizeRPlusStatus(value?.rPlus?.status),
      event: cleanNullableString(value?.rPlus?.event),
    },
    ak: {
      primary: cleanNullableString(value?.ak?.primary),
      secondary: cleanNullableString(value?.ak?.secondary),
      note:
        cleanString(value?.ak?.note) ||
        "AKは補助ラベルとして人が確認してください。",
    },
    preAsset: normalizeStringList(value?.preAsset),
    humanReviewNotes: normalizeStringList(value?.humanReviewNotes),
  };
}

function normalizeTimeline(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item, index) => ({
      id: cleanString(item?.id) || `t${index + 1}`,
      text: cleanString(item?.text),
      deltaObservation: cleanString(item?.deltaObservation),
      cordRole: normalizeCordRole(item?.cordRole),
    }))
    .filter((item) => item.text || item.deltaObservation);
}

function normalizeStringList(value) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function normalizeCordRole(value) {
  const roles = new Set([
    "context",
    "e1",
    "e2",
    "e3",
    "r_plus_candidate",
    "r_plus_established",
  ]);

  return roles.has(value) ? value : "context";
}

function normalizeRPlusStatus(value) {
  if (value === "candidate" || value === "established") return value;
  return "none";
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanNullableString(value) {
  const normalized = cleanString(value);
  return normalized || null;
}

function mapAnalysis(analysis) {
  return {
    MAX_DELTA: analysis.MAX_DELTA,
    Trigger: analysis.Trigger,
    R_Plus: analysis.R_plus,
    AK_Break_Type: analysis.AK_Break_Type,
    AK_Primary: analysis.AK_Primary,
    APCE_Miss: analysis.APCE_Miss[0] || "",
    R_Failure: analysis.R_Failure_Reason || "",
    Case_Phase: analysis.Case_Phase,
    Trigger_Memo: analysis.Trigger_Memo,
    R_Memo: analysis.R_Memo,
  };
}

function mapResponse(result) {
  return {
    actionSummary:
      result.acex.length > 0
        ? result.acex.map((action) => `${action.code}｜${action.label}`).join(" → ")
        : "該当するACEX提案なし",
    acexItems: result.acex.map((action) => ({
      key: action.code,
      label: action.code,
      title: action.label,
      body: action.reason,
    })),
    flowItems:
      result.acex.length > 0
        ? result.acex.map(
            (action) => `${action.code}｜${action.label}：${action.reason}`
          )
        : ["該当するACEX提案はありません。"],
    ngItems: [],
    statusLabel: `Δ${result.analysis.MAX_DELTA} / ${result.analysis.Case_Phase}`,
    statusSub: result.analysis.Trigger_Memo,
    statusIcon: result.analysis.Trigger === "Yes" ? "●" : "○",
    statusColorClass:
      result.analysis.Trigger === "Yes" ? "text-rose-500" : "text-stone-500",
  };
}
