import Header from "../components/lp/Header";
import Footer from "../components/lp/Footer";
import HeroSection from "../components/lp/HeroSection";
import ProblemSection from "../components/lp/ProblemSection";
import RedefinitionSection from "../components/lp/RedefinitionSection";
import DemoBridgeSection from "../components/lp/DemoBridgeSection";
import PrototypeSection from "../components/lp/PrototypeSection";
import ValueSection from "../components/lp/ValueSection";
import PrototypeCTASection from "../components/lp/PrototypeCTASection";

type Props = {
  setPage: (page: string) => void;
};

export default function LPPage({ setPage }: Props) {
  return (
    <main className="bg-[#f7f5f2] text-stone-900">
      <Header
        onOpenTop={() => setPage("corelp")}
        onOpenDemo={() => setPage("demo")}
      />

      <HeroSection onOpenDemo={() => setPage("demo")} />
      <ProblemSection />
      <RedefinitionSection />
      <DemoBridgeSection />
      <PrototypeSection onNavigateDemo={() => setPage("demo")} />
      <ValueSection />
      <PrototypeCTASection onNavigateContact={() => setPage("contact")} />

      <Footer
        onOpenTop={() => setPage("corelp")}
        onOpenDemo={() => setPage("demo")}
      />
    </main>
  );
}
