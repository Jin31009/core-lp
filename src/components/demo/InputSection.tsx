type InputSectionProps = {
  text: string;
  onTextChange: (value: string) => void;
  onCheckState: () => void;
  onClear: () => void;
};

export default function InputSection({
  text,
  onTextChange,
  onCheckState,
  onClear,
}: InputSectionProps) {
  const sectionShell =
    "overflow-hidden rounded-[18px] border border-stone-200 bg-[#fbfaf7] shadow-[0_8px_28px_rgba(15,23,42,0.05)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[#e9e5dc] px-6 py-5 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-3xl font-semibold tracking-[-0.01em] text-slate-900";

  const softCard =
    "rounded-[14px] border border-stone-200 bg-[#f8f5ef] p-5";

  const leadClass =
    "mt-3 text-[15px] leading-8 text-stone-600";

  const primaryButton =
    "rounded-[10px] bg-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800";

  const secondaryButton =
    "rounded-[10px] border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 01 / Observation
        </p>
        <h2 className={sectionTitleClass}>観察内容を入力</h2>
        <p className={leadClass}>
          ここでは、まず気になったことを短く記述します。評価や判断より前に、
          観察を言葉にして置く段階です。
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <div className={softCard}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Observation
          </p>
          <p className="mt-3 text-[15px] leading-9 text-stone-600">
            患者の発言、表情、説明場面での違和感、やり取りのズレなどを入力します。
          </p>
        </div>

        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="例：患者が説明が足りない気がすると不安を訴えている"
          rows={7}
          className="mt-8 w-full rounded-[14px] border border-stone-300 bg-white p-5 text-[15px] leading-9 text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
        />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button onClick={onCheckState} className={primaryButton}>
            状態を確認する
          </button>

          <button onClick={onClear} className={secondaryButton}>
            入力をクリア
          </button>
        </div>
      </div>
    </section>
  );
}