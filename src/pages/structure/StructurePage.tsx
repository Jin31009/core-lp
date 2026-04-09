type StructurePageProps = {
  setPage?: (page: string) => void;
};

export default function StructurePage({ setPage }: StructurePageProps) {
  return (
    <div className="min-h-screen bg-[#f7f4ee] text-stone-900">
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#f7f4ee]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <button
            type="button"
            onClick={() => setPage?.("lp")}
            className="text-left"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400">
              RA-SS / Structure
            </p>
            <h1 className="mt-1 text-[15px] font-semibold text-stone-900">
              Structure Page
            </h1>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage?.("demo")}
              className="inline-flex bg-stone-900 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white transition hover:opacity-90"
            >
              Demo
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-stone-200 bg-[#f2ede3] px-6 py-24 md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.30em] text-stone-400">
              Structure
            </p>

            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-6xl">
              RA-SSは、
              <br />
              違和感を構造として
              <br />
              読むための枠組みである。
            </h2>

            <p className="mt-8 max-w-2xl text-[16px] leading-9 text-stone-600">
              接点で生まれる微細な違和感は、感覚のままでは共有できない。
              RA-SSはそれを、観察可能な要素へ分解し、関係の状態として扱う。
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
                Core Elements
              </p>

              <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
                基本構造
              </h3>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  Signal
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  表情、応答、沈黙、視線、言葉の選び方。違和感の入口となる観察可能な兆候。
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  Delta
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  患者期待と医療側の説明・制約のあいだに生じる関係緊張。
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  APCE
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  認識、手順、文脈、見通し。関係を安定化させるための説明要素。
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  Trigger
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  違和感が顕在化へ向かう転換点。ここで対応の質が分かれる。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3efe7] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
                Reading Frame
              </p>

              <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
                構造は、
                <br />
                次の一手を導くためにある。
              </h3>
            </div>

            <div className="space-y-6">
              <div className="border-t border-stone-200 pt-6">
                <p className="text-[14px] leading-8 text-stone-700">
                  観察だけでは対応に変わらない。
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="text-[14px] leading-8 text-stone-700">
                  構造化されることで、違和感は共有可能になる。
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="text-[14px] leading-8 text-stone-700">
                  共有可能になることで、対応は再現可能になる。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 bg-white px-6 py-24 md:px-10 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
              Next
            </p>

            <h3 className="text-4xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-5xl">
              次は、
              <br />
              運用の流れを見る。
            </h3>

            <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setPage?.("process")}
                className="inline-flex items-center justify-center bg-stone-900 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
              >
                Processへ
              </button>

              <button
                type="button"
                onClick={() => setPage?.("lp")}
                className="inline-flex items-center justify-center border border-stone-300 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:bg-[#f7f4ee]"
              >
                LPに戻る
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}