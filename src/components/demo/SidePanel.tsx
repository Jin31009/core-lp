type SidePanelProps = {
  currentStep: number;
};

const stepItems = [
  {
    step: 1,
    title: "観察入力",
    subtitle: "Input",
    description: "観察された内容や違和感を入力します。",
  },
  {
    step: 2,
    title: "確認結果",
    subtitle: "Analysis",
    description: "入力内容をもとに状況を整理します。",
  },
  {
    step: 3,
    title: "次の対応",
    subtitle: "Response",
    description: "ACE＋X / Flow / NG を参考に次の一手を確認します。",
  },
  {
    step: 4,
    title: "ケース記録",
    subtitle: "Case Report",
    description: "事例として記録する内容を整理します。",
  },
  {
    step: 5,
    title: "DB見本",
    subtitle: "DB Sample",
    description: "登録後のデータ構造イメージを確認します。",
  },
];

export default function SidePanel({ currentStep }: SidePanelProps) {
  return (
    <aside className="space-y-6">
      <section className="rounded-2xl border border-neutral-300 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            Step Guide
          </p>
          <h3 className="mt-1 text-lg font-semibold text-neutral-900">
            Guided Editorial Flow
          </h3>
        </div>

        <div className="space-y-3">
          {stepItems.map((item) => {
            const isActive = currentStep === item.step;

            return (
              <div
                key={item.step}
                className={`rounded-xl border p-4 transition-all ${
                  isActive
                    ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                    : "border-neutral-200 bg-neutral-50 text-neutral-700"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={`text-[10px] uppercase tracking-[0.18em] ${
                        isActive ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      Step {item.step}
                    </p>
                    <h4 className="mt-1 text-sm font-semibold">
                      {item.title}
                    </h4>
                    <p
                      className={`mt-1 text-[11px] uppercase tracking-[0.14em] ${
                        isActive ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>

                  <div
                    className={`mt-0.5 h-2.5 w-2.5 rounded-full ${
                      isActive ? "bg-white" : "bg-neutral-300"
                    }`}
                  />
                </div>

                <p
                  className={`mt-3 text-xs leading-5 ${
                    isActive ? "text-neutral-100" : "text-neutral-600"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
