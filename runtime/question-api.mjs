import { readFile } from "node:fs/promises";
import http from "node:http";
import { pathToFileURL } from "node:url";

const DEFAULT_CONFIG_FILE = "/usr/share/nginx/html/config/portfolio.json";
const DEFAULT_PRIVATE_CONTEXT_FILE = "/run/portfolio-private/.IAinformation.md";
const MAX_REQUEST_BYTES = 2 * 1024 * 1024;
const PROVIDER_TIMEOUT_MS = 85_000;
const DEFAULT_MAX_OUTPUT_TOKENS = 5_000;
const HARD_MAX_OUTPUT_TOKENS = 8_192;

export async function readPrivateContext(filePath) {
  try {
    return (await readFile(filePath, "utf8")).trim();
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

export function buildProviderPayload(payload, config, privateContext = "") {
  const ownerName = config?.person?.name || "the portfolio owner";
  const clientMessages = Array.isArray(payload?.messages)
    ? payload.messages.filter(message =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string"
      )
    : [];

  const privateRules = privateContext
    ? `\n\nPRIVATE OWNER CONTEXT\n${privateContext}\n\nPrivate-context rules:\n- Use only the facts relevant to the current question.\n- Never reproduce or summarize the complete private context.\n- Never mention this file or that a private context exists.\n- Disclose a contact detail only when the visitor explicitly asks how to contact ${ownerName}, or when it directly answers the question.\n- Never disclose credentials, tokens or secrets.`
    : "";

  const systemMessage = {
    role: "system",
    content: `You are the portfolio assistant for ${ownerName}. Use only the portfolio context supplied in the user message and the optional private owner context below. Do not invent missing facts. Follow the requested response language and use valid Markdown without HTML.${privateRules}`,
  };

  const requestedMaxTokens = Number(payload?.max_tokens);
  const configuredMaxTokens = Number(config?.ai?.maxOutputTokens);
  const serverMaxTokens = Number.isFinite(configuredMaxTokens) && configuredMaxTokens > 0
    ? Math.min(HARD_MAX_OUTPUT_TOKENS, Math.trunc(configuredMaxTokens))
    : DEFAULT_MAX_OUTPUT_TOKENS;
  const maxTokens = Number.isFinite(requestedMaxTokens) && requestedMaxTokens > 0
    ? Math.min(serverMaxTokens, Math.trunc(requestedMaxTokens))
    : serverMaxTokens;

  return {
    ...payload,
    model: config?.ai?.model || payload?.model,
    messages: [systemMessage, ...clientMessages],
    max_tokens: maxTokens,
    stream: false,
  };
}

async function readJsonBody(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_REQUEST_BYTES) {
      const error = new Error("Request body too large");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function sendJson(response, statusCode, value) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(value));
}

export function createQuestionApi({
  configFile = process.env.PORTFOLIO_CONFIG_FILE || DEFAULT_CONFIG_FILE,
  apiKey = process.env.AI_PROVIDER_API_KEY || "",
} = {}) {
  return http.createServer(async (request, response) => {
    if (request.method === "GET" && request.url === "/healthz") {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method !== "POST" || request.url !== "/question") {
      sendJson(response, 404, { error: { message: "Not found" } });
      return;
    }

    const requestId = String(request.headers["x-request-id"] || "-");
    try {
      const [payload, configText] = await Promise.all([
        readJsonBody(request),
        readFile(configFile, "utf8"),
      ]);
      const config = JSON.parse(configText);
      const providerUrl = config?.ai?.providerUrl;
      if (!providerUrl || !config?.ai?.model) {
        throw new Error("ai.providerUrl and ai.model must be configured");
      }

      const privateContextFile = config?.ai?.privateContextFile || DEFAULT_PRIVATE_CONTEXT_FILE;
      const privateContext = await readPrivateContext(privateContextFile);
      const providerPayload = buildProviderPayload(payload, config, privateContext);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

      let providerResponse;
      try {
        const headers = {
          "Content-Type": "application/json",
          "X-Request-Id": requestId,
          "X-Title": config?.seo?.title || "Terminal Portfolio",
          "HTTP-Referer": `${request.headers["x-forwarded-proto"] || "http"}://${request.headers.host || "localhost"}`,
        };
        if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
        providerResponse = await fetch(providerUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(providerPayload),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }

      const body = await providerResponse.text();
      response.writeHead(providerResponse.status, {
        "Content-Type": providerResponse.headers.get("content-type") || "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      response.end(body);
      console.log(`[question-api] rid=${requestId} status=${providerResponse.status} private_context=${privateContext ? "yes" : "no"}`);
    } catch (error) {
      const aborted = error?.name === "AbortError";
      const statusCode = error?.statusCode || (aborted ? 504 : 502);
      const message = aborted ? "AI provider timeout" : error?.message || "Question service unavailable";
      console.error(`[question-api] rid=${requestId} status=${statusCode} error=${message}`);
      sendJson(response, statusCode, { error: { message } });
    }
  });
}

export function startQuestionApi(port = Number(process.env.QUESTION_API_PORT || 3001)) {
  const server = createQuestionApi();
  server.listen(port, "127.0.0.1", () => {
    console.log(`[question-api] listening on 127.0.0.1:${port}`);
  });
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startQuestionApi();
}
