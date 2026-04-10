

export default function FooterSection() {
  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        <p style={brandStyle}>CORE</p>
        <p style={textStyle}>
          Relational Architecture Sensing System
        </p>
        <p style={subTextStyle}>
          広報を、関係の構造として捉え直すための実践と検証
        </p>
      </div>
    </footer>
  );
}

const footerStyle: React.CSSProperties = {
  padding: "56px 48px 72px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  background: "#f7f5f2",
};

const innerStyle: React.CSSProperties = {
  maxWidth: 1080,
  margin: "0 auto",
  textAlign: "center",
};

const brandStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  opacity: 0.56,
};

const textStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: 13,
  lineHeight: 1.8,
  opacity: 0.72,
};

const subTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.8,
  opacity: 0.48,
};