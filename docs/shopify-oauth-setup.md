# Shopify OAuth Setup Guide

This guide explains how to configure Shopify OAuth for the Cloudcache app module.

## Overview

The app module uses Shopify OAuth 2.0 to authenticate with Shopify stores. This requires:

1. Creating a Shopify app in the Partners dashboard
2. Configuring redirect URIs for each environment
3. Setting required scopes
4. Configuring secrets in Cloudflare Workers

## Required Redirect URIs

Configure these redirect URIs in your Shopify app settings:

### Production

```
https://app.cloudcache.ai/auth/callback
```

### Staging

```
https://staging-app.cloudcache.ai/auth/callback
```

### Preview

```
https://app-worker-preview.<account-subdomain>.workers.dev/auth/callback
```

**Note:** Replace `<account-subdomain>` with your Cloudflare account subdomain. You can find this in the Cloudflare dashboard or by checking your worker's workers.dev URL.

## Required Scopes

The following scopes are required for Cloudcache functionality:

- `read_products` - Read product information
- `write_products` - Create and update products
- `read_script_tags` - Read script tags
- `write_script_tags` - Create and update script tags
- `read_themes` - Read theme information
- `read_orders` - Read order information

These scopes are validated by `scripts/shopify/scopes-assert.sh` to ensure consistency.

## Step-by-Step Setup

### 1. Create Shopify App

1. Log in to [Shopify Partners Dashboard](https://partners.shopify.com/)
2. Navigate to **Apps** → **Create app**
3. Choose **Create app manually**
4. Enter app name: `Cloudcache` (or your preferred name)
5. Select **Public app** or **Custom app** based on your needs
6. Click **Create app**

### 2. Configure App Settings

1. In your app's settings page, scroll to **App URL**
2. Set **App URL** to your production domain: `https://app.cloudcache.ai`
3. Scroll to **Allowed redirection URL(s)**
4. Add all three redirect URIs listed above:
   - Production: `https://app.cloudcache.ai/auth/callback`
   - Staging: `https://staging-app.cloudcache.ai/auth/callback`
   - Preview: `https://app-worker-preview.<account-subdomain>.workers.dev/auth/callback`

### 3. Configure API Scopes

1. Navigate to **Configuration** → **Scopes**
2. Under **Admin API integration scopes**, select:
   - ✅ Read products
   - ✅ Write products
   - ✅ Read script tags
   - ✅ Write script tags
   - ✅ Read themes
   - ✅ Read orders
3. Click **Save**

### 4. Get API Credentials

1. Navigate to **API credentials**
2. Copy the following values:
   - **Client ID** (this is your `SHOPIFY_API_KEY`)
   - **Client Secret** (this is your `SHOPIFY_API_SECRET`)
3. Keep these secure - you'll need them for Worker secrets

### 5. Configure Cloudflare Worker Secrets

Use the `scripts/cloudcache` script to set secrets:

```bash
# For production
scripts/cloudcache bind app prod

# For staging
scripts/cloudcache bind app staging

# For preview
scripts/cloudcache bind app preview
```

When prompted, enter:

- `SHOPIFY_API_KEY`: Your Shopify app's Client ID
- `SHOPIFY_API_SECRET`: Your Shopify app's Client Secret
- `CF_ACCESS_CLIENT_ID`: Your Cloudflare Access Client ID
- `CF_ACCESS_CLIENT_SECRET`: Your Cloudflare Access Client Secret

### 6. Verify Configuration

Verify that secrets are correctly set:

```bash
# Verify production
scripts/cloudcache verify app prod

# Verify staging
scripts/cloudcache verify app staging

# Verify preview
scripts/cloudcache verify app preview
```

## Testing Checklist

### OAuth Flow Testing

1. **Initiate OAuth Flow**
   - Navigate to `https://app.cloudcache.ai/auth/install` (or staging/preview equivalent)
   - Should redirect to Shopify OAuth consent screen

2. **OAuth Consent**
   - Verify requested scopes match expected scopes
   - Click **Install app** or **Allow**
   - Should redirect back to callback URL

3. **Callback Handling**
   - Verify callback receives authorization code
   - Verify state parameter is validated
   - Verify HMAC validation (if implemented)
   - Verify token exchange succeeds

4. **API Access**
   - Verify API calls work with access token
   - Test product read/write operations
   - Test script tag operations

### Environment-Specific Testing

Test each environment separately:

- **Production**: `https://app.cloudcache.ai`
- **Staging**: `https://staging-app.cloudcache.ai`
- **Preview**: `https://app-worker-preview.<account-subdomain>.workers.dev`

## Troubleshooting

### Redirect URI Mismatch

**Error:** `redirect_uri_mismatch`

**Solution:**

- Verify redirect URI in Shopify app settings exactly matches the callback URL
- Check for trailing slashes, protocol (https vs http), and subdomain differences
- Ensure preview environment uses workers.dev subdomain, not custom domain

### Invalid Scope Error

**Error:** `invalid_scope` or scope validation fails

**Solution:**

- Run `scripts/shopify/scopes-assert.sh` to verify scopes match canonical set
- Check Shopify app scopes configuration matches required scopes
- Ensure `SHOPIFY_SCOPES` environment variable matches app configuration

### HMAC Validation Failure

**Error:** HMAC validation fails on callback

**Solution:**

- Verify `SHOPIFY_API_SECRET` is correctly set in Worker secrets
- Check that callback parameters are not modified before validation
- Ensure timestamp validation allows reasonable time window

### Missing Environment Variables

**Error:** `ENV_VALIDATION_ERROR` or missing secrets

**Solution:**

- Run `scripts/cloudcache verify app <env>` to check secret status
- Re-set secrets using `scripts/cloudcache bind app <env>`
- Verify secrets are set for correct environment (prod/staging/preview)

### CORS Issues

**Error:** CORS errors during OAuth flow

**Solution:**

- Verify App URL in Shopify settings matches your domain
- Check Cloudflare Access policies allow OAuth endpoints
- Ensure callback URL is accessible (not blocked by Access)

## Webhook Configuration

Webhooks are handled at `/webhooks/` routes. To configure webhooks:

1. In Shopify app settings, navigate to **Webhooks**
2. Add webhook subscriptions pointing to:
   - Production: `https://app.cloudcache.ai/webhooks/<webhook-type>`
   - Staging: `https://staging-app.cloudcache.ai/webhooks/<webhook-type>`
3. Configure HMAC validation using `SHOPIFY_API_SECRET`

## Security Best Practices

1. **Never commit secrets** - Use `scripts/cloudcache bind` instead
2. **Use different apps per environment** - Separate Shopify apps for prod/staging/preview
3. **Rotate secrets regularly** - Update `SHOPIFY_API_SECRET` periodically
4. **Validate all OAuth parameters** - Use `@cloudcache/platform-validate` schemas
5. **Use HTTPS only** - All redirect URIs must use HTTPS
6. **Implement state parameter** - Prevent CSRF attacks with state validation

## Related Documentation

- [Secrets Management Guide](./secrets-management.md)
- [Local Development Guide](./local-development.md)
- [Scopes Assertion Script](../scripts/shopify/scopes-assert.sh)

## Support

If you encounter issues not covered in this guide:

1. Check Cloudflare Worker logs: `wrangler tail`
2. Check Shopify app logs in Partners dashboard
3. Verify environment configuration: `scripts/cloudcache verify app <env>`
4. Review CTO review findings: `docs/cto-review-2025-11-14.md`
