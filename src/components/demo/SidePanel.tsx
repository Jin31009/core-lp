type GuideItem = {
  no: number;
  en: string;
  ja: string;
  body: string;
};

type SidePanelProps = {
  currentStep: number;
};

const guideItems: GuideItem[] = [
  {
    no: 1,
    en: "Observation",
    ja: "観察入力",
    body:
      "最初に、現場で気になったことを短く記述します。ここでは結論を急がず、発言・表情・違和感・説明場面でのズレなどを、そのまま観察として置くことが大切です。",
  },
  {
    no: 2,
    en: "Analysis",
    ja: "確認結果",
    body:
      "入力した観察内容をもとに、Δ（関係緊張）と e（フェーズ）を手がかりに状態を見立てます。ここは厳密判定ではなく、いまの関係の全体像をつかむための段階です。",
  },
  {
    no: 3,
    en: "Response",
    ja: "次の対応",
    body:
      "確認結果を受けて、次に何をどう進めるかを整理します。ACE＋X で対応の中身を見て、Flow で順番を確認し、NG で避けたい行動を押さえます。",
  },
  {
    no: 4,
    en: "Case Report",
    ja: "ケース記録",
    body:
      "観察・見立て・対応をひとつのケースとしてまとめる段階です。後で振り返ったり、他者に共有したりするための記録の入口として位置づけています。",
  },
  {
    no: 5,
    en: "DB Sample",
    ja: "DB見本",
    body:
      "最後に、保存後にどのように並ぶかを見本として確認します。ここでは実保存ではなく、PoCでの格納イメージをテーブル形式で把握するための段階です。",
  },
];

export default function SidePanel({ currentStep }: SidePanelProps) {
  const sectionShell =
    "overflow-hidden rounded-[18px] border border-stone-200 bg-[#fbfaf7] shadow-[0_8px_28px_rgba(15,23,42,0.05)]";

  const getGuideCardClass = (stepNo: number) => {
    if (stepNo === currentStep) {
      return "border-slate-400 bg-[#f2eee6] shadow-[inset_4px_0_0_0_#475569]";
    }
    if (stepNo < currentStep) {
      return "border-stone-200 bg-[#f8f5ef]";
    }
    return "border-stone-200 bg-white";
  };

  return (
    <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
      <div className={sectionShell + " p-6"}>
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
          Structure
        </p>
        <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-slate-900">
          この画面で行っていること
        </h3>
        <p className="mt-3 text-[15px] leading-9 text-stone-600">
          観察内容を入力し、状態確認からDB見本まで、
          5段階で確認する構成です。
        </p>
      </div>

      <div className={sectionShell + " p-6"}>
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
          Step Guide
        </p>
        <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-slate-900">
          各ステップの見方
        </h3>

        <div className="mt-5 space-y-4">
          {guideItems.map((item) => (
            <div
              key={item.no}
              className={`rounded-[14px] border p-4 transition ${getGuideCardClass(
                item.no
              )}`}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                Step {String(item.no).padStart(2, "0")} / {item.en}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                {item.ja}
              </p>
              <p className="mt-3 text-[14px] leading-8 text-stone-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}