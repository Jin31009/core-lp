import RASSConferenceSlides from "./pages/slides/RASSConferenceSlides";
import RASSFigureSlides2026 from "./pages/slides/RASSFigureSlides2026";
import RASSPrintSlides2026 from "./pages/slides/RASSPrintSlides2026";
import RASSWebSlides2026 from "./pages/slides/RASSWebSlides2026";
import RASSHybridSlides from "./components/slides/RASSHybridSlides";
import CoreLPPage from "./pages/CoreLPPage";
import DemoIntroPage from "./pages/DemoIntroPage";
import DemoPage from "./pages/DemoPage";
import StructurePage from "./pages/structure/StructurePage";
import PocPage from "./pages/PocPage";
import ContactPage from "./pages/ContactPage";
import KouhouOsDevPage from "./pages/KouhouOsDevPage";
import ReportsPage from "./pages/reports/ReportsPage";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

function resolvePageToPath(page: string) {
  switch (page) {
    case "structure":
      return "/structure";
    case "poc":
      return "/poc";
    case "contact":
      return "/contact";
    case "demo":
      return "/demo";
    case "demo-intro":
      return "/demo-intro";
    case "prototype":
      return "/demo-intro";
    case "case":
      return "/case";
    case "evidence":
      return "/evidence";
    case "slides":
      return "/slides";
    case "conference-slides":
      return "/conference-slides";
    case "rass-web-slides-2026":
      return "/rass-web-slides-2026";
    case "rass-figure-slides-2026":
      return "/rass-figure-slides-2026";
    case "slides-print":
      return "/slides/print";
    case "top":
    case "corelp":
    case "lp":
      return "/";
    case "reports":
      return "/reports";
    default:
      return "/";
  }
}

export default function App() {
  const navigate = useNavigate();
  const setPage = (page: string) => navigate(resolvePageToPath(page));

  return (
    <Routes>
      <Route path="/" element={<CoreLPPage setPage={setPage} />} />
      <Route path="/lp" element={<CoreLPPage setPage={setPage} />} />
      <Route path="/structure" element={<StructurePage setPage={setPage} />} />
      <Route
        path="/poc"
        element={<PocPage onNavigate={(page) => setPage(page)} onBackPrev={() => setPage("structure")} />}
      />
      <Route path="/contact" element={<ContactPage setPage={setPage} />} />
      <Route path="/reports" element={<ReportsPage setPage={setPage} />} />
      <Route path="/demo-intro" element={<DemoIntroPage setPage={setPage} />} />
      <Route path="/demo" element={<DemoPage setPage={setPage} />} />
      <Route path="/case" element={<CoreLPPage setPage={setPage} />} />
      <Route path="/evidence" element={<CoreLPPage setPage={setPage} />} />
      <Route path="/slides" element={<RASSHybridSlides />} />
      <Route path="/slides/print" element={<RASSPrintSlides2026 />} />
      <Route path="/slides/a4-print" element={<RASSPrintSlides2026 />} />
      <Route path="/conference-slides" element={<RASSConferenceSlides />} />
      <Route path="/rass-figure-slides-2026" element={<RASSFigureSlides2026 />} />
      <Route path="/rass-web-slides-2026" element={<RASSWebSlides2026 />} />
      <Route path="/rass-web-slides-2026/*" element={<RASSWebSlides2026 />} />
      <Route path="/kouhou-os-dev" element={<KouhouOsDevPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
