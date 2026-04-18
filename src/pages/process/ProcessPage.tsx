import SiteHeader from "../../components/shared/SiteHeader";
import SectionScrollCue from "../../components/core/SectionScrollCue";
import EditorialSectionHeader from "../../components/shared/EditorialSectionHeader";
import FooterSection from "../../components/core/FooterSection";
import {
  contentWidthClass,
  editorialBodyBlockClass,
  editorialFigureBlockClass,
  editorialSectionBlockClass,
  heroSectionClass,
  pageMainClass,
  pageShellClass,
  surfaceSectionClass,
  tintedSectionClass,
} from "../../components/shared/pageLayout";

type ProcessPageProps = {
  setPage?: (page: string) => void;
};

const flowItems = [
  "観察する",
  "構造として整理する",
  "次の一手を選ぶ",
  "結果をふり返る",
  "学びとして記録する",
];

const principles = [
  "単発の良い対応ではなく、繰り返せる形にする。",
  "記録が残ることで、他者も同じ構造を参照できる。",
  "それが組織学習へ接続する。",
];

export default function ProcessPage({ setPage }: ProcessPageProps) {
  return (
    <div className={pageShellClass}>
      {setPage && <SiteHeader setPage={setPage} currentPage="process" />}

      <main className={pageMainClass}>
        <section id="process-intro" className={`scroll-mt-24 ${heroSectionClass}`}>
          <div className={contentWidthClass}>
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
              summary="違和感の観察がどのように整理され、記録され、次の実践へ引き継がれるのかを、LPと同じ誌面構成で辿ります。"
            />

            <SectionScrollCue targetId="process-flow" emphasis="soft" subdued />
          </div>
        </section>

        <section id="process-flow" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={contentWidthClass}>
            <div className={`max-w-3xl ${editorialSectionBlockClass}`}>
              <EditorialSectionHeader
                label="FLOW"
                marker="flow"
                title="基本フロー"
                summary="その場の対応で終わらせず、次に参照できる流れとして残すための最小単位です。"
              />
            </div>

            <div className={`${editorialFigureBlockClass} border-t border-stone-200/70`}>
              {flowItems.map((item, index) => (
                <div
                  key={item}
                  className="grid gap-3 border-b border-stone-200/70 py-6 md:grid-cols-[72px_1fr]"
                >
                  <div className="text-center text-[11px] font-medium tracking-[0.22em] text-stone-400 sm:text-left">
                    0{index + 1}
                  </div>
                  <div className="text-center text-[16px] leading-8 text-stone-800 sm:text-left sm:text-[18px] sm:leading-9">{item}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="process-structure" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="process-structure" className={`scroll-mt-24 ${tintedSectionClass}`}>
          <div className={contentWidthClass}>
            <div className={`max-w-4xl ${editorialSectionBlockClass}`}>
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
            </div>

            <div className={`${editorialFigureBlockClass} grid gap-6 md:grid-cols-3`}>
              {principles.map((item, index) => (
                <div key={item} className="border-t border-stone-200/70 pt-5 sm:pt-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-left text-[16px] leading-8 text-stone-700 sm:text-[18px] sm:leading-9">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="process-next" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="process-next" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={`mx-auto max-w-4xl text-center ${editorialSectionBlockClass}`}>
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

            <div className={`${editorialBodyBlockClass} flex flex-wrap justify-center gap-3`}>
              <button
                type="button"
                onClick={() => setPage?.("demo-intro")}
                className="inline-flex min-h-11 items-center justify-center bg-stone-900 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
              >
                体験する
              </button>

              <button
                type="button"
                onClick={() => setPage?.("top")}
                className="inline-flex min-h-11 items-center justify-center border border-stone-300 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:bg-[#f7f4ee]"
              >
                TOPへ戻る
              </button>
            </div>
          </div>
        </section>
      </main>

      <FooterSection setPage={setPage} />
    </div>
  );
}
