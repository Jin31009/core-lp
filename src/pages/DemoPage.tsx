import { useEffect, useRef, useState } from "react";
import SidePanel from "../components/demo/SidePanel";
import InputSection from "../components/demo/InputSection";
import AnalysisSection from "../components/demo/AnalysisSection";
import ResponseSection from "../components/demo/ResponseSection";
import CaseReportSection from "../components/demo/CaseReportSection";
import DBSampleSection from "../components/demo/DBSampleSection";

type DemoPageProps = {
  setPage: (page: string) => void;
};

type AcexItem = {
  key: string;
  label: string;
  title: string;
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

  const currentStep = showDbSample
    ? 5
    : showCaseReport
    ? 4
    : showResponse
    ? 3
    : result
    ? 2
    : 1;

  const sectionShell =
    "overflow-hidden rounded-[16px] border border-stone-200 bg-[#fbfaf7] shadow-[0_6px_24px_rgba(15,23,42,0.04)]";

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10">
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
          <main className="space-y-10">
            <InputSection
              text={text}
              onTextChange={setText}
              onCheckState={() => {
                setResult(true);
                setShowResponse(false);
                setShowCaseReport(false);
                setShowDbSample(false);
              }}
              onClear={() => {
                setText("");
                setResult(false);
                setShowResponse(false);
                setShowCaseReport(false);
                setShowDbSample(false);
              }}
            />

            {result && (
              <AnalysisSection
                delta={delta}
                eLevel={eLevel}
                text={text}
                judgment={judgment}
                onNext={() => setShowResponse(true)}
              />
            )}

            {result && showResponse && (
              <ResponseSection
                actionSummary={actionSummary}
                acexItems={acexItems}
                flowItems={flowItems}
                ngItems={ngItems}
                onNext={() => setShowCaseReport(true)}
              />
            )}

            {result && showCaseReport && (
              <CaseReportSection
                delta={delta}
                eLevel={eLevel}
                text={text}
                judgment={judgment}
                actionSummary={actionSummary}
                onNext={() => setShowDbSample(true)}
              />
            )}

            {result && showDbSample && (
              <DBSampleSection
                delta={delta}
                eLevel={eLevel}
                text={text}
                judgment={judgment}
                actionSummary={actionSummary}
                innerRef={dbSampleRef}
              />
            )}
          </main>

          <SidePanel currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
}