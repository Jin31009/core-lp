import { useState } from "react";

type AcexItem = {
  key: string;
  label: string;
  title: string;
  body: string;
};

type ResponseSectionProps = {
  actionSummary: string;
  acexItems: AcexItem[];
  flowItems: string[];
  ngItems: string[];
  statusLabel: string;
  statusSub: string;
  statusIcon: string;
  statusColorClass: string;
  onNext: () => void;
};

function itemFallback(key: string) {
  return key;
}

function getApceMeta(key: string) {
  switch (key) {
    case "A":
      return {
        theory: "Alignment Recognition",
        action: "相手が何に引っかかっているかを認識する",
        voice: "「少し不安が残っていますね」",
        use: "不安・怒り・戸惑いが言葉や表情に出ている場面",
      };
    case "P":
      return {
        theory: "Process Clarification",
        action: "進み方や手順を短く整理する",
        voice: "「ここからはこの順番で進みます」",
        use: "進み方が見えず、流れの不透明さが不安を強める場面",
      };
    case "C":
      return {
        theory: "Context Explanation",
        action: "いま起きていることの意味を説明する",
        voice: "「今の確認は、この後を揃えるためです」",
        use: "説明はあるが、意味や意図が伝わっていない場面",
      };
    case "E":
      return {
        theory: "Expectation Framing",
        action: "この先どうなるかを見通し化する",
        voice: "「次は5分ほどでご案内できます」",
        use: "待ち時間や今後の展開が見えず、落ち着かない場面",
      };
    case "X":
      return {
        theory: "Support / Tool / Handoff",
        action: "補助導線・支援・引継ぎで支える",
        voice: "「必要ならこの内容を次の担当にも共有します」",
        use: "一人の説明だけでは足りず、支援や引継ぎが必要な場面",
      };
    default:
      return {
        theory: itemFallback(key),
        action: "この局面に合う行動に整える",
        voice: "「状況に応じて、必要な支援を足します」",
        use: "局面に応じて補助的に使う場面",
      };
  }
}

function getNgMeta(text: string) {
  if (text.includes("不安")) {
    return {
      title: "不安を軽く扱う",
      why: "相手の緊張を強めやすく、関係の揺れを広げます。",
      instead: "まず不安の中身を短く確認する。",
      use: "気持ちの大きさを評価せず、確認から入る。",
    };
  }

  if (text.includes("確認せず")) {
    return {
      title: "確認せずに説明を進める",
      why: "ズレたまま説明が積み上がり、かえって伝わりにくくなります。",
      instead: "何が不足している感覚かを先に聞く。",
      use: "説明の前に、相手の引っかかりを一つ拾う。",
    };
  }

  if (text.includes("急いで")) {
    return {
      title: "急いで結論だけ返す",
      why: "見通しがそろわず、再燃しやすくなります。",
      instead: "順番と次の見通しを一言添える。",
      use: "短くても、結論＋次の流れで返す。",
    };
  }

  if (text.includes("否定")) {
    return {
      title: "感情や反応を否定する",
      why: "安全感や尊重感を損ね、関係が一気に不安定になります。",
      instead: "まず受け止めてから、必要な確認に入る。",
      use: "訂正や説明は、受け止めの後に置く。",
    };
  }

  return {
    title: text,
    why: "この対応は、関係のズレを広げる可能性があります。",
    instead: "相手の状態に合わせて、順番を整えて返す。",
    use: "代替行動を先に決めてから返す。",
  };
}

function getFirstMoveVoice(actionSummary: string) {
  const text = actionSummary;

  if (text.includes("安全")) {
    return "まず、安全に関わる不安が強そうなので、そこから確認します。";
  }

  if (text.includes("不安")) {
    return "まず、不安がどこに残っているかを一緒に確認します。";
  }

  if (text.includes("怒り")) {
    return "まず、気になっている点をそのまま聞かせてください。";
  }

  if (text.includes("見守る")) {
    return "まず、今の状態を保ちながら、追加の違和感がないか見ていきます。";
  }

  return "まず、いま一番引っかかっている点を短く確認します。";
}

function getFirstMoveAction(actionSummary: string) {
  const text = actionSummary;

  if (text.includes("安全")) {
    return "相手の反応を止めずに受け止め、安全に関わる点を最初に確認する。";
  }

  if (text.includes("不安")) {
    return "不安の中身を1つに絞って聞き返し、説明の焦点を定める。";
  }

  if (text.includes("怒り")) {
    return "評価や反論を急がず、何が不足している感覚かを先に聞く。";
  }

  if (text.includes("見守る")) {
    return "通常対応を維持しつつ、見落としがないかを短く観察する。";
  }

  return "最初の一声のあと、必要な確認を1つだけ入れて焦点を定める。";
}

function FirstMoveCard({
  actionSummary,
}: {
  actionSummary: string;
}) {
  const firstVoice = getFirstMoveVoice(actionSummary);
  const firstAction = getFirstMoveAction(actionSummary);

  return (
    <div className="rounded-[18px] border-2 border-slate-300 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
      <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
        First Move
      </p>
      <p className="mt-2 text-[23px] font-semibold text-slate-900">
        最初の一手
      </p>

      <div className="mt-5 rounded-[14px] border border-stone-200 bg-[#faf8f3] p-4">
        <p className="text-[13px] uppercase tracking-[0.14em] text-stone-500">
          First Voice
        </p>
        <p className="mt-2 text-[18px] leading-8 text-slate-800">
          {firstVoice}
        </p>
      </div>

      <div className="mt-4 rounded-[14px] border border-stone-200 bg-white p-4">
        <p className="text-[13px] uppercase tracking-[0.14em] text-stone-500">
          First Action
        </p>
        <p className="mt-2 text-[17px] leading-8 text-stone-700">
          {firstAction}
        </p>
      </div>

      <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-4">
        <p className="text-[13px] uppercase tracking-[0.14em] text-stone-500">
          Summary
        </p>
        <p className="mt-2 text-[17px] leading-8 text-stone-700">
          {actionSummary}
        </p>
      </div>
    </div>
  );
}

function PlanCard({
  item,
  index,
}: {
  item: AcexItem;
  index: number;
}) {
  const meta = getApceMeta(item.key);

  return (
    <div className="rounded-[18px] border border-stone-200 bg-white p-6 shadow-[0_3px_12px_rgba(15,23,42,0.035)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Action {index + 1}
          </p>
          <p className="mt-2 text-[21px] font-semibold text-slate-900">
            {item.key} / {meta.theory}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-700 text-[13px] font-semibold text-white">
          {item.key}
        </div>
      </div>

      <div className="mt-5 rounded-[14px] border border-sky-200 bg-sky-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] uppercase tracking-[0.14em] text-sky-700">
            Use in This Scene
          </p>
          <div className="rounded-full border border-sky-200 bg-white px-3 py-1 text-[12px] font-medium text-sky-700">
            この場面で使う
          </div>
        </div>
        <p className="mt-2 text-[15px] leading-8 text-stone-700">
          {meta.use}
        </p>
      </div>

      <div className="mt-4 rounded-[14px] border border-stone-200 bg-[#faf8f3] p-4">
        <p className="text-[13px] uppercase tracking-[0.14em] text-stone-500">
          Role
        </p>
        <p className="mt-2 text-[17px] font-medium text-slate-900">
          {meta.action}
        </p>
      </div>

      <div className="mt-4 rounded-[14px] border border-stone-200 bg-white p-4">
        <p className="text-[13px] uppercase tracking-[0.14em] text-stone-500">
          Action
        </p>
        <p className="mt-2 text-[16px] leading-8 text-stone-700">
          {item.body}
        </p>
      </div>

      <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-4">
        <p className="text-[13px] uppercase tracking-[0.14em] text-stone-500">
          First Voice
        </p>
        <p className="mt-2 text-[16px] leading-8 text-slate-800">
          {meta.voice}
        </p>
      </div>
    </div>
  );
}

function FlowStep({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  return (
    <div className="flex gap-4 rounded-[14px] border border-stone-200 bg-white px-4 py-4">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 text-[12px] font-semibold text-white">
        {index + 1}
      </div>
      <p className="text-[16px] leading-8 text-stone-700">{text}</p>
    </div>
  );
}

function NgCard({
  text,
}: {
  text: string;
}) {
  const meta = getNgMeta(text);

  return (
    <div className="rounded-[18px] border border-rose-200 bg-white p-5 shadow-[0_3px_12px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-rose-500">
            Avoid
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            {meta.title}
          </p>
        </div>

        <div className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[12px] font-medium text-rose-600">
          NG
        </div>
      </div>

      <div className="mt-4 rounded-[14px] border border-rose-200 bg-rose-50 p-4">
        <p className="text-[13px] uppercase tracking-[0.14em] text-rose-500">
          Why
        </p>
        <p className="mt-2 text-[15px] leading-8 text-stone-700">
          {meta.why}
        </p>
      </div>

      <div className="mt-4 rounded-[14px] border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] uppercase tracking-[0.14em] text-emerald-600">
            Instead
          </p>
          <div className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-[12px] font-medium text-emerald-700">
            代わりに使う
          </div>
        </div>
        <p className="mt-2 text-[15px] leading-8 text-stone-700">
          {meta.instead}
        </p>
      </div>

      <div className="mt-4 rounded-[14px] border border-sky-200 bg-sky-50 p-4">
        <p className="text-[13px] uppercase tracking-[0.14em] text-sky-700">
          Use This Instead
        </p>
        <p className="mt-2 text-[15px] leading-8 text-stone-700">
          {meta.use}
        </p>
      </div>
    </div>
  );
}

export default function ResponseSection({
  actionSummary,
  acexItems,
  flowItems,
  ngItems,
  statusLabel,
  statusSub,
  statusIcon,
  statusColorClass,
  onNext,
}: ResponseSectionProps) {
  const [block, setBlock] = useState<"plan" | "execution">("plan");

  const sectionShell =
    "overflow-hidden rounded-[22px] border border-stone-200 bg-[#fbfaf7] shadow-[0_10px_30px_rgba(15,23,42,0.06)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[linear-gradient(180deg,#ece8de_0%,#e6e1d6_100%)] px-6 py-6 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[34px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[18px] leading-9 text-stone-700";

  const groupWrap =
    "rounded-[18px] border border-stone-200 bg-[#f8f5ef] p-6";

  const groupTitle =
    "mt-2 text-[24px] font-semibold text-slate-900";

  const groupLead =
    "mt-3 text-[16px] leading-8 text-stone-700";

  const nextStepNote =
    "mt-5 rounded-[14px] border border-dashed border-stone-300 bg-white/80 px-4 py-3 text-[14px] leading-7 text-stone-600";

  const primaryButton =
    "rounded-[12px] bg-slate-700 px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-slate-800";

  const secondaryButton =
    "rounded-[12px] border border-stone-300 bg-white px-6 py-3.5 text-[15px] font-medium text-stone-700 transition hover:bg-stone-50";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 03 / Response
        </p>
        <h2 className={sectionTitleClass}>次の対応</h2>
        <p className={leadClass}>
          Step2 の読み取りをもとに、ここでは「最初に何を言うか」「最初に何をするか」
          「この場面で何を使うか」「何を避けるか」を整理します。
        </p>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <div className="rounded-[18px] border-2 border-stone-300 bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Status
              </p>
              <p className="mt-2 text-[24px] font-semibold text-slate-900">
                いまの局面
              </p>
            </div>

            <div className="rounded-full border border-stone-200 bg-[#faf8f3] px-4 py-2 text-[13px] text-stone-600">
              {statusLabel}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <div
              className={`text-[28px] font-semibold leading-none ${statusColorClass}`}
            >
              {statusIcon}
            </div>
            <div>
              <p className="text-[18px] font-semibold text-slate-900">
                {statusLabel}
              </p>
              <p className="mt-1 text-[15px] leading-7 text-stone-600">
                {statusSub}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] border border-stone-200 bg-white p-4">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setBlock("plan")}
              className={`rounded-[12px] px-5 py-3 text-[14px] font-medium transition ${
                block === "plan"
                  ? "bg-slate-700 text-white"
                  : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
              }`}
            >
              Block A｜最初の一手と対応プラン
            </button>

            <button
              type="button"
              onClick={() => setBlock("execution")}
              className={`rounded-[12px] px-5 py-3 text-[14px] font-medium transition ${
                block === "execution"
                  ? "bg-slate-700 text-white"
                  : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
              }`}
            >
              Block B｜順番と避けたい対応
            </button>
          </div>
        </div>

        {block === "plan" && (
          <>
            <div className={groupWrap}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Block A / First Move
              </p>
              <p className={groupTitle}>最初の一手</p>
              <p className={groupLead}>
                最初に言う一言と、最初にやる一動作を分けて定めます。
              </p>

              <div className="mt-6">
                <FirstMoveCard actionSummary={actionSummary} />
              </div>

              <div className={nextStepNote}>
                次の一手：最初の一手が定まったら、下でこの場面に合う対応カードを選びます。
              </div>
            </div>

            <div className={groupWrap}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Block A / Response Plan
              </p>
              <p className={groupTitle}>対応プラン</p>
              <p className={groupLead}>
                APCE/X を、理論名だけでなく「この場面で何に使うか」まで含めて見ます。
              </p>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {acexItems.map((item, index) => (
                  <PlanCard key={`${item.key}-${index}`} item={item} index={index} />
                ))}
              </div>

              <div className={nextStepNote}>
                次の一手：対応カードが見えたら、下のボタンで Block B に進み、順番とNGを確認します。
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setBlock("execution")}
                  className={primaryButton}
                >
                  Block B を見る
                </button>
              </div>
            </div>
          </>
        )}

        {block === "execution" && (
          <>
            <div className={groupWrap}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Block B / Suggested Sequence
              </p>
              <p className={groupTitle}>対応の順番</p>
              <p className={groupLead}>
                実際の接点では、何をどの順で行うかが重要です。
              </p>

              <div className="mt-6 space-y-3">
                {flowItems.map((item, index) => (
                  <FlowStep key={`${item}-${index}`} text={item} index={index} />
                ))}
              </div>

              <div className={nextStepNote}>
                次の一手：次に、避けたい対応と、その代わりに使う動きを確認します。
              </div>
            </div>

            <div className={groupWrap}>
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Block B / Avoid
              </p>
              <p className={groupTitle}>避けたい対応</p>
              <p className={groupLead}>
                NG を見るだけでなく、「代わりにどうするか」まで一緒に確認します。
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {ngItems.map((item, index) => (
                  <NgCard key={`${item}-${index}`} text={item} />
                ))}
              </div>

              <div className={nextStepNote}>
                次の一手：必要なら Block A に戻って対応カードを見直し、よければケース記録へ進みます。
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setBlock("plan")}
                  className={secondaryButton}
                >
                  Block A に戻る
                </button>

                <button onClick={onNext} className={primaryButton} type="button">
                  ケース記録へ進む
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}