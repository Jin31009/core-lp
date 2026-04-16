export function detectDelta(context) {
  if (context.includes("拒絶") || context.includes("関係断絶")) return 4;
  if (
    context.includes("不信") ||
    context.includes("信頼できない") ||
    context.includes("強い不満")
  ) {
    return 3;
  }
  if (
    context.includes("不満") ||
    context.includes("懸念") ||
    context.includes("改善要求")
  ) {
    return 2;
  }
  if (context.includes("違和感")) return 1;
  return 0;
}

export function detectTrigger(delta, hasStateChange, hasEvent) {
  if (delta === 4) return "Yes";
  if (delta === 3 && hasStateChange && hasEvent) return "Yes";
  return "No";
}

export function detectAK(context) {
  const result = [];

  if (
    context.includes("失礼") ||
    context.includes("無視") ||
    context.includes("高圧") ||
    context.includes("不公平")
  ) {
    result.push("R");
  }
  if (
    context.includes("説明不足") ||
    context.includes("説明がない") ||
    context.includes("見通しがない")
  ) {
    result.push("P");
  }
  if (
    context.includes("役割不明") ||
    context.includes("たらい回し") ||
    context.includes("担当不明")
  ) {
    result.push("L");
  }
  if (
    context.includes("危険") ||
    context.includes("安全無視") ||
    context.includes("不安")
  ) {
    result.push("S");
  }

  return result;
}

export function detectPrimaryAK(akList) {
  return akList.length > 0 ? akList[0] : null;
}

export function detectAPCE(ak) {
  if (ak.includes("R")) return ["E"];
  if (ak.includes("P")) return ["P"];
  if (ak.includes("L")) return ["C"];
  if (ak.length === 1 && ak[0] === "S") return [];
  return [];
}

export function detectRFailureReason(rPlus, context) {
  if (rPlus === "Yes") return null;
  if (context.includes("未対応") || context.includes("介入なし")) return "未介入";
  if (context.includes("遅い") || context.includes("待たされた")) return "遅延";
  if (context.includes("ズレ") || context.includes("噛み合わない")) {
    return "ミスマッチ";
  }
  return "記述不足";
}

export function detectPhase(delta, trigger) {
  if (delta === 4) return "Trigger後";
  if (trigger === "Yes") return "Trigger時";
  return "Trigger前";
}

export function recommendACEX(akPrimary, apceMiss, delta) {
  const actions = [];

  if (akPrimary === "R") {
    actions.push({
      code: "A",
      label: "受け止め",
      reason: "Respect breakdown requires emotional acknowledgment",
    });
    actions.push({
      code: "E",
      label: "共感的説明",
      reason: "Reduce emotional escalation and clarify situation",
    });
  }

  if (akPrimary === "P") {
    actions.push({
      code: "E",
      label: "見通し説明",
      reason: "Lack of perspective requires clear explanation of next steps",
    });
  }

  if (akPrimary === "L") {
    actions.push({
      code: "C",
      label: "調整",
      reason: "Role confusion requires coordination",
    });
  }

  if (akPrimary === "S") {
    actions.push({
      code: "X",
      label: "補助導線",
      reason: "Safety issues require structural support and confirmation",
    });
  }

  if (delta >= 3 && !actions.some((action) => action.code === "X")) {
    actions.push({
      code: "X",
      label: "構造補助",
      reason: "High Δ requires structural follow-up",
    });
  }

  void apceMiss;

  return actions.slice(0, 3);
}

export function buildRMemo(rPlus) {
  return rPlus === "Yes" ? "関係改善あり" : "関係改善なし";
}

export function analyzeCase(input) {
  const delta = detectDelta(input.context);

  const hasStateChange =
    input.context.includes("怒り") ||
    input.context.includes("ショック") ||
    input.context.includes("強い不快") ||
    input.context.includes("不信");

  const hasEvent =
    input.context.includes("高圧") ||
    input.context.includes("説明拒否") ||
    input.context.includes("説明不足") ||
    input.context.includes("不適切対応") ||
    input.context.includes("不公平") ||
    input.context.includes("安全無視");

  const ak = detectAK(input.context);
  const akPrimary = detectPrimaryAK(ak);
  const trigger = detectTrigger(delta, hasStateChange, hasEvent);

  const rPlus = "No";

  const apce = detectAPCE(ak);
  const failureReason = detectRFailureReason(rPlus, input.context);
  const phase = detectPhase(delta, trigger);

  const analysis = {
    MAX_DELTA: delta,
    Trigger: trigger,
    R_plus: rPlus,
    AK_Break_Type: ak,
    AK_Primary: akPrimary,
    APCE_Miss: apce,
    R_Failure_Reason: failureReason,
    Case_Phase: phase,
    Trigger_Memo: `${akPrimary ?? "主因不明"} によりΔ上昇。Trigger ${trigger}`,
    R_Memo: buildRMemo(rPlus),
  };

  return {
    analysis,
    acex: recommendACEX(akPrimary, apce, delta),
  };
}
