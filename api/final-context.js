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

    const text = normalize(finalContext);

    const MAX_DELTA = detectMaxDelta(text);
    const AK_Break_Type = detectAkBreakTypes(text);
    const AK_Primary = detectAkPrimary(text, AK_Break_Type);
    const APCE_Miss = detectApceMiss(text, AK_Primary, MAX_DELTA);
    const R_Plus = detectRPlus(text);
    const R_Failure = detectRFailureReason(text, R_Plus);
    const Trigger = detectTrigger({
      text,
      maxDelta: MAX_DELTA,
      akPrimary: AK_Primary,
      akBreakTypes: AK_Break_Type,
    });
    const Case_Phase = detectCasePhase(MAX_DELTA, Trigger);

    const Trigger_Memo = buildTriggerMemo({
      akPrimary: AK_Primary,
      akBreakTypes: AK_Break_Type,
      trigger: Trigger,
    });

    const R_Memo = buildRMemo({
      rPlus: R_Plus,
      rFailure: R_Failure,
      akPrimary: AK_Primary,
      apceMiss: APCE_Miss,
    });

    return res.status(200).json({
      finalContext,
      analysis: {
        MAX_DELTA,
        Trigger,
        R_Plus,
        AK_Break_Type,
        AK_Primary,
        APCE_Miss,
        R_Failure,
        Case_Phase,
        Trigger_Memo,
        R_Memo,
      },
    });
  } catch (error) {
    console.error("final-context error:", error);
    return res.status(500).json({
      error: "Server error",
    });
  }
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function includesAny(text, keywords) {
  return keywords.some((k) => text.includes(k));
}

function uniq(arr) {
  return [...new Set(arr)];
}

function detectMaxDelta(text) {
  const delta4 = [
    "拒絶",
    "帰る",
    "帰ります",
    "二度と",
    "許せない",
    "訴える",
    "最悪",
    "関係断絶",
  ];

  const delta3 = [
    "怒",
    "腹が立",
    "不信",
    "信頼できない",
    "ひどい",
    "納得できない",
    "ショック",
    "強い不快",
    "怖い",
    "危険",
  ];

  const delta2 = [
    "不満",
    "不安",
    "困る",
    "改善",
    "気になる",
    "心配",
    "ちゃんとして",
    "どうなる",
  ];

  const delta1 = [
    "違和感",
    "少し気になる",
    "なんとなく",
  ];

  if (includesAny(text, delta4)) return 4;
  if (includesAny(text, delta3)) return 3;
  if (includesAny(text, delta2)) return 2;
  if (includesAny(text, delta1)) return 1;
  return 0;
}

function detectAkBreakTypes(text) {
  const result = [];

  if (
    includesAny(text, [
      "冷たい",
      "雑",
      "受け止められていない",
      "感じが悪い",
      "失礼",
      "怒",
      "ひどい",
      "納得できない",
    ])
  ) {
    result.push("R");
  }

  if (
    includesAny(text, [
      "どうなる",
      "先が見えない",
      "見通し",
      "説明不足",
      "説明がない",
      "何度も確認",
      "不安",
      "待たされる",
    ])
  ) {
    result.push("P");
  }

  if (
    includesAny(text, [
      "誰が",
      "担当",
      "役割",
      "たらい回し",
      "引き継ぎ",
      "どこに聞けば",
    ])
  ) {
    result.push("L");
  }

  if (
    includesAny(text, [
      "怖い",
      "危険",
      "安全",
      "苦しい",
      "痛い",
      "息ができない",
      "不安でたまらない",
    ])
  ) {
    result.push("S");
  }

  return uniq(result);
}

function detectAkPrimary(text, akBreakTypes) {
  const candidates = [
    {
      key: "R",
      keywords: [
        "冷たい",
        "雑",
        "受け止められていない",
        "感じが悪い",
        "失礼",
        "怒",
        "ひどい",
        "納得できない",
      ],
    },
    {
      key: "L",
      keywords: [
        "誰が",
        "担当",
        "役割",
        "たらい回し",
        "引き継ぎ",
        "どこに聞けば",
      ],
    },
    {
      key: "P",
      keywords: [
        "どうなる",
        "先が見えない",
        "見通し",
        "説明不足",
        "説明がない",
        "何度も確認",
        "不安",
        "待たされる",
      ],
    },
    {
      key: "S",
      keywords: [
        "怖い",
        "危険",
        "安全",
        "苦しい",
        "痛い",
        "息ができない",
      ],
    },
  ];

  let best = null;

  for (const candidate of candidates) {
    for (const keyword of candidate.keywords) {
      const index = text.indexOf(keyword);
      if (index !== -1) {
        if (!best || index < best.index) {
          best = { key: candidate.key, index };
        }
      }
    }
  }

  if (best) return best.key;
  if (akBreakTypes.length > 0) return akBreakTypes[0];
  return "P";
}

function detectApceMiss(text, akPrimary, maxDelta) {
  if (includesAny(text, ["説明がない", "説明不足", "説明されない"])) return "P";
  if (includesAny(text, ["受け止められない", "わかってもらえない"])) return "A";
  if (includesAny(text, ["共感がない", "気持ちをわかってくれない"])) return "E";
  if (includesAny(text, ["調整されない", "整理されていない", "引き継がれていない"])) return "C";

  if (maxDelta >= 3) {
    if (akPrimary === "R") return "E";
    if (akPrimary === "P") return "P";
    if (akPrimary === "L") return "C";
    if (akPrimary === "S") return "";
  }

  if (akPrimary === "R") return "E";
  if (akPrimary === "P") return "P";
  if (akPrimary === "L") return "C";
  if (akPrimary === "S") return "";

  return "";
}

function detectRPlus(text) {
  if (
    includesAny(text, [
      "安心した",
      "納得した",
      "わかってもらえた",
      "助かった",
      "改善した",
      "落ち着いた",
    ])
  ) {
    return "Yes";
  }
  return "No";
}

function detectRFailureReason(text, rPlus) {
  if (rPlus === "Yes") return "";

  if (includesAny(text, ["待たされた", "遅い", "後回し"])) return "遅延";
  if (includesAny(text, ["違う", "ズレ", "かみ合わない"])) return "ミスマッチ";
  if (includesAny(text, ["何もされない", "説明がない", "声かけがない"])) return "未介入";

  return "記述不足";
}

function detectTrigger({ text, maxDelta, akPrimary, akBreakTypes }) {
  if (maxDelta === 4) return "Yes";

  if (maxDelta === 3 && akBreakTypes.includes("R")) return "Yes";

  const hasStateJump = includesAny(text, [
    "怒",
    "ショック",
    "強い不快",
    "信頼できない",
    "否定された",
    "批判された",
  ]);

  const hasEvent = includesAny(text, [
    "高圧的",
    "説明拒否",
    "説明不足",
    "不適切",
    "不公平",
    "安全無視",
  ]);

  if (maxDelta === 3 && akPrimary === "R" && hasStateJump && hasEvent) {
    return "Yes";
  }

  return "No";
}

function detectCasePhase(maxDelta, trigger) {
  if (maxDelta === 4) return "Trigger後";
  if (trigger === "Yes") return "Trigger時";
  return "Trigger前";
}

function buildTriggerMemo({ akPrimary, akBreakTypes, trigger }) {
  const primary = akPrimary || "不明";
  const support = akBreakTypes.filter((x) => x !== akPrimary).join("・") || "補助要因なし";
  return `[主因AK] ${primary} によりΔ上昇。[補助要因] ${support} が重なりTrigger${trigger === "Yes" ? "成立" : "未成立"}。`;
}

function buildRMemo({ rPlus, rFailure, akPrimary, apceMiss }) {
  if (rPlus === "Yes") {
    return "R+が確認できるため、関係は回復方向にあります。";
  }
  return `主因AKは ${akPrimary}、欠けた行為は ${apceMiss || "特定困難"} で、R失敗理由は ${rFailure} です。`;
}
