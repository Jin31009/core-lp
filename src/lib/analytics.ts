type EventParams = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  if (typeof window === "undefined") return;

  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    void args;
    window.dataLayer?.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", gaId, {
    debug_mode: true,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);
}

export const trackEvent = (name: string, params: EventParams = {}) => {
  console.log("[analytics]", name, params);

  if (typeof window === "undefined" || typeof window.gtag === "undefined") return;

  window.gtag("event", name, params);
};
