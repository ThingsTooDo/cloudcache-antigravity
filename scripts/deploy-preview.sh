#!/usr/bin/env bash
#
# Deploy All Modules to Preview
#
# This script is a simple wrapper that calls the master deployment script
# for each module, targeting the 'preview' environment.
#


set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib/core.sh"

step "Deploying all modules to preview environment..."

# --- Load Environment ---
# Must be loaded after core lib and before any wrangler commands
load_env_file_if_exists "$ROOT_DIR/.env"
load_env_file_if_exists "$ROOT_DIR/.env.local"

# --- Verify Authentication ---
# Set up the token first, so 'wrangler whoami' can use it
setup_wrangler_token
# Check for wrangler and authenticate once at the start
require_wrangler

# 1. Deploy App (formerly Shopify)
step "Deploying App module..."
bash "$ROOT_DIR/scripts/deploy-module.sh" app preview
log "Pausing for 5 seconds to allow API to settle..."
sleep 5

bash "$SCRIPT_DIR/deploy-module.sh" admin preview
log "Pausing for 5 seconds to allow API to settle..."
sleep 5

bash "$SCRIPT_DIR/deploy-module.sh" website preview

log "🎉 All modules successfully deployed to preview!"

