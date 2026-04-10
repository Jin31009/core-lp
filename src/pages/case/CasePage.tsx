import type { CSSProperties } from "react";
import type { Page } from "../../App";

type Props = {
  setPage: (page: Page) => void;
};

export default function CasePage({ setPage }: Props) {
  return (
    <main style={pageWrap}>
      <div style={container}>
        <p style={labelStyle}>Case</p>

        <h1 style={titleStyle}>
          Concept is validated
          <br />
          through situated cases.
        </h1>

        <section style={summaryWrap}>
          <p style={subLabelStyle}>Executive Summary</p>
          <p style={text}>
            COREが提示する構造は、抽象概念として閉じるのではなく、
            実際の接点や現場の観察から往復しながら検証されるべきものです。
            そのためCaseページでは、構造がどのように記述され、どのように読み替えられ、
            次の行動に接続されるのかを示します。
          </p>
        </section>

        <section style={sectionWrap}>
          <p style={subLabelStyle}>Figure</p>
          <h2 style={sectionTitleStyle}>Case as structured interpretation</h2>

          <div style={figureWrap}>
            <div style={figureCard}>
              <div style={figureTitle}>Observation</div>
              <p style={figureText}>現場で発生した記述や違和感を採取する</p>
            </div>

            <div style={arrow}>→</div>

            <div style={figureCard}>
              <div style={figureTitle}>Structuring</div>
              <p style={figureText}>関係の緊張・ズレ・前兆として再配置する</p>
            </div>

            <div style={arrow}>→</div>

            <div style={figureCard}>
              <div style={figureTitle}>Interpretation</div>
              <p style={figureText}>意味のあるケースとして再読し、次の判断へつなぐ</p>
            </div>

            <div style={arrow}>→</div>

            <div style={figureCard}>
              <div style={figureTitle}>Action</div>
              <p style={figureText}>Prototype / Dialogue / Recordへ返す</p>
            </div>
          </div>

          <p style={figureNote}>
            ケースは事例の集積ではなく、概念が現場と接続されるための検証単位です。
          </p>
        </section>

        <section style={sectionWrap}>
          <p style={subLabelStyle}>Prototype</p>
          <h2 style={sectionTitleStyle}>Case is not archive, but interface.</h2>
          <p style={text}>
            事例を蓄積するだけでは、実践知は共有されません。重要なのは、
            ケースが再利用可能な構造として記述され、他者が読み、判断し、
            次の行動へ接続できることです。COREではこの過程を、
            「事例保存」ではなく「構造化された接点」として扱います。
          </p>
        </section>

        <section style={sectionWrap}>
          <p style={subLabelStyle}>Process</p>
          <h2 style={sectionTitleStyle}>Observation → Structure → Reuse</h2>
          <div style={flow}>
            <div style={flowItem}>Write</div>
            <div style={flowArrow}>→</div>
            <div style={flowItem}>Interpret</div>
            <div style={flowArrow}>→</div>
            <div style={flowItem}>Prototype</div>
            <div style={flowArrow}>→</div>
            <div style={flowItem}>Return to field</div>
          </div>
          <p style={text}>
            このページは、単一の成功事例を誇示するためではなく、
            構造が複数の現場や課題にまたがって再利用できるかを確認するためのものです。
          </p>
        </section>

        <section style={sectionWrap}>
          <p style={subLabelStyle}>Result</p>
          <h2 style={sectionTitleStyle}>Case becomes evidence for design.</h2>
          <p style={text}>
            ここで得られるのは、単なる感想ではありません。どのような構造が有効か、
            どのような記述が再利用可能か、どこで意味のずれが起きるかという、
            設計上の判断材料です。CaseはEvidenceへ接続され、
            理論・実務・試作の中間地帯を形づくります。
          </p>
        </section>

        <div style={ctaWrap}>
          <button onClick={() => setPage("evidence")} style={primaryButton}>
            Evidenceへ
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
  fontSize: 12,
  textAlign: "center",
  opacity: 0.6,
  marginBottom: 16,
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
  fontSize: 12,
  textAlign: "center",
  opacity: 0.6,
  marginBottom: 14,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const sectionWrap: CSSProperties = {
  marginBottom: 56,
};

const sectionTitleStyle: CSSProperties = {
  fontSize: 28,
  textAlign: "center",
  marginBottom: 24,
  lineHeight: 1.3,
  fontWeight: 600,
};

const text: CSSProperties = {
  fontSize: 17,
  lineHeight: 1.95,
  textAlign: "center",
  color: "#444",
  maxWidth: 820,
  margin: "0 auto",
};

const figureWrap: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 12,
  alignItems: "center",
};

const figureCard: CSSProperties = {
  gridColumn: "span 1",
  background: "#fff",
  border: "1px solid #e5e5e0",
  borderRadius: 18,
  padding: 18,
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
  fontSize: 14,
  lineHeight: 1.7,
  textAlign: "center",
  color: "#555",
};

const arrow: CSSProperties = {
  textAlign: "center",
  fontSize: 28,
  opacity: 0.5,
};

const figureNote: CSSProperties = {
  textAlign: "center",
  marginTop: 18,
  fontSize: 14,
  color: "#666",
};

const flow: CSSProperties = {
  textAlign: "center",
  fontSize: 16,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 22,
};

const flowItem: CSSProperties = {
  padding: "12px 18px",
  border: "1px solid #e5e5e0",
  borderRadius: 999,
  background: "#fff",
};

const flowArrow: CSSProperties = {
  fontSize: 22,
  opacity: 0.5,
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