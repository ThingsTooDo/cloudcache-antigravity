# Cloudcache

## Secrets policy

- Use environment variables for secrets. Do not commit `.env`, `wrangler.toml.local`, or `.dev.vars`.
- Cloudflare variables: prefer `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. CI sets them via `GITHUB_ENV`.
- Local git hook blocks real tokens (private keys, GitHub/AWS/Slack/Stripe, JWT). It allows Cloudflare variable names unless assigned literal values.
- Lockfile `integrity: sha512` hashes are allowlisted in `.gitleaks.toml`.

## Security scanning

- Gitleaks runs in CI using `.gitleaks.toml` to reduce false positives.
- To run locally: `pnpm dlx gitleaks detect -c .gitleaks.toml`.

