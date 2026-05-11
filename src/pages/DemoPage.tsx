import { useEffect, useState } from "react";
import InputSection from "../components/demo/InputSection";
import AnalysisSection from "../components/demo/AnalysisSection";
import ResponseSection from "../components/demo/ResponseSection";
import CaseReportSection from "../components/demo/CaseReportSection";
import DBSampleSection from "../components/demo/DBSampleSection";
import ReflectionPanel from "../components/demo/ReflectionPanel";
import EditorialSectionHeader from "../components/shared/EditorialSectionHeader";
import SiteHeader from "../components/shared/SiteHeader";
import FooterSection from "../components/core/FooterSection";
import { analyzeCase } from "../lib/rassEngine";
import {
  exportRASSCaseToCSV,
  exportRASSCaseToMarkdown,
  maskSensitiveText,
  type RASSCaseRecord,
} from "../lib/rassCaseCsv";

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
  stacked?: boolean;
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

type CordTimelineItem = {
  id: string;
  text: string;
  deltaObservation: string;
  cordRole:
    | "context"
    | "e1"
    | "e2"
    | "e3"
    | "r_plus_candidate"
    | "r_plus_established";
};

export type CordAssessment = {
  summary: string;
  maxDelta: "Δ0" | "Δ1" | "Δ1-Δ2" | "Δ2" | "Δ2-Δ3" | "Δ3" | "Δ4";
  casePhase: string;
  timeline: CordTimelineItem[];
  e: {
    e1: string | null;
    e2: string | null;
    e3: string | null;
  };
  trigger: {
    value: "Yes" | "No";
    reason: string;
  };
  rPlus: {
    status: "none" | "candidate" | "established";
    event: string | null;
  };
  ak: {
    primary: string | null;
    secondary: string | null;
    note: string;
  };
  preAsset: string[];
  humanReviewNotes: string[];
};

type FinalContextResponse = {
  finalContext?: string;
  cordAssessment?: CordAssessment | null;
  cordAssessmentError?: string | null;
  error?: string;
};

async function readErrorMessage(response: Response, fallback: string) {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error || fallback;
  } catch {
    return fallback;
  }
}

function buildCordResponse(cordAssessment: CordAssessment): ResponseData {
  const preAssets = cordAssessment.preAsset.length
    ? cordAssessment.preAsset
    : ["人が確認すべき観点を整理する"];

  return {
    actionSummary: preAssets.join(" → "),
    acexItems: preAssets.map((item, index) => ({
      key: "C",
      label: `確認観点${index + 1}`,
      title: `確認観点${index + 1}｜${item}`,
      body: "CORD一次整理で示された確認候補です。人が文脈に合わせて確認してください。",
    })),
    flowItems: preAssets.map((item) => `確認候補｜${item}`),
    ngItems: cordAssessment.humanReviewNotes,
    statusLabel: `${cordAssessment.maxDelta} / ${cordAssessment.casePhase}`,
    statusSub: `${cordAssessment.trigger.value}｜${cordAssessment.trigger.reason}`,
    statusIcon:
      cordAssessment.trigger.value === "Yes"
        ? "●"
        : cordAssessment.rPlus.status === "established"
          ? "◉"
          : "○",
    statusColorClass:
      cordAssessment.trigger.value === "Yes"
        ? "text-rose-500"
        : cordAssessment.rPlus.status === "established"
          ? "text-emerald-600"
          : "text-stone-500",
  };
}

function TabButton({
  stepNo,
  en,
  ja,
  isActive,
  isReached,
  onClick,
  stacked = false,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isReached}
      className={`flex items-center gap-3 text-left transition ${
        stacked
          ? "w-full border-b border-stone-200 px-4 py-3 last:border-b-0"
          : "min-w-[150px] flex-1 border-r border-stone-200 px-4 py-4 last:border-r-0"
      } ${
        isActive
          ? "bg-white"
          : isReached
            ? "bg-[#f7f4ee] hover:bg-white"
            : "cursor-not-allowed bg-[#f7f4ee] opacity-60"
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
  const [hasEnteredFlow, setHasEnteredFlow] = useState(false);
  const [recordTimestamp, setRecordTimestamp] = useState<string | null>(null);

  const [observationRaw, setObservationRaw] = useState("");
  const [emotion, setEmotion] = useState("");
  const [urgency, setUrgency] = useState("");

  const [contextEdited, setContextEdited] = useState("");
  const [contextRequested, setContextRequested] = useState(false);
  const [hasContextError, setHasContextError] = useState(false);
  const [primaryContextDraft, setPrimaryContextDraft] = useState("");
  const [contextFollowups, setContextFollowups] = useState<string[]>([]);

  const [finalContextDraft, setFinalContextDraft] = useState("");
  const [cordAssessment, setCordAssessment] = useState<CordAssessment | null>(null);
  const [cordAssessmentError, setCordAssessmentError] = useState<string | null>(null);
  const [isGeneratingFinalContext, setIsGeneratingFinalContext] = useState(false);

  const [selectedStep, setSelectedStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isStepNavOpen, setIsStepNavOpen] = useState(false);

  const [executedActions, setExecutedActions] = useState<string[]>([]);
  const [resultType, setResultType] = useState("");
  const [afterNote, setAfterNote] = useState("");
  const [whyTags, setWhyTags] = useState<string[]>([]);
  const [whyMemo, setWhyMemo] = useState("");
  const [nextAssets, setNextAssets] = useState<string[]>([]);
  const [consentNoPII, setConsentNoPII] = useState(false);
  const [consentNonDiagnosis, setConsentNonDiagnosis] = useState(false);

  const hasConfirmedFinalContext =
    !!finalContextDraft.trim() &&
    !isGeneratingFinalContext &&
    !finalContextDraft.includes("失敗しました") &&
    !finalContextDraft.includes("作成しています");

  const caseContext =
    hasConfirmedFinalContext
      ? finalContextDraft.trim()
      : primaryContextDraft.trim() || observationRaw.trim();

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
            : "該当する確認候補なし",
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
            : ["該当する確認候補はありません。"],
        ngItems: [],
        statusLabel: `Δ${stepResult.analysis.MAX_DELTA} / ${stepResult.analysis.Case_Phase}`,
        statusSub: stepResult.analysis.Trigger_Memo,
        statusIcon: stepResult.analysis.Trigger === "Yes" ? "●" : "○",
        statusColorClass:
          stepResult.analysis.Trigger === "Yes" ? "text-rose-500" : "text-stone-500",
      }
    : null;

  const effectiveStep3Response =
    cordAssessment ? buildCordResponse(cordAssessment) : step3Response;

  const effectiveDelta = cordAssessment?.maxDelta || String(stepResult?.analysis.MAX_DELTA ?? 0);
  const effectivePhaseLabel = cordAssessment?.casePhase || stepPhaseLabel;
  const effectiveJudgment = cordAssessment
    ? `${cordAssessment.summary} / Trigger ${cordAssessment.trigger.value}：${cordAssessment.trigger.reason}`
    : stepJudgment;
  const effectiveActionSummary =
    effectiveStep3Response?.actionSummary || "判定未取得。人による確認が必要です。";

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
  const selectedStepLabel = String(selectedStep).padStart(2, "0");

  useEffect(() => {
    setRecordTimestamp(new Date().toISOString());
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedStep]);

  const handleRequestContext = async () => {
    if (!observationRaw.trim()) return;

    setContextRequested(true);
    setHasContextError(false);
    setIsGeneratingFinalContext(false);
    setPrimaryContextDraft("確認用下書きを作成しています...");
    setContextFollowups([]);
    setFinalContextDraft("");
    setCordAssessment(null);
    setCordAssessmentError(null);

    try {
      const response = await fetch("/api/context-draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          observationRaw,
          emotion,
          urgency,
          note: contextEdited,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as ContextDraftResponse;
      const normalizedFollowups = Array.isArray(data.followups)
        ? data.followups.filter((item): item is string => typeof item === "string")
        : [];
      const hasFallbackDraft =
        typeof data.contextDraft === "string" && data.contextDraft.trim().length > 0;
      const hasFallbackFollowups = normalizedFollowups.length > 0;

      if (!response.ok && !hasFallbackDraft && !hasFallbackFollowups) {
        throw new Error(
          data.error ||
            "整理に失敗しました。もう一度お試しください。"
        );
      }

      if (!response.ok) {
        setHasContextError(true);
      }

      setPrimaryContextDraft(
        data.contextDraft || "整理結果を取得できませんでした。"
      );
      setContextFollowups(normalizedFollowups);
    } catch (error) {
      console.error(error);
      setHasContextError(true);
      setPrimaryContextDraft("");
      setContextFollowups([]);
    } finally {
      setIsGeneratingFinalContext(false);
    }
  };

  const handleGenerateFinalContext = async () => {
    setIsGeneratingFinalContext(true);
    setFinalContextDraft("確認用Contextを作成しています...");
    setCordAssessment(null);
    setCordAssessmentError(null);

    try {
      const response = await fetch("/api/final-context", {
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
        throw new Error(
          await readErrorMessage(
            response,
            "確認用Contextの作成に失敗しました。もう一度お試しください。"
          )
        );
      }

      const data: FinalContextResponse = await response.json();

      setFinalContextDraft(
        data.finalContext || "確認用Contextを取得できませんでした。"
      );
      setCordAssessment(data.cordAssessment || null);
      setCordAssessmentError(
        data.cordAssessment
          ? null
          : data.cordAssessmentError || "判定未取得。人による確認が必要です。"
      );
    } catch (error) {
      console.error(error);
      setCordAssessment(null);
      setCordAssessmentError("判定未取得。人による確認が必要です。");
      setFinalContextDraft(
        error instanceof Error
          ? error.message
          : "確認用Contextの作成に失敗しました。もう一度お試しください。"
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
    setIsStepNavOpen(false);
  };

  const goToStep2 = () => {
    if (!hasConfirmedFinalContext || !consentNoPII || !consentNonDiagnosis) {
      return;
    }

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
    if (!csvRecord) return;

    const csv = exportRASSCaseToCSV(csvRecord);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${csvRecord.case_id}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    if (!csvRecord) return;

    const markdown = exportRASSCaseToMarkdown(csvRecord);
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${csvRecord.case_id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const csvRecord: RASSCaseRecord | null = stepResult && recordTimestamp
    ? (() => {
        const timestamp = recordTimestamp;
        const compactTimestamp = timestamp.replace(/[-:.TZ]/g, "").slice(0, 14);

        return {
          case_id: `rass-case-${compactTimestamp}`,
          created_at: timestamp,
          updated_at: timestamp,
          context_raw: maskSensitiveText(observationRaw.trim()),
          context_final: maskSensitiveText(analysisContext),
          context_source: contextSource,
          max_delta: cordAssessment
            ? (cordAssessment.maxDelta as unknown as RASSCaseRecord["max_delta"])
            : stepResult.analysis.MAX_DELTA,
          trigger: cordAssessment
            ? cordAssessment.trigger.value
            : stepResult.analysis.Trigger,
          r_plus: cordAssessment
            ? cordAssessment.rPlus.status === "established"
              ? "Yes"
              : "No"
            : stepResult.analysis.R_plus,
          ak_break_type: cordAssessment
            ? ([
                cordAssessment.ak.primary,
                cordAssessment.ak.secondary,
              ].filter(Boolean) as unknown as RASSCaseRecord["ak_break_type"])
            : stepResult.analysis.AK_Break_Type,
          ak_primary: cordAssessment
            ? (cordAssessment.ak.primary as unknown as RASSCaseRecord["ak_primary"])
            : stepResult.analysis.AK_Primary,
          apce_miss: stepResult.analysis.APCE_Miss,
          r_failure_reason: stepResult.analysis.R_Failure_Reason,
          case_phase: cordAssessment
            ? (cordAssessment.casePhase as unknown as RASSCaseRecord["case_phase"])
            : stepResult.analysis.Case_Phase,
          trigger_memo: cordAssessment
            ? cordAssessment.trigger.reason
            : stepResult.analysis.Trigger_Memo,
          r_memo: cordAssessment
            ? cordAssessment.rPlus.status === "established"
              ? `R+成立：${cordAssessment.rPlus.event || "回復イベントを人が確認してください。"}`
              : cordAssessment.rPlus.status === "candidate"
                ? `R+候補：${cordAssessment.rPlus.event || "回復可能性を人が確認してください。"}`
                : "R+未成立"
            : stepResult.analysis.R_Memo,
          acex_codes: cordAssessment
            ? (effectiveStep3Response?.acexItems.map((item) => item.key) as unknown as RASSCaseRecord["acex_codes"])
            : stepResult.acex.map((action) => action.code),
          acex_labels: cordAssessment
            ? effectiveStep3Response?.acexItems.map((item) => item.title) || []
            : stepResult.acex.map((action) => action.label),
          acex_reasons: cordAssessment
            ? effectiveStep3Response?.acexItems.map((item) => item.body) || []
            : stepResult.acex.map((action) => action.reason),
          engine_version: "rassEngine@1",
          analysis_version: cordAssessment ? "cord_assessment@1+rass_cases_csv@1" : "rass_cases_csv@1",
          why_tags: whyTags,
          next_assets: nextAssets,
          notes: maskSensitiveText(
            [afterNote.trim(), whyMemo.trim()].filter(Boolean).join(" | ")
          ),
          safety_labels: ["匿名PoC", "非診断", "説明改善用"],
        };
      })()
    : null;

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
      {setPage && <SiteHeader setPage={setPage} currentPage="demo" />}
      <div className="mx-auto max-w-6xl px-6 py-4 md:py-6">
        {!hasEnteredFlow && (
          <section className="px-6 pt-28 pb-20 md:px-10 md:pt-36 md:pb-24">
            <div className="mx-auto max-w-[960px] text-center">
              <EditorialSectionHeader
                label="PROTOTYPE"
                marker="triangle"
                hero
                title={
                  <>
                    違和感を、
                    <br />
                    関係の構造として
                    <br />
                    読み直す。
                  </>
                }
                summary="気になった場面をそのまま書き出し、関係の状態として整理し、次の一手と記録につなげていくデモです。"
              />

              <p className="mx-auto mt-8 max-w-2xl text-center text-[16px] leading-[1.95] text-neutral-700 md:text-[17px]">
                違和感を書く、関係を読む、対応を考える、記録として残す。
                <br />
                この流れを、ひとつのケースでそのまま体験できます。
              </p>

              <div className="mx-auto mt-12 max-w-3xl border-t border-stone-200">
                {[
                  "DEMOページも独立したツールではなく、LPの延長として読める構成に整えています。",
                  "観察から記録までを、誌面を読み進めるように順番に体験できます。",
                ].map((item) => (
                  <p
                    key={item}
                    className="border-b border-stone-200 py-5 text-[16px] leading-8 text-stone-700"
                  >
                    {item}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={startFlow}
                  className="inline-flex min-h-11 items-center justify-center bg-neutral-900 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
                >
                  Step1から始める
                </button>

                {setPage && (
                  <button
                    onClick={() => setPage("top")}
                    className="inline-flex min-h-11 items-center justify-center border border-neutral-300 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-neutral-800 transition hover:bg-white"
                  >
                    TOPへ戻る
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {hasEnteredFlow && (
          <>
            <div className="sticky top-20 z-20 mt-4 border-y border-stone-200 bg-[#f7f4ee]/95 backdrop-blur">
              <div className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                    Current Step
                  </p>
                  <p className="mt-0.5 text-[15px] font-semibold text-slate-900 md:text-[16px]">
                    {selectedStepLabel} / 05 ・ {stepMeta.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsStepNavOpen((prev) => !prev)}
                  className="inline-flex min-h-10 items-center justify-center border border-stone-300 bg-white px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-800 transition hover:bg-stone-100"
                  aria-expanded={isStepNavOpen}
                >
                  STEP {isStepNavOpen ? "▲" : "▼"}
                </button>
              </div>

              {isStepNavOpen && (
                <div className="border-t border-stone-200 bg-white">
                  <TabButton
                    stepNo="01"
                    en="Observation"
                    ja="観察入力"
                    isActive={selectedStep === 1}
                    isReached={true}
                    onClick={() => openStep(1)}
                    stacked
                  />
                  <TabButton
                    stepNo="02"
                    en="Analysis"
                    ja="確認結果"
                    isActive={selectedStep === 2}
                    isReached={maxUnlockedStep >= 2}
                    onClick={() => openStep(2)}
                    stacked
                  />
                  <TabButton
                    stepNo="03"
                    en="Response"
                    ja="次の対応"
                    isActive={selectedStep === 3}
                    isReached={maxUnlockedStep >= 3}
                    onClick={() => openStep(3)}
                    stacked
                  />
                  <TabButton
                    stepNo="04"
                    en="Case Learning"
                    ja="学びの記録"
                    isActive={selectedStep === 4}
                    isReached={maxUnlockedStep >= 4}
                    onClick={() => openStep(4)}
                    stacked
                  />
                  <TabButton
                    stepNo="05"
                    en="Structured Record"
                    ja="構造化記録"
                    isActive={selectedStep === 5}
                    isReached={maxUnlockedStep >= 5}
                    onClick={() => openStep(5)}
                    stacked
                  />
                  <div className="border-t border-stone-200 px-4 py-3">
                    <p className="text-[13px] leading-6 text-stone-600">
                      {stepMeta.body}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10">
              {selectedStep === 1 && (
                <InputSection
                  text={observationRaw}
	                  onTextChange={(value) => {
	                    setObservationRaw(value);
	                    setContextRequested(false);
	                    setPrimaryContextDraft("");
	                    setContextFollowups([]);
	                    setFinalContextDraft("");
	                    setCordAssessment(null);
	                    setCordAssessmentError(null);
	                    setConsentNoPII(false);
                    setConsentNonDiagnosis(false);
                    resetLearningState();
                    setMaxUnlockedStep(1);
                    setSelectedStep(1);
                  }}
                  emotion={emotion}
	                  onEmotionChange={(value) => {
	                    setEmotion(value);
	                    setFinalContextDraft("");
	                    setCordAssessment(null);
	                    setCordAssessmentError(null);
	                    setConsentNoPII(false);
                    setConsentNonDiagnosis(false);
                    resetLearningState();
                    setMaxUnlockedStep(1);
                    setSelectedStep(1);
                  }}
                  urgency={urgency}
	                  onUrgencyChange={(value) => {
	                    setUrgency(value);
	                    setFinalContextDraft("");
	                    setCordAssessment(null);
	                    setCordAssessmentError(null);
	                    setConsentNoPII(false);
                    setConsentNonDiagnosis(false);
                    resetLearningState();
                    setMaxUnlockedStep(1);
                    setSelectedStep(1);
                  }}
                  contextDraft={primaryContextDraft}
                  contextEdited={contextEdited}
	                  onContextEditedChange={(value) => {
	                    setContextEdited(value);
	                    setFinalContextDraft("");
	                    setCordAssessment(null);
	                    setCordAssessmentError(null);
	                  }}
                  contextRequested={contextRequested}
                  hasContextError={hasContextError}
                  onRequestContext={handleRequestContext}
                  onCheckState={goToStep2}
                  onClear={() => {
                    setObservationRaw("");
                    setEmotion("");
                    setUrgency("");
                    setContextEdited("");
                    setContextRequested(false);
                    setHasContextError(false);
	                    setPrimaryContextDraft("");
	                    setContextFollowups([]);
	                    setFinalContextDraft("");
	                    setCordAssessment(null);
	                    setCordAssessmentError(null);
	                    setConsentNoPII(false);
                    setConsentNonDiagnosis(false);
                    resetLearningState();
                    setSelectedStep(1);
                    setMaxUnlockedStep(1);
                  }}
                  followups={contextFollowups}
                  finalContextDraft={finalContextDraft}
                  isGeneratingFinalContext={isGeneratingFinalContext}
                  onGenerateFinalContext={handleGenerateFinalContext}
                  consentNoPII={consentNoPII}
                  onConsentNoPIIChange={setConsentNoPII}
                  consentNonDiagnosis={consentNonDiagnosis}
                  onConsentNonDiagnosisChange={setConsentNonDiagnosis}
                />
              )}

              {selectedStep === 2 && maxUnlockedStep >= 2 && (
                <AnalysisSection
                  analysis={step2Analysis}
                  analysisText={null}
                  delta={effectiveDelta}
                  eLevel={effectivePhaseLabel}
                  text={observationRaw}
                  judgment={effectiveJudgment}
	                  contextText={analysisContext}
	                  cordAssessment={cordAssessment}
	                  cordAssessmentError={cordAssessmentError}
	                  onNext={goToStep3}
	                />
              )}

              {selectedStep === 3 && maxUnlockedStep >= 3 && (
                <ResponseSection
	                  actionSummary={effectiveStep3Response?.actionSummary || "判定未取得。人による確認が必要です。"}
	                  acexItems={effectiveStep3Response?.acexItems || []}
	                  flowItems={effectiveStep3Response?.flowItems || ["判定未取得。人による確認が必要です。"]}
	                  ngItems={effectiveStep3Response?.ngItems || []}
	                  statusLabel={effectiveStep3Response?.statusLabel || "判定未取得"}
	                  statusSub={effectiveStep3Response?.statusSub || "人がContextを確認してください。"}
	                  statusIcon={effectiveStep3Response?.statusIcon || "○"}
	                  statusColorClass={effectiveStep3Response?.statusColorClass || "text-stone-500"}
	                  onNext={goToStep4}
                />
              )}

              {selectedStep === 4 && maxUnlockedStep >= 4 && (
                <CaseReportSection
                  finalContext={analysisContext}
                  delta={effectiveDelta}
                  eLevel={effectivePhaseLabel}
                  text={observationRaw}
                  judgment={effectiveJudgment}
                  actionSummary={effectiveActionSummary}
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
                  record={csvRecord}
                  onDownloadCsv={handleDownloadCsv}
                  onDownloadMarkdown={handleDownloadMarkdown}
                  innerRef={undefined}
                />
              )}

              <ReflectionPanel currentStep={selectedStep} />
            </div>
          </>
        )}
      </div>
      <FooterSection setPage={setPage} />
    </div>
  );
}
