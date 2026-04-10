
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
    items: [
      "考え方・構造モデルを公開",
      "一部ツールやデモを自由に使う",
      "入口として体験し理解する",
    ],
  },
  {
    title: "Co-Creation",
    subtitle: "協賛・共同開発",
    items: [
      "ケース提供と検証参加",
      "改善提案と知見の還流",
      "共に機能を育てる",
    ],
  },
  {
    title: "Support / Time Fee",
    subtitle: "実費支援",
    items: [
      "設定・伴走・導入準備",
      "PoC設計や運用相談",
      "時間分のみを請求",
    ],
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
        <div className="space-y-4 text-slate-600 leading-8">
          <p>
            これは完成品を導入するプロジェクトではありません。
          </p>
          <p>
            関係マネジメントという未整備領域を、協賛者と共に検証しながら形にしていく進め方です。
          </p>
          <p>
            現在、医療機関の現場で小さく実証が始まっており、共に育てる前提で動いています。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PARTICIPATION.map((p) => (
            <ListCard
              key={p.title}
              title={`${p.subtitle} / ${p.title}`}
              items={p.items}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <MiniStat title="基本思想" value="共創" note="一緒に設計・検証する" />
        <MiniStat title="提供形態" value="OSS + 協賛" note="開きながら育てる" />
        <MiniStat title="費用" value="Time Fee" note="必要な分だけ支援" />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton onClick={() => onNavigate("demo")}>まず試す</LinkButton>
        <LinkButton variant="secondary" onClick={() => onNavigate("poc")}>
          検証を見る
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

function ListCard({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="border border-black/10 bg-white p-5">
      <div className="font-medium text-slate-900">{title}</div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item}>・{item}</li>
        ))}
      </ul>
    </div>
  );
}