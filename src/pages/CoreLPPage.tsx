import CoreHeader from "../components/core/CoreHeader";
import HeroSection from "../components/core/HeroSection";
import ProblemSection from "../components/core/ProblemSection";
import CoreSection from "../components/core/CoreSection";
import PrototypeSection from "../components/core/PrototypeSection";
import MissionSection from "../components/core/MissionSection";
import CtaSection from "../components/core/CtaSection";
import FooterSection from "../components/core/FooterSection";

type Props = {
  setPage: (page: string) => void;
};

export default function CoreLPPage({ setPage }: Props) {
  return (
    <main style={{ background: "#f7f5f2", color: "#111" }}>
      <CoreHeader setPage={setPage} />

      <HeroSection />
      <ProblemSection />
      <CoreSection />
      <PrototypeSection setPage={setPage} />
      <MissionSection />
      <CtaSection setPage={setPage} />
      <FooterSection />
    </main>
  );
}