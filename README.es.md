# 💻 Terminal Portfolio

> 🌐 [English](README.md) · [Français](README.fr.md) · **Español**

Un portfolio interactivo estilo terminal con preguntas y respuestas impulsadas por IA, soporte multilingüe y despliegue Docker-first.

## 📸 Capturas de pantalla

<table>
  <tr>
    <td align="center"><b>Secuencia de arranque</b></td>
    <td align="center"><b>Q&A con IA</b></td>
    <td align="center"><b>Comando desconocido</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/boot.png" alt="Secuencia de arranque" width="380"/></td>
    <td><img src="docs/screenshots/question.png" alt="Q&A con IA" width="380"/></td>
    <td><img src="docs/screenshots/unknown_command.png" alt="Comando desconocido" width="380"/></td>
  </tr>
</table>

## ✨ Características

- 🤖 **Q&A con IA** — el comando `question` responde preguntas en lenguaje natural sobre el CV, proxificado a través de OpenRouter directamente desde nginx (sin servidor backend)
- 🌍 **Multilingüe** — interfaz completa FR / EN / ES con respuestas IA adaptadas a la configuración regional y un comando `language` para cambiar en tiempo de ejecución
- 🎬 **Secuencia de arranque animada** — líneas de inicio escritas carácter a carácter antes de que el terminal sea interactivo
- 🔗 **Enlaces clicables** — las URLs en las salidas de comandos y respuestas IA se renderizan automáticamente como enlaces estilizados
- 📄 **Acceso al CV desde el terminal** — el comando `gui` abre el PDF del CV servido directamente desde el container
- 😄 **Respuestas aleatorias a comandos desconocidos** — chistes de sysadmin/Linux en lugar de un simple "comando no encontrado"
- 📜 **Desplazamiento automático inteligente** — desplazamiento basado en MutationObserver que sigue las nuevas salidas respetando el scroll manual hacia arriba
- ⚡ **Enrutamiento PWA** — el service worker excluye `/health` y `/cv/` del fallback SPA para que los endpoints estáticos funcionen tras un reverse proxy
- 🐳 **Despliegue Docker-first** — runtime nginx:alpine con proxy OpenRouter, endpoint de salud generado al inicio del container, y un workflow `deploy.sh` todo-en-uno

## 🛠 Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18, TypeScript, Vite, styled-components |
| Runtime | nginx:alpine (enrutamiento SPA + proxy OpenRouter) |
| Despliegue | Docker + Docker Compose |

## 📁 Estructura

```
├── src/              # Fuente React/Vite
│   ├── src/
│   │   ├── components/
│   │   ├── data/profile.ts   ← todo el contenido personal está aquí
│   │   └── i18n.ts           ← cadenas UI (fr/en/es)
│   └── public/
│       ├── cv/               ← coloque su PDF aquí
│       └── brands/           ← iconos de marcas/certificaciones
├── runtime/          # Contexto de build Docker
│   ├── Dockerfile
│   ├── nginx.conf.template   ← enrutamiento SPA + proxy OpenRouter
│   ├── health.sh             ← genera el endpoint /health al inicio
│   └── dist/                 ← llenado por deploy.sh (gitignored)
├── docker-compose.yml
├── deploy.sh         ← build + despliegue en un comando
└── .env.example
```

## 🚀 Instalación

```bash
# 1. Clonar
git clone <repo-url>
cd terminal-portfolio

# 2. Configurar el entorno
cp .env.example .env
# editar .env — elegir el proveedor IA y la fuente de contenido

# 3. Desplegar
./deploy.sh
```

El portfolio está disponible en `http://localhost:3012` (o el PORT configurado).

## 🔧 Configuración

El archivo más sencillo para adaptar el portfolio es [`config/portfolio.json`](config/portfolio.json). Contiene el nombre, hostname del terminal, textos del asistente, metadatos SEO, preguntas sugeridas, modelo IA y fuente Markdown.

Docker monta este archivo al iniciar:

```yaml
volumes:
  - ./config:/usr/share/nginx/html/config:ro
  - ./data/content:/usr/share/nginx/html/data/content:ro
```

Edita los Markdown de `content/fr/`, `content/en/` y `content/es/` para actualizar los comandos `about`, `skills`, `lab`, `experience`, `projects`, `education`, `certification`, `ai` y `welcome`. El navegador comprueba la versión configurada al iniciar y solo vuelve a descargar los archivos cuando cambia. El comando `question` usa el mismo contenido Markdown.

### Variables de entorno

| Variable | Descripción | Requerido |
|---|---|---|
| `AI_PROVIDER_URL` | URL OpenAI-compatible de chat completions | Sí, salvo proxy legacy |
| `AI_PROVIDER_API_KEY` | Clave conservada en nginx | Según el proveedor |
| `AI_PROVIDER_MODEL` | Nombre del modelo | Sí |
| `AI_PROVIDER_TYPE` | Etiqueta del proveedor, actualmente `openai-compatible` | No |
| `PORT` | Puerto del host, por defecto `3012` | No |
| `PORTFOLIO_NAME` | Nombre mostrado | No |
| `PORTFOLIO_FIRST_NAME` | Nombre corto | No |
| `PORTFOLIO_TERMINAL_HOST` | Hostname mostrado en el prompt | No |
| `CONTENT_MODE` | `github`, `http` o `local` | No |
| `CONTENT_GITHUB_OWNER` | Usuario/organización GitHub | Modo GitHub |
| `CONTENT_GITHUB_REPO` | Nombre del repositorio | Modo GitHub |
| `CONTENT_GITHUB_REF` | Rama o tag, normalmente `main` | Modo GitHub |
| `CONTENT_GITHUB_PATH` | Carpeta Markdown, normalmente `content` | Modo GitHub |
| `CONTENT_HTTP_BASE_URL` | URL HTTP/S3-compatible | Modo HTTP |
| `CONTENT_HTTP_VERSION_URL` | URL opcional de versión/checksum | No |
| `CONTENT_LOCAL_BASE_URL` | Ruta montada, normalmente `/data/content` | Modo local |
| `CONTENT_LOCAL_VERSION_URL` | Archivo de versión opcional | No |
| `VITE_UMAMI_URL` | URL Umami opcional, durante el build | No |
| `VITE_UMAMI_WEBSITE_ID` | Website ID público de Umami | No |

Los ejemplos de OpenRouter, OpenAI y Ollama están en [`.env.example`](.env.example). Nunca pongas `AI_PROVIDER_API_KEY` en el frontend.

Obtenga una clave gratuita en [openrouter.ai/keys](https://openrouter.ai/keys).

## 🧑‍💻 Desarrollo

```bash
cd src
npm install
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # build de producción → src/dist/
npm run test      # ejecutar tests
npm run lint      # lint
```

## 📦 Despliegue manual (sin deploy.sh)

```bash
# 1. Build
cd src && npm run build && cd ..

# 2. Sincronizar dist
rsync -a --delete src/dist/ runtime/dist/

# 3. Reiniciar el container
docker compose down
docker compose up -d --build
```

## 🌐 Endpoints

| Ruta              | Descripción                  |
|-------------------|------------------------------|
| `/`               | SPA del portfolio terminal   |
| `/health`         | JSON de verificación de salud |
| `/cv/resume.pdf`  | PDF del CV                   |
| `/api/question`   | Proxy OpenRouter (POST)      |

## ✏️ Personalizar el portfolio

Utiliza estos archivos:

| Archivo | Función |
|---|---|
| [`config/portfolio.json`](config/portfolio.json) | Nombre, asistente, SEO, preguntas, fuente Markdown y modelo |
| [`content/fr/`](content/fr/) | Contenido francés y conocimiento IA |
| [`content/en/`](content/en/) | Contenido inglés y conocimiento IA |
| [`content/es/`](content/es/) | Contenido español y conocimiento IA |
| [`src/src/data/profile.ts`](src/src/data/profile.ts) | Fallback estructurado, contactos, experiencia, proyectos y CV |
| [`src/src/i18n.ts`](src/src/i18n.ts) | Textos de la interfaz del terminal |

Campos clave al inicio de `profile.ts`:

| Campo | Descripción |
|-------|-------------|
| `firstName` | Usado en las preguntas de ejemplo IA (`question ¿cuáles son las habilidades de Juan?`) |
| `name` | Nombre completo mostrado en el terminal |
| `email`, `linkedinUrl`, `githubUrl` | Enlaces de contacto |
| `terminalHost` | Dominio mostrado en el prompt del terminal |
| `cvUrl` | URL del PDF del CV servido por el container |

Las cadenas UI (3 idiomas) están en [`src/src/i18n.ts`](src/src/i18n.ts).

Para reemplazar el CV: coloque su PDF en `src/public/cv/` con el nombre `resume.pdf` y actualice `cvUrl` en `profile.ts`.

En modo local, define `CONTENT_MODE=local`, `CONTENT_LOCAL_BASE_URL=/data/content` y coloca los archivos en `data/content/<locale>/`. Para GitHub, HTTPS o S3-compatible, usa el modo correspondiente en `config/portfolio.json` o `.env`.

## 🔄 Reverse proxy (nginx / NPM)

Si utiliza un reverse proxy, asegúrese de que reenvíe las solicitudes tal cual — la configuración nginx dentro del container gestiona directamente el enrutamiento SPA y los archivos estáticos.

El service worker (PWA) excluye automáticamente `/health` y `/cv/` del fallback SPA.
La configuración principal del portfolio es [`config/portfolio.json`](config/portfolio.json). Las variables de entorno son overrides opcionales para el despliegue. Una variable vacía no sobrescribe el valor del archivo JSON, incluido `AI_PROVIDER_MODEL`, que utiliza `ai.model` en ese caso. Si `CONTENT_MODE=github`, no es necesario rellenar las variables HTTP o local: no se utilizan.
