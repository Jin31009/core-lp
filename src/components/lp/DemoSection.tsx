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
    <section className="bg-white px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
              Demo Experience
            </p>

            <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-5xl">
              構造は、
              <br />
              体験できる。
            </h2>

            <p className="mt-8 max-w-md text-[15px] leading-8 text-stone-600">
              DEMOは機能の説明ではない。
              違和感が観察から記録へと接続されていく、
              その構造そのものを体験するための装置である。
            </p>

            <div className="mt-12">
              <button
                type="button"
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center bg-stone-900 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
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