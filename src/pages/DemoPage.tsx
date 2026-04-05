import React from "react";
import type { Page } from "../types";

type Tone = "emerald" | "amber" | "orange" | "rose";
type PresetId = "patient" | "recruit" | "staff";

type DemoResult = {
  delta: string;
  level: 1 | 2 | 3 | 4;
  insight: string;
  action: string;
  asset: string;
  category: string;
  before: string;
  after: string;
};

type Preset = {
  id: PresetId;
  label: string;
  prompt: string;
};

const PRESETS: Preset[] = [
  {
    id: "patient",
    label: "患者対応",
    prompt: "患者から『説明が足りず不安だった』という声が出ている。",
  },
  {
    id: "recruit",
    label: "採用・定着",
    prompt: "採用時には魅力を感じて入職したが、現場とのギャップで早期離職が起きている。",
  },
  {
    id: "staff",
    label: "職員間連携",
    prompt: "部署間で認識がずれ、患者への案内内容にばらつきが出ている。",
  },
];

export default function DemoPage({
  onNavigate,
  onBackPrev,
}: {
  onNavigate: (page: Page) => void;
  onBackPrev: () => void;
}) {
  const [selectedPreset, setSelectedPreset] = React.useState<PresetId>(PRESETS[0].id);
  const [input, setInput] = React.useState(PRESETS[0].prompt);
  const [step, setStep] = React.useState(1);
  const [result, setResult] = React.useState<DemoResult | null>(null);

  const currentPreset = PRESETS.find((p) => p.id === selectedPreset) ?? PRESETS[0];

  function handlePresetChange(id: PresetId) {
    const preset = PRESETS.find((p) => p.id === id);
    if (!preset) return;
    setSelectedPreset(id);
    setInput(preset.prompt);
    setResult(null);
    setStep(1);
  }

  function analyzeCase(text: string, id: PresetId): DemoResult {
    const normalized = text.toLowerCase();

    if (
      id === "recruit" ||
      normalized.includes("離職") ||
      normalized.includes("採用") ||
      normalized.includes("入職")
    ) {
      return {
        delta: "Δ3（不信）",
        level: 3,
        insight:
          "期待形成と現場実態のあいだにMeaning Gapがあり、入職前後で関係圧が増幅している。",
        action: "入職前に期待値と役割の見通しを揃える対話導線を設計する。",
        asset: "C-01｜流れの接続",
        category: "求職者との関係設計",
        before: "魅力訴求が中心で、入職後の実態とのズレが残る。",
        after: "見通しと役割が事前に共有され、定着に向けた接続が生まれる。",
      };
    }

    if (
      id === "staff" ||
      normalized.includes("部署") ||
      normalized.includes("職員") ||
      normalized.includes("連携")
    ) {
      return {
        delta: "Δ2（不満）",
        level: 2,
        insight:
          "部署間で認識と説明プロセスがずれ、患者接点で一貫性が失われている。",
        action: "案内の基準文と役割分担を明文化し、接点での説明順序を整える。",
        asset: "A-02｜認識の接続",
        category: "職員間の関係調整",
        before: "各部署が個別判断で伝え、患者体験にばらつきが出る。",
        after: "説明基準が共有され、関係の一貫性が回復する。",
      };
    }

    return {
      delta: "Δ2（不満）",
      level: 2,
      insight:
        "説明不足により患者側の見通しが立たず、認識のズレが関係圧として蓄積している。",
      action: "見通しを補う一言と、次に起きる流れの接続を追加する。",
      asset: "E-01｜見通し提示",
      category: "患者との関係調整",
      before: "説明は行われているが、相手の不安や次の見通しが回収されていない。",
      after: "次に何が起きるかが明確になり、不安が緩和される。",
    };
  }

  function goToReview() {
    if (!input.trim()) return;
    setResult(null);
    setStep(2);
  }

  function analyze() {
    if (!input.trim()) {
      setResult(null);
      setStep(1);
      return;
    }
    setResult(analyzeCase(input, selectedPreset));
    setStep(3);
  }

  function resetDemo() {
    setSelectedPreset(PRESETS[0].id);
    setInput(PRESETS[0].prompt);
    setResult(null);
    setStep(1);
  }

  const tone: Tone =
    result?.level === 1
      ? "emerald"
      : result?.level === 3
      ? "orange"
      : result?.level === 4
      ? "rose"
      : "amber";

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row">
        <button
          onClick={onBackPrev}
          className="w-full border border-black/15 px-4 py-3 text-sm text-slate-600 transition hover:bg-white sm:w-auto sm:py-2"
        >
          ← 前のページへ戻る
        </button>
        <button
          onClick={() => onNavigate("top")}
          className="w-full border border-black/15 px-4 py-3 text-sm text-slate-600 transition hover:bg-white sm:w-auto sm:py-2"
        >
          ← TOPへ戻る
        </button>
      </div>

      <div className="mb-12 border-t border-black/10 pt-8">
        <p className="text-xs tracking-[0.3em] text-slate-400">DEMO</p>
        <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl md:text-5xl">
          RA-SSを、まず触れて確認する。
        </h2>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StepCard
          number="01"
          title="ケースを選ぶ"
          desc="患者対応・採用・職員連携から近いケースを選ぶ"
          active={step >= 1}
        />
        <StepCard
          number="02"
          title="構造を確認"
          desc="認識のズレと関係圧の方向を見る"
          active={step >= 2}
        />
        <StepCard
          number="03"
          title="次の一手を見る"
          desc="Pre-Assetと改善アクションを確認する"
          active={step >= 3}
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 text-slate-600">
          <p className="text-lg leading-8">
            3分で試せます。違和感を入力すると「関係圧」「構造」「次の一手」が表示されます。
            自組織で使えるかを判断するための最短導線です。
          </p>

          <Panel title="Case Type">
            <div className="mt-4 flex flex-wrap gap-3">
              {PRESETS.map((p) => {
                const active = selectedPreset === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePresetChange(p.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </Panel>

          <Panel title="Step 1" subtitle="違和感・ケースを入力" badge={currentPreset.label}>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setResult(null);
                setStep(1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  goToReview();
                }
              }}
              placeholder="例：患者からの不満、採用時の違和感などを入力（⌘/Ctrl + Enterで次へ）"
              className="mt-4 w-full rounded-2xl border border-slate-300 p-4 text-sm leading-7 outline-none transition focus:border-slate-500"
              rows={5}
            />

            <div className="mt-4 flex flex-col gap-3">
              <LinkButton onClick={goToReview}>構造を確認する</LinkButton>
              <div className="flex flex-col gap-3 sm:flex-row">
                <LinkButton variant="secondary" onClick={resetDemo}>
                  リセット
                </LinkButton>
                <LinkButton variant="secondary" onClick={() => onNavigate("poc")}>
                  PoCへ進む
                </LinkButton>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel
            title="Step 2"
            subtitle="構造レビュー"
            badge={result ? result.delta : "分析待機中"}
            badgeTone={tone}
          >
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <DeltaVisual label="Δ1" title="違和感" active={result?.level === 1} tone="emerald" />
              <DeltaVisual label="Δ2" title="不満" active={result?.level === 2} tone="amber" />
              <DeltaVisual label="Δ3" title="不信" active={result?.level === 3} tone="orange" />
              <DeltaVisual label="Δ4" title="断絶" active={result?.level === 4} tone="rose" />
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {step < 2
                ? "まずケースを入力し、構造レビューへ進んでください。"
                : result
                ? result.insight
                : "このケースでは、認識のズレがどこで生じているかを確認します。次のボタンで分析を実行してください。"}
            </div>

            <div className="mt-4 flex flex-col sm:items-end">
              <LinkButton onClick={analyze}>次の一手を見る</LinkButton>
            </div>
          </Panel>

          <Panel
            title="Step 3"
            subtitle="次の一手 / Pre-Asset"
            badge={result ? result.category : "未分析"}
          >
            {!result ? (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-400">
                分析を実行すると、Pre-Assetと改善アクション、Before / After が表示されます。
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <PanelLite label="Pre-Asset" value={result.asset} />
                <PanelLite label="次の一手" value={result.action} />
                <ResultHighlight result={result} />
                <div className="grid gap-4 md:grid-cols-2">
                  <BeforeAfterCard label="Before" text={result.before} />
                  <BeforeAfterCard label="After" text={result.after} />
                </div>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </section>
  );
}

function LinkButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  const base = "w-full px-6 py-3 text-sm transition sm:w-auto";
  const style =
    variant === "primary"
      ? "bg-black text-white shadow-sm hover:scale-[1.01] hover:shadow-md"
      : "border border-black bg-transparent text-black hover:bg-slate-50";

  return (
    <button type="button" onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  );
}

function Panel({
  title,
  subtitle,
  badge,
  badgeTone,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeTone?: Tone;
  children: React.ReactNode;
}) {
  const tones: Record<Tone, string> = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
  };

  return (
    <div className="border border-black/5 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs tracking-[0.25em] text-slate-400">{title}</div>
          {subtitle ? <div className="mt-1 font-medium">{subtitle}</div> : null}
        </div>
        {badge ? (
          <div
            className={`rounded-full border px-3 py-1 text-xs ${
              badgeTone ? tones[badgeTone] : "border-black/10 bg-slate-100 text-slate-600"
            }`}
          >
            {badge}
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function PanelLite({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/10 bg-slate-50 p-4">
      <div className="text-xs tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-2 text-base leading-7 text-slate-900">{value}</div>
    </div>
  );
}

function ResultHighlight({ result }: { result: DemoResult }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MiniStat title="関係圧" value={result.delta} note="現在の緊張レベル" />
      <MiniStat title="カテゴリ" value={result.category} note="どの関係領域の問題か" />
      <MiniStat title="推奨部材" value={result.asset} note="最初に使うPre-Asset" />
    </div>
  );
}

function StepCard({
  number,
  title,
  desc,
  active,
}: {
  number: string;
  title: string;
  desc: string;
  active: boolean;
}) {
  return (
    <div
      className={`border p-5 ${
        active ? "border-black bg-black text-white" : "border-black/10 bg-white text-slate-700"
      }`}
    >
      <div className={`text-xs tracking-[0.22em] ${active ? "text-slate-300" : "text-slate-500"}`}>
        Step {number}
      </div>
      <div className="mt-2 text-lg font-medium">{title}</div>
      <div className={`mt-2 text-sm leading-6 ${active ? "text-slate-200" : "text-slate-600"}`}>
        {desc}
      </div>
    </div>
  );
}

function DeltaVisual({
  label,
  title,
  active,
  tone,
}: {
  label: string;
  title: string;
  active: boolean;
  tone: Tone;
}) {
  const tones: Record<Tone, string> = {
    emerald: active ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-black/10 bg-white text-slate-500",
    amber: active ? "border-amber-500 bg-amber-50 text-amber-700" : "border-black/10 bg-white text-slate-500",
    orange: active ? "border-orange-500 bg-orange-50 text-orange-700" : "border-black/10 bg-white text-slate-500",
    rose: active ? "border-rose-500 bg-rose-50 text-rose-700" : "border-black/10 bg-white text-slate-500",
  };

  return (
    <div className={`border p-3 text-center transition ${active ? "scale-[1.03] shadow-sm" : ""} ${tones[tone]}`}>
      <div className="text-xs tracking-[0.18em]">{label}</div>
      <div className="mt-1 text-sm">{title}</div>
    </div>
  );
}

function BeforeAfterCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-black/10 bg-slate-50 p-4">
      <div className="text-xs tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm leading-7 text-slate-700">{text}</div>
    </div>
  );
}

function MiniStat({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="border border-black/10 bg-white p-4">
      <div className="text-xs tracking-widest text-slate-400">{title}</div>
      <div className="mt-1 text-xl font-medium">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{note}</div>
    </div>
  );
}