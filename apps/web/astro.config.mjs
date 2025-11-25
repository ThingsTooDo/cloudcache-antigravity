import { defineConfig } from 'astro/config';
import { execSync } from 'child_process';

const gitHash = execSync("git rev-parse --short HEAD").toString().trim();

// https://astro.build/config
export default defineConfig({
    // Static site generation - no adapter needed for Cloudflare Pages
    build: {
        format: 'directory'
    },
    vite: {
        define: {
            "process.env.GIT_HASH": JSON.stringify(gitHash),
        },
    },
});
