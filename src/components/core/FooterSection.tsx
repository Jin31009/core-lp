type Props = {
  setPage?: (page: string) => void;
};

const NAV_ITEMS = [
  { label: "TOP", page: "top" },
  { label: "DEMO", page: "demo" },
  { label: "CONTACT", page: "contact" },
] as const;

export default function FooterSection({ setPage }: Props) {
  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        <p style={brandStyle}>CORE</p>
        <p style={textStyle}>RA-SS｜広報再定義プロジェクト</p>
        <p style={subTextStyle}>
          広報を、関係の状態を整える体系として捉え直し、
          <br />
          理論の理解から体験、対話の入口までをつなぐサイトです。
        </p>

        <div style={navWrapStyle}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.page}
              onClick={() => setPage?.(item.page)}
              style={navButtonStyle}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p style={guideTextStyle}>
          ご関心をお持ちいただけた方は「一緒に試す」へ、
          <br />
          すぐに体験したい方は「体験する」から進めます。
        </p>
      </div>
    </footer>
  );
}

const footerStyle: React.CSSProperties = {
  padding: "48px 20px 64px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  background: "#f7f5f2",
};

const innerStyle: React.CSSProperties = {
  maxWidth: 1080,
  margin: "0 auto",
  textAlign: "center",
};

const brandStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#525252",
  fontWeight: 500,
};

const textStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 14,
  lineHeight: 1.8,
  color: "#262626",
  fontWeight: 500,
};

const subTextStyle: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: 720,
  fontSize: 14,
  lineHeight: 1.8,
  color: "#525252",
};

const navWrapStyle: React.CSSProperties = {
  marginTop: 24,
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: 8,
};

const navButtonStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  padding: "10px 12px",
  margin: 0,
  cursor: "pointer",
  fontSize: 14,
  color: "#262626",
  fontWeight: 500,
};

const guideTextStyle: React.CSSProperties = {
  margin: "20px auto 0",
  maxWidth: 680,
  fontSize: 14,
  lineHeight: 1.8,
  color: "#525252",
};
