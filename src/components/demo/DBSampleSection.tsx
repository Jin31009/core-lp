import type React from "react";

type DBSampleSectionProps = {
  delta: string;
  eLevel: string;
  text: string;
  judgment: string;
  actionSummary: string;
  innerRef?: React.RefObject<HTMLDivElement | null>;
};

export default function DBSampleSection({
  delta,
  eLevel,
  text,
  judgment,
  actionSummary,
  innerRef,
}: DBSampleSectionProps) {
  const sectionShell =
    "overflow-hidden rounded-[18px] border border-stone-200 bg-[#fbfaf7] shadow-[0_8px_28px_rgba(15,23,42,0.05)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[#e9e5dc] px-6 py-5 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-3xl font-semibold tracking-[-0.01em] text-slate-900";

  const leadClass =
    "mt-3 text-[15px] leading-8 text-stone-600";

  return (
    <section ref={innerRef} className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 05 / DB Sample
        </p>
        <h2 className={sectionTitleClass}>DB見本</h2>
        <p className={leadClass}>
          最後に、ケースが保存された後の見本表示を確認します。
          ここではテーブル形式で見える形を示しています。
        </p>
      </div>

      <div className="overflow-x-auto p-6 sm:p-8">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-white text-left">
              <th className="px-4 py-3 font-medium text-stone-700">Case ID</th>
              <th className="px-4 py-3 font-medium text-stone-700">Δ</th>
              <th className="px-4 py-3 font-medium text-stone-700">e</th>
              <th className="px-4 py-3 font-medium text-stone-700">観察内容</th>
              <th className="px-4 py-3 font-medium text-stone-700">状態の見立て</th>
              <th className="px-4 py-3 font-medium text-stone-700">次の対応</th>
              <th className="px-4 py-3 font-medium text-stone-700">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-stone-200 align-top bg-[#fbfaf7]">
              <td className="px-4 py-4 text-stone-700">CASE-001</td>
              <td className="px-4 py-4 text-stone-700">{delta}</td>
              <td className="px-4 py-4 text-stone-700">{eLevel}</td>
              <td className="px-4 py-4 text-stone-700">
                {text ? text : "未入力"}
              </td>
              <td className="px-4 py-4 text-stone-700">{judgment}</td>
              <td className="px-4 py-4 text-stone-700">{actionSummary}</td>
              <td className="px-4 py-4 text-stone-700">Draft / Demo</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8 rounded-[14px] border border-stone-200 bg-[#f8f5ef] p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            Guide
          </p>
          <p className="mt-2 text-[13px] leading-7 text-stone-500">
            最後に、ケースが保存された後の見え方を確認します。
            実運用を想定したデータ構造のイメージを把握する段階です。
          </p>
        </div>
      </div>
    </section>
  );
}