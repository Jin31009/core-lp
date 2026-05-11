import type {
  AKCode,
  APCECode,
  ACEXCode,
  CasePhase,
  DeltaLevel,
  RFailureReason,
  YesNo,
} from "./rassEngine";

export type ContextSource = "raw" | "draft" | "edited";

export type RASSCaseRecord = {
  case_id: string;
  created_at: string;
  updated_at: string;
  context_raw: string;
  context_final: string;
  context_source: ContextSource;
  max_delta: DeltaLevel;
  trigger: YesNo;
  r_plus: YesNo;
  ak_break_type: AKCode[];
  ak_primary: AKCode | null;
  apce_miss: APCECode[];
  r_failure_reason: RFailureReason;
  case_phase: CasePhase;
  trigger_memo: string;
  r_memo: string;
  acex_codes: ACEXCode[];
  acex_labels: string[];
  acex_reasons: string[];
  engine_version: string;
  analysis_version: string;
  why_tags: string[];
  next_assets: string[];
  notes: string;
  safety_labels: string[];
};

export const RASS_CASE_COLUMNS = [
  "case_id",
  "created_at",
  "updated_at",
  "context_raw",
  "context_final",
  "context_source",
  "max_delta",
  "trigger",
  "r_plus",
  "ak_break_type",
  "ak_primary",
  "apce_miss",
  "r_failure_reason",
  "case_phase",
  "trigger_memo",
  "r_memo",
  "acex_codes",
  "acex_labels",
  "acex_reasons",
  "engine_version",
  "analysis_version",
  "why_tags",
  "next_assets",
  "notes",
  "safety_labels",
] as const;

const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_PATTERN =
  /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)\d{2,4}[-.\s]?\d{3,4}\b/g;
const LONG_NUMBER_PATTERN = /\b\d{7,}\b/g;

export function maskSensitiveText(text: string): string {
  if (!text) return "";
  return text
    .replace(EMAIL_PATTERN, "[MASKED]")
    .replace(PHONE_PATTERN, "[MASKED]")
    .replace(LONG_NUMBER_PATTERN, "[MASKED]");
}

function normalizeScalar(value: string | number | null | undefined): string {
  if (value == null) return "";
  return String(value);
}

function joinPipeDelimited(values: readonly string[]): string {
  return values.map((value) => normalizeScalar(value)).join("|");
}

export function toRASSCaseCells(record: RASSCaseRecord): string[] {
  return [
    normalizeScalar(record.case_id),
    normalizeScalar(record.created_at),
    normalizeScalar(record.updated_at),
    normalizeScalar(record.context_raw),
    normalizeScalar(record.context_final),
    normalizeScalar(record.context_source),
    normalizeScalar(record.max_delta),
    normalizeScalar(record.trigger),
    normalizeScalar(record.r_plus),
    joinPipeDelimited(record.ak_break_type),
    normalizeScalar(record.ak_primary),
    joinPipeDelimited(record.apce_miss),
    normalizeScalar(record.r_failure_reason),
    normalizeScalar(record.case_phase),
    normalizeScalar(record.trigger_memo),
    normalizeScalar(record.r_memo),
    joinPipeDelimited(record.acex_codes),
    joinPipeDelimited(record.acex_labels),
    joinPipeDelimited(record.acex_reasons),
    normalizeScalar(record.engine_version),
    normalizeScalar(record.analysis_version),
    joinPipeDelimited(record.why_tags),
    joinPipeDelimited(record.next_assets),
    normalizeScalar(record.notes),
    joinPipeDelimited(record.safety_labels),
  ];
}

function escapeCSVCell(cell: string): string {
  const escaped = cell.replace(/"/g, "\"\"");
  if (/[",\n\r]/.test(escaped)) {
    return `"${escaped}"`;
  }
  return escaped;
}

export function serializeCSVRow(cells: readonly string[]): string {
  return cells.map((cell) => escapeCSVCell(normalizeScalar(cell))).join(",");
}

export function exportRASSCaseToCSV(record: RASSCaseRecord): string {
  return exportRASSCasesToCSV([record]);
}

export function exportRASSCasesToCSV(records: readonly RASSCaseRecord[]): string {
  const rows = [
    serializeCSVRow([...RASS_CASE_COLUMNS]),
    ...records.map((record) => serializeCSVRow(toRASSCaseCells(record))),
  ];

  return rows.join("\n");
}

export function exportRASSCaseToMarkdown(record: RASSCaseRecord): string {
  const maskedContextRaw = maskSensitiveText(record.context_raw);
  const maskedContextFinal = maskSensitiveText(record.context_final);
  const maskedNotes = maskSensitiveText(record.notes);

  return [
    `# ${record.case_id}`,
    "",
    "## Safety",
    `- Labels: ${record.safety_labels.join(", ") || "anonymous_poc"}`,
    "- Notice: この記録は匿名PoC・非診断・説明改善用です。",
    "",
    "## Context",
    `- Raw: ${maskedContextRaw}`,
    `- 確認用Context: ${maskedContextFinal}`,
    "",
    "## Analysis",
    `- Delta: ${record.max_delta}`,
    `- Trigger: ${record.trigger}`,
    `- AK Primary: ${record.ak_primary ?? ""}`,
    `- APCE Miss: ${record.apce_miss.join(" | ")}`,
    `- Case Phase: ${record.case_phase}`,
    "",
    "## Response",
    `- ACEX: ${record.acex_codes.map((code, index) => `${code}:${record.acex_labels[index] ?? ""}`).join(" | ")}`,
    `- Why Tags: ${record.why_tags.join(" | ")}`,
    `- Next Assets: ${record.next_assets.join(" | ")}`,
    `- Notes: ${maskedNotes}`,
  ].join("\n");
}
