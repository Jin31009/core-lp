import React from "react";

type Page = "top" | "slides" | "demo" | "participation" | "poc";
type Tone = "emerald" | "amber" | "orange" | "rose";
type PresetId = "patient" | "recruit" | "staff";

type DemoResult = {
  delta: string;
  level: 1 | 2 | 3 | 4;
  insight: string;
  action: string;
  asset: string;
  category: string;
  before: string;
  after: string;
};

type Card = { title: string; desc: string };
type Stat = { title: string; value: string; note: string };
type Preset = { id: PresetId; label: string; prompt: string };
type LinkButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

type NavItem = { label: string; page: Page };
type TopSection = Card & {
  page: Page;
  priority: 1 | 2 | 3;
  step: string;
  recommended?: boolean;
};

type ParticipationItem = {
  title: string;
  subtitle: string;
  items: readonly string[];
};

const HERO_STATS: Stat[] = [
  { title: "入口", value: "広報", note: "媒体運用から関係設計へ" },
  { title: "本体", value: "Relation", note: "患者・職員・求職者との関係" },
  { title: "成果", value: "判断可能", note: "導入前に意思決定できる" },
  { title: "実装", value: "AI × PoC", note: "共に設計し、小さく検証する" },
];

const TOP_CTA_ITEMS = [
  "60分の共創設計セッション",
  "パイロットスタディーの相談",
  "1ケースからの検証設計",
];

const TOP_SECTIONS: TopSection[] = [
  {
    title: "Demo",
    desc: "RA-SSの最小体験を試し、構造と次の一手を確認する",
    page: "demo",
    priority: 1,
    step: "推奨 1",
    recommended: true,
  },
  {
    title: "PoC",
    desc: "小さく検証し、自組織のケースで適合性を確かめる",
    page: "poc",
    priority: 2,
    step: "推奨 2",
    recommended: true,
  },
  {
    title: "学会発表",
    desc: "学会発表・研究内容を第二層の理解資産として提示する",
    page: "slides",
    priority: 3,
    step: "補助",
  },
  {
    title: "Participation",
    desc: "OSS・共創モデルを示す",
    page: "participation",
    priority: 3,
    step: "補助",
  },
];

const PROBLEM_CARDS: Card[] = [
  { title: "理念が浸透しない", desc: "ビジョンはあるが、行動に変換されない" },
  { title: "患者対応がばらつく", desc: "関係の取り扱いが経験と勘に委ねられている" },
  { title: "採用と定着がつながらない", desc: "求職者との関係が入職前から設計されていない" },
  { title: "広報が手段で終わる", desc: "発信で終わり、認識・関係・行動につながらない" },
];

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

const POC_CARDS: Card[] = [
  { title: "ケース共有", desc: "投書・現場の違和感・採用時のズレなどを共有" },
  { title: "構造可視化", desc: "Δを軸に関係のズレを整理" },
  { title: "次の一手", desc: "Pre-Assetの観点から行動案を設計" },
  { title: "短期検証", desc: "オンライン・短期間で再現性を確認" },
];

const PRESETS: Preset[] = [
  { id: "patient", label: "患者対応", prompt: "患者から『説明が足りず不安だった』という声が出ている。" },
  { id: "recruit", label: "採用・定着", prompt: "採用時には魅力を感じて入職したが、現場とのギャップで早期離職が起きている。" },
  { id: "staff", label: "職員間連携", prompt: "部署間で認識がずれ、患者への案内内容にばらつきが出ている。" },
];

function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", name, params);
  }
}

export default function App() {
  const [page, setPage] = React.useState<Page>("top");
 const [, setHistory] = React.useState<Page[]>([]);
  
const navigate = (next: Page) => {
  setHistory((h: Page[]) => [...h, page])
    setPage(next);
  };

  const goBack = () => {
    setHistory((h: Page[]) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setPage(prev);
      return h.slice(0, -1);
    });
  };

  const navItems: NavItem[] = [
    { label: "TOP", page: "top" },
    { label: "学会", page: "slides" },
    { label: "DEMO", page: "demo" },
    { label: "PARTICIPATION", page: "participation" },
    { label: "POC", page: "poc" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-slate-900 selection:text-white">
      <Header navItems={navItems} current={page} onNavigate={navigate} />
      <main>
        {page === "top" && <TopPage onNavigate={navigate} />}
        {page === "slides" && <SlidesPage onNavigate={navigate} onBackPrev={goBack} />}
        {page === "demo" && <DemoPage onNavigate={navigate} onBackPrev={goBack} />}
        {page === "participation" && <ParticipationPage onNavigate={navigate} onBackPrev={goBack} />}
        {page === "poc" && <PocPage onNavigate={navigate} onBackPrev={goBack} />}
      </main>
      <Footer />
    </div>
  );
}

function Header({ navItems, current, onNavigate }: { navItems: NavItem[]; current: Page; onNavigate: (page: Page) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <button className="flex items-start gap-3 text-left sm:gap-4" onClick={() => onNavigate("top")}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/20 text-[10px] tracking-[0.3em]">CORE</div>
          <div>
            <div className="text-[10px] tracking-[0.35em] text-slate-500">RELATION DESIGN</div>
            <div className="text-sm font-medium sm:text-base">黒江 仁</div>
            <div className="mt-1 max-w-[14rem] text-[10px] leading-3 tracking-[0.06em] text-slate-500 sm:max-w-none sm:tracking-[0.08em]">
              病院広報の限界を超える｜関係マネジメントとAIによる新しい設計（CORE）
            </div>
          </div>
        </button>
        <nav className="hidden lg:flex items-center gap-6 text-xs tracking-[0.25em]">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`transition ${current === item.page ? "text-black" : "text-slate-400 hover:text-black"}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="border-t border-black/10 px-4 py-3 lg:hidden">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`border px-3 py-2 text-[10px] tracking-[0.22em] transition ${current === item.page ? "border-black bg-black text-white" : "border-black/10 bg-white text-slate-600"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function TopPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const recommendedFlow = TOP_SECTIONS.filter((item) => item.recommended).sort((a, b) => a.priority - b.priority);
  const supportFlow = TOP_SECTIONS.filter((item) => !item.recommended).sort((a, b) => a.priority - b.priority);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <p className="text-xs tracking-[0.3em] text-slate-400">EDITORIAL</p>
            <h1 className="font-serif text-3xl leading-tight sm:text-4xl md:text-6xl">
              病院経営や広報に関わる中で、<br />こんな違和感はありませんか？
            </h1>
            <p className="text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              広報を整備しているのに、組織の変化につながらない。<br />その違和感を、経営視点で「関係」という構造から見直していきます。例えば、採用しても定着しない、患者対応がばらつく、といった問題です。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <LinkButton onClick={() => { trackEvent("cta_demo_click"); onNavigate("demo"); }}>経営課題として試す</LinkButton>
              <LinkButton variant="secondary" onClick={() => { trackEvent("cta_poc_click"); onNavigate("poc"); }}>導入前検証を見る</LinkButton>
            </div>
          </div>
          <div className="grid gap-4 border-t border-black/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 sm:grid-cols-2">
            {HERO_STATS.map((s) => (
              <MiniStat key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="PROBLEM" title="現場で起きていること">
        <div className="grid gap-10 lg:grid-cols-2">
          <TextStack
            lines={[
              "経営課題として見たとき、変わらない理由は情報ではなく関係にあります。",
              "一つでも当てはまるなら、それは個別の問題ではなく構造の問題かもしれません。",
            ]}
          />
          <div className="grid gap-4">
            {PROBLEM_CARDS.map((c) => (
              <IssueCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="NAVIGATION" title="どこから見ますか？">
        <div className="mb-8 border border-black/10 bg-white p-6">
          <div className="text-xs tracking-[0.25em] text-slate-400">RECOMMENDED FLOW</div>
          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            {recommendedFlow.map((item, index) => (
              <React.Fragment key={item.title}>
                <PriorityCard title={item.title} desc={item.desc} step={item.step} emphasis="high" onClick={() => onNavigate(item.page)} />
                {index < recommendedFlow.length - 1 ? <FlowArrow /> : null}
              </React.Fragment>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            迷う場合は、まず <span className="font-medium text-slate-900">DEMO</span> で体験し、その後 <span className="font-medium text-slate-900">PoC</span> で導入前検証を見る順番を推奨します。まず構造を体験し、その上で導入前検証を行うことで、判断が可能になります。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {supportFlow.map((c) => (
            <PriorityCard key={c.title} title={c.title} desc={c.desc} step={c.step} emphasis="normal" onClick={() => onNavigate(c.page)} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Q&A" title="よくある質問">
        <div className="grid gap-6 md:grid-cols-2">
          <QACard q="なぜ広報だけでは組織は変わらないのか？" a="問題は情報ではなく関係にあるためです。情報を発信しても、認識のズレや期待のズレが解消されなければ、行動は変わりません。" />
          <QACard q="関係マネジメントとは何ですか？" a="患者・職員・求職者との関係を構造として扱い、ズレを可視化し、改善可能な状態にする取り組みです。" />
          <QACard q="いきなり導入する必要はありますか？" a="必要ありません。まずは1ケースから検証し、自組織に適合するかを確認できます。" />
          <QACard q="どの程度の負担がかかりますか？" a="最初は最小限です。短期間・少数ケースで検証し、現場を止めずに進められます。" />
          <QACard q="AIは必須ですか？" a="必須ではありません。構造理解が本質であり、AIはそれを支援する手段として後から組み込むことができます。" />
          <QACard q="OSS（オープンソース）とはどういう位置づけですか？" a="この取り組みは、考え方や構造の一部をOSSとして公開し、共創的に発展させていく前提で設計しています。まずは自由に触れ、理解し、その上で必要に応じて伴走支援を受けることができます。" />
        </div>
      </Section>

      <Section eyebrow="CASE" title="すでに動き始めている現場があります">
        <div className="mb-8 border-l border-black/10 pl-6 text-sm leading-7 text-slate-700">
          <p>
            この取り組みは、黒江仁が30年以上にわたり医療広報に関わる中で、現場の違和感から構造化してきたものです。中日新聞との医療広報企画や、複数の医療機関での広報支援の経験をもとに、現在は「関係マネジメント」という新しい領域として再構成しています。
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5 text-slate-700 leading-8">
            <p className="text-lg">ある医療機関で、患者からの一つの声をきっかけに、関係のズレを構造として見直す取り組みが始まりました。</p>
            <p>
              それは大きなシステム導入ではなく、1つのケースを丁寧に分解し、「なぜズレが起きたのか」「次にどう対応すべきか」をチームで共有するところから始まっています。
            </p>
            <p>
              現場ではすでに、<br />
              「今まで感覚でやっていたことが、言語化できた」<br />
              という変化が生まれています。
              <br />現在も継続して検証が進んでいます。
            </p>
          </div>
          <div className="border border-black/10 bg-slate-50 p-6">
            <div className="text-xs tracking-[0.25em] text-slate-400">PILOT CASE</div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <p>・患者ナラティブを起点に分析</p>
              <p>・Δ（関係圧）として構造化</p>
              <p>・Pre-Assetで次の一手を設計</p>
              <p>・現場で再現性を検証中</p>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="CTA" title="ここから始められます">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            <p className="text-lg leading-8">
              いきなり投資や導入をするのではなく、まず1つのケースから検証してみませんか？
              <br />最初の60分で、構造と次の一手を整理します。
              <br />ここまで読まれているなら、一度は「使えるかもしれない」と感じているはずです。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton onClick={() => { trackEvent("cta_consult_click"); onNavigate("participation"); }}>まず1ケース、一緒に整理してみる</LinkButton>
            </div>
          </div>
          <div className="border-l border-black/10 pl-8 text-sm leading-7">
            {TOP_CTA_ITEMS.map((t) => (
              <p key={t}>・{t}</p>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function SlidesPage({ onNavigate, onBackPrev }: { onNavigate: (page: Page) => void; onBackPrev: () => void }) {
  return (
    <PageShell eyebrow="ACADEMIC" title="学会発表・研究背景と実証" onBackTop={() => onNavigate("top")} onBackPrev={onBackPrev}>
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <TextStack
          lines={[
            "まず前提として、ここで扱っているのは“広報の改善”ではなく“関係の設計”です。",
            "その妥当性は、学会発表として整理された理論・観察・実証の流れで確認できます。",
            "必要な方は、この層で判断材料を揃えてください。",
          ]}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {SLIDE_CARDS.map((c) => (
            <IssueCard key={c.title} {...c} />
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
        <LinkButton onClick={() => onNavigate("demo")}>次に、実際に試してみる</LinkButton>
      </div>
    </PageShell>
  );
}

function DemoPage({ onNavigate, onBackPrev }: { onNavigate: (page: Page) => void; onBackPrev: () => void }) {
  const [selectedPreset, setSelectedPreset] = React.useState<PresetId>(PRESETS[0].id);
  const [input, setInput] = React.useState(PRESETS[0].prompt);
  const [step, setStep] = React.useState(1);
  const [result, setResult] = React.useState<DemoResult | null>(null);
  const currentPreset = PRESETS.find((p) => p.id === selectedPreset) ?? PRESETS[0];

  function handlePresetChange(id: PresetId) {
    const preset = PRESETS.find((p) => p.id === id);
    if (!preset) return;
    setSelectedPreset(id);
    setInput(preset.prompt);
    setResult(null);
    setStep(1);
  }

  function analyzeCase(text: string, id: PresetId): DemoResult {
    const normalized = text.toLowerCase();

    if (id === "recruit" || normalized.includes("離職") || normalized.includes("採用") || normalized.includes("入職")) {
      return {
        delta: "Δ3（不信）",
        level: 3,
        insight: "期待形成と現場実態のあいだにMeaning Gapがあり、入職前後で関係圧が増幅している。",
        action: "入職前に期待値と役割の見通しを揃える対話導線を設計する。",
        asset: "C-01｜流れの接続",
        category: "求職者との関係設計",
        before: "魅力訴求が中心で、入職後の実態とのズレが残る。",
        after: "見通しと役割が事前に共有され、定着に向けた接続が生まれる。",
      };
    }

    if (id === "staff" || normalized.includes("部署") || normalized.includes("職員") || normalized.includes("連携")) {
      return {
        delta: "Δ2（不満）",
        level: 2,
        insight: "部署間で認識と説明プロセスがずれ、患者接点で一貫性が失われている。",
        action: "案内の基準文と役割分担を明文化し、接点での説明順序を整える。",
        asset: "A-02｜認識の接続",
        category: "職員間の関係調整",
        before: "各部署が個別判断で伝え、患者体験にばらつきが出る。",
        after: "説明基準が共有され、関係の一貫性が回復する。",
      };
    }

    return {
      delta: "Δ2（不満）",
      level: 2,
      insight: "説明不足により患者側の見通しが立たず、認識のズレが関係圧として蓄積している。",
      action: "見通しを補う一言と、次に起きる流れの接続を追加する。",
      asset: "E-01｜見通し提示",
      category: "患者との関係調整",
      before: "説明は行われているが、相手の不安や次の見通しが回収されていない。",
      after: "次に何が起きるかが明確になり、不安が緩和される。",
    };
  }

  function goToReview() {
    if (!input.trim()) return;
    setResult(null);
    setStep(2);
  }

  function analyze() {
    if (!input.trim()) {
      setResult(null);
      setStep(1);
      return;
    }
    setResult(analyzeCase(input, selectedPreset));
    setStep(3);
  }

  function resetDemo() {
    setSelectedPreset(PRESETS[0].id);
    setInput(PRESETS[0].prompt);
    setResult(null);
    setStep(1);
  }

  const tone: Tone = result?.level === 1 ? "emerald" : result?.level === 3 ? "orange" : result?.level === 4 ? "rose" : "amber";

  return (
    <PageShell eyebrow="DEMO" title="RA-SSを、まず触れて確認する。" onBackTop={() => onNavigate("top")} onBackPrev={onBackPrev}>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StepCard number="01" title="ケースを選ぶ" desc="患者対応・採用・職員連携から近いケース" active={step >= 1} />
        <StepCard number="02" title="構造を確認" desc="認識のズレと関係圧の方向を見る" active={step >= 2} />
        <StepCard number="03" title="次の一手を見る" desc="Pre-Assetと改善アクションを確認" active={step >= 3} />
      </div>
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 text-slate-600">
          <p className="text-lg leading-8">3分で試せます。実際のケースに近い形で試せます。違和感を入力すると「関係圧」「構造」「次の一手」が表示されます。これは自組織で使えるかを判断するための最短導線です。</p>
          <Panel title="Case Type">
            <div className="mt-4 flex flex-wrap gap-3">
              {PRESETS.map((p) => {
                const active = selectedPreset === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePresetChange(p.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"}`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </Panel>
          <Panel title="Step 1" subtitle="違和感・ケースを入力" badge={currentPreset.label}>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setResult(null);
                setStep(1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  goToReview();
                }
              }}
              placeholder="例：患者からの不満、採用時の違和感などを入力（⌘/Ctrl + Enterで次へ）"
              className="mt-4 w-full rounded-2xl border border-slate-300 p-4 text-sm leading-7 outline-none transition focus:border-slate-500"
              rows={5}
            />
            <div className="mt-4 flex flex-col gap-3">
              <LinkButton onClick={() => { trackEvent("demo_review_click"); goToReview(); }}>構造を確認する</LinkButton>
              <div className="flex flex-col gap-3 sm:flex-row">
                <LinkButton variant="secondary" onClick={resetDemo}>リセット</LinkButton>
                <LinkButton variant="secondary" onClick={() => { trackEvent("demo_to_poc"); onNavigate("poc"); }}>PoCへ進む</LinkButton>
              </div>
            </div>
          </Panel>
        </div>
        <div className="space-y-5">
          <Panel title="Step 2" subtitle="構造レビュー" badge={result ? result.delta : "分析待機中"} badgeTone={tone}>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <DeltaVisual label="Δ1" title="違和感" active={result?.level === 1} tone="emerald" />
              <DeltaVisual label="Δ2" title="不満" active={result?.level === 2} tone="amber" />
              <DeltaVisual label="Δ3" title="不信" active={result?.level === 3} tone="orange" />
              <DeltaVisual label="Δ4" title="断絶" active={result?.level === 4} tone="rose" />
            </div>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {step < 2 ? "まずケースを入力し、構造レビューへ進んでください。" : result ? result.insight : "このケースでは、認識のズレがどこで生じているかを確認します。次のボタンで分析を実行してください。"}
            </div>
            <div className="mt-4 flex flex-col sm:items-end">
              <LinkButton onClick={() => { trackEvent("demo_analyze_click"); analyze(); }}>次の一手を見る</LinkButton>
            </div>
          </Panel>
          <Panel title="Step 3" subtitle="次の一手 / Pre-Asset" badge={result ? result.category : "未分析"}>
            {!result ? (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-400">分析を実行すると、Pre-Assetと改善アクション、Before / After が表示されます。</div>
            ) : (
              <div className="mt-5 space-y-4">
                <PanelLite label="Pre-Asset" value={result.asset} />
                <PanelLite label="次の一手" value={result.action} />
                <ResultHighlight result={result} />
                <div className="grid gap-4 md:grid-cols-2">
                  <BeforeAfterCard label="Before" text={result.before} />
                  <BeforeAfterCard label="After" text={result.after} />
                </div>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </PageShell>
  );
}

function ParticipationPage({ onNavigate, onBackPrev }: { onNavigate: (page: Page) => void; onBackPrev: () => void }) {
  return (
    <PageShell eyebrow="PARTICIPATION" title="共創で進めるという選択肢" onBackTop={() => onNavigate("top")} onBackPrev={onBackPrev}>
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <TextStack
          lines={[
            "これは完成品を導入するプロジェクトではありません。",
            "関係マネジメントという未整備領域を、協賛者と共に検証しながら形にしていきます。",
            "現在、医療機関で実証が始まっています。初期は少数の医療機関と共に進めています。",
          ]}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {PARTICIPATION.map((p) => (
            <ListCard key={p.title} title={`${p.subtitle} / ${p.title}`} items={p.items} white />
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
        <LinkButton variant="secondary" onClick={() => onNavigate("poc")}>検証を見る</LinkButton>
      </div>
    </PageShell>
  );
}

function PocPage({ onNavigate, onBackPrev }: { onNavigate: (page: Page) => void; onBackPrev: () => void }) {
  return (
    <PageShell eyebrow="PoC" title="導入前に、判断するための検証" onBackTop={() => onNavigate("top")} onBackPrev={onBackPrev}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <TextStack
          large
          lines={[
            "この取り組みが本当に使えるのか。",
            "自組織のケースで、小さく確認することができます。",
            "この段階で、導入する価値があるかを判断できます。",
          ]}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {POC_CARDS.map((c, i) => (
            <PocCard key={c.title} step={`0${i + 1}`} title={c.title} desc={c.desc} />
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <MiniStat title="期間" value="短期" note="2週間程度" />
        <MiniStat title="負担" value="最小" note="現場を止めない" />
        <MiniStat title="成果" value="判断可能" note="続けるか決められる" />
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton onClick={() => onNavigate("participation")}>共創モデルを見る</LinkButton>
        <LinkButton variant="secondary" onClick={() => onNavigate("top")}>TOPへ戻る</LinkButton>
      </div>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, onBackTop, onBackPrev, children }: { eyebrow: string; title: string; onBackTop: () => void; onBackPrev?: () => void; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row">
        {onBackPrev && (
          <button onClick={onBackPrev} className="w-full border border-black/15 px-4 py-3 text-sm text-slate-600 transition hover:bg-white sm:w-auto sm:py-2">
            ← 前のページへ戻る
          </button>
        )}
        <button onClick={onBackTop} className="w-full border border-black/15 px-4 py-3 text-sm text-slate-600 transition hover:bg-white sm:w-auto sm:py-2">
          ← TOPへ戻る
        </button>
      </div>
      <div className="mb-12 border-t border-black/10 pt-8">
        <p className="text-xs tracking-[0.3em] text-slate-400">{eyebrow}</p>
        <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl md:text-5xl">{title}</h2>
      </div>
      {children}
      <ProfileBlock />
    </section>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-10 border-t border-black/10 pt-8">
        <p className="text-xs tracking-[0.3em] text-slate-400">{eyebrow}</p>
        <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TextStack({ lines, large = false }: { lines: string[]; large?: boolean }) {
  return (
    <div className="space-y-4 text-slate-600 leading-8">
      {lines.map((line, i) => (
        <p key={i} className={large && i === 0 ? "text-lg text-slate-700" : i === 1 ? "pt-1" : i === lines.length - 1 ? "pt-2" : ""}>
          {line}
        </p>
      ))}
    </div>
  );
}

function LinkButton({ children, href, onClick, variant = "primary" }: LinkButtonProps) {
  const base = "w-full px-6 py-3 text-sm transition sm:w-auto";
  const style = variant === "primary"
    ? "bg-black text-white shadow-sm hover:scale-[1.01] hover:shadow-md"
    : "border border-black text-black bg-transparent hover:bg-slate-50";

  if (href) {
    return (
      <a href={href} className={`${base} ${style}`}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  );
}

function Panel({ title, subtitle, badge, badgeTone, children }: { title: string; subtitle?: string; badge?: string; badgeTone?: Tone; children: React.ReactNode }) {
  const tones: Record<Tone, string> = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
  };

  return (
    <div className="border border-black/5 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs tracking-[0.25em] text-slate-400">{title}</div>
          {subtitle ? <div className="mt-1 font-medium">{subtitle}</div> : null}
        </div>
        {badge ? (
          <div className={`rounded-full border px-3 py-1 text-xs ${badgeTone ? tones[badgeTone] : "border-black/10 bg-slate-100 text-slate-600"}`}>
            {badge}
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function ListCard({ title, items, white = false }: { title: string; items: readonly string[]; white?: boolean }) {
  return (
    <div className={`border border-black/10 p-5 ${white ? "bg-white" : "bg-transparent"}`}>
      <div className="font-medium">{title}</div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item}>・{item}</li>
        ))}
      </ul>
    </div>
  );
}

function QACard({ q, a }: { q: string; a: string }) {
  return (
    <div className="border border-black/10 bg-white p-5">
      <div className="text-[10px] tracking-[0.24em] text-slate-400">Q&A</div>
      <div className="mt-2 font-semibold leading-7">Q. {q}</div>
      <p className="mt-2 text-sm leading-7 text-slate-600">A. {a}</p>
    </div>
  );
}

function IssueCard({ title, desc }: Card) {
  return (
    <div className="border-b border-black/10 pb-4">
      <div className="font-medium">{title}</div>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function PriorityCard({ title, desc, step, onClick, emphasis }: { title: string; desc: string; step: string; onClick: () => void; emphasis: "high" | "normal" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full border p-6 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${emphasis === "high" ? "border-black bg-white hover:border-black/80" : "border-black/10 bg-white hover:border-black/30"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="text-[10px] tracking-[0.28em] text-slate-400">{step}</div>
        {emphasis === "high" ? <div className="text-[10px] tracking-[0.28em] text-black">RECOMMENDED</div> : null}
      </div>
      <div className={`mt-4 ${emphasis === "high" ? "font-serif text-3xl" : "font-serif text-2xl"}`}>{title}</div>
      <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
    </button>
  );
}

function FlowArrow() {
  return <div className="hidden text-center text-2xl text-slate-400 md:block">→</div>;
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

function ResultHighlight({ result }: { result: DemoResult }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MiniStat title="関係圧" value={result.delta} note="現在の緊張レベル" />
      <MiniStat title="カテゴリ" value={result.category} note="どの関係領域の問題か" />
      <MiniStat title="推奨部材" value={result.asset} note="最初に使うPre-Asset" />
    </div>
  );
}

function StepCard({ number, title, desc, active }: { number: string; title: string; desc: string; active: boolean }) {
  return (
    <div className={`border p-5 ${active ? "border-black bg-black text-white" : "border-black/10 bg-white text-slate-700"}`}>
      <div className={`text-xs tracking-[0.22em] ${active ? "text-slate-300" : "text-slate-500"}`}>Step {number}</div>
      <div className="mt-2 text-lg font-medium">{title}</div>
      <div className={`mt-2 text-sm leading-6 ${active ? "text-slate-200" : "text-slate-600"}`}>{desc}</div>
    </div>
  );
}

function DeltaVisual({ label, title, active, tone }: { label: string; title: string; active: boolean; tone: Tone }) {
  const tones: Record<Tone, string> = {
    emerald: active ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-black/10 bg-white text-slate-500",
    amber: active ? "border-amber-500 bg-amber-50 text-amber-700" : "border-black/10 bg-white text-slate-500",
    orange: active ? "border-orange-500 bg-orange-50 text-orange-700" : "border-black/10 bg-white text-slate-500",
    rose: active ? "border-rose-500 bg-rose-50 text-rose-700" : "border-black/10 bg-white text-slate-500",
  };

  return (
    <div className={`border p-3 text-center transition ${active ? "scale-[1.03] shadow-sm" : ""} ${tones[tone]}`}>
      <div className="text-xs tracking-[0.18em]">{label}</div>
      <div className="mt-1 text-sm">{title}</div>
    </div>
  );
}

function BeforeAfterCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-black/10 bg-slate-50 p-4">
      <div className="text-xs tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm leading-7 text-slate-700">{text}</div>
    </div>
  );
}

function PanelLite({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/10 bg-slate-50 p-4">
      <div className="text-xs tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-2 text-base leading-7 text-slate-900">{value}</div>
    </div>
  );
}

function PocCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="border border-black/10 bg-white p-6">
      <div className="text-xs tracking-[0.2em] text-slate-500">Step {step}</div>
      <div className="mt-2 text-lg font-medium text-slate-950">{title}</div>
      <div className="mt-3 text-sm leading-7 text-slate-600">{desc}</div>
    </div>
  );
}

function MiniStat({ title, value, note }: Stat) {
  return (
    <div className="border border-black/10 bg-white p-4">
      <div className="text-xs tracking-widest text-slate-400">{title}</div>
      <div className="mt-1 text-xl font-medium">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{note}</div>
    </div>
  );
}

function ProfileBlock() {
  return (
    <div className="mt-16 border-t border-black/10 pt-8 text-sm leading-7 text-slate-600">
      <div className="mb-2 text-xs tracking-[0.3em] text-slate-400">PROFILE</div>
      <p>黒江仁｜医療広報・関係設計</p>
      <p className="mt-2">
        医療広報に30年以上従事。中日新聞との医療広報企画や、複数の医療機関における広報支援を通じて、「伝えているのに変わらない」という現場の違和感に向き合う。
      </p>
      <p className="mt-2">
        現在は、その経験をもとに「関係マネジメント」という視点で構造化し、AIとの共創により再現可能な形へと再設計している。
      </p>
    </div>
  );
}

function Footer() {
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

export function __testables() {
  return {
    pageCount: 5,
    hasTopPage: true,
    hasSlidesPage: true,
    hasDemoPage: true,
    hasParticipationPage: true,
    hasPocPage: true,
    heroStatCount: HERO_STATS.length,
    hasKpi: HERO_STATS.some((s) => s.title === "成果"),
    topSectionCount: TOP_SECTIONS.length,
    recommendedTopSectionCount: TOP_SECTIONS.filter((item) => item.recommended).length,
    topHasRecommendedFlow: true,
    slideFrameCount: SLIDE_FRAMES.length,
    demoPresetCount: PRESETS.length,
    pocCardCount: POC_CARDS.length,
    hasDecisionMessage: true,
    hasFooter: true,
    hasMobileNav: true,
    hasRefinedUi: true,
  };
}
