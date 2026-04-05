import React from "react";
import type { Page } from "./types";

import Header from "./components/Header";
import Footer from "./components/Footer";

import TopPage from "./pages/TopPage";
import SlidesPage from "./pages/SlidesPage";
import ParticipationPage from "./pages/ParticipationPage";
import PocPage from "./pages/PocPage";
import DemoPage from "./pages/DemoPage";

export default function App() {
  const [page, setPage] = React.useState<Page>("top");

  const navigate = (next: Page) => {
    setPage(next);
  };

  const goBack = () => {
    setPage("top");
  };

  return (
    <div>
      <Header
        navItems={[
          { label: "TOP", page: "top" },
          { label: "学会", page: "slides" },
          { label: "DEMO", page: "demo" },
          { label: "PARTICIPATION", page: "participation" },
          { label: "POC", page: "poc" },
        ]}
        current={page}
        onNavigate={navigate}
      />

      <main>
        {page === "top" && <TopPage onNavigate={navigate} />}

        {page === "slides" && (
          <SlidesPage onNavigate={navigate} onBackPrev={goBack} />
        )}

        {page === "demo" && (
          <DemoPage onNavigate={navigate} onBackPrev={goBack} />
        )}

        {page === "participation" && (
          <ParticipationPage onNavigate={navigate} onBackPrev={goBack} />
        )}

        {page === "poc" && (
          <PocPage onNavigate={navigate} onBackPrev={goBack} />
        )}
      </main>

      <Footer />
    </div>
  );
}