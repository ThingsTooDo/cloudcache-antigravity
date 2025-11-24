# Shopify App Local Development Test

This document provides a quick test script to verify the Shopify app local development setup.

## Prerequisites

- Copy `.dev.vars.example` to `.dev.vars` and populate with your Shopify credentials
- Ensure all dependencies are installed (`pnpm install`)

## Test Steps

### 1. Build Test

```bash
cd apps/shopapp
pnpm run build
```

**Expected**: Build succeeds with client and server bundles

### 2. Dev Server Test

```bash
cd apps/shopapp
pnpm dev
```

**Expected**:

- Remix dev server starts on port 8789
- No errors in console
- Server shows "Ready" message

### 3. Route Accessibility Test

Open browser to `http://localhost:8789`

**Expected**:

- Home page loads with "Welcome to CloudCache ShopApp" heading
- Links to Remix and Shopify docs are visible
- No console errors

### 4. Hot Module Replacement Test

1. Keep dev server running
2. Edit `app/routes/_index.tsx` - change the heading text
3. Save the file

**Expected**:

- Browser auto-refreshes
- Changes appear without manual reload
- No errors in console

## Known Limitations

- OAuth flow requires actual Shopify credentials and app setup
- Webhooks require ngrok or similar tunnel for local testing
- Session storage requires KV namespace (works in production/preview, mocked in local dev)

## Troubleshooting

- **Port 8789 already in use**: Stop other processes or change port in `package.json`
- **Missing environment variables**: Ensure `.dev.vars` exists with all required variables
- **Build errors**: Run `pnpm install` to ensure all dependencies are installed
