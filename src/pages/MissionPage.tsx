type Props = {
  setPage: (page: string) => void;
};

export default function MissionPage({ setPage }: Props) {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "96px 24px 120px",
      }}
    >
      <p
        style={{
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.6,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Mission
      </p>

      <h1
        style={{
          fontSize: "clamp(32px, 5vw, 56px)",
          lineHeight: 1.15,
          textAlign: "center",
          marginBottom: 24,
          fontWeight: 600,
        }}
      >
        関係を、概念だけでなく
        <br />
        実装可能な構造として扱う。
      </h1>

      <p
        style={{
          maxWidth: 760,
          margin: "0 auto 48px",
          fontSize: 18,
          lineHeight: 1.9,
          textAlign: "center",
          color: "#444",
        }}
      >
        COREは、医療・地域・広報・記録・対話の接点を、
        観察可能で、共有可能で、再利用可能な構造として編み直すことを目指しています。
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
          marginBottom: 52,
        }}
      >
        {[
          {
            title: "Observe",
            text: "接点で生じる違和感や記述を、消費せずに観察対象として扱います。",
          },
          {
            title: "Structure",
            text: "断片的な事象を、関係構造として再配置し、意味を読み直します。",
          },
          {
            title: "Prototype",
            text: "概念を画面・導線・記録の形に落とし込み、実装可能性を検証します。",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e5e0",
              borderRadius: 20,
              padding: 28,
              boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              {item.title}
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "#444",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </section>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setPage("demo")} style={primaryButton}>
          Prototypeへ
        </button>
        <button onClick={() => setPage("contact")} style={secondaryButton}>
          Contactへ
        </button>
      </div>
    </main>
  );
}

const primaryButton = {
  border: "none",
  background: "#111111",
  color: "#ffffff",
  padding: "14px 22px",
  borderRadius: 999,
  fontSize: 14,
  cursor: "pointer",
};

const secondaryButton = {
  border: "1px solid #d7d7d0",
  background: "#ffffff",
  color: "#111111",
  padding: "14px 22px",
  borderRadius: 999,
  fontSize: 14,
  cursor: "pointer",
};