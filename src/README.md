# Maxime Lemenand Terminal Portfolio V2

Terminal-style portfolio for Maxime Lemenand.

Stack: React, TypeScript, Vite, Styled Components.

Local development: npm install, then npm run dev.
Production build: npm run build.

Deployment flow on Docker-LLM: build in /opt/terminal-portfolios/portfolio2-src, copy dist to /opt/terminal-portfolios/runtime-portfolio2/dist, rebuild portfolio2-terminal, recreate the container with Docker Compose.
