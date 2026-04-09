import React from "react";

export default function CoreSection() {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={labelStyle}>Redefinition</p>

        <p style={bridgeStyle}>
          広報は、
          <br />
          情報を届ける行為だと
          <br />
          思われてきた
        </p>

        <div style={scriptWrapStyle}>
          <p style={scriptStyle}>
            けれど、
            <br />
            広報は
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

        <div style={expansionGridStyle}>
          <div style={expansionCardStyle}>
            <p style={expansionHeadStyle}>Reframe</p>
            <p style={expansionLeadStyle}>関係からの再構築</p>
            <p style={expansionBodyStyle}>
              広報を、
              <br />
              情報伝達ではなく
              <br />
              関係の状態から捉え直す。
            </p>
          </div>

          <div style={expansionCardStyle}>
            <p style={expansionHeadStyle}>Co-create</p>
            <p style={expansionLeadStyle}>AIとの共創</p>
            <p style={expansionBodyStyle}>
              AIは答えを代行するためではなく、
              <br />
              構造化を支援し、
              <br />
              人の判断を補助する。
            </p>
          </div>

          <div style={expansionCardStyle}>
            <p style={expansionHeadStyle}>Structure</p>
            <p style={expansionLeadStyle}>構造としての広報</p>
            <p style={expansionBodyStyle}>
              属人技として扱われてきた広報を、
              <br />
              再現可能な知として
              <br />
              組織に残していく。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: "20px 48px 120px",
  background: "#f7f5f2",
  color: "#111",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 1080,
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

const bridgeStyle: React.CSSProperties = {
  margin: "0 0 26px",
  fontSize: 18,
  lineHeight: 2,
  opacity: 0.72,
};

const scriptWrapStyle: React.CSSProperties = {
  marginBottom: 34,
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
  margin: "0 auto 44px",
  maxWidth: 620,
  fontSize: 19,
  lineHeight: 2,
  opacity: 0.8,
};

const expansionGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 24,
  marginTop: 12,
  alignItems: "stretch",
};

const expansionCardStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.1)",
  background: "rgba(255,255,255,0.34)",
  padding: "30px 24px 28px",
  minHeight: 240,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  textAlign: "center",
};

const expansionHeadStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  opacity: 0.62,
};

const expansionLeadStyle: React.CSSProperties = {
  margin: "0 0 16px",
  fontSize: 22,
  lineHeight: 1.65,
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

const expansionBodyStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.95,
  opacity: 0.82,
};