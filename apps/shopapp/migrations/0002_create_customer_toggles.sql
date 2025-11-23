-- Migration: Create customer_zones and customer_toggles tables
-- Description: Support for multi-tenant Rocket Loader configuration

-- Table: customer_zones
-- Maps Shopify customers to Cloudflare Zone IDs
CREATE TABLE IF NOT EXISTS customer_zones (
  customer_id TEXT PRIMARY KEY,
  zone_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Table: customer_toggles
-- Stores the state of each toggle per customer
CREATE TABLE IF NOT EXISTS customer_toggles (
  customer_id TEXT NOT NULL,
  toggle_id TEXT NOT NULL,
  state TEXT NOT NULL, -- "on" | "off"
  last_synced_at INTEGER NOT NULL, -- Unix timestamp of last Cloudflare API sync
  updated_at INTEGER NOT NULL, -- Unix timestamp of last change
  PRIMARY KEY (customer_id, toggle_id)
);

-- Index for finding stale toggles efficiently
CREATE INDEX IF NOT EXISTS idx_customer_toggles_last_synced ON customer_toggles(last_synced_at);
