type AcexItem = {
  key: string;
  label: string;
  title: string;
  body: string;
};

type ResponseSectionProps = {
  actionSummary: string;
  acexItems: AcexItem[];
  flowItems: string[];
  ngItems: string[];
  statusLabel: string;
  statusSub: string;
  statusIcon: string;
  statusColorClass: string;
  onNext: () => void;
};

export default function ResponseSection({
  actionSummary,
  acexItems,
  flowItems,
  ngItems,
  statusLabel,
  statusSub,
  statusIcon,
  statusColorClass,
  onNext,
}: ResponseSectionProps) {
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

  const policyText =
    statusLabel === "安定"
      ? "現在は大きな緊張が見られないため、過剰に介入せず、観察を維持しながら必要最小限の説明を行います。"
      : statusLabel === "注意"
      ? "緊張が高まりつつあるため、まず受け止めを優先し、不足感やズレの中身を確認しながら順序立てて対応します。"
      : "関係が崩れ始めている可能性があるため、急がず安全に配慮しながら、確認と説明を丁寧に組み直す対応が必要です。";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 03 / Response
        </p>
        <h2 className={sectionTitleClass}>次の対応</h2>
        <p className={leadClass}>
          ここでは、確認結果を受けて何をどう進めるかを見ます。
          ACE＋X、Flow、NG を順に確認してください。
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* 状態に応じた対応方針 */}
        <div className={softCard}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                Response Policy
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                状態に応じた対応方針
              </p>
            </div>

            <div className={`text-lg font-semibold ${statusColorClass}`}>
              {statusIcon}
            </div>
          </div>

          <div className="mt-4 rounded-[12px] border border-stone-200 bg-white p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-stone-500">
              Current State
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">
              {statusLabel}
            </p>
            <p className="mt-1 text-[13px] leading-7 text-stone-500">
              {statusSub}
            </p>
          </div>

          <p className="mt-4 text-[14px] leading-8 text-stone-600">
            {policyText}
          </p>
        </div>

        <div className={`mt-8 ${panelCard}`}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Response Summary
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-900">
            次の対応の要約
          </p>
          <p className="mt-3 text-[15px] leading-9 text-stone-600">
            {actionSummary}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {acexItems.map((item) => (
            <div key={item.key} className={panelCard}>
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                {item.label}
              </p>
              <p className="mt-3 text-sm font-medium text-stone-700">
                {item.title}
              </p>
              <p className="mt-3 text-[15px] leading-9 text-stone-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-8 ${panelCard}`}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Flow
          </p>
          <p className="mt-3 text-sm font-medium text-stone-700">
            行為の順番
          </p>
          <ol className="mt-3 space-y-2 text-[15px] leading-9 text-stone-600">
            {flowItems.map((item, index) => (
              <li key={index}>
                {index + 1}. {item}
              </li>
            ))}
          </ol>
        </div>

        <div className={`mt-8 ${panelCard}`}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            NG
          </p>
          <p className="mt-3 text-sm font-medium text-stone-700">
            避けたい行動
          </p>
          <ul className="mt-3 space-y-2 text-[15px] leading-9 text-stone-600">
            {ngItems.map((item, index) => (
              <li key={index}>・{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-stone-200 pt-6">
          <button onClick={onNext} className={primaryButton}>
            Step4へ進む
          </button>
        </div>

        <div className="mt-8 rounded-[14px] border border-stone-200 bg-[#f8f5ef] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Guide
          </p>
          <p className="mt-2 text-[13px] leading-7 text-stone-500">
            ACE＋Xで対応の中身を確認し、Flowで順序を整理します。
            NGも見ながら、避けるべき行動を意識します。
          </p>
        </div>
      </div>
    </section>
  );
}