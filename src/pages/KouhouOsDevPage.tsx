import type { ReactNode } from "react";

const navItems = [
  { label: "病院広報工房とは", href: "#about" },
  { label: "広報OS", href: "#kouhou-os" },
  { label: "CORE NAVI", href: "#cockpit" },
  { label: "初期設定", href: "#setup" },
  { label: "提供領域", href: "#services" },
  { label: "実証", href: "#evidence" },
  { label: "note", href: "#journal" },
  { label: "お問い合わせ", href: "#cta" },
];

const problems = [
  { icon: "users", title: "広報が属人的", text: "担当者の経験やスキルに依存し、継続しにくい。" },
  { icon: "clipboard", title: "掲示がバラバラ", text: "掲示物や配布物の表現が統一されていない。" },
  { icon: "file", title: "説明資料が部署ごとに違う", text: "説明の粒度や導線が部署ごとに異なる。" },
  { icon: "route", title: "紙・WEB・SNSが分断", text: "媒体ごとに情報が切れ、全体像が見えにくい。" },
  { icon: "message", title: "患者さんの声を活かしきれない", text: "自由記述や意見が整理されず、改善に接続しにくい。" },
];

const roles = [
  { icon: "target", name: "CORE", label: "黒江仁の経験知・現場感・最終判断", layer: "Human judgement", text: "黒江仁の病院広報経験をもとに、現場の声を読み、問いを立て、最終判断を行う。" },
  { icon: "book", name: "NAVI", label: "構造化・設計・監査", layer: "GPT支援レイヤー", text: "GPTを構造化支援として使い、情報と導線を伝わる順序へ整理する。" },
  { icon: "cloud", name: "SORA", label: "翻訳・共感・可読性", layer: "GPT支援レイヤー", text: "GPTを翻訳支援として使い、専門情報をやさしい言葉と読みやすい表現に整える。" },
  { icon: "code", name: "CODEX", label: "実装・制御・公開", layer: "GPT支援レイヤー", text: "GPTを実装支援として使い、WEBや資料として公開できる形に組み立てる。" },
];

const serviceAreas = [
  { icon: "megaphone", title: "1. 広報・ニュース系", bullets: ["お知らせ", "プレスリリース", "トピックス", "院内報・広報誌"] },
  { icon: "clipboard", title: "2. 案内・掲示系", bullets: ["院内掲示", "ポスター", "リーフレット", "QR付き案内"] },
  { icon: "message", title: "3. 説明・支援系", bullets: ["治療・検査説明", "入院・手続き案内", "患者支援コンテンツ", "相談メモ"] },
  { icon: "monitor", title: "4. WEB・デジタル導線系", bullets: ["WEBページ", "LP・特設ページ", "WEBスライド", "SNS運用支援"] },
  { icon: "printer", title: "5. 院内出力系", bullets: ["A4配布物", "A3掲示物", "院内モニター表示", "配布物管理"] },
  { icon: "presentation", title: "6. プレゼン・学術発表系", bullets: ["Figure版スライド", "漫画版スライド", "学会ポスター", "発表原稿"] },
];

const serviceSetupAreas = [
  {
    title: "思想・規定基盤",
    subtitle: "その病院らしい伝え方を、先に決める。",
    text: "理念、地域での役割、患者さんへの姿勢、職員へのメッセージを読み解き、広報・説明・案内・教育の基準を整えます。",
    bullets: ["CI規定", "VI規定", "表記ルール", "広報トーン", "説明方針", "Character & Icon Guideline"],
  },
  {
    title: "実装・記憶・管理基盤",
    subtitle: "作ったものを、残し、直し、再利用する。",
    text: "WEBスライド、テンプレート、音声、制作ログを、病院ごとに管理し、更新できる状態に整えます。",
    bullets: ["React / TSX", "GitHub", "Notion / CORE NAVI", "Hospital Profile", "出力テンプレート", "制作ログ"],
  },
];

const cockpitItems = [
  {
    title: "共通基盤を開く",
    text: "WEBスライド、A4配布物、説明資料、Hospital Profileなどの共通テンプレートを開きます。",
  },
  {
    title: "病院ごとに初期設定する",
    text: "CI / VI、表記ルール、広報トーン、説明方針、QR導線を自院仕様に整えます。",
  },
  {
    title: "現場で使いながら育てる",
    text: "投書・自由記述・委員会での反応をもとに、テンプレートや導線を継続的に改善します。",
  },
];

const journals = [
  {
    category: "始動宣言",
    title: "GWの宿題⑦｜病院広報工房、始動",
    text: "病院広報工房が、WEBスライドとRA-SS DEMOを入口に動き出した記録です。",
    href: "https://note.com/pr_kobo/n/n9ebe14ab817c",
  },
  {
    category: "病院広報の思想",
    title: "なぜ今、病院広報を学び直すのか",
    text: "病院広報を、病院の価値を社会の言葉で見える化する仕事として捉え直します。",
    href: "https://note.com/pr_kobo/n/n29a3d5b5f980",
  },
  {
    category: "広報OSの背景",
    title: "AIと一緒に考え続けるための「専用OS」",
    text: "AIと考え続けるための仕組みが、広報OSの考え方につながっています。",
    href: "https://note.com/pr_kobo/n/n7dc9a2e1877e",
  },
];

const heroFlow = [
  { label: "届いている声", text: "投書・アンケート・職員の気づき" },
  { label: "読み解く", text: "背景・出来事・不安・不足" },
  { label: "扱える知見", text: "広報・説明・案内・教育へ" },
];

const flagshipLinks = [
  {
    title: "WEBスライド型APP",
    subtitle: "広報OSの考え方を共有する",
    items: ["漫画版", "Figure版", "Hybrid版", "音声ガイド"],
    buttonLabel: "WEBスライドを見る",
    href: "/slides",
  },
  {
    title: "RA-SS DEMO",
    subtitle: "自由記述を知見化する",
    items: ["自由記述入力", "構造化", "確認リスト", "匿名集計"],
    buttonLabel: "DEMOを試す",
    href: "/demo-intro",
  },
  {
    title: "CORE NAVI",
    subtitle: "広報OSの操縦席",
    status: "近日公開予定｜学会後に公開予定",
    items: ["思想・規定の記録", "制作ログ", "Asset管理", "次アクション整理"],
    buttonLabel: "近日公開予定",
  },
];

const evidenceItems = [
  { value: "対象", label: "自由記述302件", text: "患者さん・ご家族から届いた自由記述を、改善に使える知見へ変換する対象として扱う。" },
  { value: "CASE", label: "具体的な記述を読み解く", text: "表面の苦情・感謝だけでなく、背景、出来事、不安、見通しの不足を読み取る。" },
  { value: "集計", label: "傾向として共有する", text: "個別の声を匿名化・集計し、委員会や現場で共有できる改善データとして整理する。" },
];

const evidenceFeedback = ["CASEを具体的に知りたい", "集計結果はどうなっているのか"];

const processSteps = [
  { title: "1. 共通テンプレートを試す", text: "WEBスライド、RA-SS DEMO、A4テンプレートで入口をつくる。" },
  { title: "2. 病院ごとに初期設定する", text: "CI / VI、表記ルール、QR導線、患者向け・職員向けの分岐を整える。" },
  { title: "3. 現場で使いながら改善する", text: "広報誌、説明資料、院内掲示、学術発表へ継続的に展開する。" },
];

const ctaItems = [
  { title: "自由記述分析を試す", role: "RA-SS DEMOで、声を構造化する流れを確認する。", href: "/demo-intro", buttonLabel: "RA-SS DEMOを試す" },
  { title: "WEBスライドを見る", role: "学会前の共有資料として、WEBスライドの見え方を確認する。", href: "/slides", buttonLabel: "WEBスライドを見る" },
  { title: "院内広報物を整理する", role: "掲示物・配布物・説明資料を、広報OSの入口として見直す。", href: "/contact", buttonLabel: "相談の入口を確認する" },
];
const deprecatedOsLabel = ["制", "作", "OS"].join("");

const selfTests = [
  {
    name: "nav has expected primary sections",
    pass:
      navItems.some((item) => item.label === "広報OS") &&
      navItems.some((item) => item.label === "CORE NAVI") &&
      navItems.some((item) => item.label === "初期設定") &&
      navItems.some((item) => item.label === "提供領域") &&
      navItems.some((item) => item.label === "実証"),
  },
  {
    name: "service area count is six",
    pass: serviceAreas.length === 6,
  },
  {
    name: "role count is four",
    pass: roles.length === 4,
  },
  {
    name: "setup area count is two",
    pass: serviceSetupAreas.length === 2 && serviceSetupAreas.every((area) => area.title && area.subtitle && area.text && area.bullets.length >= 1),
  },
  {
    name: "cockpit flow count is three",
    pass: cockpitItems.length === 3 && cockpitItems.every((item) => item.title && item.text),
  },
  {
    name: "all content uses 広報OS wording",
    pass: !JSON.stringify({ navItems, problems, roles, serviceAreas, serviceSetupAreas, cockpitItems, journals, heroFlow, flagshipLinks }).includes(deprecatedOsLabel),
  },
];

export function validateHospitalKouhouWireframe() {
  return selfTests;
}

function LocalIcon({ name, className = "h-6 w-6 text-slate-700" }: { name: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "users":
      return (
        <svg className={className} {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3.5 18c.7-2.3 2.8-4 5.5-4s4.8 1.7 5.5 4" />
          <path d="M14 18c.6-1.5 2-2.6 3.8-2.9" />
        </svg>
      );
    case "clipboard":
      return (
        <svg className={className} {...common}>
          <rect x="6" y="4" width="12" height="16" rx="2" />
          <path d="M9 4.5h6v2H9z" />
          <path d="M9 10h6M9 14h6" />
        </svg>
      );
    case "file":
      return (
        <svg className={className} {...common}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4M9 12h6M9 16h6" />
        </svg>
      );
    case "route":
      return (
        <svg className={className} {...common}>
          <circle cx="6" cy="6" r="2.2" />
          <circle cx="18" cy="18" r="2.2" />
          <path d="M8.2 6h4.6c1.8 0 3.2 1.4 3.2 3.2v2.4c0 1.8-1.4 3.2-3.2 3.2H10" />
        </svg>
      );
    case "message":
      return (
        <svg className={className} {...common}>
          <path d="M4 5h16v10H9l-5 4z" />
        </svg>
      );
    case "target":
      return (
        <svg className={className} {...common}>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 5v2M12 17v2M5 12h2M17 12h2" />
        </svg>
      );
    case "book":
      return (
        <svg className={className} {...common}>
          <path d="M4 5h7a3 3 0 0 1 3 3v11H7a3 3 0 0 0-3 3z" />
          <path d="M20 5h-7a3 3 0 0 0-3 3v11h7a3 3 0 0 1 3 3z" />
        </svg>
      );
    case "cloud":
      return (
        <svg className={className} {...common}>
          <path d="M7.5 18h9a4 4 0 0 0 .7-7.9A5.2 5.2 0 0 0 7 9.3 3.5 3.5 0 0 0 7.5 18z" />
        </svg>
      );
    case "code":
      return (
        <svg className={className} {...common}>
          <path d="m9 8-4 4 4 4M15 8l4 4-4 4M13 6l-2 12" />
        </svg>
      );
    case "megaphone":
      return (
        <svg className={className} {...common}>
          <path d="M4 12v-2l10-4v12L4 14zM14 10h3a2 2 0 0 1 0 4h-3" />
        </svg>
      );
    case "monitor":
      return (
        <svg className={className} {...common}>
          <rect x="3" y="5" width="18" height="12" rx="2" />
          <path d="M9 20h6M12 17v3" />
        </svg>
      );
    case "printer":
      return (
        <svg className={className} {...common}>
          <rect x="7" y="3" width="10" height="5" />
          <rect x="5" y="9" width="14" height="7" rx="1.5" />
          <path d="M7 14h10v7H7z" />
        </svg>
      );
    case "presentation":
      return (
        <svg className={className} {...common}>
          <path d="M4 5h16v10H4zM12 15v5M8 20h8" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );
    default:
      return (
        <svg className={className} {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

function SelfTestPanel() {
  return (
    <section className="mx-auto mt-12 max-w-6xl rounded-lg border border-slate-300 bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-900">SelfTestPanel</h3>
      <div className="mt-3 space-y-2 text-sm">
        {selfTests.map((test) => (
          <div key={test.name} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
            <span className="text-slate-700">{test.name}</span>
            <span className={test.pass ? "font-semibold text-emerald-700" : "font-semibold text-rose-700"}>
              {test.pass ? "PASS" : "FAIL"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-slate-950 md:text-4xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{text}</p>
    </div>
  );
}

export default function KouhouOsDevPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-[#f7f8f5]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#hero" className="font-bold tracking-wide text-slate-950">
            病院広報工房
          </a>
          <nav className="hidden gap-5 text-sm lg:flex">
            {navItems.map((item) => (
              <a key={item.label} className="text-slate-600 hover:text-slate-950" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <a className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-950" href="/slides">
              WEBスライド
            </a>
            <a className="rounded-md bg-slate-950 px-3 py-2 text-xs font-semibold text-white" href="/demo-intro">
              RA-SS DEMO
            </a>
          </div>
        </div>
      </header>

      <section id="hero" className="scroll-mt-20 border-b border-slate-200 bg-[#f6f4ef]">
        <div className="mx-auto grid min-h-[76vh] max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">1. Hero｜Hospital Kouhou Kobo</p>
            <h1 className="mt-5 max-w-[42rem] text-4xl font-bold leading-[1.12] text-slate-950 md:text-5xl lg:text-6xl">
              <span className="block">病院広報を、</span>
              <span className="block">伝える広報から、</span>
              <span className="block">
                <span className="whitespace-nowrap">理解と関係を整える</span>
                <span className="block md:inline">広報へ。</span>
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 md:text-lg md:leading-9">
              <span className="block">届いている声を、</span>
              <span className="block">扱える知見に変える。</span>
              <span className="mt-2 block">病院広報工房は、</span>
              <span className="block">患者さん・ご家族・職員の声を、</span>
              <span className="block">広報・説明・案内・教育に接続する</span>
              <span className="block">広報OSです。</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white" href="#about">
                病院広報工房とは
              </a>
              <a className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950" href="/slides">
                WEBスライドを見る
              </a>
            </div>
            <div className="mt-5 max-w-2xl rounded-lg border border-slate-200 bg-white/70 p-4">
              <p className="text-sm font-semibold leading-7 text-slate-700">
                まずは、考え方を見る・自由記述分析を試す・相談するところから始められます。
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:border-cyan-300" href="/slides">
                  見る：WEBスライド
                </a>
                <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:border-cyan-300" href="/demo-intro">
                  試す：RA-SS DEMO
                </a>
                <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:border-cyan-300" href="/contact">
                  相談する：病院広報工房
                </a>
              </div>
            </div>
          </div>
          <div className="border border-slate-300 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <p className="text-sm font-semibold text-slate-800">Official site wireframe</p>
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
                DEV
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {heroFlow.map((item, index) => (
                <div key={item.label} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-[#f7f8f5] text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="border-l-2 border-slate-200 pl-4">
                    <p className="text-base font-bold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 grid grid-cols-3 gap-2 border-t border-slate-200 pt-5 text-center text-xs font-semibold text-slate-600">
              <span>広報</span>
              <span>説明</span>
              <span>案内</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 border-b border-slate-200 py-16">
        <SectionTitle
          eyebrow="2. とは"
          title={
            <>
              <span className="block">病院広報は、伝える仕事から、</span>
              <span className="block">現場の理解を整える仕事へ。</span>
            </>
          }
          text="広報物、説明資料、院内掲示、WEB導線、自由記述。ばらばらに届いている情報を読み解き、病院ごとのCI / VIに沿って継続的に展開できる形へ整えます。"
        />
        <div className="mx-auto mt-10 max-w-6xl px-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">3. 課題</p>
        </div>
        <div id="problem" className="mx-auto mt-4 grid max-w-6xl scroll-mt-20 gap-4 px-5 md:grid-cols-5">
          {problems.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <LocalIcon name={item.icon} className="h-7 w-7 text-cyan-800" />
              <h3 className="mt-5 text-base font-bold leading-6">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="kouhou-os" className="scroll-mt-20 border-b border-slate-200 bg-white py-16">
        <SectionTitle
          eyebrow="4. 広報OS"
          title={
            <>
              <span className="block">COREの経験知 ×</span>
              <span className="block">GPT支援レイヤー</span>
            </>
          }
          text="広報OSは、CORE（黒江仁）の病院広報経験を中心に、GPTを役割別に使い分けるAI協働レイヤーです。NAVIは構造化、SORAは翻訳、CODEXは実装を支援し、最終判断はCOREが行います。"
        />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-4">
          {roles.map((role) => (
            <article key={role.name} className="rounded-lg border border-slate-200 bg-[#f7f8f5] p-5">
              <LocalIcon name={role.icon} className="h-7 w-7 text-slate-900" />
              <p className="mt-5 text-xl font-black tracking-wide">{role.name}</p>
              <p className="mt-1 text-sm font-semibold text-cyan-800">{role.label}</p>
              <p className="mt-3 inline-flex rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600">
                {role.layer}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{role.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cockpit" className="scroll-mt-20 border-b border-slate-200 bg-[#f7f8f5] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">5. 操縦席</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-slate-950 md:text-4xl">CORE NAVI｜広報OSの操縦席</h2>
          <p className="mt-3 max-w-3xl text-xl font-bold leading-8 text-slate-900">納品物ではなく、現場と一緒に動かす仕組み。</p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            CORE NAVIは、病院ごとの広報OSを操作し、記録し、改善していくための操縦席です。CORE（黒江仁）の経験知を起点に、NAVI・SORA・CODEXというGPT支援レイヤーを使い分け、病院側の担当者と一緒に、広報・説明・案内・教育の仕組みを育てます。
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-3">
          {cockpitItems.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="setup" className="scroll-mt-20 border-b border-slate-200 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">6. 初期設定</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-slate-950 md:text-4xl">広報OS 初期設定</h2>
          <p className="mt-3 max-w-3xl text-xl font-bold leading-8 text-slate-900">病院ごとの広報OSを、最初に整える。</p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            広報物を作る前に、病院ごとの思想・見た目・運用基盤を整えます。これにより、広報・説明・案内・教育の出力物を、継続的に再利用・更新できる状態にします。
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-2">
          {serviceSetupAreas.map((area) => (
            <article key={area.title} className="rounded-lg border border-cyan-100 bg-cyan-50 p-5">
              <h3 className="font-bold text-slate-950">{area.title}</h3>
              <p className="mt-2 text-sm font-semibold text-cyan-900">{area.subtitle}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{area.text}</p>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                {area.bullets.map((bullet) => (
                  <li key={bullet}>・{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="scroll-mt-20 border-b border-slate-200 py-16">
        <SectionTitle
          eyebrow="7. 提供領域"
          title={
            <>
              <span className="block">広報・案内・説明支援から、</span>
              <span className="block">WEB導線と学術発表までを一つの体系で扱う。</span>
            </>
          }
          text="病院で日々生まれる出力物を6つの領域に整理し、媒体ごとの分断を減らしながら、現場で運用しやすいテンプレートへ展開します。"
        />
        <div className="mx-auto mt-8 max-w-6xl px-5">
          <h3 className="text-xl font-bold text-slate-950">出力テンプレート体系</h3>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
            整えた基盤から、必要な広報・説明・案内・教育の出力物へ展開します。
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-3">
          {serviceAreas.map((area) => (
            <article key={area.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-3">
                <LocalIcon name={area.icon} className="h-6 w-6 text-cyan-800" />
                <h3 className="font-bold">{area.title}</h3>
              </div>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
                {area.bullets.map((bullet) => (
                  <li key={bullet}>・{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="flagship" className="scroll-mt-20 border-b border-slate-200 bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">8. 公開プロトタイプ</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              <span className="block">Flagship｜</span>
              <span className="block">広報OSの公開プロトタイプ</span>
            </h2>
            <p className="mt-5 max-w-4xl leading-8 text-slate-300">
              WEBスライド型APP、RA-SS DEMO、CORE NAVIは、病院広報工房が目指す広報OSを実際に触れる形にした公開プロトタイプです。完成品を納品するための見本ではなく、病院ごとの思想・規定・運用に合わせて共同開発していくための出発点です。
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {flagshipLinks.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/15 bg-white/8 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  {item.status ? (
                    <span className="rounded-md border border-cyan-300/40 px-2 py-1 text-xs font-semibold text-cyan-100">{item.status}</span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm font-semibold text-cyan-200">{item.subtitle}</p>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300">
                  {item.items.map((entry) => (
                    <li key={entry}>・{entry}</li>
                  ))}
                </ul>
                {item.href ? (
                  <a className="mt-5 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950" href={item.href}>
                    {item.buttonLabel}
                  </a>
                ) : (
                  <span className="mt-5 inline-flex rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-slate-400">
                    {item.buttonLabel}
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="evidence" className="scroll-mt-20 border-b border-slate-200 bg-white py-16">
        <SectionTitle
          eyebrow="9. 実証"
          title={
            <>
              <span className="block">実証｜自由記述302件を、</span>
              <span className="block">改善に使える知見へ</span>
            </>
          }
          text="学会前の実証では、自由記述を単なる感謝・苦情・要望として終わらせず、具体的なCASEと集計結果の両面から、現場で共有できる改善データへ整えることを示します。"
        />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-3">
          {evidenceItems.map((item) => (
            <article key={item.label} className="rounded-lg border border-slate-200 bg-[#f7f8f5] p-6">
              <p className="text-3xl font-black text-slate-950">{item.value}</p>
              <h3 className="mt-4 font-bold">{item.label}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-6 max-w-6xl px-5">
          <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-5">
            <p className="text-sm font-bold text-cyan-900">CS委員会で出た反応</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {evidenceFeedback.map((item) => (
                <span key={item} className="rounded-md border border-cyan-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800">
                  「{item}」
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 py-16">
        <SectionTitle
          eyebrow="Process"
          title={
            <>
              <span className="block">小さく試し、病院ごとに整え、</span>
              <span className="block">現場で使いながら育てる。</span>
            </>
          }
          text="最初から大きなシステムを入れるのではなく、すでに届いている声と既存の広報物から始め、病院ごとの運用に合わせて広報OSを整えます。"
        />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-3">
          {processSteps.map((step) => (
            <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="journal" className="scroll-mt-20 border-b border-slate-200 bg-white py-16">
        <SectionTitle
          eyebrow="10. note / Journal"
          title={
            <>
              <span className="block">noteでは、</span>
              <span className="block">広報OSを育てる記録を公開していく。</span>
            </>
          }
          text="思想、開発過程、学会準備、現場で得た問いを、病院広報工房の言葉として積み上げます。"
        />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-3">
          {journals.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-[#f7f8f5] p-5">
              <p className="text-xs font-bold tracking-[0.16em] text-cyan-700">{item.category}</p>
              <h3 className="font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              <a className="mt-4 inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white" href={item.href} target="_blank" rel="noreferrer">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                  <img src="/assets/brand/note-icon.svg" alt="" className="h-3.5 w-3.5" />
                </span>
                noteで読む →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="cta" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 border border-slate-300 bg-white p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">11. CTA</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950">
                <span className="block">まずは、</span>
                <span className="block">小さく試してみませんか。</span>
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                自由記述分析、WEBスライド型説明資料、院内広報物の整理から、病院ごとの広報OSを一緒に組み立てます。
              </p>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                まずは、考え方を見る・体験する・相談するところから始められます。
              </p>
            </div>
            <div className="grid gap-3">
              {ctaItems.map((item) => (
                <article key={item.title} className="rounded-md border border-slate-200 bg-[#f7f8f5] px-4 py-4 text-sm text-slate-950">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 leading-6 text-slate-600">{item.role}</p>
                  <a className="mt-4 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white" href={item.href}>
                    {item.buttonLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
        {import.meta.env.DEV && <SelfTestPanel />}
      </section>
    </main>
  );
}
