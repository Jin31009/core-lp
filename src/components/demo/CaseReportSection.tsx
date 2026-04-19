import { HandHeart, Search, BookOpen } from "lucide-react";

type CaseReportSectionProps = {
  finalContext: string;
  delta: string;
  eLevel: string;
  text: string;
  judgment: string;
  actionSummary: string;

  executedActions: string[];
  onExecutedActionsChange: (actions: string[]) => void;

  resultType: string;
  onResultTypeChange: (value: string) => void;

  afterNote: string;
  onAfterNoteChange: (value: string) => void;

  whyTags: string[];
  onWhyTagsChange: (tags: string[]) => void;

  whyMemo: string;
  onWhyMemoChange: (value: string) => void;

  nextAssets: string[];
  onNextAssetsChange: (assets: string[]) => void;

  onNext: () => void;
};

const ACEX_OPTIONS = [
  { key: "A", label: "受け止め" },
  { key: "C", label: "確認" },
  { key: "E", label: "説明" },
  { key: "X", label: "補助" },
];

const ACEX_ICONS = {
  A: HandHeart,
  C: Search,
  E: BookOpen,
} as const;

const RESULT_OPTIONS = [
  {
    key: "improved",
    label: "改善",
    sub: "反応がやわらいだ / 理解が進んだ",
  },
  {
    key: "unchanged",
    label: "維持",
    sub: "大きな変化はないが崩れていない",
  },
  {
    key: "worsened",
    label: "悪化",
    sub: "緊張や拒否感が強まった",
  },
  {
    key: "unknown",
    label: "不明",
    sub: "結果をまだ判断できない",
  },
];

const WHY_TAG_OPTIONS = [
  { key: "alignment", label: "受け止めが効いた" },
  { key: "clarity", label: "説明で見通しが出た" },
  { key: "coordination", label: "調整で進みやすくなった" },
  { key: "support", label: "補助導線が効いた" },
];

const NEXT_ASSET_OPTIONS = [
  { key: "A-first", label: "Aを先に置く型" },
  { key: "C-then-E", label: "C→Eで進める型" },
  { key: "E-short", label: "短く説明する型" },
  { key: "X-support", label: "補助導線を添える型" },
];

function toggle(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function getDeltaLabel(delta: string) {
  return `Δ${delta}`;
}

function getResultTone(resultType: string) {
  switch (resultType) {
    case "improved":
      return {
        card: "border-emerald-300 bg-emerald-50",
        chip: "text-emerald-700",
      };
    case "unchanged":
      return {
        card: "border-sky-300 bg-sky-50",
        chip: "text-sky-700",
      };
    case "worsened":
      return {
        card: "border-rose-300 bg-rose-50",
        chip: "text-rose-700",
      };
    default:
      return {
        card: "border-stone-300 bg-stone-50",
        chip: "text-stone-700",
      };
  }
}

export default function CaseReportSection({
  finalContext,
  delta,
  eLevel,
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
  const resultTone = getResultTone(resultType);

  const sectionShell =
    "border-y border-stone-200 bg-white";

  const sectionHeader =
    "border-b border-stone-200 px-6 py-8 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[34px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[18px] leading-9 text-stone-700";

  const card =
    "border-t border-stone-200 bg-white py-6";

  const label =
    "text-[12px] uppercase tracking-[0.18em] text-stone-500";

  const body =
    "mt-3 text-[15px] leading-8 text-stone-700";

  const nextStepNote =
    "mt-5 rounded-[14px] border border-dashed border-stone-300 bg-white/80 px-4 py-3 text-[14px] leading-7 text-stone-600";

  const primaryButton =
    "w-full rounded-[14px] bg-slate-900 py-4 text-[16px] font-medium text-white transition hover:bg-slate-800";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 04 / Case Learning
        </p>
        <h2 className={sectionTitleClass}>今回の対応を、次に使える形で残す</h2>
        <p className={leadClass}>
          ここでは正しい報告書ではなく、この場面の構造を学びとして残し、次に使える形へ整えます。
        </p>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <div className={card}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className={label}>01 / Case Overview</p>
              <p className="mt-2 text-[23px] font-semibold text-slate-900">
                今回のケース
              </p>
              
<p className={body}>{finalContext}</p>

<div className="mt-4 rounded-[12px] border border-stone-200 bg-[#faf8f3] p-3">
  <p className="text-[13px] uppercase tracking-[0.14em] text-stone-500">
    構造の焦点
  </p>
  <p className="mt-1 text-[14px] text-stone-700">
    {judgment}
  </p>
</div>

<div className="mt-4 rounded-[12px] border border-sky-200 bg-sky-50 p-3">
  <p className="text-[13px] uppercase tracking-[0.14em] text-sky-600">
    今回の一手
  </p>
  <p className="mt-1 text-[14px] text-slate-900">
    {actionSummary}
  </p>
</div>

            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-stone-300 bg-[#faf8f3] px-3 py-1 text-[12px] font-medium text-stone-700">
                {getDeltaLabel(delta)}
              </span>
              <span className="rounded-full border border-stone-300 bg-[#faf8f3] px-3 py-1 text-[12px] font-medium text-stone-700">
                {eLevel}
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-[14px] border border-stone-200 bg-[#faf8f3] p-4">
            <p className="text-[13px] uppercase tracking-[0.14em] text-stone-500">
              Insight
            </p>
            <p className="mt-2 text-[15px] leading-8 text-stone-700">
              {judgment}
            </p>
          </div>
        </div>

        <div className={card}>
          <p className={label}>02 / Executed</p>
          <p className="mt-2 text-[23px] font-semibold text-slate-900">
            実施したこと
          </p>
          <p className={body}>
            実際に使った要素を選びます。複数選択で大丈夫です。
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {ACEX_OPTIONS.map((item) => {
              const active = executedActions.includes(item.key);
              const Icon = ACEX_ICONS[item.key as keyof typeof ACEX_ICONS];

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() =>
                    onExecutedActionsChange(toggle(executedActions, item.key))
                  }
                  className={`rounded-[14px] border px-4 py-4 text-left transition ${
                    active
                      ? "border-slate-700 bg-slate-700 text-white shadow-sm"
                      : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <div className="text-[15px] font-medium">
                    <span className="inline-flex items-center gap-1">
                      <span>{item.key}</span>
                      {Icon ? <Icon size={12} strokeWidth={1.8} aria-hidden="true" /> : null}
                    </span>
                    ｜{item.label}
                  </div>
                </button>
              );
            })}
          </div>

          <div className={nextStepNote}>
            次の一手：実際に使った行動を押さえたら、その結果がどうだったかを一つ選びます。
          </div>
        </div>

        <div className={card}>
          <p className={label}>03 / Result</p>
          <p className="mt-2 text-[23px] font-semibold text-slate-900">
            結果
          </p>
          <p className={body}>
            その場の変化を、いちばん近いもの一つで選びます。
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {RESULT_OPTIONS.map((option) => {
              const active = resultType === option.key;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => onResultTypeChange(option.key)}
                  className={`rounded-[16px] border p-4 text-left transition ${
                    active
                      ? `${resultTone.card} shadow-sm`
                      : "border-stone-300 bg-white hover:bg-stone-50"
                  }`}
                >
                  <p
                    className={`text-[16px] font-semibold ${
                      active ? resultTone.chip : "text-slate-900"
                    }`}
                  >
                    {option.label}
                  </p>
                  <p className="mt-2 text-[13px] leading-6 text-stone-600">
                    {option.sub}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className={card}>
            <p className={label}>04 / Learning</p>
            <p className="mt-2 text-[23px] font-semibold text-slate-900">
              学び
            </p>
            <p className={body}>
              この場面で何が効いたか、何が足りなかったか、次にどう使うかを自由に残します。
            </p>

            <div className="mt-5">
              <textarea
                value={whyMemo}
                onChange={(e) => onWhyMemoChange(e.target.value)}
                rows={8}
                placeholder={`例：
・何が効いたか
・何が足りなかったか
・次にどう使うか`}
                className="w-full rounded-[16px] border border-stone-300 bg-white px-4 py-4 text-[15px] leading-8 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-slate-500"
              />
            </div>

            <div className="mt-5">
              <p className="text-[13px] uppercase tracking-[0.14em] text-stone-500">
                Why Tags
              </p>
              <p className="mt-2 text-[14px] leading-7 text-stone-600">
                この場面で何が効いたかを短いタグで残します。
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {WHY_TAG_OPTIONS.map((item) => {
                  const active = whyTags.includes(item.key);

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onWhyTagsChange(toggle(whyTags, item.key))}
                      className={`rounded-[12px] border px-4 py-3 text-[14px] font-medium transition ${
                        active
                          ? "border-slate-700 bg-slate-700 text-white"
                          : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={card}>
            <p className={label}>05 / Keep for Next</p>
            <p className="mt-2 text-[23px] font-semibold text-slate-900">
              次に残す
            </p>
            <p className={body}>
              次に使える形にするとどうなるかを、短く書き残します。
            </p>

            <div className="mt-5">
              <textarea
                value={afterNote}
                onChange={(e) => onAfterNoteChange(e.target.value)}
                rows={8}
                placeholder={`例：
「確認→説明→理解確認」を基本形として残す
見通し不足のケースでは、最初に一つ確認を入れる`}
                className="w-full rounded-[16px] border border-stone-300 bg-white px-4 py-4 text-[15px] leading-8 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-slate-500"
              />
            </div>

            <div className="mt-5">
              <p className="text-[13px] uppercase tracking-[0.14em] text-stone-500">
                Next Pattern
              </p>
              <p className="mt-2 text-[14px] leading-7 text-stone-600">
                次回に再利用したい型を選んで残します。
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {NEXT_ASSET_OPTIONS.map((item) => {
                  const active = nextAssets.includes(item.key);

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onNextAssetsChange(toggle(nextAssets, item.key))}
                      className={`rounded-[12px] border px-4 py-3 text-[14px] font-medium transition ${
                        active
                          ? "border-slate-700 bg-slate-700 text-white"
                          : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={card}>
          <p className={label}>Reflection Note</p>
          <p className="mt-2 text-[22px] font-semibold text-slate-900">
            この画面の役割
          </p>
          <p className={body}>
            ここは報告書ではなく、次の判断を少し速くするための記録です。
            「何をやったか」「どうなったか」「何を学んだか」が残れば十分です。
          </p>
        </div>

        <div className="rounded-[16px] border-t border-stone-200 pt-4">
          <div className="mt-4">
            <button onClick={onNext} className={primaryButton} type="button">
              構造化記録へ進む
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
