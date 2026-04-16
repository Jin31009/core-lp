
type Props = {
  setPage: (page: string) => void;
};

export default function HeroSection({ setPage }: Props) {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={labelRowStyle}>
          <span style={dotStyle} />
          <span>CORE</span>
        </div>

        <h1 style={titleStyle}>
          病院広報は、
          <br />
          伝えるものだと
          <br />
          思っていませんか。
        </h1>

        <p style={summaryStyle}>
          RA-SSは、現場で起きる違和感を関係の状態として読み直し、
          次の一手と記録につなげるための枠組みです。
        </p>

        <div style={ctaWrapStyle}>
          <button
            type="button"
            onClick={() => setPage("demo-intro")}
            style={primaryButtonStyle}
          >
            まず体験する
          </button>

          <button
            type="button"
            onClick={() => setPage("structure")}
            style={secondaryButtonStyle}
          >
            理論の裏側を見る
          </button>
        </div>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: "160px 24px 112px",
  background: "#ffffff",
  color: "#111",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  textAlign: "center",
};

const labelRowStyle: React.CSSProperties = {
  margin: "0 0 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#737373",
  fontWeight: 500,
};

const dotStyle: React.CSSProperties = {
  display: "inline-block",
  width: 8,
  height: 8,
  borderRadius: "999px",
  background: "#475569",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "3.25rem",
  lineHeight: 1.28,
  letterSpacing: "-0.02em",
  fontWeight: 600,
};

const summaryStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "28px auto 0",
  fontSize: 17,
  lineHeight: 1.95,
  color: "#404040",
};

const ctaWrapStyle: React.CSSProperties = {
  marginTop: 32,
  display: "flex",
  justifyContent: "center",
  gap: 12,
  flexWrap: "wrap",
};

const primaryButtonStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 24px",
  borderRadius: 999,
  border: "1px solid #171717",
  background: "#171717",
  color: "#fff",
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 24px",
  borderRadius: 999,
  border: "1px solid #d4d4d4",
  background: "#fff",
  color: "#262626",
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
};
