type ProcessPageProps = {
  setPage?: (page: string) => void;
};

export default function ProcessPage({ setPage }: ProcessPageProps) {
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
              RA-SS / Process
            </p>
            <h1 className="mt-1 text-[15px] font-semibold text-stone-900">
              Process Page
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
              Process
            </p>

            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-6xl">
              違和感は、
              <br />
              どのように運用へ
              <br />
              接続されるのか。
            </h2>

            <p className="mt-8 max-w-2xl text-[16px] leading-9 text-stone-600">
              RA-SSは思想だけではなく、観察・整理・対応・記録の流れを持つ。
              そのプロセスが、個人の経験を組織の知へ変えていく。
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
                Flow
              </p>

              <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
                基本フロー
              </h3>
            </div>

            <div className="space-y-6">
              {[
                "観察する",
                "構造として整理する",
                "次の一手を選ぶ",
                "結果をふり返る",
                "学びとして記録する",
              ].map((item, index) => (
                <div
                  key={item}
                  className="border-t border-stone-200 pt-6 first:border-t-0 first:pt-0"
                >
                  <div className="grid grid-cols-[56px_1fr] gap-4">
                    <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                      0{index + 1}
                    </div>
                    <div className="text-[15px] leading-8 text-stone-700">
                      {item}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f3efe7] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 md:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
                  Operation
                </p>

                <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
                  運用とは、
                  <br />
                  繰り返しを支えることである。
                </h3>
              </div>

              <div className="space-y-6">
                <div className="border-t border-stone-200 pt-6">
                  <p className="text-[14px] leading-8 text-stone-700">
                    単発の良い対応ではなく、繰り返せる形にする。
                  </p>
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <p className="text-[14px] leading-8 text-stone-700">
                    記録が残ることで、他者も同じ構造を参照できる。
                  </p>
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <p className="text-[14px] leading-8 text-stone-700">
                    それが組織学習へ接続する。
                  </p>
                </div>
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
              実装は、
              <br />
              体験から始まる。
            </h3>

            <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setPage?.("demo")}
                className="inline-flex items-center justify-center bg-stone-900 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
              >
                DEMOへ
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