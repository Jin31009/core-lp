export function detectDelta(context: string): 0 | 1 | 2 | 3 | 4;
export function detectTrigger(
  delta: 0 | 1 | 2 | 3 | 4,
  hasStateChange: boolean,
  hasEvent: boolean
): "Yes" | "No";
export function detectAK(context: string): Array<"R" | "P" | "L" | "S">;
export function detectPrimaryAK(
  akList: Array<"R" | "P" | "L" | "S">
): "R" | "P" | "L" | "S" | null;
export function detectAPCE(
  ak: Array<"R" | "P" | "L" | "S">
): Array<"A" | "P" | "C" | "E">;
export function detectRFailureReason(
  rPlus: "Yes" | "No",
  context: string
): "未介入" | "遅延" | "ミスマッチ" | "記述不足" | null;
export function detectPhase(
  delta: 0 | 1 | 2 | 3 | 4,
  trigger: "Yes" | "No"
): "Trigger前" | "Trigger時" | "Trigger後";
export function recommendACEX(
  akPrimary: "R" | "P" | "L" | "S" | null,
  apceMiss: Array<"A" | "P" | "C" | "E">,
  delta: 0 | 1 | 2 | 3 | 4
): Array<{
  code: "A" | "C" | "E" | "X";
  label: string;
  reason: string;
}>;
export function buildRMemo(rPlus: "Yes" | "No"): string;
export function analyzeCase(input: {
  context: string;
}): {
  analysis: {
    MAX_DELTA: 0 | 1 | 2 | 3 | 4;
    Trigger: "Yes" | "No";
    R_plus: "Yes" | "No";
    AK_Break_Type: Array<"R" | "P" | "L" | "S">;
    AK_Primary: "R" | "P" | "L" | "S" | null;
    APCE_Miss: Array<"A" | "P" | "C" | "E">;
    R_Failure_Reason: "未介入" | "遅延" | "ミスマッチ" | "記述不足" | null;
    Case_Phase: "Trigger前" | "Trigger時" | "Trigger後";
    Trigger_Memo: string;
    R_Memo: string;
  };
  acex: Array<{
    code: "A" | "C" | "E" | "X";
    label: string;
    reason: string;
  }>;
};
