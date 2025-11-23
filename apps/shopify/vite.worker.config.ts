import { defineConfig } from 'vite';

export default defineConfig({
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    build: {
        target: 'esnext',
        lib: {
            entry: 'worker.js',
            fileName: 'worker',
            formats: ['es'],
        },
        outDir: 'dist-worker',
        emptyOutDir: true,
        rollupOptions: {
            // We need to bundle everything for the worker
            external: [],
        },
    },
    resolve: {
        mainFields: ['module', 'main'],
        conditions: ['worker', 'browser'],
    },
});
