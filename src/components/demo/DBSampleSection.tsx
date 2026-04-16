import type { RASSCaseRecord } from "../../lib/rassCaseCsv";

type DBSampleSectionProps = {
  record: RASSCaseRecord | null;
  onDownloadCsv: () => void;
  innerRef?: React.RefObject<HTMLDivElement | null>;
};

export default function DBSampleSection({
  record,
  onDownloadCsv,
  innerRef,
}: DBSampleSectionProps) {
  const sectionShell =
    "overflow-hidden rounded-[22px] border border-stone-200 bg-[#fbfaf7] shadow-[0_12px_36px_rgba(15,23,42,0.06)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[linear-gradient(180deg,#ede8dd_0%,#e6e1d6_100%)] px-6 py-7 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[36px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[18px] leading-9 text-stone-700";

  const tableCard =
    "rounded-[18px] border border-stone-200 bg-white p-6 shadow-[0_3px_14px_rgba(15,23,42,0.04)]";

  const blockCard =
    "rounded-[18px] border border-stone-200 bg-white p-6 shadow-[0_3px_14px_rgba(15,23,42,0.04)]";

  const row =
    "grid grid-cols-[140px_1fr] gap-4 border-b border-stone-200 py-4 last:border-b-0";

  const label =
    "text-[13px] font-medium text-stone-500";

  const value =
    "text-[15px] leading-8 text-stone-800";

  const secondaryButton =
    "rounded-[14px] bg-violet-600 px-5 py-4 text-[15px] font-medium text-white transition hover:bg-violet-700";

  const resolvedAction = record && record.acex_labels.length > 0
    ? record.acex_labels.map((label, index) => {
        const code = record.acex_codes[index];
        return code ? `${code}｜${label}` : label;
      }).join(" / ")
    : "未設定";
  const resolvedWhyTags = record && record.why_tags.length > 0
    ? record.why_tags.join(" / ")
    : "未選択";
  const resolvedNextAssets = record && record.next_assets.length > 0
    ? record.next_assets.join(" / ")
    : "未選択";
  const resolvedNotes = record?.notes?.trim() || "未記入";
  const resolvedApce = record && record.apce_miss.length > 0
    ? record.apce_miss.join(" / ")
    : "未設定";
  return (
    <section ref={innerRef} className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 05 / Structured Record
        </p>
        <h2 className={sectionTitleClass}>このように構造化して残ります</h2>
        <p className={leadClass}>
          ここに表示されている内容が、そのままCSVとして保存されます。
        </p>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <div className={tableCard}>
          <div className={row}>
            <div className={label}>今回の分析対象</div>
            <div className="text-[15px] leading-8 text-stone-800">
              {record?.context_final || "未生成"}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Delta</div>
            <div className={value}>Δ{record?.max_delta ?? "0"}</div>
          </div>

          <div className={row}>
            <div className={label}>Trigger</div>
            <div className={value}>{record?.trigger || "No"}</div>
          </div>

          <div className={row}>
            <div className={label}>AK Primary</div>
            <div className={value}>{record?.ak_primary || "未設定"}</div>
          </div>

          <div className={row}>
            <div className={label}>APCE Miss</div>
            <div className="text-[15px] leading-8 text-stone-800">
              {resolvedApce}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Case Phase</div>
            <div className="text-[15px] leading-8 text-stone-800">
              {record?.case_phase || "未設定"}
            </div>
          </div>

          <div className={row}>
            <div className={label}>ACEX</div>
            <div className="text-[15px] leading-8 text-stone-800">
              {resolvedAction}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Why Tags</div>
            <div className="text-[15px] leading-8 text-stone-800">
              {resolvedWhyTags}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Next Pattern</div>
            <div className="text-[15px] leading-8 text-stone-800">
              {resolvedNextAssets}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Notes</div>
            <div className="text-[15px] leading-8 text-stone-800">
              {resolvedNotes}
            </div>
          </div>
        </div>

        <div className={blockCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Export
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            このケースを保存する
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            このボタンで、いま表示しているケース記録をCSVとして保存できます。
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onDownloadCsv}
              className={secondaryButton}
            >
              このケースを記録する（CSVダウンロード）
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
