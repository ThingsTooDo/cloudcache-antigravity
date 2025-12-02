# Agent Quick Reference Card

**Last Updated**: 2025-12-01  
**Rule Reference**: `docs/truth/all-code-truth.mdc`  
**Related**: `docs/truth/all-system-truth.md`

---

## Common Commands

| Task                 | Command                                           |
| -------------------- | ------------------------------------------------- |
| Start local dev      | `pnpm dev` or `bash scripts/dev-local.sh`         |
| Stop local dev       | `bash scripts/dev-stop.sh`                        |
| Deploy preview       | `bash scripts/deploy-preview.sh`                  |
| Deploy single module | `bash scripts/deploy-module.sh <module> <env>`    |
| Run validation       | `bash scripts/validation/run-validation.sh`       |
| Pre-commit check     | `bash scripts/all-git-truth.sh --pre-commit`      |
| Validate markdown    | `bash scripts/all-git-truth.sh --validate-md`     |
| Switch IDE           | `pnpm switch:cursor` or `pnpm switch:antigravity` |

---

## Key File Locations

| Type                  | Location                                              |
| --------------------- | ----------------------------------------------------- |
| Truth files           | `docs/truth/`                                         |
| Plans                 | `docs/plans/`                                         |
| Prompt archives       | `docs/prompts/cursor/` or `docs/prompts/antigravity/` |
| Scripts               | `scripts/`                                            |
| Cursor rules          | `.cursor/rules/`                                      |
| Antigravity workflows | `.agent/workflows/`                                   |
| Session handoff       | `docs/plans/session-handoff.md`                       |
| Module rules          | `apps/<module>/.cursor/rules/`                        |

---

## Naming Conventions

| Rule                       | Example                                     |
| -------------------------- | ------------------------------------------- |
| Lowercase only             | `deploy-module.sh` not `Deploy-Module.sh`   |
| Hyphen-separated           | `all-code-truth.md` not `all_code_truth.md` |
| No number prefixes         | `setup-guide.md` not `001-setup-guide.md`   |
| `all-` prefix = truth only | `all-deployment-truth.md`                   |

---

## Prohibited Patterns

- `one.plan.md` - never create
- `wrangler deploy` directly - use `deploy-module.sh`
- `pages.dev` references - use staging subdomains
- Plans outside `docs/plans/`
- Uppercase in filenames
- Underscore separators (except DB migrations)

---

## Session Protocol

### Starting a Session

1. Read `docs/plans/session-handoff.md` (latest entry)
2. Read `docs/truth/all-code-truth.mdc`

### Ending a Session

1. Summarize to `docs/plans/session-handoff.md`
2. Use format: `## [YYYY-MM-DD HH:MM] [IDE]: "[Title]"`

### Prompt Archive

- Start: `"Topic: <name>"`
- Save: `"Save prompt"` or `"Log prompt"`
- End: `"End topic"`

---

## Modules

| Module        | Port | Path        |
| ------------- | ---- | ----------- |
| app (Shopify) | 8788 | `apps/app/` |
| web (Astro)   | 8787 | `apps/web/` |
| adm (Admin)   | 8789 | `apps/adm/` |

---

## Health Endpoints

| Environment | URL Pattern                                      |
| ----------- | ------------------------------------------------ |
| Local       | `http://localhost:<port>/healthz`                |
| Preview     | `https://staging-<module>.cloudcache.ai/healthz` |
| Production  | `https://<module>.cloudcache.ai/healthz`         |
