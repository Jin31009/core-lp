type Props = {
  setPage: (page: string) => void;
};

export default function CtaSection({ setPage }: Props) {
  return (
    <section
      style={{
        padding: "72px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          background: "#111111",
          color: "#ffffff",
          borderRadius: 28,
          padding: "40px 28px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.7,
            marginBottom: 14,
          }}
        >
          Call to Action
        </p>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            lineHeight: 1.25,
            marginBottom: 18,
            fontWeight: 600,
          }}
        >
          COREの構想を、
          実際の導線として開く。
        </h2>

        <p
          style={{
            maxWidth: 720,
            margin: "0 auto 28px",
            fontSize: 16,
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          Mission、Prototype、Contactへ接続しながら、
          概念を説明可能なかたちだけでなく、移動可能な体験として提示します。
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setPage("demo")}
            style={{
              border: "none",
              background: "#ffffff",
              color: "#111111",
              padding: "14px 22px",
              borderRadius: 999,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Prototypeを見る
          </button>

          <button
            onClick={() => setPage("contact")}
            style={{
              border: "1px solid rgba(255,255,255,0.24)",
              background: "transparent",
              color: "#ffffff",
              padding: "14px 22px",
              borderRadius: 999,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}