

import SectionScrollCue from "./SectionScrollCue";

export default function ProblemSection() {
  return (
    <section id="problem" className="scroll-mt-24" style={sectionStyle}>
      <div style={containerStyle}>
        <div style={labelRowStyle}>
          <span style={squareStyle} />
          <span>PROBLEM</span>
        </div>

        <p style={introStyle}>
          病院広報が難しいのは、情報の内容だけではなく、
          その情報がどんな関係の中で受け取られるかまで影響するからです。
        </p>

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

        <SectionScrollCue targetId="redefinition" emphasis="normal" />
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: "56px 24px 144px",
  background: "rgba(245,245,244,0.7)",
  color: "#111",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  textAlign: "center",
};

const labelRowStyle: React.CSSProperties = {
  margin: "0 0 28px",
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

const squareStyle: React.CSSProperties = {
  display: "inline-block",
  width: 10,
  height: 10,
  borderRadius: 2,
  border: "1px solid #64748b",
  boxSizing: "border-box",
};

const introStyle: React.CSSProperties = {
  maxWidth: 780,
  margin: "0 auto 36px",
  fontSize: 17,
  lineHeight: 1.95,
  color: "#404040",
};

const scriptWrapStyle: React.CSSProperties = {
  margin: "12px 0 56px",
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
  lineHeight: 1.95,
  color: "#525252",
};

const noteStrongStyle: React.CSSProperties = {
  margin: "18px 0 0",
  fontSize: 24,
  lineHeight: 1.9,
  letterSpacing: "-0.01em",
  fontWeight: 600,
};
