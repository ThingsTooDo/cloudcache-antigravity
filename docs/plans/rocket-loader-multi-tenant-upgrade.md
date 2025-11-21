# Rocket Loader Multi-Tenant Architecture Upgrade

**Last Updated**: 2024-11-21  
**Rule Reference**: `.cursor/rules/all-code-truth.mdc`  
**Canonical Source**: `docs/all-deployment-truth.md`

---

## Overview

The current Rocket Loader implementation is a **single-tenant MVP** that works for one Cloudflare zone. This document outlines the architectural changes required to scale to **100,000+ customers** with **50 toggles per customer** (5M settings total).

## Current Implementation (Single-Tenant MVP)

**Status**: ✅ Deployed and working at https://app-worker-preview.cloudcache.workers.dev

**Architecture**:
- Single global `CF_ZONE_ID` environment variable
- KV key `settings:rocket_loader` (not customer-specific)
- Direct Cloudflare API calls on cache miss
- Suitable for single zone/customer deployments

**Files**:
- `apps/app/src/index.ts` (lines 21-67, 194-342)
- `apps/app/src/templates/page.ts` (lines 131-204)
- `apps/app/src/components/ToggleSection.ts`

## Scale Requirements

- **100,000 customers** (Shopify stores)
- **50 toggles per customer** (Rocket Loader + 49 others)
- **Toggles rarely change** (set for weeks/months)
- **Every page load must show current Cloudflare status** (transparent sync)
- **No page refresh needed** (automatic background sync)
- **Cannot overwhelm Cloudflare API** (rate limits: ~1,200 requests/5min per token)
- **Cloudflare is source of truth**, D1 maintains synchronized cache

## Multi-Tenant Architecture (Phase 2)

### 1. Customer Isolation

**Problem**: Current implementation uses single global `CF_ZONE_ID`

**Solution**:
- Extract customer ID from request (Shopify session/store domain)
- Store customer → zone_id mapping in D1: `customer_zones` table
- Isolate toggle state per customer in D1: `customer_toggles` table

### 2. D1 Database as Synchronized Cache

**Requirements**:
- Every page load shows current Cloudflare status (transparent)
- No Cloudflare API calls on page load (read from D1)
- Background sync keeps D1 fresh (every 15-30 minutes)
- When customer toggles: Update Cloudflare → Update D1 immediately

**Architecture**:
- **Read Path**: Always read from D1 (fast, no API call)
- **Stale Detection**: If `last_synced_at` > 1 hour, trigger async sync (non-blocking)
- **Write Path**: Customer toggle → Cloudflare API → D1 with `last_synced_at = now()`
- **Background Sync**: Cron job (every 15 min) syncs stale entries from Cloudflare → D1

### 3. Database Schema

**Table: `customer_zones`**

```sql
CREATE TABLE customer_zones (
  customer_id TEXT PRIMARY KEY,
  zone_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

**Table: `customer_toggles`**

```sql
CREATE TABLE customer_toggles (
  customer_id TEXT NOT NULL,
  toggle_id TEXT NOT NULL,
  state TEXT NOT NULL, -- "on" | "off"
  last_synced_at INTEGER NOT NULL, -- Unix timestamp of last Cloudflare API sync
  updated_at INTEGER NOT NULL, -- Unix timestamp of last change
  PRIMARY KEY (customer_id, toggle_id)
);

CREATE INDEX idx_customer_toggles_last_synced ON customer_toggles(last_synced_at);
```

## Implementation Plan

### Phase 2.1: Customer Context & D1 Setup

**New Files**:
1. `apps/app/src/lib/customer-context.ts` - Extract customer ID from request
2. `apps/app/src/lib/customer-zones.ts` - Manage customer → zone_id mapping
3. `apps/app/migrations/0002_create_customer_toggles.sql` - D1 schema

**Modified Files**:
- `apps/app/src/index.ts` - Extract customer context
- `apps/app/wrangler.toml` - Add D1 database binding
- `packages/platform-env/src/index.ts` - Add `APP_D1` binding to schema

**Commands**:
```bash
# Create D1 database
wrangler d1 create app-db

# Run migration
wrangler d1 execute app-db --file=./apps/app/migrations/0002_create_customer_toggles.sql --env preview

# Update wrangler.toml with D1 binding
[[d1_databases]]
binding = "APP_D1"
database_name = "app-db"
database_id = "<generated-id>"
```

### Phase 2.2: Scalable Toggle Management

**New Files**:
1. `apps/app/src/lib/toggle-registry.ts` - Registry of all 50 toggle configurations
2. `apps/app/src/lib/toggle-manager.ts` - Centralized toggle state management
3. `apps/app/src/lib/cloudflare-api-client.ts` - Wrapped API client with rate limiting

**Modified Files**:
- `apps/app/src/index.ts` - Refactor to use `ToggleManager`

**Key Functions**:
- `getState(customerId, toggleId, db)` - Read from D1, check staleness
- `setState(customerId, toggleId, enabled, db)` - Update Cloudflare + D1
- `syncFromCloudflare(customerId, toggleId, zoneId, apiToken)` - Fetch from Cloudflare

### Phase 2.3: Background Sync (Critical for Scale)

**New Files**:
1. `apps/app/src/scheduled.ts` - Cron trigger handler

**Modified Files**:
- `apps/app/wrangler.toml` - Add cron trigger
- `apps/app/src/index.ts` - Export scheduled handler

**Cron Trigger Config**:
```toml
[triggers]
crons = ["*/15 * * * *"]  # Every 15 minutes
```

**Background Sync Logic**:
```typescript
export default {
  async scheduled(event: ScheduledEvent, env: AppEnv): Promise<void> {
    // Query D1 for stale entries (last_synced_at < 15 minutes ago)
    const staleToggles = await env.APP_D1
      .prepare(`
        SELECT ct.customer_id, ct.toggle_id, cz.zone_id 
        FROM customer_toggles ct
        JOIN customer_zones cz ON ct.customer_id = cz.customer_id
        WHERE ct.last_synced_at < ?
        LIMIT 100
      `)
      .bind(Date.now() - 900000) // 15 minutes ago
      .all();

    // Batch sync to Cloudflare API (respect rate limits)
    for (const toggle of staleToggles.results) {
      await syncFromCloudflare(toggle.customer_id, toggle.toggle_id, toggle.zone_id, env.CF_API_TOKEN);
    }
  }
};
```

## Architecture Flows

### Read Path (Dashboard Load)

```
Dashboard Load (/)
    ↓
Extract Customer ID (from Shopify session)
    ↓
ToggleManager.getState(customerId, "rocket-loader", db)
    ↓
SELECT state, last_synced_at FROM customer_toggles 
WHERE customer_id = ? AND toggle_id = 'rocket-loader'
    ↓
Check last_synced_at:
 - If < 1 hour old → Return state immediately (fast path)
 - If > 1 hour old → Trigger async sync (non-blocking), return current state
    ↓
Return state from D1 (always fast, transparent to customer)
```

### Write Path (Toggle Change)

```
POST /api/v1/optimizations/rocket-loader
    ↓
Extract Customer ID
    ↓
Get zone_id: SELECT zone_id FROM customer_zones WHERE customer_id = ?
    ↓
ToggleManager.setState(customerId, "rocket-loader", enabled, db)
    ↓
1. Call Cloudflare API: PATCH /zones/{zone_id}/settings/rocket_loader
2. On success: UPDATE customer_toggles 
   SET state = ?, last_synced_at = unixepoch(), updated_at = unixepoch()
   WHERE customer_id = ? AND toggle_id = 'rocket-loader'
3. Return response (customer sees immediate update)
```

### Background Sync (Every 15 Minutes)

```
Cron Trigger
    ↓
Query D1 for stale entries (last_synced_at < 15 minutes ago)
    ↓
Batch sync to Cloudflare API (50-100 customers per batch)
 - GET /zones/{zone_id}/settings/{toggle_setting}
 - UPDATE customer_toggles SET state = ?, last_synced_at = unixepoch()
    ↓
D1 cache stays fresh (customers always see current Cloudflare state)
```

## Rate Limit Protection

**Cloudflare API Limits**: ~1,200 requests/5 minutes per token

**Strategy**:
- **Read Path**: 100% D1 cache hits (zero API calls on page load)
- **Stale Detection**: If cache > 1 hour, trigger async sync (non-blocking)
- **Write Path**: Only on explicit toggle (customer-initiated) → immediate API call
- **Background Sync**: Every 15 minutes, processes 100 stale entries max
- **Batch Processing**: 50-100 customers per cron run, respects rate limits
- **Transparency**: Customer always sees current state, sync happens automatically

## Migration Path

1. **Deploy D1 Database** (preview, then staging, then production)
2. **Migrate existing KV data → D1** for current zone
3. **Implement customer context extraction** (Shopify session parsing)
4. **Refactor toggle endpoints** to use `ToggleManager`
5. **Deploy background sync cron job**
6. **Test with multi-customer data**
7. **Gradual rollout** with monitoring

## Testing Checklist

**Pre-Deployment**:
- [ ] Create D1 database for each environment
- [ ] Run migrations successfully
- [ ] Test customer context extraction
- [ ] Verify Cloudflare API credentials per customer

**Post-Deployment**:
- [ ] Customer isolation: Toggle for Customer A doesn't affect Customer B
- [ ] D1 caching: Dashboard loads without API calls (check logs)
- [ ] Stale detection: Old timestamps trigger async sync
- [ ] Toggle ON/OFF: Cloudflare + D1 updated immediately
- [ ] Background sync: Cron job runs every 15 minutes
- [ ] Transparency: Change in Cloudflare dashboard syncs to Cloudcache
- [ ] Load test: 100+ concurrent page loads, all D1 hits

## Performance Targets

- **Dashboard Load**: < 100ms (D1 read)
- **Toggle Change**: < 2s (Cloudflare API + D1 write)
- **Background Sync**: Process 100 customers in < 60s
- **Cache Hit Rate**: > 99% (almost all reads from D1)
- **API Calls**: < 1,000 per 5 minutes (well under rate limit)

## Documentation Updates

When implementing Phase 2, update:
- `docs/all-deployment-truth.md` - Add D1 migration steps
- `docs/all-local-dev-truth.md` - Add D1 local development setup
- `docs/secrets-management.md` - Document per-customer credentials
- `ARCHITECTURE-GENERAL.md` - Add multi-tenant architecture diagram

## References

- Current implementation: `apps/app/src/index.ts:21-67,194-342`
- Cloudflare Workers documentation: https://developers.cloudflare.com/workers/
- D1 Database documentation: https://developers.cloudflare.com/d1/
- KV documentation: https://developers.cloudflare.com/kv/
- Cron Triggers documentation: https://developers.cloudflare.com/workers/configuration/cron-triggers/

