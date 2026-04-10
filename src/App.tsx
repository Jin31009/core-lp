

// ===== pages（直下）=====
import TopPage from "./pages/TopPage";
import DemoPage from "./pages/DemoPage";
import CoreLPPage from "./pages/CoreLPPage";
import ParticipationPage from "./pages/ParticipationPage";
import SlidesPage from "./pages/SlidesPage";
import ContactPage from "./pages/ContactPage";

// ===== pages（フォルダ内）=====
import StructurePage from "./pages/structure/StructurePage";
import ProcessPage from "./pages/process/ProcessPage";

export default function App() {
  const [page, setPage] = React.useState("top");

  return (
    <div>
      {/* TOP */}
      {page === "top" && <TopPage setPage={setPage} />}

      {/* CORE LP */}
      {page === "corelp" && <CoreLPPage setPage={setPage} />}

      {/* PROTOTYPE / DEMO */}
      {page === "prototype" && <DemoPage setPage={setPage} />}

      {/* STRUCTURE */}
      {page === "structure" && <StructurePage setPage={setPage} />}

      {/* CASE */}

      {/* PROCESS（使う場合だけ残す） */}
      {page === "process" && <ProcessPage setPage={setPage} />}

      {/* EVIDENCE */}

      {/* CONTACT / PoC参加ページ */}
      {page === "contact" && <ContactPage setPage={setPage} />}

      {/* 旧 participation ページを残す場合 */}
      {page === "participation" && <ParticipationPage setPage={setPage} />}

      {/* SLIDES */}
      {page === "slides" && <SlidesPage setPage={setPage} />}
    </div>
  );
}