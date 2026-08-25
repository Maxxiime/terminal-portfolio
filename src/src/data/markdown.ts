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

export type MarkdownTopic = "about" | "ai" | "certification" | "education" | "experience" | "lab" | "projects" | "skills" | "welcome";
type MarkdownByLocale = Partial<Record<Locale, string>>;

const documents: Record<MarkdownTopic, MarkdownByLocale> = {
  about: { fr: aboutFr }, ai: { fr: aiFr }, certification: { fr: certificationFr },
  education: { fr: educationFr }, experience: { fr: experienceFr }, lab: { fr: labFr },
  projects: { fr: projectsFr }, skills: { fr: skillsFr }, welcome: { fr: welcomeFr },
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
