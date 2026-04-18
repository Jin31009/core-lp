

import SectionScrollCue from "./SectionScrollCue";
import { trackEvent } from "../../lib/analytics";

type Props = {
  setPage: (page: string) => void;
};

export default function PrototypeSection({ setPage }: Props) {
  return (
    <section id="demo" className="scroll-mt-24" style={sectionStyle}>
      <div style={containerStyle}>
        <div style={labelRowStyle}>
          <span style={triangleStyle} />
          <span>PROTOTYPE</span>
        </div>

        <p style={introStyle}>
          説明を読み進めるより先に、ひとつのケースを通して
          この考え方がどう立ち上がるかを体験できます。
        </p>

        <div style={scriptWrapStyle}>
          <p style={scriptStyle}>
            ここで必要なのは、
            <br />
            読み足すことではなく
          </p>

          <p style={scriptStrongStyle}>
            実際に体験してみること
            <br />
            それがいちばん早い
          </p>
        </div>

        <p style={noteStyle}>
          デモでは、違和感を書くところから始めて、
          <br />
          関係のズレを見て、次の一手を考え、記録として残す流れをそのまま体験できます。
        </p>

        <div style={ctaWrapStyle}>
          <button
            onClick={() => {
              trackEvent("lp_demo_click", { section: "demo" });
              setPage("demo");
            }}
            style={buttonStyle}
          >
            体験を始める
          </button>
        </div>

        <SectionScrollCue targetId="cta" emphasis="soft" subdued />
      </div>
    </section>
  );
}

/* ===== styles ===== */

const sectionStyle: React.CSSProperties = {
  padding: "72px 20px clamp(96px, 16vw, 172px)",
  background: "#ffffff",
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

const triangleStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  borderTop: "4px solid transparent",
  borderBottom: "4px solid transparent",
  borderLeft: "6px solid #404040",
};

const introStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto 22px",
  fontSize: "clamp(15px, 3.8vw, 17px)",
  lineHeight: 1.85,
  color: "#404040",
};

const scriptWrapStyle: React.CSSProperties = {
  marginBottom: 28,
};

const scriptStyle: React.CSSProperties = {
  margin: "0 0 18px",
  fontSize: "clamp(22px, 6vw, 30px)",
  lineHeight: 1.7,
  letterSpacing: "-0.02em",
};

const scriptStrongStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(26px, 7vw, 34px)",
  lineHeight: 1.55,
  letterSpacing: "-0.025em",
  fontWeight: 500,
};

const ctaWrapStyle: React.CSSProperties = {
  marginTop: 36,
};

const noteStyle: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: 640,
  fontSize: "clamp(15px, 3.8vw, 17px)",
  lineHeight: 1.85,
  color: "#404040",
};

const buttonStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 24px",
  border: "1px solid #171717",
  borderRadius: 999,
  background: "#171717",
  color: "#fff",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
};
