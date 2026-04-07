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
  contextRequested: boolean;
  onRequestContext: () => void;
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
  contextRequested,
  onRequestContext,
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

  const analysisDisabled = !contextRequested;

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 01 / Observation
        </p>
        <h2 className={sectionTitleClass}>
          いま、どんな違和感がありましたか？
        </h2>
        <p className={leadClass}>
          少し気になる。でも、うまく言葉にできない。そんな違和感を、
          そのままにしていませんか。まずは一度、一緒に整理してみましょう。
        </p>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <div className={softCard}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Observation
          </p>
          <p className="mt-3 text-[15px] leading-9 text-stone-600">
            思いつくままに書いてみてください。断片的でも大丈夫です。
            発言、表情、場面のズレ、説明への反応など、気になったことを先に置きます。
          </p>
        </div>

        <div className={panelCard}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Case Note
          </p>
          <p className="mt-2 text-sm font-medium text-stone-700">
            気になったことを、まずそのまま書いてみてください
          </p>

          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="例：患者が説明を受けたあとも不安そうで、何度も確認していた。内容が十分に伝わっていないように見えた。"
            rows={4}
            className="mt-4 min-h-[120px] w-full rounded-[14px] border border-stone-300 bg-white p-5 text-[15px] leading-8 text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div className={softCard}>
          <p className="text-[14px] leading-8 text-stone-600">
            いまの内容をもとに、少しだけ整理の手がかりを加えてみましょう。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={panelCard}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
              Sensor 01
            </p>
            <p className="mt-2 text-sm font-medium text-stone-700">
              相手の反応として、どれが近いでしょうか。
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
              このあと、どんな対応が必要だと感じましたか。
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

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={onRequestContext} className={secondaryButton}>
            この内容を整理してみる
          </button>
        </div>

        {contextRequested && (
          <div className="rounded-[16px] border border-stone-200 bg-[#f3efe7] p-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                  Primary Context
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  いまの情報から、こんなふうに整理できそうです
                </p>
              </div>
              <div className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-500">
                AI共同整理
              </div>
            </div>

            <div className="mt-5 rounded-[14px] border-2 border-stone-300 bg-white p-5">
              <p className="text-[18px] font-semibold leading-9 text-stone-700">
                {contextDraft || "整理結果がここに表示されます。"}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                Context Note
              </p>
              <p className="mt-2 text-sm font-medium text-stone-700">
                必要に応じて、補足や修正をしてみてください
              </p>
              <p className="mt-2 text-[13px] leading-7 text-stone-500">
                場面やタイミングが分かると、より整理しやすくなります。
              </p>

              <textarea
                value={contextEdited}
                onChange={(e) => onContextEditedChange(e.target.value)}
                placeholder="例：検査前の説明の場面だった。待ち時間が長く、不安が強くなっていた。家族への説明も不足しているようだった。"
                rows={6}
                className="mt-3 min-h-[220px] w-full rounded-[14px] border border-stone-300 bg-white p-5 text-[15px] leading-8 text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onCheckState}
            className={`${primaryButton} ${analysisDisabled ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={analysisDisabled}
          >
            分析してみましょう
          </button>

          <button onClick={onClear} className={secondaryButton}>
            入力をクリア
          </button>
        </div>

        <div className="rounded-[16px] border border-stone-200 bg-[#f8f5ef] p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Guide
          </p>
          <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-slate-900">
            このステップでやっていること
          </h3>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[12px] border border-stone-200 bg-white p-4">
              <p className="text-sm font-medium text-stone-700">
                1. 違和感を置く
              </p>
              <p className="mt-2 text-[13px] leading-7 text-stone-500">
                まずは整理しきれなくても大丈夫です。気になったことを、そのまま置くところから始めます。
              </p>
            </div>

            <div className="rounded-[12px] border border-stone-200 bg-white p-4">
              <p className="text-sm font-medium text-stone-700">
                2. 手がかりを加える
              </p>
              <p className="mt-2 text-[13px] leading-7 text-stone-500">
                感情と対応意識を足すことで、AIが一次Contextを整理しやすくなります。
              </p>
            </div>

            <div className="rounded-[12px] border border-stone-200 bg-white p-4">
              <p className="text-sm font-medium text-stone-700">
                3. 文脈を整える
              </p>
              <p className="mt-2 text-[13px] leading-7 text-stone-500">
                AIが出した下書きをもとに、人が補足・修正し、次の分析の土台をつくります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}