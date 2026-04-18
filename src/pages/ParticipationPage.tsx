
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

type ParticipationItem = {
  title: string;
  subtitle: string;
  items: readonly string[];
};

const PARTICIPATION: readonly ParticipationItem[] = [
  {
    title: "OSS / Free",
    subtitle: "無償提供",
    items: [
      "考え方・構造モデルを公開",
      "一部ツールやデモを自由に使う",
      "入口として体験し理解する",
    ],
  },
  {
    title: "Co-Creation",
    subtitle: "協賛・共同開発",
    items: [
      "ケース提供と検証参加",
      "改善提案と知見の還流",
      "共に機能を育てる",
    ],
  },
  {
    title: "Support / Time Fee",
    subtitle: "実費支援",
    items: [
      "設定・伴走・導入準備",
      "PoC設計や運用相談",
      "時間分のみを請求",
    ],
  },
] as const;

export default function ParticipationPage({
  onNavigate,
  onBackPrev,
}: {
  onNavigate: (page: Page) => void;
  onBackPrev: () => void;
}) {
  const handlePageChange = (page: string) => onNavigate(page as Page);

  return (
    <div className={pageShellClass}>
      <SiteHeader setPage={handlePageChange} currentPage="participation" />

      <main className={pageMainClass}>
        <section id="participation-intro" className={`scroll-mt-24 ${heroSectionClass}`}>
          <div className={contentWidthClass}>
            <EditorialSectionHeader
              label="PARTICIPATION"
              marker="none"
              hero
              title="共創で進めるという選択肢"
              summary="完成品を導入するのではなく、現場と往復しながら少しずつ検証し、育てていく関わり方を整理しています。"
            />

            <SectionScrollCue targetId="participation-models" emphasis="soft" subdued />
          </div>
        </section>

        <section id="participation-models" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={`${contentWidthClass} grid gap-10 lg:grid-cols-[0.95fr_1.05fr]`}>
            <div className={editorialSectionBlockClass}>
              <EditorialSectionHeader
                label="PARTICIPATION"
                marker="none"
                title="共創の進め方"
                summary="完成品を導入するのではなく、現場との往復を通じて小さく実証しながら形にしていく関わり方を整理しています。"
              />

              <div className={`${editorialBodyBlockClass} border-t border-black/10`}>
                {[
                  "これは完成品を導入するプロジェクトではありません。",
                  "関係マネジメントという未整備領域を、協賛者と共に検証しながら形にしていく進め方です。",
                  "現在、医療機関の現場で小さく実証が始まっており、共に育てる前提で動いています。",
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

            <div className={`${editorialFigureBlockClass} grid gap-4 md:grid-cols-3`}>
              {PARTICIPATION.map((p) => (
                <ListCard
                  key={p.title}
                  title={`${p.subtitle} / ${p.title}`}
                  items={p.items}
                />
              ))}
            </div>
          </div>

          <div className={`${contentWidthClass} mt-12 flex justify-center`}>
            <SectionScrollCue targetId="participation-next" emphasis="soft" subdued />
          </div>
        </section>

        <section id="participation-next" className={`scroll-mt-24 ${tintedSectionClass}`}>
          <div className={`${contentWidthClass} ${editorialSectionBlockClass}`}>
            <EditorialSectionHeader
              label="NEXT"
              marker="triangle"
              title="次に進むための判断材料"
              summary="まず試すか、検証を見るか、少し戻って整理するかを、このページの終わりで静かに選べるようにしています。"
            />

            <div className={`${editorialFigureBlockClass} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
              <MiniStat title="基本思想" value="共創" note="一緒に設計・検証する" />
              <MiniStat title="提供形態" value="OSS + 協賛" note="開きながら育てる" />
              <MiniStat title="費用" value="Time Fee" note="必要な分だけ支援" />
            </div>

            <div className={`${editorialBodyBlockClass} flex flex-col gap-3 sm:flex-row sm:justify-center`}>
              <LinkButton onClick={() => onNavigate("demo")}>まず試す</LinkButton>
              <LinkButton variant="secondary" onClick={() => onNavigate("poc")}>
                検証を見る
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

function ListCard({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className={figureCardCompactClass}>
      <div className="font-medium leading-7 text-stone-900">{title}</div>
      <ul className="mt-3 list-none space-y-2.5 text-[14px] leading-6 text-stone-600 sm:text-sm">
        {items.map((item) => (
          <li key={item}>・{item}</li>
        ))}
      </ul>
    </div>
  );
}
