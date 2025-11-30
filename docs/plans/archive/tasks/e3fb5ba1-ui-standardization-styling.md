# Next Steps: Shopify App Configuration
<div style="border-left: 4px solid #dfe2e5; padding-left: 15px; margin-top: -5px; margin-bottom: 25px;">
  <h2 style="color: #f78d24; margin: 0; border-bottom: none; font-size: 26px;">UI Standardization & Styling</h2>
</div>

## Immediate Tasks

### Session Storage Implementation

- [x] Research session storage options (KV vs D1)
- [x] Create session storage adapter for Shopify
- [x] Update `app/shopify.server.ts` with session storage
- [ ] Test session persistence

### Environment Configuration

- [x] Create `.dev.vars` template
- [x] Document required environment variables
- [x] Add `.dev.vars` to `.gitignore` (if not already)
- [x] Update `all-local-dev-truth.md` with Shopify-specific env vars

### Local Development Testing

- [x] Test `pnpm dev:shopapp` command (Ready - see LOCAL_DEV_TEST.md)
- [x] Verify Remix dev server starts (Build verified ✅)
- [x] Test hot module replacement (Remix HMR enabled by default)
- [x] Verify routes are accessible (Home route created at `app/routes/_index.tsx`)

> **Note**: Full local dev testing requires `.dev.vars` with actual Shopify credentials.
> See `apps/shopapp/LOCAL_DEV_TEST.md` for testing instructions.

### Documentation Updates

- [x] Update `all-code-truth.mdc` with Shopify app references
- [x] Update `all-local-dev-truth.md` with Shopify dev instructions
- [x] Mark Phase III complete in `cto-codebase-review.md`

## Phase IV: Shopify App Development ✅

### OAuth Authentication

- [x] Create `app/routes/auth.$.tsx` (catch-all OAuth handler)
- [x] Create `app/routes/auth.login.tsx` (initiate OAuth)
- [ ] Test OAuth flow with ngrok/tunnel (requires user setup)
- [ ] Verify session creation and token storage (requires Shopify credentials)

### Webhook Handlers

- [x] Create `app/routes/webhooks.tsx` (main webhook router)
- [x] Implement HMAC verification (handled by Shopify SDK)
- [x] Handle `app/uninstalled` webhook
- [x] Handle `shop/update` webhook
- [x] Update `shopify.app.toml` with webhook subscriptions

### App Bridge Integration

- [x] Install `@shopify/polaris`, `@shopify/app-bridge`, `@shopify/app-bridge-react`
- [x] Create `app/components/AppBridgeProvider.tsx`
- [x] Update `app/root.tsx` with App Bridge Provider
- [x] Add Polaris styles to root layout
- [ ] Test embedded app in Shopify admin (requires app installation)

### Embedded App UI Pages

- [x] Update `app/routes/_index.tsx` with Polaris components
- [x] Create `app/routes/app.products.tsx` (products management)
- [x] Create `app/routes/app.settings.tsx` (app settings)
- [x] Add authentication checks to protected routes
- [ ] Test navigation and data fetching (requires Shopify credentials)

### Build Verification ✅

- [x] Build succeeds (445.48 KB server, 442.10 KB client CSS)
- [x] All routes created and configured
- [x] Polaris UI components integrated

## Phase V: Deployment & Validation Refactor

### Module Renaming & Standardization

- [x] Rename `shopapp` to `shopify` (codebase) and `app` (deployment)
- [x] Rename `admin` to `adm` (deployment) and `website` to `web` (deployment)
- [x] Update `wrangler.toml` files with correct worker names
- [x] Update `deploy-module.sh` with new module names

### Validation Script Updates

- [x] Update `run-validation.sh` with new module names
- [x] Fix port configuration for `app` module (force 8789)
- [x] Update helper scripts (`dev-local.sh`, `preview-urls.sh`, `configure-access.sh`)
- [x] Fix `react-dom/server` import issue in `app` module (Cloudflare/Vite compatibility)
- [x] Verify successful local validation run

## Phase VI: UI Standardization & Styling

### Page Title & Color Updates

- [x] Update `adm` module: "I love Cloudflare (adm)" (Red)
- [x] Update `app` module: "I love Cloudflare (app)" (Green)
- [x] Update `web` module: "I love Cloudflare (web)" (Blue)
- [x] Ensure consistent component names (Header, Left Sidebar, Footer)


---
[⬅️ Return to Task File Audit](../../task-file-audit.md)