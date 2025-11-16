# Cloudcache Deployment Validation Report
**Generated on:** Sun Nov 16 17:09:03 CST 2025

### Module: `app` | Mode: `preview` | Environment: `localhost`
  - 🟡 SKIPPED: Local server at http://localhost:8789 is not running. Start it with 'pnpm dev'.

### Module: `app` | Mode: `preview` | Environment: `cloudflare`
  **URL:** `https://app-worker-preview.workers.dev`
  - Health & Version Check...❌ FAILED
```

```
  - Console Error Check...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/verify/check-console.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Badge Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-badge.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Link Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-links.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```

### Module: `app` | Mode: `staging` | Environment: `localhost`
  - 🟡 SKIPPED: Local server at http://localhost:8789 is not running. Start it with 'pnpm dev'.

### Module: `app` | Mode: `staging` | Environment: `cloudflare`
  - 🟡 SKIPPED: Remote branch 'origin/staging' not found locally. Run 'git fetch'.
### Module: `app` | Mode: `production` | Environment: `localhost`
  - 🟡 SKIPPED: Local server at http://localhost:8789 is not running. Start it with 'pnpm dev'.

### Module: `app` | Mode: `production` | Environment: `cloudflare`
  **URL:** `https://app.cloudcache.ai`
  - Health & Version Check...❌ FAILED
```

```
  - Console Error Check...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/verify/check-console.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Badge Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-badge.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Link Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-links.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```

### Module: `admin` | Mode: `preview` | Environment: `localhost`
  - 🟡 SKIPPED: Local server at http://localhost:8787 is not running. Start it with 'pnpm dev'.

### Module: `admin` | Mode: `preview` | Environment: `cloudflare`
  **URL:** `https://admin-worker-preview.workers.dev`
  - Health & Version Check...❌ FAILED
```

```
  - Console Error Check...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/verify/check-console.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Badge Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-badge.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Link Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-links.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```

### Module: `admin` | Mode: `staging` | Environment: `localhost`
  - 🟡 SKIPPED: Local server at http://localhost:8787 is not running. Start it with 'pnpm dev'.

### Module: `admin` | Mode: `staging` | Environment: `cloudflare`
  - 🟡 SKIPPED: Remote branch 'origin/staging' not found locally. Run 'git fetch'.
### Module: `admin` | Mode: `production` | Environment: `localhost`
  - 🟡 SKIPPED: Local server at http://localhost:8787 is not running. Start it with 'pnpm dev'.

### Module: `admin` | Mode: `production` | Environment: `cloudflare`
  **URL:** `https://admin.cloudcache.ai`
  - Health & Version Check...❌ FAILED
```

```
  - Console Error Check...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/verify/check-console.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Badge Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-badge.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Link Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-links.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```

### Module: `apex` | Mode: `preview` | Environment: `localhost`
  - 🟡 SKIPPED: Local server at http://localhost:8788 is not running. Start it with 'pnpm dev'.

### Module: `apex` | Mode: `preview` | Environment: `cloudflare`
  **URL:** `https://apex-worker-preview.workers.dev`
  - Health & Version Check...❌ FAILED
```

```
  - Console Error Check...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/verify/check-console.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Badge Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-badge.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Link Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-links.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```

### Module: `apex` | Mode: `staging` | Environment: `localhost`
  - 🟡 SKIPPED: Local server at http://localhost:8788 is not running. Start it with 'pnpm dev'.

### Module: `apex` | Mode: `staging` | Environment: `cloudflare`
  - 🟡 SKIPPED: Remote branch 'origin/staging' not found locally. Run 'git fetch'.
### Module: `apex` | Mode: `production` | Environment: `localhost`
  - 🟡 SKIPPED: Local server at http://localhost:8788 is not running. Start it with 'pnpm dev'.

### Module: `apex` | Mode: `production` | Environment: `cloudflare`
  **URL:** `https://cloudcache.ai`
  - Health & Version Check...❌ FAILED
```

```
  - Console Error Check...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/verify/check-console.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Badge Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-badge.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```
  - Link Verification...❌ FAILED
```
node:internal/modules/cjs/loader:1423
  throw err;
  ^

Error: Cannot find module '/Users/rrokk/Projects/Cloudcache/scripts/scripts/validation/helpers/check-links.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1420:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v24.8.0
```

