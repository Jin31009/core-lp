import { useEffect } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileQuestion,
  FileText,
  MessageSquareText,
  Presentation,
  QrCode,
  ShieldCheck,
  Stethoscope,
  Tablet,
} from "lucide-react";

const flowItems = [
  ["患者・家族の声", "匿名化・一般化した声や相談内容を素材にする"],
  ["RA-SS一次整理", "不安、理解のつまずき、説明課題、FAQ化できる問いへ整理する"],
  ["疾患別IC支援モジュール", "疾患・診療テーマごとの統合コンテンツ設計単位にまとめる"],
  ["基幹コンテンツ", "WordPress記事、FAQ、PDF、QR付きA4資料を整える"],
  ["接続メディア", "LINE入口、タブレット説明画面、広報誌、PPTへ展開する"],
] as const;

const coreContents = [
  ["WordPress記事", "公開上の正本・基礎ページ", FileText],
  ["FAQ", "患者・家族の疑問に答える確認項目", FileQuestion],
  ["PDF", "保存・印刷・配布用の資料", FileText],
  ["QR付きA4資料", "現場配布用・アクセス導線付きの要約資料", QrCode],
] as const;

const connectedMedia = [
  ["LINE入口", "情報本体ではなく、基幹コンテンツへ戻る入口", MessageSquareText],
  ["タブレット説明画面", "職員が基幹コンテンツを説明に使うための画面", Tablet],
  ["広報誌", "基幹コンテンツを読み物化して届ける媒体", FileText],
  ["PPT", "共同開発・院内説明・合意形成のための説明媒体", Presentation],
] as const;

const safetyItems = [
  "医療判断、診断、治療方針を代替しない",
  "AIによる診断・自動評価・重症度判定として見せない",
  "患者名、ID、個別症状などの個人情報を扱わない",
  "公開・院内利用前には医療者確認・監修を前提にする",
  "まず1疾患・1テーマで小さく検証する",
] as const;

const timelineItems = [
  ["7月", "戦略整理・PoC計画・説明資料の骨子確認"],
  ["8月", "対象テーマ決定・素材確認・整理フォーマット作成"],
  ["9月", "RA-SS一次整理、疾患別IC支援モジュール v0.1、基幹コンテンツ展開例を作成"],
  ["10月1日", "KickOff。共同開発範囲、監修観点、次フェーズを相談"],
] as const;

const prototypeOutputs = [
  ["RA-SS一次整理シート", "匿名化・一般化した患者・家族の声を、説明支援の観点で整理するシート。"],
  ["疾患別IC支援モジュール v0.1", "1疾患・1テーマに絞り、不安、理解のつまずき、説明課題、FAQ化できる問いをまとめる設計単位。"],
  ["基幹コンテンツ展開例", "WordPress記事、FAQ、PDF、QR付きA4資料のどこから試すかを確認できる最小サンプル。"],
  ["接続メディアの使い方", "LINE入口、タブレット説明画面、広報誌、PPTを、情報本体ではなく接続先として整理する確認材料。"],
] as const;

const consultationItems = [
  ["対象テーマ", "どの疾患・診療テーマから始めると、患者・家族の理解支援と現場負担の軽減を確認しやすいか。"],
  ["素材の扱い", "患者・家族の声や現場の違和感を、個人情報を含まない形でどこまで扱えるか。"],
  ["監修観点", "診療判断に踏み込まない表現、院内方針との整合、公開・院内利用前の確認手順をどう置くか。"],
] as const;

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mb-6 max-w-3xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">{eyebrow}</p>
      <h2 className="text-2xl font-semibold leading-tight text-slate-950 md:text-3xl">{title}</h2>
      <p className="mt-3 text-base leading-8 text-slate-600">{body}</p>
    </div>
  );
}

function NumberBadge({ children }: { children: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-teal-700 text-sm font-semibold text-white">
      {children}
    </span>
  );
}

export default function RassIcModulePocPage() {
  useEffect(() => {
    document.title = "RA-SS × 疾患別IC支援モジュール v0.1｜PoC設計サマリー";
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.35fr_0.95fr] md:px-8 md:py-14">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800">
                PoC設計サマリー
              </span>
              <span className="rounded border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800">
                医療者確認・監修前提
              </span>
              <span className="rounded border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-900">
                2026年9月プロトタイプのたたき台
              </span>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">
              RA-SS × 疾患別IC支援モジュール v0.1
            </p>
            <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-slate-950 md:text-5xl">
              患者・家族の声を、説明支援と病院広報へつなぐPoC設計
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              このページは画面デモではなく、RA-SS一次整理、疾患別IC支援モジュール、基幹コンテンツ、接続メディア、安全性、9月プロトタイプから10月1日KickOffまでの設計を短く確認するためのサマリーです。
            </p>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-teal-700" aria-hidden="true" />
              <div>
                <h2 className="text-base font-semibold text-slate-950">診療判断ではなく、説明支援のための設計</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  本PoCは医療判断を代替するものではありません。患者・家族の声を匿名化・一般化したうえで、医療者が確認しやすい形に整理し、説明支援・患者向け情報・病院広報へ展開できるかを確認します。
                </p>
              </div>
            </div>
            <div className="mt-5 border-t border-slate-200 pt-4">
              <p className="text-sm font-semibold text-slate-700">検証範囲</p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                完成サービスではなく、1疾患・1テーマで小さく試すためのv0.1設計です。
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <SectionHeader
          eyebrow="01 Purpose"
          title="PoCの目的"
          body="完成サービスを作る前に、医療者と一緒に何を素材にし、どこまで安全に検証するかを確認するための設計ページです。"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["患者・家族の声を素材にする", "自由記述や相談内容を、個人が特定されない形に一般化し、説明改善の素材として扱います。"],
            ["医療者が確認しやすくする", "不安、理解のつまずき、説明課題、FAQ化できる問いに分け、監修しやすい単位へ整理します。"],
            ["共通単位へまとめる", "疾患別IC支援モジュールを中心に、基幹コンテンツと接続メディアへ展開できる形を確認します。"],
          ].map(([title, body], index) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center gap-3">
                <NumberBadge>{String(index + 1)}</NumberBadge>
                <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
              </div>
              <p className="text-sm leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <SectionHeader
            eyebrow="02 RA-SS"
            title="患者・家族の声を、説明支援に使える観点へ一次整理する"
            body="RA-SSは診断や判定ではありません。患者・家族の声を、医療者が確認しやすい説明支援の観点へ分ける一次整理として扱います。"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["不安", "何が不安として残っているか"],
              ["理解のつまずき", "どこで説明理解が止まりやすいか"],
              ["説明課題", "医療者が補足すべき点は何か"],
              ["FAQ化できる問い", "患者向け情報へ転用しやすい問いは何か"],
            ].map(([title, body]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <ClipboardList className="mb-4 h-6 w-6 text-teal-700" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <SectionHeader
          eyebrow="03 Module"
          title="疾患別IC支援モジュール＝統合コンテンツ設計単位"
          body="疾患別IC支援モジュールは、患者・家族の声をRA-SSで一次整理し、疾患や診療テーマごとの基幹コンテンツへ落とし込み、接続メディアへ展開するための設計単位です。"
        />
        <ol className="grid gap-3 md:grid-cols-5">
          {flowItems.map(([title, body], index) => (
            <li key={title} className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold text-teal-700">STEP {index + 1}</p>
              <h3 className="mt-2 text-base font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <SectionHeader
            eyebrow="04 Contents / Media"
            title="基幹コンテンツと接続メディアを分けて設計する"
            body="WordPress記事やFAQは情報本体を構成する基幹コンテンツです。LINE入口やタブレット説明画面は、その本体へ戻る・説明に使うための接続メディアとして扱います。"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-5">
              <h3 className="text-xl font-semibold text-slate-950">基幹コンテンツ</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">患者・家族が見返し、職員が説明に使う情報の本体群です。</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {coreContents.map(([title, body, Icon]) => (
                  <div key={title} className="rounded-lg border border-teal-100 bg-white p-4">
                    <Icon className="mb-3 h-5 w-5 text-teal-700" aria-hidden="true" />
                    <p className="font-semibold text-slate-950">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-sky-200 bg-sky-50 p-5">
              <h3 className="text-xl font-semibold text-slate-950">接続メディア</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">基幹コンテンツへ戻る、説明に使う、共有するための媒体です。</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {connectedMedia.map(([title, body, Icon]) => (
                  <div key={title} className="rounded-lg border border-sky-100 bg-white p-4">
                    <Icon className="mb-3 h-5 w-5 text-sky-700" aria-hidden="true" />
                    <p className="font-semibold text-slate-950">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm leading-7 text-slate-700">
              LINE入口は情報本体ではありません。WordPress記事、FAQ、PDF、QR付きA4資料などの基幹コンテンツへ戻る入口として扱います。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <SectionHeader
          eyebrow="05 Safety"
          title="医療安全・個人情報・医療者確認・監修"
          body="PoCの段階から、安全上の見え方を明確にし、AIによる診断や自動評価に見えない設計にします。"
        />
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-950">
              <ShieldCheck className="h-5 w-5 text-amber-700" aria-hidden="true" />
              PoC上の前提
            </h3>
            <ul className="mt-4 grid gap-3">
              {safetyItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-950">
              <Stethoscope className="h-5 w-5 text-teal-700" aria-hidden="true" />
              医療者確認・監修で確認したいこと
            </h3>
            <div className="mt-4 space-y-3">
              {[
                "表現が診療判断に踏み込んでいないか",
                "患者・家族が誤解しやすい表現がないか",
                "院内の説明方針や監修体制と矛盾しないか",
                "どの基幹コンテンツと接続メディアから試行するのが現実的か",
              ].map((item) => (
                <div key={item} className="rounded border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <SectionHeader
            eyebrow="06 Prototype / KickOff"
            title="9月プロトタイプから10月1日KickOffへ"
            body="9月は完成発表ではなく、共同開発前に議論できるたたき台を作る期間です。10月1日は、関係者と合意形成して次フェーズを始める節目です。"
          />
          <div className="grid gap-3 md:grid-cols-4">
            {timelineItems.map(([month, body]) => (
              <article key={month} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <CalendarDays className="mb-4 h-5 w-5 text-teal-700" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-slate-950">{month}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <SectionHeader
          eyebrow="07 Scope"
          title="9月プロトタイプで確認する最小範囲"
          body="9月は、完成版の制作ではなく、共同開発に入る前のたたき台です。成果物を最小限に絞り、医療者確認・監修を受けながら、どこまでPoCとして成立するかを確認します。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {prototypeOutputs.map(([title, body]) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-950">初回相談で一緒に決めたいこと</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {consultationItems.map(([title, body]) => (
              <div key={title} className="rounded border border-slate-200 bg-white p-4">
                <p className="font-semibold text-slate-950">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="grid gap-5 rounded-lg border border-teal-200 bg-white p-5 md:grid-cols-[1.1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-teal-700">Representative Demo</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-950">
              大腿骨頸部骨折PoCデモを見る
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              具体的な画面の見え方は、整形外科領域の代表事例ページで確認できます。職員タブレット、患者スマホ、看護師の違和感入力、RA-SS改善プレビュー、LINE入口、バックヤード、改善ループをデモとして表示します。
            </p>
          </div>
          <a
            href="/poc-orthopedic-support"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            大腿骨頸部骨折PoCデモを見る
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-teal-200">PoC設計サマリー</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                まずは1疾患・1テーマに絞り、患者・家族の声を起点に、医療者が確認しやすい説明支援モジュールを共同で試作します。
              </p>
            </div>
            <ArrowRight className="hidden h-6 w-6 text-teal-200 md:block" aria-hidden="true" />
          </div>
        </div>
      </section>
    </main>
  );
}
