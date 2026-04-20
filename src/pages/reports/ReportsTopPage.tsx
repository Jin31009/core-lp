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
    body: "最頻の立ち上がり型。ただし原因そのものではなく、分岐構造を検証する代表クラスターとして扱う。",
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
    body: "その場で処理されなかったズレが、帰宅後に再び不安として浮上した瞬間。",
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
  body: "場面が複合的、または記述が短く、最初のズレ瞬間を一意に特定できなかったケース。ズレがない群ではなく、起点同定不能群として扱う。",
} as const;

const flowCounts = [
  {
    label: "総件数",
    value: 302,
    note: "母集団",
    sub: "",
  },
  {
    label: "ずれ発生",
    value: 248,
    note: "広く発生",
    sub: "82.1%",
  },
  {
    label: "継続",
    value: 162,
    note: "解消されない",
    sub: "248中 65.3%",
  },
  {
    label: "転換点",
    value: 67,
    note: "状態変化",
    sub: "162中 41.4%",
  },
  {
    label: "臨界到達",
    value: 59,
    note: "高率で深刻化",
    sub: "67中 88.1%",
  },
] as const;

const deltaDistribution = [
  { label: "Δ0", value: 54 },
  { label: "Δ1", value: 86 },
  { label: "Δ2", value: 86 },
  { label: "Δ3", value: 70 },
  { label: "Δ4", value: 6 },
] as const;

const turningPointCross = [
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
    note: "代表クラスター",
    sub: "",
  },
  {
    label: "非転換",
    value: 55,
    note: "そのまま進まない",
    sub: "73.3%",
  },
  {
    label: "転換",
    value: 20,
    note: "分岐が発生",
    sub: "26.7%",
  },
] as const;

const responseAbsencePatterns = [
  {
    title: "A｜認識不足が分岐に関与する",
    body: "応答不在群では Primary_APCE_Miss の中心が A に寄り、自分の状態が認識されていない感覚が転換条件として関与しやすい。",
  },
  {
    title: "S｜安全不安への接続が強い",
    body: "Primary_SRPL では S が多く、処置場面の不応答が安全不安へ接続しやすい。応答不在は単なる沈黙ではなく、不安の増幅条件として働く。",
  },
  {
    title: "e2｜継続が加わると転換しやすい",
    body: "応答不在は入口として頻出するが、それだけでは転換しない。継続や他条件が重なることで、転換点へ進む確率が高まる。",
  },
] as const;

const structurePoints = [
  {
    label: "A欠損",
    body: "自分の状態や感情が認識されていないと感じる。認識不足は転換に関与する主要条件の一つである。",
    stat: "22 vs 6",
  },
  {
    label: "e2継続",
    body: "違和感が一過性で終わらず、状態として持続する。継続は転換の前提条件として最も重要である。",
    stat: "95.1%",
  },
  {
    label: "P不安",
    body: "見通しが持てず、不安が処理されないまま残る。未処理の不安は転換点を押し上げる条件になる。",
    stat: "63.9%",
  },
  {
    label: "R / Lズレ",
    body: "尊厳や役割認識のズレが重なり、関係の摩耗が進む。単独要因ではなく複合条件として働く。",
    stat: "67.2%",
  },
] as const;

const actionItems = [
  {
    code: "A",
    title: "まず認識する",
    body: "違和感を打ち消さず、相手がどこで引っかかったのかを先に受け止める。Aは継続状態に入る前の一次介入として働く。",
  },
  {
    code: "E",
    title: "感情を処理可能にする",
    body: "説明の前に、不安や怒りが生じたこと自体を処理できる状態をつくる。Eは未処理感情がそのまま残ることを防ぐ。",
  },
  {
    code: "C",
    title: "状況を接続する",
    body: "いま何が起きているか、なぜそうなっているかを、相手の位置から接続して示す。Cは見通し不安の固定化を防ぐ。",
  },
  {
    code: "X",
    title: "継続状態を遮断する",
    body: "フォロー、再説明、再接続などの仕組みを通じて、e2として持続したズレを断ち切る。継続の遮断は接点行為だけでなくXの領域で扱う。",
  },
] as const;

const conclusionItems = [
  "ズレは例外ではなく、302件中248件で確認された日常的現象である。",
  "ただし本分析の主眼は発生頻度そのものではなく、継続162件のうち67件が転換点に至り、さらに59件が臨界に到達した進行構造にある。",
  "転換点は主としてΔ3以上で可視化され、ズレは連続的に悪化するのではなく、閾値を超えたときに状態が変わる。",
  "応答不在75件は最頻の入口として抽出した代表クラスターであり、転換する場合としない場合の分岐条件を検証するために用いた。",
  "したがって本分析は、ズレの発生を問題とするのではなく、ズレが継続し転換点に至る構造を明らかにし、その進行を制御する介入可能性を示したものである。",
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
              label="レポート"
              marker="lines"
              hero
              title={
                <>
                  302件の投書から、
                  <br />
                  認知のズレはどこで「転換」するのか
                </>
              }
              summary="本ページは、患者側ナラティブ302件から、認知のズレを「構造・状態遷移・制御可能性」の論点で整理した分析レポートです。因果の確定ではなく、進行構造と介入可能性の仮説提示を目的としています。"
            />

            <div style={heroBodyStyle}>
              <p style={bodyTextStyle}>
                ズレは広く発生するが、その多くは問題化しない。重要なのは、どのズレが継続し、どこで転換点に至るかである。
              </p>
              <p style={{ ...bodyTextStyle, borderBottom: "1px solid #e7e5e4" }}>
                入口で立ち上がりを見たあとに、全数から転換点を捉え、代表クラスター分析を通して、どこで進行を制御できるかを整理する。
              </p>
            </div>

            <div style={heroMiniStatsStyle}>
              {[
                { label: "総件数", value: "302" },
                { label: "ずれ発生", value: "248" },
                { label: "転換点", value: "67" },
                { label: "臨界", value: "59" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    ...heroMiniStatCardStyle,
                    border:
                      item.label === "転換点" || item.label === "臨界"
                        ? "1.5px solid #78716c"
                        : "1px solid #e7e5e4",
                  }}
                >
                  <p style={heroMiniStatValueStyle}>{item.value}</p>
                  <p style={heroMiniStatLabelStyle}>{item.label}</p>
                </div>
              ))}
            </div>

            <div style={ctaWrapStyle}>
              <button type="button" onClick={() => setPage("demo-intro")} style={primaryButtonStyle}>
                DEMOで体験する
              </button>
              <button type="button" onClick={() => setPage("top")} style={secondaryButtonStyle}>
                LPへ戻る
              </button>
            </div>
          </div>
        </section>

        {/* 入口① */}
        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={narrowContentWidthStyle}>
            <EditorialSectionHeader
              label="入口"
              marker="square"
              title="データと限界"
              summary="今回の分析は、患者側ナラティブから見える範囲に限定される。まずは観察の前提を明示する。"
            />

            <div style={listBlockStyle}>
              {[
                "患者側ナラティブデータ 302件",
                "事後記述であり、その場の全認知過程を直接記録したものではない",
                "単一視点であり、医療者側認知は含まれない",
                "時間軸は不完全で、複数場面が混在するケースもある",
                "因果関係の確定ではなく、接点傾向と進行構造の仮説提示である",
              ].map((item) => (
                <p key={item} style={listItemStyle}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 入口② */}
        <section style={sectionStyle}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="入口"
              marker="triangle"
              title="ズレが立ち上がる瞬間"
              summary="従来の場面分類を、認知ズレが発生した瞬間ラベルへ変換して整理した。ここでは「ズレの有無」ではなく「起点の置き方」を見ている。"
            />

            <div style={timingGridStyle}>
              {timingMoments.map((item) => (
                <div key={item.moment} style={timingCardStyle}>
                  <div style={timingTopRowStyle}>
                    <p style={timingSourceStyle}>{item.source}</p>
                  </div>
                  <p style={timingCountHeroStyle}>{item.count}</p>
                  <p style={timingCountLabelStyle}>件</p>
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

            <div style={bodyBlockStyle}>
              <p style={sectionBodyStyle}>
                ここで見ているのは「起点の観察」であり、「転換の説明」ではない。起点の分布は入口を示すが、問題の本質はその後の進行にある。
              </p>
            </div>
          </div>
        </section>

        {/* 主役 */}
        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="主役"
              marker="lines"
              title="全数から見た転換点の立ち上がり"
              summary="ここがページの中心である。ズレの発生そのものではなく、発生後にどこで継続し、どこで転換点に至るかを全体構造として捉える。"
            />

            <div style={flowPrimaryWrapStyle}>
              <div style={flowPrimaryTopStyle}>
                {flowCounts.slice(0, 3).map((item) => (
                  <div key={item.label} style={flowSummaryCardStyle}>
                    <p style={flowSummaryValueStyle}>{item.value}</p>
                    <p style={flowSummaryLabelStyle}>{item.label}</p>
                    {item.sub ? <p style={flowSummarySubStyle}>{item.sub}</p> : null}
                    <p style={flowSummaryNoteStyle}>{item.note}</p>
                  </div>
                ))}
              </div>

              <div style={flowPrimaryBottomStyle}>
                {flowCounts.slice(3).map((item) => (
                  <div
                    key={item.label}
                    style={{
                      ...flowPrimaryHeroCardStyle,
                      border: "1.5px solid #78716c",
                    }}
                  >
                    <p style={flowPrimaryHeroValueStyle}>{item.value}</p>
                    <p style={flowPrimaryHeroLabelStyle}>{item.label}</p>
                    {item.sub ? <p style={flowPrimaryHeroSubStyle}>{item.sub}</p> : null}
                    <p style={flowPrimaryHeroNoteStyle}>{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={bodyBlockStyle}>
              <p style={sectionBodyStyle}>
                Δ1以上の248件をズレ発生群として見ると、そのうち162件で継続が確認され、発生したズレの多くがその場で解消されず残っている。
              </p>
              <p style={sectionBodyStyle}>
                さらに67件で転換点が確認され、継続したズレの一部が質的変化を起こしている。そのうち59件は臨界到達に至っており、転換後は高率で深刻化する構造が示唆される。
              </p>
            </div>

            <div style={distributionWrapStyle}>
              <div style={distributionCardStyle}>
                <p style={distributionTitleStyle}>Delta_Max 分布</p>
                {deltaDistribution.map((item) => (
                  <div key={item.label} style={distributionRowStyle}>
                    <span style={distributionLabelStyle}>{item.label}</span>
                    <span style={distributionValueStyle}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div style={crossWrapStyleCompact}>
                <p style={distributionTitleStyle}>Δ × 転換点</p>
                <div style={crossTableStyle}>
                  <div style={crossHeaderStyle}>
                    <span>Δ</span>
                    <span>なし</span>
                    <span>あり</span>
                  </div>
                  {turningPointCross.map((item) => (
                    <div
                      key={item.label}
                      style={{
                        ...crossRowStyle,
                        color: item.label === "Δ3" || item.label === "Δ4" ? "#171717" : "#78716c",
                        fontWeight: item.label === "Δ3" || item.label === "Δ4" ? 600 : 400,
                      }}
                    >
                      <span>{item.label}</span>
                      <span>{item.no}</span>
                      <span>{item.yes}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={bodyBlockStyle}>
              <p style={sectionBodyStyle}>
                転換点はΔ0〜Δ2では認められず、主としてΔ3以上で可視化される。これは、ズレが連続的に悪化するのではなく、閾値を超えたときに状態が変わることを示している。
              </p>
            </div>
          </div>
        </section>

        {/* 展開① */}
        <section style={sectionStyle}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="展開"
              marker="double-circle"
              title="代表的なずれ発生型としての応答不在"
              summary="最頻の立ち上がり型である応答不在75件を代表クラスターとして抽出し、転換に至る場合と至らない場合の分岐構造を検証する。"
            />

            <div style={clusterSummaryGridStyle}>
              {responseAbsenceSummary.map((item) => (
                <div
                  key={item.label}
                  style={{
                    ...flowSummaryCardStyle,
                    border: item.label === "転換" ? "1.5px solid #78716c" : "1px solid #e7e5e4",
                  }}
                >
                  <p
                    style={{
                      ...flowSummaryValueStyle,
                      fontSize: item.label === "転換" ? "clamp(34px, 5.4vw, 46px)" : "clamp(28px, 5vw, 40px)",
                    }}
                  >
                    {item.value}
                  </p>
                  <p style={flowSummaryLabelStyle}>{item.label}</p>
                  {item.sub ? <p style={flowSummarySubStyle}>{item.sub}</p> : null}
                  <p style={flowSummaryNoteStyle}>{item.note}</p>
                </div>
              ))}
            </div>

            <div style={bodyBlockStyle}>
              <p style={sectionBodyStyle}>
                応答不在は75件で最頻の入口だが、そのうち転換点に至ったのは20件であり、55件は転換しなかった。したがって、応答不在それ自体が本質なのではなく、結果を分ける分岐条件の方が重要である。
              </p>
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

        {/* 展開② */}
        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="展開"
              marker="lines"
              title="ずれの背後にある構造"
              summary="以下は、転換点に至るケースで観察された条件である。関係悪化は単一要因ではなく、複数条件の重なりとして形成される。"
            />

            <div style={cardGridStyle}>
              {structurePoints.map((item) => (
                <div
                  key={item.label}
                  style={{
                    ...cardStyle,
                    border: item.label === "e2継続" ? "1.5px solid #78716c" : "1px solid #e7e5e4",
                  }}
                >
                  <p style={indexStyle}>{item.label}</p>
                  <p style={cardStatStyle}>{item.stat}</p>
                  <p style={cardBodyStyle}>{item.body}</p>
                </div>
              ))}
            </div>

            <div style={bodyBlockStyle}>
              <p style={sectionBodyStyle}>
                特に継続は95.1%で確認され、転換の前提条件としてもっとも強く関与していた。認識不足、見通し不安、尊厳・役割のズレも加わることで、転換点が形成される。
              </p>
            </div>

            <div style={flowWrapStyle}>
              {["ズレ発生", "Δ上昇", "e2継続", "転換点（e3）", "臨界へ接近"].map((item, index) => (
                <div key={item} style={flowItemWrapStyle}>
                  <div style={flowItemStyle}>{item}</div>
                  {index < 4 ? <div style={flowArrowStyle}>↓</div> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 展開③ */}
        <section style={sectionStyle}>
          <div style={contentWidthStyle}>
            <EditorialSectionHeader
              label="展開"
              marker="triangle"
              title="予防のための初期対応（ACE-X）"
              summary="ACE-X はズレをなくすための一般論ではなく、転換点への進行を制御するための介入モデルとして位置づける。"
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

            <div style={bodyBlockStyle}>
              <p style={sectionBodyStyle}>
                ACE は接点での一次介入であり、認識不足、不安、状況不明をその場で処理可能にし、継続状態（e2）への移行を防ぐ。
              </p>
              <p style={sectionBodyStyle}>
                一方、e2 は行為ではなく状態である。継続状態に入ったズレを遮断するためには、フォロー、再説明、再接続などの仕組みが必要であり、これは X の領域で扱う。
              </p>
            </div>
          </div>
        </section>

        {/* 展開④ */}
        <section style={{ ...sectionStyle, background: "#f7f5f2" }}>
          <div style={narrowContentWidthStyle}>
            <EditorialSectionHeader
              label="展開"
              marker="square"
              title="結論"
              summary="入口から転換点へ読み進めることで、ズレの発生ではなく、継続・転換・制御可能性が主題であることを示した。"
            />

            <div style={listBlockStyle}>
              {conclusionItems.map((item) => (
                <p key={item} style={listItemStyle}>
                  {item}
                </p>
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

const heroMiniStatsStyle: React.CSSProperties = {
  marginTop: 28,
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
};

const heroMiniStatCardStyle: React.CSSProperties = {
  background: "#fff",
  padding: "18px 18px 16px",
  border: "1px solid #e7e5e4",
  borderRadius: 0,
};

const heroMiniStatValueStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(22px, 4vw, 30px)",
  lineHeight: 1,
  color: "#171717",
  fontWeight: 700,
};

const heroMiniStatLabelStyle: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: 13,
  lineHeight: 1.5,
  color: "#57534e",
  fontWeight: 600,
};

const bodyBlockStyle: React.CSSProperties = {
  maxWidth: 860,
  margin: "28px auto 0",
};

const sectionBodyStyle: React.CSSProperties = {
  margin: 0,
  padding: "12px 0",
  fontSize: 15,
  lineHeight: 1.95,
  color: "#44403c",
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

const flowSummaryCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e7e5e4",
  padding: 24,
};

const flowPrimaryWrapStyle: React.CSSProperties = {
  marginTop: 36,
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const flowPrimaryTopStyle: React.CSSProperties = {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
};

const flowPrimaryBottomStyle: React.CSSProperties = {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
};

const flowPrimaryHeroCardStyle: React.CSSProperties = {
  background: "#fff",
  padding: 28,
  border: "1.5px solid #78716c",
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

const flowSummarySubStyle: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: 12,
  lineHeight: 1.6,
  color: "#a8a29e",
  letterSpacing: "0.04em",
  fontWeight: 600,
};

const flowSummaryNoteStyle: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: 14,
  lineHeight: 1.8,
  color: "#57534e",
};

const flowPrimaryHeroValueStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(40px, 6.4vw, 58px)",
  lineHeight: 1,
  color: "#171717",
  fontWeight: 700,
};

const flowPrimaryHeroLabelStyle: React.CSSProperties = {
  margin: "16px 0 0",
  fontSize: 20,
  lineHeight: 1.5,
  color: "#171717",
  fontWeight: 600,
};

const flowPrimaryHeroSubStyle: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: 13,
  lineHeight: 1.6,
  color: "#78716c",
  letterSpacing: "0.04em",
  fontWeight: 700,
};

const flowPrimaryHeroNoteStyle: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: 15,
  lineHeight: 1.8,
  color: "#44403c",
};

const distributionWrapStyle: React.CSSProperties = {
  marginTop: 20,
  display: "grid",
  gap: 16,
  gridTemplateColumns: "minmax(260px, 340px) 1fr",
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

const crossWrapStyleCompact: React.CSSProperties = {
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
  color: "#a8a29e",
  fontWeight: 500,
};

const crossRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  padding: "14px 0",
  borderBottom: "1px solid #f0ece8",
  fontSize: 15,
};

const clusterSummaryGridStyle: React.CSSProperties = {
  marginTop: 36,
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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

const cardStatStyle: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: 24,
  lineHeight: 1,
  color: "#171717",
  fontWeight: 700,
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
  margin: "12px 0 0",code
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