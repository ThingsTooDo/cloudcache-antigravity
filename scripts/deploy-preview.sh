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

bash "$SCRIPT_DIR/deploy-module.sh" app preview
bash "$SCRIPT_DIR/deploy-module.sh" admin preview
bash "$SCRIPT_DIR/deploy-module.sh" apex preview

log "🎉 All modules successfully deployed to preview!"

