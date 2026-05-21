

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-[11px] leading-6 text-slate-500 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>黒江仁｜病院広報工房</p>
          <p>病院広報を、理解と関係を整える仕組みへ。</p>
        </div>

        <div className="mt-3 text-[10px] tracking-[0.06em] text-slate-400">
          CORE / CORE_NAVI は、病院広報工房の実証・開発プロジェクトです。
        </div>
      </div>
    </footer>
  );
}
