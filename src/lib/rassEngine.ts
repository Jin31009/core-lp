import {
  analyzeCase as analyzeCaseCore,
  buildRMemo as buildRMemoCore,
  detectAK as detectAKCore,
  detectAPCE as detectAPCECore,
  detectDelta as detectDeltaCore,
  detectPhase as detectPhaseCore,
  detectPrimaryAK as detectPrimaryAKCore,
  detectRFailureReason as detectRFailureReasonCore,
  detectTrigger as detectTriggerCore,
  recommendACEX as recommendACEXCore,
} from "./rassEngineCore.js";

export type CaseInput = {
  context: string;
};

export type DeltaLevel = 0 | 1 | 2 | 3 | 4;
export type YesNo = "Yes" | "No";

export type AKCode = "R" | "P" | "L" | "S";
export type APCECode = "A" | "P" | "C" | "E";
export type ACEXCode = "A" | "C" | "E" | "X";

export type RFailureReason = "未介入" | "遅延" | "ミスマッチ" | "記述不足" | null;
export type CasePhase = "Trigger前" | "Trigger時" | "Trigger後";

export type AnalysisResult = {
  MAX_DELTA: DeltaLevel;
  Trigger: YesNo;
  R_plus: YesNo;
  AK_Break_Type: AKCode[];
  AK_Primary: AKCode | null;
  APCE_Miss: APCECode[];
  R_Failure_Reason: RFailureReason;
  Case_Phase: CasePhase;
  Trigger_Memo: string;
  R_Memo: string;
};

export type ACEXAction = {
  code: ACEXCode;
  label: string;
  reason: string;
};

export type RASSOutput = {
  analysis: AnalysisResult;
  acex: ACEXAction[];
};

export function detectDelta(context: string): DeltaLevel {
  return detectDeltaCore(context) as DeltaLevel;
}

export function detectTrigger(
  delta: DeltaLevel,
  hasStateChange: boolean,
  hasEvent: boolean
): YesNo {
  return detectTriggerCore(delta, hasStateChange, hasEvent) as YesNo;
}

export function detectAK(context: string): AKCode[] {
  return detectAKCore(context) as AKCode[];
}

export function detectPrimaryAK(akList: AKCode[]): AKCode | null {
  return detectPrimaryAKCore(akList) as AKCode | null;
}

export function detectAPCE(ak: AKCode[]): APCECode[] {
  return detectAPCECore(ak) as APCECode[];
}

export function detectRFailureReason(
  rPlus: YesNo,
  context: string
): RFailureReason {
  return detectRFailureReasonCore(rPlus, context) as RFailureReason;
}

export function detectPhase(delta: DeltaLevel, trigger: YesNo): CasePhase {
  return detectPhaseCore(delta, trigger) as CasePhase;
}

export function recommendACEX(
  akPrimary: AKCode | null,
  apceMiss: APCECode[],
  delta: DeltaLevel
): ACEXAction[] {
  return recommendACEXCore(akPrimary, apceMiss, delta) as ACEXAction[];
}

export function buildRMemo(rPlus: YesNo): string {
  return buildRMemoCore(rPlus);
}

export function analyzeCase(input: CaseInput): RASSOutput {
  return analyzeCaseCore(input) as RASSOutput;
}
