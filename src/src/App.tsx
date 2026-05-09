import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/useTheme";
import GlobalStyle from "./components/styles/GlobalStyle";
import Terminal from "./components/Terminal";
import { getFromLS, setToLS } from "./utils/storage";
import { Locale, resolveLocale, supportedLocales } from "./i18n";

export const languageContext = createContext<{
  locale: Locale;
  browserLocale: Locale;
  setLocale: (next: Locale) => void;
}>({
  locale: "en",
  browserLocale: "en",
  setLocale: () => undefined,
});

const detectBrowserLocale = (): Locale => {
  if (typeof window === "undefined") return "en";

  const candidates = [
    ...(window.navigator.languages || []),
    window.navigator.language,
  ].filter(Boolean);

  const matched = candidates.find(candidate =>
    supportedLocales.some(locale => candidate.toLowerCase().startsWith(locale))
  );

  return resolveLocale(matched || window.navigator.language);
};

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "en";
  return resolveLocale(getFromLS("tsn-language") || detectBrowserLocale());
};

function App() {
  const { theme, themeLoaded } = useTheme();
  const [browserLocale, setBrowserLocale] = useState<Locale>(detectBrowserLocale);
  const [locale, setSelectedLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.addEventListener(
      "keydown",
      e => {
        ["ArrowUp", "ArrowDown"].indexOf(e.code) > -1 && e.preventDefault();
      },
      false
    );
  }, []);

  useEffect(() => {
    const detected = detectBrowserLocale();
    const saved = getFromLS("tsn-language");
    setBrowserLocale(detected);
    setSelectedLocale(resolveLocale(saved || detected));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const themeColor = theme.colors?.body;

    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    const maskIcon = document.querySelector("link[rel=mask-icon]");
    const metaMsTileColor = document.querySelector(
      "meta[name=msapplication-TileColor]"
    );

    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
    metaMsTileColor && metaMsTileColor.setAttribute("content", themeColor);
    maskIcon && maskIcon.setAttribute("color", themeColor);
  }, [theme]);

  const localeSwitcher = (nextLocale: Locale) => {
    setToLS("tsn-language", nextLocale);
    setSelectedLocale(nextLocale);
  };

  return (
    <>
      <h1 className="sr-only" aria-label="Terminal Portfolio">
        Terminal Portfolio
      </h1>
      {themeLoaded && (
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <languageContext.Provider
            value={{ locale, browserLocale, setLocale: localeSwitcher }}
          >
            <Terminal />
          </languageContext.Provider>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
