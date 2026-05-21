import type { ReactNode } from "react";

const navItems = [
  { label: "病院広報工房", href: "/kouhou-os-dev" },
  { label: "WEBスライド", href: "/slides" },
  { label: "RA-SS DEMO", href: "/demo-intro" },
  { label: "note", href: "/kouhou-os-dev#journal" },
  { label: "相談する", href: "/contact" },
];

const problems = [
  { icon: "route", title: "HP・SNS・広報誌がバラバラ", text: "媒体ごとに情報が切れ、病院としての伝え方がそろいにくい。" },
  { icon: "users", title: "広報担当者のワンオペ", text: "担当者の頑張りに依存し、引き継ぎや改善が残りにくい。" },
  { icon: "message", title: "患者さんの声を活かせていない", text: "投書や自由記述が、共有や改善の材料になりきっていない。" },
  { icon: "clipboard", title: "採用が条件比較・紹介会社依存になっている", text: "働く理由や現場の魅力が、採用広報の言葉になっていない。" },
  { icon: "file", title: "地域連携室と広報がつながっていない", text: "連携先に伝える情報と、病院全体の発信が分かれやすい。" },
  { icon: "cloud", title: "AI活用が不安", text: "何を入れてよいか、どこまで任せてよいかの線引きが難しい。" },
  { icon: "book", title: "理念や強みが伝わる言葉になっていない", text: "大切にしていることが、患者さんや職員に届く表現になりにくい。" },
];

const roles = [
  { icon: "target", name: "CORE", label: "黒江仁（くろえ ひとし）の経験知・現場感・最終判断", layer: "Human judgement", text: "黒江仁（くろえ ひとし）の病院広報経験をもとに、現場の声を読み、問いを立て、人が確認する前提で最終判断を行う。" },
  { icon: "book", name: "NAVI", label: "構造化・設計・監査", layer: "GPT支援レイヤー", text: "GPTを構造化支援として使い、情報と導線を伝わる順序へ整理する。" },
  { icon: "cloud", name: "SORA", label: "翻訳・共感・可読性", layer: "GPT支援レイヤー", text: "GPTを翻訳支援として使い、専門情報をやさしい言葉と読みやすい表現に整える。" },
  { icon: "code", name: "CODEX", label: "実装・制御・公開", layer: "GPT支援レイヤー", text: "GPTを実装支援として使い、WEBや資料として公開できる形に組み立てる。" },
];

const kouhouDomains = [
  { icon: "message", title: "患者・家族向け広報", text: "外来、入院、検査、退院までの不安や疑問を、説明・案内・WEB導線として整えます。" },
  { icon: "users", title: "職員・院内広報", text: "院内のお知らせ、教育、委員会活動を、職員が共有しやすい言葉と形式にそろえます。" },
  { icon: "clipboard", title: "採用広報", text: "条件だけでは伝わりにくい現場の姿勢や働き方を、採用ページや説明資料に接続します。" },
  { icon: "route", title: "地域連携広報", text: "地域連携室、医療機関、自治体に向けた情報を、病院全体の広報とつなげます。" },
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
    category: "始動編",
    title: "GWの宿題",
    text: "AIと一緒に、自分の思考を作り直していく記録です。思考のOS、AI共創環境、WEBスライド、RA-SS DEMOへつながる、病院広報工房の始動編です。",
    buttonLabel: "GWの宿題を読む",
    href: "https://note.com/pr_kobo/m/mbc4b960764ef",
  },
  {
    category: "思想編",
    title: "病院広報を、もう一度定義する",
    text: "病院広報を「情報発信」だけでなく、理解と関係を整える仕事として捉え直すための連載です。広報OS、CI/VI、説明・案内・教育への接続を整理しています。",
    buttonLabel: "再定義の記録を読む",
    href: "https://note.com/pr_kobo/m/m072738cbaccd",
  },
  {
    category: "学会準備編",
    title: "64歳、学会への挑戦｜スライドの裏側",
    text: "5月27日の学会発表に向けて、患者さんの声、現場の気づき、AI協働、WEBスライド、RA-SS DEMOの背景を整理した記録です。",
    buttonLabel: "スライドの裏側を読む",
    href: "https://note.com/pr_kobo/m/m0f1275bacff7",
  },
];

const heroFlow = [
  { label: "届いている声", text: "投書・アンケート・職員の気づき" },
  { label: "読み解く", text: "背景・出来事・不安・不足" },
  { label: "扱える知見", text: "広報・説明・案内・教育へ" },
];

const conferenceEntryLinks = [
  { label: "学会発表補足を見る", href: "/kouhou-os-dev/jhm2026", primary: true },
  { label: "WEBスライドを見る", href: "/slides" },
  { label: "RA-SS DEMOを試す", href: "/demo-intro" },
];

const flagshipLinks = [
  {
    title: "理解する｜WEBスライド",
    subtitle: "病院広報工房の考え方を短く共有する",
    items: ["学会用スライド", "Figure版", "音声ガイド", "補足ページ導線"],
    buttonLabel: "WEBスライドを見る",
    href: "/slides",
  },
  {
    title: "実証する｜RA-SS DEMO",
    subtitle: "自由記述を構造として読み直す",
    items: ["自由記述入力", "構造化", "確認リスト", "匿名集計"],
    buttonLabel: "DEMOを試す",
    href: "/demo-intro",
  },
  {
    title: "相談する｜病院広報工房",
    subtitle: "一つの課題から広報の設計を見直す",
    items: ["初回相談", "広報診断", "導線整理", "院内共有"],
    buttonLabel: "初回相談・広報壁打ち",
    href: "/contact",
  },
];

const consultationMenus = [
  { title: "初回相談・広報診断", text: "HP、SNS、広報誌、院内掲示、患者さんの声などを見ながら、最初に整える課題を一緒に確認します。" },
  { title: "広報体系づくり・伴走支援", text: "部署ごとの発信や説明資料を、病院としての言葉・導線・運用にそろえていきます。" },
  { title: "AI活用・広報OS設計", text: "AIは判断を置き換えるものではなく、人が確認するための補助線として、扱い方と記録の仕組みを整えます。" },
  { title: "院内勉強会・ワークショップ", text: "広報担当者だけで抱え込まず、現場の声を共有し、言葉にしていく場づくりを支援します。" },
];

const evidenceItems = [
  {
    value: "対象",
    label: "自由記述302件",
    text: "患者さん・ご家族から届いた自由記述302件を対象にしています。",
  },
  {
    value: "CASE",
    label: "具体的な記述を読み解く",
    text: "具体的な記述から、背景・出来事・不安・見通しの不足を読み取ります。",
  },
  {
    value: "集計",
    label: "傾向として共有する",
    text: "個別の声を匿名化し、現場で共有できる傾向として整理します。",
  },
];

const evidenceLinks = [
  { label: "302件解析の補足を見る", href: "/kouhou-os-dev/jhm2026" },
];

const evidenceFeedback = ["CASEを具体的に知りたい", "集計結果はどうなっているのか"];

const processSteps = [
  { title: "1. 共通テンプレートを試す", text: "WEBスライド、RA-SS DEMO、A4テンプレートで入口をつくる。" },
  { title: "2. 病院ごとに初期設定する", text: "CI / VI、表記ルール、QR導線、患者向け・職員向けの分岐を整える。" },
  { title: "3. 現場で使いながら改善する", text: "広報誌、説明資料、院内掲示、学術発表へ継続的に展開する。" },
];

const ctaItems = [
  { title: "まず相談する", role: "HP、SNS、広報誌、患者さんの声など、一つの課題から現状を一緒に確認する。", href: "/contact", buttonLabel: "まずは一つの課題から相談する" },
  { title: "考え方を見る", role: "WEBスライドで、自由記述を改善に使える知見へ変える流れを確認する。", href: "/slides", buttonLabel: "WEBスライドを見る" },
  { title: "自由記述分析を試す", role: "RA-SS DEMOで、声を構造として読み直す流れを確認する。", href: "/demo-intro", buttonLabel: "RA-SS DEMOを試す" },
];

const faqItems = [
  {
    question: "何から相談できますか？",
    answer: "HP、SNS、広報誌、院内掲示、採用ページ、患者さんの声など、いま気になっている一つの課題から相談できます。最初に全体を大きく変える必要はありません。",
  },
  {
    question: "丸投げ制作はできますか？",
    answer: "単発の制作代行だけを目的にするのではなく、病院側の考え方や運用が残るように伴走します。必要な制作物は、その設計の一部として一緒に整えます。",
  },
  {
    question: "AIに患者情報を入れてよいですか？",
    answer: "個人情報や個票をそのまま扱う前提にはしません。AIは判断を置き換えるものではなく、人が確認するための補助線として、匿名化や確認手順を含めて設計します。",
  },
  {
    question: "小規模病院・自治体病院でも相談できますか？",
    answer: "相談できます。規模の大小よりも、担当者だけで抱え込まず、現場で続けられる広報の形に整えることを重視します。",
  },
  {
    question: "料金は決まっていますか？",
    answer: "内容や期間によって変わるため、最初に課題と優先順位を確認したうえで、必要な範囲を相談します。強い営業文句ではなく、無理のない進め方を一緒に決めます。",
  },
  {
    question: "問い合わせ後はどう進みますか？",
    answer: "まず現状の困りごとを伺い、必要に応じて既存の広報物や導線を確認します。そのうえで、最初に扱うテーマと進め方を整理します。",
  },
];
const deprecatedOsLabel = ["制", "作", "OS"].join("");

const selfTests = [
  {
    name: "nav has expected primary sections",
    pass:
      navItems.some((item) => item.label === "困りごと") &&
      navItems.some((item) => item.label === "広報領域") &&
      navItems.some((item) => item.label === "相談メニュー") &&
      navItems.some((item) => item.label === "広報OS") &&
      navItems.some((item) => item.label === "FAQ") &&
      navItems.some((item) => item.label === "実証"),
  },
  {
    name: "problem and domain counts match LP scope",
    pass: problems.length === 7 && kouhouDomains.length === 4,
  },
  {
    name: "service area count is six",
    pass: serviceAreas.length === 6 && consultationMenus.length === 4,
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
    pass: !JSON.stringify({ navItems, problems, roles, kouhouDomains, serviceAreas, serviceSetupAreas, cockpitItems, journals, heroFlow, flagshipLinks, consultationMenus, faqItems }).includes(deprecatedOsLabel),
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
  const isCoreMode =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("core") === "1";
  const coreNaviUrl = "http://localhost:5173/";

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-[#f7f8f5]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="/kouhou-os-dev" className="min-w-0 text-slate-950">
            <span className="block text-sm font-bold tracking-wide md:text-base">黒江仁｜病院広報工房</span>
            <span className="mt-1 block text-[11px] font-semibold leading-4 text-slate-500">
              病院広報を、理解と関係を整える仕組みへ
            </span>
          </a>
          <nav className="hidden gap-3 text-xs lg:flex xl:text-sm">
            {navItems.map((item) => (
              <a key={item.label} className="text-slate-600 hover:text-slate-950" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="rounded-md bg-slate-950 px-3 py-2 text-xs font-semibold text-white lg:hidden" href="/contact">
            相談する
          </a>
        </div>
      </header>

      <section id="hero" className="scroll-mt-20 border-b border-slate-200 bg-[#f6f4ef]">
        <div className="mx-auto grid min-h-[76vh] max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">1. Hero｜Hospital Kouhou Kobo</p>
            <h1 className="mt-5 max-w-[42rem] text-4xl font-bold leading-[1.12] text-slate-950 md:text-5xl lg:text-6xl">
              <span className="block">病院広報を、</span>
              <span className="block">情報発信から、</span>
              <span className="block">
                <span className="whitespace-nowrap">理解と関係を整える</span>
                <span className="block md:inline">仕組みへ。</span>
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 md:text-lg md:leading-9">
              病院広報工房は、黒江仁（くろえ ひとし）が、制作物を単発で代行するのではなく、
              患者さん・ご家族・職員・地域との関係が伝わるように、広報の考え方と運用を一緒に整える伴走型の広報設計パートナーです。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white" href="/contact">
                初回相談・広報壁打ち
              </a>
              <a className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950" href="/slides">
                WEBスライドを見る
              </a>
              <a className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950" href="#problems">
                困りごとを見る
              </a>
            </div>
            <div className="mt-5 max-w-2xl rounded-lg border border-slate-200 bg-white/70 p-4">
              <p className="text-sm font-semibold leading-7 text-slate-700">
                WEBスライド、RA-SS DEMO、noteを、実証・理解・相談の入口として整理しています。
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:border-cyan-300" href="/slides">
                  理解：WEBスライド
                </a>
                <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:border-cyan-300" href="/demo-intro">
                  実証：RA-SS DEMO
                </a>
                <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:border-cyan-300" href="#journal">
                  記録：note
                </a>
                <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:border-cyan-300" href="/contact">
                  相談：病院広報工房
                </a>
              </div>
            </div>
          </div>
          <div className="hidden border border-slate-300 bg-white p-5 shadow-sm md:block">
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

      <section id="problems" className="scroll-mt-20 border-b border-slate-200 bg-white py-16">
        <SectionTitle
          eyebrow="2. 困りごと"
          title="こんなことで困っていませんか？"
          text="広報の課題は、制作物そのものよりも、言葉・導線・担当者の負担・現場とのつながりに表れることがあります。"
        />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-[#f7f8f5] p-5">
              <LocalIcon name={item.icon} className="h-7 w-7 text-cyan-800" />
              <h3 className="mt-5 text-base font-bold leading-6">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-5">
          <a className="inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white" href="/contact">
            まずは一つの課題から相談する
          </a>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 border-b border-slate-200 py-16">
        <SectionTitle
          eyebrow="3. とは"
          title={
            <>
              <span className="block">制作代行ではなく、</span>
              <span className="block">伴走型の広報設計パートナー。</span>
            </>
          }
          text="広報物、説明資料、院内掲示、WEB導線、自由記述。ばらばらに届いている情報を読み解き、病院ごとの考え方に沿って継続的に展開できる形へ整えます。"
        />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-3">
          {[
            { title: "現状を読む", text: "HP、SNS、広報誌、院内掲示、患者さんの声を分けて見ず、関係する導線として確認します。" },
            { title: "言葉と導線を整える", text: "理念や強みを、患者さん・職員・連携先に伝わる順序と表現へ置き換えます。" },
            { title: "運用に残す", text: "担当者だけに閉じないよう、テンプレート、記録、確認手順として残します。" },
          ].map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="domains" className="scroll-mt-20 border-b border-slate-200 bg-[#f7f8f5] py-16">
        <SectionTitle
          eyebrow="4. 広報領域"
          title="病院広報工房が整える4つの広報領域"
          text="患者さん・ご家族、職員、採用候補者、地域の連携先へ向けた情報を、別々の制作物ではなく一つの広報体系として整理します。"
        />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-4">
          {kouhouDomains.map((domain) => (
            <article key={domain.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <LocalIcon name={domain.icon} className="h-7 w-7 text-cyan-800" />
              <h3 className="mt-5 text-base font-bold leading-6">{domain.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{domain.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="consultation" className="scroll-mt-20 border-b border-slate-200 bg-white py-16">
        <SectionTitle
          eyebrow="5. 相談メニュー"
          title="一つの課題から、広報の仕組みへ広げる。"
          text="最初から大きなシステムを導入するのではなく、いま困っている発信・説明・声の整理から始め、病院ごとの運用に合わせて伴走します。"
        />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-4">
          {consultationMenus.map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-[#f7f8f5] p-5">
              <h3 className="font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-5">
          <a className="inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white" href="/contact">
            初回相談・広報壁打ち
          </a>
        </div>
      </section>

      <section id="kouhou-os" className="scroll-mt-20 border-b border-slate-200 bg-white py-16">
        <SectionTitle
          eyebrow="6. 広報OS"
          title={
            <>
              <span className="block">COREの経験知 ×</span>
              <span className="block">GPT支援レイヤー</span>
            </>
          }
          text="広報OSは、COREである黒江仁（くろえ ひとし）の病院広報経験を中心に、GPTを役割別に使い分けるAI協働レイヤーです。AIは判断を置き換えるものではなく、人が確認するための補助線として使います。"
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
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">7. 操縦席</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-slate-950 md:text-4xl">CORE NAVI｜広報OSの操縦席</h2>
          <p className="mt-3 max-w-3xl text-xl font-bold leading-8 text-slate-900">納品物ではなく、現場と一緒に動かす仕組み。</p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            CORE NAVIは、病院ごとの広報OSを操作し、記録し、改善していくための操縦席です。COREである黒江仁（くろえ ひとし）の経験知を起点に、NAVI・SORA・CODEXというGPT支援レイヤーを使い分け、病院側の担当者と一緒に、広報・説明・案内・教育の仕組みを育てます。
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
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">8. 初期設定</p>
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
          eyebrow="9. 出力体系"
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
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">10. 実証・理解・相談</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              <span className="block">WEBスライド、DEMO、相談を</span>
              <span className="block">一つの流れで確認する。</span>
            </h2>
            <p className="mt-5 max-w-4xl leading-8 text-slate-300">
              WEBスライドで考え方を理解し、RA-SS DEMOで患者さんの声を構造として読み、必要に応じて病院ごとの広報設計を相談できます。プロトタイプは完成品の見本ではなく、現場に合わせて一緒に整えるための入口です。
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {flagshipLinks.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/15 bg-white/8 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold">{item.title}</h3>
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

      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-5 md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Conference / Evidence</p>
              <h2 className="mt-2 text-xl font-bold leading-8 text-slate-950 md:text-2xl">第28回日本医療マネジメント学会 発表補足</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                自由記述302件を、改善に使える知見へ。本発表では、患者さん・ご家族から寄せられた自由記述を、単なる苦情・感謝分類ではなく、関係のズレや回復可能性を確認するための構造として整理しています。
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 md:mt-0 md:justify-end">
              {conferenceEntryLinks.map((item) => (
                <a
                  key={item.href}
                  className={
                    item.primary
                      ? "rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white"
                      : "rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950"
                  }
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="evidence" className="scroll-mt-20 border-b border-slate-200 bg-white py-16">
        <SectionTitle
          eyebrow="11. 実証"
          title="実証｜自由記述302件を、改善に使える知見へ"
          text="患者さん・ご家族から届いた自由記述302件を、CASEと集計の両面から読み直しています。詳しい整理軸や集計の見方は、学会発表補足ページにまとめています。"
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
        <div className="mx-auto mt-6 flex max-w-6xl flex-wrap gap-3 px-5">
          {evidenceLinks.map((item, index) => (
            <a
              key={item.href}
              className={
                index === 0
                  ? "rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white"
                  : "rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950"
              }
              href={item.href}
            >
              {item.label}
            </a>
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
          eyebrow="12. note / Journal"
          title={
            <>
              <span className="block">noteでは、</span>
              <span className="block">病院広報工房が育っていく記録を公開しています。</span>
            </>
          }
          text="AIとの学び直し、病院広報の再定義、学会発表に向けた試作と検証を、noteマガジンとして整理しています。"
        />
        <div className="mx-auto mt-8 grid max-w-6xl items-stretch gap-4 px-5 md:grid-cols-2 lg:grid-cols-3">
          {journals.map((item) => (
            <article key={item.title} className="flex h-full min-h-[17.25rem] flex-col rounded-lg border border-slate-200 bg-[#f7f8f5] p-5">
              <p className="inline-flex w-fit rounded-md border border-cyan-200 bg-white px-2.5 py-1 text-xs font-bold tracking-[0.16em] text-cyan-700">{item.category}</p>
              <h3 className="mt-4 font-bold leading-7">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{item.text}</p>
              <a className="mt-5 inline-flex w-fit items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white" href={item.href} target="_blank" rel="noopener noreferrer">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                  <img src="/assets/brand/note-icon.svg" alt="" className="h-3.5 w-3.5" />
                </span>
                {item.buttonLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-b border-slate-200 bg-[#f7f8f5] py-16">
        <SectionTitle
          eyebrow="13. FAQ"
          title="よくある相談前の質問"
          text="まずは一つの課題からで大丈夫です。制作物を急いで増やす前に、何を整えると現場で使いやすくなるかを一緒に確認します。"
        />
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-5 md:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.question} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-950">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-5">
          <a className="inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white" href="/contact">
            まずは一つの課題から相談する
          </a>
        </div>
      </section>

      <section id="cta" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 border border-slate-300 bg-white p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">14. CTA</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-950">
                <span className="block">まずは、</span>
                <span className="block">一つの課題から相談する。</span>
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                HP、SNS、広報誌、院内掲示、採用ページ、患者さんの声。いま気になっている入口から、病院ごとの広報の言葉と導線を一緒に整えます。
              </p>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                黒江仁（くろえ ひとし）が、制作物だけでなく、現場に残る考え方と運用まで伴走します。
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

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-base font-bold tracking-wide text-slate-950">黒江仁｜病院広報工房</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            病院広報に35年以上携わってきた黒江仁が、患者さんの声、職員の気づき、病院の理念や専門性を、理解と関係を整える広報へつなぎ直すためのサイトです。
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            {navItems.map((item) => (
              <a key={item.label} className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 hover:border-cyan-300 hover:text-slate-950" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {isCoreMode ? (
        <a
          className="fixed bottom-5 left-5 z-[999] rounded-full border border-cyan-200 bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-cyan-900"
          href={coreNaviUrl}
          rel="noreferrer"
          target="_blank"
        >
          CORE専用｜CORE NAVIを開く
        </a>
      ) : null}
    </main>
  );
}
