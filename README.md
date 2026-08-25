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
│   │   ├── data/profile.ts   ← all personal content lives here
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

> This repository builds the standalone terminal CLI. The split-screen assistant + CLI website is a separate Sites application that embeds this CLI at build time; running this repository's `deploy.sh` therefore shows the CLI panel only.

## 🔧 Configuration: one source for non-secrets

Edit [`config/portfolio.json`](config/portfolio.json) for every non-secret setting: person name, terminal hostname, assistant labels, SEO text, suggested questions, AI provider, Umami and Markdown source.

Example provider configuration:

```json
"ai": {
  "providerType": "openai-compatible",
  "providerUrl": "https://openrouter.ai/api/v1/chat/completions",
  "model": "openrouter/free"
}
```

For OpenAI, use `https://api.openai.com/v1/chat/completions` and a model such as `gpt-4o-mini`. For Ollama, use `http://ollama:11434/v1/chat/completions` and a locally available model. The provider must accept the OpenAI chat-completions request format.

Only secrets belong in `.env`:

| Variable | Purpose | Required |
|---|---|---|
| `AI_PROVIDER_API_KEY` | Provider key, kept server-side by nginx | Depends on provider |
| `PORT` | Host port, default `3012` | No |

Ollama usually does not need an API key, so leave `AI_PROVIDER_API_KEY` empty. Never put a provider key in `config/portfolio.json` or frontend code. See [`.env.example`](.env.example) for examples.

Docker mounts this file at runtime, so it can be changed without rebuilding the image:

```yaml
volumes:
  - ./config:/usr/share/nginx/html/config:ro
  - ./data/content:/usr/share/nginx/html/data/content:ro
```

Edit the Markdown files in `content/fr/`, `content/en/`, and `content/es/` to update the command output. The browser checks the configured source version at startup and only downloads the files again when it changes. The `question` command uses the same Markdown content.

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
| `/`               | Terminal portfolio SPA  |
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
| [`src/src/data/profile.ts`](src/src/data/profile.ts) | Structured fallback data, contact links, experience, projects, and CV path |
| [`src/src/i18n.ts`](src/src/i18n.ts) | Terminal UI strings in the three languages |

Key fields at the top of `profile.ts`:

| Field | Description |
|-------|-------------|
| `firstName` | Used in AI example questions (`question what are John's skills?`) |
| `name` | Full name displayed in the terminal |
| `email`, `linkedinUrl`, `githubUrl` | Contact links |
| `terminalHost` | Domain shown in the terminal prompt; configured in `portfolio.json` |
| `cvUrl` | URL of the CV PDF served by the container |

To replace the CV: drop your PDF in `src/public/cv/` as `resume.pdf` and update `cvUrl` in `profile.ts`.

For local Markdown mode, set `content.mode` to `local` and use `/data/content` in `config/portfolio.json`, then place files under `data/content/<locale>/`. GitHub mode must use a public repository because the browser does not send a GitHub token.

If you edit a mounted local Markdown file, reload the browser; no image rebuild, Compose restart or `deploy.sh` is needed. For GitHub mode, commit the Markdown change to the configured public branch and reload the browser; deployment is not needed. Rebuild only when changing the application itself or using bundled content.

## 🔄 Reverse proxy (nginx / NPM)

If you use a reverse proxy, make sure it forwards requests as-is — the nginx config inside the container handles SPA routing and static file serving directly.

The service worker (PWA) exempts `/health` and `/cv/` from SPA fallback automatically.
