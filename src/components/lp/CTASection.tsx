type CTASectionProps = {
  onOpenDemo?: () => void;
};

export default function CTASection({ onOpenDemo }: CTASectionProps) {
  return (
    <section className="border-t border-stone-200 bg-white px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
          Closing Note
        </p>

        <h2 className="text-4xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-6xl">
          違和感は、
          <br />
          ただの違和感ではない。
        </h2>

        <p className="mx-auto mt-10 max-w-2xl text-[16px] leading-9 text-stone-600">
          それは、関係が変わり始めているという兆しである。
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-[16px] leading-9 text-stone-600">
          もしそれを、構造として扱うことができるなら。
          接点は、経験則ではなく、再現可能な知へ近づいていく。
        </p>

        <div className="mt-14">
          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex items-center justify-center bg-stone-900 px-8 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
          >
            DEMOを体験する
          </button>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-[13px] leading-7 text-stone-500">
          答えを読むのではなく、
          構造が立ち上がる瞬間を体験してください。
        </p>
      </div>
    </section>
  );
}