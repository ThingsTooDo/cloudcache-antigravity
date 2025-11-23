# Website Module Refactor Plan

## Goal

Refactor the **WEBSITE** module from a Cloudflare **Pages** deployment (Astro static site) to a **Workers‑first** deployment. The Astro build will be generated as static assets and then served from a Cloudflare Worker, aligning with the organization’s unified edge compute strategy.

## Operational Impact

- **SHOPIFY** and **ADMIN** remain unchanged (Workers‑first).
- **WEBSITE** will no longer use `wrangler pages` or any Pages‑specific configuration.
- All static assets (HTML, CSS, JS, images) will be bundled into the Worker and served via the Worker’s routing logic.
- Deployment scripts, documentation, and truth files must be updated to reflect the new workflow.

## High‑Level Steps

1. **Audit Current Pages Setup**
   - Review `apps/website/` (or equivalent) Astro project.
   - Identify any Pages‑only settings in `wrangler.toml`, `package.json`, and CI scripts.

2. **Update Build Pipeline**
   - Ensure `pnpm run build` (Astro) outputs to `./dist`.
   - Add a post‑build step that copies `dist/*` into a `static/` folder inside the Worker project (e.g., `apps/website/static`).
   - Adjust `vite.config.ts` (if present) to treat `static/` as a public asset directory.

3. **Create Worker Entry Point**
   - Add `apps/website/worker.js` (or `.ts`) that:

     ```ts
     import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

     export default {
       async fetch(request, env, ctx) {
         try {
           return await getAssetFromKV(request, {
             mapRequestToAsset: (req) =>
               new Request(`${new URL(req.url).origin}/static${new URL(req.url).pathname}`, req),
           });
         } catch (e) {
           return new Response("Not found", { status: 404 });
         }
       },
     };
     ```

   - Configure `wrangler.toml` `main = "./worker.js"` and remove any `pages_build_output_dir`.

4. **Update Wrangler Configuration**
   - Remove Pages‑specific fields (`pages_build_output_dir`).
   - Add a `[[kv_namespaces]]` binding if static assets are stored in KV (optional) or rely on built‑in asset handler.
   - Ensure `compatibility_date` is set and `type = "javascript"` (or `type = "webpack"` if bundling).

5. **Refactor Scripts**
   - In `scripts/deploy-module.sh`, add a case for `website` that runs:

     ```bash
     pnpm --filter website run build   # Astro build
     cp -R dist/* apps/website/static/   # copy assets
     wrangler deploy --env preview      # Workers deploy
     ```

   - Update `scripts/deploy-preview.sh` to include the new `website` step.

6. **Documentation Updates**
   - **`docs/all-deployment-truth.md`**: Replace any `*.pages.dev` URLs for WEBSITE with `website-worker-preview.cloudcache.workers.dev`.
   - **`docs/all-code-truth.mdc`**: Add a rule entry for the new Workers‑first static asset handling.
   - **`docs/plans/website-refactor-plan.md`** (this file) – link from the deployment truth.
   - Update `README.md` sections that mention Pages deployment.

7. **Testing & Verification**
   - **Local**: Run `pnpm dev` for Astro, then start the Worker locally with `wrangler dev --local` to ensure assets are served correctly.
   - **Automated**: Extend `scripts/cloudcache test-preview website` to hit `/` and a sample static asset, checking for 200 responses and correct content‑type.
   - **Health Checks**: Add `/healthz` endpoint to the Worker that returns version info.

8. **Rollout**
   - Deploy to **preview** environment first (`website-worker-preview.cloudcache.workers.dev`).
   - Verify UI, asset loading, SEO meta tags, and performance (aim < 200 ms response).
   - Once validated, promote to **staging** (`website-worker-staging.cloudcache.workers.dev`).
   - Update any DNS CNAMEs that previously pointed to the Pages domain.

## Risks & Mitigations

| Risk                                    | Impact             | Mitigation                                                                                       |
| --------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| Asset size exceeds Worker limit (10 MB) | Deployment failure | Use KV asset handler or split large assets into separate KV namespaces; keep bundle under limit. |
| Cache‑control headers missing           | Stale content      | Ensure Astro build outputs proper `Cache-Control` and Worker forwards them.                      |
| Existing Pages URLs break               | 404 for users      | Add redirects from old `*.pages.dev` to new Worker URL during transition.                        |

## Acceptance Criteria

- `website-worker-preview.cloudcache.workers.dev` serves the full Astro site with correct styling and routing.
- All automated tests pass (`scripts/cloudcache test-preview website`).
- Documentation reflects the new deployment path and URLs.
- No Pages‑specific configuration remains in the repository.

---

## Naming Conventions Review

**Preview URLs** (Workers.dev subdomains):

- Shopify: `https://shopify-worker-preview.cloudcache.workers.dev`
- Admin: `https://admin-worker-preview.cloudcache.workers.dev`
- Website: `https://website-worker-preview.cloudcache.workers.dev`

**Staging URLs** (custom domain subdomains):

- Shopify: `https://staging-shopify.cloudcache.ai`
- Admin: `https://staging-admin.cloudcache.ai`
- Website: `https://staging-website.cloudcache.ai`

**Production URLs**:

- Shopify: `https://shopify.cloudcache.ai`
- Admin: `https://admin.cloudcache.ai`
- Website: `https://cloudcache.ai` (primary) and `https://www.cloudcache.ai` (www alias)

> **Best‑practice check:**
>
> - All URLs are lower‑case, hyphenated, and use the appropriate domain for the environment.
> - Preview URLs correctly use the Cloudflare Workers `.workers.dev` domain, matching the Workers‑first deployment model.
> - Staging and production URLs use the custom `cloudcache.ai` domain with clear subdomain prefixes.
> - No conflicts with existing bindings or DNS records are evident.
> - Therefore the naming conventions conform to Cloudflare and organizational standards.

---

## Refactor Ordering Note

The **SHOPAPP → SHOPIFY** refactor (renaming/realigning the module) can be scheduled as one of the early steps in the overall migration plan. Suggested placement:

1. **Step 1** – Audit current Pages setup (already part of the website refactor).
2. **Step 2** – **SHOPAPP > SHOPIFY** refactor (update module name, bindings, and URLs).
3. **Step 3** – Update build pipeline and worker entry point for WEBSITE.

If you prefer a different ordering, let me know and I will adjust the plan accordingly.

---

_All changes respect the project's naming conventions (lowercase, hyphenated) and are linked to the appropriate truth files._
