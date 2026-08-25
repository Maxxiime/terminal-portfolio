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
| Runtime | nginx:alpine (SPA routing + OpenRouter proxy) |
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
│   ├── nginx.conf.template   ← SPA routing + OpenRouter proxy
│   ├── health.sh             ← generates /health endpoint on startup
│   └── dist/                 ← populated by deploy.sh (gitignored)
├── docker-compose.yml
├── deploy.sh         ← one-shot build + deploy
└── .env.example
```

## 🚀 Setup

```bash
# 1. Clone
git clone <repo-url>
cd terminal-portfolio

# 2. Configure environment
cp .env.example .env
# edit .env — choose the AI provider and content source

# 3. Deploy
./deploy.sh
```

The portfolio is available at `http://localhost:3012` (or your configured PORT).

## 🔧 Configuration

The easiest file to edit for a new portfolio is [`config/portfolio.json`](config/portfolio.json). It contains the name, terminal hostname, assistant labels, SEO text, suggested questions, AI model, and Markdown source.

The mounted JSON file is the primary portfolio configuration. Environment variables are optional deployment overrides: an empty variable does not erase a value from `config/portfolio.json`. You do not need to fill the HTTP and local content variables when using GitHub mode; only the selected source is read.

Docker mounts this file at runtime, so it can be changed without rebuilding the image:

```yaml
volumes:
  - ./config:/usr/share/nginx/html/config:ro
  - ./data/content:/usr/share/nginx/html/data/content:ro
```

Edit the Markdown files in `content/fr/`, `content/en/`, and `content/es/` to update the `about`, `skills`, `lab`, `experience`, `projects`, `education`, `certification`, `ai`, and `welcome` commands. The browser checks the configured source version at startup and only downloads the files again when it changes. The `question` command uses the same Markdown content.

### Environment variables

| Variable | Description | Required |
|---|---|---|
| `AI_PROVIDER_URL` | OpenAI-compatible chat completions URL | Yes, unless using the legacy proxy |
| `AI_PROVIDER_API_KEY` | Provider API key, kept server-side by nginx | Depends on provider |
| `AI_PROVIDER_MODEL` | Model name sent to the provider | Yes |
| `AI_PROVIDER_TYPE` | Provider label, currently `openai-compatible` | No |
| `PORT` | Host port, default `3012` | No |
| `PORTFOLIO_NAME` | Runtime display name override | No |
| `PORTFOLIO_FIRST_NAME` | Runtime first-name override | No |
| `PORTFOLIO_TERMINAL_HOST` | Hostname shown in the terminal prompt | No |
| `CONTENT_MODE` | `github`, `http`, or `local` | No |
| `CONTENT_GITHUB_OWNER` | GitHub username/organization | For GitHub mode |
| `CONTENT_GITHUB_REPO` | GitHub repository name | For GitHub mode |
| `CONTENT_GITHUB_REF` | Branch or tag, usually `main` | For GitHub mode |
| `CONTENT_GITHUB_PATH` | Markdown directory, usually `content` | For GitHub mode |
| `CONTENT_HTTP_BASE_URL` | Base URL for HTTP/S3-compatible files | For HTTP mode |
| `CONTENT_HTTP_VERSION_URL` | Optional version/checksum URL | No |
| `CONTENT_LOCAL_BASE_URL` | URL path for mounted files, usually `/data/content` | For local mode |
| `CONTENT_LOCAL_VERSION_URL` | Optional mounted version file | No |
| `VITE_UMAMI_URL` | Optional Umami base URL, without `/script.js`, used at build time | No |
| `VITE_UMAMI_WEBSITE_ID` | Optional public Umami website ID | No |

Provider examples are already included in [`.env.example`](.env.example): OpenRouter, OpenAI, and Ollama through its OpenAI-compatible endpoint. Never put `AI_PROVIDER_API_KEY` in frontend code.

Get a free key at [openrouter.ai/keys](https://openrouter.ai/keys).

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
| `/api/question`   | OpenRouter proxy (POST) |

## ✏️ Customizing the portfolio

Use these files when adapting the portfolio to a new person:

| File | Purpose |
|---|---|
| [`config/portfolio.json`](config/portfolio.json) | Name, assistant labels, SEO metadata, questions, Markdown source, and model |
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
| `terminalHost` | Domain shown in the terminal prompt |
| `cvUrl` | URL of the CV PDF served by the container |

To replace the CV: drop your PDF in `src/public/cv/` as `resume.pdf` and update `cvUrl` in `profile.ts`.

For local Markdown mode, set `CONTENT_MODE=local`, set `CONTENT_LOCAL_BASE_URL=/data/content`, and place the files under `data/content/<locale>/`. For a public GitHub, HTTPS, or S3-compatible source, select the corresponding mode in `config/portfolio.json` or `.env`.

## 🔄 Reverse proxy (nginx / NPM)

If you use a reverse proxy, make sure it forwards requests as-is — the nginx config inside the container handles SPA routing and static file serving directly.

The service worker (PWA) exempts `/health` and `/cv/` from SPA fallback automatically.
