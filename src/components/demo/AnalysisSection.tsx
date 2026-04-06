type AnalysisSectionProps = {
  delta: string;
  eLevel: string;
  text: string;
  judgment: string;
  contextText: string;
  onNext: () => void;
};

export default function AnalysisSection({
  delta,
  eLevel,
  text,
  judgment,
  contextText,
  onNext,
}: AnalysisSectionProps) {
  const sectionShell =
    "overflow-hidden rounded-[18px] border border-stone-200 bg-[#fbfaf7] shadow-[0_8px_28px_rgba(15,23,42,0.05)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[#e9e5dc] px-6 py-5 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-3xl font-semibold tracking-[-0.01em] text-slate-900";

  const panelCard =
    "rounded-[14px] border border-stone-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)]";

  const softCard =
    "rounded-[14px] border border-stone-200 bg-[#f8f5ef] p-5";

  const leadClass =
    "mt-3 text-[15px] leading-8 text-stone-600";

  const primaryButton =
    "rounded-[10px] bg-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800";

  let level: "safe" | "warning" | "danger" = "safe";
  if (delta === "3") level = "warning";
  if (delta === "4") level = "danger";

  const statusConfig = {
    safe: {
      label: "安定",
      sub: "大きな緊張は見られない",
      icon: "—",
      color: "text-stone-400",
    },
    warning: {
      label: "注意",
      sub: "緊張が高まりつつある",
      icon: "🔥",
      color: "text-yellow-500",
    },
    danger: {
      label: "危険",
      sub: "関係が崩れ始めている可能性",
      icon: "🔥🔥",
      color: "text-red-500",
    },
  };

  const status = statusConfig[level];

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 02 / Analysis
        </p>
        <h2 className={sectionTitleClass}>確認結果</h2>
        <p className={leadClass}>
          入力内容とセンサー情報をもとに、文脈と関係状態を整理します。
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between rounded-[14px] border border-stone-200 bg-white px-5 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              状態
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {status.label}
            </p>
            <p className="text-[13px] text-stone-500">{status.sub}</p>
          </div>

          <div className={`text-xl font-semibold ${status.color}`}>
            {status.icon}
          </div>
        </div>

        <div className={softCard}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Context
          </p>
          <p className="mt-3 text-sm font-medium text-stone-700">
            文脈整理
          </p>
          <p className="mt-3 text-[15px] leading-9 text-stone-600">
            {contextText || "文脈情報はまだありません"}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className={panelCard}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Delta
            </p>
            <p className="mt-3 text-sm font-medium text-stone-700">
              Δ（関係緊張）
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-slate-900">
              {delta}
            </p>
          </div>

          <div className={panelCard}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Phase
            </p>
            <p className="mt-3 text-sm font-medium text-stone-700">
              e（フェーズ）
            </p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.01em] text-slate-900">
              {eLevel}
            </p>
          </div>
        </div>

        <div className={`mt-8 ${panelCard}`}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Observation Summary
          </p>
          <p className="mt-3 text-sm font-medium text-stone-700">
            観察内容
          </p>
          <p className="mt-3 text-[15px] leading-9 text-stone-600">
            {text ? text : "まだ入力がありません"}
          </p>
        </div>

        <div className={`mt-8 ${panelCard}`}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Interpretation
          </p>
          <p className="mt-3 text-sm font-medium text-stone-700">
            状態の見立て
          </p>
          <p className="mt-3 text-[15px] leading-9 text-stone-600">
            {judgment}
          </p>
        </div>

        <div className="mt-8 border-t border-stone-200 pt-6">
          <button onClick={onNext} className={primaryButton}>
            Step3へ進む
          </button>
        </div>

        <div className="mt-8 rounded-[14px] border border-stone-200 bg-[#f8f5ef] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Guide
          </p>
          <p className="mt-2 text-[13px] leading-7 text-stone-500">
            自由記述とセンサー情報から文脈を整理し、その上で関係状態を読みます。
          </p>
        </div>
      </div>
    </section>
  );
}