import { useEffect, useRef, useState } from "react";
import InputSection from "../components/demo/InputSection";
import AnalysisSection from "../components/demo/AnalysisSection";
import ResponseSection from "../components/demo/ResponseSection";
import CaseReportSection from "../components/demo/CaseReportSection";
import DBSampleSection from "../components/demo/DBSampleSection";

type DemoPageProps = {
  setPage?: (page: string) => void;
};

type AcexItem = {
  key: string;
  label: string;
  title: string;
  body: string;
};

type TabButtonProps = {
  stepNo: string;
  en: string;
  ja: string;
  isActive: boolean;
  isReached: boolean;
  onClick: () => void;
};

function TabButton({
  stepNo,
  en,
  ja,
  isActive,
  isReached,
  onClick,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isReached}
      className={`flex min-w-[160px] flex-1 items-center gap-3 border-r border-stone-200 px-4 py-4 text-left transition last:border-r-0 ${
        isActive
          ? "bg-[#f2eee6]"
          : isReached
          ? "bg-[#fbfaf7] hover:bg-[#f6f2eb]"
          : "bg-white cursor-not-allowed opacity-60"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
          isActive
            ? "border-slate-700 bg-slate-700 text-white"
            : isReached
            ? "border-stone-300 bg-white text-stone-600"
            : "border-stone-200 bg-white text-stone-400"
        }`}
      >
        {stepNo}
      </div>

      <div className="min-w-0">
        <p
          className={`text-[11px] uppercase tracking-[0.18em] ${
            isActive ? "text-stone-500" : isReached ? "text-stone-500" : "text-stone-400"
          }`}
        >
          {en}
        </p>
        <p
          className={`mt-1 text-sm font-medium ${
            isActive ? "text-slate-900" : isReached ? "text-slate-800" : "text-stone-400"
          }`}
        >
          {ja}
        </p>
      </div>
    </button>
  );
}

export default function DemoPage({ setPage }: DemoPageProps) {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [urgency, setUrgency] = useState("");
  const [contextEdited, setContextEdited] = useState("");

  const [result, setResult] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showCaseReport, setShowCaseReport] = useState(false);
  const [showDbSample, setShowDbSample] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);

  const dbSampleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showDbSample) {
      dbSampleRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showDbSample]);

  const contextDraft = (() => {
    if (!text.trim()) return "";

    const scene = /説明|流れ|順番|手順/.test(text)
      ? "説明場面"
      : /検査|処置|採血/.test(text)
      ? "検査・処置場面"
      : /待つ|待機|呼ばれない/.test(text)
      ? "待機場面"
      : "接点場面";

    const emotionPart =
      emotion === "不安"
        ? "不安が前景化している"
        : emotion === "怒り"
        ? "怒りが前景化している"
        : emotion === "戸惑い"
        ? "戸惑いが生じている"
        : emotion === "悲しみ"
        ? "悲しみがにじんでいる"
        : emotion === "無反応"
        ? "反応が乏しい"
        : "感情は未確定";

    const urgencyPart =
      urgency === "緊急対応"
        ? "早い対応が必要な状態"
        : urgency === "対応必要"
        ? "対応を要する状態"
        : urgency === "経過観察"
        ? "経過を見ながら確認したい状態"
        : urgency === "不要"
        ? "大きな介入は不要な状態"
        : "必要性は未確定";

    return `${scene}において、${emotionPart}。現在は${urgencyPart}として整理できる。`;
  })();

  const contextText = contextEdited.trim() || contextDraft;

  const isAnxious = text.includes("不安") || emotion === "不安";

  const judgment =
    urgency === "緊急対応"
      ? "関係の緊張が強く、慎重な介入が必要な状態"
      : urgency === "対応必要" && emotion === "怒り"
      ? "関係の緊張が高まりつつあり、受理と説明整理が必要な状態"
      : isAnxious
      ? "関係の緊張が高まりつつある可能性"
      : "大きな緊張はまだ表面化していない状態";

  const delta =
    urgency === "緊急対応" ? "4" : urgency === "対応必要" || isAnxious ? "3" : "1";

  const eLevel =
    delta === "4" ? "e3（臨界の段階）" : delta === "3" ? "e2（対処の段階）" : "e1（予防の段階）";

  const actionSummary =
    delta === "4"
      ? "まず安全を確保し、急がず受け止めと確認を行いながら説明を組み直す"
      : delta === "3"
      ? "まず不安や怒りの言葉を受け止め、何が足りないと感じているかを確認する"
      : "現状の関わりを維持しつつ、追加の違和感が出ないかを見守る";

  const acexItems: AcexItem[] =
    delta === "4"
      ? [
          { key: "A", label: "A", title: "Accept", body: "まず受け止め、安全に関する反応を否定しない" },
          { key: "C", label: "C", title: "Clarify", body: "何が危険・不安と感じられているかを確認する" },
          { key: "E", label: "E", title: "Explain", body: "対応の順序と見通しを短く明確に伝える" },
          { key: "X", label: "X", title: "Assist", body: "必要なら役割調整や上位者介入を行う" },
        ]
      : delta === "3"
      ? [
          { key: "A", label: "A", title: "Accept", body: "不安や怒りの言葉をそのまま受け止める" },
          { key: "C", label: "C", title: "Clarify", body: "何が足りないと感じているかを確認する" },
          { key: "E", label: "E", title: "Explain", body: "これから何をどう説明するかを伝える" },
          { key: "X", label: "X", title: "Assist", body: "説明順の整理や確認メモを使う" },
        ]
      : [
          { key: "A", label: "A", title: "Accept", body: "現在の反応を維持しながら丁寧に観察する" },
          { key: "C", label: "C", title: "Clarify", body: "必要があれば追加で確認する" },
          { key: "E", label: "E", title: "Explain", body: "今後の流れを簡潔に共有する" },
          { key: "X", label: "X", title: "Assist", body: "特別な追加支援はせず通常対応を維持する" },
        ];

  const flowItems =
    delta === "4"
      ? [
          "まず安全に関わる不安や怒りを受け止める",
          "次に何が危険・不足と感じられているかを確認する",
          "そのうえで対応の順序と見通しを簡潔に伝える",
        ]
      : delta === "3"
      ? [
          "まず不安や怒りの言葉を受け止める",
          "次に不足感の中身を確認する",
          "そのうえで説明の見通しを伝える",
        ]
      : [
          "現在の反応を維持する",
          "必要時のみ追加確認する",
          "今後の流れを簡潔に共有する",
        ];

  const ngItems =
    delta === "4"
      ? [
          "不安や怒りを否定する",
          "確認せずに説明だけを進める",
          "急いで結論だけを返す",
        ]
      : delta === "3"
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

  const currentStep = showDbSample
    ? 5
    : showCaseReport
    ? 4
    : showResponse
    ? 3
    : result
    ? 2
    : 1;

  useEffect(() => {
    setSelectedStep(currentStep);
  }, [currentStep]);

  const statusLevel: "safe" | "warning" | "danger" =
    delta === "4" ? "danger" : delta === "3" ? "warning" : "safe";

  const statusConfig = {
    safe: {
      label: "安定",
      sub: "大きな緊張は見られない",
      icon: "—",
      color: "text-stone-400",
    },
    warning: {
      label: "注意",
      sub: "緊張が高まりつつある",
      icon: "🔥",
      color: "text-yellow-500",
    },
    danger: {
      label: "危険",
      sub: "関係が崩れ始めている可能性",
      icon: "🔥🔥",
      color: "text-red-500",
    },
  };

  const status = statusConfig[statusLevel];

  const sectionShell =
    "overflow-hidden rounded-[18px] border border-stone-200 bg-[#fbfaf7] shadow-[0_8px_28px_rgba(15,23,42,0.05)]";

  const renderStepContent = () => {
    switch (selectedStep) {
      case 1:
        return (
          <InputSection
            text={text}
            onTextChange={setText}
            emotion={emotion}
            onEmotionChange={setEmotion}
            urgency={urgency}
            onUrgencyChange={setUrgency}
            contextDraft={contextDraft}
            contextEdited={contextEdited}
            onContextEditedChange={setContextEdited}
            onCheckState={() => {
              setResult(true);
              setShowResponse(false);
              setShowCaseReport(false);
              setShowDbSample(false);
            }}
            onClear={() => {
              setText("");
              setEmotion("");
              setUrgency("");
              setContextEdited("");
              setResult(false);
              setShowResponse(false);
              setShowCaseReport(false);
              setShowDbSample(false);
              setSelectedStep(1);
            }}
          />
        );

      case 2:
        return result ? (
          <AnalysisSection
            delta={delta}
            eLevel={eLevel}
            text={text}
            judgment={judgment}
            contextText={contextText}
            onNext={() => setShowResponse(true)}
          />
        ) : null;

      case 3:
        return showResponse ? (
          <ResponseSection
            actionSummary={actionSummary}
            acexItems={acexItems}
            flowItems={flowItems}
            ngItems={ngItems}
            statusLabel={status.label}
            statusSub={status.sub}
            statusIcon={status.icon}
            statusColorClass={status.color}
            onNext={() => setShowCaseReport(true)}
          />
        ) : null;

      case 4:
        return showCaseReport ? (
          <CaseReportSection
            delta={delta}
            eLevel={eLevel}
            text={text}
            judgment={judgment}
            actionSummary={actionSummary}
            onNext={() => setShowDbSample(true)}
          />
        ) : null;

      case 5:
        return showDbSample ? (
          <DBSampleSection
            delta={delta}
            eLevel={eLevel}
            text={text}
            judgment={judgment}
            actionSummary={actionSummary}
            innerRef={dbSampleRef}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
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

            {setPage && (
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setPage("top")}
                  className="rounded-[10px] border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50"
                >
                  ← TOPへ戻る
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[16px] border border-stone-200 bg-[#fbfaf7] shadow-[0_4px_16px_rgba(15,23,42,0.03)]">
          <div className="flex flex-wrap items-stretch">
            <TabButton
              stepNo="01"
              en="Observation"
              ja="観察入力"
              isActive={selectedStep === 1}
              isReached={true}
              onClick={() => setSelectedStep(1)}
            />
            <TabButton
              stepNo="02"
              en="Analysis"
              ja="確認結果"
              isActive={selectedStep === 2}
              isReached={currentStep >= 2}
              onClick={() => setSelectedStep(2)}
            />
            <TabButton
              stepNo="03"
              en="Response"
              ja="次の対応"
              isActive={selectedStep === 3}
              isReached={currentStep >= 3}
              onClick={() => setSelectedStep(3)}
            />
            <TabButton
              stepNo="04"
              en="Case Report"
              ja="ケース記録"
              isActive={selectedStep === 4}
              isReached={currentStep >= 4}
              onClick={() => setSelectedStep(4)}
            />
            <TabButton
              stepNo="05"
              en="DB Sample"
              ja="DB見本"
              isActive={selectedStep === 5}
              isReached={currentStep >= 5}
              onClick={() => setSelectedStep(5)}
            />
          </div>
        </div>

        <div className="mt-8">{renderStepContent()}</div>
      </div>
    </div>
  );
}