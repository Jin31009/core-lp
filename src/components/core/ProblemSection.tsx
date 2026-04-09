export default function ProblemSection() {
  return (
    <section
      id="problem"
      style={{
        padding: "130px 48px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.45,
              marginBottom: 34,
            }}
          >
            Problem
          </p>

          <div style={{ fontSize: 30, lineHeight: 2.15 }}>
            <div>属人性への依存</div>
            <div style={{ opacity: 0.28 }}>↓</div>
            <div>再現性の欠如</div>
            <div style={{ opacity: 0.28 }}>↓</div>
            <div>効果測定の不可能性</div>
          </div>

          <p
            style={{
              marginTop: 42,
              fontSize: 18,
              lineHeight: 1.95,
              fontWeight: 700,
            }}
          >
            これは能力の問題ではなく、構造の問題である。
          </p>

          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              lineHeight: 1.95,
              opacity: 0.56,
            }}
          >
            現場では、よい実践が共有されず、次の改善につながりにくい。
          </p>
        </div>
      </div>
    </section>
  );
}