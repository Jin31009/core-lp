type Props = {
  setPage: (page: string) => void;
};

export default function CtaSection({ setPage }: Props) {
  return (
    <section className="bg-[#f7f5f2] px-6 py-[140px] md:px-12 md:pb-[160px]">
      <div className="mx-auto max-w-[880px] text-center">
        <div className="mx-auto max-w-2xl border-t border-stone-200 pt-6 text-[15px] leading-8 text-stone-600">
          <p>補足：</p>
          <p className="mt-3">この構想は、完成された仕組みではありません。</p>
          <p className="mt-3">
            現場との往復の中で、少しずつ形を整え、
            <br />
            再現可能な構造として定着させていく試みです。
          </p>
        </div>

        <p className="mt-24 text-[11px] uppercase tracking-[0.18em] text-stone-400">
          CTA
        </p>

        <h2 className="mt-6 text-center text-[2.7rem] font-semibold leading-[1.14] tracking-[-0.025em] text-stone-900 md:text-[3.6rem]">
          小さく試すことから、始める。
        </h2>

        <div className="mx-auto mt-10 max-w-2xl text-[16px] leading-[1.95] text-stone-700 md:text-[17px]">
          <p>大きな導入は必要ありません。</p>
          <p className="mt-6">
            まずは小さなケースを通して、
            <br />
            この構造がどのように立ち上がるかを
            <br />
            一緒に確かめていければ十分です。
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setPage("contact")}
            className="border border-black/20 bg-transparent px-[30px] py-[14px] text-[15px] font-medium text-stone-900 transition hover:bg-white/40"
          >
            PoCに参加する
          </button>
        </div>
      </div>
    </section>
  );
}
