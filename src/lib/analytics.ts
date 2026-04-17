type EventParams = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function setupGtag() {
  if (typeof window === "undefined" || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer?.push(args);
  };
}

export function initAnalytics() {
  if (typeof window === "undefined") return;

  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId) return;

  setupGtag();
  const gtag = window.gtag;
  if (!gtag) return;

  gtag("js", new Date());
  gtag("config", gaId, {
    debug_mode: true,
  });

  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);
}

export const trackEvent = (name: string, params: EventParams = {}) => {
  console.log("[analytics]", name, params);

  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window.gtag("event", name, params);
  }
};
