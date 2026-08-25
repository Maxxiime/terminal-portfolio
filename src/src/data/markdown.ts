import type { Locale } from "../i18n";
import aboutFr from "../../../content/fr/about.md?raw";
import aiFr from "../../../content/fr/ai.md?raw";
import certificationFr from "../../../content/fr/certification.md?raw";
import educationFr from "../../../content/fr/education.md?raw";
import experienceFr from "../../../content/fr/experience.md?raw";
import labFr from "../../../content/fr/lab.md?raw";
import projectsFr from "../../../content/fr/projects.md?raw";
import skillsFr from "../../../content/fr/skills.md?raw";
import welcomeFr from "../../../content/fr/welcome.md?raw";
import aboutEn from "../../../content/en/about.md?raw";
import skillsEn from "../../../content/en/skills.md?raw";
import welcomeEn from "../../../content/en/welcome.md?raw";
import aboutEs from "../../../content/es/about.md?raw";
import skillsEs from "../../../content/es/skills.md?raw";
import welcomeEs from "../../../content/es/welcome.md?raw";
import { loadPortfolioConfig } from "./portfolio-config";

export type MarkdownTopic = "about" | "ai" | "certification" | "education" | "experience" | "lab" | "projects" | "skills" | "welcome";
type MarkdownByLocale = Partial<Record<Locale, string>>;
const CONTENT_CACHE_KEY = "terminal-portfolio-markdown-cache";

const documents: Record<MarkdownTopic, MarkdownByLocale> = {
  about: { fr: aboutFr, en: aboutEn, es: aboutEs }, ai: { fr: aiFr }, certification: { fr: certificationFr },
  education: { fr: educationFr }, experience: { fr: experienceFr }, lab: { fr: labFr },
  projects: { fr: projectsFr }, skills: { fr: skillsFr, en: skillsEn, es: skillsEs }, welcome: { fr: welcomeFr, en: welcomeEn, es: welcomeEs },
};

export const getMarkdownDocument = (locale: Locale, topic: MarkdownTopic) => documents[topic][locale] ?? documents[topic].fr ?? "";

export type MarkdownSection = { title: string; paragraphs: string[]; items: string[] };

export const parseMarkdownSections = (markdown: string): MarkdownSection[] => {
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection = { title: "", paragraphs: [], items: [] };
  let paragraph: string[] = [];
  const flushParagraph = () => { const value = paragraph.join(" ").trim(); if (value) current.paragraphs.push(value); paragraph = []; };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) { flushParagraph(); continue; }
    const heading = line.match(/^#{1,6}\s+(.+)$/);
    if (heading) { flushParagraph(); if (current.title || current.paragraphs.length || current.items.length) sections.push(current); current = { title: heading[1].trim(), paragraphs: [], items: [] }; continue; }
    const item = line.match(/^[-*]\s+(.+)$/);
    if (item) { flushParagraph(); current.items.push(item[1].trim()); continue; }
    if (!line.startsWith("```")) paragraph.push(line.replace(/\*\*(.*?)\*\*/g, "$1"));
  }
  flushParagraph();
  if (current.title || current.paragraphs.length || current.items.length) sections.push(current);
  return sections;
};

export const getMarkdownSections = (locale: Locale, topic: MarkdownTopic) => parseMarkdownSections(getMarkdownDocument(locale, topic));

export const getMarkdownKnowledgeBase = (locale: Locale) =>
  (Object.keys(documents) as MarkdownTopic[])
    .map(topic => `## ${topic}\n\n${getMarkdownDocument(locale, topic)}`)
    .join("\n\n")
    .trim();

export async function loadMarkdownContent() {
  if (typeof window === "undefined") return;

  const config = await loadPortfolioConfig();
  const source = config.content;
  const externalSource = source.mode === "http" ? source.http : source.local;
  const sourceId = source.mode === "github"
    ? `github:${source.github.owner}/${source.github.repo}/${source.github.ref}/${source.github.path}`
    : `${source.mode}:${source[source.mode].baseUrl}`;
  const contentRoot = source.mode === "github"
    ? `https://raw.githubusercontent.com/${source.github.owner}/${source.github.repo}/${source.github.ref}/${source.github.path}`
    : externalSource.baseUrl.replace(/\/$/, "");
  const versionUrl = source.mode === "github"
    ? `https://api.github.com/repos/${source.github.owner}/${source.github.repo}/commits/${source.github.ref}`
    : externalSource.versionUrl;

  type CachedContent = { sourceId: string; commitSha: string | null; documents: Partial<Record<Locale, Partial<Record<MarkdownTopic, string>>>> };
  let remoteSha: string | null = null;
  if (versionUrl) {
    try {
      const response = await fetch(versionUrl, { headers: { Accept: "application/json, text/plain" } });
      if (response.ok) {
        const value = await response.text();
        try { remoteSha = (JSON.parse(value) as { sha?: string; version?: string }).sha || (JSON.parse(value) as { version?: string }).version || value; }
        catch { remoteSha = value; }
      }
    } catch {
      // The bundled Markdown remains available when the source is temporarily unreachable.
    }
  }

  let cached: CachedContent | null = null;
  try { cached = JSON.parse(window.localStorage.getItem(CONTENT_CACHE_KEY) || "null") as CachedContent | null; } catch { cached = null; }
  if (cached && cached.sourceId === sourceId && cached.commitSha && cached.commitSha === remoteSha) {
    for (const topic of Object.keys(documents) as MarkdownTopic[]) {
      for (const locale of ["fr", "en", "es"] as Locale[]) {
        const value = cached.documents[locale]?.[topic];
        if (value) documents[topic][locale] = value;
      }
    }
    return;
  }

  const locales = ["fr", "en", "es"] as Locale[];
  const topics = Object.keys(documents) as MarkdownTopic[];
  const loaded = await Promise.all(locales.flatMap(locale => topics.map(async topic => {
    for (const candidate of locale === "fr" ? [locale] : [locale, "fr" as Locale]) {
      try {
        const response = await fetch(`${contentRoot}/${candidate}/${topic}.md`, { headers: { Accept: "text/plain" } });
        if (response.ok) return [locale, topic, await response.text()] as const;
      } catch {
        // Try the French fallback before keeping the bundled content.
      }
    }
    return [locale, topic, null] as const;
  })));

  const snapshot: CachedContent = { sourceId, commitSha: remoteSha, documents: {} };
  for (const [locale, topic, value] of loaded) {
    if (!value) continue;
    documents[topic][locale] = value;
    snapshot.documents[locale] ||= {};
    snapshot.documents[locale]![topic] = value;
  }
  try { window.localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(snapshot)); } catch { /* Cache is optional. */ }
}
