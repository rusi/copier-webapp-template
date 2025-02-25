import { defineConfig } from "vitest/config";
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        fs: {
            // Allow serving files from one level up to the project root
            allow: ['static/'],
        },
        proxy: {
            '/api': 'http://localhost:8000', // Proxy to FastAPI
        },
    },
    test: {
        include: ['test/**/*.{test,spec}.{js,ts}']
    }
});
