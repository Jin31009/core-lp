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
    <section className="border-y border-stone-200 bg-[#f3efe7] px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.30em] text-stone-400">
          Redefinition
        </p>

        <h2 className="text-5xl font-semibold leading-[1.08] tracking-[-0.03em] text-stone-900 md:text-6xl">
          広報は、
          <br />
          関係の状態を整える
          <br />
          体系である。
        </h2>

        <p className="mx-auto mt-16 max-w-xl text-[16px] leading-9 text-stone-600">
          伝える前に、
          関係はすでに存在している。
        </p>

        <p className="mx-auto mt-10 max-w-xl text-[16px] leading-9 text-stone-600">
          その状態を捉えない限り、
          関係は変わらない。
        </p>

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