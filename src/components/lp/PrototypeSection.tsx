type PrototypeSectionProps = {
  onNavigateDemo?: () => void;
};

const steps = [
  {
    no: "01",
    title: "観察する",
    body: "言葉や違和感、状況を入力する",
  },
  {
    no: "02",
    title: "整理する",
    body: "関係の状態を一次整理する",
  },
  {
    no: "03",
    title: "読み取る",
    body: "ズレや引っかかりを見立てる",
  },
  {
    no: "04",
    title: "つなげる",
    body: "次の理解や対応へ進める",
  },
];

export default function PrototypeSection({
  onNavigateDemo,
}: PrototypeSectionProps) {
  return (
    <section id="demo" className="bg-white px-6 py-28 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
              Prototype
            </p>

            <h2 className="text-4xl font-semibold leading-[1.18] tracking-[-0.02em] text-stone-900 md:text-5xl">
              関係の読み取りを体験する
            </h2>

            <p className="mt-8 max-w-xl text-[16px] leading-[1.95] text-stone-700 md:text-[17px]">
              観察された言葉や状況をもとに、関係の状態を整理し、次の理解へつなげる流れを体験できます。
            </p>

            <div className="mt-14">
              <button
                type="button"
                onClick={onNavigateDemo}
                className="inline-flex items-center justify-center bg-stone-900 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition hover:opacity-90"
              >
                プロトタイプを体験する
              </button>
            </div>
          </div>

          <div className="border-t border-stone-200">
            {steps.map((step) => (
              <div
                key={step.no}
                className="grid gap-4 border-b border-stone-200 py-6 md:grid-cols-[72px_1fr]"
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  {step.no}
                </div>

                <div>
                  <p className="text-[20px] font-semibold tracking-[-0.01em] text-stone-900">
                    {step.title}
                  </p>
                  <p className="mt-2 text-[15px] leading-8 text-stone-600">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
