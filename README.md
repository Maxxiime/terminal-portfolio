# 💻 Terminal Portfolio

> 🌐 **English** · [Français](README.fr.md) · [Español](README.es.md)

An interactive terminal-style portfolio with AI-powered Q&A, multilingual support, and Docker-first deployment.

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><b>Boot sequence</b></td>
    <td align="center"><b>AI Q&A</b></td>
    <td align="center"><b>Unknown command</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/boot.png" alt="Boot sequence" width="380"/></td>
    <td><img src="docs/screenshots/question.png" alt="AI Q&A" width="380"/></td>
    <td><img src="docs/screenshots/unknown_command.png" alt="Unknown command" width="380"/></td>
  </tr>
</table>

## ✨ Features

- 🤖 **AI Q&A** — `question` command answers natural-language questions about the CV, proxied through OpenRouter directly from nginx (no backend server)
- 🌍 **Multilingual** — full FR / EN / ES interface with locale-aware AI responses and a `language` command to switch at runtime
- 🎬 **Animated boot sequence** — typed startup lines with per-character timing before the terminal becomes interactive
- 🔗 **Clickable links** — URLs in command output and AI responses are automatically rendered as styled, theme-aware links
- 📄 **In-terminal CV access** — `gui` command opens the CV PDF served directly from the container
- 😄 **Randomized unknown-command responses** — sysadmin/Linux jokes instead of a plain "command not found"
- 📜 **Smart auto-scroll** — MutationObserver-based scroll that follows new output while respecting intentional upward scrolling
- ⚡ **PWA routing** — service worker exempts `/health` and `/cv/` from SPA fallback so static endpoints work through a reverse proxy
- 🐳 **Docker-first deployment** — nginx:alpine runtime with OpenRouter reverse proxy, health endpoint generated at container startup, and a single `deploy.sh` workflow

## 🛠 Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, styled-components |
| Runtime | nginx:alpine (SPA routing + configured provider proxy) |
| Deploy | Docker + Docker Compose |

## 📁 Structure

```
├── src/              # React/Vite source
│   ├── src/
│   │   ├── components/
│   │   ├── data/profile.ts   ← structured CLI fallback and metadata
│   │   └── i18n.ts           ← UI strings (fr/en/es)
│   └── public/
│       ├── cv/               ← put your CV PDF here
│       └── brands/           ← brand/certification icons
├── runtime/          # Docker build context
│   ├── Dockerfile
│   ├── nginx.conf.template   ← SPA routing + provider proxy
│   ├── health.sh             ← generates /health endpoint on startup
│   └── dist/                 ← populated by deploy.sh (gitignored)
├── docker-compose.yml
├── deploy.sh         ← one-shot build + deploy
└── .env.example
```

## 🚀 Setup

```bash
git clone <repo-url>
cd terminal-portfolio
cp .env.example .env
# edit config/portfolio.json and .env
./deploy.sh
```

The portfolio is available at `http://localhost:3012` (or the host port selected with `PORT`).

One Docker image now contains the complete split-screen interface: AI assistant on the left, resizable separator, and the local CLI on the right. The CLI is served from `/portfolio-cli/` without depending on another domain.

## 🔧 Configuration: one source for non-secrets

Edit [`config/portfolio.json`](config/portfolio.json) for every non-secret setting: person name, terminal hostname, assistant labels, SEO text, suggested questions, AI provider, Umami and Markdown source.

This file must remain **strict JSON**: `//` and `/* ... */` comments are not allowed. Keep the `github`, `http`, and `local` sections present without commenting them out; only the section selected by `content.mode` is used. Language-dependent labels such as `assistant.title` accept an object like `{ "fr": "...", "en": "...", "es": "..." }`.

Example provider configuration:

```json
"ai": {
  "providerType": "openai-compatible",
  "providerUrl": "https://openrouter.ai/api/v1/chat/completions",
  "model": "openrouter/free",
  "privateContextFile": "/run/portfolio-private/.IAinformation.md"
}
```

For OpenAI, use `https://api.openai.com/v1/chat/completions` and a model such as `gpt-4o-mini`. For Ollama, use `http://ollama:11434/v1/chat/completions` and a locally available model. The provider must accept the OpenAI chat-completions request format.

Only secrets belong in `.env`:

| Variable | Purpose | Required |
|---|---|---|
| `AI_PROVIDER_API_KEY` | Provider key, kept by the server-side backend | Depends on provider |
| `PORT` | Host port, default `3012` | No |

Ollama usually does not need an API key, so leave `AI_PROVIDER_API_KEY` empty. Never put a provider key in `config/portfolio.json` or frontend code. See [`.env.example`](.env.example) for examples.

Docker mounts this file at runtime, so it can be changed without rebuilding the image:

```yaml
volumes:
  - ./config:/usr/share/nginx/html/config:ro
  - ./content:/usr/share/nginx/html/data/content:ro
  - ./private:/run/portfolio-private:ro
```

Edit the Markdown files in `content/fr/`, `content/en/`, and `content/es/` to update the command output. The browser checks the configured source version at startup and only downloads the files again when it changes. The `question` command uses the same Markdown content.

### Markdown hosting methods

Choose one method with `content.mode`. Settings for inactive modes are ignored.

#### 1. Public GitHub

```json
"content": {
  "mode": "github",
  "github": {
    "owner": "Maxxiime",
    "repo": "terminal-portfolio",
    "ref": "main",
    "path": "content"
  }
}
```

The repository must be public because no GitHub token is sent. Edit `content/<locale>/<topic>.md`, commit and push to the branch configured in `ref`, then reload the page. The browser checks that branch's commit SHA and fetches all FR/EN/ES files when it changes. The Docker server does not need `git pull` or `deploy.sh`.

#### 2. Local Docker volume

```json
"content": {
  "mode": "local",
  "local": {
    "baseUrl": "/data/content",
    "versionUrl": ""
  }
}
```

Compose mounts `./content` at `/usr/share/nginx/html/data/content:ro`. Edit `content/<locale>/<topic>.md` directly on the server and reload the page. No rebuild, `deploy.sh`, or container restart is required.

#### Optional: HTTP/HTTPS, S3 or CDN

Set `content.mode` to `http`, configure `http.baseUrl`, and optionally `http.versionUrl`. The origin must allow browser CORS. The version endpoint may return text or JSON with `sha` or `version`.

All FR/EN/ES files are loaded when the main page opens. Missing EN/ES files fall back to FR, and bundled Markdown remains the final fallback when an external source is unavailable.

### Private AI-only context

Private context is always a local server-side file, regardless of the public Markdown `content.mode`. Never place it under `content/` or in a public GitHub repository.

```bash
cp private/.IAinformation.example.md private/.IAinformation.md
chmod 600 private/.IAinformation.md
# edit private/.IAinformation.md
```

The path is configured with `ai.privateContextFile`. The file is ignored by Git, mounted outside nginx's public web root and read by the backend for every question. Changes require no rebuild or restart. Its contents never appear in CLI commands and are never sent to the browser.

This is conditional AI context, not a secret vault. The configured provider receives it and the model may disclose a relevant fact in an answer. Never store passwords, API keys, tokens or credentials in this file.

Get an OpenRouter key at [openrouter.ai/keys](https://openrouter.ai/keys).

## 🧑‍💻 Development

```bash
cd src
npm install
npm run dev       # dev server on http://localhost:5173
npm run build     # production build → src/dist/
npm run test      # run tests
npm run lint      # lint
```

## 📦 Manual deploy (without deploy.sh)

```bash
# 1. Build
cd src && npm run build && cd ..

# 2. Sync dist
rsync -a --delete src/dist/ runtime/dist/

# 3. Restart container
docker compose down
docker compose up -d --build
```

## 🌐 Endpoints

| Path              | Description             |
|-------------------|-------------------------|
| `/`               | Split-screen AI assistant + CLI |
| `/portfolio-cli/` | Embedded local CLI |
| `/health`         | Health check JSON       |
| `/cv/resume.pdf`  | CV PDF                  |
| `/api/question`   | Configured provider proxy (POST) |

## ✏️ Customizing the portfolio

Use these files when adapting the portfolio to a new person:

| File | Purpose |
|---|---|
| [`config/portfolio.json`](config/portfolio.json) | Name, assistant labels, SEO metadata, questions, provider, analytics and Markdown source |
| [`content/fr/`](content/fr/) | French command content and AI knowledge |
| [`content/en/`](content/en/) | English command content and AI knowledge |
| [`content/es/`](content/es/) | Spanish command content and AI knowledge |
| [`src/src/data/profile.ts`](src/src/data/profile.ts) | Structured fallback and CLI metadata still used by contacts, CV, icons, and commands |
| [`src/src/i18n.ts`](src/src/i18n.ts) | Terminal UI strings in the three languages |

`profile.ts` is still required. Markdown is the editorial source for commands and AI answers, while this file still supplies fallback and structured data to several CLI components. Do not remove it until those components have all been migrated to Markdown and `portfolio.json`.

Key fields at the top of `profile.ts`:

| Field | Description |
|-------|-------------|
| `firstName` | Used in AI example questions (`question what are John's skills?`) |
| `name` | Full name displayed in the terminal |
| `email`, `linkedinUrl`, `githubUrl` | Contact links |
| `terminalHost` | Domain shown in the terminal prompt; configured in `portfolio.json` |
| `cvUrl` | URL of the CV PDF served by the container |

To replace the CV: drop your PDF in `src/public/cv/` as `resume.pdf` and update `cvUrl` in `profile.ts`.

For local Markdown mode, set `content.mode` to `local`, use `/data/content` in `config/portfolio.json`, and edit files under `content/<locale>/`. GitHub mode must use a public repository because the browser does not send a GitHub token.

If you edit a mounted local Markdown file, reload the browser; no image rebuild, Compose restart or `deploy.sh` is needed. For GitHub mode, commit the Markdown change to the configured public branch and reload the browser; deployment is not needed. Rebuild only when changing the application itself or using bundled content.

## 🔄 Reverse proxy (nginx / NPM)

If you use a reverse proxy, make sure it forwards requests as-is — the nginx config inside the container handles SPA routing and static file serving directly.

The service worker (PWA) exempts `/health` and `/cv/` from SPA fallback automatically.
