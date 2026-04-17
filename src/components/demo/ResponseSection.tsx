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

function getAcexMeta(key: string) {
  switch (key) {
    case "A":
      return {
        label: "受け止め",
        note: "感情や引っかかりを止めずに受ける",
      };
    case "C":
      return {
        label: "確認",
        note: "ズレの焦点を一つに絞って確かめる",
      };
    case "E":
      return {
        label: "説明",
        note: "今わかることと見通しを短く伝える",
      };
    case "X":
      return {
        label: "補助",
        note: "順番・引継ぎ・支援導線を整える",
      };
    case "P":
      return {
        label: "整理",
        note: "進み方や手順を見えやすくする",
      };
    default:
      return {
        label: key,
        note: "この場面に合う形で補助的に使う",
      };
  }
}

function getNgMeta(text: string) {
  if (text.includes("不安")) {
    return {
      title: "不安を軽く扱う",
      instead: "不安の中身を確認する",
    };
  }

  if (text.includes("確認せず")) {
    return {
      title: "確認せずに説明を進める",
      instead: "先に確認する",
    };
  }

  if (text.includes("急いで")) {
    return {
      title: "急いで結論だけ返す",
      instead: "流れを添える",
    };
  }

  if (text.includes("否定")) {
    return {
      title: "感情や反応を否定する",
      instead: "まず受け止めてから説明や訂正に入る",
    };
  }

  if (text.includes("担当")) {
    return {
      title: "担当を曖昧にしたまま進める",
      instead: "誰が何を担うかを先に明確にする",
    };
  }

  return {
    title: text,
    instead: "相手の状態に合わせて順番を整えて返す",
  };
}

function StepItem({
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
      <p className="text-[15px] leading-8 text-stone-700">{text}</p>
    </div>
  );
}

function OrderedActionCard({
  item,
  order,
  tone = "default",
}: {
  item: AcexItem;
  order: number;
  tone?: "primary" | "default";
}) {
  const meta = getAcexMeta(item.key);
  const frameClass =
    tone === "primary"
      ? "border-slate-600 bg-[linear-gradient(180deg,#f5f8fd_0%,#e7eff9_100%)] shadow-[0_14px_30px_rgba(15,23,42,0.11)]"
      : "border-stone-200 bg-[#fdfcf9]";
  const badgeClass =
    tone === "primary"
      ? "bg-slate-900 text-white shadow-sm"
      : "border border-stone-200 bg-white text-stone-500";
  const bodyCardClass =
    tone === "primary"
      ? "border-slate-300 bg-white/90"
      : "border-stone-200 bg-[#fffdfa]";
  const cardPaddingClass = tone === "primary" ? "p-7" : "p-5";
  const titleClass =
    tone === "primary"
      ? "mt-2 text-[26px] font-semibold text-slate-950"
      : "mt-2 text-[18px] font-semibold text-slate-900";
  const noteClass =
    tone === "primary"
      ? "mt-2 text-[14px] leading-6 text-stone-700"
      : "mt-2 text-[12px] leading-6 text-stone-500";
  const stepLabelClass =
    tone === "primary"
      ? "text-[12px] uppercase tracking-[0.16em] text-slate-600"
      : "text-[12px] uppercase tracking-[0.16em] text-stone-500";
  const verbByKey: Record<string, string> = {
    A: "受け止める",
    C: "確認する",
    E: "説明する",
    X: "補助する",
    P: "整理する",
  };
  const verbTitle =
    order === 1
      ? `まず${verbByKey[item.key] || `${meta.label}する`}`
      : order === 2
        ? `次に${verbByKey[item.key] || `${meta.label}する`}`
        : `最後に${verbByKey[item.key] || `${meta.label}する`}`;

  return (
    <div className={`rounded-[18px] border shadow-[0_3px_12px_rgba(15,23,42,0.03)] ${frameClass} ${cardPaddingClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={stepLabelClass}>
            Step {order}
          </p>
          <p className={titleClass}>
            {verbTitle}
          </p>
          <p className={noteClass}>{meta.note}</p>
        </div>

        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${badgeClass}`}>
          {order}
        </div>
      </div>

      <div className={`mt-4 rounded-[12px] border p-4 ${bodyCardClass}`}>
        <p className="text-[14px] leading-7 text-stone-800">{item.body}</p>
      </div>
    </div>
  );
}

function CompactNgCard({
  text,
}: {
  text: string;
}) {
  const meta = getNgMeta(text);

  return (
    <div className="rounded-[16px] border border-rose-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
      <div className="rounded-[10px] border border-rose-200 bg-rose-50 px-3 py-2">
        <p className="text-[12px] uppercase tracking-[0.14em] text-rose-500">
          NG
        </p>
        <p className="mt-1 text-[15px] font-semibold text-slate-900">
          {meta.title}
        </p>
      </div>

      <div className="mt-3 rounded-[10px] border border-emerald-200 bg-emerald-50 px-3 py-2">
        <p className="text-[12px] uppercase tracking-[0.14em] text-emerald-600">
          代わりに
        </p>
        <p className="mt-1 text-[14px] leading-7 text-stone-700">
          {meta.instead}
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
  const sectionShell =
    "border-y border-stone-200 bg-white";

  const sectionHeader =
    "border-b border-stone-200 px-6 py-8 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[34px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[18px] leading-9 text-stone-700";

  const mainCard =
    "border-t border-stone-200 bg-white py-6";
  const quietCard =
    "border-t border-stone-200 bg-[#f8f6f1] p-5";

  const sectionLabel =
    "text-[12px] uppercase tracking-[0.18em] text-stone-500";

  const bodyText = "mt-3 text-[15px] leading-8 text-stone-700";

  const nextStepNote =
    "mt-5 rounded-[14px] border border-dashed border-stone-300 bg-white/80 px-4 py-3 text-[14px] leading-7 text-stone-600";

  const primaryButton =
    "w-full rounded-[14px] bg-orange-500 py-4 text-[16px] font-medium text-white transition hover:bg-orange-600";

  return (
    <section className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 03 / Response
        </p>
        <h2 className={sectionTitleClass}>次の対応</h2>
        <p className={leadClass}>
          Step2 の読み取りをもとに、ここでは ACEX を対応案として順に確認します。
        </p>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <div className="rounded-[20px] border-2 border-slate-300 bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
          <p className={sectionLabel}>① ACEX Sequence</p>
          <p className="mt-2 text-[26px] font-semibold text-slate-900">
            この順で対応案を確認する
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            まず最初の一手を置き、次の行動を順に重ねます。
          </p>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {acexItems.map((item, index) => (
              <OrderedActionCard
                key={`${item.key}-${index}`}
                item={item}
                order={index + 1}
                tone={index === 0 ? "primary" : "default"}
              />
            ))}
          </div>

          {acexItems.length === 0 && (
            <div className="mt-6 rounded-[16px] border border-stone-200 bg-[#faf8f3] p-5">
              <p className="text-[14px] leading-7 text-stone-700">
                該当するACEX提案はありません。
              </p>
            </div>
          )}

          <div className={nextStepNote}>
            次の一手：順番が見えたら、下で要約と補足情報を確認します。
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
          <div className="space-y-6">
            <div className={quietCard}>
              <p className={sectionLabel}>② Action Summary</p>
              <p className="mt-2 text-[20px] font-semibold text-slate-900">
                行動の要約
              </p>

              <div className="mt-5 rounded-[16px] border border-sky-200 bg-sky-50 p-5">
                <p className="text-[13px] uppercase tracking-[0.14em] text-sky-700">
                  Summary
                </p>
                <p className="mt-2 text-[17px] leading-8 text-slate-900">
                  {actionSummary}
                </p>
              </div>
            </div>

            <div className={quietCard}>
              <p className={sectionLabel}>③ Sequence Notes</p>
              <p className="mt-2 text-[20px] font-semibold text-slate-900">
                順番の補足
              </p>
              <p className={bodyText}>
                この順で整理すると考えやすい。
              </p>

              <div className="mt-5 space-y-3">
                {flowItems.map((item, index) => (
                  <StepItem key={`${item}-${index}`} text={item} index={index} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={quietCard}>
              <p className={sectionLabel}>Status</p>
              <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[18px] font-semibold text-slate-900">
                    {statusLabel}
                  </p>
                  <p className="mt-2 text-[13px] leading-7 text-stone-600">
                    {statusSub}
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2">
                  <span className={`text-[20px] leading-none ${statusColorClass}`}>
                    {statusIcon}
                  </span>
                  <span className="text-[12px] text-stone-500">{statusLabel}</span>
                </div>
              </div>
            </div>

            {ngItems.length > 0 && (
              <div className={mainCard}>
                <p className={sectionLabel}>注意</p>
                <p className="mt-2 text-[23px] font-semibold text-slate-900">
                  避けたい対応
                </p>

                <div className="mt-5 space-y-4">
                  {ngItems.map((item, index) => (
                    <CompactNgCard key={`${item}-${index}`} text={item} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="rounded-[16px] border-t border-stone-200 pt-4">
          <div className="mt-4">
            <button onClick={onNext} className={primaryButton} type="button">
              ケース記録へ進む
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
