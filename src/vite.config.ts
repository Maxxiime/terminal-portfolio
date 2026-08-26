/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const embedded = process.env.PORTFOLIO_EMBEDDED === "1";

// https://vitejs.dev/config/
export default defineConfig({
  base: embedded ? "/portfolio-cli/" : "/",
  publicDir: embedded ? false : "public",
  plugins: [
    react(),
    ...(!embedded ? [VitePWA({
      registerType: "autoUpdate",
      manifest: false,
      workbox: {
        navigateFallbackDenylist: [/^\/health$/, /^\/cv\//],
      },
    })] : []),
  ],
  build: embedded
    ? { outDir: "dist/portfolio-cli", emptyOutDir: false }
    : undefined,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
