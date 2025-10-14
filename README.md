# Cloudcache

## Secrets policy

- Use environment variables for secrets. Do not commit `.env`, `wrangler.toml.local`, or `.dev.vars`.
- Cloudflare variables: prefer `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. CI sets them via `GITHUB_ENV`.
- Local git hook blocks real tokens (private keys, GitHub/AWS/Slack/Stripe, JWT). It allows Cloudflare variable names unless assigned literal values.
- Lockfile `integrity: sha512` hashes are allowlisted in `.gitleaks.toml`.

## Security scanning

## Domain Policy

- Production: `app.cloudcache.ai`, `admin.cloudcache.ai`, `cloudcache.ai` (plus `www.cloudcache.ai`)
- Staging: `staging-app.cloudcache.ai`, `staging-admin.cloudcache.ai`, `staging-apex.cloudcache.ai`
- Preview (Pages): `[hash].app-cloudcache.pages.dev`, `[hash].admin-cloudcache.pages.dev`, `[hash].apex-cloudcache.pages.dev`

- Gitleaks runs in CI using `.gitleaks.toml` to reduce false positives.
- To run locally: `pnpm dlx gitleaks detect -c .gitleaks.toml`.

