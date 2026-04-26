import RASSConferenceSlides from "./pages/slides/RASSConferenceSlides";
import RASSHybridSlides from "./components/slides/RASSHybridSlides";
import CoreLPPage from "./pages/CoreLPPage";
import DemoIntroPage from "./pages/DemoIntroPage";
import StructurePage from "./pages/structure/StructurePage";
import PocPage from "./pages/PocPage";
import ContactPage from "./pages/ContactPage";
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
      return "/demo-intro";
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
      <Route path="/case" element={<CoreLPPage setPage={setPage} />} />
      <Route path="/evidence" element={<CoreLPPage setPage={setPage} />} />
      <Route path="/slides" element={<RASSHybridSlides />} />
      <Route path="/conference-slides" element={<RASSConferenceSlides />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
