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
  followups: string[];
  finalContextDraft: string;
  isGeneratingFinalContext: boolean;
  onGenerateFinalContext: () => void;
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

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone-500" />
      <span
        className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone-500"
        style={{ animationDelay: "0.15s" }}
      />
      <span
        className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone-500"
        style={{ animationDelay: "0.3s" }}
      />
    </span>
  );
}

function LoadingCard() {
  return (
    <div
      className="mt-5 overflow-hidden rounded-[18px] border border-stone-300 bg-[#f6f1e8] shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
      role="status"
      aria-live="polite"
    >
      <div className="border-b border-stone-200 bg-[linear-gradient(180deg,#f1ece2_0%,#ece5d9_100%)] px-5 py-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
          RA-AI / Loading
        </p>
        <p className="mt-2 text-[18px] font-semibold text-slate-900">
          一次整理を生成しています
        </p>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white shadow-sm">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-slate-700" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[16px] leading-8 text-stone-700">
              入力内容をもとに、場面と関係の文脈を整理しています。
            </p>

            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-stone-200">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-500" />
            </div>

            <div className="mt-4 grid gap-2 text-[14px] leading-7 text-stone-600">
              <div className="flex items-center gap-2">
                <LoadingDots />
                <span>観察内容を読み取っています</span>
              </div>
              <div className="flex items-center gap-2">
                <LoadingDots />
                <span>関係の文脈を整えています</span>
              </div>
              <div className="flex items-center gap-2">
                <LoadingDots />
                <span>補足の観点を抽出しています</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalLoadingCard() {
  return (
    <div
      className="mt-5 overflow-hidden rounded-[18px] border border-slate-300 bg-[#f7f8fb] shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
      role="status"
      aria-live="polite"
    >
      <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#eef2f7_0%,#e8edf4_100%)] px-5 py-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
          RA-AI / Final Context
        </p>
        <p className="mt-2 text-[18px] font-semibold text-slate-900">
          最終Contextを生成しています
        </p>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[16px] leading-8 text-stone-700">
              一次整理と補足をつないで、読みやすい形に整えています。
            </p>

            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-500" />
            </div>

            <div className="mt-4 grid gap-2 text-[14px] leading-7 text-stone-600">
              <div className="flex items-center gap-2">
                <LoadingDots />
                <span>一次整理を確認しています</span>
              </div>
              <div className="flex items-center gap-2">
                <LoadingDots />
                <span>補足情報を統合しています</span>
              </div>
              <div className="flex items-center gap-2">
                <LoadingDots />
                <span>最終Contextに整えています</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  followups,
  finalContextDraft,
  isGeneratingFinalContext,
  onGenerateFinalContext,
}: InputSectionProps) {
  const sectionShell =
    "overflow-hidden rounded-[22px] border border-stone-200 bg-[#fbfaf7] shadow-[0_10px_30px_rgba(15,23,42,0.06)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[linear-gradient(180deg,#ece8de_0%,#e6e1d6_100%)] px-6 py-6 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[34px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[18px] leading-9 text-stone-700";

  const softCard =
    "rounded-[16px] border border-stone-200 bg-[#f8f5ef] p-6";

  const panelCard =
    "rounded-[16px] border border-stone-200 bg-white p-6 shadow-[0_3px_12px_rgba(15,23,42,0.035)]";

  const contextWrap =
    "rounded-[18px] border border-stone-200 bg-[#f3efe7] p-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)]";

  const primaryButton =
    "w-full rounded-[14px] bg-slate-900 py-4 text-[16px] font-medium text-white transition hover:bg-slate-800";

  const secondaryButton =
    "rounded-[12px] border border-stone-300 bg-white px-6 py-3.5 text-[15px] font-medium text-stone-700 transition hover:bg-stone-50";

  const nextStepNote =
    "mt-5 rounded-[14px] border border-dashed border-stone-300 bg-white/80 px-4 py-3 text-[14px] leading-7 text-stone-600";

  const canRequestContext =
    text.trim().length > 0 &&
    emotion.trim().length > 0 &&
    urgency.trim().length > 0;

  const isGenerating =
    contextRequested &&
    (contextDraft.trim() === "AIが整理しています..." ||
      contextDraft.trim() === "RA-AIが整理しています...");

  const hasContextResult =
    contextRequested &&
    !isGenerating &&
    !!contextDraft.trim() &&
    !contextDraft.includes("失敗しました");

  const hasFollowups = hasContextResult && followups.length > 0;

  const canGenerateFinalContext =
    hasContextResult &&
    (contextEdited.trim().length > 0 || contextDraft.trim().length > 0);

  const analysisDisabled =
    !contextRequested || isGenerating || contextDraft.includes("失敗しました");

  const requestButtonClass = canRequestContext
    ? "border-slate-700 bg-slate-700 text-white hover:bg-slate-800"
    : "border-stone-300 bg-white text-stone-400";

  const appendFollowupToContextEdited = (value: string) => {
    const normalized = value.trim();
    if (!normalized) return;

    const prefix = contextEdited.trim().length > 0 ? "\n" : "";
    onContextEditedChange(`${contextEdited}${prefix}${normalized}`);
  };

  const hasFinalContext =
    !!finalContextDraft.trim() &&
    !isGeneratingFinalContext &&
    !finalContextDraft.includes("失敗しました");

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
          気になった場面を、そのまま置いてみます。
          まずは断片的でも大丈夫です。
        </p>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <div className={softCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Observation
          </p>
          <p className="mt-3 text-[17px] leading-9 text-stone-700">
            発言、表情、場面のズレなど、気になったことを書いてください。
          </p>
          <div className={nextStepNote}>
            次の一手：場面を書いたら、下で感情と対応意図を選びます。
          </div>
        </div>

        <div className={panelCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Case Note
          </p>
          <p className="mt-2 text-[18px] font-semibold text-slate-900">
            まずそのまま書いてみる
          </p>

          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="例：患者が説明のあとも不安そうで、何度も確認していた。"
            rows={5}
            className="mt-4 min-h-[170px] w-full rounded-[16px] border border-stone-300 bg-white p-5 text-[18px] leading-9 text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={panelCard}>
            <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
              Sensor 01
            </p>
            <p className="mt-2 text-[18px] font-semibold text-slate-900">
              いちばん近い反応
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
            <p className="mt-2 text-[18px] font-semibold text-slate-900">
              いま感じる対応意図
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
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            いまの内容を整理する
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            RA-AIが一次的にContextを整えます。
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onRequestContext}
              className={`rounded-[12px] border px-6 py-3.5 text-[15px] font-medium transition ${requestButtonClass} ${
                isGenerating ? "cursor-wait opacity-90" : ""
              }`}
              type="button"
              disabled={!canRequestContext || isGenerating}
            >
              {isGenerating ? "RA-AIが整理中…" : "この内容を整理してみる"}
            </button>

            {!canRequestContext && (
              <p className="text-[15px] leading-7 text-stone-500">
                入力がそろうと整理できます。
              </p>
            )}

            {canRequestContext && !isGenerating && !contextRequested && (
              <p className="text-[15px] leading-7 text-stone-500">
                入力がそろいました。
              </p>
            )}

            {isGenerating && (
              <p className="inline-flex items-center gap-2 text-[15px] leading-7 text-stone-600">
                <LoadingDots />
                RA-AIが整理しています...
              </p>
            )}
          </div>

          {!contextRequested && (
            <div className={nextStepNote}>
              次の一手：一次整理が返ってきたら、必要なら短く補足します。
            </div>
          )}

          {isGenerating && <LoadingCard />}
        </div>

        {contextRequested && (
          <div className={contextWrap}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                  Primary Context
                </p>
                <p className="mt-2 text-[20px] font-semibold text-slate-900">
                  一次整理
                </p>
              </div>

              <div className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[12px] text-stone-500">
                RA-AI
              </div>
            </div>

            <div className="mt-5 rounded-[16px] border-2 border-stone-300 bg-white p-6">
              <p className="text-[21px] font-semibold leading-10 text-stone-700">
                {contextDraft || "整理結果がここに表示されます。"}
              </p>
            </div>

            <div className="mt-6 border-t border-dashed border-stone-300 pt-6">
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                  Context Note
                </p>
                <p className="mt-2 text-[20px] font-semibold text-slate-900">
                  必要なら補足する
                </p>
              </div>

              {hasFollowups && (
                <div className="mt-5 space-y-3">
                  {followups.map((item, index) => (
                    <button
                      key={`${item}-${index}`}
                      type="button"
                      onClick={() => appendFollowupToContextEdited(item)}
                      className="w-full rounded-[14px] border border-stone-200 bg-white px-4 py-4 text-left transition hover:bg-stone-50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 text-[12px] font-semibold text-white">
                          {index + 1}
                        </div>
                        <p className="text-[16px] leading-8 text-stone-700">
                          {item}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <textarea
                value={contextEdited}
                onChange={(e) => onContextEditedChange(e.target.value)}
                placeholder="必要なら短く補足してください。"
                rows={7}
                className="mt-5 min-h-[220px] w-full rounded-[16px] border border-stone-300 bg-white p-5 text-[17px] leading-9 text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
              />

              <div className={nextStepNote}>
                次の一手：必要なら補足し、下で Final Context を生成します。
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onGenerateFinalContext}
                  disabled={!canGenerateFinalContext || isGeneratingFinalContext}
                  className={`rounded-[12px] border px-6 py-3.5 text-[15px] font-medium transition ${
                    canGenerateFinalContext
                      ? "border-slate-700 bg-slate-700 text-white hover:bg-slate-800"
                      : "border-stone-300 bg-white text-stone-400"
                  } ${isGeneratingFinalContext ? "cursor-wait opacity-90" : ""}`}
                >
                  {isGeneratingFinalContext
                    ? "Final Contextを生成中…"
                    : "Final Contextをつくる"}
                </button>
              </div>

              {isGeneratingFinalContext && <FinalLoadingCard />}

              {hasFinalContext && (
                <div className="mt-5 rounded-[16px] border-2 border-slate-300 bg-white p-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    Final Context
                  </p>
                  <p className="mt-2 text-[19px] font-semibold text-slate-900">
                    分析に使う最終Context
                  </p>
                  <p className="mt-4 text-[20px] leading-10 text-stone-800">
                    {finalContextDraft}
                  </p>

                  <div className="mt-5 rounded-[14px] border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-[14px] leading-7 text-stone-600">
                    次の一手：この内容でよければ、下から Step2 に進みます。
                  </div>
                </div>
              )}

              {!!finalContextDraft.trim() &&
                !isGeneratingFinalContext &&
                !hasFinalContext && (
                  <div className="mt-5 rounded-[16px] border-2 border-slate-300 bg-white p-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
                    <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                      Final Context
                    </p>
                    <p className="mt-2 text-[19px] font-semibold text-slate-900">
                      最終整理
                    </p>
                    <p className="mt-4 text-[20px] leading-10 text-stone-800">
                      {finalContextDraft}
                    </p>
                  </div>
                )}
            </div>
          </div>
        )}

        <div className="rounded-[16px] border-t border-stone-200 pt-6">
          <p className="text-[15px] leading-8 text-stone-600">
            ここまで整理できれば、次に進めます。
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onCheckState}
              className={`${primaryButton} ${
                analysisDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
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
      </div>
    </section>
  );
}