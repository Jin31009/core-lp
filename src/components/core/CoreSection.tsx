export default function CoreSection() {
  return (
    <section
      id="core"
      style={{
        padding: "164px 48px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.45,
              marginBottom: 34,
            }}
          >
            Redefinition
          </p>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.95,
              opacity: 0.68,
              margin: 0,
            }}
          >
            従来、広報は情報伝達として理解されてきた。
          </p>

          <div style={{ height: 96 }} />

          <h2
            style={{
              fontSize: 52,
              lineHeight: 1.44,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            関係の状態を設計・維持・回復する
            <br />
            <span style={{ fontSize: 54 }}>体系</span>
          </h2>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.9,
              marginTop: 18,
              opacity: 0.78,
            }}
          >
            として再定義する。
          </p>

          <div
            style={{
              marginTop: 104,
              maxWidth: 580,
              marginInline: "auto",
              textAlign: "left",
              borderLeft: "1px solid rgba(0,0,0,0.14)",
              paddingLeft: 24,
            }}
          >
            <p style={{ margin: "0 0 18px", fontSize: 18, lineHeight: 1.9 }}>
              Reframe｜関係からの再構築
            </p>
            <p style={{ margin: "0 0 18px", fontSize: 18, lineHeight: 1.9 }}>
              Co-create｜AIとの共創
            </p>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.9 }}>
              Structure｜構造としての広報
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}