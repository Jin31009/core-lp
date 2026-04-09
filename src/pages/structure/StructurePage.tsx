import React from "react";
import SiteHeader from "../../components/shared/SiteHeader";

type Props = {
  setPage: (page: string) => void;
};

export default function StructurePage({ setPage }: Props) {
  return (
    <>
      <SiteHeader setPage={setPage} />

      <main style={mainStyle}>
        <div style={containerStyle}>
          <p style={labelStyle}>Structure</p>

          <h1 style={titleStyle}>なぜ広報は機能しないのか</h1>

          {/* Executive Summary */}
          <section style={summaryWrap}>
            <p style={subLabelStyle}>Executive Summary</p>

            <h2 style={summaryTitle}>
              広報は、情報ではなく
              <br />
              関係の状態として扱われるべきである
            </h2>

            <div style={summaryBox}>
              <p style={summaryText}>
                広報はこれまで、表現力・経験・勘に依存する属人技として扱われてきた。
              </p>
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
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Figure</p>

            <h2 style={sectionTitleStyle}>広報の再定義</h2>

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
          </section>

          {/* Problem */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Problem</p>

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
            <p style={subLabelStyle}>Redefinition</p>

            <h2 style={sectionTitleStyle}>
              広報は、
              <br />
              関係の状態を整える体系である
            </h2>

            <p style={textStyle}>
              従来、広報は情報伝達として理解されてきた。
              <br />
              しかし本構想では、それを関係の構造として再定義する。
            </p>
          </section>

          {/* Observation */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Observation</p>

            <h2 style={sectionTitleStyle}>関係は、すでに現場に現れている</h2>

            <p style={textStyle}>
              患者の違和感や投書は、
              <br />
              単なる感情ではなく、
              <br />
              関係の状態の変化として現れる。
            </p>

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
            <p style={subLabelStyle}>Model</p>

            <h2 style={sectionTitleStyle}>RA-SS</h2>

            <p style={textStyle}>
              この構造を扱うためには、
              <br />
              観察可能なモデルが必要になる。
            </p>

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
            <p style={subLabelStyle}>Result</p>

            <h2 style={sectionTitleStyle}>関係は、扱える対象になる</h2>

            <p style={textStyle}>
              関係はこれまで、
              <br />
              感覚的に扱われてきた。
            </p>

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

          {/* Expansion */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Expansion</p>

            <h2 style={sectionTitleStyle}>
              構造化された広報は、
              <br />
              次の実践へ展開できる
            </h2>

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
    </>
  );
}

const mainStyle: React.CSSProperties = {
  background: "#f7f5f2",
  color: "#111",
  minHeight: "100vh",
  padding: "160px 48px",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 1080,
  margin: "0 auto",
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  opacity: 0.5,
  marginBottom: 28,
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: 44,
  lineHeight: 1.65,
  textAlign: "center",
  marginBottom: 56,
  letterSpacing: "-0.03em",
};

const subLabelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  opacity: 0.48,
  marginBottom: 20,
  textAlign: "center",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 32,
  lineHeight: 1.7,
  textAlign: "center",
  marginBottom: 24,
  letterSpacing: "-0.02em",
};

const textStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 2,
  opacity: 0.84,
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

const sectionStyle: React.CSSProperties = {
  marginTop: 96,
};

const summaryWrap: React.CSSProperties = {
  marginBottom: 88,
  textAlign: "center",
};

const summaryTitle: React.CSSProperties = {
  fontSize: 30,
  lineHeight: 1.75,
  marginBottom: 32,
  letterSpacing: "-0.02em",
};

const summaryBox: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "34px 32px",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.42)",
};

const summaryText: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 2,
  opacity: 0.9,
  margin: "0 0 12px",
};

const summaryTextLast: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 2,
  opacity: 0.9,
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
  border: "1px solid rgba(0,0,0,0.12)",
  padding: "26px 24px",
  minHeight: 168,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  background: "rgba(255,255,255,0.36)",
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
  lineHeight: 2,
  textAlign: "center",
  opacity: 0.84,
};

const flowStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 28,
  lineHeight: 2.25,
};

const quoteBox: React.CSSProperties = {
  maxWidth: 620,
  margin: "30px auto",
  padding: "28px",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.34)",
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
  border: "1px solid rgba(0,0,0,0.12)",
  background: "rgba(255,255,255,0.38)",
  padding: "30px 26px 28px",
  minHeight: 280,
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