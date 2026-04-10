

export default function MissionSection() {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={labelStyle}>Mission</p>

        <div style={scriptWrapStyle}>
          <p style={scriptStyle}>
            広報は、
            <br />
            情報を届ける行為ではなく
          </p>

          <p style={scriptStrongStyle}>
            関係の状態に働きかける営みとして
            <br />
            捉え直すことができる
          </p>
        </div>

        <p style={afterStyle}>
          関係の状態が変われば、
          <br />
          同じ言葉でも
          <br />
          意味の届き方は変わる
        </p>

        <div style={dividerStyle} />

        <p style={willStyle}>
          私たちは、
          <br />
          広報が扱うものを
          <br />
          変えたい
        </p>
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
  marginBottom: 32,
};

const scriptStyle: React.CSSProperties = {
  margin: "0 0 18px",
  fontSize: 30,
  lineHeight: 1.9,
  letterSpacing: "-0.02em",
};

const scriptStrongStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 36,
  lineHeight: 1.85,
  letterSpacing: "-0.025em",
  fontWeight: 500,
};

const afterStyle: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: 560,
  fontSize: 18,
  lineHeight: 2,
  opacity: 0.8,
};

const dividerStyle: React.CSSProperties = {
  width: 1,
  height: 56,
  background: "rgba(0,0,0,0.14)",
  margin: "36px auto",
};

const willStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 34,
  lineHeight: 1.9,
  letterSpacing: "-0.02em",
};