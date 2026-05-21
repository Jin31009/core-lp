type Props = {
  setPage?: (page: string) => void;
};

type FooterNavItem = {
  label: string;
  href: string;
  page?: string;
};

const NAV_ITEMS: FooterNavItem[] = [
  { label: "病院広報工房", page: "top", href: "/kouhou-os-dev" },
  { label: "WEBスライド", page: "slides", href: "/slides" },
  { label: "RA-SS DEMO", page: "demo-intro", href: "/demo-intro" },
  { label: "note", href: "/kouhou-os-dev#journal" },
  { label: "相談する", page: "contact", href: "/contact" },
];

export default function FooterSection({ setPage }: Props) {
  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        <p style={brandStyle}>黒江仁｜病院広報工房</p>
        <p style={subTextStyle}>
          病院広報に35年以上携わってきた黒江仁が、患者さんの声、職員の気づき、病院の理念や専門性を、理解と関係を整える広報へつなぎ直すためのサイトです。
        </p>

        <div style={navWrapStyle}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(event) => {
                if (!item.page || !setPage) return;
                event.preventDefault();
                setPage(item.page);
                window.history.pushState(null, "", item.href);
              }}
              style={navButtonStyle}
            >
              {item.label}
            </a>
          ))}
        </div>
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
  fontSize: 16,
  letterSpacing: "0.02em",
  color: "#262626",
  fontWeight: 600,
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
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "transparent",
  padding: "10px 14px",
  margin: 0,
  cursor: "pointer",
  borderRadius: 999,
  fontSize: 13,
  color: "#262626",
  fontWeight: 500,
  textDecoration: "none",
};
