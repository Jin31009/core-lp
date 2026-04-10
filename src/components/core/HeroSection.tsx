

export default function HeroSection() {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={labelStyle}>Question</p>

        <h1 style={titleStyle}>
          病院広報は、
          <br />
          伝えるものだと思っていませんか
        </h1>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: "160px 48px 120px",
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
  opacity: 0.5,
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 54,
  lineHeight: 1.6,
  letterSpacing: "-0.03em",
  fontWeight: 500,
};