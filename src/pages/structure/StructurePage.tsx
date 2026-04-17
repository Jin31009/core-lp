import SiteHeader from "../../components/shared/SiteHeader";
import EditorialSectionHeader from "../../components/shared/EditorialSectionHeader";
import FooterSection from "../../components/core/FooterSection";

type Props = {
  setPage: (page: string) => void;
};

const conventionalItems = [
  "表現に依存する",
  "経験と勘に依存する",
  "属人的に対応する",
];

const conventionalResults = [
  "再現できない",
  "組織に残らない",
  "学習されない",
];

const relationalItems = [
  "関係の状態を観察する",
  "構造として捉える",
  "介入可能にする",
];

const relationalResults = [
  "再現できる",
  "組織に残る",
  "学習される",
];

const expansionItems = [
  {
    label: "Reframe",
    title: "関係の再認識が始まる",
    body: "不満や違和感を、感情的な反応としてではなく、関係の状態変化として捉え直す。",
  },
  {
    label: "Co-create",
    title: "AIと共に整理し、考える",
    body: "AIは判断を代行する道具ではない。構造化を支援し、人の観察・解釈・判断を補助する共考のパートナーである。",
  },
  {
    label: "Structure",
    title: "組織の技として定着する",
    body: "個人の経験に閉じていた対応が、再現可能な知識となり、次の実践へ引き継がれていく。",
  },
];

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
    <div>
      <p className="text-[12px] uppercase tracking-[0.16em] text-stone-400">{heading}</p>
      <div className="mt-6 border-t border-stone-200">
        {items.map((item) => (
          <p key={item} className="border-b border-stone-200 py-4 text-[18px] leading-9 text-stone-800">
            {item}
          </p>
        ))}
      </div>
      <div className="mt-6 border-t border-stone-300 pt-5">
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
    <div className="min-h-screen bg-[#f7f4ee] text-stone-900">
      <SiteHeader setPage={setPage} currentPage="structure" />

      <main className="pt-20">
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-5xl">
            <EditorialSectionHeader
              label="STRUCTURE"
              marker="lines"
              hero
              title="理論の裏側から、広報の再定義を読む"
              summary="DEMOの背後にある考え方を、TOPページと同じ余白中心の誌面構成で読み解きます。"
            />
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-4xl">
              <EditorialSectionHeader
                label="STRUCTURE"
                marker="lines"
                title={
                  <>
                    広報は、情報ではなく
                    <br />
                    関係の状態として扱われるべきである
                  </>
                }
                summary="この構想全体を支えている論点を、最初に短く確認します。"
              />
            </div>

            <div className="mx-auto mt-16 max-w-3xl border-t border-stone-200">
              {[
                "ここは、DEMOの前提にある考え方を深く読むためのページです。",
                "広報はこれまで、表現力・経験・勘に依存する属人技として扱われてきた。",
                "その結果、再現できず、組織に残らず、学習されにくい。",
                "問題は能力ではなく構造にある。",
                "本構想では広報を「関係の状態を整える体系」として再定義し、観察・分析・介入可能な構造として扱う。",
                "そのためのモデルがRA-SSである。",
              ].map((item) => (
                <p key={item} className="border-b border-stone-200 py-5 text-[17px] leading-9 text-stone-700">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f3efe7] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <EditorialSectionHeader
              label="STRUCTURE"
              marker="lines"
              title="広報の再定義"
              summary="従来の広報観と、関係の状態を扱う構想との差を図ではなく誌面構成として並置します。"
            />

            <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_80px_1fr] lg:items-start">
              <FigureColumn
                heading="Conventional PR"
                items={conventionalItems}
                results={conventionalResults}
              />
              <div className="hidden items-center justify-center text-[32px] text-stone-400 lg:flex">
                →
              </div>
              <FigureColumn
                heading="Relational Architecture"
                items={relationalItems}
                results={relationalResults}
              />
            </div>

            <p className="mx-auto mt-12 max-w-3xl text-center text-[17px] leading-9 text-stone-700">
              広報の課題は、表現力の不足ではない。
              <br />
              関係を扱う構造を持たなかったことにある。
            </p>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl space-y-20">
            <section>
              <EditorialSectionHeader
                label="PROBLEM"
                marker="square"
                title="構造的な課題"
                summary="属人性に依存した広報は、再現性と学習可能性を失いやすくなります。"
              />
              <div className="mt-14 text-center text-[28px] leading-[2.1] text-stone-900">
                <div>属人性への依存</div>
                <div className="opacity-35">↓</div>
                <div>再現性の欠如</div>
                <div className="opacity-35">↓</div>
                <div>効果測定の不可能性</div>
              </div>
              <p className="mt-10 text-center text-[18px] font-semibold leading-9 text-stone-900">
                これは能力の問題ではなく、構造の問題である。
              </p>
            </section>

            <section>
              <EditorialSectionHeader
                label="REDEFINITION"
                marker="double-circle"
                title={
                  <>
                    広報は、
                    <br />
                    関係の状態を整える体系である
                  </>
                }
                summary="本構想では、広報を単なる情報伝達ではなく、関係を整える営みとして捉え直します。"
              />
            </section>

            <section>
              <EditorialSectionHeader
                label="STRUCTURE"
                marker="lines"
                title="関係は、すでに現場に現れている"
                summary="違和感や投書は感情の断片ではなく、関係の状態変化として読み直すことができます。"
              />
              <div className="mx-auto mt-12 max-w-2xl border-y border-stone-200 py-8 text-center text-[21px] leading-10 text-stone-800">
                「待たされた」ではなく、
                <br />
                「見てもらえていない」という認識
              </div>
              <p className="mt-10 text-center text-[17px] leading-9 text-stone-700">
                これは偶然ではなく、
                <br />
                関係構造が変化した結果である。
              </p>
            </section>

            <section>
              <EditorialSectionHeader
                label="METHOD"
                marker="lines"
                title="RA-SS"
                summary="この構造を扱うために、観察と分析と介入を支えるモデルとしてRA-SSを置きます。"
              />
              <p className="mt-12 text-center text-[18px] leading-10 text-stone-700">
                RA-SSは、
                <br />
                関係を構造として捉え、
                <br />
                観察・分析・介入するための視点であり装置である。
              </p>
            </section>

            <section>
              <EditorialSectionHeader
                label="STRUCTURE"
                marker="lines"
                title="関係は、扱える対象になる"
                summary="構造として捉えることで、これまで感覚的だった対応も観察・介入・再現の対象になります。"
              />
              <div className="mx-auto mt-12 max-w-xl border-y border-stone-200 py-6 text-center text-[22px] leading-[1.9] text-stone-900">
                <p>観察できる</p>
                <p>介入できる</p>
                <p>再現できる</p>
              </div>
              <p className="mt-10 text-center text-[17px] leading-9 text-stone-700">
                構造として捉えることで、
                <br />
                関係は「扱えないもの」ではなく、
                <br />
                扱える対象へと変わる。
              </p>
            </section>
          </div>
        </section>

        <section className="bg-[#f3efe7] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <EditorialSectionHeader
              label="STRUCTURE"
              marker="lines"
              title={
                <>
                  構造化された広報は、
                  <br />
                  次の実践へ展開できる
                </>
              }
              summary="構造として残された知見は、次の現場に展開され、組織の技として蓄積されていきます。"
            />

            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {expansionItems.map((item) => (
                <div key={item.label} className="border-t border-stone-300 pt-5">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-stone-400">
                    {item.label}
                  </p>
                  <p className="mt-4 text-[24px] font-semibold leading-10 tracking-[-0.01em] text-stone-900">
                    {item.title}
                  </p>
                  <p className="mt-5 text-[17px] leading-9 text-stone-700">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-[18px] leading-9 text-stone-700">
                属人技は構造化されることで、
                <br />
                個人の経験から、組織の再現可能な力へと転換される。
              </p>
              <button
                onClick={() => setPage("top")}
                className="mt-12 inline-flex min-h-11 items-center justify-center border border-stone-300 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:bg-white"
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
