type EventParams = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  if (typeof window === "undefined") return;

  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
    window.gtag("js", new Date());
    window.gtag("config", gaId, { debug_mode: true });
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.onload = () => {
    const gtag = window.gtag;
    if (!gtag) return;

    gtag("js", new Date());
    gtag("config", gaId, { debug_mode: true });
  };
  document.head.appendChild(script);
}

export const trackEvent = (name: string, params: EventParams = {}) => {
  console.log("[analytics]", name, params);

  if (typeof window === "undefined" || typeof window.gtag === "undefined") return;

  window.gtag("event", name, params);
};
