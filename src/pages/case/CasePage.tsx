type CasePageProps = {
  setPage?: (page: string) => void;
};

export default function CasePage({ setPage }: CasePageProps) {
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
              RA-SS / Case Study
            </p>
            <h1 className="mt-1 text-[15px] font-semibold text-stone-900">
              Case Page
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
              Case Study
            </p>

            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-6xl">
              違和感は、
              <br />
              どのように構造として
              <br />
              扱われるのか。
            </h2>

            <p className="mt-8 max-w-2xl text-[16px] leading-9 text-stone-600">
              ここでは、ひとつの接点事例を通じて、
              違和感が観察・構造化・対応・学習へと接続される流れを示します。
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
                  Observation
                </p>

                <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
                  事例の入口
                </h3>

                <p className="mt-8 max-w-md text-[15px] leading-8 text-stone-600">
                  外来での説明後、患者側に明確な反論はない。
                  しかし、表情の硬さと短い応答に、
                  医療者は小さな違和感を覚える。
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-t border-stone-200 pt-6">
                  <p className="text-[14px] leading-8 text-stone-700">
                    発話としては問題が見えない
                  </p>
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <p className="text-[14px] leading-8 text-stone-700">
                    だが、反応には微細なズレがある
                  </p>
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <p className="text-[14px] leading-8 text-stone-700">
                    それが、最初のシグナルになる
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3efe7] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
                Structuring
              </p>

              <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
                違和感を、
                <br />
                構造として読む。
              </h3>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  Signal
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  表情の硬さ、短い応答、視線の逸れ
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  Delta
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  患者の期待と説明の受け取りに小さな緊張がある
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  APCE Miss
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  見通し提示と意味づけが十分に届いていない
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 md:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
                  Response
                </p>

                <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
                  次の一手を、
                  <br />
                  具体化する。
                </h3>
              </div>

              <div className="space-y-6">
                <div className="border-t border-stone-200 pt-6">
                  <p className="text-[14px] leading-8 text-stone-700">
                    いま何が不安かを、短い問いで確認する
                  </p>
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <p className="text-[14px] leading-8 text-stone-700">
                    手順の再説明ではなく、意味と見通しを言い直す
                  </p>
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <p className="text-[14px] leading-8 text-stone-700">
                    反応の変化を観察し、関係緊張が下がったかをみる
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3efe7] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
                Learning
              </p>

              <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
                事例を、
                <br />
                学びへ変える。
              </h3>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  Before
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  説明は行われていたが、相手の理解状態は捉えられていなかった。
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  After
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  意味と見通しを補足することで、応答がやわらぎ、関係緊張は下がった。
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  Why
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  問題は説明量ではなく、関係状態に対する認識不足だった。
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  Next Asset
                </p>
                <p className="mt-3 text-[15px] leading-8 text-stone-700">
                  「見通し回復」の補助手順として、再利用可能な知見へ整理する。
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
              抽象は、
              <br />
              具体によって支えられる。
            </h3>

            <p className="mx-auto mt-8 max-w-2xl text-[16px] leading-9 text-stone-600">
              RA-SSは思想ではあるが、思想だけではない。
              それは接点の違和感を、観察・構造化・対応・学習へ接続する実践である。
            </p>

            <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setPage?.("lp")}
                className="inline-flex items-center justify-center border border-stone-300 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:bg-[#f7f4ee]"
              >
                LPに戻る
              </button>

              <button
                type="button"
                onClick={() => setPage?.("demo")}
                className="inline-flex items-center justify-center bg-stone-900 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
              >
                DEMOへ
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}