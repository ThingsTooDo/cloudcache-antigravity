#!/usr/bin/env bash
#
# Open Local Development URLs in Cursor Integrated Browser
#
# Displays clickable markdown links that work in Cursor's integrated browser
# These links can be clicked directly in Cursor to open in the simple browser

set -euo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

source "$SCRIPT_DIR/lib/core.sh"

step "Local Development URLs - Click to Open in Cursor Integrated Browser"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Click these links in Cursor to open in the integrated browser:"
echo ""
echo "📱 app Module:"
echo "   [http://localhost:8789](http://localhost:8789)"
echo ""
echo "📱 adm Module:"
echo "   [http://localhost:8787](http://localhost:8787)"
echo ""
echo "📱 web Module:"
echo "   [http://localhost:8788](http://localhost:8788)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Expected Content (same as preview URLs):"
echo "  ✅ app:   Green text 'I love Cloudcache app' (centered, #00FF00)"
echo "  ✅ adm:   Green text 'I love Cloudcache adm' (centered, #00FF00)"
echo "  ✅ web:   Green text 'I love Cloudcache web' (centered, #00FF00)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Health Endpoints (click to open):"
echo "  app:"
echo "    [http://localhost:8789/healthz](http://localhost:8789/healthz)"
echo "    [http://localhost:8789/readyz](http://localhost:8789/readyz)"
echo "    [http://localhost:8789/api/v1/ping](http://localhost:8789/api/v1/ping)"
echo ""
echo "  adm:"
echo "    [http://localhost:8787/healthz](http://localhost:8787/healthz)"
echo "    [http://localhost:8787/readyz](http://localhost:8787/readyz)"
echo ""
echo "  web:"
echo "    [http://localhost:8788/healthz](http://localhost:8788/healthz)"
echo "    [http://localhost:8788/readyz](http://localhost:8788/readyz)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
log "Note: Make sure dev servers are running:"
echo "  bash scripts/dev-local.sh && pnpm dev"
echo ""
echo "These clickable links work the same way as clicking links in markdown files."
echo "Click any link above to open it in Cursor's integrated simple browser."

