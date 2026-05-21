import SectionScrollCue from "../components/core/SectionScrollCue";
import SiteHeader from "../components/shared/SiteHeader";
import EditorialSectionHeader from "../components/shared/EditorialSectionHeader";
import FooterSection from "../components/core/FooterSection";
import {
  contentWidthClass,
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

const consultationTopics = [
  "広報誌・HP・SNSの役割を整理したい",
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
                  病院広報の相談を、
                  <br />
                  メールでお送りください。
                </>
              }
              summary={
                <>
                  広報誌、ホームページ、SNS、患者さんの声、採用広報、地域連携、AI活用など。
                  <br />
                  まずは、いま一番困っていることを一つだけお聞かせください。
                </>
              }
            />

            <div className="mx-auto mt-10 max-w-2xl text-center">
              <a
                href={consultationMailto}
                className="inline-flex min-h-11 items-center justify-center bg-stone-900 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
              >
                メールで相談する
              </a>
              <p className="mt-5 text-[15px] leading-8 text-stone-600">
                ボタンを押すと、お使いのメールアプリが開きます。まだ内容がまとまっていなくても大丈夫です。
              </p>
            </div>

            <SectionScrollCue targetId="contact-options" emphasis="soft" subdued />
          </div>
        </section>

        <section id="contact-options" className={`scroll-mt-24 ${surfaceSectionClass}`}>
          <div className={contentWidthClass}>
            <section className={editorialSectionBlockClass}>
              <EditorialSectionHeader
                label="TOPICS"
                marker="none"
                title="たとえば、こんなことをご相談いただけます"
                summary="詳しい説明はまだなくても構いません。気になっていることを一つだけ選んでお送りください。"
              />

              <div className={`${editorialFigureBlockClass} mx-auto grid max-w-3xl gap-3 sm:grid-cols-2`}>
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
                  試してから、
                  <br />
                  相談することもできます
                </>
              }
              summary="RA-SS DEMOやPoCを見てから相談したい場合の補助導線です。Contactページの主な入口は、メール相談です。"
            />

            <div className={`${editorialFigureBlockClass} flex flex-wrap justify-center gap-3`}>
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
                <>黒江仁｜病院広報工房</>
              }
              summary="現場と往復しながら、コーディネーター／ファシリテーターとして伴走します。"
            />

            <div className="mx-auto mt-12 max-w-3xl border-t border-stone-200 sm:mt-14">
              {[
                "CORE / CORE_NAVIは、病院広報工房の実証・開発プロジェクトとして進行しています",
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
