# Renaming Shopify Module to App

## Goal Description

Rename the `shopify` module to `app` to reflect a more generic naming convention. This involves renaming the directory, updating configuration files (package.json, wrangler.toml, shopify.app.toml), updating deployment scripts, and deploying the changes to preview and staging environments. The external URL will change from `shopify.cloudcache.ai` to `app.cloudcache.ai`.

## User Review Required
>
> [!WARNING]
> **URL Change**: The staging URL will change from `https://staging-shopify.cloudcache.ai` to `https://staging-app.cloudcache.ai`. The production URL will change from `https://shopify.cloudcache.ai` to `https://app.cloudcache.ai`.
> **Preview URL Change**: The preview Worker URL will change from `shopify-worker-preview` to `app-worker-preview`.

## Proposed Changes

### Directory Structure

#### [RENAME] `apps/shopify` -> `apps/app`

#### [DELETE] `apps/shopapp` (remnant)

### Module Configuration (`apps/app`)

#### [MODIFY] [package.json](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/apps/shopify/package.json)

- Change name to `@cloudcache/app`

#### [MODIFY] [wrangler.toml](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/apps/shopify/wrangler.toml)

- Change worker names to `app-worker`, `app-worker-staging`, `app-worker-preview`
- Change routes to `app.cloudcache.ai`, `staging-app.cloudcache.ai`

#### [MODIFY] [shopify.app.toml](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/apps/shopify/shopify.app.toml)

- Change `application_url` to `https://app.cloudcache.ai`
- Update redirect URLs

#### [MODIFY] [worker.js](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/apps/shopify/worker.js)

- Update health check service name to `app-worker`

### Scripts

#### [MODIFY] [deploy-module.sh](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/scripts/deploy-module.sh)

- Remove `app` -> `shopify` mapping
- Ensure `app` maps to `apps/app`

#### [MODIFY] [deploy-preview.sh](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/scripts/deploy-preview.sh)

- Update `shopify` references to `app`
- Update URLs

#### [MODIFY] [configure-access.sh](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/scripts/configure-access.sh)

- Update `shopify` module config to `app`
- Update URLs and token names

### Documentation

#### [MODIFY] [all-deployment-truth.md](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/docs/all-deployment-truth.md)

- Update URL tables and module names

## Verification Plan

### Automated Tests

- Run `scripts/deploy-preview.sh`
- Run `scripts/deploy-module.sh app staging`
- Curl health endpoints:
  - `https://app-worker-preview.cloudcache.workers.dev/healthz`
  - `https://staging-app.cloudcache.ai/healthz`

### Manual Verification

- Verify "I love Cloudcache" content on new URLs.
