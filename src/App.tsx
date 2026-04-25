import RASSConferenceSlides from "./pages/slides/RASSConferenceSlides";
import RASSHybridSlides from "./components/slides/RASSHybridSlides";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/slides" element={<RASSHybridSlides />} />
      <Route path="/conference-slides" element={<RASSConferenceSlides />} />
      <Route path="*" element={<Navigate to="/conference-slides" replace />} />
    </Routes>
  );
}
