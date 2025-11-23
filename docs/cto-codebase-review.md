# CTO Codebase Architecture Review

**Date**: 2025-11-23
**Scope**: Folder Structure, Shopify Alignment, Cloudflare Best Practices, Developer Experience

## Executive Summary

The current codebase follows a `pnpm` workspace monorepo structure, which is a strong foundation. However, it suffers from "root rot" (misleading config files), ambiguous naming (`apps/app`), and a lack of clear Shopify App architecture despite the stated goal. The `scripts/` directory (85+ files) indicates a fragile, imperative build system rather than a declarative one.

To achieve an **A+ Grade**, we must align with Shopify's modern Remix-based architecture, clean up the root workspace, and modernize the task running strategy.

## 1. Current State Analysis

### ✅ Strengths

- **Monorepo Structure**: Correct usage of `pnpm-workspace.yaml` with `apps/*` and `packages/*`.
- **Package Isolation**: Good separation of concerns in `packages/` (e.g., `platform-http`, `platform-logging`).
- **Cloudflare Readiness**: Apps are set up as Workers (`apps/app`, `apps/admin`) or Pages (`apps/apex`) with appropriate build tools (`tsup`, `astro`).
- **Documentation**: Strong "Truth" file culture (`docs/all-git-truth.md`).

### ❌ Critical Issues

1. **Root Pollution**:
   - `wrangler.toml` in root points to a non-existent `src/apex/index.ts`. This is confusing and dangerous.
   - `folder_structure.txt` is a manual artifact that inevitably drifts from reality.
2. **Shopify Alignment Gap**:
   - **Missing Config**: No `shopify.app.toml` found.
   - **Missing Libraries**: `apps/app` has no `@shopify/*` dependencies.
   - **Architecture Mismatch**: Modern Shopify apps typically use Remix. The current `apps/app` is a generic Worker. It is unclear if this is intended to be the App Backend or a separate service.
3. **Ambiguous Naming**:
   - `apps/app`: "App" is too generic. Is it the Shopify App? The Mobile App API? The Main Backend?
   - `apps/admin`: Is this the Shopify Admin extension or a standalone admin tool?
4. **Script Sprawl**:
   - `scripts/` contains 85+ files. This suggests a high maintenance burden and reliance on shell scripts over modern task runners like TurboRepo or Nx.

## 2. Recommendations for Refactoring

│ ├── platform-\* # Existing packages (Keep)
│ ├── shopify-utils/ # [NEW] Shared Shopify logic (Auth, Webhooks)
│ └── config/ # [NEW] Shared TSConfig, ESLint, Wrangler configs

```

### Phase 3: Shopify Integration

- Initialize a **Shopify Remix App** in `apps/shopify-app`. This is the "Golden Path" for Shopify development today.
- If `apps/app` was intended to be the backend, it should expose an API that `apps/shopify-app` consumes, or `apps/shopify-app` should absorb its logic if tightly coupled.

### Phase 4: Developer Experience

- **Adopt TurboRepo**: Replace the 85 scripts with a `turbo.json` pipeline.
  - `turbo build`: Builds all apps/packages in topological order.
  - `turbo dev`: Starts dev servers in parallel.
- **Standardize Configs**: Move `tsconfig.json`, `eslintrc`, etc., to `packages/config` and extend them.

## 3. Action Plan

1. **Approve Refactor**: Confirm if `apps/app` is intended to be the Shopify App or a separate service.
2. **Execute Cleanup**: Remove root debris.
3. **Rename & Reorganize**: Rename apps to be descriptive.
4. **Scaffold Shopify**: Generate the standard Shopify app structure.

---

**Decision Required**:
Is `apps/app` intended to be the **Shopify App Backend** or a **General Purpose API**?
```
