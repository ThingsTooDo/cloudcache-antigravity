import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    // Static site generation - no adapter needed for Cloudflare Pages
    build: {
        format: 'directory'
    }
});
