type AnalysisSectionProps = {
  delta: string;
  eLevel: string;
  text: string;
  judgment: string;
  onNext: () => void;
};

export default function AnalysisSection({
  delta,
  eLevel,
  text,
  judgment,
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

  const leadClass =
    "mt-3 text-[15px] leading-8 text-stone-600";

  const primaryButton =
    "rounded-[10px] bg-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 02 / Analysis
        </p>
        <h2 className={sectionTitleClass}>確認結果</h2>
        <p className={leadClass}>
          観察内容をもとに、いまの関係の状態を簡易に整理します。
          まずは全体像をつかむための段階です。
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
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
          <p className="mt-3 text-sm font-medium text-stone-700">観察内容</p>
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
            次の対応を見る
          </button>
        </div>
      </div>
    </section>
  );
}