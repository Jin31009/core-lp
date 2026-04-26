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
          広報は、情報ではなく
          <br />
          「関係の一瞬」から再設計できる。
        </h1>

        <div style={summaryWrapStyle}>
          <p style={summaryStyle}>
            同じ言葉でも、関係の状態が変われば届き方は変わる。
            <br />
            本サイトでは、投書分析とプロトタイプを通じて、その構造を可視化します。
          </p>

          <p style={supportTextStyle}>
            多くの問題は、出来事そのものではなく、最初の関わり方のずれから生まれていました。
            <br />
            303件の投書を手がかりに、その構造と、最初の一手のあり方を整理しています。
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
            体験する
          </button>

          <button
            type="button"
            onClick={() => {
              trackEvent("lp_slides_click", { section: "hero" });
              setPage("slides");
            }}
            style={secondaryButtonStyle}
          >
            WEBスライドを見る（事前資料）
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
  fontSize: "clamp(2.05rem, 7.8vw, 5.8rem)",
  lineHeight: 1.12,
  letterSpacing: "-0.03em",
  fontWeight: 600,
  textWrap: "balance",
};

const summaryWrapStyle: React.CSSProperties = {
  maxWidth: 700,
  margin: "34px auto 0",
};

const summaryStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(14px, 3.8vw, 17px)",
  lineHeight: 1.85,
  color: "#404040",
};

const supportTextStyle: React.CSSProperties = {
  margin: "22px auto 0",
  maxWidth: 640,
  fontSize: "clamp(12px, 3.2vw, 14px)",
  lineHeight: 1.85,
  color: "#6b7280",
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
