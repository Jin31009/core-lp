import React from "react";
import type { Page } from "../types";

type Card = { title: string; desc: string };

const SLIDE_CARDS: Card[] = [
  { title: "Theory", desc: "RA理論・Δ・Trigger・Pre-Assetの構造" },
  { title: "Observation", desc: "患者ナラティブ分析や構造発見の過程" },
  { title: "Evidence", desc: "図版・論点・検証の流れ" },
  { title: "Bridge", desc: "LPからPoC、さらにRA-SSへ" },
];

const SLIDE_FRAMES: Card[] = [
  { title: "Figure 01", desc: "Relational Architectureの全体構造" },
  { title: "Figure 02", desc: "Δ / Trigger / Pre-Asset の連関" },
  { title: "Figure 03", desc: "PoCとRA-SSへの接続" },
];

export default function SlidesPage({
  onNavigate,
  onBackPrev,
}: {
  onNavigate: (page: Page) => void;
  onBackPrev: () => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row">
        <button
          onClick={onBackPrev}
          className="w-full border border-black/15 px-4 py-3 text-sm text-slate-600 transition hover:bg-white sm:w-auto sm:py-2"
        >
          ← 前のページへ戻る
        </button>
        <button
          onClick={() => onNavigate("top")}
          className="w-full border border-black/15 px-4 py-3 text-sm text-slate-600 transition hover:bg-white sm:w-auto sm:py-2"
        >
          ← TOPへ戻る
        </button>
      </div>

      <div className="mb-12 border-t border-black/10 pt-8">
        <p className="text-xs tracking-[0.3em] text-slate-400">ACADEMIC</p>
        <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl md:text-5xl">
          学会発表・研究背景と実証
        </h2>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4 leading-8 text-slate-600">
          <p>まず前提として、ここで扱っているのは“広報の改善”ではなく“関係の設計”です。</p>
          <p>その妥当性は、学会発表として整理された理論・観察・実証の流れで確認できます。</p>
          <p>必要な方は、この層で判断材料を揃えてください。</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {SLIDE_CARDS.map((c) => (
            <div key={c.title} className="border-b border-black/10 pb-4">
              <div className="font-medium">{c.title}</div>
              <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="border border-black/10 bg-white p-4">
          <div className="text-xs tracking-widest text-slate-400">役割</div>
          <div className="mt-1 text-xl font-medium">判断材料</div>
          <div className="mt-1 text-xs text-slate-500">導入前の理解を深める</div>
        </div>
        <div className="border border-black/10 bg-white p-4">
          <div className="text-xs tracking-widest text-slate-400">内容</div>
          <div className="mt-1 text-xl font-medium">理論＋実証</div>
          <div className="mt-1 text-xs text-slate-500">抽象ではなく検証ベース</div>
        </div>
        <div className="border border-black/10 bg-white p-4">
          <div className="text-xs tracking-widest text-slate-400">次</div>
          <div className="mt-1 text-xl font-medium">DEMO</div>
          <div className="mt-1 text-xs text-slate-500">実際に触って確かめる</div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {SLIDE_FRAMES.map((c) => (
          <div key={c.title} className="border border-black/10 bg-white p-5">
            <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-black/10 bg-slate-50 text-sm tracking-[0.18em] text-slate-400">
              {c.title}
            </div>
            <div className="mt-4 text-sm leading-7 text-slate-600">{c.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => onNavigate("demo")}
          className="w-full bg-black px-6 py-3 text-sm text-white transition hover:scale-[1.01] hover:shadow-md sm:w-auto"
        >
          次に、実際に試してみる
        </button>
      </div>
    </section>
  );
}
function TextStack({ lines }: any) {
  return (
    <div>
      {lines.map((l: string, i: number) => <p key={i}>{l}</p>)}
    </div>
  );
}

function IssueCard({ title, desc }: any) {
  return <div>{title}</div>;
}