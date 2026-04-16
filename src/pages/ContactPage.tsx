import { useState } from "react";

import SiteHeader from "../components/shared/SiteHeader";
import EditorialSectionHeader from "../components/shared/EditorialSectionHeader";
import FooterSection from "../components/core/FooterSection";

type Props = {
  setPage: (page: string) => void;
};

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
    <>
      <SiteHeader setPage={setPage} currentPage="contact" />

      <main style={mainStyle}>
        <div style={containerStyle}>
          <section style={emphasisSectionStyle}>
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
              summary="このページでは、RA-SS を小さく試しながら対話を始めるための入り口を整理しています。"
            />
          </section>

          <div style={baseBandStyle}>
            {/* Opening */}
            <section style={sectionStyle}>
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

              <div style={textBlockStyle}>
                <p style={textStyle}>
                  広報を、関係の状態として捉えるという試みは、
                  <br />
                  まだ完成されたものではありません。
                </p>

                <p style={textStyle}>
                  むしろ、現場との往復の中で、
                  <br />
                  少しずつ形になりつつある段階にあります。
                </p>

                <p style={textStyle}>
                  だからこそ、
                  <br />
                  一緒に試しながら考えていく余地があります。
                </p>
              </div>
            </section>

            {/* What is PoC */}
            <section style={sectionStyle}>
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

              <div style={textBlockStyle}>
                <p style={textStyle}>
                  ここで行いたいのは、
                  <br />
                  関係の状態を観察すること、
                  <br />
                  それを構造として整理すること、
                  <br />
                  そこから次の関係行為を考えることです。
                </p>

                <p style={textStyle}>
                  RA-SS DEMOは、そのための道具として機能しますが、
                  <br />
                  答えを代わりに出すものではありません。
                </p>

                <p style={textStyle}>
                  あくまで、
                  <br />
                  関係をどう扱えるかを確かめるための
                  <br />
                  試行の場です。
                </p>
              </div>
            </section>

            {/* Who */}
            <section style={sectionStyle}>
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

              <div style={cardWrapStyle}>
                <div style={cardStyle}>
                  <p style={cardTitleStyle}>違和感を持っている方</p>
                  <p style={cardTextStyle}>
                    日々の現場の中で、
                    <br />
                    小さな違和感を感じている方
                  </p>
                </div>

                <div style={cardStyle}>
                  <p style={cardTitleStyle}>限界を感じている方</p>
                  <p style={cardTextStyle}>
                    広報やコミュニケーションが、
                    <br />
                    情報だけでは扱えないと感じている方
                  </p>
                </div>

                <div style={cardStyle}>
                  <p style={cardTitleStyle}>小さく試せる方</p>
                  <p style={cardTextStyle}>
                    無理のない範囲で、
                    <br />
                    小さく試す環境をお持ちの方
                  </p>
                </div>
              </div>

              <p style={textStyle}>
                特別な準備は必要ありません。
                <br />
                ただ、「少し試してみたい」という関心があれば十分です。
              </p>
            </section>
          </div>

          <div style={frameBandStyle}>
            {/* How it works */}
            <section style={sectionStyle}>
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

              <div style={flowWrapStyle}>
                <div style={flowItemStyle}>小さなケースを扱う</div>
                <div style={flowArrowStyle}>↓</div>
                <div style={flowItemStyle}>DEMOを使って整理する</div>
                <div style={flowArrowStyle}>↓</div>
                <div style={flowItemStyle}>一緒に振り返る</div>
              </div>

              <p style={textStyle}>
                大きな導入や設計は行いません。
                <br />
                まずは小さく始め、
                <br />
                その中で見えてきたものを少しずつ次の形にしていきます。
              </p>
            </section>

            {/* Participation */}
            <section style={sectionStyle}>
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

              <div style={participationGridStyle}>
                <div style={participationCardStyle}>
                  <p style={participationNumberStyle}>01</p>
                  <p style={participationTitleStyle}>話を聞いてみる</p>
                  <p style={participationTextStyle}>
                    まずは内容を知りたい、
                    <br />
                    という方
                  </p>
                </div>

                <div style={participationCardStyle}>
                  <p style={participationNumberStyle}>02</p>
                  <p style={participationTitleStyle}>小さく試してみる</p>
                  <p style={participationTextStyle}>
                    ご自身の現場で、
                    <br />
                    一部だけ試してみたい方
                  </p>
                </div>

                <div style={participationCardStyle}>
                  <p style={participationNumberStyle}>03</p>
                  <p style={participationTitleStyle}>一緒に設計する</p>
                  <p style={participationTextStyle}>
                    継続的に関わりながら、
                    <br />
                    構造を整えていきたい方
                  </p>
                </div>
              </div>

              <p style={textStyle}>
                どの段階からでも構いません。
                <br />
                無理のない形で関わっていただければ十分です。
              </p>
            </section>

            {/* Form */}
            <section style={sectionStyle}>
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
                <form onSubmit={handleSubmit} style={formStyle}>
                  <p style={formLeadStyle}>
                    ご関心をお持ちいただけた方は、メールアドレスをご記入ください。
                    <br />
                    詳細のご案内をお送りします。
                  </p>

                  <div style={fieldStyle}>
                    <label style={fieldLabelStyle}>お名前（または仮名）</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="例）黒江 仁"
                      style={inputStyle}
                    />
                  </div>

                  <div style={fieldStyle}>
                    <label style={fieldLabelStyle}>メールアドレス</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@hospital.jp"
                      style={inputStyle}
                    />
                  </div>

                  <div style={fieldStyle}>
                    <label style={fieldLabelStyle}>所属（任意）</label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="例）医療機関名 / 団体名 / 個人"
                      style={inputStyle}
                    />
                  </div>

                  <div style={fieldStyle}>
                    <label style={fieldLabelStyle}>関わり方</label>
                    <select
                      value={participation}
                      onChange={(e) => setParticipation(e.target.value)}
                      style={selectStyle}
                    >
                      <option>話を聞いてみる</option>
                      <option>小さく試してみる</option>
                      <option>一緒に設計する</option>
                    </select>
                  </div>

                  <div style={fieldStyle}>
                    <label style={fieldLabelStyle}>一言（任意）</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="気になっていること、試してみたいことなど"
                      style={textareaStyle}
                    />
                  </div>

                  <div style={formButtonWrapStyle}>
                    <button type="submit" style={buttonStyle}>
                      内容を共有する
                    </button>
                  </div>
                </form>
              ) : (
                <div style={thanksBoxStyle}>
                  <p style={thanksTitleStyle}>ありがとうございます</p>
                  <p style={thanksTextStyle}>
                    内容を受け取りました。
                    <br />
                    ここから、無理のない形で対話を始めていければと思います。
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Closing */}
          <section style={closingEmphasisStyle}>
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

            <div style={textBlockStyle}>
              <p style={textStyle}>
                ここまでの積み重ねはありますが、
                <br />
                まだ十分とは言えません。
              </p>

              <p style={textStyle}>
                だからこそ、
                <br />
                現場とともに試しながら、
                <br />
                関係の構造として扱える形を整えていきたいと考えています。
              </p>

              <p style={textStyle}>
                このページは、
                <br />
                その最初の接点のひとつです。
              </p>
            </div>
          </section>

          <div style={bottomNavStyle}>
            <button onClick={() => setPage("corelp")} style={ghostButtonStyle}>
              TOPへ戻る
            </button>
          </div>
        </div>
      </main>
      <FooterSection setPage={setPage} />
    </>
  );
}


/* ===== styles ===== */

const mainStyle: React.CSSProperties = {
  background: "#f7f5f2",
  color: "#111",
  minHeight: "100vh",
  padding: "128px 24px 96px",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
};

const emphasisSectionStyle: React.CSSProperties = {
  background: "#fff",
  padding: "160px 24px 112px",
};

const baseBandStyle: React.CSSProperties = {
  background: "rgba(245,245,244,0.7)",
  marginTop: 88,
  padding: "56px 32px",
};

const frameBandStyle: React.CSSProperties = {
  background: "#fff",
  marginTop: 88,
  padding: "56px 32px",
};

const closingEmphasisStyle: React.CSSProperties = {
  background: "rgba(245,245,244,0.7)",
  marginTop: 88,
  padding: "56px 32px",
};

const sectionStyle: React.CSSProperties = {
  marginTop: 88,
};

const textBlockStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
};

const textStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.95,
  color: "#404040",
  textAlign: "center",
  margin: "0 0 14px",
};

const cardWrapStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 24,
  marginTop: 36,
  marginBottom: 28,
};

const cardStyle: React.CSSProperties = {
  padding: "10px 14px",
  minHeight: 0,
};

const cardTitleStyle: React.CSSProperties = {
  margin: "0 0 14px",
  fontSize: 22,
  lineHeight: 1.6,
  textAlign: "center",
};

const cardTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.9,
  opacity: 0.84,
  textAlign: "center",
};

const flowWrapStyle: React.CSSProperties = {
  maxWidth: 560,
  margin: "30px auto",
  padding: "26px 22px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
};

const flowItemStyle: React.CSSProperties = {
  margin: "0 0 12px",
  textAlign: "center",
  fontSize: 22,
  lineHeight: 1.9,
};

const flowArrowStyle: React.CSSProperties = {
  margin: "0 0 12px",
  textAlign: "center",
  fontSize: 24,
  lineHeight: 1.6,
  opacity: 0.32,
};

const participationGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 24,
  marginTop: 36,
  marginBottom: 28,
};

const participationCardStyle: React.CSSProperties = {
  padding: "10px 14px",
  minHeight: 0,
};

const participationNumberStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  opacity: 0.62,
  textAlign: "center",
};

const participationTitleStyle: React.CSSProperties = {
  margin: "0 0 14px",
  fontSize: 22,
  lineHeight: 1.6,
  textAlign: "center",
};

const participationTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.9,
  opacity: 0.86,
  textAlign: "center",
};

const formStyle: React.CSSProperties = {
  maxWidth: 640,
  margin: "30px auto 0",
  padding: "34px 30px",
  border: "1px solid rgba(0,0,0,0.05)",
  background: "rgba(255,255,255,0.75)",
  borderRadius: 28,
};

const formLeadStyle: React.CSSProperties = {
  margin: "0 0 24px",
  fontSize: 16,
  lineHeight: 1.9,
  color: "#404040",
  textAlign: "center",
};

const fieldStyle: React.CSSProperties = {
  marginBottom: 22,
};

const fieldLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 14,
  marginBottom: 10,
  opacity: 0.78,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontSize: 16,
  border: "1px solid rgba(0,0,0,0.14)",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontSize: 16,
  border: "1px solid rgba(0,0,0,0.14)",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 160,
  padding: "14px 16px",
  fontSize: 16,
  lineHeight: 1.8,
  border: "1px solid rgba(0,0,0,0.14)",
  background: "#fff",
  outline: "none",
  resize: "vertical",
  boxSizing: "border-box",
};

const formButtonWrapStyle: React.CSSProperties = {
  marginTop: 34,
  textAlign: "center",
};

const buttonStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 24px",
  border: "1px solid #171717",
  background: "#171717",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 500,
  color: "#fff",
  borderRadius: 999,
};

const thanksBoxStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "30px auto 0",
  padding: "34px 30px",
  border: "1px solid rgba(0,0,0,0.05)",
  background: "rgba(255,255,255,0.75)",
  borderRadius: 28,
  textAlign: "center",
};

const thanksTitleStyle: React.CSSProperties = {
  margin: "0 0 16px",
  fontSize: 24,
  lineHeight: 1.6,
};

const thanksTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 17,
  lineHeight: 1.95,
  color: "#404040",
};

const bottomNavStyle: React.CSSProperties = {
  marginTop: 110,
  textAlign: "center",
};

const ghostButtonStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 24px",
  border: "1px solid #d4d4d4",
  background: "#fff",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 500,
  color: "#262626",
  borderRadius: 999,
};
