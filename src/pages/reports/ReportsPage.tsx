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
            患者側ナラティブ302件から、認知のズレを「構造・転換点・介入可能性」の観点で整理した入口
          </p>

          <section style={blockStyle}>
            <h2 style={blockTitleStyle}>分析サマリー</h2>
            <p style={blockTextStyle}>
              ズレは302件中248件で観測されましたが、主眼は発生頻度そのものではなく、継続162件のうち67件が転換点に至り、59件が臨界へ到達した進行構造にあります。
              本ページは、ズレがどこで状態変化するかを見極めるための要点を簡潔に整理しています。
            </p>
          </section>

          <section style={blockStyle}>
            <h2 style={blockTitleStyle}>分布（簡易）</h2>
            <div style={distributionGridStyle}>
              {[
                "S｜安全 114件（37.7%）",
                "L｜役割 85件（28.1%）",
                "P｜見通し 51件（16.9%）",
                "R｜尊厳 49件（16.2%）",
              ].map((item) => (
                <p key={item} style={distributionItemStyle}>
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section style={blockStyle}>
            <h2 style={blockTitleStyle}>代表ケース（入口）</h2>
            <p style={quoteStyle}>
              外来で長く待った患者さんから、「説明は受けたけれど、見てもらえていない感じが残った」という語りが出た。
            </p>
            <p style={blockTextStyle}>
              待ち時間の長短だけでなく、「見通し（P）」と「尊厳（R）」の未充足が重なって観測される代表例です。応答不在クラスターは、転換する場合としない場合の分岐を検証する入口として扱われます。
            </p>
          </section>

          <div style={linksStyle}>
            <a href="/slides" style={primaryLinkStyle}>
              WEBスライド（事前資料）を見る
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

const blockStyle: React.CSSProperties = {
  marginTop: 26,
  padding: "18px 18px",
  border: "1px solid #e7e5e4",
  borderRadius: 14,
  background: "#fff",
  textAlign: "left",
};

const blockTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.5,
  color: "#1c1917",
  fontWeight: 600,
};

const blockTextStyle: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: 14,
  lineHeight: 1.8,
  color: "#44403c",
};

const distributionGridStyle: React.CSSProperties = {
  marginTop: 10,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 8,
};

const distributionItemStyle: React.CSSProperties = {
  margin: 0,
  padding: "8px 10px",
  border: "1px solid #e7e5e4",
  borderRadius: 10,
  background: "#fafaf9",
  fontSize: 13,
  lineHeight: 1.6,
  color: "#292524",
};

const quoteStyle: React.CSSProperties = {
  margin: "10px 0 0",
  padding: "10px 12px",
  borderLeft: "3px solid #a8a29e",
  background: "#fafaf9",
  fontSize: 14,
  lineHeight: 1.8,
  color: "#292524",
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

const primaryLinkStyle: React.CSSProperties = {
  ...linkStyle,
  border: "1px solid #171717",
  background: "#171717",
  color: "#fff",
};
