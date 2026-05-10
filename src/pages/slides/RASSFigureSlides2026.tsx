import { useEffect, useMemo, useRef, useState } from "react";

type ViewMode = "both" | "figure" | "manga";

type RassSlide = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  figureSrc: string;
  mangaSrc?: string;
  audioSrc?: string;
  points: string[];
};

const slides: RassSlide[] = [
  {
    id: "00",
    label: "表紙",
    title: "届いているのに、活かされない声がある。",
    subtitle: "研究テーマの入口",
    figureSrc: "/assets/slides/figures-2026/00-cover-figure-topic.png",
    mangaSrc: "/assets/slides/manga-2026/00-cover-manga-topic.png",
    audioSrc: "/audio/rass-2026/00-cover.mp3",
    points: [
      "入口を確認する｜この発表が扱う問いを最初に押さえる",
      "QRから見る｜同じWEBスライドをスマートフォンでも確認できる",
      "声を構造として読む｜自由記述を、現場で使える知見へ変える",
    ],
  },
  {
    id: "01",
    label: "問題意識",
    title: "自由記述は、活かされにくい",
    subtitle: "なぜ必要か",
    figureSrc: "/assets/slides/figures-2026/01-problem-figure.png",
    mangaSrc: "/assets/slides/manga-2026/01-problem-manga.png",
    audioSrc: "/audio/rass-2026/01-problem.mp3",
    points: [
      "声は届いている｜感謝・不安・戸惑い・苦情は病院に集まっている",
      "個人の読み取りで止まる｜一つひとつは読まれても、共有されにくい",
      "組織知になりにくい｜改善や説明の見直しへ接続しにくい",
    ],
  },
  {
    id: "02",
    label: "研究の問い",
    title: "自由記述を、構造化できるか",
    subtitle: "何を問うか",
    figureSrc: "/assets/slides/figures-2026/02-question-figure.png",
    mangaSrc: "/assets/slides/manga-2026/02-question-manga.png",
    audioSrc: "/audio/rass-2026/02-purpose.mp3",
    points: [
      "感想で終わらせない｜自由記述を、構造として読み直す",
      "扱えるデータへ変える｜声を比較・共有できる形にできるかを問う",
      "フィルターへ進む｜読み解くための視点を次に設定する",
    ],
  },
  {
    id: "03",
    label: "対象",
    title: "302件の投書・自由記述",
    subtitle: "何を対象にしたか",
    figureSrc: "/assets/slides/figures-2026/03-target-figure.png",
    mangaSrc: "/assets/slides/manga-2026/03-target-manga.png",
    audioSrc: "/audio/rass-2026/03-structure.mp3",
    points: [
      "302件の声を見る｜患者・家族から届いた自由記述を対象にする",
      "単純分類では足りない｜感謝・苦情だけでは意味を整理しきれない",
      "複数の意味が重なる｜一つの声の中に背景・不安・不足が含まれる",
    ],
  },
  {
    id: "04",
    label: "方法",
    title: "AIと人間の対話による読み解き",
    subtitle: "どう読み解いたか",
    figureSrc: "/assets/slides/figures-2026/04-method-figure.png",
    mangaSrc: "/assets/slides/manga-2026/04-method-manga.png",
    audioSrc: "/audio/rass-2026/04-rass.mp3",
    points: [
      "AIで一次整理する｜大量の記述を読み解く入口をつくる",
      "人が確認・修正する｜現場感覚と文脈で読みを補正する",
      "フィルターが必要になる｜安定して読むための視点を整理する",
    ],
  },
  {
    id: "05",
    label: "フィルター",
    title: "自由記述を読む4つの視点",
    subtitle: "どの視点で読むか",
    figureSrc: "/assets/slides/figures-2026/05-filter-figure.png",
    mangaSrc: "/assets/slides/manga-2026/05-filter-manga.png",
    audioSrc: "/audio/rass-2026/05-data.mp3",
    points: [
      "背景を見る｜その声が生まれた状況を捉える",
      "出来事を見る｜何が起きたのかを確認する",
      "意味の変化を見る｜不安・不信・納得の変化を読む",
      "不足を見る｜説明・確認・連携の抜けを見つける",
    ],
  },
  {
    id: "06",
    label: "結果",
    title: "単純分類では見えない構造が現れる",
    subtitle: "何が見えたか",
    figureSrc: "/assets/slides/figures-2026/06-result-figure.png",
    mangaSrc: "/assets/slides/manga-2026/06-result-manga.png",
    audioSrc: "/audio/rass-2026/06-case.mp3",
    points: [
      "不満だけではない｜自由記述には複数の関係状態が表れる",
      "感謝にも構造がある｜よい経験にも背景・出来事・意味がある",
      "苦情にも変化がある｜説明不足や不信の立ち上がりを読み取れる",
    ],
  },
  {
    id: "07",
    label: "意義",
    title: "経験知を、共有できる知見へ",
    subtitle: "何が可能になるか",
    figureSrc: "/assets/slides/figures-2026/07-significance-figure.png",
    mangaSrc: "/assets/slides/manga-2026/07-significance-manga.png",
    audioSrc: "/audio/rass-2026/07-sensor.mp3",
    points: [
      "属人化を下げる｜読む人だけに依存しない見方をつくる",
      "チームで共有する｜声の意味を共通の言葉で確認できる",
      "現場で活かす｜改善・教育・連携・組織理解につなげる",
    ],
  },
  {
    id: "08",
    label: "今後",
    title: "投書の読み解きから、日常の違和感の読み解きへ",
    subtitle: "現場応用への接続",
    figureSrc: "/assets/slides/figures-2026/08-daily-sense-figure.png",
    mangaSrc: "/assets/slides/manga-2026/08-daily-sense-manga.png",
    audioSrc: "/audio/rass-2026/08-next.mp3",
    points: [
      "投書から日常へ｜読む視点を、現場の違和感にも応用する",
      "ズレを早く捉える｜不安・不足・説明の届きにくさを見る",
      "試しながら磨く｜RA-SS DEMOで、現場応用の入口を開く",
    ],
  },
];

const validModes: ViewMode[] = ["both", "figure", "manga"];

const getInitialMode = (): ViewMode => {
  if (typeof window === "undefined") {
    return "both";
  }

  const mode = new URLSearchParams(window.location.search).get("mode") as ViewMode | null;
  return mode && validModes.includes(mode) ? mode : "both";
};

const getInitialIndex = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  const slideId = new URLSearchParams(window.location.search).get("slide");
  const index = slides.findIndex((slide) => slide.id === slideId);
  return index >= 0 ? index : 0;
};

const pageStyles = `
  .rass-figure-page {
    min-height: 100dvh;
    background:
      radial-gradient(circle at 12% 10%, rgba(20, 184, 166, 0.12), transparent 30%),
      linear-gradient(135deg, #f8fbfd 0%, #eef5f8 100%);
    color: #0f2742;
  }

  .rass-figure-shell {
    box-sizing: border-box;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: 12px;
    width: min(100%, 1600px);
    min-height: 100dvh;
    margin: 0 auto;
    padding: 12px 14px;
  }

  .rass-figure-header,
  .rass-figure-footer,
  .rass-figure-viewer,
  .rass-slide-card,
  .rass-points-panel,
  .rass-mobile-index {
    border: 1px solid rgba(15, 39, 66, 0.11);
    background: rgba(255, 255, 255, 0.88);
    box-shadow: 0 18px 52px rgba(15, 39, 66, 0.08);
    backdrop-filter: blur(18px);
  }

  .rass-figure-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    padding: 10px 14px;
  }

  .rass-figure-kicker {
    margin: 0 0 6px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.18em;
    color: #168b8c;
  }

  .rass-figure-title {
    margin: 0;
    font-size: clamp(18px, 2.2vw, 28px);
    line-height: 1.25;
    letter-spacing: -0.02em;
  }

  .rass-figure-subtitle {
    margin: 4px 0 0;
    font-size: clamp(12px, 1.25vw, 15px);
    line-height: 1.5;
    color: rgba(15, 39, 66, 0.68);
  }

  .rass-figure-controls,
  .rass-bottom-nav {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rass-figure-button,
  .rass-link-button,
  .rass-mode-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    border: 1px solid rgba(15, 39, 66, 0.16);
    background: #ffffff;
    color: #0f2742;
    padding: 0 14px;
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
  }

  .rass-figure-button:hover:not(:disabled),
  .rass-link-button:hover,
  .rass-mode-button:hover,
  .rass-mode-button.is-active {
    border-color: rgba(20, 184, 166, 0.62);
    box-shadow: 0 10px 24px rgba(20, 184, 166, 0.12);
    transform: translateY(-1px);
  }

  .rass-mode-button.is-active {
    background: #0f2742;
    color: #ffffff;
  }

  .rass-figure-button:disabled {
    cursor: not-allowed;
    opacity: 0.42;
  }

  .rass-audio-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 44px;
    border-color: rgba(15, 39, 66, 0.34);
    background: linear-gradient(180deg, #ffffff 0%, #f3f8fb 100%);
    box-shadow: inset 0 0 0 1px rgba(15, 39, 66, 0.04);
    white-space: nowrap;
  }

  .rass-audio-button:hover:not(:disabled) {
    border-color: rgba(15, 39, 66, 0.58);
    background: #ffffff;
    box-shadow: 0 12px 28px rgba(15, 39, 66, 0.12);
  }

  .rass-audio-button:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 6px 16px rgba(15, 39, 66, 0.1);
  }

  .rass-audio-button.is-playing {
    border-color: rgba(15, 39, 66, 0.78);
    background: #0f2742;
    color: #ffffff;
  }

  .rass-audio-label-short {
    display: none;
  }

  .rass-audio-panel {
    display: grid;
    justify-items: start;
    gap: 3px;
  }

  .rass-audio-note {
    margin: 0;
    font-size: 11px;
    line-height: 1.45;
    color: rgba(15, 39, 66, 0.66);
  }

  .rass-audio-status {
    margin: 0;
    font-size: 11px;
    line-height: 1.45;
    color: #a16207;
    font-weight: 700;
  }

  .rass-figure-viewer {
    display: block;
    min-height: 0;
    overflow: hidden;
  }

  .rass-slide-tabs {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    border-bottom: 1px solid rgba(15, 39, 66, 0.09);
    padding: 9px 12px;
    scrollbar-width: thin;
  }

  .rass-slide-tab {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 8px;
    min-height: 38px;
    border: 1px solid rgba(15, 39, 66, 0.1);
    border-radius: 999px;
    background: rgba(248, 251, 253, 0.94);
    color: #0f2742;
    padding: 0 10px 0 7px;
    font: inherit;
    cursor: pointer;
    transition: background 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
  }

  .rass-slide-tab:hover,
  .rass-slide-tab.is-active {
    border-color: rgba(20, 184, 166, 0.5);
    background: #ffffff;
    box-shadow: 0 10px 22px rgba(15, 39, 66, 0.08);
    transform: translateY(-1px);
  }

  .rass-slide-tab.is-active {
    background: #0f2742;
    color: #ffffff;
  }

  .rass-slide-tab-id {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: rgba(15, 39, 66, 0.1);
    font-size: 10px;
    font-weight: 900;
  }

  .rass-slide-tab.is-active .rass-slide-tab-id {
    background: rgba(255, 255, 255, 0.16);
  }

  .rass-slide-tab-label {
    font-size: 11px;
    font-weight: 900;
    white-space: nowrap;
  }

  .rass-figure-index {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
    border-right: 1px solid rgba(15, 39, 66, 0.09);
    padding: 14px;
  }

  .rass-figure-index-button {
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 10px;
    width: 100%;
    border: 1px solid rgba(15, 39, 66, 0.09);
    background: rgba(248, 251, 253, 0.92);
    padding: 10px;
    text-align: left;
    color: inherit;
    cursor: pointer;
    transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
  }

  .rass-figure-index-button:hover,
  .rass-figure-index-button.is-active {
    border-color: rgba(20, 184, 166, 0.44);
    background: #ffffff;
    transform: translateX(2px);
  }

  .rass-figure-index-button.is-active {
    box-shadow: inset 4px 0 0 #14a3a4;
  }

  .rass-figure-index-id {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    background: #0f2742;
    color: #ffffff;
    font-size: 12px;
    font-weight: 900;
  }

  .rass-figure-index-title {
    display: block;
    font-size: 13px;
    font-weight: 900;
    line-height: 1.35;
  }

  .rass-figure-index-role {
    display: block;
    margin-top: 3px;
    font-size: 11px;
    line-height: 1.45;
    color: rgba(15, 39, 66, 0.58);
  }

  .rass-figure-stage {
    display: grid;
    grid-template-rows: auto auto minmax(0, 1fr) auto auto;
    gap: 10px;
    min-width: 0;
    min-height: 0;
    padding: 12px;
  }

  .rass-figure-meta {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
  }

  .rass-figure-meta-title {
    margin: 0;
    font-size: clamp(17px, 1.9vw, 23px);
    line-height: 1.3;
  }

  .rass-figure-meta-note {
    margin: 2px 0 0;
    font-size: 11px;
    color: rgba(15, 39, 66, 0.58);
  }

  .rass-figure-count {
    min-width: max-content;
    border-left: 4px solid #d99b3d;
    padding-left: 10px;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.12em;
    color: rgba(15, 39, 66, 0.62);
  }

  .rass-mode-group {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .rass-mode-button {
    min-height: 36px;
    font-size: 12px;
    border-radius: 999px;
  }

  .rass-slide-layout {
    display: grid;
    gap: 12px;
    align-items: start;
    min-width: 0;
  }

  .rass-slide-layout.mode-both {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .rass-slide-layout.mode-figure,
  .rass-slide-layout.mode-manga {
    grid-template-columns: minmax(0, 1fr);
  }

  .rass-slide-card {
    min-width: 0;
    overflow: hidden;
  }

  .rass-slide-card-header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    border-bottom: 1px solid rgba(15, 39, 66, 0.09);
    padding: 8px 10px;
  }

  .rass-slide-card-title {
    margin: 0;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.12em;
    color: #168b8c;
  }

  .rass-slide-card-kind {
    font-size: 10px;
    font-weight: 900;
    color: rgba(15, 39, 66, 0.46);
  }

  .rass-figure-image-wrap {
    position: relative;
    display: flex;
    min-width: 0;
    width: 100%;
    aspect-ratio: 1.414 / 1;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background:
      linear-gradient(90deg, rgba(15, 39, 66, 0.035) 1px, transparent 1px),
      linear-gradient(0deg, rgba(15, 39, 66, 0.035) 1px, transparent 1px),
      #ffffff;
    background-size: 28px 28px;
    padding: 8px;
  }

  .rass-figure-image {
    display: block;
    width: 100%;
    height: 100%;
    max-height: none;
    object-fit: contain;
    border-radius: 12px;
    filter: drop-shadow(0 20px 36px rgba(15, 39, 66, 0.14));
  }

  .rass-demo-hotspot {
    position: absolute;
    z-index: 2;
    left: 66%;
    top: 73.6%;
    width: 30.5%;
    height: 7.2%;
    min-height: 36px;
    border-radius: 999px;
    background: rgba(255, 122, 0, 0);
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition: background 160ms ease, outline-color 160ms ease, box-shadow 160ms ease;
  }

  .rass-demo-hotspot:hover,
  .rass-demo-hotspot:focus-visible {
    background: rgba(255, 122, 0, 0.12);
    outline-color: rgba(255, 122, 0, 0.86);
    box-shadow: 0 0 0 4px rgba(255, 122, 0, 0.12);
  }

  .rass-image-placeholder {
    display: grid;
    place-items: center;
    width: 100%;
    min-height: 320px;
    border: 1px dashed rgba(15, 39, 66, 0.22);
    border-radius: 12px;
    background: rgba(248, 251, 253, 0.82);
    color: rgba(15, 39, 66, 0.56);
    font-weight: 900;
  }

  .rass-points-panel {
    padding: 10px 12px;
  }

  .rass-points-title {
    margin: 0 0 6px;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.14em;
    color: #168b8c;
  }

  .rass-points-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .rass-points-list.is-four-points {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .rass-point-item {
    display: grid;
    gap: 3px;
    border: 1px solid rgba(15, 39, 66, 0.1);
    background: rgba(248, 251, 253, 0.92);
    padding: 8px;
    font-size: 12px;
    font-weight: 800;
    line-height: 1.4;
  }

  .rass-point-heading {
    color: #0f2742;
    font-size: 12px;
    font-weight: 900;
    line-height: 1.35;
  }

  .rass-point-body {
    color: rgba(15, 39, 66, 0.68);
    font-size: 11px;
    font-weight: 700;
    line-height: 1.45;
  }

  .rass-stage-actions {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
  }

  .rass-bottom-nav {
    min-width: 210px;
  }

  .rass-bottom-nav .rass-figure-button {
    flex: 1;
  }

  .rass-link-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .rass-link-button.primary {
    background: #0f2742;
    color: #ffffff;
  }

  .rass-link-button.primary.is-future {
    border-color: rgba(217, 155, 61, 0.72);
    background: linear-gradient(135deg, #0f2742 0%, #153b61 100%);
    box-shadow: 0 12px 28px rgba(217, 155, 61, 0.18);
  }

  .rass-mobile-index {
    display: none;
  }

  .rass-mobile-index summary {
    min-height: 44px;
    cursor: pointer;
    padding: 12px 14px;
    font-size: 13px;
    font-weight: 900;
  }

  .rass-mobile-index-list {
    display: grid;
    gap: 8px;
    padding: 0 12px 12px;
  }

  .rass-figure-footer {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    padding: 8px 12px;
    font-size: 11px;
    color: rgba(15, 39, 66, 0.62);
  }

  .rass-figure-footer strong {
    color: #0f2742;
  }

  @media (max-width: 1100px) {
    .rass-figure-shell {
      padding: 10px;
    }

    .rass-figure-header {
      grid-template-columns: minmax(0, 1fr);
    }

    .rass-figure-controls {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      align-items: start;
    }

    .rass-figure-stage {
      min-height: 52vh;
      padding: 12px;
    }

    .rass-slide-layout,
    .rass-slide-layout.mode-both,
    .rass-slide-layout.mode-figure,
    .rass-slide-layout.mode-manga {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .rass-points-list {
      grid-template-columns: minmax(0, 1fr);
    }

    .rass-points-list.is-four-points {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .rass-stage-actions {
      align-items: stretch;
      flex-direction: column;
    }

    .rass-bottom-nav {
      position: sticky;
      z-index: 3;
      bottom: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-width: 0;
      gap: 10px;
      padding: 10px;
      border: 1px solid rgba(15, 39, 66, 0.1);
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(14px);
    }

    .rass-figure-button,
    .rass-link-button {
      min-height: 48px;
      font-size: 16px;
      text-align: center;
    }

    .rass-mode-button {
      min-height: 40px;
      font-size: 13px;
    }

    .rass-link-group {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
    }

    .rass-figure-footer {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  @media (max-width: 900px) {
    .rass-points-list.is-four-points {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 700px) {
    .rass-figure-controls {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .rass-audio-panel {
      grid-column: 1 / -1;
      width: 100%;
      justify-items: stretch;
    }

    .rass-audio-button {
      width: 100%;
      min-height: 48px;
    }

    .rass-points-list.is-four-points {
      grid-template-columns: minmax(0, 1fr);
    }

    .rass-audio-label-long {
      display: none;
    }

    .rass-audio-label-short {
      display: inline;
    }

    .rass-slide-tabs {
      display: none;
    }

    .rass-mobile-index {
      display: block;
    }
  }
`;

function SlideImage({ src, alt }: { src?: string; alt: string }) {
  const [isMissing, setIsMissing] = useState(false);

  if (!src || isMissing) {
    return <div className="rass-image-placeholder">準備中です</div>;
  }

  return (
    <img
      className="rass-figure-image"
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setIsMissing(true)}
    />
  );
}

export default function RASSFigureSlides2026() {
  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const [viewMode, setViewMode] = useState<ViewMode>(getInitialMode);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasAudioError, setHasAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeSlide = slides[activeIndex];
  const slideCountLabel = useMemo(() => `${activeIndex + 1} / ${slides.length}`, [activeIndex]);
  const isFutureSlide = activeSlide.id === "08";

  const showManga = viewMode === "both" || viewMode === "manga";
  const showFigure = viewMode === "both" || viewMode === "figure";

  const stopAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsAudioPlaying(false);
  };

  const handleAudioToggle = async () => {
    if (!audioRef.current || !activeSlide.audioSrc) return;

    if (isAudioPlaying) {
      stopAudio();
      return;
    }

    try {
      setHasAudioError(false);
      audioRef.current.src = activeSlide.audioSrc;
      await audioRef.current.play();
      setIsAudioPlaying(true);
    } catch (error) {
      console.error("Audio playback failed:", activeSlide.audioSrc, error);
      setIsAudioPlaying(false);
      setHasAudioError(true);
    }
  };

  const moveToSlide = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, nextIndex));
    if (clamped === activeIndex) return;
    stopAudio();
    setHasAudioError(false);
    setActiveIndex(clamped);
  };

  const goPrevious = () => moveToSlide(activeIndex - 1);
  const goNext = () => moveToSlide(activeIndex + 1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const stopAudioForKeyboardNav = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsAudioPlaying(false);
        setHasAudioError(false);
      };

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          const next = Math.max(0, current - 1);
          if (next !== current) stopAudioForKeyboardNav();
          return next;
        });
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          const next = Math.min(slides.length - 1, current + 1);
          if (next !== current) stopAudioForKeyboardNav();
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("slide", activeSlide.id);
    params.set("mode", viewMode);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [activeSlide.id, viewMode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsAudioPlaying(false);
      setHasAudioError(false);
      setActiveIndex((current) => (current < slides.length - 1 ? current + 1 : current));
    };
    const handlePause = () => setIsAudioPlaying(false);
    const handleError = () => {
      setIsAudioPlaying(false);
      setHasAudioError(true);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <main className="rass-figure-page">
      <style>{pageStyles}</style>
      <div className="rass-figure-shell">
        <audio ref={audioRef} preload="none" />
        <header className="rass-figure-header">
          <div>
            <p className="rass-figure-kicker">RA-SS SLIDES 2026</p>
            <h1 className="rass-figure-title">RA-SS 学会発表｜漫画＋Figure版</h1>
            <p className="rass-figure-subtitle">漫画版で直感的に、Figure版で構造的に確認できます。</p>
          </div>
          <nav className="rass-figure-controls" aria-label="スライド操作">
            <div className="rass-audio-panel">
              <button
                type="button"
                className={`rass-figure-button rass-audio-button${isAudioPlaying ? " is-playing" : ""}`}
                disabled={!activeSlide.audioSrc}
                onClick={handleAudioToggle}
                aria-label={isAudioPlaying ? "音声を停止" : "このスライドの音声解説を聞く"}
                title={isAudioPlaying ? "音声を停止" : "このスライドの音声解説を聞く"}
              >
                {isAudioPlaying ? (
                  <span>■ 音声を停止</span>
                ) : (
                  <>
                    <span className="rass-audio-label-long">▶ このスライドの音声解説を聞く</span>
                    <span className="rass-audio-label-short">▶ 音声解説を聞く</span>
                  </>
                )}
              </button>
              <p className="rass-audio-note">音声ガイド：AI生成音声（説明補助用）</p>
              {hasAudioError ? <p className="rass-audio-status">音声準備中</p> : null}
            </div>
            <button type="button" className="rass-figure-button" onClick={goPrevious} disabled={activeIndex === 0}>
              前へ
            </button>
            <button type="button" className="rass-figure-button" onClick={goNext} disabled={activeIndex === slides.length - 1}>
              次へ
            </button>
          </nav>
        </header>

        <section className="rass-figure-viewer" aria-label="漫画＋Figure版スライド">
          <nav className="rass-slide-tabs" aria-label="スライド一覧">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`rass-slide-tab${index === activeIndex ? " is-active" : ""}`}
                onClick={() => moveToSlide(index)}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <span className="rass-slide-tab-id">{slide.id}</span>
                <span className="rass-slide-tab-label">{slide.label}</span>
              </button>
            ))}
          </nav>

          <article className="rass-figure-stage">
            <div className="rass-figure-meta">
              <div>
                <h2 className="rass-figure-meta-title">
                  {activeSlide.id}｜{activeSlide.label}｜{activeSlide.title}
                </h2>
                <p className="rass-figure-meta-note">{activeSlide.subtitle}</p>
              </div>
              <div className="rass-figure-count">{slideCountLabel}</div>
            </div>

            <div className="rass-mode-group" aria-label="表示モード">
              <button
                type="button"
                className={`rass-mode-button${viewMode === "both" ? " is-active" : ""}`}
                onClick={() => setViewMode("both")}
              >
                左右で見る（おすすめ）
              </button>
              <button
                type="button"
                className={`rass-mode-button${viewMode === "manga" ? " is-active" : ""}`}
                onClick={() => setViewMode("manga")}
              >
                漫画で見る
              </button>
              <button
                type="button"
                className={`rass-mode-button${viewMode === "figure" ? " is-active" : ""}`}
                onClick={() => setViewMode("figure")}
              >
                Figureで見る
              </button>
            </div>

            <details className="rass-mobile-index">
              <summary>☰ INDEX</summary>
              <div className="rass-mobile-index-list">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={`rass-figure-index-button${index === activeIndex ? " is-active" : ""}`}
                    onClick={() => moveToSlide(index)}
                  >
                    <span className="rass-figure-index-id">{slide.id}</span>
                    <span>
                      <span className="rass-figure-index-title">{slide.label}</span>
                      <span className="rass-figure-index-role">{slide.subtitle}</span>
                    </span>
                  </button>
                ))}
              </div>
            </details>

            <div className={`rass-slide-layout mode-${viewMode}`}>
              {showManga && (
                <section className="rass-slide-card" aria-label="漫画版スライド">
                  <div className="rass-slide-card-header">
                    <h3 className="rass-slide-card-title">MANGA SLIDE</h3>
                    <span className="rass-slide-card-kind">漫画版</span>
                  </div>
                  <div className="rass-figure-image-wrap">
                    <SlideImage
                      key={activeSlide.mangaSrc}
                      src={activeSlide.mangaSrc}
                      alt={`${activeSlide.id} ${activeSlide.label} 漫画版`}
                    />
                  </div>
                </section>
              )}

              {showFigure && (
                <section className="rass-slide-card" aria-label="Figure版スライド">
                  <div className="rass-slide-card-header">
                    <h3 className="rass-slide-card-title">FIGURE SLIDE</h3>
                    <span className="rass-slide-card-kind">Figure版</span>
                  </div>
                  <div className="rass-figure-image-wrap">
                    <SlideImage
                      key={activeSlide.figureSrc}
                      src={activeSlide.figureSrc}
                      alt={`${activeSlide.id} ${activeSlide.label} Figure版`}
                    />
                    {activeSlide.id === "08" ? (
                      <a
                        className="rass-demo-hotspot"
                        href="/demo-intro"
                        aria-label="RA-SS DEMOを試す"
                        title="RA-SS DEMOを試す"
                      />
                    ) : null}
                  </div>
                </section>
              )}
            </div>

            <section className="rass-points-panel" aria-label="見てほしいPOINT">
              <h3 className="rass-points-title">見てほしいPOINT</h3>
              <ul className={`rass-points-list${activeSlide.points.length === 4 ? " is-four-points" : ""}`}>
                {activeSlide.points.map((point) => {
                  const [heading, body] = point.split("｜");
                  return (
                    <li key={point} className="rass-point-item">
                      <span className="rass-point-heading">{heading}</span>
                      {body ? <span className="rass-point-body">{body}</span> : null}
                    </li>
                  );
                })}
              </ul>
            </section>

            <div className="rass-stage-actions">
              <div className="rass-link-group" aria-label="関連リンク">
                <a
                  className={`rass-link-button primary${isFutureSlide ? " is-future" : ""}`}
                  href="https://core-lp.vercel.app/demo-intro"
                >
                  RA-SS DEMOを試す
                </a>
                <a className="rass-link-button" href="/">
                  CORE-LPへ戻る
                </a>
              </div>
            </div>
          </article>
        </section>

        <footer className="rass-figure-footer">
          <span>
            <strong>PCでは比較しやすく、スマホでは読みやすく。</strong>
          </span>
          <span>画像配置先：/assets/slides/figures-2026/ ・ /assets/slides/manga-2026/</span>
        </footer>
      </div>
    </main>
  );
}
