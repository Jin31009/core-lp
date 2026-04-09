type HeroSectionProps = {
  onOpenDemo?: () => void;
};

export default function HeroSection({ onOpenDemo }: HeroSectionProps) {
  return (
    <section className="border-b border-stone-200 bg-[#f2ede3] px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 border-b border-stone-200 pb-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.30em] text-stone-400">
            RA-SS / Editorial Thesis
          </p>
        </div>

        <div className="max-w-4xl">
          <h1 className="text-5xl font-semibold leading-[1.12] tracking-[-0.03em] text-stone-900 md:text-7xl">
            関係の構造に立脚して、
            <br />
            広報を
            <br />
            組み立て直しませんか？
          </h1>

          <p className="mt-10 max-w-xl text-[16px] leading-9 text-stone-600">
            広報は、伝えることから始まっている。
            しかし本来は、関係の状態を捉えることから始まる。
          </p>

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