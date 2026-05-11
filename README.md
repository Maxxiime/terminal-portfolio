# 💻 Terminal Portfolio

> 🌐 **English** · [Français](README.fr.md) · [Español](README.es.md)

An interactive terminal-style portfolio with AI-powered Q&A, multilingual support, and Docker-first deployment.

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><b>Boot sequence</b></td>
    <td align="center"><b>Help</b></td>
    <td align="center"><b>AI Q&A</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/boot.png" alt="Boot sequence" width="380"/></td>
    <td><img src="docs/screenshots/help.png" alt="Help command" width="380"/></td>
    <td><img src="docs/screenshots/question.png" alt="AI question" width="380"/></td>
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
# edit .env — set OPENROUTER_API_KEY and PORT

# 3. Deploy
./deploy.sh
```

The portfolio is available at `http://localhost:3012` (or your configured PORT).

## 🔑 Environment variables

| Variable             | Description                          | Required |
|----------------------|--------------------------------------|----------|
| `OPENROUTER_API_KEY` | OpenRouter API key (free tier works) | Yes      |
| `PORT`               | Host port (default: `3012`)          | No       |

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

## ✏️ Customizing content

All personal content is in [`src/src/data/profile.ts`](src/src/data/profile.ts) — this is the **single file to edit** when adapting the portfolio to a new person.

Key fields at the top of `profile.ts`:

| Field | Description |
|-------|-------------|
| `firstName` | Used in AI example questions (`question what are John's skills?`) |
| `name` | Full name displayed in the terminal |
| `email`, `linkedinUrl`, `githubUrl` | Contact links |
| `terminalHost` | Domain shown in the terminal prompt |
| `cvUrl` | URL of the CV PDF served by the container |

UI strings (3 languages) are in [`src/src/i18n.ts`](src/src/i18n.ts).

To replace the CV: drop your PDF in `src/public/cv/` as `resume.pdf` and update `cvUrl` in `profile.ts`.

## 🔄 Reverse proxy (nginx / NPM)

If you use a reverse proxy, make sure it forwards requests as-is — the nginx config inside the container handles SPA routing and static file serving directly.

The service worker (PWA) exempts `/health` and `/cv/` from SPA fallback automatically.
