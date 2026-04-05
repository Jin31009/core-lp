import React from "react";
import type { Page } from "../types";

type Card = { title: string; desc: string };
type Stat = { title: string; value: string; note: string };
type LinkButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

const HERO_STATS: Stat[] = [
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

const TOP_CTA_ITEMS = [
  "60分の共創設計セッション",
  "パイロットスタディーの相談",
  "1ケースからの検証設計",
];

export default function TopPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      {/* HERO（デザイン復元） */}
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
              その違和感を、経営視点で「関係」という構造から見直していきます。
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <LinkButton onClick={() => onNavigate("demo")}>
                経営課題として試す
              </LinkButton>

              <LinkButton variant="secondary" onClick={() => onNavigate("poc")}>
                導入前検証を見る
              </LinkButton>
            </div>
          </div>

          <div className="grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {HERO_STATS.map((s) => (
              <div key={s.title} className="border border-black/10 bg-white p-4">
                <div className="text-xs tracking-widest text-slate-400">{s.title}</div>
                <div className="mt-1 text-xl font-medium">{s.value}</div>
                <div className="mt-1 text-xs text-slate-500">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section title="現場で起きていること">
        {PROBLEM_CARDS.map((c) => (
          <IssueCard key={c.title} {...c} />
        ))}
      </Section>

      {/* CTA */}
      <Section title="ここから始められます">
        {TOP_CTA_ITEMS.map((t) => (
          <p key={t}>・{t}</p>
        ))}
      </Section>

      {/* CASE */}
      <Section title="すでに動き始めている現場があります">
        <p>現場の違和感から構造化された取り組みです。</p>
      </Section>

      {/* Q&A */}
      <Section title="よくある質問">
        <QACard q="なぜ広報だけでは変わらないのか？" a="関係の問題だからです。" />
        <QACard q="導入は必要？" a="まず検証できます。" />
        <QACard q="AIは必須？" a="必須ではありません。" />
        <QACard q="費用は？" a="最小から始められます。" />
      </Section>

      {/* NAVIGATION */}
      <Section title="どこから見ますか？">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => onNavigate("demo")}>DEMO</button>
          <button onClick={() => onNavigate("poc")}>POC</button>
          <button onClick={() => onNavigate("slides")}>学会</button>
          <button onClick={() => onNavigate("participation")}>PARTICIPATION</button>
        </div>
      </Section>
    </>
  );
}

/* 共通部品 */

function LinkButton({ children, onClick }: LinkButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

function Section({ title, children }: any) {
  return (
    <section className="px-4 py-10">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function IssueCard({ title, desc }: Card) {
  return (
    <div>
      <strong>{title}</strong>
      <div>{desc}</div>
    </div>
  );
}

function QACard({ q, a }: any) {
  return (
    <div>
      <strong>Q.</strong> {q}
      <br />
      <strong>A.</strong> {a}
    </div>
  );
}