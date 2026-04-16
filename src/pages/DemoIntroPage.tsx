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
    <main style={pageStyle}>
      <div style={shellStyle}>
        <div style={heroStyle}>
          <p style={eyebrowStyle}>Demo Orientation</p>
          <h1 style={headlineStyle}>
            現場の「違和感」を書き出すと、次の一手が見えやすくなる
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
          <button type="button" onClick={() => setPage("corelp")} style={backStyle}>
            ← LPへ戻る
          </button>
        </div>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f7f5f2",
  color: "#111",
  padding: "48px 24px 72px",
};

const shellStyle: React.CSSProperties = {
  maxWidth: 1040,
  margin: "0 auto",
  padding: "52px 40px 44px",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 22,
  background: "linear-gradient(180deg, #fbfaf7 0%, #f4f0e8 100%)",
  boxShadow: "0 16px 42px rgba(15,23,42,0.06)",
};

const heroStyle: React.CSSProperties = {
  maxWidth: 760,
};

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  opacity: 0.5,
};

const headlineStyle: React.CSSProperties = {
  margin: "18px 0 0",
  fontSize: 48,
  lineHeight: 1.18,
  letterSpacing: "-0.03em",
  fontWeight: 600,
};

const leadStyle: React.CSSProperties = {
  margin: "22px 0 0",
  maxWidth: 680,
  fontSize: 22,
  lineHeight: 1.8,
  color: "rgba(17,17,17,0.78)",
};

const leadSubStyle: React.CSSProperties = {
  margin: "14px 0 0",
  maxWidth: 680,
  fontSize: 17,
  lineHeight: 1.8,
  color: "rgba(17,17,17,0.62)",
};

const stepsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  marginTop: 40,
};

const stepCardStyle: React.CSSProperties = {
  padding: "22px 20px",
  borderRadius: 18,
  border: "1px solid rgba(0,0,0,0.08)",
  background: "#fff",
  boxShadow: "0 3px 14px rgba(15,23,42,0.035)",
};

const stepTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.7,
  color: "#111",
  whiteSpace: "pre-line",
};

const noteCardStyle: React.CSSProperties = {
  marginTop: 24,
  padding: "20px 22px",
  borderRadius: 18,
  border: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(255,255,255,0.78)",
};

const noteTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 17,
  lineHeight: 1.9,
  color: "rgba(17,17,17,0.76)",
};

const ctaBlockStyle: React.CSSProperties = {
  marginTop: 34,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 10,
};

const ctaIntroStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.8,
  color: "rgba(17,17,17,0.68)",
};

const ctaStyle: React.CSSProperties = {
  padding: "16px 28px",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 14,
  background: "#111",
  color: "#fff",
  fontSize: 17,
  fontWeight: 500,
  cursor: "pointer",
  boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
};

const ctaSubStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  color: "rgba(17,17,17,0.52)",
};

const backWrapStyle: React.CSSProperties = {
  marginTop: 34,
  paddingTop: 20,
  borderTop: "1px solid rgba(0,0,0,0.08)",
};

const backStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  padding: 0,
  margin: 0,
  cursor: "pointer",
  fontSize: 14,
  color: "rgba(17,17,17,0.62)",
};
