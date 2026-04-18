import FooterSection from "../components/core/FooterSection";
import SectionScrollCue from "../components/core/SectionScrollCue";
import SiteHeader from "../components/shared/SiteHeader";
import EditorialSectionHeader from "../components/shared/EditorialSectionHeader";
import {
  contentWidthClass,
  centeredCtaWidthClass,
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
} from "../components/shared/pageLayout";
import type { Page } from "../types";

const POC_SIGNALS = [
  "違和感を構造として捉えられるか",
  "関係のズレとして整理できるか",
  "次の一手を順番で描けるか",
] as const;

const JUDGMENT_POINTS = [
  {
    title: "現場で使えるか",
    body: "短時間でも扱える",
  },
  {
    title: "構造として残せるか",
    body: "次に参照できる",
  },
  {
    title: "続ける価値があるか",
    body: "次の検証へ進める",
  },
] as const;

export default function PocPage({
  onNavigate,
  onBackPrev,
}: {
  onNavigate: (page: Page) => void;
  onBackPrev: () => void;
}) {
  const handlePageChange = (page: string) => onNavigate(page as Page);

  return (
    <div className={pageShellClass}>
      <SiteHeader setPage={handlePageChange} currentPage="poc" />

      <main className={pageMainClass}>
        <section id="poc-intro" className={`scroll-mt-24 ${heroSectionClass}`}>
          <div className={contentWidthClass}>
            <EditorialSectionHeader
              label="PoC"
              marker="flow"
              hero
              title={
                <>
                  なぜ、PoCが必要なのか。
                  <br />
                  読むだけではなく、
                  <br />
                  小さく確かめるために。
                </>
              }
              summary="このページは、PoC が何を判断するためのものかを、いまのLPと同じ余白中心の誌面構成で整理した入口です。"
            />

            <SectionScrollCue targetId="poc-why" emphasis="soft" subdued />
          </div>
        </section>

        <section id="poc-why" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={contentWidthClass}>
            <div className={`max-w-4xl ${editorialSectionBlockClass}`}>
              <EditorialSectionHeader
                label="WHY POC"
                marker="flow"
                title="PoCが必要な理由"
                summary="確かめたいのは、説明に納得できるかではありません。実際の現場の違和感を前にしたときに、関係のズレが見え、次の一手が立ち上がるかです。"
              />
            </div>

            <div className={`${readingColumnClass} ${editorialBodyBlockClass} border-t border-stone-200`}>
              {[
                "この構想は、理論として読めるだけでは十分ではありません。",
                "実際のケースに触れたときに、感覚的な違和感が構造として整理できるかを見たい。",
                "PoCは、その手触りを小さく確かめるための入口です。",
              ].map((item) => (
                <p key={item} className={`border-b border-stone-200 py-5 ${readingBodyClass}`}>
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="poc-shows" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="poc-shows" className={`scroll-mt-24 ${tintedSectionClass}`}>
          <div className={contentWidthClass}>
            <div className={editorialSectionBlockClass}>
              <EditorialSectionHeader
                label="WHAT THIS SHOWS"
                marker="lines"
                title="このPoCで見たいこと"
                summary="ここで見るのは、PoC が成立するかを見極めるための3つの軸です。"
              />
            </div>

            <div className={`${editorialFigureBlockClass} grid gap-4 md:grid-cols-3`}>
              {POC_SIGNALS.map((item, index) => (
                <div
                  key={item}
                  className="border-t border-stone-300 pt-5"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-[17px] leading-8 text-stone-800">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="poc-case" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="poc-case" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={contentWidthClass}>
            <div className={editorialSectionBlockClass}>
              <EditorialSectionHeader
                label="CASE"
                marker="square"
                title="たとえば、こんな場面です"
                summary="PoC は抽象論ではなく、現場で起きた違和感から何が立ち上がるかを見るためのものです。"
              />
            </div>

            <div className={`${editorialFigureBlockClass} grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start`}>
              <div className="rounded-[28px] border border-stone-300 px-6 py-8 md:px-8 md:py-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  Case Note
                </p>
                <p className="mt-6 text-[22px] font-medium leading-[1.9] text-stone-900 md:text-[26px]">
                  外来で長く待った患者さんから、
                  <br />
                  「説明は受けたけれど、
                  <br />
                  見てもらえていない感じが残った」
                  <br />
                  という言葉が出た。
                </p>
              </div>

              <div className="rounded-[28px] border border-stone-200 px-6 py-4 md:px-8">
                {[
                  {
                    label: "Observation",
                    body: "まず見るのは、クレームの強さではなく、どこで関係のズレが生じたかです。",
                  },
                  {
                    label: "Reframe",
                    body: "「待ち時間の問題」だけでなく、「自分がどう扱われたか」という認識のズレとして読み直します。",
                  },
                  {
                    label: "Next Move",
                    body: "次の一手は謝罪表現の工夫ではなく、どの接点で関係を戻すかを順番で考えることになります。",
                  },
                ].map((item) => (
                  <div key={item.label} className="border-b border-stone-200 py-6 last:border-b-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500">
                      {item.label}
                    </p>
                    <p className="mt-3 text-[16px] leading-8 text-stone-700">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="poc-judgment" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="poc-judgment" className={`scroll-mt-24 ${tintedSectionClass}`}>
          <div className={contentWidthClass}>
            <div className={editorialSectionBlockClass}>
              <EditorialSectionHeader
                label="JUDGMENT"
                marker="double-circle"
                title="このPoCで判断できること"
                summary="ここで得たいのは、続けて試す価値があるかを判断するための最初の確信です。"
              />
            </div>

            <div className={`${editorialFigureBlockClass} grid gap-5 md:grid-cols-3`}>
              {JUDGMENT_POINTS.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-stone-200 px-5 py-5"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-[21px] leading-8 text-stone-900">{item.title}</p>
                  <p className="mt-3 text-[15px] leading-7 text-stone-700">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="poc-next" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="poc-next" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={`${centeredCtaWidthClass} ${editorialSectionBlockClass}`}>
            <EditorialSectionHeader
              label="NEXT"
              marker="triangle"
              title={
                <>
                  読むだけでなく、
                  <br />
                  実際に触って確かめる
                </>
              }
              summary="ここで見ているのは入口です。実際の入力から、ズレの整理と次の一手までをどう辿るかは、DEMO でそのまま確認できます。"
            />

            <div className={`${editorialBodyBlockClass} flex flex-wrap justify-center gap-3`}>
              <button
                type="button"
                onClick={() => onNavigate("demo")}
                className="inline-flex min-h-11 items-center justify-center bg-stone-900 px-8 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
              >
                DEMOを体験する
              </button>

              <button
                type="button"
                onClick={() => onNavigate("contact")}
                className="inline-flex min-h-11 items-center justify-center border border-stone-300 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:bg-[#f7f4ee]"
              >
                一緒に試してみる
              </button>

              <button
                type="button"
                onClick={onBackPrev}
                className="inline-flex min-h-11 items-center justify-center border border-stone-300 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:bg-[#f7f4ee]"
              >
                前のページへ戻る
              </button>
            </div>
          </div>
        </section>
      </main>

      <FooterSection setPage={handlePageChange} />
    </div>
  );
}
