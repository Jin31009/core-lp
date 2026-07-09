import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileDown,
  FileQuestion,
  FileText,
  HelpCircle,
  Layers3,
  MessageCircle,
  Newspaper,
  Presentation,
  Printer,
  QrCode,
  ShieldCheck,
  Smartphone,
  Tablet,
} from "lucide-react";
import { pocSlides, type SlideContent } from "../data/rassIcModulePocSlides";

const imagePdfHref = "/assets/rass-ic-module-poc-slides/rass-ic-module-poc-slides-image.pdf";

function scrollToSlide(index: number) {
  const slide = pocSlides[index];
  if (!slide) return;

  document.getElementById(slide.id)?.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
}

function SlideShell({
  slide,
  index,
  children,
}: {
  slide: SlideContent;
  index: number;
  children: ReactNode;
}) {
  return (
    <section
      id={slide.id}
      className="slide-page scroll-mt-24 border-b border-slate-200 bg-slate-100 py-6 lg:py-8"
      aria-labelledby={`${slide.id}-title`}
    >
      <div className="slide-frame mx-auto w-full max-w-7xl">
        <div className="slide-canvas flex min-h-[720px] w-full flex-col bg-white px-5 py-10 shadow-sm ring-1 ring-slate-200 md:px-8 lg:min-h-0 lg:py-8">
          <div className="slide-header mb-5 flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <p className="text-sm font-semibold tracking-[0.12em] text-teal-700 uppercase">
              {slide.eyebrow}
            </p>
            <p className="text-sm font-medium text-slate-500">{index + 1} / {pocSlides.length}</p>
          </div>
          <div className="slide-content grid flex-1 content-center gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideHero({ slide }: { slide: SlideContent }) {
  const isCover = slide.id === "cover";
  const showHeroMeta = slide.id !== "request";
  const titleClassName = isCover
    ? "text-4xl font-semibold leading-tight text-slate-950 md:text-5xl"
    : "text-3xl font-semibold leading-tight text-slate-950 md:text-4xl";

  return (
    <div>
      <h1 id={`${slide.id}-title`} className={titleClassName}>
        {slide.title}
      </h1>
      {slide.lead ? (
        <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-700 md:text-2xl">{slide.lead}</p>
      ) : null}
      {slide.body ? (
        <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-700">{slide.body}</p>
      ) : null}
      {showHeroMeta && slide.note ? (
        <div className="mt-6 flex gap-3 rounded-lg border border-teal-200 bg-teal-50 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
          <p className="text-sm leading-7 text-slate-700">{slide.note}</p>
        </div>
      ) : null}
      {showHeroMeta && slide.links ? <SlideLinks links={slide.links} /> : null}
    </div>
  );
}

function SlideLinks({ links }: { links: NonNullable<SlideContent["links"]> }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-teal-500 hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          {link.label}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function ModuleCard({ slide }: { slide: SlideContent }) {
  if (!slide.cards?.length) {
    return <FlowDiagram items={slide.flow ?? []} />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {slide.cards.map((card) => {
        const Icon = card.icon ?? Layers3;

        return (
          <article key={card.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white text-teal-700 ring-1 ring-slate-200">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold leading-tight text-slate-950">{card.title}</h3>
            </div>
            <p className="text-sm leading-7 text-slate-600">{card.body}</p>
          </article>
        );
      })}
    </div>
  );
}

function ModuleStructureDiagram({ slide }: { slide: SlideContent }) {
  return (
    <ol className="grid gap-2">
      {slide.cards?.map((card, index) => {
        const Icon = card.icon ?? Layers3;

        return (
          <li key={card.title} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex gap-3">
              <div className="flex w-10 shrink-0 flex-col items-center">
                <span className="flex h-9 w-9 items-center justify-center rounded bg-white text-teal-700 ring-1 ring-slate-200">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {index < (slide.cards?.length ?? 0) - 1 ? (
                  <span className="mt-2 h-full min-h-4 w-px bg-teal-200" aria-hidden="true" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-teal-700">LAYER {index + 1}</p>
                <h3 className="mt-0.5 text-base font-semibold leading-tight text-slate-950">{card.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">{card.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ModuleComponentsDiagram({ slide }: { slide: SlideContent }) {
  const coreContents = [
    {
      title: "WordPress記事",
      body: "公開上の正本・基礎ページ",
      icon: FileText,
    },
    {
      title: "FAQ",
      body: "患者・家族の疑問に答える確認項目",
      icon: HelpCircle,
    },
    {
      title: "PDF",
      body: "保存・印刷・配布用の資料",
      icon: FileDown,
    },
    {
      title: "QR付きA4資料",
      body: "現場配布用・アクセス導線付きの要約資料",
      icon: QrCode,
    },
  ];

  const connectedMedia = [
    {
      title: "LINE入口",
      body: "情報本体ではなく、基幹コンテンツへ戻る入口",
      icon: MessageCircle,
    },
    {
      title: "タブレット説明画面",
      body: "職員が基幹コンテンツを説明に使う画面",
      icon: Tablet,
    },
    {
      title: "広報誌",
      body: "基幹コンテンツを読み物化して届ける媒体",
      icon: Newspaper,
    },
    {
      title: "PPT",
      body: "共同開発・院内説明・合意形成のための説明メディア",
      icon: Presentation,
    },
  ];

  const firstSteps = slide.cards?.slice(0, 4) ?? [];
  const reviewStep = slide.cards?.find((card) => card.title === "医療者確認・監修");

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-teal-700">PoC v0.1 フロー</p>
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {firstSteps.map((card, index) => {
            const Icon = card.icon ?? Layers3;

            return (
              <li key={card.title} className="rounded border border-white bg-white p-2 shadow-sm ring-1 ring-slate-100">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-teal-50 text-teal-700">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <p className="text-[10px] font-semibold text-slate-400">STEP {index + 1}</p>
                </div>
                <h3 className="text-sm font-semibold leading-tight text-slate-950">{card.title}</h3>
                <p className="mt-1 text-[11px] leading-4 text-slate-600">{card.body}</p>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <section className="rounded-lg border border-teal-200 bg-teal-50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Layers3 className="h-4 w-4 text-teal-700" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-semibold text-teal-700">基幹コンテンツ</p>
              <h3 className="text-base font-semibold leading-tight text-slate-950">情報の本体群</h3>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {coreContents.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded border border-teal-100 bg-white p-2">
                  <div className="flex gap-2">
                    <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-700" aria-hidden="true" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-950">{item.title}</h4>
                      <p className="mt-0.5 text-[11px] leading-4 text-slate-600">{item.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-sky-200 bg-sky-50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <FileQuestion className="h-4 w-4 text-sky-700" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-semibold text-sky-700">接続メディア</p>
              <h3 className="text-base font-semibold leading-tight text-slate-950">戻る・使う・共有する媒体</h3>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {connectedMedia.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded border border-sky-100 bg-white p-2">
                  <div className="flex gap-2">
                    <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-700" aria-hidden="true" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-950">{item.title}</h4>
                      <p className="mt-0.5 text-[11px] leading-4 text-slate-600">{item.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {reviewStep ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5">
          <p className="text-xs leading-5 text-slate-700">
            <span className="font-semibold text-slate-950">{reviewStep.title}：</span>
            {reviewStep.body}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function FlowDiagram({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <ol className="grid gap-3">
      {items.map((item, index) => (
        <li key={item} className="flex items-stretch gap-3">
          <div className="flex w-12 shrink-0 flex-col items-center">
            <span className="flex h-10 w-10 items-center justify-center rounded bg-teal-700 text-sm font-semibold text-white">
              {index + 1}
            </span>
            {index < items.length - 1 ? <span className="h-full w-px bg-teal-200" aria-hidden="true" /> : null}
          </div>
          <div className="flex min-h-16 flex-1 items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-base font-semibold leading-7 text-slate-900">{item}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function FlowWithNote({ slide }: { slide: SlideContent }) {
  return (
    <div className="space-y-4">
      <FlowDiagram items={slide.flow ?? []} />
      {slide.note ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs leading-5 text-slate-700">{slide.note}</p>
        </div>
      ) : null}
    </div>
  );
}

function CaseRouteDiagram({ items }: { items: string[] }) {
  if (!items.length) return null;

  const icons = [FileText, Tablet, QrCode, Smartphone];

  return (
    <ol className="grid gap-3 rounded-lg border border-teal-200 bg-teal-50 p-4 md:grid-cols-4">
      {items.map((item, index) => {
        const Icon = icons[index] ?? Layers3;

        return (
          <li key={item} className="relative rounded border border-teal-100 bg-white p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-teal-700 text-white">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold text-teal-700">STEP {index + 1}</span>
            </div>
            <p className="text-sm font-semibold leading-6 text-slate-950">{item}</p>
            {index < items.length - 1 ? (
              <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-teal-400 md:block" aria-hidden="true" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function CaseStudyCards({ slide }: { slide: SlideContent }) {
  return (
    <div className="space-y-5">
      <CaseRouteDiagram items={slide.flow ?? []} />
      <ModuleCard slide={slide} />
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm leading-7 text-slate-700">
          この代表事例は完成システムではなく、説明支援と広報展開の流れを確認するためのPoCイメージです。
        </p>
      </div>
    </div>
  );
}

function Timeline({ slide }: { slide: SlideContent }) {
  return (
    <div className="grid gap-3">
      {slide.timeline?.map((item, index) => (
        <article key={item.month} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-teal-700">STEP {index + 1}</p>
          <h3 className="mt-1.5 text-xl font-semibold text-slate-950">{item.month}</h3>
          <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

function SafetyNotice({ slide }: { slide: SlideContent }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
      <div className="mb-4 flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-amber-700" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-slate-950">PoC上の前提</h3>
      </div>
      <ul className="space-y-3">
        {slide.bullets?.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConsultationRequest({ slide }: { slide: SlideContent }) {
  return (
    <div>
      <ModuleCard slide={slide} />
      {slide.note ? (
        <div className="mt-5 rounded-lg border border-teal-200 bg-teal-50 p-5">
          <p className="text-base leading-8 text-slate-700">{slide.note}</p>
        </div>
      ) : null}
      {slide.links ? <SlideLinks links={slide.links} /> : null}
    </div>
  );
}

function SlideVisual({ slide }: { slide: SlideContent }) {
  if (slide.id === "module") return <ModuleStructureDiagram slide={slide} />;
  if (slide.id === "module-components") return <ModuleComponentsDiagram slide={slide} />;
  if (slide.id === "case") return <CaseStudyCards slide={slide} />;
  if (slide.id === "loop") return <FlowWithNote slide={slide} />;
  if (slide.id === "timeline") return <Timeline slide={slide} />;
  if (slide.id === "safety") return <SafetyNotice slide={slide} />;
  if (slide.id === "request") return <ConsultationRequest slide={slide} />;
  if (slide.flow?.length) return <FlowDiagram items={slide.flow} />;
  return <ModuleCard slide={slide} />;
}

export default function RassIcModulePocSlidesPage({ printMode = false }: { printMode?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = pocSlides[activeIndex] ?? pocSlides[0];
  const navLabel = useMemo(() => `${activeIndex + 1} / ${pocSlides.length}`, [activeIndex]);
  const isExportMode =
    printMode &&
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("export");

  useEffect(() => {
    document.title = printMode
      ? "疾患別IC支援モジュール PoC提案｜印刷用固定スライド"
      : "疾患別IC支援モジュール PoC提案｜Webスライド";
  }, [printMode]);

  useEffect(() => {
    const observers = pocSlides
      .map((slide, index) => {
        const element = document.getElementById(slide.id);
        if (!element) return null;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              setActiveIndex(index);
            }
          },
          {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0,
          },
        );

        observer.observe(element);
        return observer;
      })
      .filter(Boolean);

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const goPrevious = () => scrollToSlide(Math.max(0, activeIndex - 1));
  const goNext = () => scrollToSlide(Math.min(pocSlides.length - 1, activeIndex + 1));

  return (
    <main className={`min-h-screen bg-slate-100 text-slate-900 ${printMode ? "slide-print-mode" : ""}`}>
      <style>{`
        @media screen and (min-width: 1024px) {
          .slide-page {
            --slide-scale: min(1, calc((100vw - 48px) / 1280px));
          }
          .slide-frame {
            width: calc(1280px * var(--slide-scale)) !important;
            height: calc(720px * var(--slide-scale)) !important;
            max-width: none !important;
          }
          .slide-canvas {
            width: 1280px !important;
            height: 720px !important;
            min-height: 0 !important;
            max-width: none !important;
            transform: scale(var(--slide-scale)) !important;
            transform-origin: top left !important;
          }
        }
        @media screen {
          .slide-print-mode {
            min-width: 1280px !important;
            background: white !important;
          }
          .slide-print-mode .slide-page {
            width: 1280px !important;
            height: 720px !important;
            margin: 0 auto 24px !important;
            padding: 0 !important;
            overflow: hidden !important;
            border: 0 !important;
            background: white !important;
          }
          .slide-print-mode .slide-frame {
            width: 1280px !important;
            height: 720px !important;
            max-width: none !important;
            margin: 0 !important;
          }
          .slide-print-mode .slide-canvas {
            width: 1280px !important;
            height: 720px !important;
            min-height: 0 !important;
            max-width: none !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            --tw-ring-shadow: 0 0 #0000 !important;
            padding: 32px !important;
            transform: none !important;
            transform-origin: top left !important;
          }
        }
        @media print {
          @page { size: 13.333333in 7.5in; margin: 0; }
          html, body, #root {
            width: 1280px !important;
            margin: 0 !important;
            background: white !important;
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          main { background: white !important; }
          .slide-nav, .slide-controls { display: none !important; }
          .slide-page {
            width: 1280px !important;
            height: 720px !important;
            position: relative !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            break-after: page;
            page-break-after: always;
            border: 0 !important;
            background: white !important;
          }
          .slide-page:last-of-type { break-after: auto; page-break-after: auto; }
          .slide-frame {
            width: 1280px !important;
            height: 720px !important;
            max-width: none !important;
            margin: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .slide-canvas {
            width: 1280px !important;
            height: 720px !important;
            min-height: 0 !important;
            max-width: none !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            --tw-ring-shadow: 0 0 #0000 !important;
            padding: 32px !important;
            transform: none !important;
            transform-origin: center center !important;
          }
          .slide-print-mode .slide-page { margin: 0 !important; }
          .slide-print-mode .slide-canvas {
            transform: scale(0.965) !important;
          }
          a { color: inherit !important; text-decoration: none !important; }
        }
      `}</style>

      {printMode && !isExportMode ? (
        <div className="slide-controls fixed bottom-4 right-4 z-40 flex gap-2 rounded-full border border-slate-200 bg-white/95 p-2 shadow-md backdrop-blur">
          <a
            href={imagePdfHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-full bg-slate-950 px-4 text-xs font-semibold text-white hover:bg-slate-800"
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            PDF印刷用
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-teal-700 px-4 text-xs font-semibold text-white hover:bg-teal-800"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            この表示で印刷
          </button>
          <a
            href="/rass-ic-module-poc-slides"
            className="inline-flex h-9 items-center rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Webスライドへ戻る
          </a>
        </div>
      ) : null}

      {!printMode ? (
      <nav className="slide-nav sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-2.5 md:px-8">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-slate-700">疾患別IC支援モジュール PoC提案</p>
            <p className="truncate text-[11px] leading-5 text-slate-400">{navLabel}｜{activeSlide.title}</p>
          </div>
          <div className="hidden max-w-3xl gap-1 overflow-x-auto md:flex">
            {pocSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollToSlide(index)}
                className={`h-7 min-w-7 rounded text-[11px] font-semibold transition ${
                  index === activeIndex
                    ? "bg-teal-700 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-teal-50 hover:text-teal-800"
                }`}
                aria-label={`${slide.eyebrow}へ移動`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/rass-ic-module-poc-slides-print";
            }}
            className="hidden h-8 items-center gap-2 rounded border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-500 hover:border-teal-500 hover:text-teal-800 md:inline-flex"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            印刷用表示
          </button>
          <a
            href={imagePdfHref}
            target="_blank"
            rel="noreferrer"
            className="hidden h-8 items-center gap-2 rounded border border-slate-200 bg-slate-950 px-3 text-[11px] font-semibold text-white hover:bg-slate-800 md:inline-flex"
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            PDF印刷用
          </a>
        </div>
      </nav>
      ) : null}

      {pocSlides.map((slide, index) => (
        <SlideShell key={slide.id} slide={slide} index={index}>
          <SlideHero slide={slide} />
          <SlideVisual slide={slide} />
        </SlideShell>
      ))}

      {!printMode ? (
      <div className="slide-controls fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2 py-1.5 shadow-md backdrop-blur">
        <button
          type="button"
          onClick={goPrevious}
          disabled={activeIndex === 0}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
          aria-label="前のスライドへ"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="min-w-12 text-center text-xs font-semibold text-slate-500">{navLabel}</span>
        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex === pocSlides.length - 1}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300"
          aria-label="次のスライドへ"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      ) : null}

      {!printMode ? (
      <a
        href="#problem"
        className="slide-controls fixed bottom-4 right-4 hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-500 shadow-md hover:bg-slate-50 lg:flex"
        aria-label="次の内容へ"
      >
        <ArrowDown className="h-5 w-5" aria-hidden="true" />
      </a>
      ) : null}
    </main>
  );
}
