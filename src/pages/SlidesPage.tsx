import React from "react";
import type { Page } from "../types";

type Card = {
  title: string;
  desc: string;
};

const SLIDE_CARDS: Card[] = [
  { title: "Theory", desc: "RA理論・Δ・Trigger・Pre-Assetの構造" },
  { title: "Observation", desc: "患者ナラティブ分析や構造発見の過程" },
  { title: "Evidence", desc: "図版・論点・検証の流れ" },
  { title: "Bridge", desc: "LPからPoC、さらにRA-SSへ" },
];

const SLIDE_FRAMES: Card[] = [
  { title: "Figure 01", desc: "Relational Architectureの全体構造を示す基礎図版" },
  { title: "Figure 02", desc: "Δ / Trigger / Pre-Asset の連関を示す分析図版" },
  { title: "Figure 03", desc: "PoCとRA-SSへの接続を示す実装イメージ" },
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
        <div className="space-y-4 text-slate-600 leading-8">
          <p>
            ここで扱っているのは、広報表現の改善そのものではなく、
            その背後にある「関係の設計」です。
          </p>
          <p>
            その妥当性は、学会発表として整理された理論・観察・実証の流れの中で確認できます。
          </p>
          <p>
            導入前に理解を深めたい場合は、まずこのページで背景と位置づけを把握してください。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {SLIDE_CARDS.map((c) => (
            <div key={c.title} className="border-b border-black/10 pb-4">
              <div className="font-medium text-slate-900">{c.title}</div>
              <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <MiniStat title="役割" value="判断材料" note="導入前の理解を深める" />
        <MiniStat title="内容" value="理論＋実証" note="抽象ではなく検証ベース" />
        <MiniStat title="次" value="DEMO" note="実際に触って確かめる" />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {SLIDE_FRAMES.map((c) => (
          <FrameCard key={c.title} {...c} />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton onClick={() => onNavigate("demo")}>
          次に、実際に試してみる
        </LinkButton>
      </div>
    </section>
  );
}

function LinkButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  const base = "w-full px-6 py-3 text-sm transition sm:w-auto";
  const style =
    variant === "primary"
      ? "bg-black text-white shadow-sm hover:scale-[1.01] hover:shadow-md"
      : "border border-black bg-transparent text-black hover:bg-slate-50";

  return (
    <button type="button" onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  );
}

function MiniStat({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="border border-black/10 bg-white p-4">
      <div className="text-xs tracking-widest text-slate-400">{title}</div>
      <div className="mt-1 text-xl font-medium">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{note}</div>
    </div>
  );
}

function FrameCard({ title, desc }: Card) {
  return (
    <div className="border border-black/10 bg-white p-5">
      <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-black/10 bg-slate-50 text-sm tracking-[0.18em] text-slate-400">
        {title}
      </div>
      <div className="mt-4 text-sm leading-7 text-slate-600">{desc}</div>
    </div>
  );
}