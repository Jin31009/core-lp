type InputSectionProps = {
  text: string;
  onTextChange: (value: string) => void;
  emotion: string;
  onEmotionChange: (value: string) => void;
  urgency: string;
  onUrgencyChange: (value: string) => void;
  contextDraft: string;
  contextEdited: string;
  onContextEditedChange: (value: string) => void;
  onCheckState: () => void;
  onClear: () => void;
};

const emotionOptions = ["不安", "怒り", "戸惑い", "悲しみ", "無反応"];
const urgencyOptions = ["緊急対応", "対応必要", "経過観察", "不要"];

function ChoiceButton({
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
      className={`rounded-[10px] border px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "border-slate-700 bg-slate-700 text-white"
          : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
      }`}
    >
      {label}
    </button>
  );
}

export default function InputSection({
  text,
  onTextChange,
  emotion,
  onEmotionChange,
  urgency,
  onUrgencyChange,
  contextDraft,
  contextEdited,
  onContextEditedChange,
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

  const panelCard =
    "rounded-[14px] border border-stone-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)]";

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
          自由記述に加えて、感情と対応必要性のセンサーを補助的に入れます。
          その情報をもとに、次の段階で使う Context を整理します。
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

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className={panelCard}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Sensor 01
            </p>
            <p className="mt-2 text-sm font-medium text-stone-700">
              相手の主な反応
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {emotionOptions.map((option) => (
                <ChoiceButton
                  key={option}
                  label={option}
                  active={emotion === option}
                  onClick={() => onEmotionChange(option)}
                />
              ))}
            </div>
          </div>

          <div className={panelCard}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Sensor 02
            </p>
            <p className="mt-2 text-sm font-medium text-stone-700">
              対応の必要性
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {urgencyOptions.map((option) => (
                <ChoiceButton
                  key={option}
                  label={option}
                  active={urgency === option}
                  onClick={() => onUrgencyChange(option)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[14px] border border-stone-200 bg-[#f8f5ef] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                Context Draft
              </p>
              <p className="mt-2 text-sm font-medium text-stone-700">
                このように整理できます
              </p>
            </div>
            <div className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-500">
              AI共同整理
            </div>
          </div>

          <div className="mt-4 rounded-[12px] border border-stone-200 bg-white p-4">
            <p className="text-[14px] leading-8 text-stone-600">
              {contextDraft || "自由記述とセンサー入力をもとに整理結果がここに表示されます。"}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-stone-700">
              補足や修正はありますか？
            </p>
            <textarea
              value={contextEdited}
              onChange={(e) => onContextEditedChange(e.target.value)}
              placeholder="必要なら補足・修正を記入"
              rows={4}
              className="mt-3 w-full rounded-[12px] border border-stone-300 bg-white p-4 text-[14px] leading-8 text-slate-800 placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button onClick={onCheckState} className={primaryButton}>
            Step2へ進む
          </button>

          <button onClick={onClear} className={secondaryButton}>
            入力をクリア
          </button>
        </div>

        <div className="mt-8 rounded-[14px] border border-stone-200 bg-[#f8f5ef] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Guide
          </p>
          <p className="mt-2 text-[13px] leading-7 text-stone-500">
            自由記述に加えて、感情と必要性のセンサーを入れることで、
            次段階の Context と分析の粒度をそろえます。
          </p>
        </div>
      </div>
    </section>
  );
}　