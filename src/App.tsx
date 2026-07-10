import { Suspense, lazy, useEffect, useState } from "react";


// ===== pages（直下）=====
import DemoPage from "./pages/DemoPage";
import DemoIntroPage from "./pages/DemoIntroPage";
import TopPage from "./pages/TopPage";
import CoreLPPage from "./pages/CoreLPPage";
import LPPage from "./pages/LPPage";
import ContactPage from "./pages/ContactPage";
import ParticipationPage from "./pages/ParticipationPage";
import PocPage from "./pages/PocPage";
import KouhouOsDevPage from "./pages/KouhouOsDevPage";
import KouhouOsJhm2026Page from "./pages/KouhouOsJhm2026Page";
import RASSFigureSlides2026 from "./pages/slides/RASSFigureSlides2026";
import RASSPrintSlides2026 from "./pages/slides/RASSPrintSlides2026";

// ===== pages（フォルダ内）=====
import StructurePage from "./pages/structure/StructurePage";
import ProcessPage from "./pages/process/ProcessPage";
import ReportsTopPage from "./pages/reports/ReportsTopPage";
import { initAnalytics } from "./lib/analytics";

const PocOrthopedicSupportPage = lazy(() => import("./pages/PocOrthopedicSupportPage"));
const RassIcModulePocPage = lazy(() => import("./pages/RassIcModulePocPage"));
const RassIcModulePocSlidesPage = lazy(() => import("./pages/RassIcModulePocSlidesPage"));

function getInitialPage() {
  if (typeof window === "undefined") {
    return "top";
  }

  const pathToPage: Record<string, string> = {
    "/": "top",
    "/kouhou-os-dev": "kouhou-os-dev",
    "/kouhou-os-dev/jhm2026": "kouhou-os-jhm2026",
    "/slides": "slides",
    "/slides/print": "slides-print",
    "/demo-intro": "demo-intro",
    "/demo": "demo",
    "/contact": "contact",
    "/poc-orthopedic-support": "poc-orthopedic-support",
    "/rass-ic-module-poc": "rass-ic-module-poc",
    "/rass-ic-module-poc-slides": "rass-ic-module-poc-slides",
    "/rass-ic-module-poc-slides-print": "rass-ic-module-poc-slides-print",
  };

  return pathToPage[window.location.pathname] ?? "top";
}

export default function App() {
  const [page, setPage] = useState(getInitialPage);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (page === "kouhou-os-dev" && window.location.hash) {
      const targetId = window.location.hash.slice(1);
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ block: "start" });
      });
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [page]);

  return (
    <div>
      {/* TOP */}
      {page === "top" && <KouhouOsDevPage />}

      {/* CORE LP */}
      {page === "corelp" && <CoreLPPage setPage={setPage} />}

      {/* NEW LP */}
      {page === "lp" && <LPPage setPage={setPage} />}

      {/* KOUHOU OS DEV */}
      {page === "kouhou-os-dev" && <KouhouOsDevPage />}
      {page === "kouhou-os-jhm2026" && <KouhouOsJhm2026Page />}

      {/* DEV TOP */}
      {page === "devtop" && <TopPage setPage={setPage} />}

      {/* PROTOTYPE / DEMO */}
      {page === "prototype" && <DemoPage setPage={setPage} />}
      {page === "demo-intro" && <DemoIntroPage setPage={setPage} />}
      {page === "demo" && <DemoPage setPage={setPage} />}

      {/* STRUCTURE */}
      {page === "structure" && <StructurePage setPage={setPage} />}

      {/* PROCESS */}
      {page === "process" && <ProcessPage setPage={setPage} />}

      {/* REPORTS */}
      {page === "reports" && <ReportsTopPage setPage={setPage} />}

      {/* CONTACT / PoC参加ページ */}
      {page === "contact" && <ContactPage setPage={setPage} />}
      {page === "poc" && (
        <PocPage onNavigate={setPage} onBackPrev={() => setPage("top")} />
      )}
      {page === "poc-orthopedic-support" && (
        <Suspense fallback={<div className="p-6 text-slate-700">PoCページを読み込み中...</div>}>
          <PocOrthopedicSupportPage />
        </Suspense>
      )}
      {page === "rass-ic-module-poc" && (
        <Suspense fallback={<div className="p-6 text-slate-700">PoC表示デモを読み込み中...</div>}>
          <RassIcModulePocPage />
        </Suspense>
      )}
      {page === "rass-ic-module-poc-slides" && (
        <Suspense fallback={<div className="p-6 text-slate-700">Webスライドを読み込み中...</div>}>
          <RassIcModulePocSlidesPage />
        </Suspense>
      )}
      {page === "rass-ic-module-poc-slides-print" && (
        <Suspense fallback={<div className="p-6 text-slate-700">印刷用スライドを読み込み中...</div>}>
          <RassIcModulePocSlidesPage printMode />
        </Suspense>
      )}
      {page === "participation" && (
        <ParticipationPage onNavigate={setPage} onBackPrev={() => setPage("poc")} />
      )}

      {/* SLIDES */}
      {page === "slides" && (
        <RASSFigureSlides2026 />
      )}
      {page === "slides-print" && <RASSPrintSlides2026 />}
    </div>
  );
}
