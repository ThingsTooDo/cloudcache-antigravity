# Cloudcache Deployment Validation Report

**Generated on:** Sun Nov 16 20:01:49 CST 2025

### Module: `app` | Mode: `preview` | Environment: `localhost`

**URL:** `http://localhost:8789`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: ca633db"
]
```

- Badge Verification...✅ PASSED

### Module: `app` | Mode: `preview` | Environment: `cloudflare`

**URL:** `https://app-worker-preview.cloudcache.workers.dev`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: dbd6d1b"
]
```

- Badge Verification...✅ PASSED

### Module: `app` | Mode: `staging` | Environment: `localhost`

**URL:** `http://localhost:8789`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: ca633db"
]
```

- Badge Verification...✅ PASSED

### Module: `app` | Mode: `staging` | Environment: `cloudflare`

- 🟡 SKIPPED: Remote branch 'origin/staging' not found locally.

### Module: `app` | Mode: `production` | Environment: `localhost`

**URL:** `http://localhost:8789`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: ca633db"
]
```

- Badge Verification...✅ PASSED

### Module: `app` | Mode: `production` | Environment: `cloudflare`

**URL:** `https://app.cloudcache.ai`

- Health & Version Check...❌ FAILED

```
[
  "Failed to fetch health check from https://app.cloudcache.ai/healthz: Unexpected token '<', \"<!DOCTYPE \"... is not valid JSON"
]
```

- Badge Verification...❌ FAILED

```
[
  "Badge element #cloudcache-validated-badge not found."
]
```

### Module: `admin` | Mode: `preview` | Environment: `localhost`

**URL:** `http://localhost:8787`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: ca633db"
]
```

- Badge Verification...✅ PASSED

### Module: `admin` | Mode: `preview` | Environment: `cloudflare`

**URL:** `https://admin-worker-preview.cloudcache.workers.dev`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: dbd6d1b"
]
```

- Badge Verification...✅ PASSED

### Module: `admin` | Mode: `staging` | Environment: `localhost`

**URL:** `http://localhost:8787`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: ca633db"
]
```

- Badge Verification...✅ PASSED

### Module: `admin` | Mode: `staging` | Environment: `cloudflare`

- 🟡 SKIPPED: Remote branch 'origin/staging' not found locally.

### Module: `admin` | Mode: `production` | Environment: `localhost`

**URL:** `http://localhost:8787`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: ca633db"
]
```

- Badge Verification...✅ PASSED

### Module: `admin` | Mode: `production` | Environment: `cloudflare`

**URL:** `https://admin.cloudcache.ai`

- Health & Version Check...❌ FAILED

```
[
  "Failed to fetch health check from https://admin.cloudcache.ai/healthz: Unexpected token '<', \"<!DOCTYPE \"... is not valid JSON"
]
```

- Badge Verification...❌ FAILED

```
[
  "Badge element #cloudcache-validated-badge not found."
]
```

### Module: `apex` | Mode: `preview` | Environment: `localhost`

**URL:** `http://localhost:8788`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: ca633db"
]
```

- Badge Verification...✅ PASSED

### Module: `apex` | Mode: `preview` | Environment: `cloudflare`

**URL:** `https://apex-worker-preview.cloudcache.workers.dev`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: dbd6d1b"
]
```

- Badge Verification...✅ PASSED

### Module: `apex` | Mode: `staging` | Environment: `localhost`

**URL:** `http://localhost:8788`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: ca633db"
]
```

- Badge Verification...✅ PASSED

### Module: `apex` | Mode: `staging` | Environment: `cloudflare`

- 🟡 SKIPPED: Remote branch 'origin/staging' not found locally.

### Module: `apex` | Mode: `production` | Environment: `localhost`

**URL:** `http://localhost:8788`

- Health & Version Check...❌ FAILED

```
[
  "Version mismatch. Expected: ca633dba10a9d0b0f063e2e79a748c21c4b0c687, Got: ca633db"
]
```

- Badge Verification...✅ PASSED

### Module: `apex` | Mode: `production` | Environment: `cloudflare`

**URL:** `https://cloudcache.ai`

- Health & Version Check...❌ FAILED

```
[
  "Failed to fetch health check from https://cloudcache.ai/healthz: Unexpected token '<', \"<!DOCTYPE \"... is not valid JSON"
]
```

- Badge Verification...❌ FAILED

```
[
  "Badge element #cloudcache-validated-badge not found."
]
```
