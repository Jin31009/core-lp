import SectionScrollCue from "../components/core/SectionScrollCue";
import SiteHeader from "../components/shared/SiteHeader";
import EditorialSectionHeader from "../components/shared/EditorialSectionHeader";
import FooterSection from "../components/core/FooterSection";
import {
  contentWidthClass,
  figureCardCompactClass,
  editorialFigureBlockClass,
  editorialSectionBlockClass,
  heroSectionClass,
  pageMainClass,
  pageShellClass,
  surfaceSectionClass,
  tintedSectionClass,
} from "../components/shared/pageLayout";

type Props = {
  setPage: (page: string) => void;
};

const collaborationItems = [
  {
    title: "小さく相談する",
    body: "現在の広報物や課題を一緒に見ながら、どこから整えるとよいかを確認します。",
  },
  {
    title: "一緒に振り返る",
    body: "患者さんの声、職員の気づき、採用・地域連携の課題を整理し、次の一手を考えます。",
  },
  {
    title: "続け方を決める",
    body: "必要に応じて、伴走支援、AI活用、院内勉強会など、無理のない進め方を相談します。",
  },
];

const consultationTopics = [
  "HP・SNS・広報誌の役割を整理したい",
  "患者さんの声や自由記述を活かしたい",
  "採用広報を見直したい",
  "地域連携室と広報をつなげたい",
  "AIを安全に広報へ使いたい",
  "広報担当者のワンオペを軽くしたい",
];

const consultationMailSubject = "病院広報工房への相談";
const consultationMailBody = `病院広報工房への相談です。

【お名前】
【ご所属・病院名】
【ご相談したいこと】
例：広報誌／ホームページ／SNS／患者さんの声／採用広報／地域連携／AI活用 など

【現在困っていること】
【希望する連絡方法】
【その他】`;

const consultationMailto = `mailto:admin@pr-kobo.com?subject=${encodeURIComponent(
  consultationMailSubject,
)}&body=${encodeURIComponent(consultationMailBody)}`;

export default function ContactPage({ setPage }: Props) {

  return (
    <div className={pageShellClass}>
      <SiteHeader setPage={setPage} currentPage="contact" />

      <main className={pageMainClass}>
        <section id="contact-intro" className={`scroll-mt-24 ${heroSectionClass}`}>
          <div className={contentWidthClass}>
            <EditorialSectionHeader
              label="CONTACT"
              marker="none"
              hero
              title={
                <>
                  病院広報の課題を、
                  <br />
                  まず一つからご相談ください。
                </>
              }
              summary={
                <>
                  広報誌、ホームページ、SNS、患者さんの声、採用広報、地域連携、AI活用。
                  <br />
                  すべてを一度に整える必要はありません。
                  <br />
                  いま一番困っていることを、一緒に確認するところから始めます。
                </>
              }
            />

            <SectionScrollCue targetId="contact-options" emphasis="soft" subdued />
          </div>
        </section>

        <section id="contact-options" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={contentWidthClass}>
            <section className={editorialSectionBlockClass}>
              <EditorialSectionHeader
                label="PARTICIPATION"
                marker="none"
                title={
                  <>
                    相談の始め方は、
                    <br />
                    3つあります
                  </>
                }
                summary="大きく始める必要はありません。現在の広報物や気になっている課題を見ながら、無理のない進め方を一緒に決めていきます。"
              />

              <div className={`${editorialFigureBlockClass} grid gap-4 md:grid-cols-3`}>
                {collaborationItems.map((item, index) => (
                  <div
                    key={item.title}
                    className={figureCardCompactClass}
                  >
                    <p className="text-[11px] font-medium tracking-[0.22em] text-stone-400">
                      0{index + 1}
                    </p>
                    <p className="mt-3 text-center text-[19px] font-semibold leading-8 tracking-[-0.018em] text-stone-900 sm:text-left sm:text-[22px] sm:leading-9">
                      {item.title}
                    </p>
                    <p className="mt-3 text-left text-[15px] leading-7 text-stone-700 sm:mt-4 sm:text-[16px] sm:leading-8">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="contact-cta" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="contact-cta" className={`scroll-mt-24 ${tintedSectionClass}`}>
          <div className={`mx-auto max-w-4xl ${editorialSectionBlockClass}`}>
            <EditorialSectionHeader
              label="NEXT"
              marker="triangle"
              title={
                <>
                  まず動いてみるか、
                  <br />
                  少し共有するか
                </>
              }
              summary="DEMO を試す、PoC を読む、あるいは短く共有して対話を始める。そのどれからでも構いません。"
            />

            <div className={`${editorialFigureBlockClass} flex flex-wrap justify-center gap-3`}>
              <a
                href={consultationMailto}
                className="inline-flex min-h-11 items-center justify-center bg-stone-900 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
              >
                メールで相談する
              </a>

              <button
                type="button"
                onClick={() => setPage("demo-intro")}
                className="inline-flex min-h-11 items-center justify-center border border-stone-300 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:bg-[#f7f4ee]"
              >
                DEMOを体験する
              </button>

              <button
                type="button"
                onClick={() => setPage("poc")}
                className="inline-flex min-h-11 items-center justify-center border border-stone-300 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:bg-[#f7f4ee]"
              >
                PoCを見る
              </button>
            </div>

            <section className={`mx-auto max-w-3xl border-t border-stone-300 pt-8 ${editorialFigureBlockClass}`}>
              <EditorialSectionHeader
                label="TOPICS"
                marker="none"
                title="たとえば、こんなことをご相談いただけます"
                summary="まだ整理できていない段階でも構いません。気になっている入口をひとつ選ぶところから始められます。"
              />

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {consultationTopics.map((item) => (
                  <p
                    key={item}
                    className="border border-stone-200 bg-white/50 px-4 py-3 text-[15px] leading-7 text-stone-700"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className={`mx-auto max-w-2xl border-t border-stone-300 pt-8 text-center ${editorialFigureBlockClass}`}>
              <p className="text-[16px] leading-8 text-stone-700">
                ボタンを押すと、お使いのメールアプリが開きます。
                <br />
                まだ内容がまとまっていなくても大丈夫です。
                <br />
                いま一番困っていることを一つだけお送りください。
              </p>

              <a
                href={consultationMailto}
                className="mt-8 inline-flex min-h-11 items-center justify-center bg-stone-900 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
              >
                メールで相談する
              </a>
            </section>

            <div className="mt-12 flex justify-center">
              <SectionScrollCue targetId="contact-close" emphasis="soft" subdued />
            </div>
          </div>
        </section>

        <section id="contact-close" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className="mx-auto max-w-4xl text-center">
            <EditorialSectionHeader
              label="PROFILE"
              marker="square"
              title={
                <>黒江 仁（くろえ ひとし）｜医療広報・関係性設計</>
              }
              summary="現場と往復しながら、コーディネーター／ファシリテーターとして伴走します。"
            />

            <div className="mx-auto mt-12 max-w-3xl border-t border-stone-200 sm:mt-14">
              {[
                "COREプロジェクトとして進行しています",
              ].map((item) => (
                <p key={item} className="border-b border-stone-200 py-4 text-[15px] leading-8 text-stone-700 sm:py-5 sm:text-[17px] sm:leading-9">
                  {item}
                </p>
              ))}
            </div>

            <button
              onClick={() => setPage("top")}
              className="mt-12 inline-flex min-h-11 items-center justify-center border border-stone-300 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-stone-700 transition hover:bg-[#f7f4ee]"
            >
              TOPへ戻る
            </button>
          </div>
        </section>
      </main>

      <FooterSection setPage={setPage} />
    </div>
  );
}
