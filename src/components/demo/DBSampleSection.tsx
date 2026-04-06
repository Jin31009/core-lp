import { useState } from "react";

type Props = {
  delta: string;
  eLevel: string;
  text: string;
  judgment: string;
  actionSummary: string;
};

type Row = {
  id: string;
  delta: string;
  e: string;
  text: string;
  judgment: string;
  action: string;
};

export default function DBSampleSection({
  delta,
  eLevel,
  text,
  judgment,
  actionSummary,
}: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const newRow: Row = {
      id: `CASE-${String(rows.length + 1).padStart(3, "0")}`,
      delta,
      e: eLevel,
      text: text || "未入力",
      judgment,
      action: actionSummary,
    };

    setRows([newRow, ...rows]);
    setSaved(true);

    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <section className="border rounded p-6 space-y-6">
      <h2 className="text-xl font-semibold">DB見本</h2>

      {/* 確認カード */}
      <div className="rounded-[14px] border border-stone-200 bg-[#f8f5ef] p-5">
        <p className="text-[11px] uppercase text-stone-500">Confirm</p>
        <p className="mt-2 text-sm text-stone-700">
          この内容でデモ登録しますか？
        </p>

        <ul className="mt-3 text-[13px] text-stone-600 space-y-1">
          <li>Δ: {delta}</li>
          <li>e: {eLevel}</li>
          <li>観察: {text || "未入力"}</li>
        </ul>

        <button
          onClick={handleSave}
          className="mt-4 bg-slate-700 text-white px-4 py-2 rounded"
        >
          デモ登録する
        </button>

        {saved && (
          <p className="mt-2 text-sm text-green-600">
            保存しました（Demo）
          </p>
        )}
      </div>

      {/* テーブル */}
      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Δ</th>
            <th>e</th>
            <th>観察</th>
            <th>見立て</th>
            <th>対応</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.delta}</td>
              <td>{r.e}</td>
              <td>{r.text}</td>
              <td>{r.judgment}</td>
              <td>{r.action}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Guide */}
      <div className="rounded-[14px] border border-stone-200 bg-[#f8f5ef] p-5">
        <p className="text-[11px] uppercase text-stone-500">Guide</p>
        <p className="mt-2 text-[13px] text-stone-500">
          登録後の見え方を体験するためのデモ機能です。
        </p>
      </div>
    </section>
  );
}