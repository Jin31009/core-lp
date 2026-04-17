
import type { Page } from "../types";

type Card = {
  title: string;
  desc: string;
};

const POC_CARDS: Card[] = [
  { title: "ケース共有", desc: "投書・現場の違和感・採用時のズレなどを共有" },
  { title: "構造可視化", desc: "Δを軸に関係のズレを整理する" },
  { title: "次の一手", desc: "Pre-Assetの観点から行動案を設計する" },
  { title: "短期検証", desc: "オンライン・短期間で再現性を確認する" },
];

export default function PocPage({
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
          TOPへ戻る
        </button>
      </div>

      <div className="mb-12 border-t border-black/10 pt-8">
        <p className="text-xs tracking-[0.3em] text-slate-400">PoC</p>
        <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl md:text-5xl">
          導入前に、判断するための検証
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 text-slate-600 leading-8">
          <p className="text-lg text-slate-700">
            この取り組みが本当に使えるのか。
          </p>
          <p>自組織のケースで、小さく確認することができます。</p>
          <p>この段階で、導入する価値があるかを判断できます。</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {POC_CARDS.map((c, i) => (
            <PocCard
              key={c.title}
              step={`0${i + 1}`}
              title={c.title}
              desc={c.desc}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <MiniStat title="期間" value="短期" note="2週間程度" />
        <MiniStat title="負担" value="最小" note="現場を止めない" />
        <MiniStat title="成果" value="判断可能" note="続けるか決められる" />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton onClick={() => onNavigate("participation")}>
          共創モデルを見る
        </LinkButton>
        <LinkButton variant="secondary" onClick={() => onNavigate("top")}>
          TOPへ戻る
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

function PocCard({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="border border-black/10 bg-white p-6">
      <div className="text-xs tracking-[0.2em] text-slate-500">Step {step}</div>
      <div className="mt-2 text-lg font-medium text-slate-950">{title}</div>
      <div className="mt-3 text-sm leading-7 text-slate-600">{desc}</div>
    </div>
  );
}
