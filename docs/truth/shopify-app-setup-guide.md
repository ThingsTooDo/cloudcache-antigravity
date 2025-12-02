# Shopify App Setup Guide

**Last Updated**: 2025-12-01
**Rule Reference**: `docs/truth/all-code-truth.mdc`

Complete step-by-step guide to set up and test the CloudCache Shopify app locally.

---

## Prerequisites

- ✅ Shopify Partner account
- ✅ Development store with sample data
- ✅ Local tunnel tool (Cloudflare Tunnel or ngrok)
- ✅ Cloudflare account with Workers enabled

---

## Step 1: Create Shopify Partner Account

### 1.1 Sign Up for Shopify Partners

1. Go to <https://partners.shopify.com/signup>
2. Fill in your information:
   - Email address
   - Password
   - Account type: **Developer**
3. Verify your email address
4. Complete your partner profile

**Expected Result**: ✅ Access to Shopify Partner Dashboard

---

## Step 2: Create Development Store

### 2.1 Create a New Development Store

1. Go to <https://partners.shopify.com/organizations>
2. Select your organization
3. Click **Stores** in the left sidebar
4. Click **Add store** → **Create development store**
5. Configure:
   - **Store name**: `cloudcache-dev` (or your preferred name)
   - **Store URL**: `cloudcache-dev.myshopify.com`
   - **Store purpose**: Test an app or theme
   - **Build**: Developer Preview
6. Click **Save**

### 2.2 Populate with Test Data (Optional)

1. Log into your dev store admin
2. Go to **Settings** → **Plan**
3. Install sample products, customers, and orders

**Expected Result**: ✅ Development store at `https://cloudcache-dev.myshopify.com`

---

## Step 3: Create Shopify App

### 3.1 Create New App in Partner Dashboard

1. Go to <https://partners.shopify.com/organizations>
2. Click **Apps** in the left sidebar
3. Click **Create app** → **Create app manually**
4. Configure:
   - **App name**: `CloudCache`
   - **App URL**: `https://shopify.cloudcache.ai` (production) or leave blank for now
   - Click **Create app**

### 3.2 Get API Credentials

1. In your app dashboard, go to **Configuration**
2. Scroll to **Client credentials**
3. Copy the **Client ID** (API key)
4. Click **Show** and copy **Client secret**

**Save these for Step 5**:

- Client ID: `[YOUR_CLIENT_ID]`
- Client secret: `[YOUR_CLIENT_SECRET]`

### 3.3 Configure App URLs

In the **App setup** section:

1. **App URL**: `https://[YOUR_TUNNEL_URL]` (we'll set this in Step 4)
2. **Allowed redirection URL(s)**:

   ```
   https://[YOUR_TUNNEL_URL]/auth/callback
   https://[YOUR_TUNNEL_URL]/auth/shopify/callback
   https://shopify.cloudcache.ai/auth/callback
   https://shopify.cloudcache.ai/auth/shopify/callback
   ```

> **Note**: Leave `[YOUR_TUNNEL_URL]` as placeholder for now. We'll update this in Step 4.

### 3.4 Configure App Scopes

1. Scroll to **API access scopes**
2. Select the following scopes:
   - `read_products` - Read products
   - `write_products` - Modify products
   - `read_customers` - Read customer data
   - `read_orders` - Read orders
   - `read_inventory` - Read inventory
   - `read_locations` - Read store locations

3. Click **Save**

### 3.5 Configure Webhooks (Optional for now)

We'll configure these after the app is running. Our app handles:

- `app/uninstalled`
- `shop/update`

**Expected Result**: ✅ App created with Client ID and Secret

---

## Step 4: Set Up Local Tunnel

You need a public HTTPS URL for Shopify to communicate with your local dev server.

### Option A: Cloudflare Tunnel (Recommended)

#### 4.1 Install Cloudflare Tunnel

```bash
# macOS
brew install cloudflare/cloudflare/cloudflared

# Or download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
```

#### 4.2 Start Tunnel

```bash
# In a separate terminal, keep this running
cloudflared tunnel --url http://localhost:8789
```

**Output**:

```
Your quick tunnel is at: https://[random-subdomain].trycloudflare.com
```

#### 4.3 Copy Your Tunnel URL

Save this URL: `https://[random-subdomain].trycloudflare.com`

> **Note**: This URL changes each time you restart the tunnel. You'll need to update Shopify app settings when the URL changes.

### Option B: ngrok (Alternative)

#### 4.1 Install ngrok

```bash
# Download from https://ngrok.com/download
# Or via Homebrew:
brew install ngrok/ngrok/ngrok
```

#### 4.2 Sign up and authenticate

```bash
# Get your authtoken from https://dashboard.ngrok.com/get-started/your-authtoken
ngrok config add-authtoken [YOUR_AUTHTOKEN]
```

#### 4.3 Start ngrok

```bash
ngrok http 8789
```

**Output**:

```
Forwarding: https://[random-id].ngrok-free.app -> http://localhost:8789
```

#### 4.4 Copy Your ngrok URL

Save this URL: `https://[random-id].ngrok-free.app`

### 4.4 Update Shopify App Configuration

1. Go back to Shopify Partner Dashboard
2. Navigate to your app → **Configuration**
3. Update:
   - **App URL**: `https://[YOUR_TUNNEL_URL]`
   - **Allowed redirection URL(s)**: Add `https://[YOUR_TUNNEL_URL]/auth/callback`
4. Click **Save**

**Expected Result**: ✅ Public tunnel running to `localhost:8789`

---

## Step 5: Configure Local Environment

### 5.1 Create `.dev.vars` File

```bash
cd apps/app
touch .dev.vars
```

### 5.2 Add Environment Variables

Edit `apps/app/.dev.vars`:

```bash
# Shopify App Credentials
SHOPIFY_API_KEY="[YOUR_CLIENT_ID_FROM_STEP_3]"
SHOPIFY_API_SECRET="[YOUR_CLIENT_SECRET_FROM_STEP_3]"

# App Configuration
SHOPIFY_APP_URL="https://[YOUR_TUNNEL_URL_FROM_STEP_4]"
SHOPIFY_SCOPES="read_products,write_products,read_customers,read_orders,read_inventory,read_locations"

# Session Encryption (generate a random 32-character string)
SHOPIFY_APP_SESSION_SECRET="your-32-character-random-string-here"

# Cloudflare Bindings (these are automatically bound in dev mode)
# APP_KV - KV namespace for session storage
# APP_D1 - D1 database for app data
```

### 5.3 Generate Session Secret

```bash
# Generate a random 32-character string
openssl rand -base64 32
```

Copy the output and use it for `SHOPIFY_APP_SESSION_SECRET`.

### 5.4 Verify `.gitignore`

Ensure `.dev.vars` is in `.gitignore`:

```bash
grep -q ".dev.vars" .gitignore || echo ".dev.vars" >> .gitignore
```

**Expected Result**: ✅ `.dev.vars` configured with credentials

---

## Step 6: Start Local Development Server

### 6.1 Install Dependencies

```bash
cd apps/app
pnpm install
```

### 6.2 Start Dev Server

```bash
pnpm dev
```

**Expected Output**:

```
 ⛅️ wrangler 4.x.x
──────────────────────────────────
Using vars defined in .dev.vars

⎔ Starting local server...
[wrangler:inf] Ready on http://localhost:8789
```

### 6.3 Verify Server is Running

Open in browser: `http://localhost:8789`

You should see a redirect or auth screen.

**Expected Result**: ✅ Dev server running on `http://localhost:8789`

---

## Step 7: Install App in Development Store

### 7.1 Get Installation URL

The installation URL format is:

```
https://[YOUR_TUNNEL_URL]/auth/login?shop=[YOUR_DEV_STORE].myshopify.com
```

Example:

```
https://abc123.trycloudflare.com/auth/login?shop=cloudcache-dev.myshopify.com
```

### 7.2 Initiate OAuth Flow

1. Open the installation URL in your browser
2. You should be redirected to Shopify's OAuth consent screen
3. Review the permissions (scopes) requested
4. Click **Install app**

### 7.3 Verify Installation

After successful installation:

- ✅ You should be redirected back to your app
- ✅ Session should be created in KV storage
- ✅ App should display the dashboard page

**Expected Result**: ✅ App installed in dev store, OAuth complete

---

## Step 8: Test Embedded App in Shopify Admin

### 8.1 Configure Embedded App Settings

1. Go to Shopify Partner Dashboard → Your app → **Configuration**
2. Scroll to **Embedded app**
3. Enable **Embed your app in the Shopify admin**
4. Click **Save**

### 8.2 Access App from Shopify Admin

1. Log into your development store admin: `https://[your-dev-store].myshopify.com/admin`
2. In the left sidebar, find your app under **Apps**
3. Click on your app name

### 8.3 Verify App Bridge

The app should:

- ✅ Load inside an iframe in Shopify admin
- ✅ Display Polaris UI components
- ✅ Show navigation (Home, Products, Settings)

**Expected Result**: ✅ App loads embedded in Shopify admin

---

## Step 9: Test App Functionality

### 9.1 Test Dashboard Page

1. Navigate to `https://[YOUR_TUNNEL_URL]/` (or click on app in Shopify admin)
2. Verify:
   - ✅ Polaris Page component renders
   - ✅ Welcome message displays
   - ✅ Shop name appears
   - ✅ Navigation links work

### 9.2 Test Products Page

1. Navigate to `/app/products`
2. Verify:
   - ✅ Products load from Shopify API
   - ✅ DataTable displays with columns (Title, Handle, Status, Inventory)
   - ✅ Data matches your dev store products

### 9.3 Test Settings Page

1. Navigate to `/app/settings`
2. Verify:
   - ✅ Form renders with Polaris components
   - ✅ Shop information displays
   - ✅ Settings can be saved

**Expected Result**: ✅ All pages functional

---

## Step 10: Test Webhooks

### 10.1 Configure Webhooks in Partner Dashboard

1. Go to Partner Dashboard → Your app → **Configuration**
2. Scroll to **Webhooks**
3. Add webhook subscriptions:
   - **Topic**: `app/uninstalled`
   - **URL**: `https://[YOUR_TUNNEL_URL]/webhooks`
   - Click **Add webhook**

   Repeat for:
   - **Topic**: `shop/update`
   - **URL**: `https://[YOUR_TUNNEL_URL]/webhooks`

### 10.2 Test App Uninstall Webhook

1. In your dev store admin, go to **Apps**
2. Find your app and click **Delete**
3. Confirm deletion
4. Check your dev server logs for webhook processing

**Expected Log**:

```
[webhook] Received app/uninstalled for shop: cloudcache-dev.myshopify.com
[webhook] Session cleaned up for shop
```

### 10.3 Test Shop Update Webhook

1. In your dev store admin, go to **Settings** → **General**
2. Update shop name or other details
3. Click **Save**
4. Check dev server logs

**Expected Log**:

```
[webhook] Received shop/update for shop: cloudcache-dev.myshopify.com
[webhook] Shop metadata updated
```

**Expected Result**: ✅ Webhooks received and processed

---

## Step 11: Deploy to Cloudflare Workers (Preview)

### 11.1 Build the App

```bash
cd apps/app
pnpm build
```

### 11.2 Deploy to Preview

```bash
# From project root
bash scripts/deploy-module.sh shopify preview
```

**Expected Output**:

```
✅ Successfully deployed 'shopify' to 'preview'.
Deployed shopify-worker-preview triggers
  https://shopify-worker-preview.cloudcache.workers.dev
```

### 11.3 Update Shopify App Configuration

1. Go to Partner Dashboard → Your app → **Configuration**
2. Update:
   - **App URL**: `https://shopify-worker-preview.cloudcache.workers.dev`
   - **Allowed redirection URL(s)**: Add preview URL callbacks
3. Click **Save**

### 11.4 Reinstall App with Preview URL

Follow Step 7 using the preview URL instead of tunnel URL.

**Expected Result**: ✅ App deployed to Cloudflare Workers preview

---

## Step 12: Deploy to Production

### 12.1 Update Production Configuration

Edit `apps/app/wrangler.toml` to ensure production routes:

```toml
routes = [
  { pattern = "shopify.cloudcache.ai/*", zone_name = "cloudcache.ai" }
]
```

### 12.2 Deploy to Production

```bash
# From project root
bash scripts/deploy-module.sh shopify production
```

### 12.3 Update Shopify App for Production

1. In Partner Dashboard → Your app → **Configuration**
2. Update:
   - **App URL**: `https://shopify.cloudcache.ai`
   - **Allowed redirection URL(s)**: Ensure production URLs are included
3. Click **Save**

### 12.4 Submit App for Review (Optional)

If distributing publicly:

1. Go to **Distribution** tab
2. Complete app listing details
3. Submit for Shopify review

**Expected Result**: ✅ App deployed to production

---

## Troubleshooting

### OAuth Errors

**Error**: `invalid_request` or `redirect_uri_mismatch`

**Solution**:

1. Verify tunnel URL is correct in `.dev.vars`
2. Check redirect URLs in Partner Dashboard match exactly
3. Ensure HTTPS (not HTTP) for all URLs

### Session Not Persisting

**Error**: Logged out immediately after OAuth

**Solution**:

1. Check `SHOPIFY_APP_SESSION_SECRET` is set in `.dev.vars`
2. Verify KV namespace is bound in `wrangler.toml`
3. Check session storage implementation in `app/session.server.ts`

### Webhook HMAC Verification Failed

**Error**: `HMAC signature mismatch`

**Solution**:

1. Verify `SHOPIFY_API_SECRET` matches Partner Dashboard
2. Ensure webhook signature header is being read correctly
3. Check webhook URL is HTTPS

### App Not Loading in Shopify Admin

**Error**: Blank iframe or connection refused

**Solution**:

1. Verify tunnel is running and accessible
2. Check browser console for mixed content errors
3. Ensure embedded app is enabled in Partner Dashboard
4. Verify App Bridge provider is properly configured

### Products Not Loading

**Error**: GraphQL errors or empty product list

**Solution**:

1. Check scopes include `read_products`
2. Verify admin API access token is valid
3. Ensure dev store has products
4. Check network tab for API request errors

---

## Quick Reference

### Important URLs

| Resource           | URL                                                     |
| ------------------ | ------------------------------------------------------- |
| Partner Dashboard  | <https://partners.shopify.com>                          |
| Dev Store Admin    | https://[store].myshopify.com/admin                     |
| Local Dev Server   | <http://localhost:8789>                                 |
| Preview Deployment | <https://shopify-worker-preview.cloudcache.workers.dev> |
| Production         | <https://shopify.cloudcache.ai>                         |

### Key Files

| File                             | Purpose                        |
| -------------------------------- | ------------------------------ |
| `apps/app/.dev.vars`             | Local environment variables    |
| `apps/app/wrangler.toml`         | Cloudflare Worker config       |
| `apps/app/shopify.app.toml`      | Shopify CLI config             |
| `apps/app/app/shopify.server.ts` | Shopify SDK initialization     |
| `apps/app/app/session.server.ts` | Session storage implementation |

### Common Commands

```bash
# Start local dev server
cd apps/app && pnpm dev

# Start tunnel
cloudflared tunnel --url http://localhost:8789

# Build app
cd apps/app && pnpm build

# Deploy preview
bash scripts/deploy-module.sh shopify preview

# Deploy production
bash scripts/deploy-module.sh shopify production

# View logs
wrangler tail shopify-worker-preview
```

---

## Next Steps After Setup

1. ✅ Implement custom app features
2. ✅ Add more API endpoints
3. ✅ Customize Polaris UI
4. ✅ Add analytics and monitoring
5. ✅ Configure production environment variables in Cloudflare dashboard
6. ✅ Set up CI/CD pipeline
7. ✅ Submit app for Shopify review (if public)

---

## Support Resources

- [Shopify App Development Documentation](https://shopify.dev/docs/apps)
- [Shopify Partner Dashboard](https://partners.shopify.com)
- [Polaris Design System](https://polaris.shopify.com)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Remix Documentation](https://remix.run/docs)
