# Phase I – Preview Deployment

**Goal**
Deploy the strict UI splash screen for **APP**, **ADMIN**, and **APEX** to the *preview* environment (`*-worker-preview.cloudcache.workers.dev`) and verify the UI in both an external Chrome browser and the internal Antigravity IDE browser.

## UI Specification (common to all three modules)
- **Page title**: `This is Cloudcache "preview" APP` (or ADMIN / APEX). The word *preview* is bright red, the module name (APP/ADMIN/APEX) is black.
- **Styling**:
  - Background: white (`#FFFFFF`).
  - Title font size: **30px**.
  - Title color: `#FF0000` (red) for everything except the final word, which is `#000000` (black).
- **Components** (each centered horizontally & vertically):
  1. **Header** – text `Header`, font **20px**, color black.
  2. **Left Sidebar** – text `Left Sidebar`, font **20px**, color black.
  3. **Footer** – text `Footer`, font **20px**, color black.
  4. **Title Component** – contains the page title as described above.

## Pre‑flight Checks
1. **Naming sanity‑check** – ensure no `*-preview` (without `-worker`) appears in any `wrangler.toml` or helper scripts.
2. **Clean caches & rebuild**:
   ```bash
   rm -rf apps/*/dist apps/*/node_modules/.cache
   pnpm build:bundle
   ```
3. **Run MDC / MD validation**:
   ```bash
   bash scripts/all-git-truth.sh --validate-md
   ```

## Step‑by‑step Implementation
### 1️⃣ Create UI components (shared across modules)
- Add a new file `src/components/header.ts` exporting a string:
  ```ts
  export const Header = `<div class="header">Header</div>`;
  ```
- Add `src/components/sidebar.ts`:
  ```ts
  export const Sidebar = `<div class="sidebar">Left Sidebar</div>`;
  ```
- Add `src/components/footer.ts`:
  ```ts
  export const Footer = `<div class="footer">Footer</div>`;
  ```
- Add `src/components/title.ts` – this file receives the **mode** (`preview`, `staging`, `production`) and **module** name and returns the correctly coloured title:
  ```ts
  export function Title(mode: string, module: string) {
    const colour = mode === 'preview' ? '#FF0000' : mode === 'staging' ? '#FF6600' : '#FF0000';
    return `<div class="title" style="font-size:30px;color:${colour};">
              This is Cloudcache "${mode}" <span class="module-name" style="color:#000000;">${module}</span>
            </div>`;
  }
  ```

### 2️⃣ Update each module’s entry point
- **APP** (`apps/app/src/templates/splash.ts`):
  ```ts
  import { Header } from "../components/header";
  import { Sidebar } from "../components/sidebar";
  import { Footer } from "../components/footer";
  import { Title } from "../components/title";

  export function renderPage() {
    return `
      <!DOCTYPE html>
      <html lang="en"><head><meta charset="UTF-8"><title>APP preview</title>
      <style>
        body{margin:0;padding:0;height:100vh;display:grid;grid-template-rows:60px 1fr 60px;grid-template-columns:200px 1fr;font-family:sans-serif;background:#FFF;}
        .header,.sidebar,.footer{display:flex;justify-content:center;align-items:center;font-size:20px;color:#000;}
        .title{display:flex;justify-content:center;align-items:center;}
      </style></head><body>
        ${Header}
        ${Sidebar}
        <div class="main">${Title('preview','APP')}</div>
        ${Footer}
      </body></html>`;
  }
  ```
- **ADMIN** (`apps/admin/src/index.ts`) – same pattern, replace module name with `ADMIN`.
- **APEX** (`apps/apex/src/index.ts`) – same pattern, replace module name with `APEX`.

### 3️⃣ Deploy
```bash
bash scripts/deploy-module.sh app preview
bash scripts/deploy-module.sh admin preview
bash scripts/deploy-module.sh apex preview   # Pages publish (handled by deploy‑module.sh)
```
The script will:
- Build each module (`pnpm build:bundle` for Workers, `astro build` for Apex via the updated `build` script).
- Publish to the preview workers.dev sub‑domains.

### 4️⃣ Verification
1. **External Chrome** – open the three URLs:
   - `https://app-worker-preview.cloudcache.workers.dev/`
   - `https://admin-worker-preview.cloudcache.workers.dev/`
   - `https://apex-worker-preview.cloudcache.workers.dev/`
2. **Internal Antigravity IDE browser** – use the IDE’s built‑in browser to open the same URLs.
3. **Check** that each page shows:
   - The four components (Header, Left Sidebar, Title, Footer) centered.
   - Title text exactly as specified (red "preview" word, black module name, 30 px).
4. Capture screenshots and store them in `docs/reports/validation/phase‑i‑preview-<timestamp>.md`.

### 5️⃣ Hardening (MDC update)
- Add a note under **Deployment Resilience Patterns** in `.cursor/rules/all-code-truth.mdc` that preview URLs are `*-worker-preview.cloudcache.workers.dev` and that the UI must follow the component spec.
- Ensure `docs/all-deployment-truth.md` table lists the three preview URLs.
- Run `bash scripts/all-git-truth.sh --validate-md` to confirm no stray `*-preview` naming.
- Commit all changes with message `feat: phase‑i preview – UI components, deployment, validation`.

---

# Phase II – Staging Deployment

**Goal**
Deploy the same UI to the *staging* environment (`staging‑*.cloudcache.ai`) and change the title text to **"Staging"** while keeping the same component layout.

## UI Specification (staging)
- Page title: `This is Cloudcache "Staging" APP` (or ADMIN / APEX). The word *Staging* is bright red, module name black, same font sizes.
- All other component styles remain unchanged.

## Pre‑flight
1. Verify `[env.staging]` blocks in each `wrangler.toml` contain the correct custom sub‑domain names (`staging‑app.cloudcache.ai`, etc.).
2. Clean caches & rebuild (same commands as Phase I).
3. Run MDC validation.

## Implementation Steps (mirrors Phase I with minor changes)
1. **Update Title component** to accept a `mode` argument (`preview`, `staging`, `production`). The component already does this – just pass `'staging'`.
2. **Deploy**:
   ```bash
   bash scripts/deploy-module.sh app staging
   bash scripts/deploy-module.sh admin staging
   bash scripts/deploy-module.sh apex staging   # Pages publish to staging‑apex.cloudcache.ai
   ```
3. **Verification** – open the three staging URLs in external Chrome and the internal browser, confirm the title now reads **"Staging"** and the UI components are correct. Capture screenshots in `docs/reports/validation/phase‑ii‑staging-<timestamp>.md`.
4. **Hardening** – update MDC to note that staging URLs are `staging‑*.cloudcache.ai` and that the UI must use the "Staging" title. Update `docs/all-deployment-truth.md` table with the staging URLs. Commit with `feat: phase‑ii staging – UI, deployment, validation`.

---

# Phase III – Production Deployment

**Goal**
Deploy the final UI to production (`app.cloudcache.ai`, `admin.cloudcache.ai`, `cloudcache.ai` for Apex) and change the title text to **"Production"**.

## UI Specification (production)
- Page title: `This is Cloudcache "Production" APP` (or ADMIN / APEX). The word *Production* is bright red, module name black, same font sizes.
- Component layout unchanged.

## Pre‑flight
1. Verify production `wrangler.toml` (no env block) uses the correct worker names (`app-worker`, `admin-worker`). Apex production uses the Pages project bound to `cloudcache.ai`.
2. Clean caches & rebuild.
3. Run MDC validation.

## Implementation Steps
1. **Title component** – pass `'production'`.
2. **Deploy**:
   ```bash
   bash scripts/deploy-module.sh app production
   bash scripts/deploy-module.sh admin production
   bash scripts/deploy-module.sh apex production   # Pages publish to cloudcache.ai
   ```
3. **Verification** – open the three production URLs in external Chrome and the internal browser, confirm the title now reads **"Production"** and the UI components are correct. Capture screenshots in `docs/reports/validation/phase‑iii‑production-<timestamp>.md`.
4. **Hardening** – update MDC to note production URLs and UI spec. Update `docs/all-deployment-truth.md` with production URLs. Commit with `feat: phase‑iii production – UI, deployment, validation`.

---

## Summary of Deliverables
- **Three plan files** (`phase-i-preview.md`, `phase-ii-staging.md`, `phase-iii-production.md`) under `docs/plans/`.
- **Component source files** (`header.ts`, `sidebar.ts`, `footer.ts`, `title.ts`) added to each module’s `src/components/` directory.
- **Updated entry points** for APP, ADMIN, and APEX to import and render the new components.
- **MDC updates** documenting the naming conventions and UI hardening requirements.
- **Documentation updates** in `docs/all-deployment-truth.md` reflecting preview, staging, and production URLs.
- **Validation reports** with screenshots for each phase.

You can now run Phase I using the plan file, then proceed to Phase II and Phase III as described.

---

*All steps respect the rules in `.cursor/rules/all-code-truth.mdc` (plan files under `docs/plans/`, proper naming, and MD validation).*
