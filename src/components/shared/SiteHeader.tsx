type Props = {
  setPage: (page: string) => void;
  currentPage?: string;
};

const NAV_ITEMS = [
  { key: "structure", label: "理論の裏側", page: "structure" },
  { key: "process", label: "再現性", page: "process" },
  { key: "contact", label: "一緒に試す", page: "contact" },
] as const;

function isActive(currentPage: string | undefined, page: string) {
  if (!currentPage) return false;
  if (page === "corelp") return currentPage === "top" || currentPage === "corelp";
  if (page === "demo-intro") {
    return currentPage === "demo-intro" || currentPage === "demo" || currentPage === "prototype";
  }
  return currentPage === page;
}

export default function SiteHeader({ setPage, currentPage }: Props) {
  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <button onClick={() => setPage("corelp")} style={brandStyle}>
          CORE
        </button>

        <nav style={navStyle}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(currentPage, item.page);

            return (
              <button
                key={item.key}
                onClick={() => setPage(item.page)}
                style={{
                  ...navItemStyle,
                  ...(active ? navItemActiveStyle : null),
                }}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => setPage("demo-intro")}
            style={{
              ...demoItemStyle,
              ...(isActive(currentPage, "demo-intro") ? demoItemActiveStyle : null),
            }}
          >
            体験する
          </button>
        </nav>
      </div>
    </header>
  );
}

const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  height: 80,
  background: "rgba(247,245,242,0.92)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
};

const innerStyle: React.CSSProperties = {
  maxWidth: 1180,
  height: "100%",
  margin: "0 auto",
  padding: "0 32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 24,
};

const brandStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  padding: 0,
  margin: 0,
  cursor: "pointer",
  fontSize: 15,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#262626",
  fontWeight: 500,
};

const navStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const navItemStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  padding: "10px 12px",
  margin: 0,
  cursor: "pointer",
  fontSize: 15,
  color: "#262626",
  fontWeight: 500,
  borderRadius: 999,
};

const navItemActiveStyle: React.CSSProperties = {
  background: "rgba(0,0,0,0.05)",
};

const demoItemStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.16)",
  background: "#111",
  color: "#fff",
  padding: "10px 16px",
  margin: 0,
  cursor: "pointer",
  borderRadius: 999,
  fontSize: 15,
  fontWeight: 500,
  minHeight: 44,
};

const demoItemActiveStyle: React.CSSProperties = {
  background: "#262626",
  borderColor: "rgba(0,0,0,0.24)",
};
