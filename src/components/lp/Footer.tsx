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
              Relational Architecture Sensing System
            </p>

            <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
              違和感を、
              <br />
              関係の構造として扱う。
            </h3>

            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-stone-600">
              RA-SSは、接点で生まれる違和感を観察し、構造として整理し、
              次の一手・学習・記録へ接続するための実践基盤です。
              それは単なる機能ではなく、関係を扱うための編集された方法です。
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
                  TOP
                </button>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="text-left text-[14px] text-stone-600 transition hover:text-stone-900"
                >
                  DEMO
                </button>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-left text-[14px] text-stone-600 transition hover:text-stone-900"
                >
                  CONTACT
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
                  TOP
                </button>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="text-left text-[14px] text-stone-600 transition hover:text-stone-900"
                >
                  DEMO
                </button>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-left text-[14px] text-stone-600 transition hover:text-stone-900"
                >
                  CONTACT
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-6 text-[11px] uppercase tracking-[0.18em] text-stone-400">
          © RA-SS / CORE
        </div>
      </div>
    </footer>
  );
}
