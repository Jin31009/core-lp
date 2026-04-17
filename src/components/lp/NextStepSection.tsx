type NextStepSectionProps = {
  onOpenDemo?: () => void;
  onOpenSlides?: () => void;
  onOpenNotes?: () => void;
  onOpenCase?: () => void;
  onOpenStructure?: () => void;
  onOpenProcess?: () => void;
};

export default function NextStepSection({
  onOpenDemo,
  onOpenSlides,
  onOpenNotes,
  onOpenCase,
  onOpenStructure,
  onOpenProcess,
}: NextStepSectionProps) {
  const items = [
    {
      title: "DEMOを体験する",
      body: "RA-SSの構造を、実際の操作を通じて確認できます。",
      action: onOpenDemo,
    },
    {
      title: "実例を見る",
      body: "ひとつの接点事例を通じて、違和感が構造化される流れを確認できます。",
      action: onOpenCase,
    },
    {
      title: "構造を理解する",
      body: "Signal・Delta・APCEなど、RA-SSの読解フレームを確認できます。",
      action: onOpenStructure,
    },
    {
      title: "運用の流れを見る",
      body: "観察・整理・対応・学習がどのようにプロセスになるかを確認できます。",
      action: onOpenProcess,
    },
    {
      title: "学会発表を見る",
      body: "研究として整理されたRA-SSの構造と実証内容を確認できます。",
      action: onOpenSlides,
    },
    {
      title: "Note原稿を読む",
      body: "背景・思想・実践プロセスを、読み物として辿ることができます。",
      action: onOpenNotes,
    },
  ];

  return (
    <section className="bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
            Next Step
          </p>

          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-5xl">
            次に進む。
          </h2>

          <p className="mt-6 max-w-2xl text-[15px] leading-8 text-stone-600 md:text-[16px] md:leading-9">
            RA-SSは、体験・実例・構造・運用・研究・思想の複数の導線で理解が深まります。
            興味のある方向から、次のステップへ進んでください。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item, index) => (
            <div key={item.title} className="border-t border-stone-200 pt-6">
              <div className="grid grid-cols-[56px_1fr] gap-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  0{index + 1}
                </div>

                <div>
                  <h3 className="text-[18px] font-semibold text-stone-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-7 text-stone-600">
                    {item.body}
                  </p>

                  <button
                    type="button"
                    onClick={item.action}
                    className="mt-6 inline-flex items-center justify-center border border-stone-300 px-5 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-stone-700 transition hover:bg-[#f7f4ee]"
                  >
                    開く
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
