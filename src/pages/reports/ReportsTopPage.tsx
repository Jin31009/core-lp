import FooterSection from "../../components/core/FooterSection";
import SiteHeader from "../../components/shared/SiteHeader";
import EditorialSectionHeader from "../../components/shared/EditorialSectionHeader";

type Props = {
  setPage: (page: string) => void;
};

const summaryCards = [
  {
    title: "関係のずれが起点",
    body: "多くの投書で前面に出ていたのは、出来事そのものよりも『どう扱われたと感じたか』でした。",
  },
  {
    title: "説明不足が不安を増幅",
    body: "十分な説明がない、あるいは順番が合っていないとき、不安や不信は静かに大きくなっていました。",
  },
  {
    title: "最初の一手が重要",
    body: "問題解決より前に、最初にどう受け止めるかで、その後の関係の戻り方が変わる場面が見られました。",
  },
] as const;

const actionItems = [
  { code: "A", title: "まず受け止める", body: "何に引っかかりが残ったのかを丁寧に受け止める。" },
  { code: "C", title: "状況を説明する", body: "いま何が起きていて、なぜそうなっているのかを整理して伝える。" },
  { code: "E", title: "次の見通しを示す", body: "このあと何が起きるのか、誰が関わるのかを示す。" },
] as const;

export default function ReportsTopPage({ setPage }: Props) {
  return (
    <div style={pageShellStyle}>
      <SiteHeader setPage={setPage} currentPage="reports" />

      <main style={mainStyle}>
        <section style={heroSectionStyle}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="REPORT"
              marker="lines"
              hero
              title={<>303件の投書から見えたのは、<br />問題そのものではなく「関係のずれ」でした。</>}
              summary="このページは、LPで示した考え方とDEMOで体験できる構造のあいだにある、観察的な裏付けを静かに示すための入口です。"
            />

            <div style={heroBodyStyle}>
              <p style={bodyTextStyle}>投書は単なる不満の集積ではなく、関係のどこで違和感が生まれたかを読み取る手がかりになり得ます。</p>
              <p style={{...bodyTextStyle, borderBottom: "1px solid #e7e5e4"}}>ここでは研究レポートの入口として、代表的な示唆と最初の一手を静かな誌面トーンで整理しています。</p>
            </div>

            <div style={ctaWrapStyle}>
              <button type="button" onClick={() => setPage("demo-intro")} style={primaryButtonStyle}>DEMOで体験する</button>
              <button type="button" onClick={() => setPage("top")} style={secondaryButtonStyle}>LPへ戻る</button>
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="SUMMARY"
              marker="square"
              title="このレポートで先に押さえたいこと"
              summary="まずは、全体を読む前に見えていた傾向を3つの短いカードで整理します。"
            />
            <div style={cardGridStyle}>
              {summaryCards.map((card, index) => (
                <div key={card.title} style={cardStyle}>
                  <p style={indexStyle}>0{index + 1}</p>
                  <p style={cardTitleStyle}>{card.title}</p>
                  <p style={cardBodyStyle}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{...sectionStyle, background: "#f7f5f2"}}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="FIRST ACTIONS"
              marker="triangle"
              title="分析から見えてきた、最初の一手"
              summary="多くの場面で必要だったのは、大きな対策ではなく、最初の関わり方でした。"
            />
            <div style={cardGridStyle}>
              {actionItems.map((item) => (
                <div key={item.code} style={cardStyle}>
                  <p style={indexStyle}>{item.code}</p>
                  <p style={cardTitleStyle}>{item.title}</p>
                  <p style={cardBodyStyle}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FooterSection setPage={setPage} />
    </div>
  );
}

const pageShellStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#fcfbf8",
  color: "#171717",
};

const mainStyle: React.CSSProperties = {
  display: "block",
};

const heroSectionStyle: React.CSSProperties = {
  padding: "clamp(72px, 10vw, 120px) 20px 72px",
  background: "#ffffff",
};

const sectionStyle: React.CSSProperties = {
  padding: "72px 20px",
  background: "#ffffff",
};

const contentWidthStyle: React.CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
};

const heroBodyStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "40px auto 0",
  borderTop: "1px solid #e7e5e4",
};

const bodyTextStyle: React.CSSProperties = {
  margin: 0,
  padding: "20px 0",
  fontSize: 16,
  lineHeight: 1.9,
  color: "#44403c",
  borderBottom: "1px solid #e7e5e4",
  textAlign: "left",
};

const ctaWrapStyle: React.CSSProperties = {
  marginTop: 28,
  display: "flex",
  justifyContent: "center",
  gap: 12,
  flexWrap: "wrap",
};

const primaryButtonStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 22px",
  borderRadius: 999,
  border: "1px solid #171717",
  background: "#171717",
  color: "#fff",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  minWidth: 168,
};

const secondaryButtonStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 22px",
  borderRadius: 999,
  border: "1px solid #d4d4d4",
  background: "#fff",
  color: "#262626",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  minWidth: 168,
};

const cardGridStyle: React.CSSProperties = {
  marginTop: 32,
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e7e5e4",
  padding: 24,
};

const indexStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: "0.22em",
  color: "#a8a29e",
  fontWeight: 500,
};

const cardTitleStyle: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: 20,
  lineHeight: 1.6,
  fontWeight: 600,
  color: "#171717",
};

const cardBodyStyle: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: 15,
  lineHeight: 1.9,
  color: "#44403c",
};
