import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/admin/index.ts'],
    outDir: 'dist/admin',
    format: ['esm'],
    target: 'es2022',
    clean: true,
    dts: true,
  },
  {
    entry: ['src/apex/index.ts'],
    outDir: 'dist/apex',
    format: ['esm'],
    target: 'es2022',
    clean: true,
    dts: true,
  },
  {
    entry: ['src/app/index.ts'],
    outDir: 'dist/app',
    format: ['esm'],
    target: 'es2022',
    clean: true,
    dts: true,
  }
]);
