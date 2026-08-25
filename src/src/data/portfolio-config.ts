import type { Locale } from "../i18n";

export type ContentMode = "github" | "http" | "local";
export type PortfolioRuntimeConfig = {
  person: { name: string; firstName: string; terminalHost: string };
  assistant: { displayName: string; uri: string; title: string; subtitle: string; disclaimer: string };
  portfolioLabel: string;
  ai: { model: string };
  seo: { title: string; description: string; image: string };
  suggestions: Record<Locale, string[]>;
  content: {
    mode: ContentMode;
    github: { owner: string; repo: string; ref: string; path: string };
    http: { baseUrl: string; versionUrl?: string };
    local: { baseUrl: string; versionUrl?: string };
  };
};

export const defaultPortfolioConfig: PortfolioRuntimeConfig = {
  person: { name: "Maxime Lemenand", firstName: "Maxime", terminalHost: "portfolio.local" },
  assistant: {
    displayName: "Assistant de Maxime",
    uri: "maxime://assistant",
    title: "Que voulez-vous savoir sur Maxime ?",
    subtitle: "DevOps · SRE · Automatisation · Self-hosting · AI Ops",
    disclaimer: "Markdown portfolio · réponses générées par IA",
  },
  portfolioLabel: "portfolio.cli — embedded",
  ai: { model: "openrouter/free" },
  seo: {
    title: "Maxime Lemenand | Terminal Portfolio",
    description: "Infrastructure / DevOps terminal portfolio focused on automation, self-hosting and AI-assisted operations.",
    image: "/og-image.png",
  },
  suggestions: { fr: [], en: [], es: [] },
  content: {
    mode: "github",
    github: { owner: "Maxxiime", repo: "terminal-portfolio", ref: "main", path: "content" },
    http: { baseUrl: "", versionUrl: "" },
    local: { baseUrl: "/data/content", versionUrl: "" },
  },
};

let runtimeConfig = defaultPortfolioConfig;

export const getPortfolioConfig = () => runtimeConfig;

const mergeConfig = (input: Partial<PortfolioRuntimeConfig>): PortfolioRuntimeConfig => ({
  ...defaultPortfolioConfig,
  ...input,
  person: {
    ...defaultPortfolioConfig.person,
    ...input.person,
    name: input.person?.name || defaultPortfolioConfig.person.name,
    firstName: input.person?.firstName || defaultPortfolioConfig.person.firstName,
    terminalHost: input.person?.terminalHost || defaultPortfolioConfig.person.terminalHost,
  },
  assistant: { ...defaultPortfolioConfig.assistant, ...input.assistant },
  portfolioLabel: input.portfolioLabel || defaultPortfolioConfig.portfolioLabel,
  ai: { ...defaultPortfolioConfig.ai, ...input.ai },
  seo: { ...defaultPortfolioConfig.seo, ...input.seo },
  suggestions: { ...defaultPortfolioConfig.suggestions, ...input.suggestions },
  content: {
    ...defaultPortfolioConfig.content,
    ...input.content,
    mode: input.content?.mode || defaultPortfolioConfig.content.mode,
    github: {
      ...defaultPortfolioConfig.content.github,
      ...input.content?.github,
      owner: input.content?.github?.owner || defaultPortfolioConfig.content.github.owner,
      repo: input.content?.github?.repo || defaultPortfolioConfig.content.github.repo,
      ref: input.content?.github?.ref || defaultPortfolioConfig.content.github.ref,
      path: input.content?.github?.path || defaultPortfolioConfig.content.github.path,
    },
    http: { ...defaultPortfolioConfig.content.http, ...input.content?.http },
    local: { ...defaultPortfolioConfig.content.local, ...input.content?.local },
  },
});

export async function loadPortfolioConfig() {
  if (typeof window === "undefined") return runtimeConfig;
  try {
    const response = await fetch("/config/portfolio.json", { cache: "no-store" });
    if (response.ok) runtimeConfig = mergeConfig(await response.json() as Partial<PortfolioRuntimeConfig>);
    const runtimeResponse = await fetch("/runtime-config.json", { cache: "no-store" });
    if (runtimeResponse.ok) runtimeConfig = mergeConfig(await runtimeResponse.json() as Partial<PortfolioRuntimeConfig>);
  } catch {
    // Bundled defaults remain usable when the optional runtime file is unavailable.
  }
  return runtimeConfig;
}
