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

type ContextDraftResponse = {
  contextDraft?: string;
  followups?: string[];
  error?: string;
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
  const [primaryContextDraft, setPrimaryContextDraft] = useState("");
  const [contextFollowups, setContextFollowups] = useState<string[]>([]);
  const [isGeneratingContext, setIsGeneratingContext] = useState(false);

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

  const finalContext = contextEdited.trim() || primaryContextDraft;

  const hasAnxiety =
    observationRaw.includes("不安") || emotion === "不安";

  const deltaValue: 1 | 3 | 4 =
    urgency === "緊急対応" ? 4 : urgency === "対応必要" || hasAnxiety ? 3 : 1;

  const phaseCode: "e1" | "e2" | "e3" =
    deltaValue === 4 ? "e3" : deltaValue === 3 ? "e2" : "e1";

  const phaseLabel =
    phaseCode === "e3"
      ? "e3（臨界の段階）"
      : phaseCode === "e2"
        ? "e2（対処の段階）"
        : "e1（予防の段階）";

  const insightDraft =
    urgency === "緊急対応"
      ? "関係の緊張が強く、慎重な介入が必要な状態"
      : urgency === "対応必要" && emotion === "怒り"
        ? "関係の緊張が高まりつつあり、受理と説明整理が必要な状態"
        : hasAnxiety
          ? "関係の緊張が高まりつつある可能性"
          : "大きな緊張はまだ表面化していない状態";

  const triggerState: "pre" | "sign" | "risk" =
    deltaValue === 4 ? "risk" : deltaValue === 3 ? "sign" : "pre";

  const responseSummary =
    deltaValue === 4
      ? "まず安全を確保し、急がず受け止めと確認を行いながら説明を組み直す"
      : deltaValue === 3
        ? "まず不安や怒りの言葉を受け止め、何が足りないと感じているかを確認する"
        : "現状の関わりを維持しつつ、追加の違和感が出ないかを見守る";

  const acexItems: AcexItem[] =
    deltaValue === 4
      ? [
          {
            key: "A",
            label: "A",
            title: "Accept",
            body: "まず受け止め、安全に関する反応を否定しない",
          },
          {
            key: "C",
            label: "C",
            title: "Clarify",
            body: "何が危険・不安と感じられているかを確認する",
          },
          {
            key: "E",
            label: "E",
            title: "Explain",
            body: "対応の順序と見通しを短く明確に伝える",
          },
          {
            key: "X",
            label: "X",
            title: "Assist",
            body: "必要なら役割調整や上位者介入を行う",
          },
        ]
      : deltaValue === 3
        ? [
            {
              key: "A",
              label: "A",
              title: "Accept",
              body: "不安や怒りの言葉をそのまま受け止める",
            },
            {
              key: "C",
              label: "C",
              title: "Clarify",
              body: "何が足りないと感じているかを確認する",
            },
            {
              key: "E",
              label: "E",
              title: "Explain",
              body: "これから何をどう説明するかを伝える",
            },
            {
              key: "X",
              label: "X",
              title: "Assist",
              body: "説明順の整理や確認メモを使う",
            },
          ]
        : [
            {
              key: "A",
              label: "A",
              title: "Accept",
              body: "現在の反応を維持しながら丁寧に観察する",
            },
            {
              key: "C",
              label: "C",
              title: "Clarify",
              body: "必要があれば追加で確認する",
            },
            {
              key: "E",
              label: "E",
              title: "Explain",
              body: "今後の流れを簡潔に共有する",
            },
            {
              key: "X",
              label: "X",
              title: "Assist",
              body: "特別な追加支援はせず通常対応を維持する",
            },
          ];

  const flowItems =
    deltaValue === 4
      ? [
          "まず安全に関わる不安や怒りを受け止める",
          "次に何が危険・不足と感じられているかを確認する",
          "そのうえで対応の順序と見通しを簡潔に伝える",
        ]
      : deltaValue === 3
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
    deltaValue === 4
      ? [
          "不安や怒りを否定する",
          "確認せずに説明だけを進める",
          "急いで結論だけを返す",
        ]
      : deltaValue === 3
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
        : showAnalysis
          ? 2
          : 1;

  useEffect(() => {
    setSelectedStep(currentStep);
  }, [currentStep]);

  const statusLevel: "safe" | "warning" | "danger" =
    deltaValue === 4 ? "danger" : deltaValue === 3 ? "warning" : "safe";

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

  const handleRequestContext = async () => {
    if (!observationRaw.trim() && !emotion && !urgency) return;

    setContextRequested(true);
    setIsGeneratingContext(true);
    setPrimaryContextDraft("AIが整理しています...");
    setContextFollowups([]);

    try {
      const response = await fetch("http://localhost:8787/api/context-draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          observationRaw,
          emotion,
          urgency,
        }),
      });

      if (!response.ok) {
        throw new Error("AI request failed");
      }

      const data: ContextDraftResponse = await response.json();

      setPrimaryContextDraft(
        data.contextDraft || "整理結果を取得できませんでした。"
      );
      setContextFollowups(
        Array.isArray(data.followups) ? data.followups : []
      );
    } catch (error) {
      console.error(error);
      setPrimaryContextDraft(
        "AIによる整理に失敗しました。もう一度お試しください。"
      );
      setContextFollowups([]);
    } finally {
      setIsGeneratingContext(false);
    }
  };

  const renderStepContent = () => {
    switch (selectedStep) {
      case 1:
        return (
          <InputSection
            text={observationRaw}
            onTextChange={(value) => {
              setObservationRaw(value);
              setContextRequested(false);
              setPrimaryContextDraft("");
              setContextFollowups([]);
            }}
            emotion={emotion}
            onEmotionChange={(value) => {
              setEmotion(value);
              setContextRequested(false);
              setPrimaryContextDraft("");
              setContextFollowups([]);
            }}
            urgency={urgency}
            onUrgencyChange={(value) => {
              setUrgency(value);
              setContextRequested(false);
              setPrimaryContextDraft("");
              setContextFollowups([]);
            }}
            contextDraft={primaryContextDraft}
            contextEdited={contextEdited}
            onContextEditedChange={setContextEdited}
            contextRequested={contextRequested}
            onRequestContext={handleRequestContext}
            onCheckState={() => {
              setShowAnalysis(true);
              setShowResponse(false);
              setShowCaseReport(false);
              setShowDbSample(false);

              setTimeout(() => {
                window.scrollTo({
                  top: 700,
                  behavior: "smooth",
                });
              }, 100);
            }}
            onClear={() => {
              setObservationRaw("");
              setEmotion("");
              setUrgency("");
              setContextEdited("");
              setContextRequested(false);
              setPrimaryContextDraft("");
              setContextFollowups([]);
              setShowAnalysis(false);
              setShowResponse(false);
              setShowCaseReport(false);
              setShowDbSample(false);
              setExecutedActions([]);
              setResultType("");
              setSelectedStep(1);
            }}
            followups={contextFollowups}
          />
        );

      case 2:
        return showAnalysis ? (
          <AnalysisSection
            delta={String(deltaValue)}
            eLevel={phaseLabel}
            text={observationRaw}
            judgment={insightDraft}
            contextText={finalContext}
            onNext={() => setShowResponse(true)}
          />
        ) : null;

      case 3:
        return showResponse ? (
          <ResponseSection
            actionSummary={responseSummary}
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
        ) : null;

      case 5:
        return showDbSample ? (
          <DBSampleSection
            delta={String(deltaValue)}
            eLevel={phaseLabel}
            text={observationRaw}
            judgment={`${insightDraft} / trigger: ${triggerState}`}
            actionSummary={responseSummary}
            executedActions={executedActions}
            resultType={resultType}
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
              RA-SS Demo / Relational Architecture
            </p>
          </div>

          <div className="px-6 py-12 sm:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] tracking-[0.08em] text-stone-600">
                面談用デモ
              </span>
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] tracking-[0.08em] text-stone-600">
                Prototype
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.22] tracking-[-0.02em] text-slate-900 sm:text-5xl">
              違和感を、関係の構造として読み直す。
            </h1>

            <p className="mt-5 max-w-3xl text-[17px] leading-9 text-stone-700">
              気になった場面をそのまま書き出し、関係の状態として整理し、
              次の一手と記録につなげていくデモです。
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {[
                "違和感を書く",
                "関係を読む",
                "対応を考える",
                "記録として残す",
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-[14px] border border-stone-200 bg-white px-4 py-4 text-center text-[14px] text-stone-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSelectedStep(1);
                  window.scrollTo({
                    top: 500,
                    behavior: "smooth",
                  });
                }}
                className="rounded-[12px] bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                まず違和感を書いてみる
              </button>

              {setPage && (
                <button
                  onClick={() => setPage("top")}
                  className="rounded-[10px] border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50"
                >
                  ← TOPへ戻る
                </button>
              )}
            </div>

            {isGeneratingContext && (
              <p className="mt-4 text-[14px] leading-7 text-stone-500">
                AIがStep1のContextを整理しています...
              </p>
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