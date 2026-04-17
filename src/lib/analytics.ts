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

  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.onload = () => {
    if (typeof window.gtag === "undefined") return;

    window.gtag("js", new Date());
    window.gtag("config", gaId);
  };
  document.head.appendChild(script);
}

export const trackEvent = (name: string, params: EventParams = {}) => {
  console.log("[analytics]", name, params);

  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window.gtag("event", name, params);
  }
};
