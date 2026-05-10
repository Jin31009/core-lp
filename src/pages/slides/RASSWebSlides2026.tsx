import { useEffect, useRef, useState } from "react";

type ViewMode = "hybrid" | "character" | "figure";
type AudioStatus = "checking" | "ready" | "missing" | "error";

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
  audioSrc?: string;
};

const topics: Topic[] = [
  {
    id: "00",
    label: "表紙",
    speech: "自由記述を、扱えるデータに変える。",
    figureCaption: "POST→構造化ブリッジ",
    figureNote: "問題意識から構造化への橋渡し",
    speakerNote: "届いているが活かされない声を、構造として扱う研究の入口です。",
    scriptText: "",
    observationText: "届いている声を、どうすれば活かせるか？",
    audioSrc: "/audio/rass-2026/00-cover.mp3",
  },
  {
    id: "01",
    label: "問題",
    speech: "いまのままだと、重要な声が構造化されず流れてしまいます。",
    figureCaption: "問題構造の概念図",
    figureNote: "観測前の課題を示すプレースホルダー",
    speakerNote: "自由記述には価値があります。しかし、個人の判断に留まり、組織として活かされにくいことが問題です。",
    scriptText: "",
    observationText: "この声は、どこで止まり、どこで流れているのか。",
    characterImageSrc: "/assets/slides/characters/01-character.png",
    audioSrc: "/audio/rass-2026/01-problem.mp3",
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
    observationText: "感想で止まる読み方と、構造に広がる読み方を比べる。",
    characterImageSrc: "/assets/slides/characters/02-character.png",
    audioSrc: "/audio/rass-2026/02-purpose.mp3",
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
    observationText: "分類名ではなく、重なっている要素を見る。",
    characterImageSrc: "/assets/slides/characters/03-character.png",
    audioSrc: "/audio/rass-2026/03-structure.mp3",
  },
  {
    id: "04",
    label: "方法",
    speech: "観測条件を先に決めることで、読みのぶれを抑えます。",
    figureCaption: "手順フロー図",
    figureNote: "手順の流れを可視化するフローチャート枠",
    speakerNote: "AIは大量の自由記述を整理する補助として使いました。しかし、意味の判断はすべて人が確認しています。",
    scriptText: "",
    observationText: "AIが判断するのではなく、人が意味を確定しているか。",
    audioSrc: "/audio/rass-2026/04-rass.mp3",
  },
  {
    id: "05",
    label: "フィルター",
    speech: "このままでは、意味を取りこぼします。",
    figureCaption: "フィルター処理図",
    figureNote: "入力から出力までの処理構造を示す枠",
    speakerNote:
      "自由記述はそのまま読むと意味を取りこぼします。そこで、背景・出来事・意味の変化・不足という4つの視点で読み解きます。",
    scriptText: "",
    observationText: "4つの視点が、どの意味を拾っているか。",
    audioSrc: "/audio/rass-2026/05-data.mp3",
  },
  {
    id: "06",
    label: "結果",
    speech: "ひとつの声に、複数の意味が重なっていました。",
    figureCaption: "結果分布チャート",
    figureNote: "主要結果を置くチャートプレースホルダー",
    speakerNote:
      "分析の結果、自由記述は単一カテゴリでは整理できず、一つの記述の中に複数の要素が重なっていることが確認されました。単純なラベルでは意味を取りこぼすため、4つのフィルターで読み解くことが重要だと考えました。",
    scriptText: "",
    observationText: "分類名ではなく、背景・変化・不足の関係を見る。",
    audioSrc: "/audio/rass-2026/06-case.mp3",
  },
  {
    id: "07",
    label: "意義",
    speech: "経験に頼っていた読み解きが、組織で共有できる知見に変わります。",
    figureCaption: "意義マップ",
    figureNote: "示唆の接続を示す概念マップ枠",
    speakerNote:
      "自由記述の価値は、個人の経験で読み取られてきました。今回のように構造化することで、その経験知を組織で共有できる知見に変えることができます。",
    scriptText: "",
    observationText: "個人の経験知が、どこで組織の知見に変わるか。",
    audioSrc: "/audio/rass-2026/07-sensor.mp3",
  },
  {
    id: "08",
    label: "今後",
    speech: "投書の読み解きを、日常の違和感へ応用します。",
    figureCaption: "日常の違和感への応用",
    figureNote: "自由記述のフィルターを現場の小さなズレへ接続する",
    speakerNote:
      "自由記述を読むために設定したフィルターを、日常の現場で起きる小さな違和感や関係のズレに応用できるかを検討します。RA-SS demoは、その可能性を試すための入口です。",
    scriptText: "",
    observationText: "投書の読み解きから、日常の違和感の読み解きへ。",
    audioSrc: "/audio/rass-2026/08-next.mp3",
  },
];

const totalSlides = topics.length;
const integratedSlideIds = new Set(topics.map((topic) => topic.id));
const FIGURE_TITLE_SIZE = "17px";
const FIGURE_NODE_SIZE = "14px";
const FIGURE_SUB_SIZE = "12px";
const responsiveStyles = `
  html,
  body,
  #root {
    margin: 0;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  .rass-page,
  .rass-shell,
  .rass-header,
  .rass-window-zone,
  .rass-slide-frame,
  .rass-footer,
  .rass-footer-index,
  .rass-footer-view {
    box-sizing: border-box;
  }

  .rass-viewer-button {
    transition: border-color 160ms ease, background 160ms ease, box-shadow 160ms ease, transform 160ms ease;
  }

  .rass-viewer-button:hover:not(:disabled) {
    border-color: rgba(125, 211, 252, 0.78) !important;
    box-shadow: 0 0 0 1px rgba(103, 232, 249, 0.12), 0 0 16px rgba(56, 189, 248, 0.16) !important;
    transform: translateY(-1px);
  }

  .rass-viewer-button:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }

  .rass-orientation-hint {
    display: none !important;
  }

  .rass-header > *,
  .rass-window-zone > *,
  .rass-footer > * {
    min-width: 0;
  }

  @media (max-width: 1023px) {
    .rass-page {
      width: 100vw !important;
      max-width: 100vw !important;
      height: auto !important;
      min-height: 100dvh !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
    }

    .rass-shell {
      height: auto !important;
      min-height: 100dvh !important;
      overflow: visible !important;
    }

    .rass-header {
      grid-template-columns: minmax(0, 1fr) !important;
      min-height: auto !important;
    }

    .rass-header-title,
    .rass-header-status,
    .rass-header-controls {
      justify-content: center !important;
      text-align: center !important;
      width: 100% !important;
      min-width: 0 !important;
    }

    .rass-header-title {
      font-size: clamp(15px, 2.2vw, 18px) !important;
    }

    .rass-audio-button,
    .rass-nav-button {
      min-height: 48px !important;
      font-size: 15px !important;
    }

    .rass-play-button,
    .rass-stop-button {
      min-width: 78px !important;
    }

    .rass-replay-button {
      min-width: 96px !important;
    }

    .rass-prev-button,
    .rass-next-button {
      min-width: 68px !important;
    }

    .rass-slide-frame {
      width: min(100%, calc(100vw - 32px)) !important;
      max-width: 100% !important;
      max-height: none !important;
      padding: 14px !important;
    }

    .rass-cover-slide-frame {
      padding: 0 !important;
    }

    .rass-footer-view {
      margin-left: auto !important;
      max-width: 340px !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) and (orientation: landscape) {
    .rass-page {
      padding: 6px !important;
    }

    .rass-shell {
      padding: 8px !important;
      gap: 8px !important;
    }

    .rass-header {
      grid-template-columns: minmax(160px, 0.8fr) minmax(220px, 1fr) minmax(360px, 1.4fr) !important;
      padding: 10px 12px !important;
      gap: 10px !important;
    }

    .rass-header-title {
      font-size: 13px !important;
      line-height: 1.25 !important;
      text-align: left !important;
      justify-content: flex-start !important;
    }

    .rass-header-status {
      justify-content: center !important;
      gap: 8px !important;
    }

    .rass-header-controls {
      justify-content: flex-end !important;
      gap: 8px !important;
    }

    .rass-audio-status {
      min-height: 36px !important;
      padding: 7px 10px !important;
      font-size: 11px !important;
    }

    .rass-audio-button,
    .rass-nav-button {
      min-height: 46px !important;
      padding: 9px 12px !important;
      font-size: 14px !important;
    }

    .rass-window-zone {
      padding: 6px 0 !important;
      gap: 8px !important;
    }

    .rass-observation {
      min-height: auto !important;
      padding: 8px 12px !important;
    }

    .rass-observation-label {
      font-size: 10px !important;
      padding: 4px 8px !important;
    }

    .rass-observation-text {
      font-size: 14px !important;
      line-height: 1.25 !important;
    }

    .rass-slide-frame {
      width: min(100%, calc((100dvh - 250px) * 16 / 9), calc(100vw - 28px)) !important;
      padding: 10px !important;
    }

    .rass-cover-slide-frame {
      padding: 0 !important;
    }

    .rass-footer {
      padding: 8px !important;
      gap: 8px !important;
    }

    .rass-footer-index {
      flex: 1 1 520px !important;
      padding: 8px !important;
    }

    .rass-footer-view {
      flex: 0 1 280px !important;
      max-width: 280px !important;
      padding: 8px !important;
    }

    .rass-index-row {
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      padding-bottom: 4px !important;
    }

    .rass-index-button {
      min-height: 40px !important;
      padding: 8px 12px !important;
      font-size: 13px !important;
    }

    .rass-view-pill {
      min-height: 38px !important;
      padding: 8px 12px !important;
      font-size: 13px !important;
    }

    .rass-view-hint {
      padding: 6px 8px !important;
      font-size: 10px !important;
    }
  }

  @media (max-width: 767px) {
    .rass-page {
      height: auto !important;
      min-height: 100dvh !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      padding: 6px !important;
    }

    .rass-shell {
      width: min(100%, calc(100vw - 12px)) !important;
      max-width: calc(100vw - 12px) !important;
      height: auto !important;
      min-height: 100dvh !important;
      overflow: visible !important;
      padding: 8px !important;
      gap: 10px !important;
      border-radius: 14px !important;
    }

    .rass-header {
      width: 100% !important;
      grid-template-columns: 1fr !important;
      padding: 12px !important;
      gap: 10px !important;
      border-radius: 12px !important;
    }

    .rass-header-title {
      max-width: 18em !important;
      margin: 0 auto !important;
      font-size: 16px !important;
      line-height: 1.35 !important;
    }

    .rass-header-status {
      gap: 8px !important;
    }

    .rass-header-controls {
      gap: 8px !important;
      justify-content: center !important;
    }

    .rass-audio-status {
      min-height: 38px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 8px 10px !important;
      font-size: 12px !important;
    }

    .rass-audio-button,
    .rass-nav-button,
    .rass-index-button {
      min-height: 48px !important;
      padding: 11px 14px !important;
      font-size: 14px !important;
    }

    .rass-play-button,
    .rass-stop-button {
      min-width: 78px !important;
    }

    .rass-replay-button {
      min-width: 96px !important;
    }

    .rass-prev-button,
    .rass-next-button {
      min-width: 66px !important;
    }

    .rass-window-zone {
      width: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      padding: 8px 0 !important;
      gap: 10px !important;
    }

    .rass-slide-viewport {
      order: 1 !important;
      width: 100% !important;
      filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.06)) !important;
    }

    .rass-observation {
      order: 2 !important;
      min-height: auto !important;
      padding: 12px !important;
      gap: 9px !important;
    }

    .rass-observation-label {
      font-size: 11px !important;
      padding: 5px 9px !important;
    }

    .rass-observation-text {
      flex-basis: 100% !important;
      font-size: 15px !important;
      line-height: 1.42 !important;
    }

    .rass-slide-frame {
      width: min(100%, calc(100vw - 32px)) !important;
      max-width: calc(100vw - 32px) !important;
      max-height: none !important;
      padding: 8px !important;
      border-radius: 12px !important;
    }

    .rass-cover-slide-frame {
      padding: 0 !important;
    }

    .rass-footer {
      width: 100% !important;
      min-height: auto !important;
      overflow: visible !important;
      padding: 10px !important;
      gap: 10px !important;
    }

    .rass-footer-index,
    .rass-footer-view {
      flex: 1 1 100% !important;
      max-width: 100% !important;
      width: 100% !important;
      margin-left: 0 !important;
      padding: 10px !important;
    }

    .rass-index-row {
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      padding-bottom: 6px !important;
      -webkit-overflow-scrolling: touch;
    }

    .rass-view-pill {
      min-height: 42px !important;
      display: grid !important;
      place-items: center !important;
    }

    .rass-view-hint {
      font-size: 11px !important;
    }
  }

  @media (max-width: 767px) and (orientation: landscape) {
    .rass-page {
      padding: 3px !important;
    }

    .rass-shell {
      min-height: auto !important;
      padding: 5px !important;
      gap: 5px !important;
      border-radius: 10px !important;
    }

    .rass-header {
      display: grid !important;
      grid-template-columns: minmax(120px, 0.7fr) minmax(150px, 0.8fr) minmax(420px, 1.8fr) !important;
      padding: 5px 7px !important;
      gap: 6px !important;
      border-radius: 9px !important;
    }

    .rass-header-title {
      font-size: 11px !important;
      line-height: 1.2 !important;
      max-width: none !important;
      text-align: left !important;
      justify-content: flex-start !important;
    }

    .rass-header-status {
      justify-content: center !important;
      gap: 6px !important;
    }

    .rass-header-controls {
      display: flex !important;
      flex-wrap: nowrap !important;
      justify-content: flex-end !important;
      gap: 6px !important;
    }

    .rass-audio-status {
      order: 0 !important;
      min-height: 34px !important;
      flex-basis: auto !important;
      padding: 6px 8px !important;
      font-size: 10px !important;
    }

    .rass-prev-button {
      order: 1 !important;
    }

    .rass-play-button {
      order: 2 !important;
    }

    .rass-stop-button {
      order: 3 !important;
    }

    .rass-replay-button {
      order: 4 !important;
    }

    .rass-next-button {
      order: 5 !important;
    }

    .rass-audio-button,
    .rass-nav-button {
      min-height: 44px !important;
      padding: 8px 10px !important;
      font-size: 13px !important;
      flex: 0 0 auto !important;
      white-space: nowrap !important;
    }

    .rass-play-button,
    .rass-stop-button {
      min-width: 72px !important;
    }

    .rass-replay-button {
      min-width: 88px !important;
    }

    .rass-prev-button,
    .rass-next-button {
      min-width: 60px !important;
    }

    .rass-window-zone {
      padding: 4px 0 !important;
      gap: 5px !important;
    }

    .rass-observation {
      padding: 5px 8px !important;
      gap: 6px !important;
    }

    .rass-observation-label {
      font-size: 9px !important;
      padding: 3px 7px !important;
    }

    .rass-observation-text {
      font-size: 11px !important;
      line-height: 1.2 !important;
    }

    .rass-slide-frame {
      width: min(calc((100dvh - 190px) * 16 / 9), calc(100vw - 18px)) !important;
      max-width: calc(100vw - 18px) !important;
      padding: 5px !important;
      border-radius: 9px !important;
    }

    .rass-cover-slide-frame {
      padding: 0 !important;
    }

    .rass-footer {
      padding: 5px !important;
      gap: 5px !important;
    }

    .rass-footer-index,
    .rass-footer-view {
      padding: 6px !important;
    }

    .rass-footer-index {
      flex: 1 1 470px !important;
    }

    .rass-footer-view {
      flex: 0 1 210px !important;
      max-width: 210px !important;
      margin-left: auto !important;
    }

    .rass-footer p {
      margin-bottom: 5px !important;
      font-size: 11px !important;
    }

    .rass-index-row {
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      padding-bottom: 3px !important;
    }

    .rass-index-button {
      min-height: 36px !important;
      padding: 7px 10px !important;
      font-size: 12px !important;
    }

    .rass-view-pill {
      min-height: 34px !important;
      padding: 6px 9px !important;
      font-size: 12px !important;
    }

    .rass-view-hint {
      padding: 5px 7px !important;
      font-size: 9px !important;
    }
  }

  @media (max-width: 767px) and (orientation: portrait) {
    .rass-header-controls {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      align-items: stretch !important;
      width: 100% !important;
    }

    .rass-audio-status {
      grid-column: 1 / -1 !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }

    .rass-audio-button,
    .rass-nav-button {
      width: 100% !important;
      min-width: 0 !important;
      justify-content: center !important;
      text-align: center !important;
    }

    .rass-orientation-hint {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box;
      border-radius: 12px;
      border: 1px solid rgba(251, 191, 36, 0.38);
      background: linear-gradient(180deg, rgba(120, 53, 15, 0.28) 0%, rgba(15, 23, 42, 0.52) 100%);
      color: #fde68a;
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 800;
      line-height: 1.45;
      text-align: center;
      box-shadow: inset 0 0 0 1px rgba(251, 191, 36, 0.08);
    }

    .rass-footer-view > div,
    .rass-view-pill,
    .rass-view-hint {
      min-width: 0 !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
  }
`;

export default function RASSWebSlides2026() {
  const [topicIndex, setTopicIndex] = useState(0);
  const [mode, setMode] = useState<ViewMode>("hybrid");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>("checking");
  const [audioError, setAudioError] = useState<string | null>(null);

  const currentTopic = topics[topicIndex];
  const currentPosition = topicIndex + 1;
  const isIntegratedSlide = integratedSlideIds.has(currentTopic.id);
  const isCoverSlide = currentTopic.id === "00";
  const viewModeLabel = isIntegratedSlide ? "統合表示" : mode.toUpperCase();
  const canPlayAudio = Boolean(currentTopic.audioSrc) && audioStatus === "ready";
  const audioStatusText = isPlaying
    ? "音声ガイド再生中"
    : audioStatus === "checking"
      ? "音声確認中"
      : audioStatus === "ready"
        ? "音声ガイド"
        : audioError ?? "音声準備中";

  const resetCurrentAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const handlePlayAudio = async () => {
    if (!canPlayAudio || !audioRef.current) return;
    setAudioError(null);
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setAudioError("音声準備中");
      setAudioStatus("error");
      setIsPlaying(false);
    }
  };

  const handleStopAudio = () => {
    resetCurrentAudio();
  };

  const handleReplayAudio = async () => {
    if (!canPlayAudio || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    await handlePlayAudio();
  };

  useEffect(() => {
    resetCurrentAudio();
    setAudioError(null);

    if (!currentTopic.audioSrc) {
      setAudioStatus("missing");
      return;
    }

    let cancelled = false;
    setAudioStatus("checking");

    fetch(currentTopic.audioSrc, { method: "HEAD", cache: "no-store" })
      .then((response) => {
        if (cancelled) return;
        setAudioStatus(response.ok ? "ready" : "missing");
        if (!response.ok) setAudioError("音声準備中");
      })
      .catch(() => {
        if (cancelled) return;
        setAudioStatus("error");
        setAudioError("音声準備中");
      });

    return () => {
      cancelled = true;
    };
  }, [currentTopic.audioSrc]);

  const goPrev = () => {
    setTopicIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goNext = () => {
    setTopicIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="rass-page" style={pageStyle}>
      <style>{responsiveStyles}</style>
      <div className="rass-shell" style={shellStyle}>
        <header className="rass-header" style={isCoverSlide ? { ...headerStyle, ...coverChromeStyle } : headerStyle}>
          <div className="rass-header-title" style={headerTitleStyle}>第28回日本医療マネジメント学会学術総会</div>

          <div className="rass-header-status" style={headerStatusStyle}>
            <span style={{ fontSize: "15px", color: "#67e8f9", fontWeight: 850 }}>
              {String(currentPosition).padStart(2, "0")}/{String(totalSlides).padStart(2, "0")}
            </span>
            <span style={{ color: "#475569" }}>|</span>
            <span style={chipStyle}>{viewModeLabel}</span>
            <span style={{ color: "#475569" }}>|</span>
            <span style={{ fontSize: "17px", fontWeight: 850 }}>
              {currentTopic.id} {currentTopic.label}
            </span>
          </div>

          <div className="rass-header-controls" style={headerControlsStyle}>
            <span className="rass-audio-status" style={audioStatusStyle}>{audioStatusText}</span>
            <button className="rass-viewer-button rass-audio-button rass-play-button" type="button" style={{ ...voiceButtonStyle, ...(!canPlayAudio || isPlaying ? disabledButtonStyle : {}) }} onClick={handlePlayAudio} disabled={!canPlayAudio || isPlaying}>▶ 再生</button>
            <button className="rass-viewer-button rass-audio-button rass-stop-button" type="button" style={{ ...voiceButtonStyle, ...(!isPlaying ? disabledButtonStyle : {}) }} onClick={handleStopAudio} disabled={!isPlaying}>⏸ 停止</button>
            <button className="rass-viewer-button rass-audio-button rass-replay-button" type="button" style={{ ...voiceButtonStyle, ...(!canPlayAudio ? disabledButtonStyle : {}) }} onClick={handleReplayAudio} disabled={!canPlayAudio}>↺ もう一度</button>
            <button className="rass-viewer-button rass-nav-button rass-prev-button" type="button" onClick={goPrev} style={controlButtonStyle}>前へ</button>
            <button className="rass-viewer-button rass-nav-button rass-next-button" type="button" onClick={goNext} style={controlButtonStyle}>次へ</button>
          </div>
        </header>

        <audio
          ref={audioRef}
          src={currentTopic.audioSrc}
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onError={() => {
            if (!currentTopic.audioSrc) return;
            setAudioStatus("error");
            setAudioError("音声準備中");
            setIsPlaying(false);
          }}
        />

        <div className="rass-orientation-hint" style={orientationHintStyle}>
          スマートフォンでは、横向きでご覧いただくと見やすくなります。
        </div>

        <main className="rass-window-zone" style={isCoverSlide ? { ...windowZoneStyle, ...coverWindowZoneStyle } : windowZoneStyle}>
          {isCoverSlide ? null : (
            <div className="rass-observation" style={observationStyle}>
              <span className="rass-observation-label" style={observationLabelStyle}>Speaker&apos;s Observation</span>
              <span className="rass-observation-text" style={observationTextStyle}>{currentTopic.observationText}</span>
            </div>
          )}
          <div className="rass-slide-viewport" style={slideViewportStyle}>
            <section className={isCoverSlide ? "rass-slide-frame rass-cover-slide-frame" : "rass-slide-frame"} style={isCoverSlide ? coverSlideFrameStyle : slideFrameStyle}>
              {currentTopic.id === "00" ? (
                <Slide00CoverPanel />
              ) : currentTopic.id === "01" ? (
                <Slide01UnifiedPanel />
              ) : currentTopic.id === "02" ? (
                <Slide02UnifiedPanel />
              ) : currentTopic.id === "03" ? (
                <Slide03UnifiedPanel />
              ) : currentTopic.id === "04" ? (
                <Slide04UnifiedPanel />
              ) : currentTopic.id === "05" ? (
                <Slide05UnifiedPanel />
              ) : currentTopic.id === "06" ? (
                <Slide06UnifiedPanel />
              ) : currentTopic.id === "07" ? (
                <Slide07UnifiedPanel />
              ) : currentTopic.id === "08" ? (
                <Slide08UnifiedPanel />
              ) : mode === "hybrid" ? (
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
                  <div style={{ display: "grid", gridTemplateColumns: "44fr 56fr", gap: "16px", alignItems: "stretch" }}>
                    <Slide05CharacterPanel />
                    <Slide05FigurePanel />
                  </div>
                ) : currentTopic.id === "06" ? (
                  <Slide06UnifiedPanel />
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

              {currentTopic.id !== "00" && currentTopic.id !== "01" && currentTopic.id !== "02" && currentTopic.id !== "03" && currentTopic.id !== "04" && currentTopic.id !== "05" && currentTopic.id !== "06" && currentTopic.id !== "07" && currentTopic.id !== "08" && mode === "character" ? <CharacterPanel speech={currentTopic.speech} large /> : null}
              {currentTopic.id !== "00" && currentTopic.id !== "01" && currentTopic.id !== "02" && currentTopic.id !== "03" && currentTopic.id !== "04" && currentTopic.id !== "05" && currentTopic.id !== "06" && currentTopic.id !== "07" && currentTopic.id !== "08" && mode === "figure" ? <FigurePanel figureCaption={currentTopic.figureCaption} figureNote={currentTopic.figureNote} large /> : null}
            </section>
          </div>

        </main>

        <footer className="rass-footer" style={isCoverSlide ? { ...footerStyle, ...coverChromeStyle } : footerStyle}>
          <div className="rass-footer-index" style={footerIndexSectionStyle}>
            <p style={{ margin: "0 0 9px", fontSize: "14px", letterSpacing: "0.12em", color: "#a9bfd4", fontWeight: 800 }}>INDEX</p>
            <div className="rass-index-row" style={indexButtonRowStyle}>
              {topics.map((topic, index) => {
                const active = topicIndex === index;
                return (
                  <button
                    className="rass-viewer-button rass-index-button"
                    key={topic.id}
                    type="button"
                    title={`${topic.id} ${topic.label}`}
                    onClick={() => setTopicIndex(index)}
                    style={{
                      flex: "0 0 auto",
                      borderRadius: "10px",
                      border: active ? "2px solid rgba(251,191,36,0.94)" : "1px solid rgba(148,163,184,0.38)",
                      background: active
                        ? "linear-gradient(180deg, rgba(34,211,238,0.34) 0%, rgba(8,145,178,0.42) 100%)"
                        : "linear-gradient(180deg, rgba(29,54,86,0.72) 0%, rgba(19,39,66,0.72) 100%)",
                      color: active ? "#f0fdff" : "#d6e4f4",
                      padding: active ? "10px 16px" : "10px 14px",
                      fontSize: "14px",
                      fontWeight: active ? 900 : 800,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      boxShadow: active ? "0 0 0 2px rgba(34,211,238,0.14), 0 0 18px rgba(251,191,36,0.18)" : "none",
                    }}
                  >
                    {topic.id} {topic.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rass-footer-view" style={footerViewSectionStyle}>
            <p style={{ margin: "0 0 9px", fontSize: "14px", letterSpacing: "0.12em", color: "#a9bfd4", fontWeight: 800 }}>VIEW</p>
            {isIntegratedSlide ? (
              <div style={integratedViewStyle}>
                <div className="rass-view-pill" style={integratedViewPillStyle}>統合画像</div>
                <div className="rass-view-hint" style={integratedViewHintStyle}>Character / Figure は画像内に統合</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <button type="button" onClick={() => setMode("hybrid")} style={modeButtonStyle(mode === "hybrid")}>Hybrid</button>
                <button type="button" onClick={() => setMode("character")} style={modeButtonStyle(mode === "character")}>Character</button>
                <button type="button" onClick={() => setMode("figure")} style={modeButtonStyle(mode === "figure")}>Figure</button>
              </div>
            )}
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

function Slide00CoverPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(125,211,252,0.14)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.42) 0%, rgba(15,23,42,0.32) 100%)",
        padding: "14px 18px",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          width: "97%",
          height: "100%",
          borderRadius: "10px",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          src="/assets/slides/cover/cover-00-final-qr.png"
          alt="RA-SS 2026 WEB Slides 表紙"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>
    </article>
  );
}

function Slide01UnifiedPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(125,211,252,0.16)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.58) 100%)",
        padding: "14px 16px",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img
        src="/assets/slides/characters/01-unified-phase2.png"
        alt="01 問題 統合スライド"
        style={{
          width: "98%",
          height: "98%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </article>
  );
}

function Slide02UnifiedPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(125,211,252,0.16)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.58) 100%)",
        padding: "14px 16px",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img
        src="/assets/slides/characters/02-unified-phase1.png"
        alt="02 問い 統合スライド"
        style={{
          width: "98%",
          height: "98%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </article>
  );
}

function Slide03UnifiedPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(125,211,252,0.16)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.58) 100%)",
        padding: "14px 16px",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img
        src="/assets/slides/characters/03-unified-phase2.png"
        alt="03 対象 統合スライド"
        style={{
          width: "98%",
          height: "98%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </article>
  );
}

function Slide04UnifiedPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(125,211,252,0.16)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.58) 100%)",
        padding: "14px 16px",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img
        src="/assets/slides/characters/04-unified-phase2.png"
        alt="04 方法 統合スライド"
        style={{
          width: "98%",
          height: "98%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
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
        gridTemplateRows: "1fr auto auto auto",
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
        gridTemplateRows: "1fr auto",
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
          minHeight: "300px",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          src="/assets/slides/characters/04-character.png"
          alt="Slide 04 Character"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
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
          minHeight: "300px",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          src="/assets/slides/characters/05-character.png"
          alt="Slide 05 Character"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
      <p style={{ margin: 0, fontSize: "39px", lineHeight: 1.2, fontWeight: 900, color: "#f8fafc" }}>
        「このままでは、意味を取りこぼします。」
      </p>
    </article>
  );
}

function Slide05UnifiedPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(125,211,252,0.16)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.58) 100%)",
        padding: "14px 16px",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img
        src="/assets/slides/characters/05-unified.png"
        alt="05 フィルター 統合スライド"
        style={{
          width: "98%",
          height: "98%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </article>
  );
}

function Slide06UnifiedPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(125,211,252,0.16)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.58) 100%)",
        padding: "14px 16px",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img
        src="/assets/slides/figures/06-killer-figure-phase2.png"
        alt="06 結果 キラーFigure"
        style={{
          width: "98%",
          height: "98%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </article>
  );
}

function Slide07UnifiedPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(125,211,252,0.16)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.58) 100%)",
        padding: "14px 16px",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img
        src="/assets/slides/characters/07-unified.png"
        alt="07 意義 統合スライド"
        style={{
          width: "98%",
          height: "98%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </article>
  );
}

function Slide08UnifiedPanel() {
  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(125,211,252,0.16)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.58) 100%)",
        padding: "14px 16px",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img
        src="/assets/slides/characters/08-unified-phase1.png"
        alt="08 今後 統合スライド"
        style={{
          width: "98%",
          height: "98%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
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
          minHeight: "300px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/assets/slides/characters/07-character.png"
          alt="Slide 07 Character"
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", left: "50%", bottom: "10px", transform: "translateX(-50%)", borderRadius: "999px", border: "1px solid rgba(148,163,184,0.55)", background: "rgba(15,23,42,0.75)", padding: "5px 12px", color: "#bae6fd", fontSize: "13px", fontWeight: 800 }}>
          経験知を、組織の知見へ。
        </div>
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
        gridTemplateRows: "1fr auto auto auto",
        gap: "10px",
      }}
    >
      <div
        style={{
          borderRadius: "14px",
          background: "radial-gradient(circle at 30% 20%, rgba(125,211,252,0.16) 0%, rgba(15,23,42,0.2) 48%, rgba(15,23,42,0.55) 100%)",
          minHeight: "300px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/assets/slides/characters/08-character.png"
          alt="Slide 08 Character"
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
        />
      </div>
      <p style={{ margin: 0, fontSize: "39px", lineHeight: 1.2, fontWeight: 900, color: "#f8fafc" }}>
        「構造化は、次の行動につながります。」
      </p>
      <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.35, color: "#7dd3fc", fontWeight: 800 }}>
        構造化は、次の段階へつながる
      </p>
      <p style={{ margin: 0, fontSize: "20px", lineHeight: 1.45, color: "#dbeafe", fontWeight: 700 }}>
        自由記述の構造化から、ズレの検知・説明支援へ進みます。
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
  const flowSteps = ["自由記述", "AIで整理", "人が確認", "意味を確定"];
  const nodes = ["CORE", "NAVI", "SORA", "COΔEX"];

  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.62) 100%)",
        padding: "14px",
        position: "relative",
      }}
    >
      <div
        style={{
          minHeight: "340px",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "18px 32px",
        }}
      >
        <div
          style={{
            height: "58%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "8px",
            opacity: 0.68,
          }}
        >
          {flowSteps.map((step, index) => (
            <div key={step} style={{ width: "100%", display: "grid", justifyItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "76%",
                  minHeight: "34px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.28)",
                  background: "rgba(255,255,255,0.13)",
                  color: "rgba(255,255,255,0.88)",
                  textAlign: "center",
                  padding: "6px 10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {step}
              </div>
              {index < flowSteps.length - 1 ? (
                <div style={{ color: "rgba(255,255,255,0.88)", fontSize: "14px", lineHeight: 1, opacity: 0.55 }}>↓</div>
              ) : null}
            </div>
          ))}
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", width: "100%" }} />

        <div
          style={{
            height: "34%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            maxHeight: "100%",
          }}
        >
          <div style={{ width: "100%", height: "100%", position: "relative", transform: "scale(1.05)", opacity: 0.78, maxHeight: "100%", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                inset: "50% auto auto 50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.88)",
                padding: "10px 16px",
                fontSize: "11px",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              対話・確認・すり合わせ
            </div>
            {nodes.map((node, index) => (
              <div
                key={node}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform:
                    index === 0
                      ? "translate(-50%, -64px)"
                      : index === 1
                        ? "translate(98px, -50%)"
                        : index === 2
                          ? "translate(-50%, 40px)"
                          : "translate(-194px, -50%)",
                }}
              >
                <div
                  style={{
                    minWidth: "88px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.28)",
                    background: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.88)",
                    textAlign: "center",
                    padding: "8px 10px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {node}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function Slide05FigurePanel() {
  const lensItems = [
    { key: "背景", text: "状況", tone: "bg", position: { top: "10%", left: "50%", transform: "translateX(-50%)" } },
    { key: "出来事", text: "起きたこと", tone: "event", position: { top: "50%", right: "6%", transform: "translateY(-50%)" } },
    { key: "意味の変化", text: "受け止め", tone: "change", position: { top: "50%", left: "6%", transform: "translateY(-50%)" } },
    { key: "不足", text: "足りないもの", tone: "lack", position: { bottom: "10%", left: "50%", transform: "translateX(-50%)" } },
  ];

  const lensStyle = (tone: string): React.CSSProperties => ({
    width: tone === "change" ? "136px" : "120px",
    borderRadius: "14px",
    border:
      tone === "bg"
        ? "1px solid rgba(96,165,250,0.42)"
        : tone === "event"
          ? "1px solid rgba(74,222,128,0.38)"
          : tone === "change"
            ? "1px solid rgba(248,113,113,0.4)"
            : "1px solid rgba(250,204,21,0.38)",
    background:
      tone === "bg"
        ? "rgba(59,130,246,0.16)"
        : tone === "event"
          ? "rgba(34,197,94,0.14)"
          : tone === "change"
            ? "rgba(239,68,68,0.14)"
            : "rgba(234,179,8,0.14)",
    color: "#e2e8f0",
    padding: "9px 10px",
    textAlign: "center",
    boxShadow: "0 0 18px rgba(125,211,252,0.08)",
  });

  return (
    <article
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.2)",
        background: "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.62) 100%)",
        padding: "14px",
        display: "grid",
        gridTemplateRows: "1fr auto",
        gap: "10px",
      }}
    >
      <div
        style={{
          borderRadius: "12px",
          background: "radial-gradient(circle at 50% 50%, rgba(14,116,144,0.32) 0%, rgba(15,23,42,0.32) 54%, rgba(15,23,42,0.62) 100%)",
          minHeight: "340px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "126px",
            borderRadius: "16px",
            border: "1px solid rgba(103,232,249,0.58)",
            background: "rgba(14,116,144,0.34)",
            color: "#ecfeff",
            textAlign: "center",
            padding: "14px 10px",
            fontSize: "18px",
            fontWeight: 900,
            boxShadow: "0 0 24px rgba(34,211,238,0.18)",
            zIndex: 2,
          }}
        >
          自由記述
        </div>

        {lensItems.map((item) => (
          <div key={item.key} style={{ position: "absolute", zIndex: 2, ...item.position }}>
            <div style={lensStyle(item.tone)}>
              <p style={{ margin: 0, fontSize: "17px", fontWeight: 900, lineHeight: 1.15 }}>{item.key}</p>
              <p style={{ margin: "5px 0 0", fontSize: "12px", fontWeight: 700, lineHeight: 1.2, color: "rgba(226,232,240,0.78)" }}>{item.text}</p>
            </div>
          </div>
        ))}

        <svg viewBox="0 0 340 340" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden="true">
          <defs>
            <marker id="slide05Arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="rgba(125,211,252,0.62)" />
            </marker>
          </defs>
          <path d="M170 170 L170 76" stroke="rgba(125,211,252,0.44)" strokeWidth="4" markerEnd="url(#slide05Arrow)" />
          <path d="M170 170 L264 170" stroke="rgba(125,211,252,0.44)" strokeWidth="4" markerEnd="url(#slide05Arrow)" />
          <path d="M170 170 L76 170" stroke="rgba(125,211,252,0.44)" strokeWidth="4" markerEnd="url(#slide05Arrow)" />
          <path d="M170 170 L170 264" stroke="rgba(125,211,252,0.44)" strokeWidth="4" markerEnd="url(#slide05Arrow)" />
          <circle cx="170" cy="170" r="112" fill="none" stroke="rgba(125,211,252,0.16)" strokeWidth="1.5" strokeDasharray="4 8" />
        </svg>
      </div>
      <p style={{ margin: 0, textAlign: "center", fontSize: "18px", lineHeight: 1.35, color: "#dbeafe", fontWeight: 800 }}>
        自由記述は、4つの視点で読む。
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
        <div style={stageStyle("weak")}>個人の経験知</div>
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
        <p style={{ margin: 0, textAlign: "center", color: "#67e8f9", fontSize: FIGURE_TITLE_SIZE, fontWeight: 900 }}>↓</p>
        <div style={{ display: "grid", placeItems: "center", marginTop: "2px" }}>
          <button
            type="button"
            onClick={() => console.log("ra-ss-demo: placeholder")}
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(103,232,249,0.72)",
              background: "rgba(14,116,144,0.54)",
              color: "#ecfeff",
              fontSize: FIGURE_NODE_SIZE,
              fontWeight: 900,
              padding: "6px 14px",
              cursor: "pointer",
              boxShadow: "0 0 18px rgba(34,211,238,0.32)",
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
  overflowX: "hidden",
  background: "radial-gradient(130% 130% at 50% 8%, #132742 0%, #0d1b2f 42%, #08111f 100%)",
  color: "#e2e8f0",
  padding: "8px",
  fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
};

const shellStyle: React.CSSProperties = {
  maxWidth: "1600px",
  margin: "0 auto",
  borderRadius: "18px",
  border: "1px solid rgba(125,211,252,0.28)",
  background: "linear-gradient(180deg, rgba(13,27,47,0.9) 0%, rgba(8,17,31,0.92) 100%)",
  boxShadow: "0 22px 62px rgba(0,0,0,0.42), inset 0 0 0 1px rgba(148,163,184,0.12), inset 0 18px 34px rgba(56,189,248,0.05)",
  height: "100%",
  overflow: "hidden",
  padding: "12px",
  display: "grid",
  gap: "12px",
};

const headerStyle: React.CSSProperties = {
  borderRadius: "12px",
  border: "1px solid rgba(125,211,252,0.34)",
  background: "linear-gradient(180deg, rgba(19,39,66,0.86) 0%, rgba(13,27,47,0.82) 100%)",
  minHeight: "114px",
  padding: "16px 16px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "14px",
  alignItems: "center",
};

const headerTitleStyle: React.CSSProperties = {
  color: "#e7f1ff",
  fontSize: "clamp(16px, 1.18vw, 19px)",
  fontWeight: 900,
  lineHeight: 1.28,
  letterSpacing: "0.02em",
  overflowWrap: "anywhere",
};

const headerStatusStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const headerControlsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "11px",
  flexWrap: "wrap",
  justifyContent: "flex-end",
};

const audioStatusStyle: React.CSSProperties = {
  borderRadius: "999px",
  border: "1px solid rgba(148,163,184,0.34)",
  background: "rgba(8,17,31,0.28)",
  color: "#bdd3e8",
  padding: "8px 12px",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "0.04em",
  whiteSpace: "nowrap",
};

const orientationHintStyle: React.CSSProperties = {
  display: "none",
};

const chipStyle: React.CSSProperties = {
  fontSize: "13px",
  borderRadius: "999px",
  border: "1px solid rgba(148,163,184,0.5)",
  background: "rgba(19,39,66,0.7)",
  padding: "6px 12px",
  color: "#cbd5e1",
  letterSpacing: "0.06em",
  fontWeight: 700,
};

const windowZoneStyle: React.CSSProperties = {
  padding: "14px 0",
  display: "grid",
  gap: "14px",
};

const coverWindowZoneStyle: React.CSSProperties = {
  padding: "8px 0",
  gap: "8px",
};

const coverChromeStyle: React.CSSProperties = {
  border: "1px solid rgba(125,211,252,0.18)",
  background: "linear-gradient(180deg, rgba(13,27,47,0.62) 0%, rgba(8,17,31,0.58) 100%)",
  boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.05), 0 10px 24px rgba(0,0,0,0.16)",
};

const observationStyle: React.CSSProperties = {
  minHeight: "64px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  gap: "14px",
  textAlign: "left",
  borderRadius: "12px",
  border: "1px solid rgba(125,211,252,0.38)",
  background: "linear-gradient(180deg, rgba(19,39,66,0.86) 0%, rgba(13,27,47,0.82) 100%)",
  padding: "12px 18px",
  boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.08), 0 0 16px rgba(56,189,248,0.08)",
};

const observationLabelStyle: React.CSSProperties = {
  flex: "0 0 auto",
  borderRadius: "999px",
  border: "1px solid rgba(148,163,184,0.42)",
  background: "rgba(19,39,66,0.66)",
  color: "#9fb3c8",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "0.06em",
  padding: "6px 11px",
  textTransform: "uppercase",
};

const observationTextStyle: React.CSSProperties = {
  flex: "1 1 280px",
  minWidth: 0,
  color: "#e6f0ff",
  fontSize: "17px",
  fontWeight: 760,
  letterSpacing: "0.01em",
  lineHeight: 1.32,
};

const slideViewportStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  filter: "drop-shadow(0 0 12px rgba(56,189,248,0.08))",
};

const slideFrameStyle: React.CSSProperties = {
  width: "min(90vw, 100%)",
  maxWidth: "90vw",
  maxHeight: "calc(100vh - 270px)",
  aspectRatio: "16 / 9",
  borderRadius: "14px",
  border: "1px solid rgba(125,211,252,0.26)",
  background: "linear-gradient(160deg, rgba(19,39,66,0.86) 0%, rgba(13,27,47,0.78) 100%)",
  padding: "22px",
  display: "grid",
  overflow: "hidden",
  boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.1), 0 18px 36px rgba(0,0,0,0.3)",
};

const coverSlideFrameStyle: React.CSSProperties = {
  ...slideFrameStyle,
  maxHeight: "calc(100vh - 220px)",
  border: "1px solid rgba(125,211,252,0.2)",
  background: "linear-gradient(160deg, rgba(19,39,66,0.8) 0%, rgba(13,27,47,0.58) 100%)",
  padding: 0,
  boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.04), 0 18px 36px rgba(0,0,0,0.28)",
};

const footerStyle: React.CSSProperties = {
  borderRadius: "12px",
  border: "1px solid rgba(125,211,252,0.32)",
  background: "linear-gradient(180deg, rgba(19,39,66,0.86) 0%, rgba(13,27,47,0.84) 100%)",
  minHeight: "138px",
  overflow: "hidden",
  padding: "14px 14px",
  display: "flex",
  flexWrap: "wrap",
  gap: "14px",
  alignItems: "stretch",
};

const footerSectionStyle: React.CSSProperties = {
  borderRadius: "10px",
  border: "1px solid rgba(125,211,252,0.24)",
  background: "rgba(19,39,66,0.58)",
  padding: "12px",
};

const footerIndexSectionStyle: React.CSSProperties = {
  ...footerSectionStyle,
  flex: "1 1 640px",
  minWidth: 0,
};

const indexButtonRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  overflowX: "visible",
  paddingBottom: 0,
};

const footerViewSectionStyle: React.CSSProperties = {
  ...footerSectionStyle,
  flex: "0 1 350px",
  width: "100%",
  maxWidth: "350px",
  marginLeft: "auto",
};

const integratedViewStyle: React.CSSProperties = {
  display: "grid",
  gap: "8px",
  minWidth: "250px",
};

const integratedViewPillStyle: React.CSSProperties = {
  borderRadius: "999px",
  border: "1px solid rgba(103,232,249,0.76)",
  background: "linear-gradient(180deg, rgba(34,211,238,0.22) 0%, rgba(8,145,178,0.28) 100%)",
  color: "#f0fdff",
  padding: "11px 14px",
  fontSize: "15px",
  fontWeight: 850,
  textAlign: "center",
};

const integratedViewHintStyle: React.CSSProperties = {
  borderRadius: "10px",
  border: "1px solid rgba(148,163,184,0.26)",
  background: "rgba(8,17,31,0.34)",
  color: "#b8c9db",
  padding: "8px 10px",
  fontSize: "12px",
  lineHeight: 1.25,
  fontWeight: 700,
  textAlign: "center",
};

const controlButtonStyle: React.CSSProperties = {
  borderRadius: "999px",
  border: "1px solid rgba(125,211,252,0.62)",
  background: "linear-gradient(180deg, rgba(34,76,118,0.96) 0%, rgba(19,49,82,0.94) 100%)",
  color: "#f2f9ff",
  padding: "10px 17px",
  fontWeight: 850,
  fontSize: "15px",
  cursor: "pointer",
  boxShadow: "0 0 0 1px rgba(148,163,184,0.08), 0 8px 18px rgba(8,17,31,0.18)",
};

const modeButtonStyle = (active: boolean): React.CSSProperties => ({
  borderRadius: "999px",
  border: active ? "1px solid rgba(103,232,249,0.85)" : "1px solid rgba(148,163,184,0.4)",
  background: active ? "linear-gradient(180deg, rgba(34,211,238,0.22) 0%, rgba(8,145,178,0.28) 100%)" : "rgba(19,39,66,0.62)",
  color: active ? "#f0fdff" : "#d8e4f2",
  textAlign: "left",
  padding: "11px 13px",
  fontSize: "15px",
  fontWeight: 800,
  cursor: "pointer",
});

const voiceButtonStyle: React.CSSProperties = {
  borderRadius: "999px",
  border: "1px solid rgba(125,211,252,0.52)",
  background: "linear-gradient(180deg, rgba(29,62,98,0.82) 0%, rgba(19,39,66,0.78) 100%)",
  color: "#e9f4ff",
  textAlign: "left",
  padding: "9px 14px",
  fontSize: "14px",
  fontWeight: 780,
  cursor: "pointer",
  boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.06)",
};

const disabledButtonStyle: React.CSSProperties = {
  opacity: 0.46,
  cursor: "not-allowed",
  filter: "saturate(0.72)",
};
