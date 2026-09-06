import { StrictMode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "../utils/test-utils";
import { languageContext } from "../App";
import { termContext } from "../components/Terminal";
import Question from "../components/commands/Question";
import type { Locale } from "../i18n";

const reply = (answer: string, ok = true) => ({ ok, text: async () => JSON.stringify({ choices: [{ message: { content: answer } }] }) });
function entry(locale: Locale, id: string) {
  return <languageContext.Provider value={{ locale, browserLocale: "fr", setLocale: () => undefined }}>
    <termContext.Provider value={{ arg: [id], history: [], rerender: true, index: 0 }}><Question key={id} /></termContext.Provider>
  </languageContext.Provider>;
}
afterEach(() => { vi.unstubAllGlobals(); });

describe("CLI question lifecycle", () => {
  it("keeps completed answers and uses the new language only for a new command", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(reply("Réponse conservée")).mockResolvedValueOnce(reply("New answer"));
    vi.stubGlobal("fetch", fetchMock);
    const view = render(entry("fr", "completed-command"));
    await screen.findByText("Réponse conservée");
    view.rerender(entry("en", "completed-command"));
    view.rerender(entry("es", "completed-command"));
    expect(screen.getByText("Réponse conservée")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    view.rerender(entry("en", "new-command"));
    await screen.findByText("New answer");
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][1].headers["X-Portfolio-Language"]).toBe("fr");
    expect(fetchMock.mock.calls[1][1].headers["X-Portfolio-Language"]).toBe("en");
  });

  it("keeps an in-flight request in its original language without resending it", async () => {
    let finish!: (value: ReturnType<typeof reply>) => void;
    const fetchMock = vi.fn(() => new Promise(resolve => { finish = resolve; }));
    vi.stubGlobal("fetch", fetchMock);
    const view = render(entry("fr", "pending-command"));
    view.rerender(entry("es", "pending-command"));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await act(async () => finish(reply("Réponse de la requête initiale")));
    expect(screen.getByText("Réponse de la requête initiale")).toBeInTheDocument();
    view.rerender(entry("en", "pending-command"));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("does not retry a failed command on a language change", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("Diagnostic indisponible"));
    vi.stubGlobal("fetch", fetchMock);
    const view = render(entry("fr", "failed-command"));
    await screen.findByText("Diagnostic indisponible");
    view.rerender(entry("es", "failed-command"));
    expect(screen.getByText("Diagnostic indisponible")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("sends only one request when StrictMode replays the mounting effect", async () => {
    const fetchMock = vi.fn().mockResolvedValue(reply("Une seule requête"));
    vi.stubGlobal("fetch", fetchMock);
    render(<StrictMode>{entry("fr", "strict-command")}</StrictMode>);
    await screen.findByText("Une seule requête");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
