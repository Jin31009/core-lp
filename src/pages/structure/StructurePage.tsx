
import SiteHeader from "../../components/shared/SiteHeader";
import EditorialSectionHeader from "../../components/shared/EditorialSectionHeader";
import FooterSection from "../../components/core/FooterSection";

type Props = {
  setPage: (page: string) => void;
};

export default function StructurePage({ setPage }: Props) {
  return (
    <>
      <SiteHeader setPage={setPage} currentPage="structure" />

      <main style={mainStyle}>
        <div style={containerStyle}>
          <section style={emphasisBandStyle}>
            <EditorialSectionHeader
              label="STRUCTURE"
              marker="lines"
              hero
              title="理論の裏側から、広報の再定義を読む"
              summary="ここでは、DEMOの背後にある考え方を、広報の再定義という観点から順に読み解きます。"
            />
          </section>

          {/* Executive Summary */}
          <section style={baseSectionStyle}>
            <EditorialSectionHeader
              label="STRUCTURE"
              marker="lines"
              title={
                <>
                  広報は、情報ではなく
                  <br />
                  関係の状態として扱われるべきである
                </>
              }
              summary="最初に、この構想全体を支えている論点を短く確認します。"
            />

            <div style={summaryBox}>
              <p style={summaryText}>ここは、DEMOの前提にある考え方を深く読むためのページです。</p>
              <p style={summaryText}>広報はこれまで、表現力・経験・勘に依存する属人技として扱われてきた。</p>
              <p style={summaryText}>
                その結果、再現できず、組織に残らず、学習されにくい。
              </p>
              <p style={summaryText}>問題は能力ではなく構造にある。</p>
              <p style={summaryText}>
                本構想では広報を「関係の状態を整える体系」として再定義し、
                観察・分析・介入可能な構造として扱う。
              </p>
              <p style={summaryTextLast}>そのためのモデルがRA-SSである。</p>
            </div>
          </section>

          {/* Figure */}
          <section style={frameSectionStyle}>
            <div style={framePanelStyle}>
              <EditorialSectionHeader
                label="STRUCTURE"
                marker="lines"
                title="広報の再定義"
                summary="従来の広報観と、関係の状態を扱う構想との差を図として示します。"
              />

              <div style={figureWrap}>
                <div style={figureColumn}>
                  <p style={figureHeading}>Conventional PR</p>

                  <div style={figureCard}>
                    <p style={figureItem}>表現に依存する</p>
                    <p style={figureItem}>経験と勘に依存する</p>
                    <p style={figureItem}>属人的に対応する</p>
                  </div>

                  <div style={figureArrow}>↓</div>

                  <div style={figureOutcomeBox}>
                    <p style={figureOutcome}>再現できない</p>
                    <p style={figureOutcome}>組織に残らない</p>
                    <p style={figureOutcome}>学習されない</p>
                  </div>
                </div>

                <div style={figureCenter}>→</div>

                <div style={figureColumn}>
                  <p style={figureHeading}>Relational Architecture</p>

                  <div style={figureCard}>
                    <p style={figureItem}>関係の状態を観察する</p>
                    <p style={figureItem}>構造として捉える</p>
                    <p style={figureItem}>介入可能にする</p>
                  </div>

                  <div style={figureArrow}>↓</div>

                  <div style={figureOutcomeBox}>
                    <p style={figureOutcome}>再現できる</p>
                    <p style={figureOutcome}>組織に残る</p>
                    <p style={figureOutcome}>学習される</p>
                  </div>
                </div>
              </div>

              <p style={figureNote}>
                広報の課題は、表現力の不足ではない。
                <br />
                関係を扱う構造を持たなかったことにある。
              </p>
            </div>
          </section>

          <div style={baseBandStyle}>
            {/* Problem */}
            <section style={sectionStyle}>
              <EditorialSectionHeader
                label="PROBLEM"
                marker="square"
                title="構造的な課題"
                summary="属人性に依存した広報は、再現性と学習可能性を失いやすくなります。"
              />

              <div style={flowStyle}>
                <div>属人性への依存</div>
                <div style={{ opacity: 0.3 }}>↓</div>
                <div>再現性の欠如</div>
                <div style={{ opacity: 0.3 }}>↓</div>
                <div>効果測定の不可能性</div>
              </div>

              <p style={noteStyle}>
                これは能力の問題ではなく、構造の問題である。
              </p>

              <p style={logicStyle}>
                したがって、広報は「情報」ではなく、
                <br />
                関係の状態として扱われなければならない。
              </p>
            </section>

            {/* Redefinition */}
            <section style={sectionStyle}>
              <EditorialSectionHeader
                label="REDEFINITION"
                marker="double-circle"
                title={
                  <>
                    広報は、
                    <br />
                    関係の状態を整える体系である
                  </>
                }
                summary="本構想では、広報を単なる情報伝達ではなく、関係を整える営みとして捉え直します。"
              />
            </section>

            {/* Observation */}
            <section style={sectionStyle}>
              <EditorialSectionHeader
                label="STRUCTURE"
                marker="lines"
                title="関係は、すでに現場に現れている"
                summary="違和感や投書は感情の断片ではなく、関係の状態変化として読み直すことができます。"
              />

              <div style={quoteBox}>
                <p style={quoteStyle}>
                  「待たされた」ではなく、
                  <br />
                  「見てもらえていない」という認識
                </p>
              </div>

              <p style={textStyle}>
                これは偶然ではなく、
                <br />
                関係構造が変化した結果である。
              </p>
            </section>

            {/* Model */}
            <section style={sectionStyle}>
              <EditorialSectionHeader
                label="METHOD"
                marker="lines"
                title="RA-SS"
                summary="この構造を扱うために、観察と分析と介入を支えるモデルとしてRA-SSを置きます。"
              />

              <p style={textStyle}>
                RA-SSは、
                <br />
                関係を構造として捉え、
                <br />
                観察・分析・介入するための視点であり装置である。
              </p>
            </section>

            {/* Result */}
            <section style={sectionStyle}>
              <EditorialSectionHeader
                label="STRUCTURE"
                marker="lines"
                title="関係は、扱える対象になる"
                summary="構造として捉えることで、これまで感覚的だった対応も観察・介入・再現の対象になります。"
              />

              <div style={resultFlowWrap}>
                <p style={resultFlowItem}>観察できる</p>
                <p style={resultFlowItem}>介入できる</p>
                <p style={resultFlowItem}>再現できる</p>
              </div>

              <p style={textStyle}>
                構造として捉えることで、
                <br />
                関係は「扱えないもの」ではなく、
                <br />
                扱える対象へと変わる。
              </p>
            </section>
          </div>

          {/* Expansion */}
          <section style={emphasisSectionStyle}>
            <EditorialSectionHeader
              label="STRUCTURE"
              marker="lines"
              title={
                <>
                  構造化された広報は、
                  <br />
                  次の実践へ展開できる
                </>
              }
              summary="構造として残された知見は、次の現場に展開され、組織の技として蓄積されていきます。"
            />

            <div style={expansionGridStyle}>
              <div style={expansionCardStyle}>
                <p style={expansionHeadStyle}>Reframe</p>
                <p style={expansionLeadStyle}>関係の再認識が始まる</p>
                <p style={expansionBodyStyle}>
                  不満や違和感を、感情的な反応としてではなく、
                  <br />
                  関係の状態変化として捉え直す。
                </p>
              </div>

              <div style={expansionCardStyle}>
                <p style={expansionHeadStyle}>Co-create</p>
                <p style={expansionLeadStyle}>AIと共に整理し、考える</p>
                <p style={expansionBodyStyle}>
                  AIは判断を代行する道具ではない。
                  <br />
                  構造化を支援し、人の観察・解釈・判断を補助する
                  <br />
                  共考のパートナーである。
                </p>
              </div>

              <div style={expansionCardStyle}>
                <p style={expansionHeadStyle}>Structure</p>
                <p style={expansionLeadStyle}>組織の技として定着する</p>
                <p style={expansionBodyStyle}>
                  個人の経験に閉じていた対応が、
                  <br />
                  再現可能な知識となり、
                  <br />
                  次の実践へ引き継がれていく。
                </p>
              </div>
            </div>

            <p style={expansionClosingStyle}>
              属人技は構造化されることで、
              <br />
              個人の経験から、組織の再現可能な力へと転換される。
            </p>
          </section>

          <div style={ctaWrap}>
            <button onClick={() => setPage("corelp")} style={buttonStyle}>
              TOPへ戻る
            </button>
          </div>
        </div>
      </main>
      <FooterSection setPage={setPage} />
    </>
  );
}


const mainStyle: React.CSSProperties = {
  background: "#f7f5f2",
  color: "#111",
  minHeight: "100vh",
  padding: "128px 24px 96px",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
};

const textStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  fontSize: 17,
  lineHeight: 1.95,
  color: "#404040",
  textAlign: "center",
};

const noteStyle: React.CSSProperties = {
  marginTop: 42,
  fontSize: 18,
  lineHeight: 1.9,
  fontWeight: 700,
  textAlign: "center",
};

const logicStyle: React.CSSProperties = {
  marginTop: 36,
  fontSize: 20,
  lineHeight: 1.95,
  textAlign: "center",
  fontWeight: 600,
};

const emphasisBandStyle: React.CSSProperties = {
  background: "#fff",
  padding: "160px 24px 112px",
};

const baseSectionStyle: React.CSSProperties = {
  background: "rgba(245,245,244,0.7)",
  marginTop: 88,
  padding: "56px 32px",
  textAlign: "center",
};

const frameSectionStyle: React.CSSProperties = {
  marginTop: 88,
};

const framePanelStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.75)",
  border: "1px solid rgba(0,0,0,0.05)",
  borderRadius: 24,
  padding: "56px 32px",
};

const baseBandStyle: React.CSSProperties = {
  background: "rgba(245,245,244,0.6)",
  marginTop: 88,
  padding: "56px 32px",
};

const emphasisSectionStyle: React.CSSProperties = {
  background: "rgba(245,245,244,0.7)",
  marginTop: 88,
  padding: "56px 32px",
};

const sectionStyle: React.CSSProperties = {
  marginTop: 88,
};

const summaryBox: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "10px 0 0",
};

const summaryText: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.95,
  color: "#404040",
  margin: "0 0 12px",
};

const summaryTextLast: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.95,
  color: "#404040",
  margin: 0,
};

const figureWrap: React.CSSProperties = {
  marginTop: 32,
  display: "grid",
  gridTemplateColumns: "1fr 72px 1fr",
  alignItems: "center",
  gap: 24,
};

const figureColumn: React.CSSProperties = {
  minHeight: 100,
};

const figureCenter: React.CSSProperties = {
  textAlign: "center",
  fontSize: 34,
  opacity: 0.42,
};

const figureHeading: React.CSSProperties = {
  textAlign: "center",
  fontSize: 16,
  letterSpacing: "0.06em",
  marginBottom: 18,
  opacity: 0.76,
};

const figureCard: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.05)",
  padding: "26px 24px",
  minHeight: 168,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  background: "rgba(255,255,255,0.72)",
  borderRadius: 24,
};

const figureItem: React.CSSProperties = {
  margin: "0 0 14px",
  textAlign: "center",
  fontSize: 20,
  lineHeight: 1.75,
};

const figureArrow: React.CSSProperties = {
  textAlign: "center",
  fontSize: 30,
  opacity: 0.34,
  margin: "18px 0",
};

const figureOutcomeBox: React.CSSProperties = {
  borderTop: "1px solid rgba(0,0,0,0.12)",
  paddingTop: 18,
};

const figureOutcome: React.CSSProperties = {
  margin: "0 0 10px",
  textAlign: "center",
  fontSize: 16,
  lineHeight: 1.85,
  opacity: 0.86,
};

const figureNote: React.CSSProperties = {
  marginTop: 32,
  fontSize: 17,
  lineHeight: 1.95,
  textAlign: "center",
  color: "#404040",
};

const flowStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 28,
  lineHeight: 2.25,
};

const quoteBox: React.CSSProperties = {
  maxWidth: 620,
  margin: "30px auto",
  padding: "10px 0",
};

const quoteStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.9,
  textAlign: "center",
};

const resultFlowWrap: React.CSSProperties = {
  maxWidth: 560,
  margin: "30px auto",
  padding: "26px 22px",
  borderTop: "1px solid rgba(0,0,0,0.12)",
  borderBottom: "1px solid rgba(0,0,0,0.12)",
};

const resultFlowItem: React.CSSProperties = {
  margin: "0 0 12px",
  textAlign: "center",
  fontSize: 22,
  lineHeight: 1.9,
};

const expansionGridStyle: React.CSSProperties = {
  marginTop: 38,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 24,
  alignItems: "stretch",
};

const expansionCardStyle: React.CSSProperties = {
  padding: "8px 16px",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
};

const expansionHeadStyle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  opacity: 0.68,
};

const expansionLeadStyle: React.CSSProperties = {
  margin: "0 0 16px",
  fontSize: 24,
  lineHeight: 1.65,
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

const expansionBodyStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 17,
  lineHeight: 2,
  opacity: 0.88,
};

const expansionClosingStyle: React.CSSProperties = {
  marginTop: 36,
  fontSize: 18,
  lineHeight: 2,
  textAlign: "center",
  opacity: 0.86,
};

const ctaWrap: React.CSSProperties = {
  marginTop: 108,
  textAlign: "center",
};

const buttonStyle: React.CSSProperties = {
  padding: "13px 26px",
  border: "1px solid rgba(0,0,0,0.24)",
  background: "transparent",
  cursor: "pointer",
  fontSize: 15,
};
