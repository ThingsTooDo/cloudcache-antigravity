# Cloudcache Deployment Validation Report
**Generated on:** Mon Nov 17 16:24:51 CST 2025

### Module: `app` | Mode: `preview` | Environment: `localhost`
  **URL:** `http://localhost:8789`
  - Health & Version Check...✅ PASSED
  - Badge Verification...✅ PASSED

### Module: `app` | Mode: `preview` | Environment: `cloudflare`
  **URL:** `https://app-worker-preview.cloudcache.workers.dev`
  - Health & Version Check...❌ FAILED
```
[
  "Version mismatch. Expected: eb4c5b6, Got: da3be05"
]
```
  - Badge Verification...✅ PASSED

### Module: `app` | Mode: `staging` | Environment: `localhost`
  **URL:** `http://localhost:8789`
  - Health & Version Check...✅ PASSED
  - Badge Verification...✅ PASSED

### Module: `app` | Mode: `staging` | Environment: `cloudflare`
  - 🟡 SKIPPED: Remote branch 'origin/staging' not found locally.

### Module: `app` | Mode: `production` | Environment: `localhost`
  **URL:** `http://localhost:8789`
  - Health & Version Check...✅ PASSED
  - Badge Verification...✅ PASSED

### Module: `app` | Mode: `production` | Environment: `cloudflare`
  **URL:** `https://app.cloudcache.ai`
  - 🟡 SKIPPED: Production endpoints are protected by Cloudflare Access.

### Module: `admin` | Mode: `preview` | Environment: `localhost`
  **URL:** `http://localhost:8787`
  - Health & Version Check...✅ PASSED
  - Badge Verification...✅ PASSED

### Module: `admin` | Mode: `preview` | Environment: `cloudflare`
  **URL:** `https://admin-worker-preview.cloudcache.workers.dev`
  - Health & Version Check...❌ FAILED
```
[
  "Version mismatch. Expected: eb4c5b6, Got: da3be05"
]
```
  - Badge Verification...✅ PASSED

### Module: `admin` | Mode: `staging` | Environment: `localhost`
  **URL:** `http://localhost:8787`
  - Health & Version Check...✅ PASSED
  - Badge Verification...✅ PASSED

### Module: `admin` | Mode: `staging` | Environment: `cloudflare`
  - 🟡 SKIPPED: Remote branch 'origin/staging' not found locally.

### Module: `admin` | Mode: `production` | Environment: `localhost`
  **URL:** `http://localhost:8787`
  - Health & Version Check...✅ PASSED
  - Badge Verification...✅ PASSED

### Module: `admin` | Mode: `production` | Environment: `cloudflare`
  **URL:** `https://admin.cloudcache.ai`
  - 🟡 SKIPPED: Production endpoints are protected by Cloudflare Access.

### Module: `apex` | Mode: `preview` | Environment: `localhost`
  **URL:** `http://localhost:8788`
  - Health & Version Check...✅ PASSED
  - Badge Verification...✅ PASSED

### Module: `apex` | Mode: `preview` | Environment: `cloudflare`
  **URL:** `https://apex-worker-preview.cloudcache.workers.dev`
  - Health & Version Check...❌ FAILED
```
[
  "Version mismatch. Expected: eb4c5b6, Got: da3be05"
]
```
  - Badge Verification...✅ PASSED

### Module: `apex` | Mode: `staging` | Environment: `localhost`
  **URL:** `http://localhost:8788`
  - Health & Version Check...✅ PASSED
  - Badge Verification...✅ PASSED

### Module: `apex` | Mode: `staging` | Environment: `cloudflare`
  - 🟡 SKIPPED: Remote branch 'origin/staging' not found locally.

### Module: `apex` | Mode: `production` | Environment: `localhost`
  **URL:** `http://localhost:8788`
  - Health & Version Check...✅ PASSED
  - Badge Verification...✅ PASSED

### Module: `apex` | Mode: `production` | Environment: `cloudflare`
  **URL:** `https://cloudcache.ai`
  - 🟡 SKIPPED: Production endpoints are protected by Cloudflare Access.

