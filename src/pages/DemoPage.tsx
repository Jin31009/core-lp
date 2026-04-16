import { useEffect, useState } from "react";
import InputSection from "../components/demo/InputSection";
import AnalysisSection from "../components/demo/AnalysisSection";
import ResponseSection from "../components/demo/ResponseSection";
import CaseReportSection from "../components/demo/CaseReportSection";
import DBSampleSection from "../components/demo/DBSampleSection";
import ReflectionPanel from "../components/demo/ReflectionPanel";
import { analyzeCase } from "../lib/rassEngine";
import { exportRASSCaseToCSV, type RASSCaseRecord } from "../lib/rassCaseCsv";

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

type ResponseData = {
  actionSummary: string;
  acexItems: AcexItem[];
  flowItems: string[];
  ngItems: string[];
  statusLabel: string;
  statusSub: string;
  statusIcon: string;
  statusColorClass: string;
};

type FinalContextResponse = {
  finalContext?: string;
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
      className={`flex min-w-[150px] flex-1 items-center gap-3 border-r border-stone-200 px-4 py-4 text-left transition last:border-r-0 ${
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
  const API_BASE = "";
  const [hasEnteredFlow, setHasEnteredFlow] = useState(false);

  const [observationRaw, setObservationRaw] = useState("");
  const [emotion, setEmotion] = useState("");
  const [urgency, setUrgency] = useState("");

  const [contextEdited, setContextEdited] = useState("");
  const [contextRequested, setContextRequested] = useState(false);
  const [primaryContextDraft, setPrimaryContextDraft] = useState("");
  const [contextFollowups, setContextFollowups] = useState<string[]>([]);

  const [finalContextDraft, setFinalContextDraft] = useState("");
  const [isGeneratingFinalContext, setIsGeneratingFinalContext] = useState(false);

  const [selectedStep, setSelectedStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [executedActions, setExecutedActions] = useState<string[]>([]);
  const [resultType, setResultType] = useState("");
  const [afterNote, setAfterNote] = useState("");
  const [whyTags, setWhyTags] = useState<string[]>([]);
  const [whyMemo, setWhyMemo] = useState("");
  const [nextAssets, setNextAssets] = useState<string[]>([]);

  const caseContext =
    finalContextDraft.trim() || contextEdited.trim() || primaryContextDraft;

  const analysisContext =
    caseContext.trim() || observationRaw.trim();

  const contextSource: RASSCaseRecord["context_source"] = contextEdited.trim()
    ? "edited"
    : primaryContextDraft.trim()
      ? "draft"
      : "raw";

  const stepResult = analysisContext ? analyzeCase({ context: analysisContext }) : null;

  const step2Analysis = stepResult
    ? {
        MAX_DELTA: stepResult.analysis.MAX_DELTA,
        Trigger: stepResult.analysis.Trigger,
        AK_Primary: stepResult.analysis.AK_Primary ?? undefined,
        APCE_Miss: stepResult.analysis.APCE_Miss[0] ?? "",
        R_Plus: stepResult.analysis.R_plus,
        AK_Break_Type: stepResult.analysis.AK_Break_Type,
        R_Failure_Reason: stepResult.analysis.R_Failure_Reason ?? undefined,
        Case_Phase: stepResult.analysis.Case_Phase,
        Trigger_Memo: stepResult.analysis.Trigger_Memo,
        R_Memo: stepResult.analysis.R_Memo,
      }
    : null;

  const stepJudgment = stepResult
    ? `${stepResult.analysis.Trigger_Memo} / ${stepResult.analysis.R_Memo}`
    : "";

  const stepPhaseLabel = stepResult?.analysis.Case_Phase || "Trigger前";

  const step3Response: ResponseData | null = stepResult
    ? {
        actionSummary:
          stepResult.acex.length > 0
            ? stepResult.acex.map((action) => `${action.code}｜${action.label}`).join(" → ")
            : "該当するACEX提案なし",
        acexItems: stepResult.acex.map((action) => ({
          key: action.code,
          label: action.code,
          title: action.label,
          body: action.reason,
        })),
        flowItems:
          stepResult.acex.length > 0
            ? stepResult.acex.map(
                (action) => `${action.code}｜${action.label}：${action.reason}`
              )
            : ["該当するACEX提案はありません。"],
        ngItems: [],
        statusLabel: `Δ${stepResult.analysis.MAX_DELTA} / ${stepResult.analysis.Case_Phase}`,
        statusSub: stepResult.analysis.Trigger_Memo,
        statusIcon: stepResult.analysis.Trigger === "Yes" ? "●" : "○",
        statusColorClass:
          stepResult.analysis.Trigger === "Yes" ? "text-rose-500" : "text-stone-500",
      }
    : null;

  const stepMeta =
    selectedStep === 1
      ? {
          title: "Step1 / Observation",
          body: "違和感を書き出し、一次整理と補足を整える段階です。",
        }
      : selectedStep === 2
        ? {
            title: "Step2 / Analysis",
            body: "整理したContextを、関係の状態として読み取る段階です。",
          }
        : selectedStep === 3
          ? {
              title: "Step3 / Response",
              body: "読み取った状態をもとに、次の対応を考える段階です。",
            }
          : selectedStep === 4
            ? {
                title: "Step4 / Case Learning",
                body: "今回の場面・対応・結果を、次に使える学びとして残す段階です。",
              }
            : {
                title: "Step5 / Structured Record",
                body: "構造化された記録として、今回の学びがどう残るかを確認する段階です。",
              };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedStep]);

  const handleRequestContext = async () => {
    if (!observationRaw.trim()) return;

    setContextRequested(true);
    setIsGeneratingFinalContext(true);
    setPrimaryContextDraft("AIが整理しています...");
    setContextFollowups([]);
    setFinalContextDraft("");

    try {
      const response = await fetch(`${API_BASE}/api/context-draft`, {
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
      setContextFollowups(Array.isArray(data.followups) ? data.followups : []);
    } catch (error) {
      console.error(error);
      setPrimaryContextDraft(
        "AIによる整理に失敗しました。もう一度お試しください。"
      );
      setContextFollowups([]);
    } finally {
      setIsGeneratingFinalContext(false);
    }
  };

  const handleGenerateFinalContext = async () => {
    if (!primaryContextDraft.trim() && !contextEdited.trim()) return;

    setIsGeneratingFinalContext(true);
    setFinalContextDraft("Final Contextを生成しています...");

    try {
      const response = await fetch(`${API_BASE}/api/final-context`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          observationRaw,
          emotion,
          urgency,
          primaryContextDraft,
          contextEdited,
        }),
      });

      if (!response.ok) {
        throw new Error("Final context request failed");
      }

      const data: FinalContextResponse = await response.json();

      setFinalContextDraft(
        data.finalContext || "Final Contextを取得できませんでした。"
      );
    } catch (error) {
      console.error(error);
      setFinalContextDraft(
        "Final Contextの生成に失敗しました。もう一度お試しください。"
      );
    } finally {
      setIsGeneratingFinalContext(false);
    }
  };

  const resetLearningState = () => {
    setExecutedActions([]);
    setResultType("");
    setAfterNote("");
    setWhyTags([]);
    setWhyMemo("");
    setNextAssets([]);
  };

  const startFlow = () => {
    setHasEnteredFlow(true);
    setSelectedStep(1);
    setMaxUnlockedStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openStep = (step: 1 | 2 | 3 | 4 | 5) => {
    if (step > maxUnlockedStep) return;
    setSelectedStep(step);
  };

  const goToStep2 = () => {
    setMaxUnlockedStep((prev) => (prev < 2 ? 2 : prev));
    setSelectedStep(2);
  };

  const goToStep3 = () => {
    setMaxUnlockedStep((prev) => (prev < 3 ? 3 : prev));
    setSelectedStep(3);
  };

  const goToStep4 = () => {
    setMaxUnlockedStep((prev) => (prev < 4 ? 4 : prev));
    setSelectedStep(4);
  };

  const goToStep5 = () => {
    setMaxUnlockedStep((prev) => (prev < 5 ? 5 : prev));
    setSelectedStep(5);
  };

  const handleDownloadCsv = () => {
    if (!stepResult) return;

    const timestamp = new Date().toISOString();
    const compactTimestamp = timestamp.replace(/[-:.TZ]/g, "").slice(0, 14);
    const caseId = `rass-case-${compactTimestamp}`;

    const record: RASSCaseRecord = {
      case_id: caseId,
      created_at: timestamp,
      updated_at: timestamp,
      context_raw: observationRaw.trim(),
      context_final: analysisContext,
      context_source: contextSource,
      max_delta: stepResult.analysis.MAX_DELTA,
      trigger: stepResult.analysis.Trigger,
      r_plus: stepResult.analysis.R_plus,
      ak_break_type: stepResult.analysis.AK_Break_Type,
      ak_primary: stepResult.analysis.AK_Primary,
      apce_miss: stepResult.analysis.APCE_Miss,
      r_failure_reason: stepResult.analysis.R_Failure_Reason,
      case_phase: stepResult.analysis.Case_Phase,
      trigger_memo: stepResult.analysis.Trigger_Memo,
      r_memo: stepResult.analysis.R_Memo,
      acex_codes: stepResult.acex.map((action) => action.code),
      acex_labels: stepResult.acex.map((action) => action.label),
      acex_reasons: stepResult.acex.map((action) => action.reason),
      engine_version: "rassEngine@1",
      analysis_version: "rass_cases_csv@1",
      why_tags: whyTags,
      next_assets: nextAssets,
      notes: [afterNote.trim(), whyMemo.trim()].filter(Boolean).join(" | "),
    };

    const csv = exportRASSCaseToCSV(record);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${caseId}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {!hasEnteredFlow && (
          <div className="overflow-hidden rounded-[18px] border border-stone-200 bg-[#fbfaf7] shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="border-b border-stone-200 px-6 py-4 sm:px-8">
              <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500">
                RA-SS Demo / Relational Architecture
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
                  onClick={startFlow}
                  className="rounded-[12px] bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Step1から始める
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
            </div>
          </div>
        )}

        {hasEnteredFlow && (
          <>
            <div className="sticky top-0 z-20 mt-2 overflow-hidden rounded-[16px] border border-stone-200 bg-[#fbfaf7]/95 shadow-[0_4px_16px_rgba(15,23,42,0.03)] backdrop-blur">
              <div className="flex flex-wrap items-stretch">
                <TabButton
                  stepNo="01"
                  en="Observation"
                  ja="観察入力"
                  isActive={selectedStep === 1}
                  isReached={true}
                  onClick={() => openStep(1)}
                />
                <TabButton
                  stepNo="02"
                  en="Analysis"
                  ja="確認結果"
                  isActive={selectedStep === 2}
                  isReached={maxUnlockedStep >= 2}
                  onClick={() => openStep(2)}
                />
                <TabButton
                  stepNo="03"
                  en="Response"
                  ja="次の対応"
                  isActive={selectedStep === 3}
                  isReached={maxUnlockedStep >= 3}
                  onClick={() => openStep(3)}
                />
                <TabButton
                  stepNo="04"
                  en="Case Learning"
                  ja="学びの記録"
                  isActive={selectedStep === 4}
                  isReached={maxUnlockedStep >= 4}
                  onClick={() => openStep(4)}
                />
                <TabButton
                  stepNo="05"
                  en="Structured Record"
                  ja="構造化記録"
                  isActive={selectedStep === 5}
                  isReached={maxUnlockedStep >= 5}
                  onClick={() => openStep(5)}
                />
              </div>

              <div className="border-t border-stone-200 bg-[#f7f4ee] px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                  Current Step
                </p>
                <p className="mt-1 text-[18px] font-semibold text-slate-900">
                  {stepMeta.title}
                </p>
                <p className="mt-1 text-[14px] leading-7 text-stone-600">
                  {stepMeta.body}
                </p>
              </div>
            </div>

            <div className="mt-8">
              {selectedStep === 1 && (
                <InputSection
                  text={observationRaw}
                  onTextChange={(value) => {
                    setObservationRaw(value);
                    setContextRequested(false);
                    setPrimaryContextDraft("");
                    setContextFollowups([]);
                    setFinalContextDraft("");
                    resetLearningState();
                    setMaxUnlockedStep(1);
                    setSelectedStep(1);
                  }}
                  emotion={emotion}
                  onEmotionChange={(value) => {
                    setEmotion(value);
                    setContextRequested(false);
                    setPrimaryContextDraft("");
                    setContextFollowups([]);
                    setFinalContextDraft("");
                    resetLearningState();
                    setMaxUnlockedStep(1);
                    setSelectedStep(1);
                  }}
                  urgency={urgency}
                  onUrgencyChange={(value) => {
                    setUrgency(value);
                    setContextRequested(false);
                    setPrimaryContextDraft("");
                    setContextFollowups([]);
                    setFinalContextDraft("");
                    resetLearningState();
                    setMaxUnlockedStep(1);
                    setSelectedStep(1);
                  }}
                  contextDraft={primaryContextDraft}
                  contextEdited={contextEdited}
                  onContextEditedChange={(value) => {
                    setContextEdited(value);
                    setFinalContextDraft("");
                  }}
                  contextRequested={contextRequested}
                  onRequestContext={handleRequestContext}
                  onCheckState={goToStep2}
                  onClear={() => {
                    setObservationRaw("");
                    setEmotion("");
                    setUrgency("");
                    setContextEdited("");
                    setContextRequested(false);
                    setPrimaryContextDraft("");
                    setContextFollowups([]);
                    setFinalContextDraft("");
                    resetLearningState();
                    setSelectedStep(1);
                    setMaxUnlockedStep(1);
                  }}
                  followups={contextFollowups}
                  finalContextDraft={finalContextDraft}
                  isGeneratingFinalContext={isGeneratingFinalContext}
                  onGenerateFinalContext={handleGenerateFinalContext}
                />
              )}

              {selectedStep === 2 && maxUnlockedStep >= 2 && (
                <AnalysisSection
                  analysis={step2Analysis}
                  analysisText={null}
                  delta={String(stepResult?.analysis.MAX_DELTA ?? 0)}
                  eLevel={stepPhaseLabel}
                  text={observationRaw}
                  judgment={stepJudgment}
                  contextText={analysisContext}
                  onNext={goToStep3}
                />
              )}

              {selectedStep === 3 && maxUnlockedStep >= 3 && (
                <ResponseSection
                  actionSummary={step3Response?.actionSummary || "該当するACEX提案なし"}
                  acexItems={step3Response?.acexItems || []}
                  flowItems={step3Response?.flowItems || ["該当するACEX提案はありません。"]}
                  ngItems={step3Response?.ngItems || []}
                  statusLabel={step3Response?.statusLabel || "Δ0 / Trigger前"}
                  statusSub={step3Response?.statusSub || "主因不明 によりΔ上昇。Trigger No"}
                  statusIcon={step3Response?.statusIcon || "○"}
                  statusColorClass={step3Response?.statusColorClass || "text-stone-500"}
                  onNext={goToStep4}
                />
              )}

              {selectedStep === 4 && maxUnlockedStep >= 4 && (
                <CaseReportSection
                  finalContext={analysisContext}
                  delta={String(stepResult?.analysis.MAX_DELTA ?? 0)}
                  eLevel={stepPhaseLabel}
                  text={observationRaw}
                  judgment={stepJudgment}
                  actionSummary={step3Response?.actionSummary || "該当するACEX提案なし"}
                  executedActions={executedActions}
                  onExecutedActionsChange={setExecutedActions}
                  resultType={resultType}
                  onResultTypeChange={setResultType}
                  afterNote={afterNote}
                  onAfterNoteChange={setAfterNote}
                  whyTags={whyTags}
                  onWhyTagsChange={setWhyTags}
                  whyMemo={whyMemo}
                  onWhyMemoChange={setWhyMemo}
                  nextAssets={nextAssets}
                  onNextAssetsChange={setNextAssets}
                  onNext={goToStep5}
                />
              )}

              {selectedStep === 5 && maxUnlockedStep >= 5 && (
                <DBSampleSection
                  finalContext={analysisContext}
                  delta={String(stepResult?.analysis.MAX_DELTA ?? 0)}
                  eLevel={stepPhaseLabel}
                  text={observationRaw}
                  judgment={stepJudgment}
                  actionSummary={step3Response?.actionSummary || "該当するACEX提案なし"}
                  executedActions={executedActions}
                  resultType={resultType}
                  afterNote={afterNote}
                  whyTags={whyTags}
                  whyMemo={whyMemo}
                  nextAssets={nextAssets}
                  onDownloadCsv={handleDownloadCsv}
                  innerRef={undefined}
                />
              )}

              <ReflectionPanel currentStep={selectedStep} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
