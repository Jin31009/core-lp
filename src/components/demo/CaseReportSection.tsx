import { useState } from "react";

type CaseReportSectionProps = {
  delta: string;
  eLevel: string;
  text: string;
  judgment: string;
  actionSummary: string;
  executedActions: string[];
  onExecutedActionsChange: (value: string[]) => void;
  resultType: string;
  onResultTypeChange: (value: string) => void;
  afterNote: string;
  onAfterNoteChange: (value: string) => void;
  whyTags: string[];
  onWhyTagsChange: (value: string[]) => void;
  whyMemo: string;
  onWhyMemoChange: (value: string) => void;
  nextAssets: string[];
  onNextAssetsChange: (value: string[]) => void;
  onNext: () => void;
};

const actionOptions = [
  { key: "A", label: "A｜共感・受け止め" },
  { key: "P", label: "P｜許容・制御" },
  { key: "C", label: "C｜説明・予測" },
  { key: "E", label: "E｜実行・環境" },
  { key: "X", label: "X｜支援・引継ぎ・補助" },
];

const outcomeOptions = [
  "PREVENT｜予防",
  "RECOVER｜回復",
  "PARTIAL｜部分回復",
  "BREAK｜破綻",
  "CRITICAL｜安全侵害",
];

const whyOptions = [
  "認識の明示が効いた",
  "見通し提示が効いた",
  "説明の順番整理が効いた",
  "不安の受け止めが効いた",
  "役割の明確化が効いた",
  "まだズレが残った",
];

const nextAssetOptions = [
  "最初に不安確認を入れる",
  "見通し説明を先に置く",
  "待ち時間案内を明示する",
  "短い引継ぎメモを残す",
  "説明補助カードを使う",
  "個別対応として注意する",
];

function ToggleChip({
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

function SelectChip({
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
      className={`rounded-[12px] border px-4 py-3 text-left text-[14px] font-medium transition ${
        active
          ? "border-slate-700 bg-slate-700 text-white"
          : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
      }`}
    >
      {label}
    </button>
  );
}

function toggleArrayValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export default function CaseReportSection({
  delta,
  eLevel,
  text,
  judgment,
  actionSummary,
  executedActions,
  onExecutedActionsChange,
  resultType,
  onResultTypeChange,
  afterNote,
  onAfterNoteChange,
  whyTags,
  onWhyTagsChange,
  whyMemo,
  onWhyMemoChange,
  nextAssets,
  onNextAssetsChange,
  onNext,
}: CaseReportSectionProps) {
  const [block, setBlock] = useState<"A" | "B">("A");

  const sectionShell =
    "overflow-hidden rounded-[22px] border border-stone-200 bg-[#fbfaf7] shadow-[0_10px_30px_rgba(15,23,42,0.06)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[linear-gradient(180deg,#ece8de_0%,#e6e1d6_100%)] px-6 py-6 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[34px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[18px] leading-9 text-stone-700";

  const groupWrap =
    "rounded-[18px] border border-stone-200 bg-[#f8f5ef] p-6";

  const groupTitle = "mt-2 text-[24px] font-semibold text-slate-900";

  const groupLead = "mt-3 text-[16px] leading-8 text-stone-700";

  const panelCard =
    "rounded-[16px] border border-stone-200 bg-white p-5 shadow-[0_3px_12px_rgba(15,23,42,0.035)]";

  const nextStepNote =
    "mt-5 rounded-[14px] border border-dashed border-stone-300 bg-white/80 px-4 py-3 text-[14px] leading-7 text-stone-600";

  const primaryButton =
    "w-full rounded-[14px] bg-green-600 py-4 text-[16px] font-medium text-white transition hover:bg-green-700";

  const secondaryButton =
    "rounded-[12px] border border-stone-300 bg-white px-6 py-3.5 text-[15px] font-medium text-stone-700 transition hover:bg-stone-50";

  const beforeText = text.trim() || "未入力";
  const summaryText = judgment.trim() || "未設定";
  const actionText = actionSummary.trim() || "未設定";

  const canProceed =
    resultType.trim().length > 0 &&
    executedActions.length > 0 &&
    (afterNote.trim().length > 0 || whyTags.length > 0 || nextAssets.length > 0);

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 04 / Case Learning
        </p>
        <h2 className={sectionTitleClass}>今回の対応を、次に使える学びへ変える</h2>
        <p className={leadClass}>
          今回の場面を、状態・対応・変化・学びに分けて整理します。
          一度に全部見せず、2ブロックで確認できる形にしています。
        </p>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <div className="rounded-[18px] border border-stone-200 bg-white p-4 shadow-[0_3px_12px_rgba(15,23,42,0.035)]">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setBlock("A")}
              className={`rounded-[12px] px-5 py-3 text-[14px] font-medium transition ${
                block === "A"
                  ? "bg-slate-700 text-white"
                  : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
              }`}
            >
              前半｜場面と対応
            </button>

            <button
              type="button"
              onClick={() => setBlock("B")}
              className={`rounded-[12px] px-5 py-3 text-[14px] font-medium transition ${
                block === "B"
                  ? "bg-slate-700 text-white"
                  : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
              }`}
            >
              後半｜変化と学び
            </button>
          </div>
        </div>

        {block === "A" && (
          <>
            <div className={groupWrap}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                前半 / Before
              </p>
              <p className={groupTitle}>どんな状態だったか</p>
              <p className={groupLead}>
                まず、今回の場面がどのような状態として読まれていたかを確認します。
              </p>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className={panelCard}>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    Observation
                  </p>
                  <p className="mt-2 text-[17px] leading-8 text-stone-800">
                    {beforeText}
                  </p>
                </div>

                <div className={panelCard}>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    Insight
                  </p>
                  <p className="mt-2 text-[17px] leading-8 text-stone-800">
                    {summaryText}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className={panelCard}>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    Delta
                  </p>
                  <p className="mt-2 text-[22px] font-semibold text-slate-900">
                    Δ{delta}
                  </p>
                </div>

                <div className={panelCard}>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    Phase
                  </p>
                  <p className="mt-2 text-[22px] font-semibold text-slate-900">
                    {eLevel}
                  </p>
                </div>

                <div className={panelCard}>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                    Planned Response
                  </p>
                  <p className="mt-2 text-[16px] leading-8 text-stone-800">
                    {actionText}
                  </p>
                </div>
              </div>

              <div className={nextStepNote}>
                次の一手：この場面に対して、実際に何を行ったかを下で選びます。
              </div>
            </div>

            <div className={groupWrap}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                前半 / Action
              </p>
              <p className={groupTitle}>何を実施したか</p>
              <p className={groupLead}>
                実際に使った ACE+X を記録し、今回の介入を見える形にします。
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {actionOptions.map((option) => (
                  <ToggleChip
                    key={option.key}
                    label={option.label}
                    active={executedActions.includes(option.key)}
                    onClick={() =>
                      onExecutedActionsChange(
                        toggleArrayValue(executedActions, option.key)
                      )
                    }
                  />
                ))}
              </div>

              <div className="mt-5 rounded-[16px] border border-stone-200 bg-white p-5">
                <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                  Selected Action
                </p>
                <p className="mt-2 text-[16px] leading-8 text-stone-800">
                  {executedActions.length > 0
                    ? executedActions.join(" / ")
                    : "まだ選択されていません"}
                </p>
              </div>

              <div className={nextStepNote}>
                次の一手：ここまで確認できたら、後半で結果と学びを整理します。
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setBlock("B")}
                  className={primaryButton}
                >
                  後半を見る
                </button>
              </div>
            </div>
          </>
        )}

        {block === "B" && (
          <>
            <div className={groupWrap}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                後半 / After
              </p>
              <p className={groupTitle}>どう変わったか</p>
              <p className={groupLead}>
                結果を Outcome と短いメモで残し、今回の到達点を整理します。
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {outcomeOptions.map((option) => (
                  <SelectChip
                    key={option}
                    label={option}
                    active={resultType === option}
                    onClick={() => onResultTypeChange(option)}
                  />
                ))}
              </div>

              <textarea
                value={afterNote}
                onChange={(e) => onAfterNoteChange(e.target.value)}
                placeholder="例：表情が少し和らぎ、確認回数が減った。"
                rows={4}
                className="mt-5 min-h-[120px] w-full rounded-[16px] border border-stone-300 bg-white p-5 text-[17px] leading-9 text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className={groupWrap}>
                <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                  後半 / Why
                </p>
                <p className={groupTitle}>なぜそうなったか</p>
                <p className={groupLead}>
                  理由を短いタグとメモで残します。
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {whyOptions.map((option) => (
                    <ToggleChip
                      key={option}
                      label={option}
                      active={whyTags.includes(option)}
                      onClick={() =>
                        onWhyTagsChange(toggleArrayValue(whyTags, option))
                      }
                    />
                  ))}
                </div>

                <textarea
                  value={whyMemo}
                  onChange={(e) => onWhyMemoChange(e.target.value)}
                  placeholder="例：先に確認してから流れを示したことで見通しが戻った。"
                  rows={4}
                  className="mt-5 min-h-[120px] w-full rounded-[16px] border border-stone-300 bg-white p-5 text-[17px] leading-9 text-slate-800 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
                />
              </div>

              <div className={groupWrap}>
                <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                  後半 / Next
                </p>
                <p className={groupTitle}>次回に残すこと</p>
                <p className={groupLead}>
                  次回にも使える形で残します。
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {nextAssetOptions.map((option) => (
                    <ToggleChip
                      key={option}
                      label={option}
                      active={nextAssets.includes(option)}
                      onClick={() =>
                        onNextAssetsChange(toggleArrayValue(nextAssets, option))
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={nextStepNote}>
              次の一手：ここまで整理できたら、下のボタンから Step5 に進みます。
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button
                onClick={onNext}
                className={`${primaryButton} ${!canProceed ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!canProceed}
                type="button"
              >
                記録として確認する
              </button>

              <button
                type="button"
                onClick={() => setBlock("A")}
                className={secondaryButton}
              >
                前半に戻る
              </button>
            </div>

            {!canProceed && (
              <p className="text-[14px] leading-7 text-stone-500">
                Action・Outcome・学びのいずれかを入れると次へ進めます。
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}