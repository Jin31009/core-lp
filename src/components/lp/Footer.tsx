type FooterProps = {
  onOpenTop?: () => void;
  onOpenDemo?: () => void;
  onOpenContact?: () => void;
};

export default function Footer({
  onOpenTop,
  onOpenDemo,
  onOpenContact,
}: FooterProps) {
  return (
    <footer className="border-t border-stone-200 bg-[#f3efe7]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-stone-400">
              黒江仁｜病院広報工房
            </p>

            <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
              病院広報を、
              <br />
              理解と関係を整える仕組みへ。
            </h3>

            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-stone-600">
              病院広報に35年以上携わってきた黒江仁が、患者さんの声、職員の気づき、病院の理念や専門性を、理解と関係を整える広報へつなぎ直すためのサイトです。
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                Navigate
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={onOpenTop}
                  className="text-left text-[14px] text-stone-600 transition hover:text-stone-900"
                >
                  病院広報工房
                </button>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="text-left text-[14px] text-stone-600 transition hover:text-stone-900"
                >
                  RA-SS DEMO
                </button>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-left text-[14px] text-stone-600 transition hover:text-stone-900"
                >
                  相談する
                </button>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                Flow
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={onOpenTop}
                  className="text-left text-[14px] text-stone-600 transition hover:text-stone-900"
                >
                  病院広報工房
                </button>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="text-left text-[14px] text-stone-600 transition hover:text-stone-900"
                >
                  RA-SS DEMO
                </button>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-left text-[14px] text-stone-600 transition hover:text-stone-900"
                >
                  相談する
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-6 text-[11px] uppercase tracking-[0.18em] text-stone-400">
          CORE / CORE_NAVI は、病院広報工房の実証・開発プロジェクトです。
        </div>
      </div>
    </footer>
  );
}
