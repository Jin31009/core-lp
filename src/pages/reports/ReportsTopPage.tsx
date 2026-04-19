import { ArrowRight, Circle, FileText } from "lucide-react";
import FooterSection from "../../components/core/FooterSection";
import SiteHeader from "../../components/shared/SiteHeader";
import EditorialSectionHeader from "../../components/shared/EditorialSectionHeader";

type Props = {
  setPage: (page: string) => void;
};

const timingFindings = [
  {
    id: "01",
    title: "待機不信発生",
    description: "待たされている理由が理解できない瞬間",
    count: 51,
    note: "受付・待機由来",
  },
  {
    id: "02",
    title: "説明断絶発生",
    description: "理解できないまま進行した瞬間",
    count: 8,
    note: "説明由来",
  },
  {
    id: "03",
    title: "応答不在発生",
    description: "自分が見られていないと感じた瞬間",
    count: 75,
    note: "処置・対応中由来",
  },
  {
    id: "04",
    title: "意思決定不一致",
    description: "納得できないまま決定された瞬間",
    count: 24,
    note: "結果・方針説明由来",
  },
  {
    id: "05",
    title: "事後不安再燃",
    description: "帰宅後に不安が再燃した瞬間",
    count: 16,
    note: "帰宅後・フォロー由来",
  },
] as const;

const structureFindings = [
  {
    title: "A欠損",
    body: "認識されていない状態。遷移群では A の欠損が目立ち、関係悪化の起点として観察された。",
  },
  {
    title: "e2継続",
    body: "状態がそのまま続くこと。遷移群では e2 がほぼ必須条件に近く、継続が臨界化に寄与した。",
  },
  {
    title: "P不安",
    body: "見通しが立たないことによる不安。遷移群では Predictability の不安が優位に観察された。",
  },
  {
    title: "R / Lズレ",
    body: "尊厳や役割のずれ。遷移群では Respect / Role の関与が大きく増加していた。",
  },
] as const;

const structureMetrics = [
  { label: "A欠損", value: "22 vs 6" },
  { label: "e2あり", value: "95.1%" },
  { label: "P関与", value: "63.9%" },
  { label: "R/L関与", value: "67.2%" },
] as const;

const actionItems = [
  {
    code: "A",
    title: "まず受け止める",
    body: "何に引っかかりが残ったのかを、最初に言葉として受け止める。",
  },
  {
    code: "E",
    title: "感情を受容する",
    body: "驚き・不安・戸惑いなどの感情を否定せず、そのまま受け止める。",
  },
  {
    code: "C",
    title: "状況を接続する",
    body: "いま何が起きていて、この後どう進むのかを接続して伝える。",
  },
] as const;

const actionIcons = [Circle, FileText, ArrowRight] as const;

const reportConclusions = [
  "認知のズレは、特定の接点で立ち上がる傾向がある。",
  "その後、A欠損 / e2継続 / P不安 / R/Lズレが重なると悪化しやすい。",
  "したがって、観察の入口は「結果」ではなく「ズレが生じた瞬間」に置く必要がある。",
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
              title={
                <>
                  303件の投書から、
                  <br />
                  認知のズレはどこで発生するのか
                </>
              }
              summary="本ページは、名古屋市内にある高度急性期機能を有する中核病院に寄せられた303件の投書を対象に、認知のズレがどの接点で生じやすいかを整理した分析レポートである。ここで示すのは因果関係の確定ではなく、構造仮説の提示である。"
            />

            <div style={heroBodyStyle}>
              <p style={bodyTextStyle}>
                今回の目的は、関係悪化の構造そのものを先に説明することではなく、
                まず「どの瞬間にズレが立ち上がるのか」を入口として整理することにあります。
              </p>
              <p style={{ ...bodyTextStyle, borderBottom: "1px solid #e7e5e4" }}>
                その上で、後段に RA 構造（A欠損 / e2継続 / P不安 / R/Lズレ）を接続し、
                どう防ぐかを Pre-Asset の形に落とし込みます。
              </p>
            </div>

            <div style={ctaWrapStyle}>
              <button
                type="button"
                onClick={() => setPage("demo-intro")}
                style={primaryButtonStyle}
              >
                DEMOで体験する
              </button>
              <button
                type="button"
                onClick={() => setPage("top")}
                style={secondaryButtonStyle}
              >
                LPへ戻る
              </button>
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={contentWidthStyleNarrow}>
            <EditorialSectionHeader
              label="RESEARCH QUESTION"
              marker="square"
              title="今回の問い"
              summary="患者と医療者の認知のズレは、どの接点で発生するのか。302件の患者側記述から、どこまでその傾向を抽出できるかを検討する。"
            />
          </div>
        </section>

        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="DATA & SCOPE"
              marker="square"
              title="データと限界"
              summary="この分析は患者側ナラティブを対象とした事後的整理であり、分析可能性と同時に限界も含んでいます。"
            />

            <div style={twoColumnGridStyle}>
              <div style={cardStyle}>
                <p style={smallLabelStyle}>DATA</p>
                <ul style={listStyle}>
                  <li>患者側ナラティブデータ 302件</li>
                  <li>投書・意見として収集された事後記述</li>
                  <li>本文 / 要約 / 時間軸 / e分解列を参照</li>
                </ul>
              </div>

              <div style={cardStyle}>
                <p style={smallLabelStyle}>LIMITATIONS</p>
                <ul style={listStyle}>
                  <li>医療者側認知は含まれない</li>
                  <li>時間軸は一部不完全</li>
                  <li>因果関係の確定ではなく仮説提示に留まる</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="PHASE 1｜OBSERVATION"
              marker="triangle"
              title="ズレが立ち上がる瞬間"
              summary="本フェーズでは、患者側ナラティブ302件から、認知のズレがどの接点で発生したかを観察結果として整理する。ここでは構造的解釈は行わず、まず『どこで起きたか』に限定する。"
            />

            <div style={timingGridStyle}>
              {timingFindings.map((item) => (
                <div key={item.id} style={timingCardStyle}>
                  <p style={indexStyle}>{item.id}</p>
                  <p style={timingTitleStyle}>{item.title}</p>
                  <p style={timingBodyStyle}>{item.description}</p>

                  <div style={timingMetaRowStyle}>
                    <span style={countBadgeStyle}>{item.count}件</span>
                    <span style={noteTextStyle}>{item.note}</span>
                  </div>
                </div>
              ))}

              <div style={timingCardStyle}>
                <p style={indexStyle}>06</p>
                <p style={timingTitleStyle}>未特定 / 複合</p>
                <p style={timingBodyStyle}>
                  肯定的投稿、情報不足、複数場面が混在するケース。入口の瞬間が単一に定まらない。
                </p>

                <div style={timingMetaRowStyle}>
                  <span style={countBadgeStyle}>128件</span>
                  <span style={noteTextStyle}>unknown</span>
                </div>
              </div>
            </div>

            <p style={supportTextStyle}>
              最も多く観察されたのは「応答不在発生」であり、次いで「待機不信発生」が続いた。
            </p>
          </div>
        </section>

        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="PHASE 2｜STRUCTURE"
              marker="double-circle"
              title="ズレの背後にある構造"
              summary="観察されたズレ発生の傾向に対し、RA構造（Δ・e・Trigger）を用いてその発生過程の説明を試みる。ただしこれは唯一の解釈ではなく、仮説的整理である。"
            />

            <div style={structureFlowWrapStyle}>
              <div style={flowBoxStyle}>ズレ発生</div>
              <div style={flowArrowStyle}>↓</div>
              <div style={flowBoxStyle}>Δ上昇</div>
              <div style={flowArrowStyle}>↓</div>
              <div style={flowBoxStyle}>e2継続</div>
              <div style={flowArrowStyle}>↓</div>
              <div style={flowBoxStyle}>Trigger（e3）</div>
              <div style={flowArrowStyle}>↓</div>
              <div style={flowBoxStyle}>関係悪化</div>
            </div>

            <div style={metricGridStyle}>
              {structureMetrics.map((item) => (
                <div key={item.label} style={metricCardStyle}>
                  <p style={metricLabelStyle}>{item.label}</p>
                  <p style={metricValueStyle}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={cardGridStyle}>
              {structureFindings.map((item) => (
                <div key={item.title} style={cardStyle}>
                  <p style={cardTitleStyle}>{item.title}</p>
                  <p style={cardBodyStyle}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="FINDINGS"
              marker="square"
              title="今回の分析で言えること"
              summary="302件の記述から読み取れたのは、結果そのものではなく、ズレが立ち上がる接点の偏りでした。"
            />

            <div style={findingsWrapStyle}>
              {reportConclusions.map((item) => (
                <div key={item} style={findingRowStyle}>
                  <span style={findingBulletStyle}>•</span>
                  <p style={findingTextStyle}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="PHASE 3｜IMPLICATION"
              marker="triangle"
              title="どう防ぐか"
              summary="構造的整理を踏まえ、関係悪化を未然に防ぐための初期介入の方向性を示す。本フェーズは示唆レベルに留まり、実証ではない。"
            />

            <div style={cardGridStyle}>
              {actionItems.map((item, index) => {
                const Icon = actionIcons[index] ?? Circle;

                return (
                  <div key={item.code} style={cardStyle}>
                    <div style={codeRowStyle}>
                      <p style={codeTextStyle}>{item.code}</p>
                      <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                    </div>
                    <p style={cardTitleStyle}>{item.title}</p>
                    <p style={cardBodyStyle}>{item.body}</p>
                  </div>
                );
              })}

              <div style={cardStyle}>
                <div style={codeRowStyle}>
                  <p style={codeTextStyle}>e2</p>
                </div>
                <p style={cardTitleStyle}>継続を止める</p>
                <p style={cardBodyStyle}>
                  同じ構造の反復を遮断し、Δの累積を防ぐ。微修正を早い段階で入れる。
                </p>
              </div>
            </div>

            <p style={supportTextStyle}>
              Δ2からΔ3への遷移率は41.5%であり、初期段階での介入設計が重要であることが示唆された。
            </p>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={contentWidthStyleNarrow}>
            <EditorialSectionHeader
              label="CONCLUSION"
              marker="lines"
              title="結論"
              summary="302件の患者側記述からは、認知のズレが発生しやすい接点を仮説として提示できる。ただしこれは患者側ナラティブに基づく観察であり、因果関係の確定ではなく、医療者側データとの接続に向けた入口である。本レポートは、観察（Phase1）、構造的説明（Phase2）、応用的示唆（Phase3）を段階的に提示する構成とする。"
            />
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

const contentWidthStyleNarrow: React.CSSProperties = {
  maxWidth: 880,
  margin: "0 auto",
};

const heroBodyStyle: React.CSSProperties = {
  maxWidth: 760,
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

const twoColumnGridStyle: React.CSSProperties = {
  marginTop: 32,
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
};

const timingGridStyle: React.CSSProperties = {
  marginTop: 36,
  display: "grid",
  gap: 18,
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
};

const metricGridStyle: React.CSSProperties = {
  marginTop: 20,
  display: "grid",
  gap: 14,
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e7e5e4",
  padding: 24,
};

const timingCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e7e5e4",
  padding: 24,
  display: "flex",
  flexDirection: "column",
  minHeight: 220,
};

const indexStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: "0.22em",
  color: "#a8a29e",
  fontWeight: 500,
};

const smallLabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: "0.18em",
  color: "#78716c",
  fontWeight: 600,
};

const codeRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#a8a29e",
};

const codeTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: "0.22em",
  color: "inherit",
  fontWeight: 500,
};

const cardTitleStyle: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: 20,
  lineHeight: 1.6,
  fontWeight: 600,
  color: "#171717",
};

const timingTitleStyle: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: 22,
  lineHeight: 1.45,
  fontWeight: 600,
  color: "#171717",
};

const cardBodyStyle: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: 15,
  lineHeight: 1.9,
  color: "#44403c",
};

const timingBodyStyle: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: 15,
  lineHeight: 1.9,
  color: "#44403c",
};

const timingMetaRowStyle: React.CSSProperties = {
  marginTop: "auto",
  paddingTop: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const countBadgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 30,
  padding: "0 12px",
  borderRadius: 999,
  border: "1px solid #d6d3d1",
  fontSize: 13,
  color: "#292524",
  fontWeight: 600,
  background: "#fafaf9",
};

const noteTextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.7,
  color: "#78716c",
};

const metricCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e7e5e4",
  padding: "16px 18px",
};

const metricLabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: "0.14em",
  color: "#78716c",
  fontWeight: 600,
};

const metricValueStyle: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: 17,
  lineHeight: 1.6,
  color: "#292524",
  fontWeight: 500,
};

const listStyle: React.CSSProperties = {
  margin: "14px 0 0",
  paddingLeft: 18,
  color: "#44403c",
  fontSize: 15,
  lineHeight: 1.9,
};

const supportTextStyle: React.CSSProperties = {
  maxWidth: 880,
  margin: "22px auto 0",
  fontSize: 15,
  lineHeight: 1.9,
  color: "#57534e",
};

const structureFlowWrapStyle: React.CSSProperties = {
  marginTop: 32,
  marginBottom: 32,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
};

const flowBoxStyle: React.CSSProperties = {
  minWidth: 240,
  padding: "12px 18px",
  border: "1px solid #d6d3d1",
  background: "#fff",
  textAlign: "center",
  fontSize: 15,
  lineHeight: 1.8,
  color: "#292524",
};

const flowArrowStyle: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 1,
  color: "#78716c",
};

const findingsWrapStyle: React.CSSProperties = {
  marginTop: 32,
  display: "flex",
  flexDirection: "column",
  gap: 18,
  maxWidth: 920,
  marginInline: "auto",
};

const findingRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  paddingBottom: 16,
  borderBottom: "1px solid #ece7e1",
};

const findingBulletStyle: React.CSSProperties = {
  fontSize: 22,
  lineHeight: 1,
  color: "#a8a29e",
  flexShrink: 0,
};

const findingTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 17,
  lineHeight: 1.9,
  color: "#292524",
};
