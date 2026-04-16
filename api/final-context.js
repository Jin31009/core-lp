import { analyzeCase } from "../src/lib/rassEngineCore.js";

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

    const finalContext =
      String(contextEdited).trim() ||
      String(primaryContextDraft).trim() ||
      String(observationRaw).trim();

    if (!finalContext) {
      return res.status(400).json({
        error: "No input text provided",
      });
    }

    const result = analyzeCase({ context: finalContext });

    return res.status(200).json({
      finalContext,
      analysis: mapAnalysis(result.analysis),
      response: mapResponse(result),
    });
  } catch (error) {
    console.error("final-context error:", error);
    return res.status(500).json({
      error: "Server error",
    });
  }
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
