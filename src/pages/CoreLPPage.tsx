import CoreHeader from "../components/core/CoreHeader";
import HeroSection from "../components/core/HeroSection";
import ProblemSection from "../components/core/ProblemSection";
import CoreSection from "../components/core/CoreSection";
import MissionSection from "../components/core/MissionSection";
import PrototypeSection from "../components/core/PrototypeSection";
import CtaSection from "../components/core/CtaSection";
import FooterSection from "../components/core/FooterSection";

type Props = {
  setPage: (page: string) => void;
};

export default function CoreLPPage({ setPage }: Props) {
  return (
    <main style={{ background: "#f7f5f2", color: "#111" }}>
      <CoreHeader setPage={setPage} />

      <HeroSection setPage={setPage} />
      <ProblemSection />
      <CoreSection />
      <MissionSection />
      <PrototypeSection setPage={setPage} />
      <CtaSection setPage={setPage} />
      <FooterSection setPage={setPage} />
    </main>
  );
}
