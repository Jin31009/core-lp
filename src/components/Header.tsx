type HeaderProps = {
  onNavigate: (page: string) => void;
};

export default function Header({ onNavigate }: HeaderProps) {
  const topLinks = [
    { key: "top", label: "Top" },
    { key: "mission", label: "Mission" },
    { key: "demo", label: "Prototype" },
    { key: "case", label: "Case" },
    { key: "evidence", label: "Evidence" },
  ];

  const subLinks = [
    { key: "participation", label: "Participation" },
    { key: "slides", label: "Slides" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        background: "rgba(247,247,245,0.92)",
        borderBottom: "1px solid #e6e6df",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "14px 20px 10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 10,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => onNavigate("top")}
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#111111",
            }}
          >
            CORE
          </button>

          <nav
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {topLinks.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                style={navButtonStyle}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <nav
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {subLinks.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              style={subNavButtonStyle}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

const navButtonStyle = {
  border: "1px solid #ddddd6",
  background: "#ffffff",
  color: "#111111",
  padding: "8px 14px",
  borderRadius: 999,
  fontSize: 13,
  cursor: "pointer",
};

const subNavButtonStyle = {
  border: "1px solid #ecece6",
  background: "#f9f9f7",
  color: "#444444",
  padding: "7px 12px",
  borderRadius: 999,
  fontSize: 12,
  cursor: "pointer",
};