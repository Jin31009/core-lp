import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import TopPage from "./pages/TopPage";
import LPPage from "./pages/LPPage";
import DemoPage from "./pages/DemoPage";
import ParticipationPage from "./pages/ParticipationPage";
import SlidesPage from "./pages/SlidesPage";
import ContactPage from "./pages/ContactPage";
import MissionPage from "./pages/MissionPage";
import CasePage from "./pages/case/CasePage";
import EvidencePage from "./pages/evidence/EvidencePage";

export type Page =
  | "top"
  | "lp"
  | "demo"
  | "mission"
  | "participation"
  | "slides"
  | "case"
  | "evidence"
  | "contact";

export default function App() {
  const [page, setPage] = useState<Page>("top");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f5",
        color: "#111111",
      }}
    >
      <Header onNavigate={(nextPage) => setPage(nextPage as Page)} />

      {page === "top" && <TopPage setPage={(nextPage) => setPage(nextPage as Page)} />}
      {page === "lp" && <LPPage setPage={(nextPage) => setPage(nextPage as Page)} />}
      {page === "demo" && <DemoPage setPage={(nextPage) => setPage(nextPage as Page)} />}
      {page === "mission" && <MissionPage setPage={(nextPage) => setPage(nextPage as Page)} />}
      {page === "participation" && <ParticipationPage setPage={setPage} />}
      {page === "slides" && <SlidesPage setPage={setPage} />}
      {page === "case" && <CasePage setPage={setPage} />}
      {page === "evidence" && <EvidencePage setPage={setPage} />}
      {page === "contact" && <ContactPage setPage={(nextPage) => setPage(nextPage as Page)} />}

      <Footer />
    </div>
  );
}