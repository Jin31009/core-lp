

type Props = {
  setPage: (page: string) => void;
};

export default function CtaSection({ setPage }: Props) {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={labelRowStyle}>
          <span style={arrowStyle}>→</span>
          <span>CONTACT</span>
        </div>

        <p style={introStyle}>
          この構想は、単発の対応支援で終わるものではなく、
          組織に残る再現性へどうつなげるかまでを含んでいます。
        </p>

        <div style={scriptWrapStyle}>
          <p style={scriptStyle}>
            目指しているのは、
            <br />
            単発の良い対応ではなく
          </p>

          <p style={scriptStrongStyle}>
            再現できる広報を
            <br />
            組織に残していくこと
          </p>
        </div>

        <div style={valueGridStyle}>
          <div style={valueCardStyle}>
            <p style={valueHeadStyle}>Reproducibility</p>
            <p style={valueLeadStyle}>再現できる</p>
            <p style={valueBodyStyle}>
              経験や勘に閉じていた対応を、繰り返せる形にする。
            </p>
          </div>

          <div style={valueCardStyle}>
            <p style={valueHeadStyle}>Learning</p>
            <p style={valueLeadStyle}>組織に残る</p>
            <p style={valueBodyStyle}>
              個人の判断を、その人だけの技で終わらせずに残していく。
            </p>
          </div>

          <div style={valueCardStyle}>
            <p style={valueHeadStyle}>Collaboration</p>
            <p style={valueLeadStyle}>一緒に育てる</p>
            <p style={valueBodyStyle}>
              現場と往復しながら、実装可能な形へ少しずつ整えていく。
            </p>
          </div>
        </div>

        <div style={ctaWrapStyle}>
          <button onClick={() => setPage("contact")} style={buttonStyle}>
            一緒に試してみる
          </button>
        </div>
      </div>
    </section>
  );
}

/* ===== styles ===== */

const sectionStyle: React.CSSProperties = {
  padding: "60px 48px 160px",
  background: "rgba(245,245,244,0.7)",
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
  color: "#737373",
  fontWeight: 500,
};

const arrowStyle: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1,
  color: "#737373",
};

const introStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto 28px",
  fontSize: 17,
  lineHeight: 1.95,
  color: "#404040",
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

const valueGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 24,
  marginTop: 12,
  marginBottom: 12,
};

const valueCardStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.1)",
  background: "rgba(255,255,255,0.38)",
  padding: "28px 22px 24px",
  minHeight: 210,
  textAlign: "center",
};

const valueHeadStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  opacity: 0.6,
};

const valueLeadStyle: React.CSSProperties = {
  margin: "0 0 14px",
  fontSize: 22,
  lineHeight: 1.6,
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

const valueBodyStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.9,
  opacity: 0.82,
};

const buttonStyle: React.CSSProperties = {
  padding: "14px 30px",
  border: "1px solid rgba(0,0,0,0.22)",
  background: "transparent",
  cursor: "pointer",
  fontSize: 15,
};
