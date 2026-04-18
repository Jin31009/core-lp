import SiteHeader from "../components/shared/SiteHeader";
import FooterSection from "../components/core/FooterSection";

type Props = {
  setPage: (page: string) => void;
};

const STEPS = [
  "① 状況を書く\n起きた場面を書き出します",
  "② ズレが見える\n関係のズレを整理します",
  "③ 次の一手を考える\n最初の一歩を見ます",
  "④ 記録として残す\nあとで使える形にします",
];

export default function DemoIntroPage({ setPage }: Props) {
  return (
    <>
      <SiteHeader setPage={setPage} currentPage="demo-intro" />
      <main style={pageStyle}>
        <div style={shellStyle}>
          <div style={heroStyle}>
            <p style={eyebrowStyle}>Demo Orientation</p>
            <h1 style={headlineStyle}>
              現場の「違和感」を書き出すと、
              <br />
              次の一手が見えやすくなる
            </h1>
            <p style={leadStyle}>
              現場で起きた場面を入力すると、関係のズレが整理され、次にどう動くかを順番で確認できます。
            </p>
          </div>

          <div style={stepsGridStyle}>
            {STEPS.map((step) => (
              <div key={step} style={stepCardStyle}>
                <p style={stepTextStyle}>{step}</p>
              </div>
            ))}
          </div>

          <div style={noteCardStyle}>
            <p style={noteTextStyle}>
              自動で判断するのではなく、関係の状態を整理し、最初の一手を考えやすくするためのデモです。
            </p>
          </div>

          <div style={ctaBlockStyle}>
            <p style={ctaIntroStyle}>
              1つのケースで、そのまま体験できます。
            </p>
            <button type="button" onClick={() => setPage("demo")} style={ctaStyle}>
              デモを体験する
            </button>
            <p style={ctaSubStyle}>約3分</p>
          </div>

          <div style={backWrapStyle}>
            <button type="button" onClick={() => setPage("top")} style={backStyle}>
              TOPへ戻る
            </button>
          </div>
        </div>
      </main>
      <FooterSection setPage={setPage} />
    </>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f7f5f2",
  color: "#111",
  padding: "32px 20px 56px",
};

const shellStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "72px 0 40px",
};

const heroStyle: React.CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
  textAlign: "center",
};

const eyebrowStyle: React.CSSProperties = {
  margin: "0 0 16px",
  fontSize: 10,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#737373",
  fontWeight: 500,
};

const headlineStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(2rem, 7.8vw, 3.25rem)",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  fontWeight: 600,
  textAlign: "center",
  textWrap: "balance",
};

const leadStyle: React.CSSProperties = {
  margin: "22px auto 0",
  maxWidth: 680,
  fontSize: "clamp(14px, 3.8vw, 17px)",
  lineHeight: 1.8,
  color: "#404040",
  textAlign: "center",
};

const stepsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 18,
  marginTop: 32,
};

const stepCardStyle: React.CSSProperties = {
  padding: "10px 8px",
};

const stepTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(15px, 3.6vw, 17px)",
  lineHeight: 1.65,
  color: "#111",
  whiteSpace: "pre-line",
  textAlign: "center",
};

const noteCardStyle: React.CSSProperties = {
  marginTop: 18,
  maxWidth: 680,
  padding: "6px 0 0",
  marginLeft: "auto",
  marginRight: "auto",
};

const noteTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(14px, 3.6vw, 16px)",
  lineHeight: 1.8,
  color: "#404040",
  textAlign: "center",
};

const ctaBlockStyle: React.CSSProperties = {
  marginTop: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};

const ctaIntroStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(14px, 3.6vw, 16px)",
  lineHeight: 1.8,
  color: "#525252",
  textAlign: "center",
};

const ctaStyle: React.CSSProperties = {
  minHeight: 44,
  minWidth: 180,
  padding: "0 24px",
  border: "1px solid #171717",
  borderRadius: 999,
  background: "#111",
  color: "#fff",
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
};

const ctaSubStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  color: "#737373",
};

const backWrapStyle: React.CSSProperties = {
  marginTop: 34,
  textAlign: "center",
};

const backStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  padding: 0,
  margin: 0,
  cursor: "pointer",
  fontSize: 14,
  color: "#525252",
};
