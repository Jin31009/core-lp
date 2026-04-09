import React from "react";
import SiteHeader from "../../components/shared/SiteHeader";

type Props = {
  setPage: (page: string) => void;
};

export default function CasePage({ setPage }: Props) {
  return (
    <>
      <SiteHeader setPage={setPage} />

      <main style={mainStyle}>
        <div style={containerStyle}>
          <p style={labelStyle}>Case</p>

          <h1 style={titleStyle}>
            私たちはすでに、
            <br />
            関係を扱うためのPoC段階にある
          </h1>

          {/* Executive Summary */}
          <section style={summaryWrap}>
            <p style={subLabelStyle}>Executive Summary</p>

            <h2 style={summaryTitle}>
              広報は、
              <br />
              関係の状態を扱うものである
            </h2>

            <div style={summaryBox}>
              <p style={summaryText}>
                広報を関係の状態として捉えるという再定義は、
                <br />
                概念ではなく、概念実証（PoC）として提示されている。
              </p>

              <p style={summaryText}>
                RA-SS DEMOは、
                <br />
                関係を観察し、構造として整理し、
                <br />
                次の関係行為へつなげるプロトタイプとして機能している。
              </p>

              <p style={summaryTextLast}>
                実際に触れることで、
                <br />
                関係がどのように見えるかを体験できる。
              </p>
            </div>
          </section>

          {/* Figure */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Figure</p>

            <h2 style={sectionTitleStyle}>
              再定義は、操作プロセスとして実装されている
            </h2>

            <div style={figureWrap}>
              <div style={figureStep}>
                <p style={figureLabel}>Input</p>
                <p style={figureTitle}>出来事を記述する</p>
                <p style={figureBody}>
                  違和感や状況を
                  <br />
                  そのまま入力する
                </p>
              </div>

              <div style={arrow}>→</div>

              <div style={figureStep}>
                <p style={figureLabel}>Structure</p>
                <p style={figureTitle}>構造として整理する</p>
                <p style={figureBody}>
                  関係の緊張やズレを
                  <br />
                  構造として捉える
                </p>
              </div>

              <div style={arrow}>→</div>

              <div style={figureStep}>
                <p style={figureLabel}>Action</p>
                <p style={figureTitle}>関係行為へつなぐ</p>
                <p style={figureBody}>
                  次の一手を
                  <br />
                  関係行為として提示する
                </p>
              </div>

              <div style={arrow}>→</div>

              <div style={figureStep}>
                <p style={figureLabel}>Result</p>
                <p style={figureTitle}>結果を記録する</p>
                <p style={figureBody}>
                  改善・維持・悪化を
                  <br />
                  次の学習へつなげる
                </p>
              </div>
            </div>

            <p style={figureNote}>
              このプロセスは、実際のケース入力によって再現可能である。
            </p>
          </section>

          {/* Prototype */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Prototype</p>

            <h2 style={sectionTitleStyle}>
              RA-SS DEMOは、
              <br />
              関係の操作可能性を示す
            </h2>

            <p style={text}>
              それは判断を代行するシステムではない。
              <br />
              関係の状態を記述し、
              <br />
              構造として整理し、
              <br />
              次の関係行為へ接続するための装置である。
            </p>
          </section>

          {/* Process */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Process</p>

            <h2 style={sectionTitleStyle}>
              出来事は、
              <br />
              構造として扱われる
            </h2>

            <div style={flow}>
              <div>出来事</div>
              <div style={flowArrow}>↓</div>
              <div>関係の緊張</div>
              <div style={flowArrow}>↓</div>
              <div>意味のズレ</div>
              <div style={flowArrow}>↓</div>
              <div>関係行為</div>
            </div>

            <p style={text}>
              出来事はそのまま扱われるのではない。
              <br />
              分解され、構造として整理され、
              <br />
              介入可能な形へ再構成される。
            </p>
          </section>

          {/* Result */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Result</p>

            <h2 style={sectionTitleStyle}>
              関係は、
              <br />
              扱える対象になる
            </h2>

            <div style={resultGrid}>
              <div style={card}>
                <p style={cardTitle}>Observe</p>
                <p style={cardText}>関係の変化を観察できる</p>
              </div>
              <div style={card}>
                <p style={cardTitle}>Intervene</p>
                <p style={cardText}>次の一手へ介入できる</p>
              </div>
              <div style={card}>
                <p style={cardTitle}>Accumulate</p>
                <p style={cardText}>経験が蓄積される</p>
              </div>
            </div>

            <p style={text}>
              この実装は、
              <br />
              次の関係を整える起点にもなる。
            </p>
          </section>

          {/* CTA */}
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

/* ===== styles ===== */

const mainStyle = {
  background: "#f7f5f2",
  minHeight: "100vh",
  padding: "160px 48px",
};

const containerStyle = {
  maxWidth: 1080,
  margin: "0 auto",
};

const labelStyle = {
  fontSize: 11,
  textAlign: "center",
  opacity: 0.5,
  marginBottom: 28,
};

const titleStyle = {
  fontSize: 42,
  textAlign: "center",
  marginBottom: 56,
};

const subLabelStyle = {
  fontSize: 11,
  textAlign: "center",
  opacity: 0.5,
  marginBottom: 20,
};

const sectionStyle = {
  marginTop: 96,
};

const sectionTitleStyle = {
  fontSize: 30,
  textAlign: "center",
  marginBottom: 24,
};

const text = {
  fontSize: 17,
  lineHeight: 2,
  textAlign: "center",
};

const summaryWrap = { textAlign: "center", marginBottom: 80 };

const summaryTitle = { fontSize: 28, marginBottom: 24 };

const summaryBox = {
  border: "1px solid rgba(0,0,0,0.1)",
  padding: 28,
};

const summaryText = { marginBottom: 10 };

const summaryTextLast = {};

const figureWrap = {
  display: "grid",
  gridTemplateColumns: "1fr 40px 1fr 40px 1fr 40px 1fr",
  gap: 10,
};

const figureStep = {
  border: "1px solid rgba(0,0,0,0.1)",
  padding: 20,
};

const figureLabel = { fontSize: 12, opacity: 0.6 };
const figureTitle = { fontSize: 18 };
const figureBody = { fontSize: 14 };

const arrow = { textAlign: "center", fontSize: 20 };

const figureNote = { textAlign: "center", marginTop: 20 };

const flow = { textAlign: "center", fontSize: 22 };
const flowArrow = { opacity: 0.3 };

const resultGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: 20,
};

const card = { border: "1px solid rgba(0,0,0,0.1)", padding: 20 };

const cardTitle = { fontWeight: "bold" };
const cardText = {};

const ctaWrap = { textAlign: "center", marginTop: 100 };

const buttonStyle = {
  padding: "12px 24px",
  border: "1px solid rgba(0,0,0,0.2)",
};