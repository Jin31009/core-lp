

type Props = {
  setPage: (page: string) => void;
};

export default function PrototypeSection({ setPage }: Props) {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={labelStyle}>Experience</p>

        <div style={scriptWrapStyle}>
          <p style={scriptStyle}>
            ここで必要なのは、
            <br />
            読み足すことではなく
          </p>

          <p style={scriptStrongStyle}>
            実際に体験してみること
            <br />
            それがいちばん早い
          </p>
        </div>

        <p style={noteStyle}>
          デモでは、違和感を書くところから始めて、
          <br />
          関係のズレを見て、次の一手を考え、記録として残す流れをそのまま体験できます。
        </p>

        <div style={ctaWrapStyle}>
          <button
            onClick={() => setPage("demo-intro")}
            style={buttonStyle}
          >
            体験を始める
          </button>
        </div>
      </div>
    </section>
  );
}

/* ===== styles ===== */

const sectionStyle: React.CSSProperties = {
  padding: "40px 48px 140px",
  background: "#f7f5f2",
  color: "#111",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 900,
  margin: "0 auto",
  textAlign: "center",
};

const labelStyle: React.CSSProperties = {
  margin: "0 0 28px",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  opacity: 0.48,
};

const scriptWrapStyle: React.CSSProperties = {
  marginBottom: 36,
};

const scriptStyle: React.CSSProperties = {
  margin: "0 0 18px",
  fontSize: 30,
  lineHeight: 1.9,
  letterSpacing: "-0.02em",
};

const scriptStrongStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 34,
  lineHeight: 1.85,
  letterSpacing: "-0.025em",
  fontWeight: 500,
};

const ctaWrapStyle: React.CSSProperties = {
  marginTop: 28,
};

const noteStyle: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: 640,
  fontSize: 18,
  lineHeight: 1.95,
  opacity: 0.78,
};

const buttonStyle: React.CSSProperties = {
  padding: "14px 30px",
  border: "1px solid rgba(0,0,0,0.22)",
  background: "transparent",
  cursor: "pointer",
  fontSize: 15,
};
