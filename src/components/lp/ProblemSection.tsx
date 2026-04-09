export default function ProblemSection() {
  return (
    <section
      id="problem"
      style={{
        padding: "120px 48px",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.6,
          marginBottom: 32,
        }}
      >
        Problem
      </p>

      <div style={{ fontSize: 28, lineHeight: 2.1 }}>
        <div>属人性への依存</div>
        <div style={{ opacity: 0.4 }}>↓</div>
        <div>再現性の欠如</div>
        <div style={{ opacity: 0.4 }}>↓</div>
        <div>効果測定の不可能性</div>
      </div>

      <p
        style={{
          marginTop: 40,
          fontSize: 18,
          lineHeight: 1.9,
          fontWeight: 700,
        }}
      >
        これは能力の問題ではなく、構造の問題である。
      </p>

      <p
        style={{
          marginTop: 16,
          fontSize: 14,
          lineHeight: 1.9,
          opacity: 0.6,
        }}
      >
        現場では、よい実践が共有されず、次の改善につながりにくい。
      </p>
    </section>
  );
}