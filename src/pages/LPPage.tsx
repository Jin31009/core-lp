import Header from "../components/lp/Header";
import HeroSection from "../components/lp/HeroSection";
import ProblemSection from "../components/lp/ProblemSection";
import RedefinitionSection from "../components/lp/RedefinitionSection";
import DemoSection from "../components/lp/DemoSection";
import NextStepSection from "../components/lp/NextStepSection";
import CTASection from "../components/lp/CTASection";
import Footer from "../components/lp/Footer";
import useReveal from "../hooks/useReveal";

type LPPageProps = {
  setPage: (page: string) => void;
};

const revealClassName =
  "opacity-0 translate-y-6 transition-all duration-700 ease-out will-change-transform";

export default function LPPage({ setPage }: LPPageProps) {
  useReveal();

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-stone-900">
      <Header
        onOpenTop={() => setPage("lp")}
        onOpenDemo={() => setPage("demo")}
        onOpenSlides={() => setPage("slides")}
      />

      <main>
        {/* HERO */}
        <HeroSection onOpenDemo={() => setPage("demo")} />

        {/* CORE */}
        <div id="problem" data-reveal className={revealClassName}>
          <ProblemSection />
        </div>

        <div id="redefinition" data-reveal className={revealClassName}>
          <RedefinitionSection
            onOpenMethod={() => setPage("structure")}
            onOpenValue={() => setPage("case")}
            onOpenExpansion={() => setPage("process")}
          />
        </div>

        {/* ACTION */}
        <div id="demo" data-reveal className={revealClassName}>
          <DemoSection onOpenDemo={() => setPage("demo")} />
        </div>

        <div id="next-step" data-reveal className={revealClassName}>
          <NextStepSection
            onOpenDemo={() => setPage("demo")}
            onOpenCase={() => setPage("case")}
            onOpenStructure={() => setPage("structure")}
            onOpenProcess={() => setPage("process")}
            onOpenSlides={() => setPage("slides")}
            onOpenNotes={() => window.open("https://note.com", "_blank")}
          />
        </div>

        <div data-reveal className={revealClassName}>
          <CTASection onOpenDemo={() => setPage("demo")} />
        </div>
      </main>

      <Footer
        onOpenTop={() => setPage("lp")}
        onOpenDemo={() => setPage("demo")}
        onOpenSlides={() => setPage("slides")}
      />
    </div>
  );
}