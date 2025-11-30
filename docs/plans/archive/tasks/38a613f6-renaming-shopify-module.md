# Task: Multi-Environment Deployment Testing Plan
<div style="border-left: 4px solid #dfe2e5; padding-left: 15px; margin-top: -5px; margin-bottom: 25px;">
  <h2 style="color: #f78d24; margin: 0; border-bottom: none; font-size: 26px;">Renaming Shopify Module</h2>
</div>

## Planning Phase

- [x] Identify all three modules (shopify, admin, website)
- [x] Review wrangler.toml configurations for each module
- [x] Review all-code-truth.mdc and all-deployment-truth.md
- [x] Map out all deployment environments (preview, staging, production)
- [x] Create comprehensive implementation plan
- [x] Request user review and approval

## Implementation Phase

- [x] Deploy all modules to all three environments
- [x] Open browser tabs for deployment targets (Preview & Staging only)
- [x] Verify each deployment target is accessible
- [x] Document results

## Verification Results

- **Preview**:
  - Shopify: 200 OK (Fixed)
  - Admin: 200 OK
  - Website: 200 OK (Fixed)
- **Staging**:
  - Shopify: 200 OK (Fixed)
  - Admin: 302 (Cloudflare Access)
  - Website: 200 OK (Fixed)
- **Production**:
  - Shopify: 522 (Connection Timeout)
  - Admin: 302 (Cloudflare Access)
  - Website: 302 (Cloudflare Access)

## Investigation Phase (Completed)

- [x] Check `apps/shopify` for `/healthz` route implementation
- [x] Check `apps/website` for `/healthz` route implementation
- [x] Fix missing or broken health checks
- [x] Re-verify preview endpoints

## Fix & Polish Phase

![Website Staging Not Found](/Users/rrokk/.gemini/antigravity/brain/38a613f6-1443-4f34-9f73-2f9e27606200/uploaded_image_1763942616680.png)
![Shopify Preview Error](/Users/rrokk/.gemini/antigravity/brain/38a613f6-1443-4f34-9f73-2f9e27606200/uploaded_image_0_1763943465467.png)
![Shopify Staging Error](/Users/rrokk/.gemini/antigravity/brain/38a613f6-1443-4f34-9f73-2f9e27606200/uploaded_image_1_1763943465467.png)
![Admin Staging Login](/Users/rrokk/.gemini/antigravity/brain/38a613f6-1443-4f34-9f73-2f9e27606200/uploaded_image_2_1763943465467.png)
![App Preview Verified](/Users/rrokk/.gemini/antigravity/brain/38a613f6-1443-4f34-9f73-2f9e27606200/uploaded_image_1763945960206.png)

- [x] **Shopify**: Debug "Application Error" (likely build/env issue)
- [x] **Website**: Debug "Not Found" (likely KV/Manifest issue)
- [x] **Admin**: Update content to "I love Cloudcache" (centered)
- [x] **Shopify**: Update content to "I love Cloudcache" (centered)
- [x] **Website**: Update content to "I love Cloudcache" (centered)
- [x] Deploy and Verify all fixes

## Rename Phase (Shopify -> App)

- [x] Rename `apps/shopify` to `apps/app`
- [x] Delete `apps/shopapp`
- [x] Update `apps/app/package.json`
- [x] Update `apps/app/wrangler.toml`
- [x] Update `apps/app/shopify.app.toml`
- [x] Update `apps/app/worker.js`
- [x] Update `scripts/deploy-module.sh`
- [x] Update `scripts/deploy-preview.sh`
- [x] Update `scripts/configure-access.sh`
- [x] Update `docs/all-deployment-truth.md`
- [x] Deploy and Verify new `app` module


---
[⬅️ Return to Task File Audit](../../task-file-audit.md)