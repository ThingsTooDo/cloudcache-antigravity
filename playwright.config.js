import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './scripts/verify',
  reporter: 'list',
});
