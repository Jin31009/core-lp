import React from "react";
import SiteHeader from "../../components/shared/SiteHeader";

type Props = {
  setPage: (page: string) => void;
};

export default function EvidencePage({ setPage }: Props) {
  return (
    <>
      <SiteHeader setPage={setPage} />

      <main style={mainStyle}>
        <div style={containerStyle}>
          <p style={labelStyle}>Evidence</p>

          <h1 style={titleStyle}>
            この構想は、
            <br />
            いくつかの現場との関わりの中で形づくられてきた
          </h1>

          {/* Executive Summary */}
          <section style={summaryWrap}>
            <p style={subLabelStyle}>Executive Summary</p>

            <h2 style={summaryTitle}>
              理論だけでも、
              <br />
              実装だけでもない
            </h2>

            <div style={summaryBox}>
              <p style={summaryText}>
                広報を関係として捉えるという考えは、
                <br />
                一度に生まれたものではない。
              </p>

              <p style={summaryText}>
                学術的な問い、言葉としての整理、
                <br />
                そして現場での試行を行き来する中で、
                <br />
                少しずつ形になってきた。
              </p>

              <p style={summaryText}>
                まだ途中にあるが、
                <br />
                この視点はすでにいくつかの現場で共有され始めている。
              </p>

              <p style={summaryTextLast}>
                以下は、その過程の一部である。
              </p>
            </div>
          </section>

          {/* Figure */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Figure</p>

            <h2 style={sectionTitleStyle}>
              この構想は、
              <br />
              往復の中で形づくられてきた
            </h2>

            <div style={figureWrap}>
              <div style={figureBlock}>
                <p style={figureLabel}>Question</p>
                <p style={figureTitle}>問い</p>
                <p style={figureText}>
                  学術・研究としての問い
                </p>
              </div>

              <div style={figureArrow}>→</div>

              <div style={figureBlock}>
                <p style={figureLabel}>Language</p>
                <p style={figureTitle}>言語化</p>
                <p style={figureText}>
                  note・概念整理・
                  <br />
                  言葉としての構築
                </p>
              </div>

              <div style={figureArrow}>→</div>

              <div style={figureBlock}>
                <p style={figureLabel}>Practice</p>
                <p style={figureTitle}>実践</p>
                <p style={figureText}>
                  現場との接点・
                  <br />
                  編集・支援
                </p>
              </div>
            </div>

            <p style={figureNote}>
              一方向ではなく、
              <br />
              この往復の中で構想は更新されてきた。
            </p>
          </section>

          {/* Academic */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Academic</p>

            <h2 style={sectionTitleStyle}>
              問いとして、
              <br />
              外に開いてきた
            </h2>

            <div style={blockStyle}>
              <p style={blockLead}>
                この構想は、
                <br />
                学会発表や研究構成の中で
                <br />
                検討されてきた。
              </p>

              <p style={blockText}>
                成果を示すことよりも、
                <br />
                外部からの視点にさらされてきたことが重要である。
              </p>
            </div>
          </section>

          {/* Thought */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Thought</p>

            <h2 style={sectionTitleStyle}>
              言葉として、
              <br />
              繰り返し書いてきた
            </h2>

            <div style={blockStyle}>
              <p style={blockLead}>
                この考えは、
                <br />
                noteなどを通じて
                <br />
                何度も言い直されてきた。
              </p>

              <p style={blockText}>
                一度の説明で完結するのではなく、
                <br />
                少しずつ輪郭を持ってきた。
              </p>
            </div>
          </section>

          {/* Practice */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Practice</p>

            <h2 style={sectionTitleStyle}>
              現場との接点の中で、
              <br />
              確かめてきた
            </h2>

            <div style={blockStyle}>
              <p style={blockLead}>
                医療広報の企画・編集・支援を通じて、
                <br />
                多くの現場と関わってきた。
              </p>

              <p style={blockText}>
                そこで繰り返し見えてきたのは、
                <br />
                広報が情報だけでは扱えないという事実である。
              </p>
            </div>
          </section>

          {/* Closing */}
          <section style={sectionStyle}>
            <p style={subLabelStyle}>Closing</p>

            <h2 style={sectionTitleStyle}>
              この構想は、
              <br />
              まだ途中にある
            </h2>

            <p style={textStyle}>
              ここまでの積み重ねはあるが、
              <br />
              まだ十分とは言えない。
            </p>

            <p style={textStyle}>
              だからこそ、
              <br />
              現場とともに試しながら、
              <br />
              構造として整えていく必要がある。
            </p>

            <p style={textStyle}>
              この積み重ねが、
              <br />
              関係を構造として扱うという発想につながっている。
            </p>

            <p style={textStyle}>
              このページは、
              <br />
              その入口のひとつである。
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

/* ===== styles（変更なし） ===== */

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

const textStyle = {
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
  gridTemplateColumns: "1fr 40px 1fr 40px 1fr",
  gap: 10,
};

const figureBlock = {
  border: "1px solid rgba(0,0,0,0.1)",
  padding: 20,
};

const figureLabel = { fontSize: 12, opacity: 0.6 };
const figureTitle = { fontSize: 20 };
const figureText = { fontSize: 14 };

const figureArrow = { textAlign: "center" };
const figureNote = { textAlign: "center", marginTop: 20 };

const blockStyle = {
  borderTop: "1px solid rgba(0,0,0,0.1)",
  borderBottom: "1px solid rgba(0,0,0,0.1)",
  padding: 24,
};

const blockLead = { textAlign: "center", marginBottom: 10 };
const blockText = { textAlign: "center" };

const ctaWrap = { textAlign: "center", marginTop: 100 };

const buttonStyle = {
  padding: "12px 24px",
  border: "1px solid rgba(0,0,0,0.2)",
};