export default function TrustSection() {
  return (
    <section
      style={{
        padding: "124px 48px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.45,
              marginBottom: 28,
            }}
          >
            Evidence
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
              alignItems: "start",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 10px",
                  letterSpacing: "-0.02em",
                }}
              >
                学会
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.9,
                  opacity: 0.66,
                }}
              >
                学術的検証
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 10px",
                  letterSpacing: "-0.02em",
                }}
              >
                Note
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.9,
                  opacity: 0.66,
                }}
              >
                思想展開
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 10px",
                  letterSpacing: "-0.02em",
                }}
              >
                実績
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.9,
                  opacity: 0.66,
                }}
              >
                実践接続
              </p>
            </div>
          </div>

          <p
            style={{
              marginTop: 40,
              fontSize: 16,
              lineHeight: 1.9,
              fontWeight: 700,
            }}
          >
            50以上の医療機関との広報支援実績
          </p>

          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              lineHeight: 1.95,
              opacity: 0.58,
            }}
          >
            この構想は、すでに現場と接続している。
          </p>
        </div>
      </div>
    </section>
  );
}