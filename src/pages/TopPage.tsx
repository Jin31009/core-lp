import React from "react";
import type { Page } from "../types";

import Section from "../components/ui/Section";
import LinkButton from "../components/ui/LinkButton";
import MiniStat from "../components/ui/MiniStat";

type Card = { title: string; desc: string };

const HERO_STATS = [
  { title: "入口", value: "広報", note: "媒体運用から関係設計へ" },
  { title: "本体", value: "Relation", note: "患者・職員・求職者との関係" },
  { title: "成果", value: "判断可能", note: "導入前に意思決定できる" },
  { title: "実装", value: "AI × PoC", note: "共に設計し、小さく検証する" },
];

const PROBLEM_CARDS: Card[] = [
  { title: "理念が浸透しない", desc: "ビジョンはあるが、行動に変換されない" },
  { title: "患者対応がばらつく", desc: "関係の取り扱いが経験と勘に委ねられている" },
  { title: "採用と定着がつながらない", desc: "求職者との関係が入職前から設計されていない" },
  { title: "広報が手段で終わる", desc: "発信で終わり、認識・関係・行動につながらない" },
];

const CTA_ITEMS = [
  "60分の共創設計セッション",
  "パイロットスタディーの相談",
  "1ケースからの検証設計",
];

const QA_ITEMS = [
  {
    q: "なぜ広報だけでは変わらないのか？",
    a: "問題の中心が情報不足ではなく、患者・職員・求職者との関係の設計不全にあるからです。",
  },
  {
    q: "いきなり導入する必要はありますか？",
    a: "必要ありません。まずは1ケースの分析やPoCで適合性を確認する進め方ができます。",
  },
  {
    q: "AIは必須ですか？",
    a: "必須ではありません。最初は人の対話と整理から始め、必要に応じてAIを組み込みます。",
  },
  {
    q: "費用はどれくらいですか？",
    a: "最初は小さな検証から始められるので、導入前に判断可能な形で進められます。",
  },
];

const NAV_ITEMS = [
  { label: "学会発表を見る", page: "slides" as Page, desc: "背景と理論を確認する" },
  { label: "Participation", page: "participation" as Page, desc: "共創モデルを確認する" },
  { label: "PoC", page: "poc" as Page, desc: "導入前の検証方法を見る" },
];

export default function TopPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <p className="text-xs tracking-[0.3em] text-slate-400">EDITORIAL</p>

            <h1 className="font-serif text-3xl leading-tight sm:text-4xl md:text-6xl">
              病院経営や広報に関わる中で、
              <br />
              こんな違和感はありませんか？
            </h1>

            <p className="text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              広報を整備しているのに、組織の変化につながらない。
              <br />
              その違和感を、経営視点で「関係」という構造から見直します。
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <LinkButton onClick={() => onNavigate("demo")}>DEMO</LinkButton>
              <LinkButton variant="secondary" onClick={() => onNavigate("poc")}>
                POC
              </LinkButton>
            </div>
          </div>

          <div className="grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {HERO_STATS.map((s) => (
              <MiniStat key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section eyebrow="PROBLEM" title="現場で起きていること">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-slate-600 leading-8">
            <p>経営課題として見たとき、変わらない理由は情報ではなく関係にあります。</p>
            <p>一つでも当てはまるなら、それは構造の問題かもしれません。</p>
          </div>

          <div className="grid gap-4">
            {PROBLEM_CARDS.map((c) => (
              <div key={c.title} className="border-b border-black/10 pb-4">
                <div className="font-medium">{c.title}</div>
                <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section eyebrow="CTA" title="ここから始められます">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            <p className="text-lg leading-8 text-slate-700">
              いきなり導入するのではなく、まず1ケースから検証してみる。
              <br />
              その進め方ができます。
            </p>

            <p className="leading-8 text-slate-600">
              最初の段階では、現場で起きている違和感を一緒に整理し、
              構造としてどこを見直すべきかを確認します。
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton onClick={() => onNavigate("participation")}>
                まず1ケース、一緒に整理してみる
              </LinkButton>
            </div>
          </div>

          <div className="border-l border-black/10 pl-0 sm:pl-8">
            <div className="space-y-3 text-sm leading-7 text-slate-700">
              {CTA_ITEMS.map((item) => (
                <p key={item}>・{item}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CASE */}
      <Section eyebrow="CASE" title="すでに動き始めている現場があります">
        <div className="mb-8 border-l border-black/10 pl-6 text-sm leading-7 text-slate-700">
          <p>現場の違和感から構造化された取り組みが、すでに始まっています。</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5 leading-8 text-slate-700">
            <p className="text-lg">
              患者の声や現場のズレを、単なる個別対応ではなく構造として見ることで、
              次の一手が共有できるようになります。
            </p>

            <p>
              小さなケースを丁寧に分解し、関係のズレを言語化することから、
              チームで扱える知見へと変えていく流れです。
            </p>
          </div>

          <div className="border border-black/10 bg-slate-50 p-6">
            <div className="text-xs tracking-[0.25em] text-slate-400">PILOT CASE</div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <p>・患者ナラティブを起点に分析</p>
              <p>・関係のズレを構造として整理</p>
              <p>・次の一手をチームで共有</p>
              <p>・小さく検証し、再現性を確認</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Q&A */}
      <Section eyebrow="Q&A" title="よくある質問">
        <div className="grid gap-4 md:grid-cols-2">
          {QA_ITEMS.map((item) => (
            <div key={item.q} className="border border-black/10 bg-white p-5">
              <div className="text-sm font-medium leading-7 text-slate-900">Q. {item.q}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">A. {item.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* NAVIGATION */}
      <Section eyebrow="NAVIGATION" title="どこから見ますか？">
        <div className="grid gap-4 md:grid-cols-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className="border border-black/10 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="text-xs tracking-[0.22em] text-slate-400">NEXT</div>
              <div className="mt-2 text-lg font-medium text-slate-900">{item.label}</div>
              <div className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</div>
            </button>
          ))}
        </div>
      </Section>
    </>
  );
}