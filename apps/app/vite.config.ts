import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { execSync } from "child_process";

const gitHash = execSync("git rev-parse --short HEAD").toString().trim();

export default defineConfig({
  define: {
    "process.env.GIT_HASH": JSON.stringify(gitHash),
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      serverModuleFormat: "esm",
      serverPlatform: "neutral",
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
    },
  },
  build: {
    rollupOptions: {
      external: ["react-dom/server"],
    },
  },
  ssr: {
    resolve: {
      conditions: ["workerd", "worker", "browser"],
    },
  },
});
