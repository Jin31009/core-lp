

type Props = {
  setPage: (page: string) => void;
};

export default function CoreHeader({ setPage }: Props) {
  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <button onClick={() => setPage("corelp")} style={brandStyle}>
          CORE
        </button>

        <nav style={navStyle}>
          <button onClick={() => setPage("structure")} style={navItemStyle}>
            <span style={navMainStyle}>理論の裏側</span>
            <span style={navSubStyle}>Structure</span>
          </button>

          <button onClick={() => setPage("process")} style={navItemStyle}>
            <span style={navMainStyle}>再現性</span>
            <span style={navSubStyle}>Process</span>
          </button>

          <button onClick={() => setPage("contact")} style={navItemStyle}>
            <span style={navMainStyle}>一緒に試す</span>
            <span style={navSubStyle}>Contact</span>
          </button>

          <button onClick={() => setPage("demo-intro")} style={demoItemStyle}>
            <span style={demoMainStyle}>体験する</span>
            <span style={demoSubStyle}>Demo</span>
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
  background: "rgba(247,245,242,0.92)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
};

const innerStyle: React.CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "14px 32px",
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
  fontSize: 12,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#111",
  opacity: 0.88,
};

const navStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16,
};

const navItemStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  padding: "4px 4px",
  margin: 0,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
};

const navMainStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#111",
  opacity: 0.62,
  lineHeight: 1.2,
};

const navSubStyle: React.CSSProperties = {
  fontSize: 10,
  color: "#111",
  opacity: 0.38,
  lineHeight: 1.2,
};

const demoItemStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.16)",
  background: "#111",
  color: "#fff",
  padding: "6px 12px 5px",
  margin: 0,
  cursor: "pointer",
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
};

const demoMainStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#fff",
  opacity: 1,
  lineHeight: 1.2,
};

const demoSubStyle: React.CSSProperties = {
  fontSize: 10,
  color: "rgba(255,255,255,0.78)",
  lineHeight: 1.2,
};
