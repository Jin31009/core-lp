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
    "overflow-hidden rounded-[22px] border border-stone-200 bg-[#fbfaf7] shadow-[0_10px_30px_rgba(15,23,42,0.06)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[linear-gradient(180deg,#ece8de_0%,#e6e1d6_100%)] px-6 py-6 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[34px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[17px] leading-9 text-stone-700";

  const softCard =
    "rounded-[16px] border border-stone-200 bg-[#f8f5ef] p-6";

  const panelCard =
    "rounded-[16px] border border-stone-200 bg-white p-6 shadow-[0_3px_12px_rgba(15,23,42,0.035)]";

  const contextWrap =
    "rounded-[18px] border border-stone-200 bg-[#f3efe7] p-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)]";

  const primaryButton =
    "rounded-[12px] bg-slate-700 px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-slate-800";

  const secondaryButton =
    "rounded-[12px] border border-stone-300 bg-white px-6 py-3.5 text-[15px] font-medium text-stone-700 transition hover:bg-stone-50";

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
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Observation
          </p>
          <p className="mt-3 text-[16px] leading-9 text-stone-700">
            思いつくままに書いてみてください。断片的でも大丈夫です。
            発言、表情、場面のズレ、説明への反応など、気になったことを先に置きます。
          </p>
        </div>

        <div className={panelCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Case Note
          </p>
          <p className="mt-2 text-[17px] font-semibold text-slate-900">
            気になったことを、まずそのまま書いてみてください
          </p>
          <p className="mt-2 text-[14px] leading-8 text-stone-600">
            一文でも大丈夫です。完全な文章でなくても、断片的なメモから始められます。
          </p>

          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="例：患者が説明を受けたあとも不安そうで、何度も確認していた。内容が十分に伝わっていないように見えた。"
            rows={5}
            className="mt-4 min-h-[160px] w-full rounded-[16px] border border-stone-300 bg-white p-5 text-[17px] leading-9 text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={panelCard}>
            <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
              Sensor 01
            </p>
            <p className="mt-2 text-[17px] font-semibold text-slate-900">
              相手の反応として、どれが近いでしょうか。
            </p>
            <p className="mt-2 text-[14px] leading-8 text-stone-600">
              いちばん近いものを一つ選んでください。
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
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
            <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
              Sensor 02
            </p>
            <p className="mt-2 text-[17px] font-semibold text-slate-900">
              このあと、どんな対応が必要だと感じましたか。
            </p>
            <p className="mt-2 text-[14px] leading-8 text-stone-600">
              現時点の感覚に近いものを選んでください。
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
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

        <div className={panelCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Context
          </p>
          <p className="mt-2 text-[19px] font-semibold text-slate-900">
            いまの内容を、まず整理してみる
          </p>
          <p className="mt-3 text-[14px] leading-8 text-stone-600">
            AIが一次的にContextを整えます。必要があれば、人が補足や修正を加えます。
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onRequestContext}
              className={secondaryButton}
              type="button"
            >
              この内容を整理してみる
            </button>

            <p className="text-[14px] leading-7 text-stone-500">
              押すと、この下に一次整理が表示されます。
            </p>
          </div>
        </div>

        {contextRequested && (
          <div className={contextWrap}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                  Primary Context
                </p>
                <p className="mt-2 text-[19px] font-semibold text-slate-900">
                  いまの情報から、こんなふうに整理できそうです
                </p>
              </div>

              <div className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[12px] text-stone-500">
                AI共同整理
              </div>
            </div>

            <div className="mt-5 rounded-[16px] border-2 border-stone-300 bg-white p-6">
              <p className="text-[20px] font-semibold leading-10 text-stone-700">
                {contextDraft || "整理結果がここに表示されます。"}
              </p>
            </div>

            <div className="mt-6 border-t border-dashed border-stone-300 pt-6">
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Context Note
              </p>
              <p className="mt-2 text-[16px] font-semibold text-slate-900">
                修正や補足を入れてください
              </p>
              <p className="mt-2 text-[14px] leading-8 text-stone-600">
                場面、順番、待ち時間、家族の関わりなど、必要だと思う情報を足してください。
              </p>

              <textarea
                value={contextEdited}
                onChange={(e) => onContextEditedChange(e.target.value)}
                placeholder="例：検査前の説明の場面だった。待ち時間が長く、不安が強くなっていた。家族への説明も不足しているようだった。"
                rows={6}
                className="mt-4 min-h-[220px] w-full rounded-[16px] border border-stone-300 bg-white p-5 text-[16px] leading-9 text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <p className="text-[15px] leading-8 text-stone-600">
          ここまで整理できれば、次に進めます。
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onCheckState}
            className={`${primaryButton} ${analysisDisabled ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={analysisDisabled}
            type="button"
          >
            関係の状態を見てみる
          </button>

          <button onClick={onClear} className={secondaryButton} type="button">
            入力をクリア
          </button>
        </div>
      </div>
    </section>
  );
}