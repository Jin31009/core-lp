

type Props = {
  setPage: (page: string) => void;
};

export default function CtaSection({ setPage }: Props) {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={labelStyle}>Participation</p>

        <div style={scriptWrapStyle}>
          <p style={scriptStyle}>
            まだ途中にある
          </p>

          <p style={scriptStrongStyle}>
            だからこそ、
            <br />
            一緒に試しながら
            <br />
            確かめていきたい
          </p>
        </div>

        <div style={ctaWrapStyle}>
          <button onClick={() => setPage("contact")} style={buttonStyle}>
            PoCに参加する
          </button>
        </div>
      </div>
    </section>
  );
}

/* ===== styles ===== */

const sectionStyle: React.CSSProperties = {
  padding: "60px 48px 160px",
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
  fontSize: 28,
  lineHeight: 1.9,
  letterSpacing: "-0.02em",
  opacity: 0.78,
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

const buttonStyle: React.CSSProperties = {
  padding: "14px 30px",
  border: "1px solid rgba(0,0,0,0.22)",
  background: "transparent",
  cursor: "pointer",
  fontSize: 15,
};