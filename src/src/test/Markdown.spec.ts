import { describe, expect, it } from "vitest";
import {
  getMarkdownDocument,
  isUsableMarkdownDocument,
  type MarkdownTopic,
} from "../data/markdown";
import type { Locale } from "../i18n";

const locales: Locale[] = ["fr", "en", "es"];
const topics: MarkdownTopic[] = [
  "about",
  "ai",
  "certification",
  "education",
  "experience",
  "lab",
  "projects",
  "skills",
  "welcome",
];

describe("Markdown portfolio content", () => {
  it("ships every topic in every supported language", () => {
    for (const locale of locales) {
      for (const topic of topics) {
        const document = getMarkdownDocument(locale, topic);
        expect(document.trim(), `${locale}/${topic}.md`).not.toBe("");
        expect(document.toLowerCase(), `${locale}/${topic}.md`).not.toContain("<!doctype html");
      }
    }
  });

  it("rejects a SPA fallback returned in place of Markdown", () => {
    expect(isUsableMarkdownDocument("<!doctype html><html></html>", "text/html")).toBe(false);
    expect(isUsableMarkdownDocument("<html><body>SPA</body></html>", null)).toBe(false);
    expect(isUsableMarkdownDocument("# About\n\nPortfolio content", "text/markdown")).toBe(true);
  });
});
