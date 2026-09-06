import { useCallback, useEffect, useState } from "react";
import { resolveLocale, supportedLocales, type Locale } from "../i18n";

const LANGUAGE_KEY = "portfolio-language";
const LEGACY_LANGUAGE_KEY = "tsn-language";
const LANGUAGE_EVENT = "portfolio-language-change";

const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && supportedLocales.some(locale => locale === value);

export const detectBrowserLocale = (): Locale => {
  if (typeof window === "undefined") return "en";
  const candidates = [...(navigator.languages || []), navigator.language].filter(Boolean);
  const matched = candidates.find(candidate =>
    supportedLocales.some(locale => candidate.toLowerCase().split(/[-_]/)[0] === locale)
  );
  return resolveLocale(matched || navigator.language);
};

const getInitialLocale = (): Locale => {
  try {
    for (const key of [LANGUAGE_KEY, LEGACY_LANGUAGE_KEY]) {
      const saved = window.localStorage.getItem(key);
      if (isLocale(saved)) return saved;
    }
  } catch {
    // The browser preference still works when storage is unavailable.
  }
  return detectBrowserLocale();
};

/** Shared by the shell and the same-origin CLI iframe. */
export function usePortfolioLanguage() {
  const [locale, setSelectedLocale] = useState<Locale>(getInitialLocale);
  const [browserLocale] = useState<Locale>(detectBrowserLocale);

  const setLocale = useCallback((next: Locale) => {
    setSelectedLocale(next);
    try {
      window.localStorage.setItem(LANGUAGE_KEY, next);
      window.localStorage.setItem(LEGACY_LANGUAGE_KEY, next);
    } catch {
      // Keep language switching usable without persistence.
    }
    window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: next }));
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== LANGUAGE_KEY && event.key !== LEGACY_LANGUAGE_KEY) return;
      setSelectedLocale(isLocale(event.newValue) ? event.newValue : getInitialLocale());
    };
    const onLanguageChange = (event: Event) => {
      const next: unknown = (event as CustomEvent).detail;
      if (isLocale(next)) setSelectedLocale(next);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(LANGUAGE_EVENT, onLanguageChange);
    setSelectedLocale(getInitialLocale());
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(LANGUAGE_EVENT, onLanguageChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return { locale, browserLocale, setLocale };
}
