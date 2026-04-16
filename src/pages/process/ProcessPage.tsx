import SiteHeader from "../../components/shared/SiteHeader";
import EditorialSectionHeader from "../../components/shared/EditorialSectionHeader";
import FooterSection from "../../components/core/FooterSection";

type ProcessPageProps = {
  setPage?: (page: string) => void;
};

export default function ProcessPage({ setPage }: ProcessPageProps) {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-stone-900">
      {setPage && <SiteHeader setPage={setPage} currentPage="process" />}

      <main>
        <section className="bg-white px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-[960px] text-center">
              <EditorialSectionHeader
                label="PROCESS"
                marker="flow"
                hero
                title={
                  <>
                    この方法は、
                    <br />
                    どうすれば
                    <br />
                    再現可能になるのか。
                  </>
                }
                summary="ここでは、違和感の観察がどのように整理され、記録され、次の実践へ引き継がれるのかを見ます。"
              />
            </div>
          </div>
        </section>

        <section className="bg-stone-50/70 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto mb-10 max-w-3xl">
              <EditorialSectionHeader
                label="FLOW"
                marker="flow"
                title="基本フロー"
                summary="その場の対応で終わらせず、次に参照できる流れとして残すための最小単位です。"
              />
            </div>

            <div className="mx-auto mt-12 max-w-3xl divide-y divide-black/8 border-y border-black/8">
              {[
                "観察する",
                "構造として整理する",
                "次の一手を選ぶ",
                "結果をふり返る",
                "学びとして記録する",
              ].map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[56px_1fr] items-start gap-4 py-5 text-left md:grid-cols-[72px_1fr] md:gap-6 md:py-6"
                >
                  <div className="text-[11px] font-medium tracking-[0.18em] text-neutral-400">
                    0{index + 1}
                  </div>
                  <div className="text-[17px] leading-[1.8] text-neutral-800 md:text-[18px]">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-4xl">
              <EditorialSectionHeader
                label="STRUCTURE"
                marker="lines"
                title={
                  <>
                    運用とは、
                    <br />
                    繰り返しを支えることである。
                  </>
                }
                summary="個別対応を一度きりで終わらせず、次の判断に接続できる流れへ変えるための視点です。"
              />

              <div className="mx-auto mt-10 max-w-3xl space-y-2 text-center">
                <div className="border-t border-black/8 pt-4">
                  <p className="text-[16px] leading-[1.95] text-neutral-700 md:text-[17px]">
                    単発の良い対応ではなく、繰り返せる形にする。
                  </p>
                </div>

                <div className="border-t border-black/8 pt-4">
                  <p className="text-[16px] leading-[1.95] text-neutral-700 md:text-[17px]">
                    記録が残ることで、他者も同じ構造を参照できる。
                  </p>
                </div>

                <div className="border-t border-black/8 pt-4">
                  <p className="text-[16px] leading-[1.95] text-neutral-700 md:text-[17px]">
                    それが組織学習へ接続する。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-stone-50/70 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <EditorialSectionHeader
              label="CONTACT"
              marker="none"
              title={
                <>
                  実装は、
                  <br />
                  体験から始まる。
                </>
              }
              summary="流れを読むだけでなく、実際のケースでこの手順がどう立ち上がるかを体験できます。"
            />

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setPage?.("demo-intro")}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-900 px-6 text-[15px] font-medium text-white transition hover:bg-neutral-800"
              >
                体験する
              </button>

              <button
                type="button"
                onClick={() => setPage?.("lp")}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-[15px] font-medium text-neutral-800 transition hover:bg-neutral-50"
              >
                LPに戻る
              </button>
            </div>
          </div>
        </section>
      </main>
      <FooterSection setPage={setPage} />
    </div>
  );
}
