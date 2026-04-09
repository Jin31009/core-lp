import CoreHeader from "../components/core/CoreHeader";
import HeroSection from "../components/core/HeroSection";
import ProblemSection from "../components/core/ProblemSection";
import CoreSection from "../components/core/CoreSection";
import PrototypeSection from "../components/core/PrototypeSection";
import TrustSection from "../components/core/TrustSection";
import InterfaceSection from "../components/core/InterfaceSection";
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
      <TrustSection />
      <InterfaceSection setPage={setPage} />
      <CtaSection setPage={setPage} />
      <FooterSection />
    </main>
  );
}
