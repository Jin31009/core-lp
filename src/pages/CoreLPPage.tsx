import { useEffect } from "react";

import CoreHeader from "../components/core/CoreHeader";
import HeroSection from "../components/core/HeroSection";
import ProblemSection from "../components/core/ProblemSection";
import CoreSection from "../components/core/CoreSection";
import MissionSection from "../components/core/MissionSection";
import PocBridgeSection from "../components/core/PocBridgeSection";
import PrototypeSection from "../components/core/PrototypeSection";
import CtaSection from "../components/core/CtaSection";
import FooterSection from "../components/core/FooterSection";
import { trackEvent } from "../lib/analytics";

type Props = {
  setPage: (page: string) => void;
};

export default function CoreLPPage({ setPage }: Props) {
  useEffect(() => {
    const sectionIds = ["hero", "problem", "redefinition", "method", "poc-bridge", "demo", "cta"];
    const seen = new Set<string>();
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;
          if (!sectionId || seen.has(sectionId)) return;

          seen.add(sectionId);
          trackEvent("lp_section_view", {
            section: sectionId,
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.4,
        rootMargin: "-10% 0px -15% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ background: "#f7f5f2", color: "#111" }}>
      <CoreHeader setPage={setPage} />

      <HeroSection setPage={setPage} />
      <ProblemSection />
      <CoreSection />
      <MissionSection />
      <PocBridgeSection setPage={setPage} />
      <PrototypeSection setPage={setPage} />
      <CtaSection setPage={setPage} />
      <FooterSection setPage={setPage} />
    </main>
  );
}
