import RASSConferenceSlides from "./pages/slides/RASSConferenceSlides";
import RASSHybridSlides from "./components/slides/RASSHybridSlides";
import CoreLPPage from "./pages/CoreLPPage";
import DemoIntroPage from "./pages/DemoIntroPage";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

function resolvePageToPath(page: string) {
  switch (page) {
    case "structure":
      return "/#method";
    case "poc":
      return "/#poc-bridge";
    case "contact":
      return "/#cta";
    case "demo":
      return "/demo-intro";
    case "demo-intro":
      return "/demo-intro";
    case "prototype":
      return "/#prototype";
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
      return "/conference-slides";
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
      <Route path="/demo-intro" element={<DemoIntroPage setPage={setPage} />} />
      <Route path="/case" element={<CoreLPPage setPage={setPage} />} />
      <Route path="/evidence" element={<CoreLPPage setPage={setPage} />} />
      <Route path="/slides" element={<RASSHybridSlides />} />
      <Route path="/conference-slides" element={<RASSConferenceSlides />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
