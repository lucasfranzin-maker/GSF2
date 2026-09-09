import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const STORAGE_KEY = "gsf-cookie-consent"; // "accepted" | "declined"

function readStoredConsent() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function runAnalyticsInit() {
  if (typeof window !== "undefined" && typeof window.__gsfInitAnalytics === "function") {
    window.__gsfInitAnalytics();
  }
}

// Shown once per browser until the visitor makes a choice. Analytics (PostHog,
// see index.html) are only initialised after "accept" - never on page load by
// default, and never as a side effect of merely dismissing the banner.
export const CookieConsent = () => {
  const { t } = useLang();
  const c = t.cookieConsent;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored === "accepted") {
      runAnalyticsInit();
    } else if (!stored) {
      setVisible(true);
    }
  }, []);

  const decide = (value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* private browsing / storage disabled - the choice just won't persist */
    }
    if (value === "accepted") {
      runAnalyticsInit();
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-5" role="region" aria-label={c.message} data-testid="cookie-consent-banner">
      <div
        className="mx-auto max-w-3xl rounded-[10px] border bg-white shadow-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4"
        style={{ borderColor: "var(--gsf-border)" }}
      >
        <p className="gsf-body text-sm flex-1">
          {c.message}{" "}
          <Link
            to="/datenschutz"
            onClick={() => setVisible(false)}
            className="underline underline-offset-2"
            style={{ color: "var(--gsf-ink)" }}
          >
            {c.linkText}
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="gsf-btn-secondary !py-2.5 !px-4 text-[12px]"
            data-testid="cookie-consent-reject"
          >
            {c.reject}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="gsf-btn-primary !py-2.5 !px-4 text-[12px]"
            data-testid="cookie-consent-accept"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
};
