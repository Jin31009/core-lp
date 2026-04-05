import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-[11px] leading-6 text-slate-500 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>© CORE / Relation Design Prototype</p>
          <p>広報を入口に、関係構造を設計し、AIと共に運用可能な状態へ。</p>
        </div>

        <div className="mt-3 text-[10px] tracking-[0.06em] text-slate-400">
          病院広報の限界を超える｜関係マネジメントとAIによる新しい設計（CORE）
        </div>
      </div>
    </footer>
  );
}