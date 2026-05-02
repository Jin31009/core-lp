import { useEffect, useRef, useState } from "react";

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
  hasContextError: boolean;
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
      className={`rounded-[12px] border px-4 py-3.5 text-[15px] font-medium transition ${
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
      className="mt-6 overflow-hidden rounded-[18px] border border-stone-400 bg-[#f6f1e8] shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
      role="status"
      aria-live="polite"
    >
      <div className="border-b border-stone-200 bg-[linear-gradient(180deg,#f1ece2_0%,#ece5d9_100%)] px-5 py-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
          RA-AI / Loading
        </p>
        <p className="mt-2 text-[20px] font-semibold text-slate-900">
          一次整理を生成しています
        </p>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white shadow-sm">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-slate-700" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[17px] leading-9 text-stone-800">
              入力内容をもとに、場面と関係の文脈を整理しています。
            </p>

            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-stone-200">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-500" />
            </div>

            <div className="mt-4 grid gap-2 text-[15px] leading-8 text-stone-700">
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
      className="mt-6 overflow-hidden rounded-[18px] border border-slate-400 bg-[#f7f8fb] shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
      role="status"
      aria-live="polite"
    >
      <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#eef2f7_0%,#e8edf4_100%)] px-5 py-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
          RA-AI / Final Context
        </p>
        <p className="mt-2 text-[20px] font-semibold text-slate-900">
          最終Contextを生成しています
        </p>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[17px] leading-9 text-stone-800">
              一次整理と補足をつないで、読みやすい形に整えています。
            </p>

            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-500" />
            </div>

            <div className="mt-4 grid gap-2 text-[15px] leading-8 text-stone-700">
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
  hasContextError,
  onRequestContext,
  onCheckState,
  onClear,
  followups,
  finalContextDraft,
  isGeneratingFinalContext,
  onGenerateFinalContext,
}: InputSectionProps) {
  const [showSecondaryInputs, setShowSecondaryInputs] = useState(false);
  const finalContextRef = useRef<HTMLDivElement | null>(null);
  const sectionShell =
    "border-y border-stone-200 bg-white";

  const sectionHeader =
    "border-b border-stone-300 px-6 py-9 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[34px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[19px] leading-10 text-stone-800";

  const softCard =
    "border-t border-stone-300 bg-[#f7f4ee] p-7";

  const panelCard =
    "border-t border-stone-300 bg-white py-7";

  const contextWrap =
    "border-t border-stone-400 bg-[#f3efe7] p-7";

  const primaryButton =
    "w-full rounded-[14px] bg-slate-900 py-4.5 text-[17px] font-medium text-white transition hover:bg-slate-800";

  const secondaryButton =
    "rounded-[12px] border border-stone-400 bg-white px-6 py-4 text-[16px] font-medium text-stone-800 transition hover:bg-stone-50";

  const nextStepNote =
    "mt-6 rounded-[14px] border border-dashed border-stone-400 bg-white/90 px-5 py-4 text-[15px] leading-8 text-stone-700";

  const canRequestContext = text.trim().length > 0;

  const isGenerating =
    contextRequested &&
    (contextDraft.trim() === "AIが整理しています..." ||
      contextDraft.trim() === "RA-AIが整理しています...");

  const hasContextResult =
    contextRequested &&
    !isGenerating &&
    !!contextDraft.trim();

  const hasFollowups = hasContextResult && followups.length > 0;

  const canGenerateFinalContext =
    hasContextResult &&
    (contextEdited.trim().length > 0 || contextDraft.trim().length > 0);

  const analysisDisabled = text.trim().length === 0 || isGenerating;

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

  useEffect(() => {
    if (!hasFinalContext) return;

    finalContextRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [hasFinalContext]);

  const isFollowupSelected = (value: string) =>
    contextEdited
      .split("\n")
      .map((item) => item.trim())
      .includes(value.trim());

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

      <div className="space-y-9 p-7 sm:p-9">
        <div className={panelCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Main Window
          </p>
          <p className="mt-2 text-[24px] font-semibold text-slate-900">
            ここに、いま見えていることを書く
          </p>

          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="例：患者が説明のあとも不安そうで、何度も確認していた。"
            rows={5}
            className="mt-4 min-h-[260px] max-h-[480px] w-full overflow-y-auto rounded-[16px] border border-stone-400 bg-white p-6 text-[19px] leading-10 text-slate-900 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-500 focus:border-slate-600 focus:outline-none"
          />
          <div className="mt-4 text-[14px] leading-7 text-stone-600">
            断片のままで問題ありません。まず書き出しを優先します。
          </div>
        </div>

        <div className={softCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Observation
          </p>
          <p className="mt-2 text-[15px] leading-8 text-stone-700">
            入力後に、必要な補足とAI整理を下で追加します。
          </p>
        </div>

        <div className={panelCard}>
          <details open={showSecondaryInputs} className="rounded-[14px] border border-stone-300 bg-[#faf8f3] p-4">
            <summary
              className="cursor-pointer list-none text-[14px] font-semibold text-stone-700"
              onClick={(e) => {
                e.preventDefault();
                setShowSecondaryInputs((prev) => !prev);
              }}
            >
              補足入力（任意）
            </summary>
            {showSecondaryInputs && (
              <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                  Sensor 01
                </p>
                <p className="mt-2 text-[20px] font-semibold text-slate-900">
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

              <div>
                <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                  Sensor 02
                </p>
                <p className="mt-2 text-[20px] font-semibold text-slate-900">
                  いまの対応優先度
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
            )}
          </details>
        </div>

        <div className={panelCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Context
          </p>
          <p className="mt-2 text-[22px] font-semibold text-slate-900">
            いまの内容を整理する
          </p>
          <p className="mt-3 text-[16px] leading-9 text-stone-700">
            書いた内容から、RA-AIが一次的にContextを整えます。
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onRequestContext}
              className={`rounded-[12px] border px-6 py-4 text-[16px] font-medium transition ${requestButtonClass} ${
                isGenerating ? "cursor-wait opacity-90" : ""
              }`}
              type="button"
              disabled={!canRequestContext || isGenerating}
            >
              {isGenerating ? "RA-AIが整理中…" : "この内容を整理してみる"}
            </button>

            {!canRequestContext && (
              <p className="text-[16px] leading-8 text-stone-600">
                場面を書くと整理できます。
              </p>
            )}

            {canRequestContext && !isGenerating && !contextRequested && (
              <p className="text-[16px] leading-8 text-stone-600">
                そのまま整理に進めます。
              </p>
            )}

            {isGenerating && (
              <p className="inline-flex items-center gap-2 text-[16px] leading-8 text-stone-700">
                <LoadingDots />
                RA-AIが整理しています...
              </p>
            )}
          </div>

          {!contextRequested && (
            <div className={nextStepNote}>
              次の一手：一次整理が返ってきたら、必要に応じて短く補足します。
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
                <p className="mt-2 text-[22px] font-semibold text-slate-900">
                  一次整理
                </p>
              </div>

              <div className="rounded-full border border-stone-300 bg-white px-4 py-2 text-[13px] text-stone-600">
                RA-AI
              </div>
            </div>

            <div className="mt-5 rounded-[18px] border border-stone-300 bg-[linear-gradient(180deg,#fffdfa_0%,#f6efe4_100%)] p-7 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                RA-AI Summary
              </p>
              <p className="mt-3 text-[25px] font-semibold leading-[2] text-slate-950 md:text-[30px]">
                {contextDraft || "整理結果がここに表示されます。"}
              </p>
            </div>

            {hasContextError && (
              <div className="mt-4 rounded-[14px] border border-amber-300 bg-amber-50 px-4 py-3 text-[14px] leading-7 text-amber-900">
                AI生成に失敗したため暫定整理を表示しています
              </div>
            )}

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
              <div className="mt-6 space-y-3">
                  <p className="text-[15px] leading-8 text-stone-700">
                    気になる項目を押すと、下の補足欄に追加されます。
                  </p>
                  {followups.map((item, index) => (
                    <button
                      key={`${item}-${index}`}
                      type="button"
                      onClick={() => appendFollowupToContextEdited(item)}
                      className={`w-full rounded-[14px] border px-4 py-4 text-left transition ${
                        isFollowupSelected(item)
                          ? "border-slate-400 bg-slate-50 shadow-[0_4px_12px_rgba(15,23,42,0.06)]"
                          : "border-stone-200 bg-white hover:border-slate-300 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
                          isFollowupSelected(item)
                            ? "bg-slate-900 text-white"
                            : "bg-slate-700 text-white"
                        }`}>
                          {index + 1}
                        </div>
                        <p className="text-[17px] leading-9 text-stone-800">
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
                rows={9}
                className="mt-5 min-h-[280px] max-h-[520px] w-full overflow-y-auto rounded-[16px] border border-stone-400 bg-white p-6 text-[18px] leading-10 text-slate-900 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-500 focus:border-slate-600 focus:outline-none"
              />

              <div className={nextStepNote}>
                次の一手：必要なら補足し、下で Final Context を生成します。
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={onGenerateFinalContext}
                  disabled={!canGenerateFinalContext || isGeneratingFinalContext}
                  className={`${primaryButton} ${
                    canGenerateFinalContext
                      ? ""
                      : "cursor-not-allowed bg-stone-300 hover:bg-stone-300"
                  } ${isGeneratingFinalContext ? "cursor-wait opacity-90" : ""}`}
                >
                  {isGeneratingFinalContext
                    ? "Final Contextを生成中…"
                    : "Final Contextをつくる"}
                </button>
              </div>

              {isGeneratingFinalContext && <FinalLoadingCard />}

              {hasFinalContext && (
                <div ref={finalContextRef} className="mt-5 rounded-[16px] border-2 border-slate-400 bg-white p-7 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    Final Context
                  </p>
                  <p className="mt-2 text-[21px] font-semibold text-slate-900">
                    分析に使う最終Context
                  </p>
                  <p className="mt-4 max-h-[420px] overflow-y-auto text-[21px] leading-10 text-stone-900">
                    {finalContextDraft}
                  </p>

                  <div className="mt-5 rounded-[14px] border border-dashed border-slate-400 bg-slate-50 px-5 py-4 text-[15px] leading-8 text-stone-700">
                    次の一手：この内容でよければ、下から Step2 に進みます。
                  </div>
                </div>
              )}

              {!!finalContextDraft.trim() &&
                !isGeneratingFinalContext &&
                !hasFinalContext && (
                  <div className="mt-5 rounded-[16px] border-2 border-slate-400 bg-white p-7 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
                    <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                      Final Context
                    </p>
                    <p className="mt-2 text-[21px] font-semibold text-slate-900">
                      最終整理
                    </p>
                    <p className="mt-4 max-h-[420px] overflow-y-auto text-[21px] leading-10 text-stone-900">
                      {finalContextDraft}
                    </p>
                  </div>
                )}
            </div>
          </div>
        )}

        <div className="rounded-[16px] border-t border-stone-200 pt-6">
          <p className="text-[16px] leading-9 text-stone-700">
            一次整理が出れば、次に進めます。
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
