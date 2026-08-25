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
| Runtime | nginx:alpine (enrutamiento SPA + proxy del provider configurado) |
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
│   ├── nginx.conf.template   ← enrutamiento SPA + proxy del provider
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
# editar config/portfolio.json y .env

# 3. Desplegar
./deploy.sh
```

El portfolio está disponible en `http://localhost:3012` (o el PORT configurado).

Una sola imagen Docker contiene ahora la interfaz split-screen completa: asistente IA a la izquierda, separador redimensionable y CLI local a la derecha. El CLI se sirve desde `/portfolio-cli/` sin depender de otro dominio.

## 🔧 Configuración

El archivo único para toda la configuración no secreta es [`config/portfolio.json`](config/portfolio.json). Contiene el nombre, hostname del terminal, textos del asistente, metadatos SEO, preguntas, provider IA, Umami y fuente Markdown.

Docker monta este archivo al iniciar:

```yaml
volumes:
  - ./config:/usr/share/nginx/html/config:ro
  - ./content:/usr/share/nginx/html/data/content:ro
  - ./private:/run/portfolio-private:ro
```

Edita los Markdown de `content/fr/`, `content/en/` y `content/es/` para actualizar los comandos. El navegador comprueba la versión configurada al iniciar y solo vuelve a descargar los archivos cuando cambia. El comando `question` usa el mismo contenido Markdown.

### Métodos de hosting de Markdown

- **GitHub público** — usa `content.mode: "github"` y configura `owner`, `repo`, `ref` y `path`. No se envía token, por lo que el repositorio debe ser público. Al abrir la página, el navegador comprueba el SHA y, si cambia, vuelve a descargar los 27 Markdown FR/EN/ES. No hace falta `deploy.sh`.
- **HTTP/HTTPS, S3 o CDN** — usa `content.mode: "http"`, configura `baseUrl` y opcionalmente `versionUrl`. El origen debe permitir CORS.
- **Volumen Docker local** — usa `content.mode: "local"` con `baseUrl: "/data/content"`. Compose monta `./content`; solo hace falta editar el archivo y recargar la página.

Los archivos FR/EN/ES se cargan al abrir la página. Si falta un archivo EN o ES, se usa FR, y el Markdown incluido en el bundle queda como último fallback.

### Contexto privado solo para la IA

El contexto privado siempre es local al servidor, independientemente de `content.mode`. Crea `private/.IAinformation.md` desde el ejemplo. Git lo ignora, Docker lo monta fuera del directorio web y el backend lo lee en cada pregunta.

```bash
cp private/.IAinformation.example.md private/.IAinformation.md
chmod 600 private/.IAinformation.md
```

Configura la ruta con `ai.privateContextFile: "/run/portfolio-private/.IAinformation.md"`. No es una bóveda de secretos: el provider recibe el contenido y el modelo puede divulgar un dato relevante. No guardes contraseñas, claves API, tokens ni credenciales.

### Variables de entorno

| Variable | Descripción | Requerido |
|---|---|---|
| `AI_PROVIDER_API_KEY` | Clave del provider, conservada en el backend | Según el provider |
| `PORT` | Puerto del host, por defecto `3012` | No |

Los parámetros `providerType`, `providerUrl` y `model` están en `config/portfolio.json`. Los ejemplos OpenRouter, OpenAI y Ollama están en [`.env.example`](.env.example). Nunca pongas `AI_PROVIDER_API_KEY` en el frontend.

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
| `/`               | Split-screen asistente IA + CLI |
| `/portfolio-cli/` | CLI local incluido |
| `/health`         | JSON de verificación de salud |
| `/cv/resume.pdf`  | PDF del CV                   |
| `/api/question`   | Proxy del provider configurado (POST)      |

## ✏️ Personalizar el portfolio

Utiliza estos archivos:

| Archivo | Función |
|---|---|
| [`config/portfolio.json`](config/portfolio.json) | Nombre, asistente, SEO, preguntas, provider, analytics y fuente Markdown |
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
| `terminalHost` | Dominio mostrado en el prompt; configurado en `portfolio.json` |
| `cvUrl` | URL del PDF del CV servido por el container |

Las cadenas UI (3 idiomas) están en [`src/src/i18n.ts`](src/src/i18n.ts).

Para reemplazar el CV: coloque su PDF en `src/public/cv/` con el nombre `resume.pdf` y actualice `cvUrl` en `profile.ts`.

En modo local, define `content.mode` como `local`, usa `/data/content` en `config/portfolio.json` y modifica los archivos en `content/<locale>/`. El repositorio GitHub debe ser público porque no se usa ningún token.

Para probar un cambio local, edita `content/fr/about.md`, recarga la página y ejecuta `about`. No hace falta reconstruir la imagen, reiniciar Compose ni ejecutar `deploy.sh`. En modo GitHub, haz commit del Markdown en la rama pública configurada y recarga la página; no hace falta redeploy. Solo se necesita rebuild al modificar la aplicación o usar contenido incluido en la imagen.

## 🔄 Reverse proxy (nginx / NPM)

Si utiliza un reverse proxy, asegúrese de que reenvíe las solicitudes tal cual — la configuración nginx dentro del container gestiona directamente el enrutamiento SPA y los archivos estáticos.

El service worker (PWA) excluye automáticamente `/health` y `/cv/` del fallback SPA. La configuración no secreta no se duplica en `.env`.
