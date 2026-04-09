type Props = {
  setPage: (page: string) => void;
};

export default function CtaSection({ setPage }: Props) {
  return (
    <section
      style={{
        padding: "164px 48px 182px",
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
              marginBottom: 26,
            }}
          >
            Action
          </p>

          <h2
            style={{
              fontSize: 42,
              lineHeight: 1.65,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            まずは、小さく触れてみてください。
          </h2>

          <button
            onClick={() => setPage("prototype")}
            style={{
              marginTop: 42,
              padding: "14px 28px",
              border: "1px solid rgba(0,0,0,0.18)",
              background: "rgba(0,0,0,0.03)",
              color: "#111",
              fontSize: 14,
              letterSpacing: "0.04em",
              cursor: "pointer",
            }}
          >
            プロトタイプへ
          </button>

          <p
            style={{
              marginTop: 18,
              fontSize: 13,
              lineHeight: 1.9,
              opacity: 0.6,
              cursor: "pointer",
            }}
            onClick={() => setPage("structure")}
          >
            構造から読みたい方は、Structureへ。
          </p>
        </div>
      </div>
    </section>
  );
}