import { useState } from "react";
import { useEffect, useRef, useState } from "react";

type DemoPageProps = {
  setPage: (page: string) => void;
};

type AcexItem = {
  key: string;
  label: string;
  title: string;
  body: string;
};

type GuideItem = {
  no: number;
  en: string;
  ja: string;
  body: string;
};

export default function DemoPage({ setPage }: DemoPageProps) {
  const [text, setText] = useState("");
  const [result, setResult] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showCaseReport, setShowCaseReport] = useState(false);
  const [showDbSample, setShowDbSample] = useState(false);

  const dbSampleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showDbSample) {
      dbSampleRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showDbSample]);

  const isAnxious = text.includes("不安");

  const judgment = isAnxious
    ? "関係の緊張が高まりつつある可能性"
    : "大きな緊張はまだ表面化していない状態";

  const actionSummary = isAnxious
    ? "まず不安の言葉を受け止め、説明不足として感じている点を確認する"
    : "現状の関わりを維持しつつ、追加の違和感が出ないかを見守る";

  const delta = isAnxious ? "3" : "1";
  const eLevel = isAnxious ? "e2（対処の段階）" : "e1（予防の段階）";

  const acexItems: AcexItem[] = isAnxious
    ? [
        { key: "A", label: "A", title: "Accept", body: "不安の言葉をそのまま受け止める" },
        { key: "C", label: "C", title: "Clarify", body: "何が足りないと感じたのかを確認する" },
        { key: "E", label: "E", title: "Explain", body: "これから何をどう説明するかを伝える" },
        { key: "X", label: "X", title: "Assist", body: "説明順の整理や確認メモを使う" },
      ]
    : [
        { key: "A", label: "A", title: "Accept", body: "現在の反応を維持しながら丁寧に観察する" },
        { key: "C", label: "C", title: "Clarify", body: "必要があれば追加で確認する" },
        { key: "E", label: "E", title: "Explain", body: "今後の流れを簡潔に共有する" },
        { key: "X", label: "X", title: "Assist", body: "特別な追加支援はせず通常対応を維持する" },
      ];

  const flowItems = isAnxious
    ? [
        "まず不安の言葉を受け止める",
        "次に不足感の中身を確認する",
        "そのうえで説明の見通しを伝える",
      ]
    : [
        "現在の反応を維持する",
        "必要時のみ追加確認する",
        "今後の流れを簡潔に共有する",
      ];

  const ngItems = isAnxious
    ? [
        "不安を軽く扱う",
        "確認せずに説明を進める",
        "急いで結論だけを返す",
      ]
    : [
        "変化がないのに過剰対応する",
        "説明を省きすぎる",
        "観察を止めてしまう",
      ];

  const steps = [
    { no: "01", ja: "観察入力", en: "Observation", active: true },
    { no: "02", ja: "確認結果", en: "Analysis", active: result },
    { no: "03", ja: "次の対応", en: "Response", active: showResponse },
    { no: "04", ja: "ケース記録", en: "Case Report", active: showCaseReport },
    { no: "05", ja: "DB見本", en: "DB Sample", active: showDbSample },
  ];

  const guideItems: GuideItem[] = [
    {
      no: 1,
      en: "Observation",
      ja: "観察入力",
      body:
        "最初に、現場で気になったことを短く記述します。ここでは結論を急がず、発言・表情・違和感・説明場面でのズレなどを、そのまま観察として置くことが大切です。",
    },
    {
      no: 2,
      en: "Analysis",
      ja: "確認結果",
      body:
        "入力した観察内容をもとに、Δ（関係緊張）と e（フェーズ）を手がかりに状態を見立てます。ここは厳密判定ではなく、いまの関係の全体像をつかむための段階です。",
    },
    {
      no: 3,
      en: "Response",
      ja: "次の対応",
      body:
        "確認結果を受けて、次に何をどう進めるかを整理します。ACE＋X で対応の中身を見て、Flow で順番を確認し、NG で避けたい行動を押さえます。",
    },
    {
      no: 4,
      en: "Case Report",
      ja: "ケース記録",
      body:
        "観察・見立て・対応をひとつのケースとしてまとめる段階です。後で振り返ったり、他者に共有したりするための記録の入口として位置づけています。",
    },
    {
      no: 5,
      en: "DB Sample",
      ja: "DB見本",
      body:
        "最後に、保存後にどのように並ぶかを見本として確認します。ここでは実保存ではなく、PoCでの格納イメージをテーブル形式で把握するための段階です。",
    },
  ];

  const currentStep = showDbSample
    ? 5
    : showCaseReport
    ? 4
    : showResponse
    ? 3
    : result
    ? 2
    : 1;

  const getGuideCardClass = (stepNo: number) => {
    if (stepNo === currentStep) {
      return "border-slate-400 bg-[#f2eee6] shadow-[inset_4px_0_0_0_#475569]";
    }
    if (stepNo < currentStep) {
      return "border-stone-200 bg-[#f8f5ef]";
    }
    return "border-stone-200 bg-white";
  };

  const sectionShell =
    "overflow-hidden rounded-[16px] border border-stone-200 bg-[#fbfaf7] shadow-[0_6px_24px_rgba(15,23,42,0.04)]";

  const sectionHeader =
    "bg-[#e9e5dc] border-b border-stone-200 px-6 py-5 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-3xl font-semibold tracking-[-0.01em] text-slate-900";

  const panelCard =
    "rounded-[12px] border border-stone-200 bg-white p-5";

  const softCard =
    "rounded-[12px] border border-stone-200 bg-[#f8f5ef] p-5";

  const leadClass =
    "mt-3 text-[14px] leading-8 text-stone-600";

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <div className={sectionShell}>
          <div className="border-b border-stone-200 px-6 py-4 sm:px-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500">
              Demo / Editorial View
            </p>
          </div>

          <div className="px-6 py-10 sm:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] tracking-[0.08em] text-stone-600">
                面談用デモ
              </span>
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] tracking-[0.08em] text-stone-600">
                Prototype
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.22] tracking-[-0.02em] text-slate-900 sm:text-5xl">
              観察内容から、関係の状態と
              <br className="hidden sm:block" />
              次の対応を確認する。
            </h1>

            <p className="mt-6 max-w-3xl text-[15px] leading-9 text-stone-600">
              Observation から Analysis、Response、Case Report、DB Sample までを、
              ひとつの流れとして確認するデモです。構造を見せながら、
              現場での読み取りと対応の接続を試作しています。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setPage("top")}
                className="rounded-[10px] border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50"
              >
                ← TOPへ戻る
              </button>
            </div>
          </div>
        </div>

        {/* Step Breadcrumb */}
        <div className="mt-6 overflow-hidden rounded-[14px] border border-stone-200 bg-[#fbfaf7] shadow-[0_4px_16px_rgba(15,23,42,0.03)]">
          <div className="flex flex-wrap items-stretch">
            {steps.map((step, index) => (
              <div
                key={step.no}
                className={`flex min-w-[180px] flex-1 items-center gap-3 px-4 py-4 ${
                  index !== steps.length - 1 ? "border-r border-stone-200" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold ${
                    step.active
                      ? "border-slate-700 bg-slate-700 text-white"
                      : "border-stone-300 bg-white text-stone-400"
                  }`}
                >
                  {step.no}
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-[11px] uppercase tracking-[0.18em] ${
                      step.active ? "text-stone-500" : "text-stone-400"
                    }`}
                  >
                    {step.en}
                  </p>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      step.active ? "text-slate-900" : "text-stone-400"
                    }`}
                  >
                    {step.ja}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.45fr_0.55fr]">
          {/* Main */}
          <main className="space-y-10">
            {/* Step 1 */}
            <section className={sectionShell}>
              <div className={sectionHeader}>
                <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                  Step 01 / Observation
                </p>
                <h2 className={sectionTitleClass}>観察内容を入力</h2>
                <p className={leadClass}>
                  ここでは、まず気になったことを短く記述します。評価や判断より前に、
                  観察を言葉にして置く段階です。
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className={softCard}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                    Observation
                  </p>
                  <p className="mt-3 text-[15px] leading-9 text-stone-600">
                    患者の発言、表情、説明場面での違和感、やり取りのズレなどを入力します。
                  </p>
                </div>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="例：患者が説明が足りない気がすると不安を訴えている"
                  rows={7}
                  className="mt-6 w-full rounded-[12px] border border-stone-300 bg-white p-5 text-[15px] leading-9 text-slate-800 placeholder:text-stone-400 focus:border-slate-500 focus:outline-none"
                />

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setResult(true);
                      setShowResponse(false);
                      setShowCaseReport(false);
                      setShowDbSample(false);
                    }}
                    className="rounded-[10px] bg-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    状態を確認する
                  </button>

                  <button
                    onClick={() => {
                      setText("");
                      setResult(false);
                      setShowResponse(false);
                      setShowCaseReport(false);
                      setShowDbSample(false);
                    }}
                    className="rounded-[10px] border border-stone-300 bg-white px-5 py-3 text-sm text-stone-700 transition hover:bg-stone-50"
                  >
                    入力をクリア
                  </button>
                </div>
              </div>
            </section>

            {/* Step 2 */}
            {result && (
              <section className={sectionShell}>
                <div className={sectionHeader}>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                    Step 02 / Analysis
                  </p>
                  <h2 className={sectionTitleClass}>確認結果</h2>
                  <p className={leadClass}>
                    観察内容をもとに、いまの関係の状態を簡易に整理します。
                    まずは全体像をつかむための段階です。
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className={panelCard}>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                        Delta
                      </p>
                      <p className="mt-3 text-sm font-medium text-stone-700">
                        Δ（関係緊張）
                      </p>
                      <p className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-slate-900">
                        {delta}
                      </p>
                    </div>

                    <div className={panelCard}>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                        Phase
                      </p>
                      <p className="mt-3 text-sm font-medium text-stone-700">
                        e（フェーズ）
                      </p>
                      <p className="mt-3 text-xl font-semibold tracking-[-0.01em] text-slate-900">
                        {eLevel}
                      </p>
                    </div>
                  </div>

                  <div className={`mt-5 ${panelCard}`}>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      Observation Summary
                    </p>
                    <p className="mt-3 text-sm font-medium text-stone-700">
                      観察内容
                    </p>
                    <p className="mt-3 text-[15px] leading-9 text-stone-600">
                      {text ? text : "まだ入力がありません"}
                    </p>
                  </div>

                  <div className={`mt-5 ${panelCard}`}>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      Interpretation
                    </p>
                    <p className="mt-3 text-sm font-medium text-stone-700">
                      状態の見立て
                    </p>
                    <p className="mt-3 text-[15px] leading-9 text-stone-600">
                      {judgment}
                    </p>
                  </div>

                  <div className="mt-7 border-t border-stone-200 pt-6">
                    <button
                      onClick={() => setShowResponse(true)}
                      className="rounded-[10px] bg-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      次の対応を見る
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Step 3 */}
            {result && showResponse && (
              <section className={sectionShell}>
                <div className={sectionHeader}>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                    Step 03 / Response
                  </p>
                  <h2 className={sectionTitleClass}>次の対応</h2>
                  <p className={leadClass}>
                    ここでは、確認結果を受けて何をどう進めるかを見ます。
                    ACE＋X、Flow、NG を順に確認してください。
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  <div className={panelCard}>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      Response Summary
                    </p>
                    <p className="mt-3 text-sm font-semibold text-slate-900">
                      次の対応の要約
                    </p>
                    <p className="mt-3 text-[15px] leading-9 text-stone-600">
                      {actionSummary}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {acexItems.map((item) => (
                      <div key={item.key} className={panelCard}>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                          {item.label}
                        </p>
                        <p className="mt-3 text-sm font-medium text-stone-700">
                          {item.title}
                        </p>
                        <p className="mt-3 text-[15px] leading-9 text-stone-600">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className={`mt-5 ${panelCard}`}>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      Flow
                    </p>
                    <p className="mt-3 text-sm font-medium text-stone-700">
                      行為の順番
                    </p>
                    <ol className="mt-3 space-y-2 text-[15px] leading-9 text-stone-600">
                      {flowItems.map((item, index) => (
                        <li key={index}>
                          {index + 1}. {item}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className={`mt-5 ${panelCard}`}>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      NG
                    </p>
                    <p className="mt-3 text-sm font-medium text-stone-700">
                      避けたい行動
                    </p>
                    <ul className="mt-3 space-y-2 text-[15px] leading-9 text-stone-600">
                      {ngItems.map((item, index) => (
                        <li key={index}>・{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 border-t border-stone-200 pt-6">
                    <button
                      onClick={() => setShowCaseReport(true)}
                      className="rounded-[10px] bg-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      ケース記録を見る
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Step 4 */}
            {result && showCaseReport && (
              <section className={sectionShell}>
                <div className={sectionHeader}>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                    Step 04 / Case Report
                  </p>
                  <h2 className={sectionTitleClass}>ケース記録</h2>
                  <p className={leadClass}>
                    ここでは、観察・見立て・対応をひとつのケースとして整理します。
                    後から振り返るための記録段階です。
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className={panelCard}>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                        Delta
                      </p>
                      <p className="mt-3 text-sm font-medium text-stone-700">
                        Δ（関係緊張）
                      </p>
                      <p className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-slate-900">
                        {delta}
                      </p>
                    </div>

                    <div className={panelCard}>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                        Phase
                      </p>
                      <p className="mt-3 text-sm font-medium text-stone-700">
                        e（フェーズ）
                      </p>
                      <p className="mt-3 text-xl font-semibold tracking-[-0.01em] text-slate-900">
                        {eLevel}
                      </p>
                    </div>
                  </div>

                  <div className={`mt-5 ${panelCard}`}>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      Observation Summary
                    </p>
                    <p className="mt-3 text-sm font-medium text-stone-700">
                      観察内容
                    </p>
                    <p className="mt-3 text-[15px] leading-9 text-stone-600">
                      {text ? text : "未入力"}
                    </p>
                  </div>

                  <div className={`mt-5 ${panelCard}`}>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      Interpretation
                    </p>
                    <p className="mt-3 text-sm font-medium text-stone-700">
                      状態の見立て
                    </p>
                    <p className="mt-3 text-[15px] leading-9 text-stone-600">
                      {judgment}
                    </p>
                  </div>

                  <div className={`mt-5 ${panelCard}`}>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      Response Summary
                    </p>
                    <p className="mt-3 text-sm font-medium text-stone-700">
                      次の対応（要約）
                    </p>
                    <p className="mt-3 text-[15px] leading-9 text-stone-600">
                      {actionSummary}
                    </p>
                  </div>

                  <div className="mt-7 border-t border-stone-200 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowDbSample(true)}
                      className="rounded-[10px] bg-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      DB見本に送る
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Step 5 */}
            {result && showDbSample && (
              <section className={sectionShell}>
                <div className={sectionHeader}>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                    Step 05 / DB Sample
                  </p>
                  <h2 className={sectionTitleClass}>DB見本</h2>
                  <p className={leadClass}>
                    最後に、ケースが保存された後の見本表示を確認します。
                    ここではテーブル形式で見える形を示しています。
                  </p>
                </div>

                <div className="overflow-x-auto p-6 sm:p-8">
                  <table className="min-w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 bg-white text-left">
                        <th className="px-4 py-3 font-medium text-stone-700">Case ID</th>
                        <th className="px-4 py-3 font-medium text-stone-700">Δ</th>
                        <th className="px-4 py-3 font-medium text-stone-700">e</th>
                        <th className="px-4 py-3 font-medium text-stone-700">観察内容</th>
                        <th className="px-4 py-3 font-medium text-stone-700">状態の見立て</th>
                        <th className="px-4 py-3 font-medium text-stone-700">次の対応</th>
                        <th className="px-4 py-3 font-medium text-stone-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-stone-200 align-top bg-[#fbfaf7]">
                        <td className="px-4 py-4 text-stone-700">CASE-001</td>
                        <td className="px-4 py-4 text-stone-700">{delta}</td>
                        <td className="px-4 py-4 text-stone-700">{eLevel}</td>
                        <td className="px-4 py-4 text-stone-700">
                          {text ? text : "未入力"}
                        </td>
                        <td className="px-4 py-4 text-stone-700">{judgment}</td>
                        <td className="px-4 py-4 text-stone-700">{actionSummary}</td>
                        <td className="px-4 py-4 text-stone-700">Draft / Demo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </main>

          {/* Side panel */}
          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className={sectionShell + " p-6"}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                Structure
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-slate-900">
                この画面で行っていること
              </h3>
              <p className="mt-3 text-[15px] leading-9 text-stone-600">
                観察内容を入力し、状態確認からDB見本まで、
                5段階で確認する構成です。
              </p>
            </div>

            <div className={sectionShell + " p-6"}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                Step Guide
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-slate-900">
                各ステップの見方
              </h3>

              <div className="mt-4 space-y-4">
                {guideItems.map((item) => (
                  <div
                    key={item.no}
                    className={`rounded-[12px] border p-4 transition ${getGuideCardClass(
                      item.no
                    )}`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      Step {String(item.no).padStart(2, "0")} / {item.en}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {item.ja}
                    </p>
                    <p className="mt-3 text-[14px] leading-8 text-stone-600">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}