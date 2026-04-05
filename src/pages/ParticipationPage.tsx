import React from "react";
import type { Page } from "../types";


type ParticipationItem = {
  title: string;
  subtitle: string;
  items: readonly string[];
};

const PARTICIPATION: readonly ParticipationItem[] = [
  {
    title: "OSS / Free",
    subtitle: "無償提供",
    items: ["考え方・構造モデルを公開", "一部ツールやデモを自由に使う", "入口として体験し理解する"],
  },
  {
    title: "Co-Creation",
    subtitle: "協賛・共同開発",
    items: ["ケース提供と検証参加", "改善提案と知見の還流", "共に機能を育てる"],
  },
  {
    title: "Support / Time Fee",
    subtitle: "実費支援",
    items: ["設定・伴走・導入準備", "PoC設計や運用相談", "時間分のみを請求"],
  },
] as const;

export default function ParticipationPage({
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
        <p className="text-xs tracking-[0.3em] text-slate-400">PARTICIPATION</p>
        <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl md:text-5xl">
          共創で進めるという選択肢
        </h2>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4 leading-8 text-slate-600">
          <p>これは完成品を導入するプロジェクトではありません。</p>
          <p>関係マネジメントという未整備領域を、協賛者と共に検証しながら形にしていきます。</p>
          <p>現在、医療機関で実証が始まっています。初期は少数の医療機関と共に進めています。</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PARTICIPATION.map((p) => (
            <div key={p.title} className="border border-black/10 bg-white p-5">
              <div className="font-medium">{p.subtitle} / {p.title}</div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {p.items.map((item) => (
                  <li key={item}>・{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="border border-black/10 bg-white p-4">
          <div className="text-xs tracking-widest text-slate-400">基本思想</div>
          <div className="mt-1 text-xl font-medium">共創</div>
          <div className="mt-1 text-xs text-slate-500">一緒に設計・検証する</div>
        </div>
        <div className="border border-black/10 bg-white p-4">
          <div className="text-xs tracking-widest text-slate-400">提供形態</div>
          <div className="mt-1 text-xl font-medium">OSS + 協賛</div>
          <div className="mt-1 text-xs text-slate-500">開きながら育てる</div>
        </div>
        <div className="border border-black/10 bg-white p-4">
          <div className="text-xs tracking-widest text-slate-400">費用</div>
          <div className="mt-1 text-xl font-medium">Time Fee</div>
          <div className="mt-1 text-xs text-slate-500">必要な分だけ支援</div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => onNavigate("demo")}
          className="w-full bg-black px-6 py-3 text-sm text-white transition hover:scale-[1.01] hover:shadow-md sm:w-auto"
        >
          まず試す
        </button>
        <button
          onClick={() => onNavigate("poc")}
          className="w-full border border-black bg-transparent px-6 py-3 text-sm text-black transition hover:bg-slate-50 sm:w-auto"
        >
          検証を見る
        </button>
      </div>
    </section>
  );
}