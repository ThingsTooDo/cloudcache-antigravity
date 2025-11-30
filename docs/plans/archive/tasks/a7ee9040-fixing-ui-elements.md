# UI Standardization and Favicon Update
<div style="border-left: 4px solid #dfe2e5; padding-left: 15px; margin-top: -5px; margin-bottom: 25px;">
  <h2 style="color: #f78d24; margin: 0; border-bottom: none; font-size: 26px;">Fixing UI Elements</h2>
</div>

- [x] Process Favicon
  - [x] Create Python script to resize uploaded image to 32x32.
  - [x] Generate `favicon.ico` for `apps/web`.
  - [x] Generate Base64 string for `apps/adm` and `apps/app`.
- [x] Update ADM Module (`apps/adm`)
  - [x] Add CSS slide-in animation to title.
  - [x] Update `FAVICON_BASE64` in `src/index.ts`.
- [x] Update WEB Module (`apps/web`)
  - [x] Align layout with ADM (Header, Sidebar, Main, Footer).
  - [x] Add CSS slide-in animation.
  - [x] Place `favicon.ico` in `public/` (create if needed).
- [x] Update APP Module (`apps/app`)
  - [x] Align layout with ADM.
  - [x] Add CSS slide-in animation.
  - [x] Update `FAVICON_BASE64` in `src/templates/splash.ts` (or `index.ts`).
- [x] Verify
  - [x] Restart local servers (`dev-local.sh`).
  - [x] Open Google Chrome with all 3 tabs.


---
[⬅️ Return to Task File Audit](../../task-file-audit.md)