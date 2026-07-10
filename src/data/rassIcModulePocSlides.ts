import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  ClipboardList,
  FileQuestion,
  FileText,
  HeartHandshake,
  Layers3,
  MessageSquareText,
  Network,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Tablet,
  UsersRound,
} from "lucide-react";

export type SlideLink = {
  href: string;
  label: string;
};

export type SlideCard = {
  title: string;
  body: string;
  icon?: LucideIcon;
};

export type SlideContent = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  body?: string;
  note?: string;
  cards?: SlideCard[];
  bullets?: string[];
  flow?: string[];
  timeline?: {
    month: string;
    body: string;
  }[];
  links?: SlideLink[];
};

export const slideLinks = [
  {
    href: "/rass-ic-module-poc",
    label: "PoC設計を見る",
  },
  {
    href: "/poc-orthopedic-support",
    label: "大腿骨頸部骨折PoCデモを見る",
  },
];

export const pocSlides: SlideContent[] = [
  {
    id: "cover",
    eyebrow: "Slide 1",
    title: "疾患別IC支援モジュール PoC提案",
    lead: "患者・家族の声を、説明支援と病院広報へつなぐ",
    note: "診療判断を代替せず、医療者確認・監修を前提とした説明支援PoCです。",
    links: slideLinks,
  },
  {
    id: "problem",
    eyebrow: "Slide 2",
    title: "患者説明に関わる情報が、現場で分断されている",
    body:
      "説明資料、Web、FAQ、広報誌、退院支援資料、地域連携資料が別々に作られることで、説明内容のばらつき、更新負担、患者・家族の理解不足、職員の説明負担が生じやすい。",
    cards: [
      {
        title: "媒体が分かれる",
        body: "説明資料、Web、FAQ、広報誌が別々に更新される。",
        icon: FileText,
      },
      {
        title: "説明が揺れる",
        body: "患者・家族があとから見返す情報に差が出やすい。",
        icon: MessageSquareText,
      },
      {
        title: "現場負担が増える",
        body: "説明不足や不安が、職員への再説明負担として繰り返し戻りやすくなる。",
        icon: UsersRound,
      },
    ],
  },
  {
    id: "previous-findings",
    eyebrow: "Slide 3",
    title: "前回の発表から得た知見を、次のPoCに応用する",
    body:
      "前回の学会発表では、患者・家族の自由記述をAIで自動判断するのではなく、医療者が読み取りやすい形に一次整理する試みを行いました。そこで見えたのは、不安、理解のつまずき、説明課題、安心材料が、患者・家族の声の中に含まれているということです。今回PoCでは、その知見を疾患別IC支援モジュールへ展開します。",
    flow: [
      "前回発表：患者・家族の自由記述を一次整理",
      "得られた知見：不安／理解のつまずき／説明課題／安心材料",
      "今回PoC：疾患別IC支援モジュールへ展開",
    ],
  },
  {
    id: "rass",
    eyebrow: "Slide 4",
    title: "患者・家族の声を、医療者が確認しやすい形に整理する",
    body:
      "現場で集められた患者・家族の声や相談内容を、匿名化・一般化したうえで、不安、理解のつまずき、説明課題、安心や納得につながった要素へ整理します。",
    note: "RA-SSは、患者・家族の声を診断・判定するものではなく、説明支援に使える観点へ分ける一次整理の仕組みです。",
    cards: [
      {
        title: "匿名化・一般化",
        body: "個人情報を含まない形で、複数の声を説明改善の素材にする。",
        icon: ShieldCheck,
      },
      {
        title: "一次整理する",
        body: "不安、理解のつまずき、説明課題、安心材料へ分類する。",
        icon: ClipboardCheck,
      },
      {
        title: "医療者確認・監修",
        body: "表現や監修観点を医療者が確認しやすい単位に整える。",
        icon: Stethoscope,
      },
    ],
  },
  {
    id: "concept",
    eyebrow: "Slide 5",
    title: "メディアを先に作るのではなく、説明支援の共通単位を整える",
    body:
      "疾患や診療テーマごとに、患者・家族の不安、理解のつまずき、説明課題を整理し、基幹コンテンツと接続メディアへ展開できる共通単位を整える。",
    flow: ["患者・家族の声", "説明課題の整理", "共通単位", "基幹コンテンツ化・接続メディアへの展開"],
  },
  {
    id: "module",
    eyebrow: "Slide 6",
    title: "疾患別IC支援モジュール＝統合コンテンツ設計単位",
    body:
      "疾患別IC支援モジュールは、患者・家族の声をRA-SSで一次整理し、疾患や診療テーマごとの基幹コンテンツへ落とし込み、さらに接続メディアへ展開するための統合コンテンツ設計単位です。",
    note:
      "WordPress記事、FAQ、PDF、QR付きA4資料は基幹コンテンツ群です。LINE入口は情報本体ではなく、基幹コンテンツへ戻る入口として扱います。",
    cards: [
      {
        title: "患者・家族の声",
        body: "匿名化・一般化した不安、疑問、相談内容、現場の違和感。",
        icon: HeartHandshake,
      },
      {
        title: "RA-SS一次整理",
        body: "患者・家族の声を、説明支援に使える観点へ一次整理する。",
        icon: ClipboardList,
      },
      {
        title: "疾患別IC支援モジュール",
        body: "統合コンテンツ設計単位。基幹コンテンツと接続メディアへの展開を設計する。",
        icon: FileQuestion,
      },
      {
        title: "基幹コンテンツ",
        body: "WordPress記事、FAQ、PDF、QR付きA4資料。患者・家族が見返し、職員が説明に使う情報の本体群です。",
        icon: Layers3,
      },
      {
        title: "接続メディア",
        body: "LINE入口、タブレット説明画面、広報誌、PPT。",
        icon: Network,
      },
    ],
  },
  {
    id: "module-components",
    eyebrow: "Slide 7",
    title: "疾患別IC支援モジュール v0.1 の構成要素",
    body:
      "v0.1では、完成版を目指すのではなく、1疾患・1テーマで、患者・家族の声から基幹コンテンツ、接続メディアまでの流れを確認します。",
    cards: [
      {
        title: "対象テーマ",
        body: "1疾患・1診療テーマに絞る。",
        icon: Layers3,
      },
      {
        title: "患者・家族の声",
        body: "匿名化・一般化した不安・疑問・相談内容。",
        icon: HeartHandshake,
      },
      {
        title: "RA-SS一次整理",
        body: "不安、理解のつまずき、説明課題、安心材料へ整理する。",
        icon: ClipboardList,
      },
      {
        title: "疾患別IC支援モジュール",
        body: "統合コンテンツ設計単位。",
        icon: FileQuestion,
      },
      {
        title: "基幹コンテンツ",
        body: "WordPress記事、FAQ、PDF、QR付きA4資料。",
        icon: FileText,
      },
      {
        title: "接続メディア",
        body: "LINE入口、タブレット説明画面、広報誌、PPT。",
        icon: Network,
      },
      {
        title: "医療者確認・監修",
        body: "公開・利用前に内容と表現を確認する。",
        icon: Stethoscope,
      },
    ],
  },
  {
    id: "poc",
    eyebrow: "Slide 8",
    title: "まず1疾患・1テーマで、小さく試す",
    body:
      "患者・家族の声を匿名化・一般化し、RA-SSで一次整理し、疾患別IC支援モジュール v0.1を作成します。そのうえで、基幹コンテンツを整え、接続メディアへ展開できるかを確認します。",
    flow: [
      "患者・家族の声を匿名化・一般化",
      "RA-SS一次整理",
      "モジュール v0.1",
      "基幹コンテンツを整える",
      "接続メディアへ展開",
      "医療者確認・監修",
    ],
  },
  {
    id: "deliverables",
    eyebrow: "Slide 9",
    title: "PoCで作成する最小成果物",
    cards: [
      {
        title: "RA-SS一次整理シート",
        body: "患者・家族の声を、説明支援の視点で整理するシート。",
        icon: ClipboardList,
      },
      {
        title: "疾患別IC支援モジュール v0.1",
        body: "基幹コンテンツと接続メディアへの展開を整理する統合コンテンツ設計単位。",
        icon: Layers3,
      },
      {
        title: "基幹コンテンツ",
        body: "WordPress記事、FAQ、PDF、QR付きA4資料。",
        icon: Network,
      },
      {
        title: "接続メディア",
        body: "LINE入口、タブレット説明画面、広報誌、PPT。",
        icon: FileText,
      },
    ],
  },
  {
    id: "case",
    eyebrow: "Slide 10",
    title: "代表事例：大腿骨頸部骨折の退院前・退院後生活支援",
    body:
      "大腿骨頸部骨折の退院前支援では、退院前フェーズの確認項目を基幹コンテンツとして整理し、QR付きA4資料から患者・家族が退院後にスマホで見返せるようにします。職員は同じ基幹コンテンツをタブレットで説明に使い、現場の違和感を改善候補として戻します。",
    cards: [
      {
        title: "患者・家族",
        body: "退院後にスマホで段階別に見返す",
        icon: Smartphone,
      },
      {
        title: "職員",
        body: "タブレットで基幹コンテンツを説明に使う",
        icon: Tablet,
      },
      {
        title: "違和感",
        body: "現場メモを改善候補へ戻す",
        icon: MessageSquareText,
      },
      {
        title: "改善",
        body: "基幹コンテンツを更新し、接続メディアへ再展開する",
        icon: RefreshCw,
      },
    ],
    flow: [
      "退院前フェーズの確認項目",
      "職員タブレット説明画面",
      "QR付きA4資料",
      "退院後にスマホで見返す",
    ],
    links: [
      {
        href: "/poc-orthopedic-support",
        label: "大腿骨頸部骨折PoCデモを見る",
      },
    ],
  },
  {
    id: "loop",
    eyebrow: "Slide 11",
    title: "現場の違和感を、次のコンテンツ改善へ戻す",
    flow: [
      "患者・家族が見返す",
      "職員が説明に使う",
      "看護師の違和感",
      "RA-SS一次整理",
      "基幹コンテンツの改善",
      "接続メディアへ再展開",
    ],
    note: "違和感メモは、患者名・ID・個別症状などの個人情報を含まない形で扱います。",
  },
  {
    id: "safety",
    eyebrow: "Slide 12",
    title: "医療判断ではなく、説明支援のための構造化",
    body:
      "AIは診断・評価・判定に使わない。患者・家族の声は匿名化・一般化して扱う。公開・利用前には医療者確認・監修を前提とする。各診療科・医療機関の方針に合わせて展開する。",
    bullets: [
      "診療判断、治療方針、医療判断を代替しない",
      "患者・家族の声は匿名化・一般化して扱う",
      "公開・利用前には医療者確認・監修を行う",
      "各診療科・医療機関の方針に合わせて調整する",
    ],
  },
  {
    id: "timeline",
    eyebrow: "Slide 13",
    title: "9月は試作品、10月1日は共同開発の開始点",
    timeline: [
      {
        month: "7月",
        body: "戦略整理・PoC計画",
      },
      {
        month: "8月",
        body: "対象テーマ決定・素材確認",
      },
      {
        month: "9月",
        body: "一次整理・モジュールv0.1・広報展開例作成",
      },
      {
        month: "10月1日",
        body: "KickOff・共同開発開始・次フェーズ相談",
      },
    ],
  },
  {
    id: "request",
    eyebrow: "Slide 14",
    title: "まずは一緒に決めたい3つのこと",
    cards: [
      {
        title: "対象テーマ",
        body: "どの疾患・診療テーマから始めるのがよいか。",
        icon: Layers3,
      },
      {
        title: "監修観点",
        body: "医療者として、どの点を確認すべきか。",
        icon: Stethoscope,
      },
      {
        title: "PoC範囲",
        body: "9月プロトタイプでどこまで作るのが現実的か。",
        icon: ClipboardCheck,
      },
    ],
    note:
      "まずは1テーマに絞り、患者・家族の声を起点に、医療者が確認しやすい説明支援モジュールを共同で試作したいと考えています。",
    links: slideLinks,
  },
];
