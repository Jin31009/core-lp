type Props = {
  setPage: (page: string) => void;
  currentPage?: string;
};

const NAV_ITEMS = [
  { key: "top", label: "TOP", page: "top" },
  { key: "contact", label: "CONTACT", page: "contact" },
] as const;

function isActive(currentPage: string | undefined, page: string) {
  if (!currentPage) return false;
  if (page === "top") return currentPage === "top" || currentPage === "corelp";
  if (page === "demo") {
    return currentPage === "demo-intro" || currentPage === "demo" || currentPage === "prototype";
  }
  return currentPage === page;
}

export default function SiteHeader({ setPage, currentPage }: Props) {
  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <button onClick={() => setPage("top")} style={brandStyle}>
          CORE｜黒江仁｜医療広報・関係性設計
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
            onClick={() => setPage("demo")}
            style={{
              ...demoItemStyle,
              ...(isActive(currentPage, "demo") ? demoItemActiveStyle : null),
            }}
          >
            DEMO
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
  minHeight: 72,
  background: "rgba(247,245,242,0.92)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
};

const innerStyle: React.CSSProperties = {
  maxWidth: 1180,
  minHeight: 72,
  margin: "0 auto",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const brandStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  padding: 0,
  margin: 0,
  cursor: "pointer",
  fontSize: "clamp(12px, 2.8vw, 14px)",
  lineHeight: 1.5,
  letterSpacing: "0.01em",
  color: "#262626",
  fontWeight: 500,
  textAlign: "left",
  whiteSpace: "normal",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const navItemStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  padding: "10px 10px",
  margin: 0,
  cursor: "pointer",
  fontSize: 13,
  color: "#262626",
  fontWeight: 500,
  borderRadius: 999,
};

const navItemActiveStyle: React.CSSProperties = {
  background: "rgba(0,0,0,0.05)",
};

const demoItemStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.16)",
  background: "rgba(255,255,255,0.72)",
  color: "#262626",
  padding: "10px 12px",
  margin: 0,
  cursor: "pointer",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 500,
  minHeight: 44,
};

const demoItemActiveStyle: React.CSSProperties = {
  background: "rgba(0,0,0,0.08)",
  borderColor: "rgba(0,0,0,0.24)",
};
