import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getMarkdownKnowledgeBase, loadMarkdownContent } from "../src/data/markdown";
import {
  getPortfolioConfig,
  getLocalizedText,
  initializeAnalytics,
  loadPortfolioConfig,
  type PortfolioRuntimeConfig,
} from "../src/data/portfolio-config";
import { resolveLocale, type Locale } from "../src/i18n";
import { createRequestId } from "../src/utils/request-id";

type Message = { role: "assistant" | "user"; content: string };

const text = {
  fr: {
    online: "agent en ligne",
    title: "Que voulez-vous savoir ?",
    send: "Envoyer",
    inference: "inférence en cours",
    unavailable: "L’assistant est momentanément indisponible.",
    terminal: "Portfolio CLI",
    resize: "Redimensionner les panneaux",
    loading: "Chargement du portfolio…",
    source: "Markdown synchronisé",
    examples: ["Résume son profil en 30 secondes", "Retrace son parcours DevOps", "Quelle est sa stack principale ?", "Parle-moi de son homelab"],
  },
  en: {
    online: "agent online",
    title: "What would you like to know?",
    send: "Send",
    inference: "inference running",
    unavailable: "The assistant is temporarily unavailable.",
    terminal: "CLI portfolio",
    resize: "Resize panels",
    loading: "Loading portfolio…",
    source: "Markdown synchronized",
    examples: ["Summarize the profile in 30 seconds", "Walk me through the DevOps career", "What is the core technology stack?", "Tell me about the homelab"],
  },
  es: {
    online: "agente en línea",
    title: "¿Qué quieres saber?",
    send: "Enviar",
    inference: "inferencia en curso",
    unavailable: "El asistente no está disponible temporalmente.",
    terminal: "Portfolio CLI",
    resize: "Redimensionar paneles",
    loading: "Cargando portfolio…",
    source: "Markdown sincronizado",
    examples: ["Resume el perfil en 30 segundos", "Repasa la trayectoria DevOps", "¿Cuál es el stack principal?", "Háblame del homelab"],
  },
} as const;

function TerminalIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 7 4.5 5L5 17l1.7 1.5 5.7-6.5-5.7-6.5L5 7Zm8 10h6v-2h-6v2Z" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14-7-4 14-3.2-5.8L5 12Z" /></svg>;
}

function CopyIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7V5c0-1.7 1.3-3 3-3h6c1.7 0 3 1.3 3 3v8c0 1.7-1.3 3-3 3h-2v2c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4v-7c0-2.2 1.8-4 4-4h1Zm3 0h4v6h2V5h-6v2Zm1 3H7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-8Z" /></svg>;
}

function applyMetadata(config: PortfolioRuntimeConfig) {
  document.title = config.seo.title;
  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute("content", config.seo.description);
}

function extractProviderError(raw: string, fallback: string) {
  try {
    const data = JSON.parse(raw) as { error?: { message?: string } | string; message?: string };
    if (typeof data.error === "string") return data.error;
    return data.error?.message || data.message || fallback;
  } catch {
    return raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || fallback;
  }
}

export default function App() {
  const [config, setConfig] = useState<PortfolioRuntimeConfig>(getPortfolioConfig());
  const [language, setLanguage] = useState<Locale>(() => resolveLocale(localStorage.getItem("portfolio-language") || navigator.language));
  const [activePanel, setActivePanel] = useState<"chat" | "terminal">("chat");
  const [chatWidth, setChatWidth] = useState(42);
  const [contentReady, setContentReady] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef(false);
  const resizeFrameRef = useRef<number | null>(null);
  const pendingPointerXRef = useRef(0);
  const copy = text[language];
  const suggestions = config.suggestions[language].length ? config.suggestions[language] : [...copy.examples];

  useEffect(() => {
    void (async () => {
      const loadedConfig = await loadPortfolioConfig();
      await loadMarkdownContent();
      setConfig(loadedConfig);
      applyMetadata(loadedConfig);
      initializeAnalytics();
      setContentReady(true);
    })();
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      resizeFrameRef.current = null;
      const next = (pendingPointerXRef.current / window.innerWidth) * 100;
      setChatWidth(Math.min(72, Math.max(28, next)));
    };
    const move = (event: PointerEvent) => {
      if (!resizingRef.current || window.innerWidth <= 900) return;
      pendingPointerXRef.current = event.clientX;
      if (resizeFrameRef.current === null) resizeFrameRef.current = window.requestAnimationFrame(updateWidth);
    };
    const stop = () => {
      resizingRef.current = false;
      document.body.classList.remove("is-resizing");
      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
        resizeFrameRef.current = null;
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sourceLabel = useMemo(() => {
    if (config.content.mode === "github") return `${config.content.github.owner}/${config.content.github.repo}@${config.content.github.ref}`;
    if (config.content.mode === "http") return config.content.http.baseUrl || "HTTP";
    return "volume local";
  }, [config]);

  function changeLanguage(next: Locale) {
    setLanguage(next);
    localStorage.setItem("portfolio-language", next);
    localStorage.setItem("tsn-language", next);
    document.documentElement.lang = next;
  }

  async function ask(value: string) {
    const clean = value.trim();
    if (!clean || isLoading || !contentReady) return;
    setMessages(current => [...current, { role: "user", content: clean }]);
    setQuestion("");
    setIsLoading(true);

    const requestId = createRequestId();
    const payload = {
      model: config.ai.model,
      messages: [
        {
          role: "system",
          content: `You are the portfolio assistant for ${config.person.name}. Use only the supplied Markdown knowledge base. Never invent missing information. Answer in ${language === "fr" ? "French" : language === "es" ? "Spanish" : "English"}. Use valid GitHub Markdown and no HTML.`,
        },
        {
          role: "user",
          content: `PORTFOLIO MARKDOWN\n\n${getMarkdownKnowledgeBase(language)}\n\nQUESTION\n${clean}\n\nGive a concise, factual answer. Clearly say when the information is absent.`,
        },
      ],
      temperature: 0.25,
      max_tokens: 1200,
      stream: false,
    };

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 55000);
      const response = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": requestId,
          "X-Request-Source": "PortfolioShell",
          "X-Request-Model": config.ai.model,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      const raw = await response.text();
      if (!response.ok) throw new Error(extractProviderError(raw, copy.unavailable));
      const data = JSON.parse(raw) as { answer?: string; choices?: Array<{ message?: { content?: string } }> };
      const answer = data.answer || data.choices?.[0]?.message?.content?.trim();
      if (!answer) throw new Error(copy.unavailable);
      setMessages(current => [...current, { role: "assistant", content: answer }]);
    } catch (error) {
      const message = error instanceof Error && error.name === "AbortError" ? copy.unavailable : error instanceof Error ? error.message : copy.unavailable;
      setMessages(current => [...current, { role: "assistant", content: message }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="portfolio-shell" style={{ "--chat-width": `${chatWidth}%` } as CSSProperties}>
      <nav className="mobile-switch" aria-label="Panel switcher">
        <button className={activePanel === "chat" ? "active" : ""} onClick={() => setActivePanel("chat")}>{config.assistant.uri}</button>
        <button className={activePanel === "terminal" ? "active" : ""} onClick={() => setActivePanel("terminal")}>{copy.terminal}</button>
      </nav>

      <section className={`chat-panel ${activePanel === "chat" ? "mobile-active" : ""}`}>
        <header className="panel-header">
          <div className="brand-mark"><TerminalIcon /></div>
          <div className="agent-title"><h1>{config.assistant.displayName}</h1><p><span className="status-dot" /> {copy.online}</p></div>
          <div className="language-switch" aria-label="Language">
            {(["fr", "en", "es"] as Locale[]).map(locale => <button key={locale} className={language === locale ? "active" : ""} onClick={() => changeLanguage(locale)}>{locale.toUpperCase()}</button>)}
          </div>
        </header>

        <div className="thread-viewport" aria-live="polite">
          <div className={`thread-content ${messages.length === 0 ? "thread-empty" : ""}`}>
            {messages.length === 0 && <div className="agent-home">
              <div className="prompt-logo"><TerminalIcon /></div>
              <h2>{getLocalizedText(config.assistant.title, language, copy.title)}</h2>
              <p>{getLocalizedText(config.assistant.subtitle, language)}</p>
              <div className="suggestions">{suggestions.map(suggestion => <button key={suggestion} disabled={!contentReady} onClick={() => void ask(suggestion)}>{suggestion}</button>)}</div>
            </div>}
            <div className="message-list">
              {messages.map((message, index) => <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
                {message.role === "assistant" && <div className="avatar"><TerminalIcon /></div>}
                <div className="message-body">
                  <div className="bubble markdown"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a> }}>{message.content}</ReactMarkdown></div>
                  {message.role === "assistant" && <div className="message-actions"><button onClick={() => void navigator.clipboard?.writeText(message.content)} aria-label="Copy"><CopyIcon /></button></div>}
                </div>
              </article>)}
              {isLoading && <article className="message assistant"><div className="avatar"><TerminalIcon /></div><div className="message-body"><div className="bubble typing"><i /><i /><i /><em>{copy.inference}</em></div></div></article>}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        <footer className="thread-footer">
          <form className="composer" onSubmit={event => { event.preventDefault(); void ask(question); }}>
            <div className="composer-box">
              <textarea value={question} onChange={event => setQuestion(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void ask(question); } }} placeholder={`${language === "fr" ? "questionner" : language === "es" ? "preguntar" : "ask"} ${config.assistant.uri}...`} rows={1} />
              <div className="composer-actions"><span>{contentReady ? `${copy.source} · ${sourceLabel}` : copy.loading}</span><button disabled={!question.trim() || isLoading || !contentReady} type="submit" aria-label={copy.send}><ArrowIcon /></button></div>
            </div>
          </form>
          <p className="disclaimer">{getLocalizedText(config.assistant.disclaimer, language)}</p>
        </footer>
      </section>

      <div className="splitter" role="separator" aria-label={copy.resize} aria-orientation="vertical" tabIndex={0}
        onPointerDown={event => { event.currentTarget.setPointerCapture?.(event.pointerId); resizingRef.current = true; pendingPointerXRef.current = event.clientX; document.body.classList.add("is-resizing"); }}
        onDoubleClick={() => setChatWidth(42)}
        onKeyDown={event => { if (event.key === "ArrowLeft") setChatWidth(value => Math.max(28, value - 2)); if (event.key === "ArrowRight") setChatWidth(value => Math.min(72, value + 2)); }}>
        <span className="splitter-grip" aria-hidden="true"><i /><i /><i /></span>
      </div>

      <section className={`terminal-panel ${activePanel === "terminal" ? "mobile-active" : ""}`}>
        <header className="terminal-bar"><div className="window-dots"><i /><i /><i /></div><span>{config.portfolioLabel}</span></header>
        {contentReady ? <iframe className="portfolio-frame" src="/portfolio-cli/index.html" title={copy.terminal} allow="clipboard-write" /> : <div className="terminal-loading">{copy.loading}</div>}
      </section>
    </main>
  );
}
