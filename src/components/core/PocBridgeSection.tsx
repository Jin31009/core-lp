import SectionScrollCue from "./SectionScrollCue";

type Props = {
  setPage: (page: string) => void;
};

const FIGURE_ITEMS = [
  "違和感を構造として捉えられるか",
  "対応ではなく関係として整理できるか",
  "次の一手を順番として描けるか",
] as const;

export default function PocBridgeSection({ setPage }: Props) {
  return (
    <section id="poc-bridge" className="scroll-mt-24" style={sectionStyle}>
      <div style={containerStyle}>
        <div style={labelRowStyle}>
          <span style={dotStyle} />
          <span>PoC</span>
        </div>

        <h2 style={titleStyle}>なぜ、PoCが必要なのか</h2>

        <p style={leadStyle}>
          この構想は、説明として理解できるかではなく、
          <br />
          実際の現場で機能するかを確かめる必要があります。
        </p>

        <div style={bodyWrapStyle}>
          <p style={bodyParagraphStyle}>ここで見たいのは、理論の正しさではありません。</p>
          <p style={bodyParagraphStyle}>
            現場の違和感を前にしたときに、
            <br />
            関係のズレが見えるのか。
          </p>
          <p style={bodyParagraphStyle}>
            そしてそこから、
            <br />
            次の一手が立ち上がるのか。
          </p>
          <p style={bodyParagraphStyle}>
            PoCは、その手触りを
            <br />
            小さく確かめるための入口です。
          </p>
        </div>

        <div style={figureBoxStyle}>
          {FIGURE_ITEMS.map((item) => (
            <p key={item} style={figureItemStyle}>
              ・{item}
            </p>
          ))}
        </div>

        <div style={ctaWrapStyle}>
          <button type="button" onClick={() => setPage("poc")} style={buttonStyle}>
            事例を見る
          </button>
        </div>

        <SectionScrollCue targetId="demo" emphasis="soft" subdued />
      </div>
    </section>
  );
}

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

const dotStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "999px",
  background: "#475569",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(28px, 7vw, 38px)",
  lineHeight: 1.48,
  letterSpacing: "-0.025em",
  fontWeight: 600,
  color: "#171717",
};

const leadStyle: React.CSSProperties = {
  maxWidth: 640,
  margin: "20px auto 0",
  fontSize: "clamp(15px, 3.8vw, 17px)",
  lineHeight: 1.85,
  color: "#3f3f46",
};

const bodyWrapStyle: React.CSSProperties = {
  maxWidth: "34rem",
  margin: "34px auto 0",
  textAlign: "center",
};

const bodyParagraphStyle: React.CSSProperties = {
  margin: "0 0 17px",
  fontSize: 15,
  lineHeight: 1.78,
  color: "#262626",
};

const figureBoxStyle: React.CSSProperties = {
  maxWidth: "30rem",
  margin: "32px auto 0",
  border: "1px solid rgba(0,0,0,0.1)",
  padding: "20px 18px",
  textAlign: "left",
};

const figureItemStyle: React.CSSProperties = {
  margin: "0 0 9px",
  fontSize: 14,
  lineHeight: 1.75,
  color: "#262626",
};

const ctaWrapStyle: React.CSSProperties = {
  marginTop: 28,
};

const buttonStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 26px",
  border: "1px solid rgba(0,0,0,0.18)",
  background: "transparent",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  color: "#262626",
};
