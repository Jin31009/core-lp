
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

        <p style={authorLineStyle}>
          黒江仁による、病院広報と関係性設計の実証プロジェクト
        </p>

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
  padding: "clamp(104px, 16vw, 200px) 20px clamp(96px, 14vw, 160px)",
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
  fontSize: "clamp(2.6rem, 9vw, 6rem)",
  lineHeight: 1.16,
  letterSpacing: "-0.03em",
  fontWeight: 600,
};

const authorLineStyle: React.CSSProperties = {
  margin: "18px auto 0",
  maxWidth: 520,
  fontSize: "clamp(12px, 3.2vw, 14px)",
  lineHeight: 1.7,
  letterSpacing: "0.01em",
  color: "#6b7280",
};

const summaryWrapStyle: React.CSSProperties = {
  maxWidth: 620,
  margin: "48px auto 0",
};

const summaryStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(15px, 3.8vw, 17px)",
  lineHeight: 1.85,
  color: "#404040",
};

const summaryParagraphStyle: React.CSSProperties = {
  margin: "20px 0 0",
  fontSize: "clamp(15px, 3.8vw, 17px)",
  lineHeight: 1.85,
  color: "#404040",
};

const ctaWrapStyle: React.CSSProperties = {
  marginTop: 28,
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
};
