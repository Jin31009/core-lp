import { useState } from "react";

import SiteHeader from "../components/shared/SiteHeader";
import EditorialSectionHeader from "../components/shared/EditorialSectionHeader";
import FooterSection from "../components/core/FooterSection";

type Props = {
  setPage: (page: string) => void;
};

const whoItems = [
  {
    title: "違和感を持っている方",
    body: "日々の現場の中で、小さな違和感を感じている方。",
  },
  {
    title: "限界を感じている方",
    body: "広報やコミュニケーションが、情報だけでは扱えないと感じている方。",
  },
  {
    title: "小さく試せる方",
    body: "無理のない範囲で、小さく試す環境をお持ちの方。",
  },
];

const participationItems = [
  {
    label: "01",
    title: "話を聞いてみる",
    body: "まずは内容を知りたい、という方。",
  },
  {
    label: "02",
    title: "小さく試してみる",
    body: "ご自身の現場で、一部だけ試してみたい方。",
  },
  {
    label: "03",
    title: "一緒に設計する",
    body: "継続的に関わりながら、構造を整えていきたい方。",
  },
];

export default function ContactPage({ setPage }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [participation, setParticipation] = useState("話を聞いてみる");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-stone-900">
      <SiteHeader setPage={setPage} currentPage="contact" />

      <main className="pt-20">
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-5xl">
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
              summary="このページは、LPの延長として、RA-SS を小さく試しながら対話を始めるための入口を整理しています。"
            />
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl space-y-20">
            <section>
              <EditorialSectionHeader
                label="CONTACT"
                marker="none"
                title={
                  <>
                    この構想は、
                    <br />
                    現場との往復で育てていく
                  </>
                }
                summary="完成品を渡すのではなく、現場との往復を通じて少しずつ形にしていく前提を共有します。"
              />

              <div className="mx-auto mt-14 max-w-3xl border-t border-stone-200">
                {[
                  "広報を、関係の状態として捉えるという試みは、まだ完成されたものではありません。",
                  "むしろ、現場との往復の中で、少しずつ形になりつつある段階にあります。",
                  "だからこそ、一緒に試しながら考えていく余地があります。",
                ].map((item) => (
                  <p key={item} className="border-b border-stone-200 py-5 text-[17px] leading-9 text-stone-700">
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <EditorialSectionHeader
                label="STRUCTURE"
                marker="lines"
                title={
                  <>
                    これは、完成された仕組みを
                    <br />
                    導入する場ではありません
                  </>
                }
                summary="ここで確かめたいのは、関係の状態をどう観察し、どう扱えるかという構造そのものです。"
              />

              <div className="mx-auto mt-14 max-w-3xl border-t border-stone-200">
                {[
                  "ここで行いたいのは、関係の状態を観察すること、それを構造として整理すること、そこから次の関係行為を考えることです。",
                  "RA-SS DEMOは、そのための道具として機能しますが、答えを代わりに出すものではありません。",
                  "あくまで、関係をどう扱えるかを確かめるための試行の場です。",
                ].map((item) => (
                  <p key={item} className="border-b border-stone-200 py-5 text-[17px] leading-9 text-stone-700">
                    {item}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="bg-[#f3efe7] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <EditorialSectionHeader
              label="CONTACT"
              marker="none"
              title={
                <>
                  このような方と、
                  <br />
                  ご一緒できると嬉しいです
                </>
              }
              summary="大きな導入前提ではなく、小さく違和感を持ち寄れる方との対話を想定しています。"
            />

            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {whoItems.map((item) => (
                <div key={item.title} className="border-t border-stone-300 pt-5">
                  <p className="text-[24px] font-semibold leading-10 tracking-[-0.01em] text-stone-900">
                    {item.title}
                  </p>
                  <p className="mt-5 text-[17px] leading-9 text-stone-700">{item.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-center text-[17px] leading-9 text-stone-700">
              特別な準備は必要ありません。
              <br />
              ただ、「少し試してみたい」という関心があれば十分です。
            </p>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl space-y-20">
            <section>
              <EditorialSectionHeader
                label="PROTOTYPE"
                marker="triangle"
                title={
                  <>
                    進め方は、
                    <br />
                    とてもシンプルです
                  </>
                }
                summary="まずは小さなケースを扱い、DEMO を通して整理し、その場で一緒に振り返ります。"
              />

              <div className="mx-auto mt-14 max-w-xl border-y border-stone-200 py-6 text-center text-[22px] leading-[1.9] text-stone-900">
                <div>小さなケースを扱う</div>
                <div className="opacity-35">↓</div>
                <div>DEMOを使って整理する</div>
                <div className="opacity-35">↓</div>
                <div>一緒に振り返る</div>
              </div>

              <p className="mt-10 text-center text-[17px] leading-9 text-stone-700">
                大きな導入や設計は行いません。
                <br />
                まずは小さく始め、その中で見えてきたものを少しずつ次の形にしていきます。
              </p>
            </section>

            <section>
              <EditorialSectionHeader
                label="CONTACT"
                marker="none"
                title={
                  <>
                    関わり方は
                    <br />
                    いくつかあります
                  </>
                }
                summary="話を聞くところから、小さく試すこと、一緒に設計することまで、関わり方は段階的に選べます。"
              />

              <div className="mt-16 grid gap-10 md:grid-cols-3">
                {participationItems.map((item) => (
                  <div key={item.label} className="border-t border-stone-200 pt-5">
                    <p className="text-[11px] font-medium tracking-[0.22em] text-stone-400">
                      {item.label}
                    </p>
                    <p className="mt-4 text-[24px] font-semibold leading-10 tracking-[-0.01em] text-stone-900">
                      {item.title}
                    </p>
                    <p className="mt-5 text-[17px] leading-9 text-stone-700">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="mt-12 text-center text-[17px] leading-9 text-stone-700">
                どの段階からでも構いません。
                <br />
                無理のない形で関わっていただければ十分です。
              </p>
            </section>
          </div>
        </section>

        <section className="bg-[#f3efe7] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-4xl">
            <EditorialSectionHeader
              label="CONTACT"
              marker="none"
              title={
                <>
                  小さく共有いただければ
                  <br />
                  大丈夫です
                </>
              }
              summary="まずは簡単な共有だけで十分です。そこから無理のない対話を始めます。"
            />

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-2xl border-t border-stone-300 pt-8">
                <p className="text-center text-[16px] leading-8 text-stone-700">
                  ご関心をお持ちいただけた方は、メールアドレスをご記入ください。
                  <br />
                  詳細のご案内をお送りします。
                </p>

                <div className="mt-10 space-y-8">
                  <label className="block">
                    <span className="block text-[13px] uppercase tracking-[0.14em] text-stone-500">
                      お名前（または仮名）
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="例）黒江 仁"
                      className="mt-3 w-full border-0 border-b border-stone-400 bg-transparent px-0 py-3 text-[16px] outline-none placeholder:text-stone-400"
                    />
                  </label>

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
                      所属（任意）
                    </span>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="例）医療機関名 / 団体名 / 個人"
                      className="mt-3 w-full border-0 border-b border-stone-400 bg-transparent px-0 py-3 text-[16px] outline-none placeholder:text-stone-400"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-[13px] uppercase tracking-[0.14em] text-stone-500">
                      関わり方
                    </span>
                    <select
                      value={participation}
                      onChange={(e) => setParticipation(e.target.value)}
                      className="mt-3 w-full border-0 border-b border-stone-400 bg-transparent px-0 py-3 text-[16px] outline-none"
                    >
                      <option>話を聞いてみる</option>
                      <option>小さく試してみる</option>
                      <option>一緒に設計する</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="block text-[13px] uppercase tracking-[0.14em] text-stone-500">
                      一言（任意）
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="気になっていること、試してみたいことなど"
                      className="mt-3 min-h-40 w-full border border-stone-300 bg-white/40 px-4 py-4 text-[16px] leading-8 outline-none placeholder:text-stone-400"
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
              <div className="mx-auto mt-16 max-w-2xl border-t border-stone-300 pt-8 text-center">
                <p className="text-[28px] font-semibold tracking-[-0.02em] text-stone-900">
                  ありがとうございます
                </p>
                <p className="mt-6 text-[17px] leading-9 text-stone-700">
                  内容を受け取りました。
                  <br />
                  ここから、無理のない形で対話を始めていければと思います。
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <EditorialSectionHeader
              label="CONTACT"
              marker="none"
              title={
                <>
                  この構想は、
                  <br />
                  ひとりでは進みません
                </>
              }
              summary="ここまでの蓄積はありますが、実装可能な形にするには現場との往復が欠かせません。"
            />

            <div className="mx-auto mt-14 max-w-3xl border-t border-stone-200">
              {[
                "ここまでの積み重ねはありますが、まだ十分とは言えません。",
                "だからこそ、現場とともに試しながら、関係の構造として扱える形を整えていきたいと考えています。",
                "このページは、その最初の接点のひとつです。",
              ].map((item) => (
                <p key={item} className="border-b border-stone-200 py-5 text-[17px] leading-9 text-stone-700">
                  {item}
                </p>
              ))}
            </div>

            <button
              onClick={() => setPage("corelp")}
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
