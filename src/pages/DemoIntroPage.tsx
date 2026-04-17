import SiteHeader from "../components/shared/SiteHeader";
import FooterSection from "../components/core/FooterSection";

type Props = {
  setPage: (page: string) => void;
};

const STEPS = [
  "① 状況を書く\n起きた場面を、そのまま書き出します",
  "② 関係のズレが見える\n入力した内容から、関係のズレが整理されます",
  "③ 次の一手を考える\n最初に何を置くかが、順番で見えてきます",
  "④ 記録として残す\n対応と学びを、あとで使える形で残します",
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
            <p style={leadSubStyle}>
              実際に1つの場面を入力しながら、この流れを体験します。
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
              これは自動で判断するツールではありません。関係の状態を整理し、最初の一手を考えやすくするためのデモです。
            </p>
          </div>

          <div style={ctaBlockStyle}>
            <p style={ctaIntroStyle}>
              1つのケースを使って、この流れをそのまま体験できます（約3分）
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
  padding: "48px 24px 72px",
};

const shellStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "96px 0 44px",
};

const heroStyle: React.CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
  textAlign: "center",
};

const eyebrowStyle: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#737373",
  fontWeight: 500,
};

const headlineStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "3.25rem",
  lineHeight: 1.28,
  letterSpacing: "-0.02em",
  fontWeight: 600,
  textAlign: "center",
};

const leadStyle: React.CSSProperties = {
  margin: "28px auto 0",
  maxWidth: 720,
  fontSize: 17,
  lineHeight: 1.95,
  color: "#404040",
  textAlign: "center",
};

const leadSubStyle: React.CSSProperties = {
  margin: "16px auto 0",
  maxWidth: 720,
  fontSize: 17,
  lineHeight: 1.9,
  color: "#525252",
  textAlign: "center",
};

const stepsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 24,
  marginTop: 48,
};

const stepCardStyle: React.CSSProperties = {
  padding: "12px 10px",
};

const stepTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.8,
  color: "#111",
  whiteSpace: "pre-line",
  textAlign: "center",
};

const noteCardStyle: React.CSSProperties = {
  marginTop: 32,
  maxWidth: 720,
  padding: "10px 0 0",
  marginLeft: "auto",
  marginRight: "auto",
};

const noteTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 17,
  lineHeight: 1.95,
  color: "#404040",
  textAlign: "center",
};

const ctaBlockStyle: React.CSSProperties = {
  marginTop: 36,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
};

const ctaIntroStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.9,
  color: "#525252",
  textAlign: "center",
};

const ctaStyle: React.CSSProperties = {
  minHeight: 44,
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
