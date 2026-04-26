import FooterSection from "../../components/core/FooterSection";
import SiteHeader from "../../components/shared/SiteHeader";

type Props = {
  setPage: (page: string) => void;
};

export default function ReportsPage({ setPage }: Props) {
  return (
    <div style={pageStyle}>
      <SiteHeader setPage={setPage} currentPage="reports" />

      <main style={mainStyle}>
        <section style={sectionStyle}>
          <h1 style={titleStyle}>分析レポート</h1>
          <p style={descriptionStyle}>
            RA-SSの分析資料・WEBスライド・学会発表資料への入口
          </p>

          <div style={linksStyle}>
            <a href="/slides" style={linkStyle}>
              WEBスライド（事前資料）
            </a>
            <a href="/conference-slides" style={linkStyle}>
              学会発表スライド
            </a>
          </div>
        </section>
      </main>

      <FooterSection setPage={setPage} />
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f7f5f2",
  color: "#111",
};

const mainStyle: React.CSSProperties = {
  padding: "64px 20px 80px",
};

const sectionStyle: React.CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(2rem, 6vw, 3rem)",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  fontWeight: 600,
};

const descriptionStyle: React.CSSProperties = {
  margin: "16px auto 0",
  maxWidth: 680,
  fontSize: "clamp(14px, 3.2vw, 17px)",
  lineHeight: 1.8,
  color: "#44403c",
};

const linksStyle: React.CSSProperties = {
  marginTop: 30,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 10,
};

const linkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 44,
  padding: "0 18px",
  border: "1px solid #d6d3d1",
  borderRadius: 999,
  background: "#fff",
  color: "#1c1917",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
};
