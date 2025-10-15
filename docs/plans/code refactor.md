# Code Refactor Plan (CTO Review)

## Finished

- Canonical domains and staging scheme
- Standardized staging to `staging-<module>.cloudcache.ai` (hyphen prefix); removed legacy suffix/dot variants.
- Updated scripts: `access_setup_apps.sh`, `setup-zone-routes.sh`, `fix-dns-workers-only.sh`, `configure-workers-zero-trust.sh` (FQDN DNS upsert), and `cf-env.sh` (module-only tokens, canonical mapping).
- Updated wrangler comments to reference staging preview (no Cloudflare Pages).
- Zero Trust policies (development lockdown)
- Applied IP allowlist + deny-all to prod/staging:
  - `cloudcache.ai`, `app.cloudcache.ai`, `admin.cloudcache.ai`
  - `staging-apex.cloudcache.ai`, `staging-app.cloudcache.ai`, `staging-admin.cloudcache.ai`
- Auto-backed up policies under `docs/zero-trust/backups/`.
- Cloudflare Pages removal and guardrails
- Cloudflare inventories show zero Pages projects, zero `.pages.dev` Access apps, and zero DNS to `.pages.dev`.
- Removed repo references; deleted `pages_inventory.tsv`.
- Added `docs/zero-trust/PREVIEW_POLICY.md` (staging-only previews).
- Added CI guard `.github/workflows/pages-dev-ban.yml` (code paths only) and `.cursor/rules/pages_ban.mdc`.
- Updated `scripts/snapshot-cloudflare-inventory.sh` to stop exporting Pages projects.
- Support diagnostics
- `docs/zero-trust/support-bundle.md` updated with expected behavior and minimal repro; captured CF‑RAYs for team-domain and app-domain 404s.
- Plans & structure
- `docs/plans/pages dev complete deletion and refactor plan.md` created with accomplishments/validation.

## Priority

- Rollback helper for Access policies
- Implement `scripts/access-restore-policies.sh <domain> <backup.json>` to reapply saved policy sets (leverages existing backups).
- Full verification matrix of lockdown
- For each prod/staging domain: from allowed IP expect 200; from non-allowed expect 403; capture `CF-RAY`. Publish `docs/zero-trust/verification-<ts>.md`.
- Zero Trust service-auth 404 escalation package
- Consolidate latest CF‑RAYs, AUDs, and Access app flags in a single escalation doc; track with Support until resolved; document interim posture (IP allowlist/SSO).
- Domain/Policy documentation
- Add `docs/zero-trust/POLICY.md` (canonical domain policy, staging-only previews, lockdown overview, how to relax for production).
- Planning guardrails (location + enforcement)
- Add CI check (or extend an existing one) that fails if plan files are created outside `docs/plans/`.
- Add `.cursor/rules/plans_location.mdc` instructing AI tooling to create plans only under `docs/plans/`.

## Non‑Priority

- Pages projects (not in use)
- No projects present; no action unless business reintroduces Pages with Access Controls.
- Link checking CI (quality)
- Optional lychee (or similar) job to catch stale links after edits.
- Pre-commit hook (local)
- Optional hook to block `pages.dev` strings; CI already enforces.
- Production transition playbook (later)
- When ready to launch: open apex to public, keep admin behind SSO, use service tokens/device posture for machine/API access.

### To-dos

- [ ] Add scripts/access-restore-policies.sh to restore Access policies from backup JSON
- [ ] Run full verification across prod/staging domains; record CF-RAYs
- [ ] Consolidate service-auth 404 evidence for Support; track resolution
- [ ] Add docs/zero-trust/POLICY.md (domains + lockdown + prod transition)
- [ ] Add CODEOWNERS entries for Access scripts, wrangler configs, docs/plans/
