type RedefinitionSectionProps = {
  onOpenMethod?: () => void;
  onOpenValue?: () => void;
  onOpenExpansion?: () => void;
};

export default function RedefinitionSection({
  onOpenMethod,
  onOpenValue,
  onOpenExpansion,
}: RedefinitionSectionProps) {
  return (
    <section className="border-y border-stone-200 bg-[#f3efe7] px-6 py-28 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
          広報の起点を、置き直す
        </p>

        <h2 className="text-center text-4xl font-semibold leading-[1.18] tracking-[-0.02em] text-stone-900 md:text-5xl">
          広報は、
          <br />
          関係の状態を整える営みである。
        </h2>

        <p className="mx-auto mt-10 max-w-xl text-[16px] leading-[1.95] text-stone-700 md:text-[17px]">
          広報は、情報を届ける前に、
          <br />
          すでに存在している関係の上で成立しています。
        </p>

        <blockquote className="mx-auto my-36 max-w-3xl border-y border-stone-300 py-10 text-center text-[24px] leading-[2.1] text-stone-700 md:text-[30px]">
          広報とは、情報を届ける前に、
          <br />
          すでに生まれている関係を読む仕事である。
        </blockquote>

        <div className="mx-auto max-w-xl text-[16px] leading-[1.95] text-stone-700 md:text-[17px]">
          <p>
            広報は「伝える技術」ではなく、
          </p>
          <p className="mt-6">
            関係を観察し、整え、変化させる構造として
            <br />
            扱うことができるようになります。
          </p>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onOpenMethod}
            className="border border-stone-300 px-4 py-2 text-[12px] uppercase tracking-[0.16em] text-stone-700 transition hover:bg-white"
          >
            Method
          </button>

          <button
            type="button"
            onClick={onOpenValue}
            className="border border-stone-300 px-4 py-2 text-[12px] uppercase tracking-[0.16em] text-stone-700 transition hover:bg-white"
          >
            Value
          </button>

          <button
            type="button"
            onClick={onOpenExpansion}
            className="border border-stone-300 px-4 py-2 text-[12px] uppercase tracking-[0.16em] text-stone-700 transition hover:bg-white"
          >
            Expansion
          </button>
        </div>
      </div>
    </section>
  );
}
