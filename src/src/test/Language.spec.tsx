import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "../utils/test-utils";
import { usePortfolioLanguage } from "../hooks/usePortfolioLanguage";
import { languageContext } from "../App";
import { termContext } from "../components/Terminal";
import Language from "../components/commands/Language";

function LanguageConsumer({ name }: { name: string }) {
  const { locale, setLocale } = usePortfolioLanguage();
  return <div><output data-testid={name}>{locale}</output><button onClick={() => setLocale("es")}>{name} Spanish</button></div>;
}

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(navigator, "languages", "get").mockReturnValue(["fr-CA", "en-CA"]);
});
afterEach(() => { vi.restoreAllMocks(); });

describe("shared portfolio language", () => {
  it("uses browser preferences without persisting an automatic choice", () => {
    render(<LanguageConsumer name="shell" />);
    expect(screen.getByTestId("shell")).toHaveTextContent("fr");
    expect(document.documentElement.lang).toBe("fr");
    expect(localStorage.getItem("portfolio-language")).toBeNull();
  });

  it("chooses the first supported browser preference", () => {
    vi.spyOn(navigator, "languages", "get").mockReturnValue(["de-DE", "es-MX", "en-US"]);
    render(<LanguageConsumer name="shell" />);
    expect(screen.getByTestId("shell")).toHaveTextContent("es");
  });

  it("restores an explicit choice before the browser preference", () => {
    localStorage.setItem("portfolio-language", "en");
    localStorage.setItem("tsn-language", "es");
    render(<LanguageConsumer name="shell" />);
    expect(screen.getByTestId("shell")).toHaveTextContent("en");
  });

  it("restores the legacy CLI preference", () => {
    localStorage.setItem("tsn-language", "es");
    render(<LanguageConsumer name="cli" />);
    expect(screen.getByTestId("cli")).toHaveTextContent("es");
  });

  it("updates consumers in the same document and saves both keys", () => {
    render(<><LanguageConsumer name="shell" /><LanguageConsumer name="cli" /></>);
    fireEvent.click(screen.getByRole("button", { name: "cli Spanish" }));
    expect(screen.getByTestId("shell")).toHaveTextContent("es");
    expect(screen.getByTestId("cli")).toHaveTextContent("es");
    expect(localStorage.getItem("portfolio-language")).toBe("es");
    expect(localStorage.getItem("tsn-language")).toBe("es");
  });

  it("reacts to another window without writing back and creating a loop", () => {
    render(<LanguageConsumer name="cli" />);
    const write = vi.spyOn(Storage.prototype, "setItem");
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: "portfolio-language", newValue: "en" })));
    expect(screen.getByTestId("cli")).toHaveTextContent("en");
    expect(write).not.toHaveBeenCalled();
  });

  it("does not replay the last language command when the header changes language", () => {
    const setLocale = vi.fn();
    const entry = (locale: "fr" | "es", change: typeof setLocale) =>
      <languageContext.Provider value={{ locale, browserLocale: "fr", setLocale: change }}>
        <termContext.Provider value={{ arg: ["fr"], history: [], rerender: true, index: 0 }}><Language /></termContext.Provider>
      </languageContext.Provider>;
    const view = render(entry("fr", setLocale));
    expect(setLocale).toHaveBeenCalledTimes(1);
    const changedHandler = vi.fn();
    view.rerender(entry("es", changedHandler));
    expect(changedHandler).not.toHaveBeenCalled();
  });
});
