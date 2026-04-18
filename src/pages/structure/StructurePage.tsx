import SiteHeader from "../../components/shared/SiteHeader";
import SectionScrollCue from "../../components/core/SectionScrollCue";
import EditorialSectionHeader from "../../components/shared/EditorialSectionHeader";
import FooterSection from "../../components/core/FooterSection";
import {
  centeredCtaWidthClass,
  contentWidthClass,
  editorialBodyBlockClass,
  editorialFigureBlockClass,
  editorialSectionBlockClass,
  heroSectionClass,
  pageMainClass,
  pageShellClass,
  readingBodyClass,
  readingColumnClass,
  surfaceSectionClass,
  tintedSectionClass,
  wideContentWidthClass,
} from "../../components/shared/pageLayout";

type Props = {
  setPage: (page: string) => void;
};

function FigureColumn({
  heading,
  items,
  results,
}: {
  heading: string;
  items: string[];
  results: string[];
}) {
  return (
    <div className="rounded-[28px] border border-stone-200 bg-white p-6 md:p-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">{heading}</p>
      <div className="mt-6 border-t border-stone-200">
        {items.map((item) => (
          <p key={item} className="border-b border-stone-200 py-4 text-[16px] leading-8 text-stone-800">
            {item}
          </p>
        ))}
      </div>
      <div className="mt-6 border-t border-stone-200 pt-5">
        {results.map((result, index) => (
          <p
            key={result}
            className={`text-[15px] leading-8 text-stone-600 ${index > 0 ? "mt-2" : ""}`}
          >
            {result}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function StructurePage({ setPage }: Props) {
  return (
    <div className={pageShellClass}>
      <SiteHeader setPage={setPage} currentPage="structure" />

      <main className={pageMainClass}>
        <section id="structure-intro" className={`scroll-mt-24 ${heroSectionClass}`}>
          <div className={contentWidthClass}>
            <EditorialSectionHeader
              label="WHY"
              marker="lines"
              hero
              title="理論の裏側から、広報の再定義を読む"
              summary="DEMOの背後にある考え方を、TOPページと同じ余白中心の誌面構成で読み解きます。"
            />

            <SectionScrollCue targetId="structure-premise" emphasis="soft" subdued />
          </div>
        </section>

        <section id="structure-premise" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={contentWidthClass}>
            <div className={`max-w-4xl ${editorialSectionBlockClass}`}>
              <EditorialSectionHeader
                label="WHAT"
                marker="double-circle"
                title={
                  <>
                    広報は、情報ではなく
                    <br />
                    関係の状態として扱われるべきである
                  </>
                }
                summary="ここで行う再定義は、広報を情報伝達としてではなく、関係の状態を観察し整える実践として捉え直すことです。"
              />
            </div>

            <div className={`${readingColumnClass} ${editorialBodyBlockClass} border-t border-stone-200`}>
              {[
                "広報はこれまで、表現力や経験に依存する属人的な技として扱われがちでした。",
                "その結果、再現しにくく、組織に残らず、次の学びにつながりにくくなります。",
                "必要なのは能力論ではなく、関係を扱える構造として広報を見直すことです。",
              ].map((item) => (
                <p key={item} className={`border-b border-stone-200 py-5 ${readingBodyClass}`}>
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="structure-compare" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="structure-compare" className={`scroll-mt-24 ${tintedSectionClass}`}>
          <div className={wideContentWidthClass}>
            <div className={editorialSectionBlockClass}>
              <EditorialSectionHeader
                label="HOW"
                marker="lines"
                title="違和感を、構造として読む"
                summary="RA-SS は、現場の違和感を感覚のまま終わらせず、関係のズレとして整理し、次の一手へつなぐための枠組みです。"
              />
            </div>

            <div className={`${editorialFigureBlockClass} grid gap-6 lg:grid-cols-[1fr_56px_1fr] lg:items-start`}>
              <FigureColumn
                heading="違和感"
                items={["現場で起きたズレに気づく", "関係の揺れとして観察する", "感情の反応から距離を取る"]}
                results={["観察の起点ができる"]}
              />
              <div className="hidden items-center justify-center text-[26px] text-stone-300 lg:flex">
                →
              </div>
              <FigureColumn
                heading="構造化"
                items={["関係のズレとして整理する", "どこで崩れたかを読む", "次の一手を順番で考える"]}
                results={["介入の方向が見える"]}
              />
            </div>

            <p className="mx-auto mt-12 max-w-3xl text-center text-[17px] leading-9 text-stone-700">
              重要なのは評価ではなく、
              <br />
              違和感から次の行為までをどう立ち上げるかです。
            </p>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="structure-details" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="structure-details" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={contentWidthClass}>
            <div className={`max-w-4xl ${editorialSectionBlockClass}`}>
              <EditorialSectionHeader
                label="SO WHAT"
                marker="lines"
                title="構造として捉えることで、広報は再現可能になる"
                summary="観察し、介入し、記録できるようになることで、広報は属人的な対応から組織の実践へ変わります。"
              />
            </div>

            <div className={`mx-auto max-w-xl rounded-[28px] border border-stone-200 px-6 py-7 text-center text-[21px] leading-[1.9] text-stone-900 ${editorialFigureBlockClass}`}>
              <p>観察できる</p>
              <p>介入できる</p>
              <p>再現できる</p>
            </div>

            <div className={`${readingColumnClass} ${editorialBodyBlockClass} border-t border-stone-200`}>
              {[
                "扱えなかった違和感が、観察と介入の対象になります。",
                "その記録が残ることで、個人の判断は次の実践へ引き継げる知識になります。",
                "ここで目指しているのは、広報を再現できる実践として組織に残すことです。",
              ].map((item) => (
                <p key={item} className={`border-b border-stone-200 py-5 ${readingBodyClass}`}>
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="structure-next" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="structure-evidence" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={contentWidthClass}>
            <div className={`max-w-3xl ${editorialSectionBlockClass}`}>
              <EditorialSectionHeader
                label="EVIDENCE"
                marker="square"
                title="進行中の実証"
                summary="構造の説明に留まらず、実際の現場で検証が進められています。"
              />
            </div>

            <div className={`${readingColumnClass} ${editorialBodyBlockClass} border-t border-stone-200`}>
              {[
                "国内基幹病院にてPoC進行中",
                "日本医療マネジメント学会 愛知県大会",
                "発表準備中",
              ].map((item) => (
                <p key={item} className={`border-b border-stone-200 py-5 ${readingBodyClass}`}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="structure-next" className={`scroll-mt-24 ${tintedSectionClass}`}>
          <div className={`${centeredCtaWidthClass} ${editorialSectionBlockClass}`}>
            <EditorialSectionHeader
              label="NEXT"
              marker="triangle"
              title="実際にどう機能するかは、事例で確認できます"
              summary="理論の位置づけを読んだあとに、実際のケースを通してどう立ち上がるかを見られます。"
            />

            <div className={`${editorialBodyBlockClass} flex justify-center`}>
              <button
                onClick={() => setPage("poc")}
                className="inline-flex min-h-11 items-center justify-center border border-stone-300 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:bg-white"
              >
                事例を見る
              </button>
            </div>
          </div>
        </section>
      </main>

      <FooterSection setPage={setPage} />
    </div>
  );
}
