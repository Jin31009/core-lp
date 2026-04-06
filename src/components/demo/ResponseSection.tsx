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
  onNext: () => void;
};

export default function ResponseSection({
  actionSummary,
  acexItems,
  flowItems,
  ngItems,
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

  const leadClass =
    "mt-3 text-[15px] leading-8 text-stone-600";

  const primaryButton =
    "rounded-[10px] bg-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800";

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
        <div className={panelCard}>
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
          <p className="mt-3 text-sm font-medium text-stone-700">行為の順番</p>
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
            ケース記録を見る
          </button>
        </div>
      </div>
    </section>
  );
}