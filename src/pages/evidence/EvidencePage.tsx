import type { CSSProperties } from "react";
import type { Page } from "../../App";

type Props = {
  setPage: (page: Page) => void;
};

export default function EvidencePage({ setPage }: Props) {
  return (
    <main style={pageWrap}>
      <div style={container}>
        <p style={labelStyle}>Evidence</p>

        <h1 style={titleStyle}>
          Evidence is not only proof.
          <br />
          It is a basis for iteration.
        </h1>

        <section style={summaryWrap}>
          <p style={subLabelStyle}>Executive Summary</p>
          <p style={textStyle}>
            COREにおけるEvidenceは、単に正しさを証明するための資料ではありません。
            仮説、観察、試作、実装のあいだを往復しながら、
            次の改善や対話へ接続するための根拠として機能します。
          </p>
        </section>

        <section style={sectionWrap}>
          <p style={subLabelStyle}>Figure</p>
          <h2 style={sectionTitleStyle}>Evidence as layered validation</h2>

          <div style={figureWrap}>
            <div style={figureCard}>
              <div style={figureTitle}>Academic</div>
              <p style={figureText}>理論的な位置づけと記述の厳密性</p>
            </div>

            <div style={figureArrow}>→</div>

            <div style={figureCard}>
              <div style={figureTitle}>Thought</div>
              <p style={figureText}>概念の再定義と編集的統合</p>
            </div>

            <div style={figureArrow}>→</div>

            <div style={figureCard}>
              <div style={figureTitle}>Practice</div>
              <p style={figureText}>現場での接続可能性と反復改善</p>
            </div>
          </div>

          <p style={figureNote}>
            Evidenceは単層ではなく、理論・思考・実践の重なりによって成立します。
          </p>
        </section>

        <section style={sectionWrap}>
          <p style={subLabelStyle}>Academic</p>
          <h2 style={sectionTitleStyle}>Research gives structure to meaning.</h2>
          <p style={blockLead}>
            学術的な整理は、概念の輪郭を曖昧なままにしないための基礎です。
          </p>
          <p style={blockText}>
            どのような問いを立て、どのようなデータや事例を扱い、どのように構造として読むのか。
            その記述の厳密性が、後続のPrototypeやDialogueの質を支えます。
          </p>
        </section>

        <section style={sectionWrap}>
          <p style={subLabelStyle}>Thought</p>
          <h2 style={sectionTitleStyle}>Concept becomes communicable through editing.</h2>
          <p style={blockLead}>
            思考は、編集されてはじめて他者と共有できる形になります。
          </p>
          <p style={blockText}>
            COREでは、理論をそのまま提示するのではなく、
            LP、スライド、図版、テキストを通して、理解可能な単位に編成します。
            その編集過程そのものがEvidenceの一部です。
          </p>
        </section>

        <section style={sectionWrap}>
          <p style={subLabelStyle}>Practice</p>
          <h2 style={sectionTitleStyle}>Evidence returns to the field.</h2>
          <p style={blockLead}>
            根拠は、現場に返ってはじめて次の意味を持ちます。
          </p>
          <p style={blockText}>
            接点で使われ、再び観察され、改良されることで、
            概念は静的な説明ではなく、学習可能な実践知へと変わっていきます。
          </p>
        </section>

        <section style={sectionWrap}>
          <p style={subLabelStyle}>Closing</p>
          <h2 style={sectionTitleStyle}>Evidence supports the next conversation.</h2>
          <p style={textStyle}>
            COREが目指しているのは、研究成果の展示ではありません。
            概念、試作、運用、対話が循環するための基盤をつくることです。
          </p>
          <p style={textStyle}>
            そのためEvidenceページは、過去の成果を並べる場所ではなく、
            次の実装や協働に向けた判断の足場として構成されています。
          </p>
        </section>

        <div style={ctaWrap}>
          <button onClick={() => setPage("contact")} style={primaryButton}>
            Contactへ
          </button>
        </div>
      </div>
    </main>
  );
}

const pageWrap: CSSProperties = {
  padding: "96px 24px 120px",
};

const container: CSSProperties = {
  maxWidth: 1080,
  margin: "0 auto",
};

const labelStyle: CSSProperties = {
  textAlign: "center",
  opacity: 0.6,
  marginBottom: 16,
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const titleStyle: CSSProperties = {
  fontSize: "clamp(32px, 5vw, 58px)",
  textAlign: "center",
  marginBottom: 28,
  lineHeight: 1.15,
  fontWeight: 600,
};

const summaryWrap: CSSProperties = {
  textAlign: "center",
  marginBottom: 56,
  maxWidth: 780,
  marginLeft: "auto",
  marginRight: "auto",
};

const subLabelStyle: CSSProperties = {
  textAlign: "center",
  opacity: 0.6,
  marginBottom: 14,
  fontSize: 12,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const sectionWrap: CSSProperties = {
  marginBottom: 56,
};

const sectionTitleStyle: CSSProperties = {
  fontSize: 28,
  textAlign: "center",
  marginBottom: 22,
  lineHeight: 1.3,
  fontWeight: 600,
};

const figureWrap: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 60px 1fr 60px 1fr",
  gap: 12,
  alignItems: "center",
};

const figureCard: CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e5e0",
  borderRadius: 18,
  padding: 22,
  minHeight: 150,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const figureTitle: CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 10,
  textAlign: "center",
};

const figureText: CSSProperties = {
  textAlign: "center",
  fontSize: 14,
  lineHeight: 1.7,
  color: "#555",
};

const figureArrow: CSSProperties = {
  textAlign: "center",
  fontSize: 28,
  opacity: 0.45,
};

const figureNote: CSSProperties = {
  textAlign: "center",
  marginTop: 18,
  fontSize: 14,
  color: "#666",
};

const blockLead: CSSProperties = {
  textAlign: "center",
  marginBottom: 12,
  fontSize: 18,
  lineHeight: 1.8,
  fontWeight: 500,
  color: "#222",
};

const blockText: CSSProperties = {
  textAlign: "center",
  fontSize: 16,
  lineHeight: 1.95,
  color: "#444",
  maxWidth: 820,
  margin: "0 auto",
};

const textStyle: CSSProperties = {
  fontSize: 17,
  lineHeight: 1.95,
  textAlign: "center",
  color: "#444",
  maxWidth: 820,
  margin: "0 auto 16px",
};

const ctaWrap: CSSProperties = {
  textAlign: "center",
  marginTop: 28,
};

const primaryButton: CSSProperties = {
  border: "none",
  background: "#111111",
  color: "#ffffff",
  padding: "14px 22px",
  borderRadius: 999,
  fontSize: 14,
  cursor: "pointer",
};