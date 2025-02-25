import { mdsvex } from "mdsvex";
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: [vitePreprocess(), mdsvex()],

    kit: {
        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        // adapter: adapter(),
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null,
        //     fallback: '404.html' // Enable SPA fallback
        }),
        // paths: {
        //     base: '', // Use relative paths
        //     assets: '', // Use relative paths
        // },
        prerender: {
            handleHttpError: 'warn',
            handleMissingId: 'warn',
            entries: ['*'] // Enable prerendering for all routes
        }
    },

    extensions: [".svelte", ".svx"]
};

export default config;
