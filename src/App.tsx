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

// ===== pages（フォルダ内）=====
import StructurePage from "./pages/structure/StructurePage";
import ProcessPage from "./pages/process/ProcessPage";
import ReportsTopPage from "./pages/reports/ReportsTopPage";
import { initAnalytics } from "./lib/analytics";

export default function App() {
  const [page, setPage] = useState("top");

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [page]);

  return (
    <div>
      {/* TOP */}
      {page === "top" && <CoreLPPage setPage={setPage} />}

      {/* CORE LP */}
      {page === "corelp" && <CoreLPPage setPage={setPage} />}

      {/* NEW LP */}
      {page === "lp" && <LPPage setPage={setPage} />}

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
    </div>
  );
}
