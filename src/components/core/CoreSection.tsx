

import SectionScrollCue from "./SectionScrollCue";

export default function CoreSection() {
  return (
    <section id="redefinition" className="scroll-mt-24" style={sectionStyle}>
      <div style={containerStyle}>
        <div style={labelRowStyle}>
          <span style={doubleCircleStyle}>
            <span style={innerCircleStyle} />
          </span>
          <span>REDEFINITION</span>
        </div>

        <p style={introStyle}>
          ここで言いたいのは、広報を情報の伝達としてではなく、
          関係の状態を整える営みとして捉え直す必要があるということです。
        </p>

        <div style={scriptWrapStyle}>
          <p style={scriptStyle}>
            本構想の中心にあるのは、
            <br />
            この再定義です
          </p>

          <p style={scriptStrongStyle}>
            広報は、
            <br />
            関係の状態を整える体系である
          </p>
        </div>

        <p style={afterStyle}>
          伝える内容そのものより先に、
          <br />
          関係の状態が届き方を決めている。
          <br />
          だから広報は、情報ではなく関係から捉え直される必要がある。
        </p>

        <div style={expansionGridStyle}>
          <div style={expansionCardStyle}>
            <p style={expansionHeadStyle}>Why</p>
            <p style={expansionLeadStyle}>なぜ伝達だけでは足りないのか</p>
            <p style={expansionBodyStyle}>
              同じ説明でも、相手との関係が違えば
              <br />
              意味の届き方は変わる。
            </p>
          </div>

          <div style={expansionCardStyle}>
            <p style={expansionHeadStyle}>Shift</p>
            <p style={expansionLeadStyle}>広報の扱う対象を変える</p>
            <p style={expansionBodyStyle}>
              情報を届ける営みから、
              <br />
              関係の状態を整える営みへ
              <br />
              見方を切り替える。
            </p>
          </div>

          <div style={expansionCardStyle}>
            <p style={expansionHeadStyle}>Result</p>
            <p style={expansionLeadStyle}>属人技を体系に変える</p>
            <p style={expansionBodyStyle}>
              感覚で扱われてきた広報を、
              <br />
              観察できる・整理できる・
              <br />
              残せる対象に変えていく。
            </p>
          </div>
        </div>

        <SectionScrollCue targetId="method" emphasis="strong" />
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: "72px 20px clamp(96px, 18vw, 188px)",
  background: "#ffffff",
  color: "#111",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 1040,
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
  color: "#047857",
  fontWeight: 500,
};

const doubleCircleStyle: React.CSSProperties = {
  width: 12,
  height: 12,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  border: "1px solid #047857",
  boxSizing: "border-box",
};

const innerCircleStyle: React.CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: "999px",
  background: "#047857",
};

const introStyle: React.CSSProperties = {
  maxWidth: 620,
  margin: "0 auto 36px",
  fontSize: "clamp(15px, 3.8vw, 17px)",
  lineHeight: 1.85,
  color: "#404040",
};

const scriptWrapStyle: React.CSSProperties = {
  marginBottom: 48,
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
  margin: "0 auto 56px",
  maxWidth: 560,
  fontSize: "clamp(16px, 4vw, 18px)",
  lineHeight: 1.85,
  color: "#404040",
  fontWeight: 500,
};

const expansionGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: 24,
  marginTop: 12,
  alignItems: "stretch",
};

const expansionCardStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.1)",
  background: "rgba(255,255,255,0.34)",
  padding: "24px 20px 22px",
  minHeight: 0,
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
  fontSize: "clamp(18px, 5vw, 22px)",
  lineHeight: 1.5,
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

const expansionBodyStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(14px, 3.6vw, 16px)",
  lineHeight: 1.8,
  color: "#525252",
};
