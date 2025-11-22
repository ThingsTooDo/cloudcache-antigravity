# App Bundle Debug Guide

**Last Updated:** 2025-11-22
**Rule Reference:** `.cursor/rules/all-code-truth.mdc`
**Canonical Source:** `docs/all-deployment-truth.md`

## Purpose

Document the steps to debug why the **APP** module bundle still contains the legacy "I love anti‑gravity" UI despite source changes.

## Steps

1. Verify the source template `apps/app/src/templates/splash.ts` contains the correct UI.
2. Add a temporary `console.log('🚀 splash.ts loaded');` to `splash.ts` to confirm the runtime loads the new file.
3. Run a minimal test by replacing `renderPage` return value with a simple string, e.g., `return '<h1>TEST‑BUNDLE</h1>';`.
4. Clean caches and rebuild:
   ```bash
   rm -rf apps/app/dist apps/app/node_modules/.cache && pnpm build:bundle
   ```
5. Deploy using the canonical script:
   ```bash
   bash scripts/deploy-module.sh app preview
   ```
6. Open the preview URL (`https://app-worker-preview.cloudcache.workers.dev/`) and check Cloudflare Workers logs for the console output.
7. If the old UI still appears, search for any other entry points or stray template files that might be bundled.
8. Update `docs/all-deployment-truth.md` if new URLs or health‑check endpoints are added during debugging.

## References

- `.cursor/rules/all-code-truth.mdc`
- `docs/all-deployment-truth.md`
- `scripts/deploy-module.sh`
- `scripts/validation/run-validation.sh`

## Post‑debug cleanup

- Remove the temporary `console.log` and test string.
- Run `bash scripts/all-git-truth.sh --validate-md` to ensure this doc complies with MD creation rules.
- Commit the cleaned version.
