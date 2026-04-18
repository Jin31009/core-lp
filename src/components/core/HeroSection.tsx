
import SectionScrollCue from "./SectionScrollCue";
import { trackEvent } from "../../lib/analytics";

type Props = {
  setPage: (page: string) => void;
};

export default function HeroSection({ setPage }: Props) {
  return (
    <section id="hero" className="scroll-mt-24" style={sectionStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>
          なぜ、伝えているのに
          <br />
          伝わらないのか。
        </h1>

        <div style={summaryWrapStyle}>
          <p style={summaryStyle}>伝えているはずなのに、伝わらない。</p>

          <p style={summaryParagraphStyle}>
            正しく対応しているつもりなのに、
            <br />
            関係はなぜか積み上がっていかない。
          </p>

          <p style={summaryParagraphStyle}>
            そのズレは、やり方ではなく、
            <br />
            見方そのものにあるのかもしれない。
          </p>
        </div>

        <div style={ctaWrapStyle}>
          <button
            type="button"
            onClick={() => {
              trackEvent("lp_demo_click", { section: "hero" });
              setPage("demo-intro");
            }}
            style={primaryButtonStyle}
          >
            まず体験する
          </button>

          <button
            type="button"
            onClick={() => setPage("structure")}
            style={secondaryButtonStyle}
          >
            理論の裏側を見る
          </button>
        </div>

        <SectionScrollCue targetId="problem" emphasis="soft" subdued />
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: "clamp(88px, 14vw, 200px) 20px clamp(80px, 12vw, 160px)",
  background: "#ffffff",
  color: "#111",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(2.15rem, 8vw, 6rem)",
  lineHeight: 1.12,
  letterSpacing: "-0.03em",
  fontWeight: 600,
  textWrap: "balance",
};

const summaryWrapStyle: React.CSSProperties = {
  maxWidth: 620,
  margin: "36px auto 0",
};

const summaryStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(14px, 3.8vw, 17px)",
  lineHeight: 1.8,
  color: "#404040",
};

const summaryParagraphStyle: React.CSSProperties = {
  margin: "20px 0 0",
  fontSize: "clamp(14px, 3.8vw, 17px)",
  lineHeight: 1.8,
  color: "#404040",
};

const ctaWrapStyle: React.CSSProperties = {
  marginTop: 24,
  display: "flex",
  justifyContent: "center",
  gap: 12,
  flexWrap: "wrap",
};

const primaryButtonStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 22px",
  borderRadius: 999,
  border: "1px solid #171717",
  background: "#171717",
  color: "#fff",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  minWidth: 168,
};

const secondaryButtonStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 22px",
  borderRadius: 999,
  border: "1px solid #d4d4d4",
  background: "#fff",
  color: "#262626",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  minWidth: 168,
};
