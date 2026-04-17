import { trackEvent } from "../../lib/analytics";

type SectionScrollCueProps = {
  targetId: string;
  subdued?: boolean;
  emphasis?: "soft" | "normal" | "strong";
};

export default function SectionScrollCue({
  targetId,
  subdued = false,
  emphasis = "normal",
}: SectionScrollCueProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentSection = event.currentTarget.closest("section")?.id || "unknown";

    trackEvent("lp_scroll_click", {
      from: currentSection,
      to: targetId,
    });

    const next = document.getElementById(targetId);
    if (!next) return;

    next.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className={`flex justify-center ${
        emphasis === "strong" ? "mt-12" : subdued ? "mt-20" : "mt-16"
      }`}
    >
      <button
        type="button"
        onClick={handleClick}
        className={`flex flex-col items-center gap-2 transition ${
          emphasis === "strong"
            ? "text-stone-500 hover:text-stone-700"
            : subdued
            ? "text-stone-300 hover:text-stone-500"
            : "text-stone-400 hover:text-stone-600"
        }`}
        aria-label={`Scroll to ${targetId}`}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
          Scroll
        </span>
        <span className="text-[18px] leading-none">↓</span>
      </button>
    </div>
  );
}
