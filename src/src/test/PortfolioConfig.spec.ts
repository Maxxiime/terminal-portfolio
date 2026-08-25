import { describe, expect, it } from "vitest";
import { getLocalizedText } from "../data/portfolio-config";

describe("portfolio runtime configuration", () => {
  it("selects the assistant label matching the active language", () => {
    const title = {
      fr: "Que voulez-vous savoir sur Maxime ?",
      en: "What would you like to know about Maxime?",
      es: "¿Qué quieres saber sobre Maxime?",
    };

    expect(getLocalizedText(title, "fr")).toBe(title.fr);
    expect(getLocalizedText(title, "en")).toBe(title.en);
    expect(getLocalizedText(title, "es")).toBe(title.es);
  });

  it("keeps backward compatibility with a single string", () => {
    expect(getLocalizedText("Same label", "fr")).toBe("Same label");
  });
});
