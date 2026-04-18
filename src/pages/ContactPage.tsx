import { useState } from "react";

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
    title: "小さく試す",
    body: "まずは違和感のあるケースをひとつ扱い、DEMO を通して整理します。",
  },
  {
    title: "一緒に振り返る",
    body: "出てきたズレや次の一手を、その場で一緒に見直します。",
  },
  {
    title: "続け方を決める",
    body: "試す価値があるかを確認し、必要なら次の進め方を相談します。",
  },
];

export default function ContactPage({ setPage }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
                  関心を持ったあとに、
                  <br />
                  一緒に試していく入口
                </>
              }
              summary="これは導入ではなく、一緒に試すための入口です。"
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
                    関わり方は、
                    <br />
                    3つあります
                  </>
                }
                summary="大きく始める必要はありません。まずは小さく試し、振り返り、続け方を決めるところから始められます。"
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
              <button
                type="button"
                onClick={() => setPage("demo-intro")}
                className="inline-flex min-h-11 items-center justify-center bg-stone-900 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
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

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className={`mx-auto max-w-2xl border-t border-stone-300 pt-8 ${editorialFigureBlockClass}`}
              >
                <p className="text-center text-[16px] leading-8 text-stone-700">
                  短く共有いただければ十分です。
                  <br />
                  そこから無理のない対話を始めます。
                </p>

                <div className="mt-8 space-y-7 sm:mt-10 sm:space-y-8">
                  <label className="block">
                    <span className="block text-[13px] uppercase tracking-[0.14em] text-stone-500">
                      メールアドレス
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@hospital.jp"
                      className="mt-3 w-full border-0 border-b border-stone-400 bg-transparent px-0 py-3 text-[16px] outline-none placeholder:text-stone-400"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-[13px] uppercase tracking-[0.14em] text-stone-500">
                      一言（任意）
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="気になっていること、試してみたいことなど"
                      className="mt-3 min-h-36 w-full border border-stone-300 bg-white/40 px-4 py-4 text-[15px] leading-7 outline-none placeholder:text-stone-400 sm:min-h-40 sm:text-[16px] sm:leading-8"
                    />
                  </label>
                </div>

                <div className="mt-10 text-center">
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center bg-stone-900 px-7 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition hover:opacity-90"
                  >
                    内容を共有する
                  </button>
                </div>
              </form>
            ) : (
              <div className="mx-auto mt-14 max-w-2xl border-t border-stone-300 pt-8 text-center sm:mt-16">
                <p className="text-[28px] font-semibold tracking-[-0.02em] text-stone-900">
                  ありがとうございます
                </p>
                <p className="mt-5 text-[15px] leading-8 text-stone-700 sm:mt-6 sm:text-[17px] sm:leading-9">
                  内容を受け取りました。
                  <br />
                  ここから、無理のない形で対話を始めていければと思います。
                </p>
              </div>
            )}

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
                <>黒江仁｜医療広報・関係性設計</>
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
