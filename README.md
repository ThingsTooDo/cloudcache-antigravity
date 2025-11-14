# Cloudcache

Cloudcache is a multi-module application built on Cloudflare Workers and Pages, integrating with Shopify for e-commerce functionality.

## Quick Start

### Prerequisites

- Node.js 22+ and pnpm 9+
- Cloudflare account with API token
- Shopify Partners account (for app module)

### Initial Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd Cloudcache
   pnpm install
   ```

2. **Configure environment:**

   ```bash
   cp env.example .env
   # Edit .env with your Cloudflare credentials
   ```

3. **Bootstrap infrastructure:**

   ```bash
   # Bootstrap app module for production
   scripts/cloudcache bootstrap app prod

   # Set secrets interactively
   scripts/cloudcache bind app prod
   ```

4. **Start development:**

   ```bash
   # Run all modules in development mode
   pnpm dev

   # Or run individual modules
   pnpm dev:app
   pnpm dev:admin
   pnpm dev:apex
   ```

## Architecture Overview

Cloudcache consists of three modules:

### App Module (`apps/app`)

- **Type:** Cloudflare Worker (Hono)
- **Purpose:** Shopify OAuth integration, API endpoints, webhooks
- **Routes:** `app.cloudcache.ai/*` (production), `staging-app.cloudcache.ai/*` (staging)
- **Secrets:** `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`
- **Storage:** KV namespace for OAuth state and session data

### Admin Module (`apps/admin`)

- **Type:** Cloudflare Worker (Hono)
- **Purpose:** Administrative interface and management APIs
- **Routes:** `admin.cloudcache.ai/*` (production), `staging-admin.cloudcache.ai/*` (staging)
- **Secrets:** `CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`

### Apex Module (`apps/apex`)

- **Type:** Cloudflare Pages (Astro SSR)
- **Purpose:** Public-facing website and marketing pages
- **Routes:** `cloudcache.ai/*`, `www.cloudcache.ai/*` (production), `staging-apex.cloudcache.ai/*` (staging)
- **Secrets:** `CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`

### Shared Packages (`packages/`)

- `platform-env` - Environment variable validation schemas
- `platform-logging` - Structured logging utilities
- `platform-http` - HTTP utilities (CORS, error handling, etc.)
- `platform-crypto` - Cryptographic utilities
- `platform-validate` - Validation schemas (OAuth, webhooks)

## Development Workflow

### Local Development

1. **Start development servers:**

   ```bash
   pnpm dev
   ```

   This starts all modules on different ports:
   - App: `http://localhost:8789`
   - Admin: `http://localhost:8787`
   - Apex: `http://localhost:8788`

2. **Use remote bindings:**
   - Workers use remote bindings for secrets (no `.dev.vars` needed)
   - Access secrets from Cloudflare directly via `wrangler dev --remote`

3. **Build for production:**

   ```bash
   # Build app module (bundles workspace dependencies)
   pnpm --filter @cloudcache/app build:bundle

   # Build admin module
   pnpm --filter @cloudcache/admin build:bundle

   # Build apex module
   pnpm --filter @cloudcache/apex build
   ```

### Deployment

#### Manual Deployment

```bash
# Deploy app module to staging
cd apps/app
pnpm build:bundle
wrangler deploy --env staging --no-bundle

# Deploy admin module to production
cd apps/admin
pnpm build:bundle
wrangler deploy --no-bundle
```

#### Using CI/CD

- Push to `main` branch triggers staging deployment
- Production deployments require manual approval (GitHub Environments)
- Preview deployments run on pull requests

### Infrastructure Management

Use the unified `scripts/cloudcache` script:

```bash
# Bootstrap infrastructure for a module/environment
scripts/cloudcache bootstrap <module> <env>

# Set secrets interactively
scripts/cloudcache bind <module> <env>

# Verify infrastructure and secrets
scripts/cloudcache verify <module> <env>
```

**Modules:** `app`, `admin`, `apex`  
**Environments:** `prod`, `staging`, `preview` (or `prev`)

## Configuration

### Environment Variables

See `env.example` for required variables:

- `CF_API_TOKEN` - Cloudflare API token (CI/CD only)
- `CF_ACCOUNT_ID` - Cloudflare account ID
- `CF_ZONE_ID` - Cloudflare zone ID

### Secrets Management

All runtime secrets are stored in Cloudflare:

- **Workers:** Use `wrangler secret put` (via `scripts/cloudcache bind`)
- **Pages:** Use Cloudflare API (via `scripts/cloudcache bind`)

See [Secrets Management Guide](./docs/secrets-management.md) for details.

### Build Configuration

- **App & Admin:** Use `tsup.config.ts` to bundle workspace dependencies
- **Apex:** Uses Astro build system (no bundling needed)

See [Build Strategy ADR](./docs/adr/001-build-strategy.md) for details.

## Domain Policy

### Production

- `app.cloudcache.ai` - App module
- `admin.cloudcache.ai` - Admin module
- `cloudcache.ai`, `www.cloudcache.ai` - Apex module

### Staging

- `staging-app.cloudcache.ai` - App module
- `staging-admin.cloudcache.ai` - Admin module
- `staging-apex.cloudcache.ai` - Apex module

### Preview

- Uses `workers.dev` subdomains for Workers
- Uses Pages preview URLs for Apex

## Security

### Secrets Policy

- Use environment variables for secrets. Do not commit `.env`, `wrangler.toml.local`, or `.dev.vars`.
- Cloudflare variables: prefer `CF_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. CI sets them via `GITHUB_ENV`.
- Local git hook blocks real tokens (private keys, GitHub/AWS/Slack/Stripe, JWT). It allows Cloudflare variable names unless assigned literal values.
- Lockfile `integrity: sha512` hashes are allowlisted in `.gitleaks.toml`.

### Security Scanning

- Gitleaks runs in CI using `.gitleaks.toml` to reduce false positives.
- To run locally: `pnpm dlx gitleaks detect -c .gitleaks.toml`.

### Access Policies

All production and staging domains are protected by Cloudflare Zero Trust Access:

- IP allowlist for production
- Service token authentication for monitoring
- Configure via `scripts/configure-access.sh`

## Documentation

- [Secrets Management](./docs/secrets-management.md) - How secrets are managed
- [Shopify OAuth Setup](./docs/shopify-oauth-setup.md) - Shopify integration guide
- [Local Development](./docs/local-development.md) - Local development setup
- [Build Strategy ADR](./docs/adr/001-build-strategy.md) - Why we bundle dependencies
- [CTO Review](./docs/cto-review-2025-11-14.md) - Code quality assessment

## Scripts

- `scripts/cloudcache` - Unified infrastructure management
- `scripts/configure-access.sh` - Configure Cloudflare Access policies
- `scripts/shopify/scopes-assert.sh` - Validate Shopify OAuth scopes
- `scripts/setup-env.sh` - Interactive environment setup

## Troubleshooting

### Build Failures

If workspace dependencies fail to resolve:

1. Ensure `pnpm install` completed successfully
2. Check `tsup.config.ts` includes all workspace packages
3. Verify `package.json` lists workspace dependencies

### Deployment Failures

1. Verify secrets are set: `scripts/cloudcache verify <module> <env>`
2. Check build artifacts exist: `test -f apps/<module>/dist/index.js`
3. Review Cloudflare Worker logs: `wrangler tail`

### OAuth Issues

See [Shopify OAuth Setup Guide](./docs/shopify-oauth-setup.md) troubleshooting section.

## Contributing

1. Create a feature branch
2. Make changes
3. Ensure builds pass: `pnpm build`
4. Run linting: `pnpm lint`
5. Submit pull request

CI/CD will automatically:

- Run linting and type checking
- Build modules
- Deploy to preview environment
- Run smoke tests (if configured)
