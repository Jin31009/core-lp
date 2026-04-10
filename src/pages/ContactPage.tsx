
import SiteHeader from "../components/shared/SiteHeader";

type Props = {
  setPage: (page: string) => void;
};

export default function ContactPage({ setPage }: Props) {
  const [name, setName] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [participation, setParticipation] = React.useState("話を聞いてみる");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SiteHeader setPage={setPage} />

      <main style={mainStyle}>
        <div style={containerStyle}>
          <p style={labelStyle}>PoC Participation</p>

          <h1 style={titleStyle}>
            この構想は、
            <br />
            まだ途中にあります
          </h1>

          {/* Opening */}
          <section style={sectionStyle}>
            <p style={sectionLabelStyle}>Opening</p>
            <h2 style={sectionTitleStyle}>
              一緒に試しながら、
              <br />
              少しずつ形にしていく
            </h2>

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
            <p style={sectionLabelStyle}>What is PoC</p>
            <h2 style={sectionTitleStyle}>
              これは、完成された仕組みを
              <br />
              導入する場ではありません
            </h2>

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
            <p style={sectionLabelStyle}>Who We Are Looking For</p>
            <h2 style={sectionTitleStyle}>
              このような方と、
              <br />
              ご一緒できると嬉しいです
            </h2>

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

          {/* How it works */}
          <section style={sectionStyle}>
            <p style={sectionLabelStyle}>How It Works</p>
            <h2 style={sectionTitleStyle}>
              進め方は、
              <br />
              とてもシンプルです
            </h2>

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
            <p style={sectionLabelStyle}>Participation</p>
            <h2 style={sectionTitleStyle}>
              関わり方は
              <br />
              いくつかあります
            </h2>

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
            <p style={sectionLabelStyle}>Form</p>
            <h2 style={sectionTitleStyle}>
              小さく共有いただければ
              <br />
              大丈夫です
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} style={formStyle}>
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

          {/* Closing */}
          <section style={sectionStyle}>
            <p style={sectionLabelStyle}>Closing</p>
            <h2 style={sectionTitleStyle}>
              この構想は、
              <br />
              ひとりでは進みません
            </h2>

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
    </>
  );
}

/* ===== styles ===== */

const mainStyle: React.CSSProperties = {
  background: "#f7f5f2",
  color: "#111",
  minHeight: "100vh",
  padding: "160px 48px",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 980,
  margin: "0 auto",
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  opacity: 0.5,
  marginBottom: 28,
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: 44,
  lineHeight: 1.65,
  textAlign: "center",
  marginBottom: 64,
  letterSpacing: "-0.03em",
};

const sectionStyle: React.CSSProperties = {
  marginTop: 96,
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  opacity: 0.48,
  marginBottom: 20,
  textAlign: "center",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 32,
  lineHeight: 1.7,
  textAlign: "center",
  marginBottom: 24,
  letterSpacing: "-0.02em",
};

const textBlockStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
};

const textStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 2,
  opacity: 0.84,
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
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.36)",
  padding: "28px 24px",
  minHeight: 200,
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
  borderTop: "1px solid rgba(0,0,0,0.12)",
  borderBottom: "1px solid rgba(0,0,0,0.12)",
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
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.38)",
  padding: "30px 24px 28px",
  minHeight: 220,
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
  maxWidth: 720,
  margin: "30px auto 0",
  padding: "34px 30px",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.42)",
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
  padding: "14px 30px",
  border: "1px solid rgba(0,0,0,0.22)",
  background: "transparent",
  cursor: "pointer",
  fontSize: 15,
};

const thanksBoxStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "30px auto 0",
  padding: "34px 30px",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.42)",
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
  lineHeight: 2,
  opacity: 0.84,
};

const bottomNavStyle: React.CSSProperties = {
  marginTop: 110,
  textAlign: "center",
};

const ghostButtonStyle: React.CSSProperties = {
  padding: "12px 24px",
  border: "1px solid rgba(0,0,0,0.2)",
  background: "transparent",
  cursor: "pointer",
  fontSize: 15,
};