import { useEffect, useRef, useState } from "react";

type Props = {
  setPage: (page: string) => void;
  currentPage?: string;
};

type NavItem = {
  key: string;
  label: string;
  href: string;
  page?: string;
};

const NAV_ITEMS: NavItem[] = [
  { key: "kouhou", label: "病院広報工房", page: "top", href: "/kouhou-os-dev" },
  { key: "slides", label: "WEBスライド", page: "slides", href: "/slides" },
  { key: "demo", label: "RA-SS DEMO", page: "demo-intro", href: "/demo-intro" },
  { key: "note", label: "note", href: "/kouhou-os-dev#journal" },
  { key: "contact", label: "相談する", page: "contact", href: "/contact" },
];

function isActive(currentPage: string | undefined, key: string) {
  if (!currentPage) return false;
  if (key === "kouhou") return currentPage === "top" || currentPage === "kouhou-os-dev" || currentPage === "corelp";
  if (key === "slides") return currentPage === "slides" || currentPage === "slides-print";
  if (key === "demo") {
    return currentPage === "demo" || currentPage === "demo-intro" || currentPage === "prototype";
  }
  if (key === "contact") return currentPage === "contact" || currentPage === "participation";
  return false;
}

export default function SiteHeader({ setPage, currentPage }: Props) {
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateLayout = () => {
      const nextIsMobile = window.innerWidth < 980;
      setIsMobileNav(nextIsMobile);

      if (!nextIsMobile) {
        setIsMenuOpen(false);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPage]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const navigateTo = (item: NavItem) => {
    if (item.page) {
      setPage(item.page);
      if (item.href && window.location.pathname !== item.href.split("#")[0]) {
        window.history.pushState(null, "", item.href);
      }
    } else {
      window.location.href = item.href;
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header ref={headerRef} style={headerStyle}>
        <div style={innerStyle}>
          <button onClick={() => navigateTo(NAV_ITEMS[0])} style={brandButtonStyle}>
            <span style={brandStyle}>黒江仁｜病院広報工房</span>
            <span style={brandSubStyle}>病院広報を、理解と関係を整える仕組みへ</span>
          </button>

          {isMobileNav ? (
            <button
              type="button"
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              style={{
                ...menuButtonStyle,
                ...(isMenuOpen ? menuButtonActiveStyle : null),
              }}
            >
              <span style={menuIconStyle} aria-hidden="true">
                <span
                  style={{
                    ...menuLineStyle,
                    ...menuLineTopStyle,
                    ...(isMenuOpen ? menuLineTopOpenStyle : null),
                  }}
                />
                <span
                  style={{
                    ...menuLineStyle,
                    ...menuLineMiddleStyle,
                    ...(isMenuOpen ? menuLineMiddleOpenStyle : null),
                  }}
                />
                <span
                  style={{
                    ...menuLineStyle,
                    ...menuLineBottomStyle,
                    ...(isMenuOpen ? menuLineBottomOpenStyle : null),
                  }}
                />
              </span>
            </button>
          ) : (
            <nav style={navStyle}>
              {NAV_ITEMS.map((item) => {
                const active = isActive(currentPage, item.key);

                return (
                  <button
                    key={item.key}
                    onClick={() => navigateTo(item)}
                    style={{
                      ...navItemStyle,
                      ...(active ? navItemActiveStyle : null),
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {isMobileNav && isMenuOpen ? (
          <div style={mobileMenuStyle}>
            <nav style={mobileNavStyle}>
              {NAV_ITEMS.map((item) => {
                const active = isActive(currentPage, item.key);

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => navigateTo(item)}
                    style={{
                      ...mobileNavItemStyle,
                      ...(active ? mobileNavItemActiveStyle : null),
                    }}
                  >
                    <span style={mobileNavLabelStyle}>{item.label}</span>
                    {active ? <span style={mobileNavCurrentStyle}>現在地</span> : null}
                  </button>
                );
              })}
            </nav>
          </div>
        ) : null}
      </header>

      {isMobileNav && isMenuOpen ? <button type="button" aria-label="メニューを閉じる" onClick={() => setIsMenuOpen(false)} style={backdropStyle} /> : null}
    </>
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
  gap: 10,
  flexWrap: "wrap",
};

const brandButtonStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  padding: 0,
  margin: 0,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  flex: "1 1 240px",
  minWidth: 0,
};

const brandSubStyle: React.CSSProperties = {
  margin: "3px 0 0",
  fontSize: 11,
  lineHeight: 1.4,
  color: "#8a8a8a",
  fontWeight: 500,
};

const brandStyle: React.CSSProperties = {
  fontSize: "clamp(14px, 2.6vw, 16px)",
  lineHeight: 1.45,
  letterSpacing: "0.01em",
  color: "#262626",
  fontWeight: 600,
  textAlign: "left",
  whiteSpace: "normal",
  textWrap: "balance",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  flexWrap: "wrap",
  justifyContent: "flex-end",
  flex: "1 1 320px",
};

const menuButtonStyle: React.CSSProperties = {
  minHeight: 40,
  minWidth: 44,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.72)",
  color: "#262626",
  borderRadius: 999,
  padding: "8px 10px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const menuButtonActiveStyle: React.CSSProperties = {
  background: "#ffffff",
};

const menuIconStyle: React.CSSProperties = {
  width: 16,
  height: 12,
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const menuLineStyle: React.CSSProperties = {
  position: "absolute",
  width: 16,
  height: 1,
  background: "#262626",
  transition: "transform 160ms ease, opacity 160ms ease",
};

const menuLineTopStyle: React.CSSProperties = {
  transform: "translateY(-5px)",
};

const menuLineMiddleStyle: React.CSSProperties = {
  transform: "translateY(0)",
};

const menuLineBottomStyle: React.CSSProperties = {
  transform: "translateY(5px)",
};

const menuLineTopOpenStyle: React.CSSProperties = {
  transform: "translateY(0) rotate(45deg)",
};

const menuLineMiddleOpenStyle: React.CSSProperties = {
  opacity: 0,
};

const menuLineBottomOpenStyle: React.CSSProperties = {
  transform: "translateY(0) rotate(-45deg)",
};

const mobileMenuStyle: React.CSSProperties = {
  borderTop: "1px solid rgba(0,0,0,0.06)",
  background: "rgba(255,255,255,0.96)",
  padding: "8px 16px 14px",
};

const mobileNavStyle: React.CSSProperties = {
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
};

const mobileNavItemStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  background: "transparent",
  padding: "15px 4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  textAlign: "left",
  cursor: "pointer",
  color: "#262626",
};

const mobileNavItemActiveStyle: React.CSSProperties = {
  background: "rgba(0,0,0,0.02)",
};

const mobileNavLabelStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.6,
};

const mobileNavCurrentStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#737373",
  flexShrink: 0,
};

const backdropStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  top: 72,
  border: "none",
  background: "transparent",
  padding: 0,
  margin: 0,
  zIndex: 40,
  cursor: "default",
};

const navItemStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  padding: "10px 10px",
  margin: 0,
  cursor: "pointer",
  fontSize: 12,
  color: "#262626",
  fontWeight: 500,
  borderRadius: 999,
  minHeight: 40,
};

const navItemActiveStyle: React.CSSProperties = {
  background: "rgba(0,0,0,0.05)",
};
