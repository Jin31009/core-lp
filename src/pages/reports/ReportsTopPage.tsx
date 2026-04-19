import { ArrowRight, Circle, FileText } from "lucide-react";
import FooterSection from "../../components/core/FooterSection";
import SiteHeader from "../../components/shared/SiteHeader";
import EditorialSectionHeader from "../../components/shared/EditorialSectionHeader";

type Props = {
  setPage: (page: string) => void;
};

const timingMoments = [
  {
    source: "処置・対応中由来",
    moment: "応答不在発生",
    count: 75,
    body: "声かけや反応が返らず、自分が見られていないと感じた瞬間。最頻カテゴリだが、唯一の本質とは扱わず、Triggerを説明する代表型として読む。",
  },
  {
    source: "受付・待機由来",
    moment: "待機不信発生",
    count: 51,
    body: "待たされている理由や流れが見えず、不信が立ち上がった瞬間。",
  },
  {
    source: "結果・方針説明由来",
    moment: "意思決定不一致",
    count: 24,
    body: "十分に納得できないまま、方針が決まったと受け取られた瞬間。",
  },
  {
    source: "帰宅後・フォロー由来",
    moment: "事後不安再燃",
    count: 16,
    body: "帰宅後に説明不足や見通し不足が再び不安として浮上した瞬間。",
  },
  {
    source: "説明由来",
    moment: "説明断絶発生",
    count: 8,
    body: "理解できないまま進行し、説明との接続が切れたと感じた瞬間。",
  },
] as const;

const timingUnknown = {
  source: "unknown",
  moment: "未特定・複合ケース",
  count: 128,
  body: "場面が複合的、または記述が短く、最初のズレ瞬間を特定しきれなかったケース。",
} as const;

const flowCounts = [
  {
    label: "ズレ発生",
    value: 248,
    note: "Delta_Max が 1 以上のケース",
  },
  {
    label: "継続",
    value: 162,
    note: "e_Pattern_Auto に e2 を含むケース",
  },
  {
    label: "Trigger",
    value: 67,
    note: "Trigger = Yes",
  },
  {
    label: "臨界到達",
    value: 59,
    note: "Primary_e = e3",
  },
] as const;

const deltaDistribution = [
  { label: "Δ0", value: 54 },
  { label: "Δ1", value: 86 },
  { label: "Δ2", value: 86 },
  { label: "Δ3", value: 70 },
  { label: "Δ4", value: 6 },
] as const;

const triggerDistribution = [
  { label: "Trigger No", value: 235 },
  { label: "Trigger Yes", value: 67 },
] as const;

const triggerCross = [
  { label: "Δ0", no: 54, yes: 0 },
  { label: "Δ1", no: 86, yes: 0 },
  { label: "Δ2", no: 86, yes: 0 },
  { label: "Δ3", no: 9, yes: 61 },
  { label: "Δ4", no: 0, yes: 6 },
] as const;

const responseAbsenceSummary = [
  {
    label: "総数",
    value: 75,
    note: "処置・対応中由来として仮抽出された代表群",
  },
  {
    label: "Trigger Yes",
    value: 20,
    note: "応答不在がそのままTriggerになるわけではない",
  },
  {
    label: "Trigger No",
    value: 55,
    note: "最頻だが、全件が転換点に至るわけではない",
  },
] as const;

const responseAbsencePatterns = [
  {
    title: "A｜認識不足に寄りやすい",
    body: "応答不在群では Primary_APCE_Miss の中心が A に寄り、自分の状態が認識されていない感覚が起点になりやすい。",
  },
  {
    title: "S｜安全不安と接続しやすい",
    body: "Primary_SRPL では S が多く、処置場面の不応答が安全不安へ接続しやすい傾向が見られる。",
  },
  {
    title: "e1 に留まるものと Trigger 化するものが分かれる",
    body: "応答不在は最頻の代表型だが、それ自体が唯一の本質ではない。継続や重なり条件が加わると Trigger に近づく。",
  },
] as const;

const structurePoints = [
  {
    label: "A欠損",
    body: "自分の状態や感情が認識されていないと感じる。",
  },
  {
    label: "e2継続",
    body: "違和感が一過性で終わらず、状態として持続する。",
  },
  {
    label: "P不安",
    body: "見通しが持てず、不安が処理されないまま残る。",
  },
  {
    label: "R / Lズレ",
    body: "尊厳や役割認識のズレが重なり、関係の摩耗が進む。",
  },
] as const;

const findings = [
  "認知のズレは、特定の接点で立ち上がる傾向がある。",
  "Trigger は全体構造の中で、Δ3以上で急に可視化される転換点として観察された。",
  "したがって、観察の入口は『結果』ではなく『ズレが生じた瞬間』に置き、その後にTriggerへの移行条件を見る必要がある。",
] as const;

const actionItems = [
  { code: "A", title: "まず受け止める", body: "違和感を打ち消さず、相手がどこで引っかかったのかを先に受け止める。" },
  { code: "E", title: "感情を受容する", body: "説明の前に、不安や怒りが生じたこと自体を処理できる状態をつくる。" },
  { code: "C", title: "状況を接続する", body: "いま何が起きているか、なぜそうなっているかを、相手の位置から接続して示す。" },
  { code: "e2", title: "継続を止める", body: "違和感が持続してTriggerへ進まないよう、早い段階で流れを切り替える。" },
] as const;

const ACTION_ICONS = [Circle, FileText, ArrowRight, Circle] as const;

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
              title={<>303件の投書から、<br />認知のズレはどこで発生するのか</>}
              summary="本ページは、患者側ナラティブ303件（CSV実体は302件）から、認知のズレがどの接点で生じやすいかを整理した分析レポートです。因果の確定ではなく、仮説提示を目的としています。"
            />

            <div style={heroBodyStyle}>
              <p style={bodyTextStyle}>まず『どこでズレが立ち上がるのか』を見て、そのあとにTriggerという転換点、さらに背後構造と防止の一手へつなげます。</p>
              <p style={{ ...bodyTextStyle, borderBottom: "1px solid #e7e5e4" }}>構造を先に説明しすぎず、接点と瞬間から読み始められるレポートとして整理しています。</p>
            </div>

            <div style={ctaWrapStyle}>
              <button type="button" onClick={() => setPage("demo-intro")} style={primaryButtonStyle}>DEMOで体験する</button>
              <button type="button" onClick={() => setPage("top")} style={secondaryButtonStyle}>LPへ戻る</button>
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={narrowContentWidthStyle}>
            <EditorialSectionHeader
              label="QUESTION"
              marker="square"
              title="今回の問い"
              summary="患者と医療者の認知のズレは、どの接点で発生するのか。302件の投書から、どこまでその傾向を抽出できるかを検討します。"
            />
          </div>
        </section>

        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={narrowContentWidthStyle}>
            <EditorialSectionHeader
              label="DATA & SCOPE"
              marker="square"
              title="データと限界"
              summary="この入口は残します。今回の分析は、患者側ナラティブから見える範囲に限定されます。"
            />

            <div style={listBlockStyle}>
              {[
                "患者側ナラティブデータ 302件",
                "事後記述であり、その場の全認知過程を直接記録したものではない",
                "単一視点であり、医療者側認知は含まれない",
                "時間軸は不完全で、複数場面が混在するケースもある",
                "因果関係の確定ではなく、接点傾向の仮説提示である",
              ].map((item) => (
                <p key={item} style={listItemStyle}>{item}</p>
              ))}
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="TIMING"
              marker="triangle"
              title="ズレが立ち上がる瞬間"
              summary="この入口も残します。従来の場面分類を、認知ズレが発生した瞬間ラベルへ変換して整理しました。ここでは『場面』ではなく『立ち上がり方』を見ます。"
            />

            <div style={timingGridStyle}>
              {timingMoments.map((item) => (
                <div key={item.moment} style={timingCardStyle}>
                  <div style={timingTopRowStyle}>
                    <p style={timingSourceStyle}>{item.source}</p>
                  </div>
                  <p style={timingCountHeroStyle}>{item.count}</p>
                  <p style={timingCountLabelStyle}>cases</p>
                  <p style={timingMomentStyle}>{item.moment}</p>
                  <p style={timingBodyStyle}>{item.body}</p>
                </div>
              ))}
            </div>

            <div style={unknownWrapStyle}>
              <div style={unknownInnerStyle}>
                <p style={unknownLabelStyle}>{timingUnknown.source}</p>
                <div style={unknownRowStyle}>
                  <p style={unknownTitleStyle}>{timingUnknown.moment}</p>
                  <p style={unknownCountStyle}>{timingUnknown.count}</p>
                </div>
                <p style={unknownBodyStyle}>{timingUnknown.body}</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="FLOW"
              marker="lines"
              title="全数から見た転換点の立ち上がり"
              summary="ここから後段です。接点の入口を見たあとで、全数の中でTriggerを中心イベントとして置き直します。"
            />

            <div style={flowSummaryGridStyle}>
              {flowCounts.map((item) => (
                <div key={item.label} style={flowSummaryCardStyle}>
                  <p style={flowSummaryValueStyle}>{item.value}</p>
                  <p style={flowSummaryLabelStyle}>{item.label}</p>
                  <p style={flowSummaryNoteStyle}>{item.note}</p>
                </div>
              ))}
            </div>

            <div style={distributionWrapStyle}>
              <div style={distributionCardStyle}>
                <p style={distributionTitleStyle}>Trigger Yes / No</p>
                {triggerDistribution.map((item) => (
                  <div key={item.label} style={distributionRowStyle}>
                    <span style={distributionLabelStyle}>{item.label}</span>
                    <span style={distributionValueStyle}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div style={distributionCardStyle}>
                <p style={distributionTitleStyle}>Delta_Max 分布</p>
                {deltaDistribution.map((item) => (
                  <div key={item.label} style={distributionRowStyle}>
                    <span style={distributionLabelStyle}>{item.label}</span>
                    <span style={distributionValueStyle}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={crossWrapStyle}>
              <p style={distributionTitleStyle}>Δ × Trigger</p>
              <div style={crossTableStyle}>
                <div style={crossHeaderStyle}>
                  <span>Δ</span>
                  <span>No</span>
                  <span>Yes</span>
                </div>
                {triggerCross.map((item) => (
                  <div key={item.label} style={crossRowStyle}>
                    <span>{item.label}</span>
                    <span>{item.no}</span>
                    <span>{item.yes}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="REPRESENTATIVE TYPE"
              marker="double-circle"
              title="代表的なずれ発生型としての応答不在"
              summary="応答不在は唯一の本質ではありません。ただし最頻の代表カテゴリとして、Triggerを説明するための入口になります。"
            />

            <div style={flowSummaryGridStyle}>
              {responseAbsenceSummary.map((item) => (
                <div key={item.label} style={flowSummaryCardStyle}>
                  <p style={flowSummaryValueStyle}>{item.value}</p>
                  <p style={flowSummaryLabelStyle}>{item.label}</p>
                  <p style={flowSummaryNoteStyle}>{item.note}</p>
                </div>
              ))}
            </div>

            <div style={cardGridStyle}>
              {responseAbsencePatterns.map((item, index) => (
                <div key={item.title} style={cardStyle}>
                  <p style={indexStyle}>0{index + 1}</p>
                  <p style={cardTitleStyle}>{item.title}</p>
                  <p style={cardBodyStyle}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="RA STRUCTURE"
              marker="lines"
              title="ずれの背後にある構造"
              summary="構造説明は後段へ回します。関係悪化は単一要因ではなく、複数条件の重なりとして観察されました。"
            />

            <div style={cardGridStyle}>
              {structurePoints.map((item) => (
                <div key={item.label} style={cardStyle}>
                  <p style={indexStyle}>{item.label}</p>
                  <p style={cardBodyStyle}>{item.body}</p>
                </div>
              ))}
            </div>

            <div style={flowWrapStyle}>
              {[
                "ズレ発生",
                "Δ上昇",
                "e2継続",
                "Trigger（e3）",
                "関係悪化に接近",
              ].map((item, index) => (
                <div key={item} style={flowItemWrapStyle}>
                  <div style={flowItemStyle}>{item}</div>
                  {index < 4 ? <div style={flowArrowStyle}>↓</div> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={narrowContentWidthStyle}>
            <EditorialSectionHeader
              label="FINDINGS"
              marker="double-circle"
              title="今回の分析で言えること"
              summary="今回の段階で確実に言えることを、3点に絞って整理します。"
            />

            <div style={listBlockStyle}>
              {findings.map((item) => (
                <p key={item} style={listItemStyle}>{item}</p>
              ))}
            </div>
          </div>
        </section>

        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="PRE-ASSET"
              marker="triangle"
              title="どう防ぐか"
              summary="防止の起点は、大きな改善策ではなく、最初の一手をどこに置くかにあります。"
            />
            <div style={actionGridStyle}>
              {actionItems.map((item, index) => {
                const Icon = ACTION_ICONS[index] ?? Circle;

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
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <div style={narrowContentWidthStyle}>
            <EditorialSectionHeader
              label="CONCLUSION"
              marker="square"
              title="結論"
              summary="今回の分析で提示できるのは、接点と構造の仮説です。"
            />

            <div style={listBlockStyle}>
              {[
                "302件からは、認知のズレが発生しやすい接点を仮説として提示できる。",
                "ただし本分析は患者側ナラティブに基づくため、因果関係の確定ではなく仮説提示に留まる。",
                "今後は医療者側データとの接続により検証を進める必要がある。",
              ].map((item) => (
                <p key={item} style={listItemStyle}>{item}</p>
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

const narrowContentWidthStyle: React.CSSProperties = {
  maxWidth: 820,
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

const listBlockStyle: React.CSSProperties = {
  marginTop: 32,
  borderTop: "1px solid #e7e5e4",
};

const listItemStyle: React.CSSProperties = {
  margin: 0,
  padding: "18px 0",
  borderBottom: "1px solid #e7e5e4",
  fontSize: 15,
  lineHeight: 1.9,
  color: "#44403c",
  textAlign: "left",
};

const timingGridStyle: React.CSSProperties = {
  marginTop: 36,
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
};

const timingCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e7e5e4",
  padding: 24,
};

const timingTopRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
};

const timingSourceStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: "0.18em",
  color: "#a8a29e",
  fontWeight: 500,
};

const timingCountHeroStyle: React.CSSProperties = {
  margin: "18px 0 0",
  fontSize: "clamp(26px, 4.6vw, 32px)",
  lineHeight: 1,
  color: "#171717",
  fontWeight: 700,
};

const timingCountLabelStyle: React.CSSProperties = {
  margin: "6px 0 0",
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#a8a29e",
  fontWeight: 500,
};

const timingMomentStyle: React.CSSProperties = {
  margin: "18px 0 0",
  fontSize: 20,
  lineHeight: 1.55,
  fontWeight: 600,
  color: "#171717",
};

const timingBodyStyle: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: 15,
  lineHeight: 1.85,
  color: "#44403c",
};

const unknownWrapStyle: React.CSSProperties = {
  marginTop: 20,
};

const unknownInnerStyle: React.CSSProperties = {
  borderTop: "1px solid #e7e5e4",
  paddingTop: 18,
  maxWidth: 820,
  margin: "0 auto",
};

const unknownLabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  letterSpacing: "0.18em",
  color: "#a8a29e",
  fontWeight: 500,
};

const unknownRowStyle: React.CSSProperties = {
  marginTop: 8,
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const unknownTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.7,
  color: "#292524",
  fontWeight: 600,
};

const unknownCountStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1,
  color: "#78716c",
  fontWeight: 600,
};

const unknownBodyStyle: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: 14,
  lineHeight: 1.8,
  color: "#57534e",
};

const flowSummaryGridStyle: React.CSSProperties = {
  marginTop: 36,
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
};

const flowSummaryCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e7e5e4",
  padding: 24,
};

const flowSummaryValueStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(28px, 5vw, 40px)",
  lineHeight: 1,
  color: "#171717",
  fontWeight: 700,
};

const flowSummaryLabelStyle: React.CSSProperties = {
  margin: "14px 0 0",
  fontSize: 18,
  lineHeight: 1.5,
  color: "#171717",
  fontWeight: 600,
};

const flowSummaryNoteStyle: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: 14,
  lineHeight: 1.8,
  color: "#57534e",
};

const distributionWrapStyle: React.CSSProperties = {
  marginTop: 20,
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
};

const distributionCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e7e5e4",
  padding: 24,
};

const distributionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.6,
  color: "#171717",
  fontWeight: 600,
};

const distributionRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: 12,
  paddingTop: 14,
  marginTop: 14,
  borderTop: "1px solid #e7e5e4",
};

const distributionLabelStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#57534e",
};

const distributionValueStyle: React.CSSProperties = {
  fontSize: 18,
  color: "#171717",
  fontWeight: 600,
};

const crossWrapStyle: React.CSSProperties = {
  marginTop: 20,
  background: "#fff",
  border: "1px solid #e7e5e4",
  padding: 24,
};

const crossTableStyle: React.CSSProperties = {
  marginTop: 16,
  display: "grid",
  gap: 0,
};

const crossHeaderStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  padding: "0 0 12px",
  borderBottom: "1px solid #e7e5e4",
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#a8a29e",
  fontWeight: 500,
};

const crossRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  padding: "14px 0",
  borderBottom: "1px solid #f0ece8",
  fontSize: 15,
  color: "#292524",
};

const cardGridStyle: React.CSSProperties = {
  marginTop: 32,
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
};

const actionGridStyle: React.CSSProperties = {
  marginTop: 32,
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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

const flowWrapStyle: React.CSSProperties = {
  marginTop: 36,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
};

const flowItemWrapStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 6,
};

const flowItemStyle: React.CSSProperties = {
  minWidth: 220,
  padding: "12px 18px",
  border: "1px solid #d6d3d1",
  background: "#fff",
  textAlign: "center",
  fontSize: 14,
  color: "#292524",
};

const flowArrowStyle: React.CSSProperties = {
  fontSize: 16,
  color: "#a8a29e",
  lineHeight: 1,
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

const cardBodyStyle: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: 15,
  lineHeight: 1.9,
  color: "#44403c",
};
