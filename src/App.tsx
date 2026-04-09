import React from "react";

// ===== pages（直下） =====
import TopPage from "./pages/TopPage";
import DemoPage from "./pages/DemoPage";
import CoreLPPage from "./pages/CoreLPPage";
import ParticipationPage from "./pages/ParticipationPage";
import SlidesPage from "./pages/SlidesPage";

// ===== pages（フォルダ内） =====
import CasePage from "./pages/case/CasePage";
import StructurePage from "./pages/structure/StructurePage";
import ProcessPage from "./pages/process/ProcessPage";

export default function App() {
  const [page, setPage] = React.useState("top");

  return (
    <div>
      {page === "top" && <TopPage setPage={setPage} />}

      {page === "prototype" && <DemoPage setPage={setPage} />}

      {page === "case" && <CasePage setPage={setPage} />}

      {page === "structure" && <StructurePage setPage={setPage} />}

      {page === "process" && <ProcessPage setPage={setPage} />}

      {page === "participation" && (
        <ParticipationPage setPage={setPage} />
      )}

      {page === "slides" && <SlidesPage setPage={setPage} />}

      {page === "corelp" && <CoreLPPage setPage={setPage} />}
    </div>
  );
}