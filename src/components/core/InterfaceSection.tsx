import React from "react";

type Props = {
  setPage: (page: string) => void;
};

type CardKey = "structure" | "prototype" | "process" | "participation" | null;

export default function InterfaceSection({ setPage }: Props) {
  const [hovered, setHovered] = React.useState<CardKey>(null);

  return (
    <section
      id="interface"
      style={{
        padding: "140px 48px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.45,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Interface
          </p>

          <h2
            style={{
              textAlign: "center",
              fontSize: 38,
              lineHeight: 1.65,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            このモデルとの関わり方
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 28,
              marginTop: 64,
            }}
          >
            <button
              onClick={() => setPage("structure")}
              onMouseEnter={() => setHovered("structure")}
              onMouseLeave={() => setHovered(null)}
              style={getCardStyle(hovered === "structure")}
            >
              <p style={cardIndexStyle}>01</p>
              <h3 style={cardTitleStyle}>理解する</h3>
              <p style={cardTextStyle}>構造と背景を読む</p>
            </button>

            <button
              onClick={() => setPage("prototype")}
              onMouseEnter={() => setHovered("prototype")}
              onMouseLeave={() => setHovered(null)}
              style={getCardStyle(hovered === "prototype")}
            >
              <p style={cardIndexStyle}>02</p>
              <h3 style={cardTitleStyle}>体験する</h3>
              <p style={cardTextStyle}>プロトタイプに触れる</p>
            </button>

            <button
              onClick={() => setPage("process")}
              onMouseEnter={() => setHovered("process")}
              onMouseLeave={() => setHovered(null)}
              style={getCardStyle(hovered === "process")}
            >
              <p style={cardIndexStyle}>03</p>
              <h3 style={cardTitleStyle}>試す</h3>
              <p style={cardTextStyle}>小さく現場で試行する</p>
            </button>

            <button
              onClick={() => setPage("participation")}
              onMouseEnter={() => setHovered("participation")}
              onMouseLeave={() => setHovered(null)}
              style={getCardStyle(hovered === "participation")}
            >
              <p style={cardIndexStyle}>04</p>
              <h3 style={cardTitleStyle}>導入する</h3>
              <p style={cardTextStyle}>共同研究や伴走支援につなぐ</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function getCardStyle(isHovered: boolean): React.CSSProperties {
  return {
    textAlign: "left",
    padding: "30px 28px",
    border: isHovered
      ? "1px solid rgba(0,0,0,0.22)"
      : "1px solid rgba(0,0,0,0.1)",
    background: isHovered ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.42)",
    cursor: "pointer",
    transition: "all 180ms ease",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    boxShadow: isHovered
      ? "0 10px 30px rgba(0,0,0,0.06)"
      : "0 0 0 rgba(0,0,0,0)",
  };
}

const cardIndexStyle: React.CSSProperties = {
  margin: "0 0 18px",
  fontSize: 10,
  letterSpacing: "0.16em",
  opacity: 0.42,
};

const cardTitleStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 24,
  lineHeight: 1.5,
  letterSpacing: "-0.02em",
  color: "#111",
};

const cardTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.9,
  opacity: 0.7,
  color: "#111",
};