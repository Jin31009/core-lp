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
            : "cursor-not-allowed bg-white opacity-60"
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
            isActive
              ? "text-stone-500"
              : isReached
                ? "text-stone-500"
                : "text-stone-400"
          }`}
        >
          {en}
        </p>
        <p
          className={`mt-1 text-sm font-medium ${
            isActive
              ? "text-slate-900"
              : isReached
                ? "text-slate-800"
                : "text-stone-400"
          }`}
        >
          {ja}
        </p>
      </div>
    </button>
  );
}

export default function DemoPage({ setPage }: DemoPageProps) {
  const [observationRaw, setObservationRaw] = useState("");
  const [emotion, setEmotion] = useState("");
  const [urgency, setUrgency] = useState("");
  const [contextEdited, setContextEdited] = useState("");
  const [contextRequested, setContextRequested] = useState(false);

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showCaseReport, setShowCaseReport] = useState(false);
  const [showDbSample, setShowDbSample] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);

  const [executedActions, setExecutedActions] = useState<string[]>([]);
  const [resultType, setResultType] = useState("");

  const dbSampleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showDbSample) {
      dbSampleRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showDbSample]);

  const primaryContextDraft = observationRaw
    ? "説明場面において、不安が前景化している。対応が必要な状態として整理できる。"
    : "";

  const finalContext = contextEdited.trim() || primaryContextDraft;

  const deltaValue = urgency === "緊急対応" ? 4 : urgency === "対応必要" ? 3 : 1;

  const phaseLabel =
    deltaValue === 4
      ? "e3（臨界の段階）"
      : deltaValue === 3
        ? "e2（対処の段階）"
        : "e1（予防の段階）";

  const insightDraft = "関係の緊張が高まりつつある可能性";

  const responseSummary =
    deltaValue === 4
      ? "安全を優先し慎重に対応"
      : deltaValue === 3
        ? "受け止めと確認を優先"
        : "観察を維持";

  const acexItems: AcexItem[] = [
    { key: "A", label: "A", title: "Accept", body: "受け止める" },
    { key: "C", label: "C", title: "Clarify", body: "確認する" },
    { key: "E", label: "E", title: "Explain", body: "説明する" },
    { key: "X", label: "X", title: "Assist", body: "補助する" },
  ];

  const flowItems = ["受け止める", "確認する", "説明する"];
  const ngItems = ["否定する", "急ぐ", "説明不足"];

  const currentStep = showDbSample
    ? 5
    : showCaseReport
      ? 4
      : showResponse
        ? 3
        : showAnalysis
          ? 2
          : 1;

  useEffect(() => {
    setSelectedStep(currentStep);
  }, [currentStep]);

  const sectionShell =
    "overflow-hidden rounded-[18px] border border-stone-200 bg-[#fbfaf7] shadow";

  const renderStepContent = () => {
    switch (selectedStep) {
      case 1:
        return (
          <InputSection
            text={observationRaw}
            onTextChange={(v) => {
              setObservationRaw(v);
              setContextRequested(false);
            }}
            emotion={emotion}
            onEmotionChange={setEmotion}
            urgency={urgency}
            onUrgencyChange={setUrgency}
            contextDraft={primaryContextDraft}
            contextEdited={contextEdited}
            onContextEditedChange={setContextEdited}
            contextRequested={contextRequested}
            onRequestContext={() => setContextRequested(true)}
            onCheckState={() => {
              setShowAnalysis(true);
              setTimeout(() => window.scrollTo({ top: 700, behavior: "smooth" }), 100);
            }}
            onClear={() => {
              setObservationRaw("");
              setEmotion("");
              setUrgency("");
              setContextEdited("");
              setContextRequested(false);
              setShowAnalysis(false);
              setShowResponse(false);
              setShowCaseReport(false);
              setShowDbSample(false);
              setExecutedActions([]);
              setResultType("");
              setSelectedStep(1);
            }}
          />
        );

      case 2:
        return (
          <AnalysisSection
            delta={String(deltaValue)}
            eLevel={phaseLabel}
            text={observationRaw}
            judgment={insightDraft}
            contextText={finalContext}
            onNext={() => setShowResponse(true)}
          />
        );

      case 3:
        return (
          <ResponseSection
            actionSummary={responseSummary}
            acexItems={acexItems}
            flowItems={flowItems}
            ngItems={ngItems}
            statusLabel="注意"
            statusSub="関係の揺れあり"
            statusIcon="🔥"
            statusColorClass="text-yellow-500"
            onNext={() => setShowCaseReport(true)}
          />
        );

      case 4:
        return (
          <CaseReportSection
            delta={String(deltaValue)}
            eLevel={phaseLabel}
            text={observationRaw}
            judgment={insightDraft}
            actionSummary={responseSummary}
            executedActions={executedActions}
            onExecutedActionsChange={setExecutedActions}
            resultType={resultType}
            onResultTypeChange={setResultType}
            onNext={() => setShowDbSample(true)}
          />
        );

      case 5:
        return (
          <DBSampleSection
            delta={String(deltaValue)}
            eLevel={phaseLabel}
            text={observationRaw}
            judgment={insightDraft}
            actionSummary={responseSummary}
            executedActions={executedActions}
            resultType={resultType}
            innerRef={dbSampleRef}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* HERO */}
        <div className={sectionShell}>
          <div className="px-6 py-12">
            <h1 className="text-4xl font-semibold">
              違和感を、関係の構造として読み直す。
            </h1>

            <p className="mt-4 text-stone-600">
              書く → 読む → 対応する → 記録する
            </p>

            <button
              onClick={() => setSelectedStep(1)}
              className="mt-6 rounded bg-black px-5 py-3 text-white"
            >
              はじめる
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex">
          <TabButton stepNo="01" en="Observation" ja="観察" isActive={selectedStep === 1} isReached onClick={() => setSelectedStep(1)} />
          <TabButton stepNo="02" en="Analysis" ja="分析" isActive={selectedStep === 2} isReached={currentStep >= 2} onClick={() => setSelectedStep(2)} />
          <TabButton stepNo="03" en="Response" ja="対応" isActive={selectedStep === 3} isReached={currentStep >= 3} onClick={() => setSelectedStep(3)} />
          <TabButton stepNo="04" en="Report" ja="記録" isActive={selectedStep === 4} isReached={currentStep >= 4} onClick={() => setSelectedStep(4)} />
          <TabButton stepNo="05" en="DB" ja="DB" isActive={selectedStep === 5} isReached={currentStep >= 5} onClick={() => setSelectedStep(5)} />
        </div>

        <div className="mt-8">{renderStepContent()}</div>
      </div>
    </div>
  );
}