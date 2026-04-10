
type MiniStatProps = {
  title: string;
  value: string;
  note: string;
};

export default function MiniStat({ title, value, note }: MiniStatProps) {
  return (
    <div className="border border-black/10 bg-white p-4">
      <div className="text-xs tracking-widest text-slate-400">{title}</div>
      <div className="mt-1 text-xl font-medium">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{note}</div>
    </div>
  );
}