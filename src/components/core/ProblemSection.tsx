import React from "react";

export default function ProblemSection() {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={labelStyle}>Problem</p>

        <div style={scriptWrapStyle}>
          <p style={scriptStyle}>
            けれど、
            <br />
            病院広報の現場では
            <br />
            うまくいかないことが多い
          </p>

          <p style={scriptStyle}>
            伝えているはずなのに、
            <br />
            伝わっていない
          </p>

          <p style={scriptStyle}>
            説明しているはずなのに、
            <br />
            納得されない
          </p>
        </div>

        <p style={noteStyle}>
          それは、
          <br />
          伝え方の問題ではなく
        </p>

        <p style={noteStrongStyle}>
          広報が扱っているもの
          <br />
          そのものの問題かもしれない
        </p>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: "24px 48px 120px",
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
  marginBottom: 40,
};

const scriptStyle: React.CSSProperties = {
  margin: "0 0 28px",
  fontSize: 30,
  lineHeight: 1.95,
  letterSpacing: "-0.02em",
};

const noteStyle: React.CSSProperties = {
  margin: "0 0 14px",
  fontSize: 18,
  lineHeight: 2,
  opacity: 0.74,
};

const noteStrongStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.9,
  letterSpacing: "-0.01em",
};