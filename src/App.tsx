import { useEffect, useState } from "react";


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
import SlidesPage from "./pages/SlidesPage";

// ===== pages（フォルダ内）=====
import StructurePage from "./pages/structure/StructurePage";
import ProcessPage from "./pages/process/ProcessPage";
import ReportsTopPage from "./pages/reports/ReportsTopPage";
import { initAnalytics } from "./lib/analytics";

function getInitialPage() {
  if (typeof window === "undefined") {
    return "top";
  }

  const pathToPage: Record<string, string> = {
    "/": "top",
    "/kouhou-os-dev": "kouhou-os-dev",
    "/kouhou-os-dev/jhm2026": "kouhou-os-jhm2026",
    "/slides": "slides",
    "/demo-intro": "demo-intro",
  };

  return pathToPage[window.location.pathname] ?? "top";
}

const jhm2026Path = "/kouhou-os-dev/jhm2026";

function appendJhm2026Link(
  parent: Element | null,
  key: string,
  label: string,
  className: string,
  prepend = false,
) {
  if (!parent || parent.querySelector(`[data-jhm2026-link="${key}"]`)) {
    return;
  }

  const link = document.createElement("a");
  link.href = jhm2026Path;
  link.textContent = label;
  link.className = className;
  link.dataset.jhm2026Link = key;

  if (prepend) {
    parent.prepend(link);
    return;
  }

  parent.append(link);
}

function addJhm2026Links() {
  appendJhm2026Link(
    document.querySelector("header nav"),
    "nav",
    "学会補足",
    "text-slate-600 hover:text-slate-950",
  );
  appendJhm2026Link(
    document.querySelector("#hero .mt-8.flex.flex-wrap.gap-3"),
    "hero",
    "学会発表補足を見る",
    "rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white",
  );
  appendJhm2026Link(
    document.querySelector("#evidence .mx-auto.mt-6.flex.max-w-6xl.flex-wrap.gap-3.px-5"),
    "evidence",
    "302件解析の補足を見る",
    "rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white",
    true,
  );
}

export default function App() {
  const [page, setPage] = useState(getInitialPage);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (page !== "top" && page !== "kouhou-os-dev") {
      return;
    }

    addJhm2026Links();
    const frame = window.requestAnimationFrame(addJhm2026Links);
    return () => window.cancelAnimationFrame(frame);
  }, [page]);

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
      {page === "participation" && (
        <ParticipationPage onNavigate={setPage} onBackPrev={() => setPage("poc")} />
      )}

      {/* SLIDES */}
      {page === "slides" && (
        <SlidesPage onNavigate={setPage} onBackPrev={() => setPage("kouhou-os-dev")} />
      )}
    </div>
  );
}
