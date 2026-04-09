type CoreHeaderProps = {
  setPage: (page: string) => void;
};

export default function CoreHeader({ setPage }: CoreHeaderProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(247,245,242,0.88)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "12px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <button
          onClick={() => setPage("corelp")}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.36,
            }}
          >
            Relational Architecture Sensing System
          </span>
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginTop: 2,
              color: "#111",
            }}
          >
            CORE
          </span>
        </button>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <button onClick={() => scrollToId("problem")} style={navButtonStyle}>
            Problem
          </button>
          <button onClick={() => scrollToId("core")} style={navButtonStyle}>
            Redefinition
          </button>
          <button onClick={() => scrollToId("prototype")} style={navButtonStyle}>
            Prototype
          </button>
          <button onClick={() => scrollToId("interface")} style={navButtonStyle}>
            Interface
          </button>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => setPage("slides")} style={subButtonStyle}>
            Slides
          </button>
          <button onClick={() => setPage("prototype")} style={mainButtonStyle}>
            Demo
          </button>
        </div>
      </div>
    </header>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const navButtonStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  padding: 0,
  cursor: "pointer",
  fontSize: 12,
  color: "#111",
  opacity: 0.62,
  letterSpacing: "0.02em",
};

const subButtonStyle: React.CSSProperties = {
  padding: "9px 13px",
  border: "1px solid rgba(0,0,0,0.1)",
  background: "transparent",
  color: "#111",
  cursor: "pointer",
  fontSize: 11,
  opacity: 0.88,
};

const mainButtonStyle: React.CSSProperties = {
  padding: "9px 13px",
  border: "1px solid rgba(0,0,0,0.18)",
  background: "rgba(0,0,0,0.03)",
  color: "#111",
  cursor: "pointer",
  fontSize: 11,
};