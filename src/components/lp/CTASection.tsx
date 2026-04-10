type Props = {
  onOpenDemo?: () => void;
  onOpenContact?: () => void;
};

export default function CTASection({ onOpenDemo, onOpenContact }: Props) {
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
          Conceptを、説明だけで終わらせない。
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
          Prototype、Case、Evidenceを通して、
          COREの構想を対話可能なかたちへ接続します。
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
            onClick={onOpenDemo}
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
            onClick={onOpenContact}
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