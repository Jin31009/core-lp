type CaseReportSectionProps = {
  delta: string;
  eLevel: string;
  text: string;
  judgment: string;
  actionSummary: string;
  executedActions: string[];
  onExecutedActionsChange: (value: string[]) => void;
  resultType: string;
  onResultTypeChange: (value: string) => void;
  onNext: () => void;
};

const actionOptions = [
  { key: "A", label: "A｜受け止めた" },
  { key: "C", label: "C｜確認した" },
  { key: "E", label: "E｜説明した" },
  { key: "X", label: "X｜補助した" },
];

const resultOptions = ["改善", "維持", "悪化", "不明"];

function ToggleButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[12px] border px-4 py-3 text-[14px] font-medium transition ${
        active
          ? "border-slate-700 bg-slate-700 text-white"
          : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
      }`}
    >
      {label}
    </button>
  );
}

export default function CaseReportSection({
  delta,
  eLevel,
  text,
  judgment,
  actionSummary,
  executedActions,
  onExecutedActionsChange,
  resultType,
  onResultTypeChange,
  onNext,
}: CaseReportSectionProps) {
  const sectionShell =
    "overflow-hidden rounded-[22px] border border-stone-200 bg-[#fbfaf7] shadow-[0_12px_36px_rgba(15,23,42,0.06)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[linear-gradient(180deg,#ede8dd_0%,#e6e1d6_100%)] px-6 py-7 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[36px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[18px] leading-9 text-stone-700";

  const sectionCard =
    "rounded-[18px] border border-stone-200 bg-white p-6 shadow-[0_3px_14px_rgba(15,23,42,0.04)]";

  const heroCard =
    "rounded-[20px] border-2 border-stone-300 bg-white p-7 shadow-[0_8px_22px_rgba(15,23,42,0.05)]";

  const subCard =
    "rounded-[16px] border border-stone-200 bg-[#fcfbf8] p-5";

  const softCard =
    "rounded-[18px] border border-stone-200 bg-[#f7f3eb] p-6";

  const primaryButton =
    "rounded-[12px] bg-slate-700 px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-slate-800";

  const stepChip =
    "inline-flex items-center rounded-full border border-stone-300 bg-white px-4 py-2 text-[12px] font-medium text-stone-700";

  const deltaLabel =
    delta === "1"
      ? "小さい"
      : delta === "2"
        ? "中くらい"
        : delta === "3"
          ? "高い"
          : "かなり高い";

  const resolvedObservation = text?.trim() || "まだ観察内容がありません。";
  const resolvedJudgment = judgment?.trim() || "まだ見立てがありません。";
  const resolvedPlannedAction = actionSummary?.trim() || "まだ対応方針がありません。";

  const toggleAction = (key: string) => {
    if (executedActions.includes(key)) {
      onExecutedActionsChange(executedActions.filter((item) => item !== key));
    } else {
      onExecutedActionsChange([...executedActions, key]);
    }
  };

  const canProceed = resultType !== "";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 04 / Case Report
        </p>
        <h2 className={sectionTitleClass}>ケースとして整理する</h2>
        <p className={leadClass}>
          ここでは、何が起きて、どう対応し、どうなったかを順番に振り返り、
          ケースとして記録できる形に整えていきます。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className={stepChip}>① 何が起きたか</span>
          <span className={stepChip}>② 予定していた対応</span>
          <span className={stepChip}>③ 実際に行った対応</span>
          <span className={stepChip}>④ 結果を置く</span>
        </div>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        {/* 1. Observation */}
        <div className={sectionCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            01 / Observation
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            何が起きたか
          </p>
          <p className="mt-4 text-[16px] leading-9 text-stone-700">
            {resolvedObservation}
          </p>
        </div>

        {/* 2. Planned Response */}
        <div className={heroCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            02 / Planned Response
          </p>
          <p className="mt-2 text-[24px] font-semibold tracking-[-0.01em] text-slate-900">
            予定していた対応
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            Step3で考えた「次の対応」を、ここでは予定していた方針として確認します。
          </p>

          <div className="mt-6 rounded-[16px] border border-stone-200 bg-[#fcfbf8] p-6">
            <p className="text-[17px] leading-9 text-stone-800">
              {resolvedPlannedAction}
            </p>
          </div>
        </div>

        {/* 3. Executed Response */}
        <div className={sectionCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            03 / Executed Response
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            実際に行った対応
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            実際に行った対応があれば選んでください。複数選択できます。
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {actionOptions.map((item) => (
              <ToggleButton
                key={item.key}
                label={item.label}
                active={executedActions.includes(item.key)}
                onClick={() => toggleAction(item.key)}
              />
            ))}
          </div>

          <div className="mt-6 rounded-[16px] border border-stone-200 bg-[#fcfbf8] p-5">
            <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
              Selected Actions
            </p>
            <p className="mt-2 text-[15px] leading-8 text-stone-700">
              {executedActions.length > 0
                ? executedActions.join(" / ")
                : "まだ選択されていません。"}
            </p>
          </div>
        </div>

        {/* 4. Result */}
        <div className={sectionCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            04 / Result
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            どうなったか
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            現時点での感覚で構いません。もっとも近いものを一つ選んでください。
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {resultOptions.map((item) => (
              <ToggleButton
                key={item}
                label={item}
                active={resultType === item}
                onClick={() => onResultTypeChange(item)}
              />
            ))}
          </div>
        </div>

        {/* 5. Reading */}
        <div className={softCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            05 / Relational Reading
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            どう読むか
          </p>
          <p className="mt-4 text-[16px] leading-9 text-stone-700">
            {resolvedJudgment}
          </p>
        </div>

        {/* 6. Summary */}
        <div className={sectionCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            06 / Case Summary
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            このケースの要点
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <div className={subCard}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Delta
              </p>
              <p className="mt-2 text-[18px] font-semibold text-slate-900">
                {deltaLabel}
              </p>
              <p className="mt-3 text-[14px] leading-8 text-stone-600">
                Δ{delta}
              </p>
            </div>

            <div className={subCard}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Phase
              </p>
              <p className="mt-2 text-[18px] font-semibold text-slate-900">
                {eLevel}
              </p>
              <p className="mt-3 text-[14px] leading-8 text-stone-600">
                いまの局面
              </p>
            </div>

            <div className={subCard}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Result
              </p>
              <p className="mt-2 text-[18px] font-semibold text-slate-900">
                {resultType || "未選択"}
              </p>
              <p className="mt-3 text-[14px] leading-8 text-stone-600">
                現時点での結果
              </p>
            </div>
          </div>
        </div>

        {/* Next */}
        <div className="rounded-[16px] border-t border-stone-200 pt-7">
          <p className="mb-4 text-[15px] leading-8 text-stone-600">
            ここまでまとまれば、ケースをDB形式で確認できます。
          </p>
          <button
            onClick={onNext}
            className={`${primaryButton} ${!canProceed ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={!canProceed}
            type="button"
          >
            DB見本へ進む
          </button>
        </div>
      </div>
    </section>
  );
}