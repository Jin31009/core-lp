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
    "overflow-hidden rounded-[22px] border border-stone-200 bg-[#fbfaf7] shadow-[0_12px_36px_rgba(15,23,42,0.06)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[linear-gradient(180deg,#ede8dd_0%,#e6e1d6_100%)] px-6 py-7 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[36px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[18px] leading-9 text-stone-700";

  const heroCard =
    "rounded-[20px] border-2 border-stone-300 bg-white p-7 shadow-[0_8px_22px_rgba(15,23,42,0.05)]";

  const sectionCard =
    "rounded-[18px] border border-stone-200 bg-white p-6 shadow-[0_3px_14px_rgba(15,23,42,0.04)]";

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

  const deltaHelp =
    delta === "1"
      ? "いまは大きな緊張は見えにくい状態です。"
      : delta === "2"
        ? "小さなズレがあり、見落とさず整える価値があります。"
        : delta === "3"
          ? "緊張が高まりつつあり、早めの関わりが有効です。"
          : "関係の不安定化が進みやすく、慎重な対応が必要です。";

  const stateLabel =
    delta === "1" || delta === "2"
      ? "まだ大きなズレは表面化していない状態"
      : delta === "3"
        ? "関係の揺れが見え始めている状態"
        : "関係のズレが表面化し始めている可能性がある状態";

  const stateTone =
    delta === "1" || delta === "2"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : delta === "3"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-rose-200 bg-rose-50 text-rose-800";

  const resolvedContextText =
    contextText?.trim() || "まだContextが整っていません。Step1で整理した内容がここに表示されます。";

  const resolvedObservationText =
    text?.trim() || "まだ観察内容がありません。Step1の自由記述がここに反映されます。";

  const resolvedInsightText =
    judgment?.trim() || "ここでは結論を出すのではなく、次にどこを見ればよいかの手がかりを整理します。";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 02 / Analysis
        </p>
        <h2 className={sectionTitleClass}>関係の整理</h2>
        <p className={leadClass}>
          Step1で整えたContextをもとに、いまの関係の状態を仮に読み直していきます。
          ここでは断定するのではなく、次に何を見ればよいかの見取り図をつくります。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className={stepChip}>① 最終Contextを読む</span>
          <span className={stepChip}>② 状態の強さを見る</span>
          <span className={stepChip}>③ 局面を確かめる</span>
          <span className={stepChip}>④ 次の対応へ進む</span>
        </div>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        {/* Context */}
        <div className={heroCard}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                01 / Final Context
              </p>
              <p className="mt-2 text-[24px] font-semibold tracking-[-0.01em] text-slate-900">
                整理された状況
              </p>
            </div>
            <div className="rounded-full border border-stone-200 bg-[#f8f5ef] px-4 py-1.5 text-[12px] text-stone-600">
              Step1の最終Context
            </div>
          </div>

          <div className="mt-6 rounded-[16px] border border-stone-200 bg-[#fcfbf8] p-6">
            <p className="text-[20px] font-semibold leading-10 text-stone-800">
              {resolvedContextText}
            </p>
          </div>
        </div>

        {/* State */}
        <div className={sectionCard}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                02 / State
              </p>
              <p className="mt-2 text-[22px] font-semibold text-slate-900">
                いまの関係の状態
              </p>
            </div>
            <span className={`rounded-full border px-4 py-1.5 text-[12px] font-medium ${stateTone}`}>
              仮の見立て
            </span>
          </div>

          <p className="mt-5 text-[19px] leading-9 text-stone-800">
            {stateLabel}
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            ここでは「良い・悪い」と結論づけるのではなく、
            関係の揺れがどの程度見え始めているかをやわらかく確認します。
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className={subCard}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Delta
              </p>
              <p className="mt-2 text-[18px] font-semibold text-slate-900">
                緊張の強さ
              </p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <p className="text-[30px] font-semibold tracking-[-0.02em] text-slate-900">
                  {deltaLabel}
                </p>
                <span className="text-[13px] text-stone-500">Δ{delta}</span>
              </div>
              <p className="mt-4 text-[15px] leading-8 text-stone-600">
                {deltaHelp}
              </p>
            </div>

            <div className={subCard}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Phase
              </p>
              <p className="mt-2 text-[18px] font-semibold text-slate-900">
                いまの局面
              </p>
              <div className="mt-4 rounded-[14px] border border-stone-200 bg-white p-4">
                <p className="text-[18px] font-semibold leading-8 text-slate-900">
                  {eLevel}
                </p>
              </div>
              <p className="mt-4 text-[15px] leading-8 text-stone-600">
                緊張の強さとは別に、いまがどの段階として読めるかを確認します。
              </p>
            </div>
          </div>
        </div>

        {/* Reading Support */}
        <div className={softCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            03 / Reading Support
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            補助的な読み取り
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            ここは結論ではなく、Contextと状態をどう読むかの補助です。
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[16px] border border-stone-200 bg-white p-5">
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Observation
              </p>
              <p className="mt-2 text-[17px] font-semibold text-slate-900">
                観察内容
              </p>
              <p className="mt-4 text-[15px] leading-9 text-stone-700">
                {resolvedObservationText}
              </p>
            </div>

            <div className="rounded-[16px] border border-stone-200 bg-white p-5">
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Insight Draft
              </p>
              <p className="mt-2 text-[17px] font-semibold text-slate-900">
                仮の見立てメモ
              </p>
              <p className="mt-4 text-[15px] leading-9 text-stone-700">
                {resolvedInsightText}
              </p>
            </div>
          </div>
        </div>

        {/* Next */}
        <div className="rounded-[16px] border-t border-stone-200 pt-7">
          <p className="mb-4 text-[15px] leading-8 text-stone-600">
            ここまで整理できれば、次の対応を具体的に考えられます。
          </p>
          <button onClick={onNext} className={primaryButton} type="button">
            次の対応を考える
          </button>
        </div>
      </div>
    </section>
  );
}