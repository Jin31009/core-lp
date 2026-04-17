type PrototypeCTASectionProps = {
  onNavigateContact?: () => void;
};

export default function PrototypeCTASection({
  onNavigateContact,
}: PrototypeCTASectionProps) {
  return (
    <section id="next-step" className="bg-[#f3efe7] px-6 py-32 md:px-10 md:py-36">
      <div className="mx-auto max-w-[880px] text-center">
        <p className="text-[11px] uppercase tracking-[0.18em] text-stone-400">
          Contact
        </p>

        <h2 className="mt-6 text-[2.7rem] font-semibold leading-[1.14] tracking-[-0.025em] text-stone-900 md:text-[3.6rem]">
          このアプローチを活用する
        </h2>

        <div className="mx-auto mt-10 max-w-2xl text-[16px] leading-[1.95] text-stone-700 md:text-[17px]">
          <p>
            このプロトタイプはまだ初期段階ですが、関係を扱う実践としての可能性を持っています。関心をお持ちいただけた方は、ぜひご連絡ください。
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={onNavigateContact}
            className="border border-black/20 bg-transparent px-[30px] py-[14px] text-[15px] font-medium text-stone-900 transition hover:bg-white/40"
          >
            お問い合わせ
          </button>
        </div>
      </div>
    </section>
  );
}
