export default function HeroSection() {
  return (
    <section
      style={{
        padding: "178px 48px 138px",
        borderTop: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.42,
              marginBottom: 28,
            }}
          >
            Observation
          </p>

          <h1
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              margin: "0 0 34px",
            }}
          >
            広報は、本当に
            <br />
            「伝えること」なのか。
          </h1>

          <p
            style={{
              fontSize: 20,
              lineHeight: 1.95,
              margin: "0 0 22px",
              opacity: 0.8,
            }}
          >
            情報は届いている。
            <br />
            しかし、関係は変わっていない。
          </p>

          <p
            style={{
              fontSize: 25,
              lineHeight: 1.72,
              fontWeight: 700,
              margin: "0 0 36px",
            }}
          >
            私たちは、そこを変えたい。
          </p>

          <p
            style={{
              fontSize: 12,
              lineHeight: 1.8,
              opacity: 0.5,
              margin: 0,
            }}
          >
            医療機関の広報を、構造として捉え直すために。
          </p>
        </div>
      </div>
    </section>
  );
}