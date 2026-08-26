import type { Locale } from "../i18n";

export type ContentMode = "github" | "http" | "local";
export type LocalizedText = string | Partial<Record<Locale, string>>;
export type PortfolioRuntimeConfig = {
  person: { name: string; firstName: string; terminalHost: string };
  assistant: { displayName: string; uri: string; title: LocalizedText; subtitle: LocalizedText; disclaimer: LocalizedText };
  portfolioLabel: string;
  ai: { providerType: string; providerUrl: string; model: string; maxOutputTokens: number; privateContextFile: string };
  analytics: { umamiUrl: string; websiteId: string };
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
  person: { name: "Portfolio Owner", firstName: "Owner", terminalHost: "portfolio.local" },
  assistant: {
    displayName: "Portfolio Assistant",
    uri: "assistant://portfolio",
    title: {
      fr: "Que voulez-vous savoir ?",
      en: "What would you like to know?",
      es: "¿Qué quieres saber?",
    },
    subtitle: "Markdown content · AI-assisted answers",
    disclaimer: "Markdown content · AI-generated answers",
  },
  portfolioLabel: "portfolio.cli",
  ai: {
    providerType: "openai-compatible",
    providerUrl: "https://openrouter.ai/api/v1/chat/completions",
    model: "openrouter/free",
    maxOutputTokens: 5000,
    privateContextFile: "/run/portfolio-private/.IAinformation.md",
  },
  analytics: { umamiUrl: "", websiteId: "" },
  seo: {
    title: "Terminal Portfolio",
    description: "Interactive terminal portfolio.",
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

export const getLocalizedText = (value: LocalizedText, locale: Locale, fallback = "") => {
  if (typeof value === "string") return value || fallback;
  return value[locale] || value.fr || value.en || value.es || fallback;
};

const mergeConfig = (
  input: Partial<PortfolioRuntimeConfig>,
  base: PortfolioRuntimeConfig = defaultPortfolioConfig,
): PortfolioRuntimeConfig => ({
  ...base,
  ...input,
  person: {
    ...base.person,
    ...input.person,
    name: input.person?.name || base.person.name,
    firstName: input.person?.firstName || base.person.firstName,
    terminalHost: input.person?.terminalHost || base.person.terminalHost,
  },
  assistant: { ...base.assistant, ...input.assistant },
  portfolioLabel: input.portfolioLabel || base.portfolioLabel,
  ai: {
    ...base.ai,
    ...input.ai,
    providerType: input.ai?.providerType || base.ai.providerType,
    providerUrl: input.ai?.providerUrl || base.ai.providerUrl,
    model: input.ai?.model || base.ai.model,
    maxOutputTokens: Number.isFinite(input.ai?.maxOutputTokens) && Number(input.ai?.maxOutputTokens) > 0
      ? Math.trunc(Number(input.ai?.maxOutputTokens))
      : base.ai.maxOutputTokens,
    privateContextFile: input.ai?.privateContextFile || base.ai.privateContextFile,
  },
  analytics: { ...base.analytics, ...input.analytics },
  seo: { ...base.seo, ...input.seo },
  suggestions: { ...base.suggestions, ...input.suggestions },
  content: {
    ...base.content,
    ...input.content,
    mode: input.content?.mode || base.content.mode,
    github: {
      ...base.content.github,
      ...input.content?.github,
      owner: input.content?.github?.owner || base.content.github.owner,
      repo: input.content?.github?.repo || base.content.github.repo,
      ref: input.content?.github?.ref || base.content.github.ref,
      path: input.content?.github?.path || base.content.github.path,
    },
    http: { ...base.content.http, ...input.content?.http },
    local: { ...base.content.local, ...input.content?.local },
  },
});

export async function loadPortfolioConfig() {
  if (typeof window === "undefined") return runtimeConfig;
  try {
    const response = await fetch("/config/portfolio.json", { cache: "no-store" });
    if (response.ok) runtimeConfig = mergeConfig(await response.json() as Partial<PortfolioRuntimeConfig>);
  } catch {
    // Bundled defaults remain usable when the optional runtime file is unavailable.
  }
  return runtimeConfig;
}

export function initializeAnalytics() {
  if (typeof document === "undefined") return;
  const { umamiUrl, websiteId } = runtimeConfig.analytics;
  if (!umamiUrl || !websiteId || document.querySelector("script[data-website-id]")) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = umamiUrl.endsWith("/script.js")
    ? umamiUrl
    : `${umamiUrl.replace(/\/$/, "")}/script.js`;
  script.dataset.websiteId = websiteId;
  document.head.appendChild(script);
}
