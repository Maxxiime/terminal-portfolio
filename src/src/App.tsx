import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/useTheme";
import GlobalStyle from "./components/styles/GlobalStyle";
import Terminal from "./components/Terminal";
import type { Locale } from "./i18n";
import { usePortfolioLanguage } from "./hooks/usePortfolioLanguage";
import { loadMarkdownContent } from "./data/markdown";
import { initializeAnalytics, loadPortfolioConfig } from "./data/portfolio-config";

export const languageContext = createContext<{
  locale: Locale;
  browserLocale: Locale;
  setLocale: (next: Locale) => void;
}>({
  locale: "en",
  browserLocale: "en",
  setLocale: () => undefined,
});

function App() {
  const { theme, themeLoaded } = useTheme();
  const [, setMarkdownVersion] = useState(0);
  const { locale, browserLocale, setLocale } = usePortfolioLanguage();

  useEffect(() => {
    void Promise.all([loadPortfolioConfig(), loadMarkdownContent()]).then(() => {
      initializeAnalytics();
      setMarkdownVersion(version => version + 1);
    });
  }, []);

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

  return (
    <>
      <h1 className="sr-only" aria-label="Terminal Portfolio">
        Terminal Portfolio
      </h1>
      {themeLoaded && (
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <languageContext.Provider
            value={{ locale, browserLocale, setLocale }}
          >
            <Terminal />
          </languageContext.Provider>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
