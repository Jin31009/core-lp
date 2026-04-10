


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

  const safeKeywords = ["安心", "大丈夫", "落ち着い", "ほっと", "安堵"];

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

  const addByKeywords = (
    keywords: string[],
    key: keyof typeof score,
    points = 2
  ) => {
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
  const [showRelationalReading, setShowRelationalReading] = useState(false);

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

  const triggerTone =
    trigger === "Triggerあり"
      ? {
          card: "border-rose-300 bg-rose-50",
          text: "text-rose-700",
          chip: "border-rose-300 bg-white text-rose-700",
        }
      : {
          card: "border-emerald-300 bg-emerald-50",
          text: "text-emerald-700",
          chip: "border-emerald-300 bg-white text-emerald-700",
        };

  const sectionShell =
    "overflow-hidden rounded-[22px] border border-stone-200 bg-[#fbfaf7] shadow-[0_12px_36px_rgba(15,23,42,0.05)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[linear-gradient(180deg,#ede8dd_0%,#e6e1d6_100%)] px-6 py-7 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[34px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[18px] leading-9 text-stone-700";

  const groupWrap =
    "rounded-[18px] border border-stone-200 bg-white p-6 shadow-[0_3px_14px_rgba(15,23,42,0.04)]";

  const subCard =
    "rounded-[16px] border border-stone-200 bg-[#fcfbf8] p-5";

  const contextCard =
    "rounded-[18px] border-2 border-stone-300 bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.05)]";

  const primaryButton =
    "w-full rounded-[14px] bg-blue-600 py-4 text-[16px] font-medium text-white transition hover:bg-blue-700";

  const secondaryButton =
    "rounded-[12px] border border-stone-300 bg-white px-6 py-3.5 text-[15px] font-medium text-stone-700 transition hover:bg-stone-50";

  const expandButton =
    "rounded-[12px] border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-medium text-slate-700 transition hover:bg-slate-50";

  const nextStepNote =
    "mt-5 rounded-[14px] border border-dashed border-stone-300 bg-white/80 px-4 py-3 text-[14px] leading-7 text-stone-600";

  const groupTitle = "mt-2 text-[24px] font-semibold text-slate-900";
  const groupLead = "mt-3 text-[17px] leading-8 text-stone-700";
  const bodyText = "mt-3 text-[16px] leading-8 text-stone-700";
  const reasonText = "mt-3 text-[15px] leading-8 text-stone-600";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 02 / Analysis
        </p>
        <h2 className={sectionTitleClass}>関係の読み取り</h2>
        <p className={leadClass}>
          Step1で整えたContextをもとに、いまの関係状態を構造として読み直します。
          ここでは、何が起きていて、何が不足し、関係がどう動いているかを順に見ていきます。
        </p>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <div className={contextCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            01 / Context
          </p>
          <p className="mt-2 text-[24px] font-semibold tracking-[-0.01em] text-slate-900">
            整理された状況
          </p>
          <p className="mt-5 text-[21px] leading-10 text-stone-800">
            {contextText}
          </p>
          <div className={nextStepNote}>
            次の一手：まず下で、いま表れている状態と緊張の強さを確認します。
          </div>
        </div>

        <div className={groupWrap}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            02 / State Reading
          </p>
          <p className={groupTitle}>いま表れている状態</p>
          <p className={groupLead}>
            まず、現在の関係がどのような状態として表れているかを読み取ります。
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className={subCard}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Signal
              </p>
              <p className="mt-2 text-[22px] font-semibold text-slate-900">
                {signal}
              </p>
              <p className={reasonText}>{getSignalReason(signal)}</p>
            </div>

            <div className={subCard}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Δ（関係緊張）
              </p>
              <p className="mt-2 text-[22px] font-semibold text-slate-900">
                Δ{delta}
              </p>
              <p className={reasonText}>{deltaReason}</p>
            </div>
          </div>

          <div className={nextStepNote}>
            次の一手：必要なら、下を開いて「何が不足し、関係がどう動いているか」を確認します。
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowRelationalReading((prev) => !prev)}
              className={expandButton}
            >
              {showRelationalReading
                ? "関係の読み取りを閉じる"
                : "関係の読み取りをさらに進める"}
            </button>

            <p className="text-[14px] leading-7 text-stone-500">
              ここを開くと、Alignment Key / APCE / R / Trigger が表示されます。
            </p>
          </div>
        </div>

        {showRelationalReading && (
          <>
            <div className={groupWrap}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                03 / Missing Need
              </p>
              <p className={groupTitle}>何が不足しているか</p>
              <p className={groupLead}>
                次に、いまの関係で満たされにくくなっている要素を見ます。
              </p>

              <div className="mt-6">
                <div className={subCard}>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    Alignment Key
                  </p>
                  <p className="mt-2 text-[22px] font-semibold text-slate-900">
                    {getAlignmentLabel(alignmentKey)}
                  </p>
                  <p className={reasonText}>{getAlignmentReason(alignmentKey)}</p>
                </div>
              </div>

              <div className={nextStepNote}>
                次の一手：不足している要素に対して、今の関わりがどう作用しているかを下で確認します。
              </div>
            </div>

            <div className={groupWrap}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                04 / Relational Movement
              </p>
              <p className={groupTitle}>関係はどう動いているか</p>
              <p className={groupLead}>
                必要な要素に対して、現在の関わりがどう作用しているかを見ます。
              </p>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className={subCard}>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    APCE
                  </p>
                  <p className="mt-2 text-[22px] font-semibold text-slate-900">
                    {getApceLabel(apce)}
                  </p>
                  <p className={reasonText}>{getApceReason(apce)}</p>
                </div>

                <div className={subCard}>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    R
                  </p>
                  <p className="mt-2 text-[22px] font-semibold text-slate-900">
                    {rValue}
                  </p>
                  <p className={reasonText}>
                    {getRReason(alignmentKey, apce, rValue)}
                  </p>
                </div>
              </div>

              <div className={nextStepNote}>
                次の一手：最後に、局面全体を Trigger・Phase・Insight でまとめて確認します。
              </div>
            </div>

            <div className={groupWrap}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                05 / Overall Reading
              </p>
              <p className={groupTitle}>全体の見立て</p>
              <p className={groupLead}>
                最後に、局面全体をまとめて、次の対応にどうつなぐかを確認します。
              </p>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className={`rounded-[16px] border p-5 ${triggerTone.card}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                      Trigger
                    </p>
                    <span
                      className={`rounded-full border px-3 py-1 text-[12px] font-medium ${triggerTone.chip}`}
                    >
                      {trigger}
                    </span>
                  </div>
                  <p className={`mt-3 text-[23px] font-semibold ${triggerTone.text}`}>
                    {trigger}
                  </p>
                  <p className="mt-3 text-[15px] leading-8 text-stone-700">
                    {getTriggerReason(delta, rValue, signal, trigger)}
                  </p>
                </div>

                <div className={subCard}>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    Phase
                  </p>
                  <p className="mt-2 text-[22px] font-semibold text-slate-900">
                    {eLevel}
                  </p>
                  <p className={reasonText}>
                    現在の緊張と関係の動きから、この局面はこの段階として読むのが自然です。
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className={subCard}>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    Insight
                  </p>
                  <p className={bodyText}>{judgment}</p>
                </div>
              </div>

              <div className={nextStepNote}>
                次の一手：必要なら Step1 に戻って補足を見直し、そのまま進める場合は下のボタンで次の対応へ移ります。
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({
                      top: 500,
                      behavior: "smooth",
                    });
                  }}
                  className={secondaryButton}
                >
                  Step1に戻って補足を見直す
                </button>
              </div>
            </div>
          </>
        )}

        <div className="rounded-[16px] border-t border-stone-200 pt-4">
          <div className={nextStepNote}>
            次の一手：内容が確認できたら、「次の対応へ」で Step3 に進みます。
          </div>

          <div className="mt-4">
            <button onClick={onNext} className={primaryButton} type="button">
              次の対応へ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}