import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <p>© CORE / Relation Design Prototype</p>
        <p>広報を入口に、関係構造を設計し、AIと共に運用可能な状態へ。</p>
        <p className="pt-1 text-[11px] tracking-[0.08em] text-slate-600">
          病院広報の限界を超える｜関係マネジメントとAIによる新しい設計（CORE）
        </p>
      </div>
    </footer>
  );
}