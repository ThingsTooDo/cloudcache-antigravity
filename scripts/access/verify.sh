#!/usr/bin/env bash
set -euo pipefail; IFS=$'\n\t'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
. "$ROOT_DIR/scripts/lib/core.sh"

HOST="${HOST_ADMIN:-staging-admin.cloudcache.ai}"
PATH_="${PATH_:-/}"

require_env CF_ACCESS_CLIENT_ID CF_ACCESS_CLIENT_SECRET
# Fallback: read directly from Keychain if still unset (avoid failing in non-interactive shells)
if [[ -z "${CF_ACCESS_CLIENT_ID:-}" ]] && command -v security >/dev/null 2>&1; then
  CF_ACCESS_CLIENT_ID="$(security find-generic-password -s cloudcache:CF_ACCESS_CLIENT_ID -w 2>/dev/null || true)"
  export CF_ACCESS_CLIENT_ID
fi
if [[ -z "${CF_ACCESS_CLIENT_SECRET:-}" ]] && command -v security >/dev/null 2>&1; then
  CF_ACCESS_CLIENT_SECRET="$(security find-generic-password -s cloudcache:CF_ACCESS_CLIENT_SECRET -w 2>/dev/null || true)"
  export CF_ACCESS_CLIENT_SECRET
fi
require_env CF_ACCESS_CLIENT_ID CF_ACCESS_CLIENT_SECRET

HDR_ID="CF-Access-Client-Id: $CF_ACCESS_CLIENT_ID"
HDR_SECRET="CF-Access-Client-Secret: $CF_ACCESS_CLIENT_SECRET"

log "Access verify (with headers → 200) https://$HOST$PATH_"
run curl -fsS -H "$HDR_ID" -H "$HDR_SECRET" "https://$HOST$PATH_" -o /dev/null

log "Access verify (without headers → 403) https://$HOST$PATH_"
set +e
code=$(curl -s -o /dev/null -w "%{http_code}" "https://$HOST$PATH_")
set -e
[[ "$code" == "403" ]] || abort "Expected 403 without headers, got $code"
log "Access verification passed"
