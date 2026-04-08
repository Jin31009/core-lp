type AnalysisSectionProps = {
  delta: string;
  eLevel: string;
  text: string;
  judgment: string;
  contextText: string;
  onNext: () => void;
};

function detectSignal(text: string) {
  if (!text) return "DISCOMFORT";

  const normalized = text.toLowerCase();

  const fearKeywords = [
    "怖",
    "恐",
    "危険",
    "危ない",
    "こわい",
    "命",
    "痛みが強い",
    "手術台",
    "息ができ",
  ];

  const anxietyKeywords = [
    "不安",
    "心配",
    "落ち着か",
    "何度も確認",
    "繰り返し確認",
    "表情が硬",
    "見通し",
    "説明が伝わ",
    "説明不足",
    "待ち時間",
    "待たされ",
    "先が見え",
    "このあと",
    "どうなる",
    "まだ呼ばれ",
    "予定がわから",
  ];

  const dissatKeywords = [
    "怒",
    "不満",
    "納得でき",
    "苦情",
    "冷たい",
    "雑",
    "ひどい",
    "ちゃんとして",
    "説明が違う",
    "対応が悪い",
  ];

  const safeKeywords = [
    "安心",
    "大丈夫",
    "落ち着い",
    "ほっと",
    "安堵",
  ];

  const trustKeywords = [
    "信頼",
    "任せ",
    "ありがたい",
    "感謝",
    "納得した",
    "安心して任せ",
  ];

  const hasAny = (keywords: string[]) =>
    keywords.some((keyword) => normalized.includes(keyword));

  if (hasAny(fearKeywords)) return "FEAR";
  if (hasAny(anxietyKeywords)) return "ANXIETY";
  if (hasAny(dissatKeywords)) return "DISSAT";
  if (hasAny(safeKeywords)) return "SAFE";
  if (hasAny(trustKeywords)) return "TRUST";

  return "DISCOMFORT";
}

function getSignalReason(signal: string) {
  switch (signal) {
    case "FEAR":
      return "強い恐れや危機感が前面に出ている状態として読めます";
    case "ANXIETY":
      return "先行きの不確実さや説明不足への揺れが続いている状態として読めます";
    case "DISSAT":
      return "否定的な評価や不満が関係の表面に出ている状態として読めます";
    case "SAFE":
      return "安心して状況を受け止められている状態として読めます";
    case "TRUST":
      return "相手や体制への任せられる感覚が保たれている状態として読めます";
    default:
      return "まだ大きくは破綻していないものの、軽いズレや違和感がある状態として読めます";
  }
}

function detectAlignmentKey(text: string, signal: string) {
  const normalized = text.toLowerCase();

  const score = {
    AK_SAFE: 0,
    AK_PREDICT: 0,
    AK_TRUST: 0,
    AK_RESPECT: 0,
    AK_ROLE: 0,
  };

  const addScore = (key: keyof typeof score, points: number) => {
    score[key] += points;
  };

  const safeKeywords = [
    "怖",
    "恐",
    "危険",
    "危ない",
    "こわい",
    "安全",
    "痛み",
    "苦しい",
    "息ができ",
  ];

  const predictKeywords = [
    "説明",
    "見通し",
    "いつ",
    "今後",
    "先",
    "このあと",
    "どうなる",
    "予定",
    "待ち時間",
    "まだ呼ばれ",
    "説明不足",
    "説明が伝わ",
    "わからない",
  ];

  const trustKeywords = [
    "信頼",
    "任せ",
    "信用",
    "感謝",
    "ありがたい",
    "安心して任せ",
    "納得した",
  ];

  const respectKeywords = [
    "冷たい",
    "雑",
    "軽く",
    "怒",
    "不満",
    "ひどい",
    "ちゃんとして",
    "対応が悪い",
    "説明が違う",
    "無視",
  ];

  const roleKeywords = [
    "誰",
    "担当",
    "役割",
    "引き継ぎ",
    "先生",
    "看護師",
    "どこに聞け",
    "どの人",
    "誰がやる",
  ];

  const addByKeywords = (keywords: string[], key: keyof typeof score, points = 2) => {
    keywords.forEach((keyword) => {
      if (normalized.includes(keyword)) addScore(key, points);
    });
  };

  addByKeywords(safeKeywords, "AK_SAFE");
  addByKeywords(predictKeywords, "AK_PREDICT");
  addByKeywords(trustKeywords, "AK_TRUST");
  addByKeywords(respectKeywords, "AK_RESPECT");
  addByKeywords(roleKeywords, "AK_ROLE");

  if (signal === "FEAR") addScore("AK_SAFE", 3);
  if (signal === "ANXIETY") addScore("AK_PREDICT", 3);
  if (signal === "TRUST") addScore("AK_TRUST", 3);
  if (signal === "DISSAT") addScore("AK_RESPECT", 3);

  if (
    normalized.includes("説明") &&
    (normalized.includes("伝わ") ||
      normalized.includes("不足") ||
      normalized.includes("わから"))
  ) {
    addScore("AK_PREDICT", 2);
  }

  if (
    normalized.includes("誰") &&
    (normalized.includes("担当") ||
      normalized.includes("聞け") ||
      normalized.includes("やる"))
  ) {
    addScore("AK_ROLE", 2);
  }

  if (
    normalized.includes("冷たい") ||
    normalized.includes("雑") ||
    normalized.includes("軽く扱")
  ) {
    addScore("AK_RESPECT", 2);
  }

  const ordered = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const [bestKey, bestScore] = ordered[0];
  const secondScore = ordered[1]?.[1] ?? 0;

  if (bestScore === 0) return "AK_PREDICT";

  // 同点に近いときは規則上の優先を少しだけかける
  if (bestScore === secondScore) {
    if (signal === "FEAR") return "AK_SAFE";
    if (signal === "ANXIETY") return "AK_PREDICT";
    if (signal === "TRUST") return "AK_TRUST";
    if (signal === "DISSAT") return "AK_RESPECT";
  }

  return bestKey;
}

function getAlignmentLabel(key: string) {
  switch (key) {
    case "AK_SAFE":
      return "AK_SAFE（安心）";
    case "AK_PREDICT":
      return "AK_PREDICT（見通し）";
    case "AK_TRUST":
      return "AK_TRUST（信頼）";
    case "AK_RESPECT":
      return "AK_RESPECT（尊重）";
    case "AK_ROLE":
      return "AK_ROLE（役割理解）";
    default:
      return key;
  }
}

function getAlignmentReason(key: string) {
  switch (key) {
    case "AK_SAFE":
      return "まず安全感が保たれているかどうかが重要な論点です";
    case "AK_PREDICT":
      return "先の見通しや説明の不足が、関係の揺れにつながっている可能性があります";
    case "AK_TRUST":
      return "相手に任せられる感覚が保たれているかが焦点になります";
    case "AK_RESPECT":
      return "大切に扱われている感覚が揺らいでいないかを確認する必要があります";
    case "AK_ROLE":
      return "誰が何を担うのかが見えにくく、役割理解の不足が影響している可能性があります";
    default:
      return "今回の読み取りでは、この観点が重要です";
  }
}

function detectApce(text: string, alignmentKey: string) {
  if (
    text.includes("説明") ||
    text.includes("伝え") ||
    text.includes("見通し") ||
    text.includes("案内")
  ) {
    return "C";
  }

  if (
    text.includes("寄り添") ||
    text.includes("受け止め") ||
    text.includes("声かけ") ||
    text.includes("気持ち")
  ) {
    return "A";
  }

  if (
    text.includes("待ち時間") ||
    text.includes("環境") ||
    text.includes("対応") ||
    text.includes("実施") ||
    text.includes("処置")
  ) {
    return "E";
  }

  if (
    text.includes("制止") ||
    text.includes("調整") ||
    text.includes("制御") ||
    text.includes("境界")
  ) {
    return "P";
  }

  if (alignmentKey === "AK_PREDICT") return "C";
  if (alignmentKey === "AK_SAFE") return "A";
  if (alignmentKey === "AK_TRUST") return "A";
  if (alignmentKey === "AK_RESPECT") return "A";
  if (alignmentKey === "AK_ROLE") return "C";

  return "C";
}

function getApceLabel(apce: string) {
  switch (apce) {
    case "A":
      return "A（共感）";
    case "P":
      return "P（許容・制御）";
    case "C":
      return "C（説明・予測）";
    case "E":
      return "E（実行・環境）";
    default:
      return apce;
  }
}

function getApceReason(apce: string) {
  switch (apce) {
    case "A":
      return "気持ちを受け止める関わりが重要な局面として読めます";
    case "P":
      return "行動や境界を調整する関わりが必要な局面として読めます";
    case "C":
      return "説明や見通し提示が重要な局面として読めます";
    case "E":
      return "実際の対応や環境調整が重要な局面として読めます";
    default:
      return "今回の読み取りでは、この行為が重要です";
  }
}

function detectR(alignmentKey: string, apce: string) {
  if (alignmentKey === "AK_SAFE" && apce === "A") return "R+";
  if (alignmentKey === "AK_PREDICT" && apce === "C") return "R+";
  if (alignmentKey === "AK_TRUST" && (apce === "A" || apce === "C")) return "R+";
  if (alignmentKey === "AK_RESPECT" && apce === "A") return "R+";
  if (alignmentKey === "AK_ROLE" && apce === "C") return "R+";

  return "R-";
}

function getRReason(alignmentKey: string, apce: string, rValue: string) {
  if (rValue === "R+") {
    switch (alignmentKey) {
      case "AK_SAFE":
        return "必要な安心に対して、受け止めや寄り添いが比較的適合している状態です";
      case "AK_PREDICT":
        return "必要な見通しに対して、説明や予測提示が比較的適合している状態です";
      case "AK_TRUST":
        return "信頼保持に対して、受理や説明が比較的適合している状態です";
      case "AK_RESPECT":
        return "尊重ニーズに対して、受け止めが比較的適合している状態です";
      case "AK_ROLE":
        return "役割理解に対して、説明や整理が比較的適合している状態です";
      default:
        return "必要な要素に対して、関わりが比較的適合している状態です";
    }
  }

  switch (alignmentKey) {
    case "AK_SAFE":
      return `安心が求められている一方で、現在の関わり（${getApceLabel(apce)}）は十分には適合していない可能性があります`;
    case "AK_PREDICT":
      return `見通しが求められている一方で、現在の関わり（${getApceLabel(apce)}）は十分には適合していない可能性があります`;
    case "AK_TRUST":
      return `信頼保持が求められている一方で、現在の関わり（${getApceLabel(apce)}）は十分には適合していない可能性があります`;
    case "AK_RESPECT":
      return `尊重が求められている一方で、現在の関わり（${getApceLabel(apce)}）は十分には適合していない可能性があります`;
    case "AK_ROLE":
      return `役割理解が求められている一方で、現在の関わり（${getApceLabel(apce)}）は十分には適合していない可能性があります`;
    default:
      return "必要な要素と現在の関わりの間にズレが残っている可能性があります";
  }
}

function detectTrigger(delta: string, rValue: string, signal: string) {
  const highDelta = delta === "3" || delta === "4";
  const unstableSignal =
    signal === "FEAR" || signal === "ANXIETY" || signal === "DISSAT";

  if (highDelta && rValue === "R-" && unstableSignal) {
    return "Triggerあり";
  }

  return "Triggerなし";
}

function getTriggerReason(
  delta: string,
  rValue: string,
  signal: string,
  trigger: string
) {
  if (trigger === "Triggerあり") {
    return `Signal=${signal} が続き、Δ${delta} と高めの緊張があり、現在の関わりが十分に適合していないため、Trigger成立の可能性があります`;
  }

  if (rValue === "R+") {
    return "必要な要素に対して一定の適合が見られるため、現時点ではTriggerは抑えられている状態です";
  }

  return "緊張やズレは見られますが、現時点ではTrigger成立とまでは読まない段階です";
}

export default function AnalysisSection({
  delta,
  eLevel,
  text,
  judgment,
  contextText,
  onNext,
}: AnalysisSectionProps) {
  const mergedText = `${contextText} ${text}`;
  const signal = detectSignal(mergedText);
  const alignmentKey = detectAlignmentKey(mergedText, signal);
  const apce = detectApce(mergedText, alignmentKey);
  const rValue = detectR(alignmentKey, apce);
  const trigger = detectTrigger(delta, rValue, signal);

  const deltaReason =
    delta === "1"
      ? "大きな緊張はまだ表面化していない状態です"
      : delta === "2"
        ? "小さなズレがあり、見落とさず整える価値があります"
        : delta === "3"
          ? "不安や揺れが継続しており、関係の緊張が高まりつつあります"
          : "強い緊張状態にあり、慎重な対応が必要です";

  const sectionShell =
    "overflow-hidden rounded-[22px] border border-stone-200 bg-[#fbfaf7]";

  const sectionHeader =
    "border-b border-stone-200 px-6 py-7 sm:px-8";

  const sectionCard =
    "rounded-[18px] border border-stone-200 bg-white p-6";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 02 / Analysis
        </p>
        <h2 className="mt-3 text-[32px] font-semibold text-slate-900">
          関係の読み取り
        </h2>
        <p className="mt-4 text-[16px] text-stone-700">
          Step1で整えたContextをもとに、いまの関係状態を読み直します。
        </p>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <div className={sectionCard}>
          <p className="text-sm text-stone-500">Context</p>
          <p className="mt-3 text-[18px] text-stone-800">
            {contextText}
          </p>
        </div>

        <div className={sectionCard}>
          <p className="text-sm text-stone-500">Signal</p>
          <p className="mt-3 text-[20px] font-semibold text-slate-900">
            {signal}
          </p>
          <p className="mt-2 text-[14px] text-stone-600">
            {getSignalReason(signal)}
          </p>
        </div>

        <div className={sectionCard}>
          <p className="text-sm text-stone-500">Alignment Key</p>
          <p className="mt-3 text-[20px] font-semibold text-slate-900">
            {getAlignmentLabel(alignmentKey)}
          </p>
          <p className="mt-2 text-[14px] text-stone-600">
            {getAlignmentReason(alignmentKey)}
          </p>
        </div>

        <div className={sectionCard}>
          <p className="text-sm text-stone-500">APCE</p>
          <p className="mt-3 text-[20px] font-semibold text-slate-900">
            {getApceLabel(apce)}
          </p>
          <p className="mt-2 text-[14px] text-stone-600">
            {getApceReason(apce)}
          </p>
        </div>

        <div className={sectionCard}>
          <p className="text-sm text-stone-500">R</p>
          <p className="mt-3 text-[20px] font-semibold text-slate-900">
            {rValue}
          </p>
          <p className="mt-2 text-[14px] text-stone-600">
            {getRReason(alignmentKey, apce, rValue)}
          </p>
        </div>

        <div className={sectionCard}>
          <p className="text-sm text-stone-500">Trigger</p>
          <p className="mt-3 text-[20px] font-semibold text-slate-900">
            {trigger}
          </p>
          <p className="mt-2 text-[14px] text-stone-600">
            {getTriggerReason(delta, rValue, signal, trigger)}
          </p>
        </div>

        <div className={sectionCard}>
          <p className="text-sm text-stone-500">Δ（関係緊張）</p>
          <p className="mt-3 text-[22px] font-semibold text-slate-900">
            Δ{delta}
          </p>
          <p className="mt-2 text-[14px] text-stone-600">
            {deltaReason}
          </p>
        </div>

        <div className={sectionCard}>
          <p className="text-sm text-stone-500">Phase</p>
          <p className="mt-3 text-[20px] font-semibold text-slate-900">
            {eLevel}
          </p>
        </div>

        <div className={sectionCard}>
          <p className="text-sm text-stone-500">Insight</p>
          <p className="mt-3 text-[16px] text-stone-700">
            {judgment}
          </p>
        </div>

        <button
          onClick={onNext}
          className="rounded-[12px] bg-slate-700 px-6 py-3 text-white"
        >
          次の対応へ
        </button>
      </div>
    </section>
  );
}