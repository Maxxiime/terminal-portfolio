# Terminal Portfolio

Interactive terminal-style portfolio built with React + Vite, served via nginx in Docker.
The `question` command proxies AI responses through OpenRouter.

## About

Interactive terminal-style portfolio with AI-powered Q&A, multilingual support, and Docker-first deployment.

### Features

- **Animated boot sequence** — typed startup lines with per-character timing and loading dots before the terminal becomes interactive
- **AI-powered `question` command** — asks questions about the CV in natural language, proxied through OpenRouter's free model pool directly from nginx (no backend server)
- **Multilingual support** — full FR / EN / ES interface with locale-aware AI responses and a `language` command to switch at runtime
- **Clickable terminal links** — URLs in command output and AI responses are automatically detected and rendered as styled, theme-aware links
- **In-terminal CV access** — `gui` command opens the CV PDF served directly from the container (`/cv/`)
- **Randomized unknown-command responses** — sysadmin/Linux jokes instead of a plain "command not found"
- **Improved auto-scroll** — MutationObserver-based scroll that follows new output while respecting intentional upward scrolling
- **PWA routing fix** — service worker configured to exempt `/health` and `/cv/` from SPA fallback so static endpoints work through a reverse proxy
- **Docker-first deployment** — nginx:alpine runtime with OpenRouter reverse proxy, health endpoint generated at container startup, and a single `deploy.sh` workflow

## Stack

- **Frontend** — React 18, TypeScript, Vite, styled-components
- **Runtime** — nginx:alpine (handles SPA routing + OpenRouter proxy)
- **Deploy** — Docker + Docker Compose

## Structure

```
├── src/              # React/Vite source (edit profile, commands, styles here)
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

## Setup

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

## Environment variables

| Variable             | Description                         | Required |
|----------------------|-------------------------------------|----------|
| `OPENROUTER_API_KEY` | OpenRouter API key (free tier works) | Yes      |
| `PORT`               | Host port (default: `3012`)          | No       |

Get a free key at [openrouter.ai/keys](https://openrouter.ai/keys).

## Development

```bash
cd src
npm install
npm run dev       # dev server on http://localhost:5173
npm run build     # production build → src/dist/
npm run test      # run tests
npm run lint      # lint
```

## Manual deploy (without deploy.sh)

```bash
# 1. Build
cd src && npm run build && cd ..

# 2. Sync dist
rsync -a --delete src/dist/ runtime/dist/

# 3. Restart container
docker compose down
docker compose up -d --build
```

## Endpoints

| Path                          | Description                    |
|-------------------------------|--------------------------------|
| `/`                           | Terminal portfolio SPA         |
| `/health`                     | Health check JSON              |
| `/cv/resume.pdf`              | CV PDF                         |
| `/api/question`               | OpenRouter proxy (POST)        |

## Customizing content

All personal content is in [`src/src/data/profile.ts`](src/src/data/profile.ts).
UI strings (3 languages) are in [`src/src/i18n.ts`](src/src/i18n.ts).

To replace the CV: drop your PDF in `src/public/cv/` and update `cvUrl` in `profile.ts`.

## Reverse proxy (nginx / NPM)

If you use a reverse proxy, make sure it forwards requests as-is — the nginx config
inside the container handles SPA routing and static file serving directly.

The service worker (PWA) exempts `/health` and `/cv/` from SPA fallback automatically.
