import { useState } from "react";

type ViewMode = "hybrid" | "character" | "figure";

type Topic = {
  id: string;
  label: string;
  speech: string;
  figureCaption: string;
  figureNote: string;
  speakerNote: string;
  scriptText: string;
  observationText: string;
  characterImageSrc?: string;
};

const topics: Topic[] = [
  {
    id: "01",
    label: "問題",
    speech: "いまのままだと、重要な声が構造化されず流れてしまいます。",
    figureCaption: "問題構造の概念図",
    figureNote: "観測前の課題を示すプレースホルダー",
    speakerNote: "自由記述には価値があります。しかし、個人の判断に留まり、組織として活かされにくいことが問題です。",
    scriptText: "",
    observationText: "この声は、本当に活かされているのか？",
    characterImageSrc: "/assets/slides/characters/01-character.png",
  },
  {
    id: "02",
    label: "問い",
    speech: "この語りは、再現可能な観測対象として扱えるでしょうか。",
    figureCaption: "研究問いの整理図",
    figureNote: "問いの分解と比較軸を示す図版枠",
    speakerNote:
      "自由記述は読まれています。しかし、感想として読まれるだけでは個人で止まります。構造として読むことで、扱えるデータに変わるのではないか、という問いを立てました。",
    scriptText: "",
    observationText: "なぜ、この声は活かされないのか？",
    characterImageSrc: "/assets/slides/characters/02-character.png",
  },
  {
    id: "03",
    label: "対象",
    speech: "対象を固定し、同一条件で比較できる土台を整えます。",
    figureCaption: "対象定義チャート",
    figureNote: "対象範囲・条件を示すチャート枠",
    speakerNote:
      "対象とした302件の自由記述は、単純に良い意見・悪い意見に分けられるものではありませんでした。ひとつの記述の中に、不安、感謝、要望、説明への疑問などが重なっていました。",
    scriptText: "",
    observationText: "ひとつのラベルで、本当に説明できるのか？",
    characterImageSrc: "/assets/slides/characters/03-character.png",
  },
  {
    id: "04",
    label: "方法",
    speech: "観測条件を先に決めることで、読みのぶれを抑えます。",
    figureCaption: "手順フロー図",
    figureNote: "手順の流れを可視化するフローチャート枠",
    speakerNote: "AIは大量の自由記述を整理する補助として使いました。しかし、意味の判断はすべて人が確認しています。",
    scriptText: "",
    observationText: "どうすれば、意味を正しく読み取れるのか？",
  },
  {
    id: "05",
    label: "フィルター",
    speech: "フィルターを通すことで、比較と再現の入口が生まれます。",
    figureCaption: "フィルター処理図",
    figureNote: "入力から出力までの処理構造を示す枠",
    speakerNote:
      "自由記述はそのまま読むと意味を取りこぼします。そこで、背景・出来事・意味の変化・不足という4つの視点で読み解きます。",
    scriptText: "",
    observationText: "どう読めば、意味を取りこぼさないのか？",
  },
  {
    id: "06",
    label: "結果",
    speech: "構造・変異・欠損として、結果を見える形で提示します。",
    figureCaption: "結果分布チャート",
    figureNote: "主要結果を置くチャートプレースホルダー",
    speakerNote:
      "分析の結果、自由記述は単一カテゴリでは整理できず、一つの記述の中に複数の要素が重なっていることが確認されました。単純なラベルでは意味を取りこぼすため、4つのフィルターで読み解くことが重要だと考えました。",
    scriptText: "",
    observationText: "本当に『不満』だけと言えるのか？",
  },
  {
    id: "07",
    label: "意義",
    speech: "分析は、関係性に介入する設計判断へ接続できます。",
    figureCaption: "意義マップ",
    figureNote: "示唆の接続を示す概念マップ枠",
    speakerNote:
      "自由記述の価値は、個人の経験で読み取られてきました。今回のように構造化することで、その経験知を組織で共有できる知見に変えることができます。",
    scriptText: "",
    observationText: "この読み解きは、現場で使えるのか？",
  },
  {
    id: "08",
    label: "今後",
    speech: "次段階では、実装と運用検証で精度を高めていきます。",
    figureCaption: "今後計画ロードマップ",
    figureNote: "次アクションを示すロードマップ枠",
    speakerNote:
      "構造化は目的ではありません。自由記述を扱える形に変えることで、認識のズレを早く捉え、説明や関係の改善につなげていくことが今後の展開です。この流れを実際に試す入口として、RA-SS demoも準備しています。",
    scriptText: "",
    observationText: "次に進むには、何を整えるべきか？",
  },
];

const totalSlides = topics.length;
const FIGURE_TITLE_SIZE = "17px";
const FIGURE_NODE_SIZE = "14px";
const FIGURE_SUB_SIZE = "12px";

export default function RASSWebSlides2026() {
  const [topicIndex, setTopicIndex] = useState(0);
  const [mode, setMode] = useState<ViewMode>("hybrid");

  const currentTopic = topics[topicIndex];
  const currentPosition = topicIndex + 1;

  const goPrev = () => {
    setTopicIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goNext = () => {
    setTopicIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <header style={headerStyle}>
          <div style={{ fontSize: "15px", fontWeight: 800, color: "#e2e8f0", whiteSpace: "nowrap" }}>RASS 2026 WEB Slides</div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: "12px", color: "#67e8f9", fontWeight: 700 }}>
              {String(currentPosition).padStart(2, "0")}/{String(totalSlides).padStart(2, "0")}
            </span>
            <span style={{ color: "#475569" }}>|</span>
            <span style={chipStyle}>{mode.toUpperCase()}</span>
            <span style={{ color: "#475569" }}>|</span>
            <span style={{ fontSize: "14px", fontWeight: 700 }}>
              {currentTopic.id} {currentTopic.label}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <button type="button" style={voiceButtonStyle} onClick={() => console.log("voice: play")}>▶ 再生</button>
            <button type="button" style={voiceButtonStyle} onClick={() => console.log("voice: pause")}>⏸</button>
            <button type="button" style={voiceButtonStyle} onClick={() => console.log("voice: next")}>▶▶</button>
            <button type="button" onClick={goPrev} style={controlButtonStyle}>前へ</button>
            <button type="button" onClick={goNext} style={controlButtonStyle}>次へ</button>
          </div>
        </header>

        <main style={windowZoneStyle}>
          <div style={observationStyle}>Speaker&apos;s Observation: {currentTopic.observationText}</div>
          <div style={slideViewportStyle}>
            <section style={slideFrameStyle}>
              {mode === "hybrid" ? (
                currentTopic.id === "01" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: "16px", alignItems: "stretch" }}>
                    <Slide01CharacterPanel imageSrc={currentTopic.characterImageSrc} />
                    <Slide01FigurePanel />
                  </div>
                ) : currentTopic.id === "02" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: "16px", alignItems: "stretch" }}>
                    <Slide02CharacterPanel imageSrc={currentTopic.characterImageSrc} />
                    <Slide02FigurePanel />
                  </div>
                ) : currentTopic.id === "03" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: "16px", alignItems: "stretch" }}>
                    <Slide03CharacterPanel imageSrc={currentTopic.characterImageSrc} />
                    <Slide03FigurePanel imageSrc="/assets/slides/figures/03-figure.png" />
                  </div>
                ) : currentTopic.id === "04" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: "16px", alignItems: "stretch" }}>
                    <Slide04CharacterPanel />
                    <Slide04FigurePanel />
                  </div>
                ) : currentTopic.id === "05" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: "16px", alignItems: "stretch" }}>
                    <Slide05CharacterPanel />
                    <Slide05FigurePanel />
                  </div>
                ) : currentTopic.id === "06" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: "16px", alignItems: "stretch" }}>
                    <Slide06CharacterPanel />
                    <Slide06FigurePanel />
                  </div>
                ) : currentTopic.id === "07" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: "16px", alignItems: "stretch" }}>
                    <Slide07CharacterPanel />
                    <Slide07FigurePanel />
                  </div>
                ) : currentTopic.id === "08" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "65fr 35fr", gap: "16px", alignItems: "stretch" }}>
                    <Slide08CharacterPanel />
                    <Slide08FigurePanel />
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", alignItems: "stretch" }}>
                    <CharacterPanel speech={currentTopic.speech} />
                    <FigurePanel figureCaption={currentTopic.figureCaption} figureNote={currentTopic.figureNote} />
                  </div>
                )
              ) : null}

              {mode === "character" ? <CharacterPanel speech={currentTopic.speech} large /> : null}
              {mode === "figure" ? <FigurePanel figureCaption={currentTopic.figureCaption} figureNote={currentTopic.figureNote} large /> : null}
            </section>
          </div>

        </main>

        <footer style={footerStyle}>
          <div style={footerSectionStyle}>
            <p style={{ margin: "0 0 6px", fontSize: "11px", letterSpacing: "0.12em", color: "#94a3b8" }}>INDEX</p>
            <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "2px" }}>
              {topics.map((topic, index) => {
                const active = topicIndex === index;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    title={`${topic.id} ${topic.label}`}
                    onClick={() => setTopicIndex(index)}
                    style={{
                      flex: "0 0 auto",
                      borderRadius: "8px",
                      border: active ? "1px solid rgba(103,232,249,0.8)" : "1px solid rgba(148,163,184,0.28)",
                      background: active ? "rgba(14,116,144,0.3)" : "rgba(15,23,42,0.55)",
                      color: active ? "#ecfeff" : "#cbd5e1",
                      padding: "8px 10px",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {topic.id} {topic.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ ...footerSectionStyle, maxWidth: "320px" }}>
            <p style={{ margin: "0 0 6px", fontSize: "11px", letterSpacing: "0.12em", color: "#94a3b8" }}>MODE</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
              <button type="button" onClick={() => setMode("hybrid")} style={modeButtonStyle(mode === "hybrid")}>Hybrid</button>
              <button type="button" onClick={() => setMode("character")} style={modeButtonStyle(mode === "character")}>Character</button>
              <button type="button" onClick={() => setMode("figure")} style={modeButtonStyle(mode === "figure")}>Figure</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function CharacterPanel({ speech, large = false }: { speech: string; large?: boolean }) {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.28)",
        background: "rgba(30,41,59,0.75)",
        padding: large ? "22px" : "16px",
        display: "grid",
        gridTemplateRows: "1fr auto",
        gap: "12px",
      }}
    >
      <div
        style={{
          borderRadius: "12px",
          border: "1px dashed rgba(125,211,252,0.45)",
          background: "rgba(15,23,42,0.5)",
          display: "grid",
          placeItems: "center",
          fontSize: large ? "30px" : "22px",
          color: "#7dd3fc",
          fontWeight: 700,
          minHeight: large ? "290px" : "230px",
        }}
      >
        Character Placeholder
      </div>
      <p style={{ margin: 0, fontSize: large ? "44px" : "30px", lineHeight: 1.3, fontWeight: 800, color: "#f8fafc" }}>
        「{speech}」
      </p>
    </article>
  );
}

function Slide01CharacterPanel({ imageSrc }: { imageSrc?: string }) {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.18)",
        background: "linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(30,41,59,0.68) 100%)",
        padding: "18px",
        display: "grid",
        gridTemplateRows: "1fr auto auto",
        gap: "10px",
      }}
    >
      <div
        style={{
          borderRadius: "14px",
          background: "linear-gradient(180deg, #f8f6f0 0%, #efe9dd 100%)",
          display: "grid",
          placeItems: "center",
          minHeight: "300px",
          overflow: "hidden",
          border: "1px solid rgba(148,163,184,0.22)",
          boxShadow: "0 10px 22px rgba(15,23,42,0.18)",
          padding: "4px",
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Slide 01 Character"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        ) : (
          <span style={{ fontSize: "22px", color: "#7dd3fc", fontWeight: 700 }}>Character Image Placeholder</span>
        )}
      </div>
      <p style={{ margin: 0, fontSize: "42px", lineHeight: 1.2, fontWeight: 900, color: "#f8fafc" }}>
        「このままだと、声は流れます。」
      </p>
      <p style={{ margin: 0, fontSize: "22px", lineHeight: 1.45, color: "#dbeafe", fontWeight: 700 }}>
        自由記述は集まっている。<br />
        しかし、組織の知見として蓄積されにくい。
      </p>
    </article>
  );
}

function Slide02CharacterPanel({ imageSrc }: { imageSrc?: string }) {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.18)",
        background: "linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(30,41,59,0.68) 100%)",
        padding: "18px",
        display: "grid",
        gridTemplateRows: "1fr auto auto",
        gap: "10px",
      }}
    >
      <div
        style={{
          borderRadius: "14px",
          background: "linear-gradient(180deg, #f8f6f0 0%, #efe9dd 100%)",
          display: "grid",
          placeItems: "center",
          minHeight: "300px",
          overflow: "hidden",
          border: "1px solid rgba(148,163,184,0.22)",
          boxShadow: "0 10px 22px rgba(15,23,42,0.18)",
          padding: "4px",
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Slide 02 Character"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        ) : (
          <span style={{ fontSize: "22px", color: "#7dd3fc", fontWeight: 700 }}>Character Image Placeholder</span>
        )}
      </div>
      <p style={{ margin: 0, fontSize: "40px", lineHeight: 1.2, fontWeight: 900, color: "#f8fafc" }}>
        「なぜ、この声は活かされないのか。」
      </p>
      <p style={{ margin: 0, fontSize: "32px", lineHeight: 1.25, fontWeight: 800, color: "#dbeafe" }}>
        「読み方の問題ではないか？」
      </p>
      <p style={{ margin: 0, fontSize: "21px", lineHeight: 1.45, color: "#dbeafe", fontWeight: 700 }}>
        自由記述は読まれている。<br />
        しかし、扱える形にはなっていない。
      </p>
    </article>
  );
}

function Slide03CharacterPanel({ imageSrc }: { imageSrc?: string }) {
  const bubbleStyle = (
    left: string,
    top: string,
    borderColor: string,
    scale: number
  ): React.CSSProperties => ({
    position: "absolute",
    left,
    top,
    transform: `translate(-50%, -50%) scale(${scale})`,
    borderRadius: "18px",
    border: `2px solid ${borderColor}`,
    background: "rgba(255,255,255,0.96)",
    color: "#111827",
    fontSize: "16px",
    fontWeight: 800,
    padding: "10px 12px",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
  });

  const tagStyle = (left: string, top: string): React.CSSProperties => ({
    position: "absolute",
    left,
    top,
    transform: "translate(-50%, -50%)",
    borderRadius: "999px",
    border: "1px solid rgba(100,116,139,0.35)",
    background: "rgba(241,245,249,0.72)",
    color: "#334155",
    fontSize: "12px",
    fontWeight: 700,
    padding: "5px 9px",
    opacity: 0.72,
    pointerEvents: "none",
    whiteSpace: "nowrap",
  });

  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.18)",
        background: "linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(30,41,59,0.68) 100%)",
        padding: "18px",
        display: "grid",
        gridTemplateRows: "auto auto auto",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          paddingTop: "2px",
          paddingBottom: "2px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            aspectRatio: "3 / 2",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid rgba(148,163,184,0.22)",
            background: "linear-gradient(180deg, #f8f6f0 0%, #efe9dd 100%)",
            display: "grid",
            placeItems: "center",
            position: "relative",
            boxShadow: "0 10px 22px rgba(15,23,42,0.18)",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Character"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
                transform: "scale(1.04)",
                filter: "contrast(0.94)",
              }}
            />
          ) : (
            <span style={{ fontSize: "22px", color: "#7dd3fc", fontWeight: 700 }}>Character Image Placeholder</span>
          )}

          {!imageSrc && (
            <>
              {/* speech bubbles */}
              <div style={bubbleStyle("50%", "17%", "#1f2937", 1)}>CORE「これ、不満でいいの？」</div>
              <div style={bubbleStyle("17%", "27%", "#2563eb", 0.8)}>NAVI「要素が重なってます」</div>
              <div style={bubbleStyle("77%", "28%", "#f87171", 0.8)}>SORA「感謝もあります」</div>
              <div style={bubbleStyle("83%", "64%", "#1e3a8a", 0.7)}>COΔEX「構造で見ましょう」</div>

              {/* sticky tags around CORE */}
              <div style={tagStyle("43%", "40%")}>不安</div>
              <div style={tagStyle("60%", "41%")}>感謝</div>
              <div style={tagStyle("41%", "56%")}>要望</div>
              <div style={tagStyle("61%", "56%")}>説明への疑問</div>
            </>
          )}
        </div>
      </div>
      <p style={{ margin: "16px 0 0", fontSize: "38px", lineHeight: 1.2, fontWeight: 900, color: "#f8fafc" }}>
        「ひとつのラベルでは、説明しきれません。」
      </p>
      <p style={{ margin: 0, fontSize: "20px", lineHeight: 1.45, color: "#dbeafe", fontWeight: 700 }}>
        302件の投書・自由記述には、<br />
        感謝、不満、要望、不安、説明への疑問が混在していました。
      </p>
    </article>
  );
}

function Slide04CharacterPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.18)",
        background: "linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(30,41,59,0.68) 100%)",
        padding: "18px",
        display: "grid",
        gridTemplateRows: "1fr auto auto",
        gap: "10px",
      }}
    >
      <div
        style={{
          borderRadius: "14px",
          background: "radial-gradient(circle at 30% 20%, rgba(125,211,252,0.16) 0%, rgba(15,23,42,0.2) 48%, rgba(15,23,42,0.55) 100%)",
          display: "grid",
          placeItems: "center",
          fontSize: "30px",
          color: "#7dd3fc",
          fontWeight: 700,
          minHeight: "300px",
        }}
      >
        Character
      </div>
      <p style={{ margin: 0, fontSize: "40px", lineHeight: 1.2, fontWeight: 900, color: "#f8fafc" }}>
        「AIに任せたわけではありません。」
      </p>
      <p style={{ margin: 0, fontSize: "21px", lineHeight: 1.45, color: "#dbeafe", fontWeight: 700 }}>
        AIで整理し、<br />
        人が意味を確認しています。
      </p>
    </article>
  );
}

function Slide05CharacterPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.18)",
        background: "linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(30,41,59,0.68) 100%)",
        padding: "18px",
        display: "grid",
        gridTemplateRows: "1fr auto auto",
        gap: "10px",
      }}
    >
      <div
        style={{
          borderRadius: "14px",
          background: "radial-gradient(circle at 30% 20%, rgba(125,211,252,0.16) 0%, rgba(15,23,42,0.2) 48%, rgba(15,23,42,0.55) 100%)",
          display: "grid",
          placeItems: "center",
          fontSize: "30px",
          color: "#7dd3fc",
          fontWeight: 700,
          minHeight: "300px",
        }}
      >
        Character
      </div>
      <p style={{ margin: 0, fontSize: "39px", lineHeight: 1.2, fontWeight: 900, color: "#f8fafc" }}>
        「このままでは、意味を取りこぼします。」
      </p>
      <p style={{ margin: 0, fontSize: "20px", lineHeight: 1.45, color: "#dbeafe", fontWeight: 700 }}>
        自由記述は読める。<br />
        しかし、構造がなければ、正確には読めない。
      </p>
    </article>
  );
}

function Slide06CharacterPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.18)",
        background: "linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(30,41,59,0.68) 100%)",
        padding: "18px",
        display: "grid",
        gridTemplateRows: "1fr auto auto",
        gap: "10px",
      }}
    >
      <div
        style={{
          borderRadius: "14px",
          background: "radial-gradient(circle at 30% 20%, rgba(125,211,252,0.16) 0%, rgba(15,23,42,0.2) 48%, rgba(15,23,42,0.55) 100%)",
          display: "grid",
          placeItems: "center",
          fontSize: "30px",
          color: "#7dd3fc",
          fontWeight: 700,
          minHeight: "300px",
        }}
      >
        Character
      </div>
      <p style={{ margin: 0, fontSize: "37px", lineHeight: 1.2, fontWeight: 900, color: "#f8fafc" }}>
        「ひとつの声に、<br />
        複数の意味が重なっていました。」
      </p>
      <p style={{ margin: 0, fontSize: "20px", lineHeight: 1.45, color: "#dbeafe", fontWeight: 700 }}>
        不満にも、感謝にも、<br />
        背景・出来事・変化・不足が含まれていました。
      </p>
    </article>
  );
}

function Slide07CharacterPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.18)",
        background: "linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(30,41,59,0.68) 100%)",
        padding: "18px",
        display: "grid",
        gridTemplateRows: "1fr auto auto",
        gap: "10px",
      }}
    >
      <div
        style={{
          borderRadius: "14px",
          background: "radial-gradient(circle at 30% 20%, rgba(125,211,252,0.16) 0%, rgba(15,23,42,0.2) 48%, rgba(15,23,42,0.55) 100%)",
          display: "grid",
          placeItems: "center",
          fontSize: "30px",
          color: "#7dd3fc",
          fontWeight: 700,
          minHeight: "300px",
        }}
      >
        Character
      </div>
      <p style={{ margin: 0, fontSize: "35px", lineHeight: 1.24, fontWeight: 900, color: "#f8fafc" }}>
        「経験に頼っていた読み解きが、<br />
        組織で共有できる知見に変わります。」
      </p>
      <p style={{ margin: 0, fontSize: "19px", lineHeight: 1.45, color: "#dbeafe", fontWeight: 700 }}>
        自由記述は、単なる投書や感想ではなく、<br />
        改善・教育・連携に活用できるデータになります。
      </p>
    </article>
  );
}

function Slide08CharacterPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.18)",
        background: "linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(30,41,59,0.68) 100%)",
        padding: "18px",
        display: "grid",
        gridTemplateRows: "1fr auto auto",
        gap: "10px",
      }}
    >
      <div
        style={{
          borderRadius: "14px",
          background: "radial-gradient(circle at 30% 20%, rgba(125,211,252,0.16) 0%, rgba(15,23,42,0.2) 48%, rgba(15,23,42,0.55) 100%)",
          display: "grid",
          placeItems: "center",
          fontSize: "30px",
          color: "#7dd3fc",
          fontWeight: 700,
          minHeight: "300px",
        }}
      >
        Character
      </div>
      <p style={{ margin: 0, fontSize: "39px", lineHeight: 1.2, fontWeight: 900, color: "#f8fafc" }}>
        「構造化は、次の行動につながります。」
      </p>
      <p style={{ margin: 0, fontSize: "20px", lineHeight: 1.45, color: "#dbeafe", fontWeight: 700 }}>
        自由記述を扱える形に変えることで、<br />
        ズレの検知、説明の再設計、関係調整へ進めます。<br />
        この流れを試す入口として、RA-SS demoを用意しています。
      </p>
    </article>
  );
}

function FigurePanel({
  figureCaption,
  figureNote,
  large = false,
}: {
  figureCaption: string;
  figureNote: string;
  large?: boolean;
}) {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.28)",
        background: "rgba(15,23,42,0.6)",
        padding: large ? "22px" : "16px",
        display: "grid",
        gridTemplateRows: "1fr auto",
        gap: "12px",
      }}
    >
      <div
        style={{
          borderRadius: "12px",
          border: "1px solid rgba(125,211,252,0.35)",
          background: "rgba(15,23,42,0.52)",
          padding: "14px",
          display: "grid",
          gridTemplateRows: "1fr auto",
          gap: "12px",
          minHeight: large ? "380px" : "280px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          <div style={{ borderRadius: "10px", border: "1px solid rgba(148,163,184,0.3)", background: "rgba(30,41,59,0.7)" }} />
          <div style={{ borderRadius: "10px", border: "1px solid rgba(148,163,184,0.3)", background: "rgba(51,65,85,0.7)" }} />
          <div style={{ borderRadius: "10px", border: "1px solid rgba(148,163,184,0.3)", background: "rgba(71,85,105,0.55)" }} />
        </div>
        <div
          style={{
            borderRadius: "10px",
            border: "1px dashed rgba(125,211,252,0.48)",
            padding: "10px",
            textAlign: "center",
            fontSize: FIGURE_TITLE_SIZE,
            fontWeight: 700,
            color: "#dbeafe",
          }}
        >
          {figureCaption}
        </div>
      </div>
      <p style={{ margin: 0, fontSize: FIGURE_SUB_SIZE, lineHeight: 1.4, fontWeight: 600, color: "#cbd5e1" }}>{figureNote}</p>
    </article>
  );
}

function Slide01FigurePanel() {
  const flowItemStyle: React.CSSProperties = {
    borderRadius: "10px",
    border: "1px solid rgba(120,220,255,0.38)",
    background: "rgba(15,35,60,0.42)",
    padding: "12px 12px",
    textAlign: "center",
    color: "#e8f4ff",
    fontSize: FIGURE_NODE_SIZE,
    fontWeight: 700,
    lineHeight: 1.35,
  };

  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.62) 100%)",
        padding: "14px",
        display: "grid",
        alignItems: "center",
      }}
    >
      <div style={{ display: "grid", gap: "10px", alignContent: "center" }}>
        <div style={flowItemStyle}>患者の声</div>
        <div style={{ textAlign: "center", color: "#94a3b8", fontSize: "18px", fontWeight: 700 }}>↓</div>
        <div style={flowItemStyle}>自由記述</div>
        <div style={{ textAlign: "center", color: "#94a3b8", fontSize: "18px", fontWeight: 700 }}>↓</div>
        <div style={{ ...flowItemStyle, border: "1px solid rgba(120,220,255,0.52)", background: "rgba(15,35,60,0.5)", fontWeight: 850 }}>
          個人判断
        </div>
        <div style={{ textAlign: "center", color: "#94a3b8", fontSize: "18px", fontWeight: 700 }}>↓</div>
        <div
          style={{
            ...flowItemStyle,
            border: "1px solid rgba(248,113,113,0.62)",
            background: "rgba(127,29,29,0.44)",
            color: "#fee2e2",
            fontWeight: 900,
            fontSize: FIGURE_NODE_SIZE,
          }}
        >
          共有されない
        </div>
        <div style={{ textAlign: "center", color: "#fca5a5", fontSize: "18px", fontWeight: 800 }}>↓</div>
        <div
          style={{
            ...flowItemStyle,
            border: "1px solid rgba(248,113,113,0.72)",
            background: "rgba(127,29,29,0.52)",
            color: "#fee2e2",
            fontWeight: 900,
            fontSize: FIGURE_NODE_SIZE,
          }}
        >
          蓄積されない
        </div>
      </div>
    </article>
  );
}

function Slide02FigurePanel() {
  const flowItemBase: React.CSSProperties = {
    borderRadius: "10px",
    padding: "9px 8px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: 700,
  };

  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.62) 100%)",
        padding: "12px",
        display: "grid",
        alignItems: "stretch",
      }}
    >
      <div style={{ display: "grid", gridTemplateRows: "1fr auto 1fr", gap: "8px" }}>
        <div
          style={{
            borderRadius: "11px",
            border: "1px solid rgba(120,220,255,0.35)",
            background: "rgba(15,35,60,0.4)",
            opacity: 0.7,
            padding: "8px",
            display: "grid",
            alignContent: "center",
            gap: "4px",
          }}
        >
          <div style={{ ...flowItemBase, border: "1px solid rgba(120,220,255,0.35)", background: "rgba(15,35,60,0.39)", color: "#d9e8f8" }}>自由記述</div>
          <div style={{ textAlign: "center", color: "#8ea3b9", fontSize: "16px", fontWeight: 700 }}>↓</div>
          <div style={{ ...flowItemBase, border: "1px solid rgba(120,220,255,0.35)", background: "rgba(15,35,60,0.39)", color: "#d5e2f2" }}>感想として読む</div>
          <div style={{ textAlign: "center", color: "#8ea3b9", fontSize: "16px", fontWeight: 700 }}>↓</div>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              color: "#9cc7ef",
              opacity: 0.82,
            }}
          >
            <div style={{ width: "36px", height: "36px", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "22%",
                  width: "11px",
                  height: "11px",
                  borderRadius: "999px",
                  border: "2px solid rgba(125,185,238,0.9)",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "68%",
                  width: "20px",
                  height: "12px",
                  borderRadius: "10px 10px 8px 8px",
                  border: "2px solid rgba(125,185,238,0.9)",
                  borderTop: "none",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          </div>
          <div style={{ textAlign: "center", color: "#8ea3b9", fontSize: "16px", fontWeight: 700 }}>↓</div>
          <div
            style={{
              ...flowItemBase,
              border: "1px solid rgba(120,220,255,0.4)",
              background: "rgba(15,35,60,0.44)",
              color: "#e5eefb",
              fontWeight: 800,
              fontSize: "19px",
            }}
          >
            個人で止まる
          </div>
        </div>

        <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(120,220,255,0.22) 0%, rgba(120,220,255,0.5) 50%, rgba(120,220,255,0.22) 100%)", margin: "0 4px" }} />

        <div
          style={{
            borderRadius: "11px",
            border: "1px solid rgba(120,220,255,0.6)",
            background: "rgba(0,160,190,0.38)",
            padding: "8px",
            display: "grid",
            alignContent: "center",
            gap: "4px",
          }}
        >
          <div style={{ ...flowItemBase, border: "1px solid rgba(120,220,255,0.5)", background: "rgba(0,160,190,0.35)", color: "#e6f7ff", fontWeight: 800 }}>自由記述</div>
          <div style={{ textAlign: "center", color: "#9be5ff", fontSize: "16px", fontWeight: 800 }}>↓</div>
          <div style={{ ...flowItemBase, border: "1px solid rgba(120,220,255,0.55)", background: "rgba(0,160,190,0.45)", color: "#f0fbff", fontWeight: 900 }}>構造として読む</div>
          <div style={{ textAlign: "center", color: "#9be5ff", fontSize: "16px", fontWeight: 800 }}>↓</div>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              color: "#bdfcf4",
              opacity: 0.9,
            }}
          >
            <div style={{ width: "38px", height: "38px", position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "8px",
                  top: "18px",
                  width: "22px",
                  height: "2px",
                  background: "rgba(134,239,215,0.85)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "18px",
                  top: "8px",
                  width: "2px",
                  height: "22px",
                  background: "rgba(134,239,215,0.85)",
                }}
              />
              <span style={{ position: "absolute", left: "2px", top: "14px", width: "9px", height: "9px", borderRadius: "999px", border: "2px solid rgba(134,239,215,0.95)" }} />
              <span style={{ position: "absolute", left: "13px", top: "3px", width: "9px", height: "9px", borderRadius: "999px", border: "2px solid rgba(134,239,215,0.95)" }} />
              <span style={{ position: "absolute", left: "25px", top: "14px", width: "9px", height: "9px", borderRadius: "999px", border: "2px solid rgba(134,239,215,0.95)" }} />
              <span style={{ position: "absolute", left: "13px", top: "26px", width: "9px", height: "9px", borderRadius: "999px", border: "2px solid rgba(134,239,215,0.95)" }} />
            </div>
          </div>
          <div style={{ textAlign: "center", color: "#9be5ff", fontSize: "16px", fontWeight: 800 }}>↓</div>
          <div
            style={{
              ...flowItemBase,
              border: "1px solid rgba(120,220,255,0.55)",
              background: "rgba(0,160,190,0.5)",
              color: "#f2fdff",
              fontWeight: 900,
              fontSize: "20px",
            }}
          >
            データになる
          </div>
        </div>
      </div>
    </article>
  );
}

function Slide03FigurePanel({ imageSrc }: { imageSrc?: string }) {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.62) 100%)",
        padding: "14px",
      }}
    >
      <div
        style={{
          borderRadius: "12px",
          background: "radial-gradient(circle at 50% 45%, rgba(14,116,144,0.28) 0%, rgba(15,23,42,0.3) 52%, rgba(15,23,42,0.58) 100%)",
          minHeight: "340px",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Slide 03 Figure"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              transform: "translateY(8px)",
            }}
          />
        ) : null}
      </div>
    </article>
  );
}

function Slide04FigurePanel() {
  const stepStyle = (kind: "ai" | "human" | "normal"): React.CSSProperties => ({
    borderRadius: "14px",
    padding: kind === "human" ? "14px 18px" : "12px 16px",
    textAlign: "left",
    fontSize: FIGURE_NODE_SIZE,
    fontWeight: kind === "human" ? 900 : kind === "normal" ? 850 : 750,
    border:
      kind === "human"
        ? "1px solid rgba(103,232,249,0.9)"
        : kind === "ai"
          ? "1px solid rgba(148,163,184,0.2)"
          : "1px solid rgba(125,211,252,0.5)",
    background:
      kind === "human"
        ? "rgba(14,116,144,0.56)"
        : kind === "ai"
          ? "rgba(30,41,59,0.34)"
          : "rgba(14,116,144,0.34)",
    color: kind === "ai" ? "#cbd5e1" : "#ecfeff",
    boxShadow: kind === "human" ? "0 0 20px rgba(34,211,238,0.25)" : "none",
  });

  const nodeWrapStyle: React.CSSProperties = {
    display: "grid",
    gap: "2px",
    lineHeight: 1.15,
  };

  const nodeSubStyle: React.CSSProperties = {
    fontSize: FIGURE_SUB_SIZE,
    fontWeight: 600,
    opacity: 0.86,
    letterSpacing: "0.01em",
  };

  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.62) 100%)",
        padding: "14px",
        position: "relative",
        display: "grid",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", minHeight: "340px", display: "grid", placeItems: "center", padding: "8px 6px" }}>
        <svg
          viewBox="0 0 340 340"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="flowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(103,232,249,0.65)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.35)" />
            </linearGradient>
            <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="rgba(125,211,252,0.78)" />
            </marker>
          </defs>
          <path d="M82 292 C116 270, 124 250, 146 230 C168 210, 182 190, 204 170 C224 152, 236 132, 254 112" fill="none" stroke="url(#flowGlow)" strokeWidth="6.5" markerEnd="url(#arrowHead)" />
          <path d="M100 282 C82 248, 86 212, 120 184 C152 160, 188 148, 218 122" fill="none" stroke="rgba(125,211,252,0.38)" strokeWidth="3.5" strokeDasharray="7 6" />
          <path d="M170 250 C206 230, 226 204, 240 176" fill="none" stroke="rgba(125,211,252,0.3)" strokeWidth="3" />
          <circle cx="146" cy="230" r="4.5" fill="rgba(186,230,253,0.95)" />
          <circle cx="204" cy="170" r="4.5" fill="rgba(186,230,253,0.95)" />
          <circle cx="254" cy="112" r="4.5" fill="rgba(186,230,253,0.95)" />
        </svg>

        <div style={{ position: "absolute", top: "14px", right: "18px", color: "#67e8f9", fontSize: FIGURE_TITLE_SIZE, fontWeight: 900 }}>
          精度が上がる
        </div>

        <div style={{ position: "absolute", top: "58px", left: "54%", transform: "translateX(-50%)", width: "62%", ...stepStyle("ai") }}>
          <div style={nodeWrapStyle}>
            <span>再整理</span>
            <span style={nodeSubStyle}>修正内容を反映して再整理</span>
          </div>
        </div>
        <div style={{ position: "absolute", top: "126px", left: "49%", transform: "translateX(-50%)", width: "68%", ...stepStyle("normal") }}>
          <div style={nodeWrapStyle}>
            <span>修正</span>
            <span style={nodeSubStyle}>誤りや不足を修正</span>
          </div>
        </div>
        <div style={{ position: "absolute", top: "200px", left: "46%", transform: "translateX(-50%)", width: "74%", ...stepStyle("human") }}>
          <div style={nodeWrapStyle}>
            <span>人が確認</span>
            <span style={nodeSubStyle}>意味を読み取り、妥当性を確認</span>
          </div>
        </div>
        <div style={{ position: "absolute", top: "278px", left: "40%", transform: "translateX(-50%)", width: "60%", ...stepStyle("ai") }}>
          <div style={nodeWrapStyle}>
            <span>AIで仮整理</span>
            <span style={nodeSubStyle}>大量の自由記述を整理</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Slide05FigurePanel() {
  const axisItemStyle = (pos: "top" | "right" | "left" | "bottom"): React.CSSProperties => ({
    position: "absolute",
    borderRadius: "999px",
    border: pos === "left" ? "1px solid rgba(103,232,249,0.62)" : "1px solid rgba(125,211,252,0.42)",
    background: "rgba(14,116,144,0.28)",
    color: "#dbeafe",
    fontSize: FIGURE_NODE_SIZE,
    fontWeight: pos === "left" ? 900 : 800,
    padding: "8px 14px",
    ...(pos === "top" ? { top: "12%", left: "50%", transform: "translateX(-50%)" } : null),
    ...(pos === "right" ? { right: "8%", top: "50%", transform: "translateY(-50%)" } : null),
    ...(pos === "left" ? { left: "8%", top: "50%", transform: "translateY(-50%)" } : null),
    ...(pos === "bottom" ? { bottom: "12%", left: "50%", transform: "translateX(-50%)" } : null),
  });

  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.62) 100%)",
        padding: "14px",
        display: "grid",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          minHeight: "340px",
          borderRadius: "12px",
          background: "radial-gradient(circle at center, rgba(14,116,144,0.26) 0%, rgba(8,20,42,0.2) 54%, rgba(15,23,42,0.5) 100%)",
        }}
      >
        <div style={axisItemStyle("top")}>背景</div>
        <div style={axisItemStyle("right")}>出来事</div>
        <div style={axisItemStyle("left")}>意味の変化</div>
        <div style={axisItemStyle("bottom")}>不足</div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "12px",
            border: "1px solid rgba(103,232,249,0.6)",
            background: "rgba(14,116,144,0.38)",
            color: "#ecfeff",
            fontSize: FIGURE_TITLE_SIZE,
            fontWeight: 900,
            padding: "14px 22px",
            boxShadow: "0 0 24px rgba(34,211,238,0.25)",
          }}
        >
          1つの記述
        </div>

        <svg
          viewBox="0 0 100 100"
          style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}
          aria-hidden="true"
        >
          <defs>
            <marker id="s05Arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 z" fill="rgba(125,211,252,0.58)" />
            </marker>
          </defs>
          <path d="M50 50 L50 30" stroke="rgba(125,211,252,0.5)" strokeWidth="1.5" markerEnd="url(#s05Arrow)" />
          <path d="M50 50 L72 50" stroke="rgba(125,211,252,0.5)" strokeWidth="1.5" markerEnd="url(#s05Arrow)" />
          <path d="M50 50 L28 50" stroke="rgba(125,211,252,0.65)" strokeWidth="1.7" markerEnd="url(#s05Arrow)" />
          <path d="M50 50 L50 72" stroke="rgba(125,211,252,0.5)" strokeWidth="1.5" markerEnd="url(#s05Arrow)" />
        </svg>
      </div>
    </article>
  );
}

function Slide06FigurePanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.62) 100%)",
        padding: "12px 12px 10px",
        display: "grid",
        gap: "7px",
        alignContent: "start",
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          border: "1px solid rgba(148,163,184,0.28)",
          background: "rgba(30,41,59,0.5)",
          padding: "9px 10px",
          color: "#e2e8f0",
          fontSize: FIGURE_TITLE_SIZE,
          lineHeight: 1.35,
          fontWeight: 700,
        }}
      >
        「退院説明は受けたが、<br />
        退院後の生活が想像できず不安が残った」
      </div>

      <div
        style={{
          borderRadius: "10px",
          border: "1px solid rgba(148,163,184,0.24)",
          background: "rgba(30,41,59,0.42)",
          padding: "8px",
          display: "grid",
          alignContent: "center",
          gap: "4px",
        }}
      >
        <p style={{ margin: 0, textAlign: "center", fontSize: FIGURE_TITLE_SIZE, color: "#94a3b8", fontWeight: 700 }}>単純分類</p>
        <div
          style={{
            borderRadius: "9px",
            border: "1px solid rgba(148,163,184,0.25)",
            background: "rgba(51,65,85,0.45)",
            color: "#cbd5e1",
            padding: "6px 10px",
            textAlign: "center",
            fontSize: FIGURE_NODE_SIZE,
            fontWeight: 800,
          }}
        >
          「不満」
        </div>
      </div>

      <p style={{ margin: "1px 0 2px", textAlign: "center", color: "#f87171", fontSize: FIGURE_TITLE_SIZE, fontWeight: 900 }}>↓ 取りこぼす</p>

      <div
        style={{
          borderRadius: "10px",
          border: "1px solid rgba(103,232,249,0.45)",
          background: "rgba(8,47,73,0.36)",
          padding: "9px 10px 8px",
          display: "grid",
          alignContent: "start",
          gap: "5px",
        }}
      >
        <p style={{ margin: 0, textAlign: "center", fontSize: FIGURE_TITLE_SIZE, color: "#dbeafe", fontWeight: 900 }}>フィルターで読む</p>
        <div style={{ borderRadius: "8px", border: "1px solid rgba(125,211,252,0.36)", background: "rgba(14,116,144,0.24)", padding: "5px 8px", color: "#e0f2fe", fontSize: FIGURE_NODE_SIZE, fontWeight: 700 }}>
          背景：退院後の不安
        </div>
        <div style={{ borderRadius: "8px", border: "1px solid rgba(125,211,252,0.36)", background: "rgba(14,116,144,0.24)", padding: "5px 8px", color: "#e0f2fe", fontSize: FIGURE_NODE_SIZE, fontWeight: 700 }}>
          出来事：退院説明
        </div>
        <div style={{ borderRadius: "8px", border: "1px solid rgba(125,211,252,0.36)", background: "rgba(14,116,144,0.24)", padding: "5px 8px", color: "#e0f2fe", fontSize: FIGURE_NODE_SIZE, fontWeight: 700 }}>
          変化：理解 → 不安が残る
        </div>
        <div style={{ borderRadius: "8px", border: "1px solid rgba(103,232,249,0.62)", background: "rgba(14,116,144,0.38)", padding: "6px 8px", color: "#ecfeff", fontSize: FIGURE_NODE_SIZE, fontWeight: 900 }}>
          不足：見通し
        </div>
      </div>

      <p style={{ margin: "1px 0 0", textAlign: "center", color: "#cbd5e1", fontSize: FIGURE_SUB_SIZE, fontWeight: 700 }}>
        4つの視点が、実際の記述の中に同時に存在していた
      </p>
    </article>
  );
}

function Slide07FigurePanel() {
  const stageStyle = (kind: "weak" | "mid" | "strong" | "future"): React.CSSProperties => ({
    borderRadius: "10px",
    border:
      kind === "strong"
        ? "1px solid rgba(103,232,249,0.72)"
        : kind === "mid"
          ? "1px solid rgba(125,211,252,0.5)"
          : kind === "future"
            ? "1px solid rgba(125,211,252,0.52)"
            : "1px solid rgba(148,163,184,0.28)",
    background:
      kind === "strong"
        ? "rgba(14,116,144,0.58)"
        : kind === "mid"
          ? "rgba(14,116,144,0.34)"
          : kind === "future"
            ? "rgba(8,47,73,0.44)"
            : "rgba(51,65,85,0.45)",
    color: kind === "weak" ? "#cbd5e1" : "#ecfeff",
    textAlign: "center",
    padding: "9px 10px",
    fontSize: kind === "strong" ? FIGURE_TITLE_SIZE : FIGURE_NODE_SIZE,
    fontWeight: kind === "strong" ? 900 : 800,
  });

  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.62) 100%)",
        padding: "13px",
        display: "grid",
        alignItems: "center",
      }}
    >
      <div style={{ display: "grid", gap: "7px", alignContent: "center" }}>
        <div style={stageStyle("weak")}>属人的な読み解き</div>
        <p style={{ margin: 0, textAlign: "center", color: "#94a3b8", fontSize: FIGURE_TITLE_SIZE, fontWeight: 800 }}>↓</p>
        <div style={stageStyle("mid")}>構造化</div>
        <p style={{ margin: 0, textAlign: "center", color: "#7dd3fc", fontSize: FIGURE_TITLE_SIZE, fontWeight: 900 }}>↓</p>
        <div style={stageStyle("strong")}>共有可能な知見</div>
        <p style={{ margin: 0, textAlign: "center", color: "#7dd3fc", fontSize: FIGURE_TITLE_SIZE, fontWeight: 900 }}>↓</p>
        <div style={stageStyle("future")}>改善・教育・連携へ展開</div>
      </div>
    </article>
  );
}

function Slide08FigurePanel() {
  const stageStyle = (kind: "entry" | "middle" | "final"): React.CSSProperties => ({
    borderRadius: "10px",
    border:
      kind === "final"
        ? "1px solid rgba(103,232,249,0.72)"
        : kind === "entry"
          ? "1px solid rgba(148,163,184,0.32)"
          : "1px solid rgba(125,211,252,0.5)",
    background:
      kind === "final"
        ? "rgba(14,116,144,0.54)"
        : kind === "entry"
          ? "rgba(51,65,85,0.42)"
          : "rgba(14,116,144,0.34)",
    color: kind === "entry" ? "#dbeafe" : "#ecfeff",
    textAlign: "center",
    padding: "9px 10px",
    fontSize: kind === "final" ? FIGURE_TITLE_SIZE : FIGURE_NODE_SIZE,
    fontWeight: kind === "final" ? 900 : 800,
  });

  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.62) 100%)",
        padding: "13px",
        display: "grid",
        alignItems: "center",
      }}
    >
      <div style={{ display: "grid", gap: "7px", alignContent: "center" }}>
        <div style={stageStyle("entry")}>自由記述の構造化</div>
        <p style={{ margin: 0, textAlign: "center", color: "#94a3b8", fontSize: FIGURE_TITLE_SIZE, fontWeight: 800 }}>↓</p>
        <div style={stageStyle("middle")}>ズレの検知</div>
        <p style={{ margin: 0, textAlign: "center", color: "#7dd3fc", fontSize: FIGURE_TITLE_SIZE, fontWeight: 900 }}>↓</p>
        <div style={stageStyle("middle")}>説明の再設計</div>
        <p style={{ margin: 0, textAlign: "center", color: "#7dd3fc", fontSize: FIGURE_TITLE_SIZE, fontWeight: 900 }}>↓</p>
        <div style={stageStyle("final")}>関係調整</div>
        <p style={{ margin: "2px 0 0", textAlign: "center", color: "#cbd5e1", fontSize: FIGURE_SUB_SIZE, fontWeight: 700 }}>
          この流れを試す入口として、RA-SS demoへ
        </p>
        <div style={{ display: "grid", placeItems: "center", marginTop: "2px" }}>
          <button
            type="button"
            onClick={() => console.log("ra-ss-demo: placeholder")}
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(125,211,252,0.5)",
              background: "rgba(8,47,73,0.42)",
              color: "#dbeafe",
              fontSize: FIGURE_SUB_SIZE,
              fontWeight: 700,
              padding: "4px 10px",
              cursor: "pointer",
            }}
          >
            RA-SS demo
          </button>
        </div>
      </div>
    </article>
  );
}

const pageStyle: React.CSSProperties = {
  height: "100vh",
  overflowY: "hidden",
  background: "radial-gradient(120% 120% at 50% 10%, #0a1b3f 0%, #030a1a 45%, #020617 100%)",
  color: "#e2e8f0",
  padding: "8px",
  fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
};

const shellStyle: React.CSSProperties = {
  maxWidth: "1600px",
  margin: "0 auto",
  borderRadius: "18px",
  border: "1px solid rgba(103,232,249,0.2)",
  background: "linear-gradient(180deg, rgba(3,10,30,0.9) 0%, rgba(2,8,24,0.92) 100%)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.52), inset 0 0 0 1px rgba(148,163,184,0.08)",
  height: "100%",
  overflow: "hidden",
  padding: "8px",
  display: "grid",
  gap: "8px",
};

const headerStyle: React.CSSProperties = {
  borderRadius: "12px",
  border: "1px solid rgba(125,211,252,0.22)",
  background: "linear-gradient(180deg, rgba(5,18,45,0.82) 0%, rgba(5,15,36,0.78) 100%)",
  minHeight: "68px",
  maxHeight: "72px",
  padding: "10px 10px",
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gap: "8px",
  alignItems: "center",
};

const chipStyle: React.CSSProperties = {
  fontSize: "11px",
  borderRadius: "999px",
  border: "1px solid rgba(148,163,184,0.42)",
  background: "rgba(15,23,42,0.72)",
  padding: "3px 9px",
  color: "#cbd5e1",
  letterSpacing: "0.06em",
};

const windowZoneStyle: React.CSSProperties = {
  padding: "10px 0",
  display: "grid",
  gap: "10px",
};

const observationStyle: React.CSSProperties = {
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "left",
  fontSize: "16px",
  color: "#a8b3c2",
  opacity: 0.65,
  fontWeight: 500,
  letterSpacing: "0.01em",
  padding: "8px 22px 10px",
  transform: "translateY(4px)",
};

const slideViewportStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const slideFrameStyle: React.CSSProperties = {
  width: "min(90vw, 100%)",
  maxWidth: "90vw",
  maxHeight: "calc(100vh - 180px)",
  aspectRatio: "16 / 9",
  borderRadius: "14px",
  border: "1px solid rgba(125,211,252,0.2)",
  background: "linear-gradient(160deg, rgba(5,15,40,0.95) 0%, rgba(7,20,48,0.78) 100%)",
  padding: "22px",
  display: "grid",
  overflow: "hidden",
  boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.08), 0 18px 36px rgba(0,0,0,0.35)",
};

const footerStyle: React.CSSProperties = {
  borderRadius: "12px",
  border: "1px solid rgba(125,211,252,0.2)",
  background: "linear-gradient(180deg, rgba(5,18,45,0.84) 0%, rgba(4,14,34,0.84) 100%)",
  minHeight: "76px",
  maxHeight: "84px",
  overflow: "hidden",
  padding: "8px 10px",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: "8px",
  alignItems: "start",
};

const footerSectionStyle: React.CSSProperties = {
  borderRadius: "10px",
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(15,23,42,0.56)",
  padding: "8px",
};

const controlButtonStyle: React.CSSProperties = {
  borderRadius: "999px",
  border: "1px solid rgba(125,211,252,0.32)",
  background: "linear-gradient(180deg, rgba(12,28,62,0.9) 0%, rgba(8,18,42,0.9) 100%)",
  color: "#e2e8f0",
  padding: "6px 10px",
  fontWeight: 700,
  fontSize: "12px",
  cursor: "pointer",
};

const modeButtonStyle = (active: boolean): React.CSSProperties => ({
  borderRadius: "999px",
  border: active ? "1px solid rgba(103,232,249,0.8)" : "1px solid rgba(148,163,184,0.3)",
  background: active ? "linear-gradient(180deg, rgba(8,145,178,0.35) 0%, rgba(14,116,144,0.35) 100%)" : "rgba(15,23,42,0.55)",
  color: active ? "#ecfeff" : "#cbd5e1",
  textAlign: "left",
  padding: "6px 8px",
  fontSize: "11px",
  fontWeight: 700,
  cursor: "pointer",
});

const voiceButtonStyle: React.CSSProperties = {
  borderRadius: "999px",
  border: "1px solid rgba(125,211,252,0.24)",
  background: "rgba(8,18,42,0.72)",
  color: "#cbd5e1",
  textAlign: "left",
  padding: "5px 7px",
  fontSize: "11px",
  fontWeight: 600,
  cursor: "pointer",
};
