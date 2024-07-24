declare global {
  interface Window {
    gtag: (option: string, gaTrackingId: string, options: Record<string, unknown>) => void;
  }
}

export const pageview = (url: string, trackingId: string) => {
  if (!window.gtag) {
    console.warn("window.gtag is not defined.");
    return;
  }
  window.gtag("config", trackingId, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: Record<string, string>) => {
  if (!window.gtag) {
    console.warn("window.gtag is not defined.");
    return;
  }
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
