type PrintSlide = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  figureSrc: string;
  mangaSrc?: string;
  points: string[];
};

const printSlides: PrintSlide[] = [
  {
    id: "00",
    label: "表紙",
    title: "届いているのに、活かされない声がある。",
    subtitle: "研究テーマの入口",
    figureSrc: "/assets/slides/figures-2026/00-cover-figure-topic.png",
    mangaSrc: "/assets/slides/manga-2026/00-cover-manga-topic.png",
    points: ["研究テーマの入口", "自由記述を構造として読む", "WEB版への導線は最終ページに掲載"],
  },
  {
    id: "01",
    label: "問題意識",
    title: "自由記述は、活かされにくい",
    subtitle: "なぜ必要か",
    figureSrc: "/assets/slides/figures-2026/01-problem-figure.png",
    mangaSrc: "/assets/slides/manga-2026/01-problem-manga.png",
    points: ["声は届いている", "個人の読み取りで止まりやすい", "組織知につながりにくい"],
  },
  {
    id: "02",
    label: "研究の問い",
    title: "自由記述を、構造化できるか",
    subtitle: "何を問うか",
    figureSrc: "/assets/slides/figures-2026/02-question-figure.png",
    mangaSrc: "/assets/slides/manga-2026/02-question-manga.png",
    points: ["感想で終わらせない", "比較・共有できる形を目指す", "次にフィルター視点へ進む"],
  },
  {
    id: "03",
    label: "対象",
    title: "302件の投書・自由記述",
    subtitle: "何を対象にしたか",
    figureSrc: "/assets/slides/figures-2026/03-target-figure.png",
    mangaSrc: "/assets/slides/manga-2026/03-target-manga.png",
    points: ["302件の自由記述", "単純分類では足りない", "複数の意味が重なる"],
  },
  {
    id: "04",
    label: "方法",
    title: "AIと人間の対話による読み解き",
    subtitle: "どう読み解いたか",
    figureSrc: "/assets/slides/figures-2026/04-method-figure.png",
    mangaSrc: "/assets/slides/manga-2026/04-method-manga.png",
    points: ["AIが整理を補助", "4つの視点で解析", "最終判断は人が確認"],
  },
  {
    id: "05",
    label: "フィルター",
    title: "自由記述を読む4つの視点",
    subtitle: "どの視点で読むか",
    figureSrc: "/assets/slides/figures-2026/05-filter-figure.png",
    mangaSrc: "/assets/slides/manga-2026/05-filter-manga.png",
    points: ["背景を見る", "出来事を見る", "意味の変化を見る", "不足を見る"],
  },
  {
    id: "06",
    label: "結果",
    title: "単純分類では見えない構造が現れる",
    subtitle: "何が見えたか",
    figureSrc: "/assets/slides/figures-2026/06-result-figure.png",
    mangaSrc: "/assets/slides/manga-2026/06-result-manga.png",
    points: ["不満だけではない", "感謝にも構造がある", "苦情にも変化がある"],
  },
  {
    id: "07",
    label: "意義",
    title: "経験知を、共有できる知見へ",
    subtitle: "何が可能になるか",
    figureSrc: "/assets/slides/figures-2026/07-significance-figure.png",
    mangaSrc: "/assets/slides/manga-2026/07-significance-manga.png",
    points: ["属人化を下げる", "チームで共有する", "現場で活かす"],
  },
  {
    id: "08",
    label: "今後",
    title: "投書の読み解きから、日常の違和感の読み解きへ",
    subtitle: "現場応用への接続",
    figureSrc: "/assets/slides/figures-2026/08-daily-sense-figure.png",
    mangaSrc: "/assets/slides/manga-2026/08-daily-sense-manga.png",
    points: ["投書から日常へ", "ズレを早く捉える", "RA-SS DEMOで応用を試す"],
  },
];

const pageStyles = `
  :root {
    --a4w: 297mm;
    --a4h: 210mm;
    --ink: #0f2742;
    --muted: #4f6277;
    --line: rgba(15, 39, 66, 0.16);
    --bg: #eef2f7;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  .rass-print-root {
    background: var(--bg);
    color: var(--ink);
    min-height: 100dvh;
    margin: 0;
    padding: 12px 8px 28px;
    overflow-x: hidden;
  }

  .rass-print-help {
    width: min(1200px, calc(100vw - 24px));
    margin: 0 auto 12px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: #fff;
    padding: 10px 12px;
    font-size: 12px;
    line-height: 1.5;
  }

  .rass-print-pages {
    display: grid;
    gap: 12px;
    justify-items: center;
  }

  .print-page,
  .print-final {
    width: min(calc(100vw - 16px), 1400px);
    aspect-ratio: 297 / 210;
    background: #fff;
    box-sizing: border-box;
    border: 1px solid var(--line);
    box-shadow: 0 8px 30px rgba(15, 39, 66, 0.12);
    page-break-after: always;
    break-after: page;
    break-inside: avoid;
    overflow: hidden;
    position: relative;
  }

  .print-slide-inner,
  .print-final-inner {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .print-slide-inner {
    display: grid;
    grid-template-rows: auto 1fr auto;
    padding: 3.2% 3.2%;
  }

  .print-page.is-cover .print-slide-inner {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 2%;
    padding: 2.8mm;
    background: #fff;
  }

  .cover-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
  }

  .cover-header h1 {
    margin: 0;
    font-size: clamp(16px, 1.7vw, 28px);
    line-height: 1.2;
  }

  .cover-header p {
    margin: 0;
    color: var(--muted);
    font-size: clamp(11px, 1vw, 15px);
    white-space: nowrap;
  }

  .cover-grid {
    min-height: 0;
    display: grid;
    grid-template-columns: 68% 32%;
    gap: 2%;
  }

  .cover-card {
    border: 1px solid var(--line);
    border-radius: 2.5mm;
    overflow: hidden;
    background: #fff;
    min-width: 0;
    min-height: 0;
  }

  .cover-full-image,
  .cover-manga-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
  }

  .print-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 6mm;
    margin-bottom: 2mm;
  }

  .print-title-wrap h1 {
    margin: 0;
    font-size: 6.2mm;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .print-title-wrap p {
    margin: 1mm 0 0;
    color: var(--muted);
    font-size: 3.5mm;
  }

  .print-index {
    white-space: nowrap;
    font-size: 3.4mm;
    color: var(--muted);
    font-weight: 700;
  }

  .print-main {
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 1.8%;
    align-items: stretch;
  }

  .print-figure {
    border: 1px solid var(--line);
    border-radius: 2.5mm;
    overflow: hidden;
    background: #f9fbff;
    min-height: 0;
    flex: 1 1 auto;
  }

  .print-figure img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .print-side {
    display: grid;
    grid-template-columns: 26% 1fr;
    gap: 1.6%;
    min-height: 0;
    flex: 0 0 auto;
    align-items: start;
  }

  .print-manga {
    border: 1px solid var(--line);
    border-radius: 2.5mm;
    overflow: hidden;
    background: #fcfcff;
  }

  .print-manga img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .print-points {
    margin: 0;
    padding: 1.8% 2.2%;
    border: 1px solid var(--line);
    border-radius: 2.5mm;
    font-size: clamp(11px, 1.2vw, 16px);
    line-height: 1.35;
    background: #fff;
    min-width: 0;
    overflow: hidden;
  }

  .print-points li + li {
    margin-top: 0.42em;
  }

  .print-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5%;
    font-size: clamp(10px, 1vw, 14px);
    color: var(--muted);
  }

  .print-final-inner {
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 4.5%;
    padding: 5.4% 4.5%;
  }

  .print-final h2 {
    margin: 0;
    font-size: clamp(24px, 2.8vw, 44px);
    line-height: 1.15;
  }

  .print-final p {
    margin: 0;
    font-size: clamp(13px, 1.35vw, 22px);
    color: var(--muted);
    line-height: 1.5;
  }

  .print-final-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3%;
    align-items: start;
    min-width: 0;
    overflow: hidden;
  }

  .print-final-qr {
    border: 1px solid var(--line);
    border-radius: 2.2mm;
    background: #fff;
    padding: 3.8%;
    min-width: 0;
  }

  .print-final-qr strong {
    display: block;
    font-size: clamp(14px, 1.4vw, 24px);
    margin-bottom: 1.2%;
  }

  .print-final-qr p {
    margin: 0 0 1.4%;
    color: var(--muted);
    font-size: clamp(11px, 1.05vw, 17px);
  }

  .print-final-qr img {
    width: min(100%, 240px);
    aspect-ratio: 1 / 1;
    height: auto;
    object-fit: contain;
    border: 1px solid var(--line);
    border-radius: 2mm;
    padding: 4%;
    box-sizing: border-box;
    display: block;
    margin-bottom: 1.4%;
  }

  .print-final-qr code {
    display: block;
    font-size: clamp(12px, 1.16vw, 18px);
    background: #f5f8fc;
    border: 1px solid var(--line);
    border-radius: 1.6mm;
    padding: 1.3% 1.6%;
    white-space: normal;
    overflow-wrap: anywhere;
    min-width: 0;
  }

  @page {
    size: A4 landscape;
    margin: 0;
  }

  @media print {
    html,
    body,
    #root {
      width: var(--a4w);
      margin: 0 !important;
      padding: 0 !important;
      background: #fff !important;
      overflow: visible !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .no-print {
      display: none !important;
    }

    .rass-print-root {
      padding: 0 !important;
      background: #fff !important;
    }

    .rass-print-pages {
      gap: 0 !important;
    }

    .print-page,
    .print-final {
      width: var(--a4w) !important;
      height: var(--a4h) !important;
      aspect-ratio: auto !important;
      border: 0 !important;
      box-shadow: none !important;
      margin: 0 !important;
    }

    .print-slide-inner,
    .print-final-inner {
      padding: 7mm 8mm !important;
    }

    .print-page.is-cover .print-slide-inner {
      grid-template-rows: auto 1fr !important;
      gap: 2.5mm !important;
      padding: 4.5mm !important;
    }

    .cover-header h1 {
      font-size: 4.2mm !important;
    }

    .cover-header p {
      font-size: 2.9mm !important;
    }

    .cover-grid {
      grid-template-columns: 196mm 1fr !important;
      gap: 3mm !important;
    }

    .print-main {
      gap: 3mm !important;
    }

    .print-side {
      grid-template-columns: 52mm 1fr !important;
      gap: 3mm !important;
    }

    .print-points {
      font-size: 3mm !important;
      line-height: 1.35 !important;
    }

    .print-footer {
      font-size: 2.9mm !important;
      margin-top: 2mm !important;
    }

    .print-final-links {
      grid-template-columns: 1fr 1fr !important;
      gap: 6mm !important;
    }

    .print-final-qr {
      padding: 3mm !important;
    }

    .print-final-qr img {
      width: 52mm !important;
      height: 52mm !important;
      padding: 2mm !important;
      margin-bottom: 2mm !important;
    }

    .print-final-qr strong {
      font-size: 4.2mm !important;
    }

    .print-final-qr p {
      font-size: 3mm !important;
      margin-bottom: 2mm !important;
    }

    .print-final-qr code {
      font-size: 3.35mm !important;
      padding: 2.2mm 2.8mm !important;
    }
  }
`;

export default function RASSPrintSlides2026() {
  return (
    <main className="rass-print-root">
      <style>{pageStyles}</style>
      <section className="rass-print-help no-print" aria-label="印刷ガイド">
        A4横・背景グラフィックON・余白なし(または最小)で印刷してください。1ページ1スライドでPDF化できます。
      </section>
      <section className="rass-print-pages">
        {printSlides.map((slide, index) => (
          <article className={`print-page${slide.id === "00" ? " is-cover cover-page" : ""}`} key={slide.id}>
            {slide.id === "00" ? (
              <div className="print-slide-inner">
                <header className="cover-header">
                  <h1>00 表紙 | RA-SS 2026</h1>
                  <p>Figure版 + 漫画版</p>
                </header>
                <section className="cover-grid" aria-label="表紙 Figure と 漫画">
                  <figure className="cover-card">
                    <img className="cover-full-image" src={slide.figureSrc} alt="RA-SS 2026 表紙 Figure版" loading="eager" decoding="sync" />
                  </figure>
                  <figure className="cover-card">
                    {slide.mangaSrc ? (
                      <img className="cover-manga-image" src={slide.mangaSrc} alt="RA-SS 2026 表紙 漫画版" loading="eager" decoding="sync" />
                    ) : null}
                  </figure>
                </section>
              </div>
            ) : (
              <div className="print-slide-inner">
                <header className="print-header">
                  <div className="print-title-wrap">
                    <h1>
                      {slide.id} {slide.label} | {slide.title}
                    </h1>
                    <p>{slide.subtitle}</p>
                  </div>
                  <div className="print-index">
                    {index + 1} / {printSlides.length}
                  </div>
                </header>
                <section className="print-main">
                  <figure className="print-figure">
                    <img src={slide.figureSrc} alt={`${slide.id} Figure版`} loading="lazy" decoding="async" />
                  </figure>
                  <aside className="print-side">
                    <figure className="print-manga">
                      {slide.mangaSrc ? <img src={slide.mangaSrc} alt={`${slide.id} 漫画版（補助）`} loading="lazy" decoding="async" /> : null}
                    </figure>
                    <ul className="print-points">
                      {slide.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </aside>
                </section>
                <footer className="print-footer">
                  <span>RA-SS 2026 Print Edition</span>
                  <span>Figure中心 / 漫画は補助表示</span>
                </footer>
              </div>
            )}
          </article>
        ))}

        <article className="print-final">
          <div className="print-final-inner">
            <h2>WEB版・DEMOへのアクセス</h2>
            <p>印刷配布後も同じ内容を追えるように、QRとURLを掲載しています。</p>
            <section className="print-final-links">
              <article className="print-final-qr">
                <strong>RA-SS WEB Slides</strong>
                <p>WEB版スライドを見る</p>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=https%3A%2F%2Fcore-lp.vercel.app%2Frass-figure-slides-2026"
                  alt="RA-SS WEB Slides QRコード"
                  loading="lazy"
                  decoding="async"
                />
                <code>https://core-lp.vercel.app/rass-figure-slides-2026</code>
              </article>
              <article className="print-final-qr">
                <strong>RA-SS DEMO</strong>
                <p>DEMOを試す</p>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=https%3A%2F%2Fcore-lp.vercel.app%2Fdemo-intro"
                  alt="RA-SS DEMO QRコード"
                  loading="lazy"
                  decoding="async"
                />
                <code>https://core-lp.vercel.app/demo-intro</code>
              </article>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
}
