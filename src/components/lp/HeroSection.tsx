type HeroSectionProps = {
  onOpenDemo?: () => void;
};

export default function HeroSection({ onOpenDemo }: HeroSectionProps) {
  return (
    <section className="border-b border-stone-200 bg-[#f2ede3] px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 border-b border-stone-200 pb-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.30em] text-stone-400">
            RA-SS / Editorial Thesis
          </p>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
            序文
          </p>

          <h1 className="text-center text-[3.8rem] font-semibold leading-[1.16] tracking-[-0.03em] text-stone-900 md:text-[6rem]">
            なぜ、伝えているのに
            <br />
            伝わらないのか。
          </h1>

          <div className="mx-auto mt-16 max-w-xl text-[16px] leading-[1.95] text-stone-600 md:text-[17px]">
            <p>伝えているはずなのに、伝わらない。</p>
            <p className="mt-6">
              正しく対応しているつもりなのに、
              <br />
              関係はなぜか積み上がっていかない。
            </p>
            <p className="mt-6">
              そのズレは、やり方ではなく、
              <br />
              見方そのものにあるのかもしれない。
            </p>
          </div>

          <div className="mt-14">
            <button
              type="button"
              onClick={onOpenDemo}
              className="inline-flex items-center justify-center bg-stone-900 px-8 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
            >
              DEMOを見る
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
