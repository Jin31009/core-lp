type DemoSectionProps = {
  onOpenDemo?: () => void;
};

export default function DemoSection({ onOpenDemo }: DemoSectionProps) {
  const steps = [
    "観察する",
    "構造として読む",
    "次の一手を設計する",
    "経験を学びに変える",
    "記録として残す",
  ];

  return (
    <section className="bg-white px-6 py-28 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
              考え方を、体験できる形にする
            </p>

            <h2 className="text-center text-4xl font-semibold leading-[1.18] tracking-[-0.02em] text-stone-900 md:text-5xl md:text-left">
              まずは、触れてみてください。
            </h2>

            <div className="mx-auto mt-8 max-w-2xl text-[16px] leading-[1.95] text-stone-700 md:mx-0 md:max-w-md md:text-[17px]">
              <p>
                ここまで述べてきた考え方は、
                <br />
                読むだけでは十分ではありません。
              </p>
              <p className="mt-6">
                実際のケースをもとに、
                <br />
                関係の構造をどのように整理し、
                <br />
                どのように次の一手につなげるのか。
              </p>
              <p className="mt-6">
                その入口として、DEMOを用意しています。
              </p>
            </div>

            <div className="mt-16">
              <button
                type="button"
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center bg-stone-900 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition hover:opacity-90"
              >
                DEMOを体験する
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {steps.map((item, index) => (
              <div
                key={item}
                className="border-t border-stone-200 pt-6 first:border-t-0 first:pt-0"
              >
                <div className="grid grid-cols-[56px_1fr] gap-4">
                  <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                    0{index + 1}
                  </div>

                  <div className="text-[15px] leading-7 text-stone-800">
                    {item}
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 border-t border-stone-200 pt-6">
              <p className="text-[14px] leading-8 text-stone-700">
                観察 → 構造化 → 対応 → 学習 → 記録。
                この流れが、個別の経験を再利用可能な知へと変換する。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
