import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ["static/"],
    },
    proxy: {
      "/api": "http://localhost:8000", // Proxy to FastAPI
    },
  },
  test: {
    workspace: [
      {
        extends: "./vite.config.ts",
        plugins: [svelteTesting()],
        test: {
          name: "client",
          environment: "jsdom",
          clearMocks: true,
          include: ["test/**/*.svelte.{test,spec}.{js,ts}"],
          exclude: ["src/lib/server/**"],
          setupFiles: ["./vitest-setup-client.ts"],
        },
      },
      {
        extends: "./vite.config.ts",

        test: {
          name: "server",
          environment: "node",
          include: ["test/**/*.{test,spec}.{js,ts}"],
          exclude: ["test/**/*.svelte.{test,spec}.{js,ts}"],
        },
      },
    ],
  },
});
