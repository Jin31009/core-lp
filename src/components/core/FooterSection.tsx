type Props = {
  setPage?: (page: string) => void;
};

const NAV_ITEMS = [
  { label: "理論の裏側", page: "structure" },
  { label: "事例", page: "poc" },
  { label: "分析レポート", page: "reports" },
  { label: "一緒に試す", page: "contact" },
  { label: "体験する", page: "demo" },
] as const;

export default function FooterSection({ setPage }: Props) {
  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        <p style={brandStyle}>CORE project</p>
        <p style={subTextStyle}>
          理論から実証、そして実装へ。
          <br />
          関係の構造として広報を捉え直すためのサイトです。
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
          背景となる知見を読む方は「分析レポート」へ、
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
  margin: "0 0 8px",
  fontSize: 10,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#737373",
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
  border: "1px solid rgba(0,0,0,0.12)",
  background: "transparent",
  padding: "10px 14px",
  margin: 0,
  cursor: "pointer",
  borderRadius: 999,
  fontSize: 13,
  color: "#262626",
  fontWeight: 500,
};

const guideTextStyle: React.CSSProperties = {
  margin: "18px auto 0",
  maxWidth: 680,
  fontSize: 13,
  lineHeight: 1.8,
  color: "#525252",
};