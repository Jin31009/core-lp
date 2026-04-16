

export default function MissionSection() {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={labelStyle}>Method / RA-SS</p>

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

const methodGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 24,
  marginTop: 8,
};

const methodCardStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.1)",
  background: "rgba(255,255,255,0.42)",
  padding: "26px 22px 24px",
  minHeight: 196,
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
  fontSize: 22,
  lineHeight: 1.55,
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

const methodBodyStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.9,
  opacity: 0.82,
};
