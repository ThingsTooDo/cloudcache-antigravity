import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'esnext',
        lib: {
            entry: 'worker.js',
            fileName: 'worker',
            formats: ['es'],
        },
        outDir: 'dist-worker',
        emptyOutDir: true,
    },
});
