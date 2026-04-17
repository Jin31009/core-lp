type EventParams = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
    __gaScriptLoading?: boolean;
    __gaConfigured?: boolean;
  }
}

function ensureAnalyticsBootstrap() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer?.push(arguments);
    };
}

function configureAnalytics(gaId: string) {
  if (typeof window === "undefined") return;

  ensureAnalyticsBootstrap();
  if (!window.gtag || window.__gaConfigured) return;

  window.gtag("js", new Date());
  window.gtag("config", gaId, { debug_mode: true });
  window.__gaConfigured = true;
}

export function initAnalytics() {
  if (typeof window === "undefined") return;

  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId) return;

  ensureAnalyticsBootstrap();

  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
    configureAnalytics(gaId);
    return;
  }

  if (window.__gaScriptLoading) return;
  window.__gaScriptLoading = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.onload = () => {
    window.__gaScriptLoading = false;
    configureAnalytics(gaId);
  };
  script.onerror = () => {
    window.__gaScriptLoading = false;
  };
  document.head.appendChild(script);
}

export const trackEvent = (name: string, params: EventParams = {}) => {
  console.log("[analytics]", name, params);

  if (typeof window === "undefined") return;

  ensureAnalyticsBootstrap();
  if (typeof window.gtag === "undefined") return;

  window.gtag("event", name, params);
};
