import { defineConfig } from "tsup";
import { execSync } from "child_process";
import { resolve } from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  splitting: false,
  sourcemap: false,
  clean: true,
  // Bundle workspace packages but keep external dependencies external
  noExternal: [/^@cloudcache/],
  esbuildOptions(options) {
    // Use Node module resolution
    options.platform = "node";
    options.bundle = true;
    // Explicitly set mainFields to use standard Node resolution
    options.mainFields = ["module", "main"];

    // Define __VERSION__ to be Git commit hash
    options.define = {
      ...options.define,
      __VERSION__: JSON.stringify(execSync("git rev-parse --short HEAD").toString().trim()),
    };

    // Alias workspace packages to their source files
    options.alias = {
      "@cloudcache/worker-utils": resolve(__dirname, "../../packages/worker-utils/src/index.ts"),
    };
  },
});
