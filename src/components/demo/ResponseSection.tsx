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

  const policyText =
    statusLabel === "安定"
      ? "現在は大きな緊張が見られないため、過剰に介入せず、観察を維持しながら必要最小限の説明を行います。"
      : statusLabel === "注意"
        ? "緊張が高まりつつあるため、まず受け止めを優先し、不足感やズレの中身を確認しながら順序立てて対応します。"
        : "関係が崩れ始めている可能性があるため、急がず安全に配慮しながら、確認と説明を丁寧に組み直す対応が必要です。";

  const stateBridgeText =
    statusLabel === "安定"
      ? "いまは大きく崩れていないため、整えすぎず、観察を保ちながら進めます。"
      : statusLabel === "注意"
        ? "関係の揺れが見え始めているため、まず受け止めと確認の順番を大切にします。"
        : "関係の不安定化が進みやすいため、安全・確認・説明の順序を崩さずに進めます。";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 03 / Response
        </p>
        <h2 className={sectionTitleClass}>次の対応を考える</h2>
        <p className={leadClass}>
          ここでは結論を押しつけるのではなく、Step2で見えてきた状態をもとに、
          次の一手の候補を順番に考えていきます。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className={stepChip}>① 方針を確認する</span>
          <span className={stepChip}>② 候補を読む</span>
          <span className={stepChip}>③ 順番を確認する</span>
          <span className={stepChip}>④ 避ける行動を見る</span>
        </div>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        {/* 1. Policy */}
        <div className={heroCard}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                01 / Response Policy
              </p>
              <p className="mt-2 text-[24px] font-semibold tracking-[-0.01em] text-slate-900">
                状態に応じた対応方針
              </p>
            </div>

            <div className={`text-[20px] font-semibold ${statusColorClass}`}>
              {statusIcon}
            </div>
          </div>

          <div className="mt-6 rounded-[16px] border border-stone-200 bg-[#fcfbf8] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                  Current State
                </p>
                <p className="mt-2 text-[19px] font-semibold text-slate-900">
                  {statusLabel}
                </p>
                <p className="mt-2 text-[15px] leading-8 text-stone-600">
                  {statusSub}
                </p>
              </div>

              <div className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[12px] text-stone-600">
                仮の見立てに基づく方針
              </div>
            </div>

            <p className="mt-5 text-[17px] leading-9 text-stone-800">
              {stateBridgeText}
            </p>

            <p className="mt-4 text-[15px] leading-8 text-stone-600">
              {policyText}
            </p>
          </div>
        </div>

        {/* 2. Summary */}
        <div className={sectionCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            02 / Response Summary
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            次の対応の要点
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            ここでは、現場で考えやすい対応の軸を短くまとめています。
          </p>
          <p className="mt-4 text-[17px] leading-9 text-stone-800">
            {actionSummary}
          </p>
        </div>

        {/* 3. Candidates */}
        <div className={sectionCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            03 / Response Candidates
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            候補となる関わり方
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            ここでは候補を並べています。現場の状況に応じて、必要なものを選んで使えます。
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {acexItems.map((item) => (
              <div key={item.key} className={subCard}>
                <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                  {item.label}
                </p>
                <p className="mt-2 text-[18px] font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-4 text-[15px] leading-8 text-stone-700">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Flow */}
        <div className={softCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            04 / Flow
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            進める順番
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            同じ内容でも、順番が変わると伝わり方が変わります。ここでは進める流れを確認します。
          </p>

          <ol className="mt-6 space-y-4">
            {flowItems.map((item, index) => (
              <li
                key={index}
                className="rounded-[16px] border border-stone-200 bg-white p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-[#f8f5ef] text-[13px] font-semibold text-stone-700">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-[15px] leading-8 text-stone-700">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 5. NG */}
        <div className={sectionCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            05 / NG
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            避けたい行動
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            やることだけでなく、避けることも一緒に確認します。
          </p>

          <ul className="mt-6 space-y-3">
            {ngItems.map((item, index) => (
              <li
                key={index}
                className="rounded-[14px] border border-stone-200 bg-[#fcfbf8] px-5 py-4 text-[15px] leading-8 text-stone-700"
              >
                ・{item}
              </li>
            ))}
          </ul>
        </div>

        {/* Next */}
        <div className="rounded-[16px] border-t border-stone-200 pt-7">
          <p className="mb-4 text-[15px] leading-8 text-stone-600">
            ここまで整理できれば、実際に何を行い、どうなったかを振り返る段階へ進めます。
          </p>
          <button onClick={onNext} className={primaryButton} type="button">
            ケース記録へ進む
          </button>
        </div>
      </div>
    </section>
  );
}