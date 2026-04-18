
import FooterSection from "../components/core/FooterSection";
import SectionScrollCue from "../components/core/SectionScrollCue";
import SiteHeader from "../components/shared/SiteHeader";
import EditorialSectionHeader from "../components/shared/EditorialSectionHeader";
import {
  contentWidthClass,
  editorialBodyBlockClass,
  figureCardCompactClass,
  editorialFigureBlockClass,
  editorialSectionBlockClass,
  heroSectionClass,
  pageMainClass,
  pageShellClass,
  surfaceSectionClass,
  tintedSectionClass,
} from "../components/shared/pageLayout";
import type { Page } from "../types";

type Card = {
  title: string;
  desc: string;
};

const SLIDE_CARDS: Card[] = [
  { title: "Theory", desc: "RA理論・Δ・Trigger・Pre-Assetの構造" },
  { title: "Observation", desc: "患者ナラティブ分析や構造発見の過程" },
  { title: "Evidence", desc: "図版・論点・検証の流れ" },
  { title: "Bridge", desc: "LPからPoC、さらにRA-SSへ" },
];

const SLIDE_FRAMES: Card[] = [
  { title: "Figure 01", desc: "Relational Architectureの全体構造を示す基礎図版" },
  { title: "Figure 02", desc: "Δ / Trigger / Pre-Asset の連関を示す分析図版" },
  { title: "Figure 03", desc: "PoCとRA-SSへの接続を示す実装イメージ" },
];

export default function SlidesPage({
  onNavigate,
  onBackPrev,
}: {
  onNavigate: (page: Page) => void;
  onBackPrev: () => void;
}) {
  const handlePageChange = (page: string) => onNavigate(page as Page);

  return (
    <div className={pageShellClass}>
      <SiteHeader setPage={handlePageChange} />

      <main className={pageMainClass}>
        <section id="slides-intro" className={`scroll-mt-24 ${heroSectionClass}`}>
          <div className={contentWidthClass}>
            <EditorialSectionHeader
              label="ACADEMIC"
              marker="lines"
              hero
              title="学会発表・研究背景と実証"
              summary="導入前に理解を深めるために、理論・観察・実証の流れを誌面として確認できるページです。"
            />

            <SectionScrollCue targetId="slides-context" emphasis="soft" subdued />
          </div>
        </section>

        <section id="slides-context" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={`${contentWidthClass} grid gap-10 lg:grid-cols-[0.95fr_1.05fr]`}>
            <div className={editorialSectionBlockClass}>
              <EditorialSectionHeader
                label="ACADEMIC"
                marker="lines"
                title="理論と実証の位置づけ"
                summary="導入前に背景を読むためのページとして、理論・観察・実証がどのように接続しているかを整理しています。"
              />

              <div className={`${editorialBodyBlockClass} border-t border-black/10`}>
                {[
                  "ここで扱っているのは、広報表現の改善そのものではなく、その背後にある「関係の設計」です。",
                  "その妥当性は、学会発表として整理された理論・観察・実証の流れの中で確認できます。",
                  "導入前に理解を深めたい場合は、まずこのページで背景と位置づけを把握してください。",
                ].map((item) => (
                  <p
                    key={item}
                    className="border-b border-black/10 py-5 text-left text-[15px] leading-8 text-stone-700 sm:text-[16px]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className={`${editorialFigureBlockClass} grid gap-5`}>
              {SLIDE_CARDS.map((c) => (
                <div key={c.title} className="border-b border-black/10 py-2 pb-5 sm:py-3 sm:pb-6">
                  <div className="font-medium text-stone-900">{c.title}</div>
                  <p className="mt-2.5 text-[14px] leading-6 text-stone-600 sm:text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="slides-assets" className={`scroll-mt-24 ${tintedSectionClass}`}>
          <div className={`${contentWidthClass} ${editorialSectionBlockClass}`}>
            <EditorialSectionHeader
              label="ASSETS"
              marker="square"
              title="判断材料としての図版"
              summary="このページでは、理論背景を読んだあとに何を見ればよいかを、図版単位で静かに整理しています。"
            />

            <div className={`${editorialFigureBlockClass} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
              <MiniStat title="役割" value="判断材料" note="導入前の理解を深める" />
              <MiniStat title="内容" value="理論＋実証" note="抽象ではなく検証ベース" />
              <MiniStat title="次" value="DEMO" note="実際に触って確かめる" />
            </div>

            <div className={`${editorialBodyBlockClass} grid gap-4 sm:grid-cols-2 md:grid-cols-3`}>
              {SLIDE_FRAMES.map((c) => (
                <FrameCard key={c.title} {...c} />
              ))}
            </div>

            <div className={`${editorialBodyBlockClass} flex flex-col gap-3 sm:flex-row sm:justify-center`}>
              <LinkButton onClick={() => onNavigate("demo")}>
                次に、実際に試してみる
              </LinkButton>
              <LinkButton variant="secondary" onClick={onBackPrev}>
                前のページへ戻る
              </LinkButton>
            </div>
          </div>
        </section>
      </main>

      <FooterSection setPage={handlePageChange} />
    </div>
  );
}

function LinkButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  const base = "w-full px-6 py-3 text-sm transition sm:w-auto";
  const style =
    variant === "primary"
      ? "border border-stone-900 bg-stone-900 text-white hover:opacity-90"
      : "border border-stone-300 bg-transparent text-stone-700 hover:bg-[#f7f4ee]";

  return (
    <button type="button" onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  );
}

function MiniStat({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className={figureCardCompactClass}>
      <div className="text-xs tracking-widest text-stone-400">{title}</div>
      <div className="mt-2 text-[19px] font-medium text-stone-900 sm:text-xl">{value}</div>
      <div className="mt-2 text-[12px] leading-6 text-stone-500">{note}</div>
    </div>
  );
}

function FrameCard({ title, desc }: Card) {
  return (
    <div className={figureCardCompactClass}>
      <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-black/10 bg-white px-3 text-[13px] tracking-[0.16em] text-stone-400 sm:text-sm">
        {title}
      </div>
      <div className="mt-4 text-[14px] leading-7 text-stone-600 sm:text-sm">{desc}</div>
    </div>
  );
}
