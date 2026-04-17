

import SectionScrollCue from "./SectionScrollCue";

export default function MissionSection() {
  return (
    <section id="method" className="scroll-mt-24" style={sectionStyle}>
      <div style={containerStyle}>
        <div style={labelRowStyle}>
          <span style={linesStyle}>
            <span style={lineStyle} />
            <span style={lineStyle} />
            <span style={lineStyle} />
          </span>
          <span>METHOD</span>
        </div>

        <p style={bridgeStyle}>
          再定義された視点も、
          <br />
          現場で扱える形にならなければ残らない。
        </p>

        <p style={introStyle}>
          RA-SSは、違和感を感覚のままにせず、
          観察し、整理し、対話に接続するための方法として設計されています。
        </p>

        <div style={scriptWrapStyle}>
          <p style={scriptStyle}>
            この再定義を、
            <br />
            現場で扱える形にする
          </p>

          <p style={scriptStrongStyle}>
            RA-SSは、
            <br />
            観察・構造化・対話支援のための枠組みである
          </p>
        </div>

        <p style={afterStyle}>
          自動で判断するためではなく、
          <br />
          関係の状態を見える形にし、
          <br />
          最初の一手を考えやすくするための方法である。
        </p>

        <div style={dividerStyle} />

        <div style={methodGridStyle}>
          <div style={methodCardStyle}>
            <p style={methodHeadStyle}>Observe</p>
            <p style={methodLeadStyle}>観察する</p>
            <p style={methodBodyStyle}>
              起きた場面から、関係の揺れやズレを見つける。
            </p>
          </div>

          <div style={methodCardStyle}>
            <p style={methodHeadStyle}>Structure</p>
            <p style={methodLeadStyle}>構造として整理する</p>
            <p style={methodBodyStyle}>
              違和感を感情のままにせず、扱える形に整える。
            </p>
          </div>

          <div style={methodCardStyle}>
            <p style={methodHeadStyle}>Support</p>
            <p style={methodLeadStyle}>対話を支える</p>
            <p style={methodBodyStyle}>
              人が考え、選び、応答するための支援として機能する。
            </p>
          </div>
        </div>

        <SectionScrollCue targetId="demo" />
      </div>
    </section>
  );
}

/* ===== styles ===== */

const sectionStyle: React.CSSProperties = {
  padding: "72px 20px clamp(96px, 16vw, 168px)",
  background: "rgba(245,245,244,0.6)",
  color: "#111",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 900,
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
  color: "#475569",
  fontWeight: 500,
};

const linesStyle: React.CSSProperties = {
  display: "inline-flex",
  flexDirection: "column",
  gap: 2,
};

const lineStyle: React.CSSProperties = {
  width: 12,
  height: 1,
  background: "#475569",
};

const introStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto 28px",
  fontSize: "clamp(15px, 3.8vw, 17px)",
  lineHeight: 1.85,
  color: "#404040",
};

const bridgeStyle: React.CSSProperties = {
  maxWidth: 680,
  margin: "0 auto 18px",
  fontSize: "clamp(15px, 3.8vw, 17px)",
  lineHeight: 1.85,
  color: "#525252",
};

const scriptWrapStyle: React.CSSProperties = {
  marginBottom: 32,
};

const scriptStyle: React.CSSProperties = {
  margin: "0 0 18px",
  fontSize: "clamp(22px, 6vw, 30px)",
  lineHeight: 1.7,
  letterSpacing: "-0.02em",
};

const scriptStrongStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(26px, 7vw, 36px)",
  lineHeight: 1.55,
  letterSpacing: "-0.025em",
  fontWeight: 500,
};

const afterStyle: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: 560,
  fontSize: "clamp(16px, 4vw, 18px)",
  lineHeight: 1.85,
  opacity: 0.8,
};

const dividerStyle: React.CSSProperties = {
  width: 1,
  height: 40,
  background: "rgba(0,0,0,0.14)",
  margin: "28px auto",
};

const methodGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: 24,
  marginTop: 8,
};

const methodCardStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.1)",
  background: "rgba(255,255,255,0.42)",
  padding: "22px 18px 20px",
  minHeight: 0,
  textAlign: "center",
};

const methodHeadStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  opacity: 0.6,
};

const methodLeadStyle: React.CSSProperties = {
  margin: "0 0 14px",
  fontSize: "clamp(18px, 5vw, 22px)",
  lineHeight: 1.45,
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

const methodBodyStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(14px, 3.6vw, 15px)",
  lineHeight: 1.8,
  opacity: 0.82,
};
