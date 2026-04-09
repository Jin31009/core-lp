type Props = {
  setPage: (page: string) => void;
};

export default function PrototypeSection({ setPage }: Props) {
  return (
    <section
      id="prototype"
      style={{
        padding: "146px 48px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.45,
              marginBottom: 34,
            }}
          >
            Prototype
          </p>

          <h2
            style={{
              fontSize: 40,
              lineHeight: 1.6,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            この再定義は、実装可能である。
          </h2>

          <p
            style={{
              marginTop: 18,
              fontSize: 16,
              lineHeight: 1.95,
              opacity: 0.66,
            }}
          >
            数分で、考え方の輪郭に触れることができる。
          </p>

          <div style={{ marginTop: 48 }}>
            <button
              onClick={() => setPage("prototype")}
              style={buttonStyle}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, buttonHoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, buttonStyle);
              }}
            >
              プロトタイプを体験する
            </button>

            <p
              style={{
                marginTop: 12,
                fontSize: 11,
                opacity: 0.48,
                letterSpacing: "0.08em",
              }}
            >
              約2〜3分で体験できます
            </p>
          </div>

          <div
            style={{
              marginTop: 100,
              fontSize: 20,
              lineHeight: 2.05,
            }}
          >
            <div style={{ opacity: 0.82 }}>DEMO（体験）</div>
            <div style={{ opacity: 0.28 }}>↓</div>
            <div style={{ fontWeight: 700, fontSize: 24 }}>RA-SS（理解）</div>
            <div style={{ opacity: 0.28 }}>↓</div>
            <div style={{ opacity: 0.82 }}>拡張構想</div>
            <div style={{ opacity: 0.28 }}>↓</div>
            <div style={{ opacity: 0.82 }}>OSS</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "14px 28px",
  border: "1px solid rgba(0,0,0,0.22)",
  background: "transparent",
  color: "#111",
  fontSize: 14,
  letterSpacing: "0.08em",
  cursor: "pointer",
  transition: "all 180ms ease",
};

const buttonHoverStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.38)",
  background: "rgba(0,0,0,0.04)",
  transform: "translateY(-1px)",
};