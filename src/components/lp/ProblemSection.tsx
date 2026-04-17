export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="border-t border-black/8 px-6 py-28 text-center md:px-12 md:py-32"
    >
      <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
        なぜ、実践は積み上がらないのか
      </p>

      <h2 className="text-center text-4xl font-semibold leading-[1.18] tracking-[-0.02em] text-stone-900 md:text-5xl">
        広報は、属人的になりやすい。
      </h2>

      <div className="mx-auto mt-10 max-w-3xl text-[16px] leading-[1.95] text-stone-700 md:text-[17px]">
        <p>うまくいかない場面がある、という話ではありません。</p>
        <p className="mt-6">
          よい実践があっても残らず、共有されず、
          <br />
          次に引き継がれにくい。
        </p>
        <p className="mt-6">
          その結果、組織としての学習は進まず、
          <br />
          同じような対応が繰り返されていきます。
        </p>
      </div>

      <div className="mt-20 mb-4 text-[28px] leading-[2.1] text-stone-900">
        <div>属人性への依存</div>
        <div className="opacity-40">↓</div>
        <div>再現性の欠如</div>
        <div className="opacity-40">↓</div>
        <div>効果測定の不可能性</div>
      </div>

      <p className="mx-auto mt-14 max-w-2xl text-[16px] font-semibold leading-[1.95] text-stone-700 md:text-[17px]">
        これは能力の問題ではなく、構造の問題である。
      </p>
    </section>
  );
}
