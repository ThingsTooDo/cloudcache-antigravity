#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

# Required env:
#   CLOUDFLARE_ACCOUNT_ID (ACC)
# Optional env:
#   CLOUDFLARE_ZONE_ID     (ZONE) for zone endpoints

ACC="${CLOUDFLARE_ACCOUNT_ID:-${ACC:-}}"
ZONE="${CLOUDFLARE_ZONE_ID:-${ZONE:-}}"

API_ROOT="https://api.cloudflare.com/client/v4"
BASE_ACC="${API_ROOT}/accounts/${ACC}"
BASE_ZONE="${API_ROOT}/zones/${ZONE}"

die(){ echo "❌ $*" 1>&2; exit 1; }

trap 'echo "❌ Error at ${BASH_SOURCE[0]}:${LINENO}" 1>&2' ERR

require_var(){ local n="$1"; [[ -n "${!n:-}" ]] || die "Missing required env: $n"; }
require_tools(){ command -v jq >/dev/null || die "jq not found"; command -v curl >/dev/null || die "curl not found"; }

require_tools
require_var ACC

auth_header(){ printf 'Authorization: Bearer %s' "$TOKEN"; }
json_header(){ printf 'Content-Type: application/json'; }

_http(){
  # _http METHOD URL [JSON_BODY]
  local m="$1"; shift
  local u="$1"; shift || true
  local d="${1:-}"
  [[ -n "${TOKEN:-}" ]] || die "TOKEN not set for ${u}"
  local tmp
  tmp=$(mktemp)
  local code
  if [[ -n "$d" ]]; then
    code=$(curl -sS -o "$tmp" -w '%{http_code}' -X "$m" -H "$(auth_header)" -H "$(json_header)" "$u" --data "$d")
  else
    code=$(curl -sS -o "$tmp" -w '%{http_code}' -X "$m" -H "$(auth_header)" "$u")
  fi
  if [[ ! "$code" =~ ^2[0-9][0-9]$ ]]; then
    echo "❌ HTTP $code for $m $u" 1>&2
    sed -n '1,200p' "$tmp" 1>&2 || true
    rm -f "$tmp"
    exit 1
  fi
  cat "$tmp"; rm -f "$tmp"
}

http_get(){ _http GET "$1"; }
http_post(){ _http POST "$1" "${2:-}"; }
http_put(){ _http PUT "$1" "${2:-}"; }

# Cloudflare helpers that require TOKEN to be set by the caller
# Uses single CF_API_TOKEN for all domains. These validate HTTP status only.
cf_get(){ http_get "$1"; }
cf_post(){ http_post "$1" "${2:-}"; }
cf_put(){ http_put "$1" "${2:-}"; }

# Select token for domain (uses single CF_API_TOKEN for all domains)
select_token_for_domain(){
  local domain="$1"
  # Use single CF_API_TOKEN for all domains
  echo -n "${CF_API_TOKEN:-}"
}

# Common utilities
now_utc(){ date -u +%FT%TZ; }
ts_suffix(){ date -u +%Y%m%d%H%M%S; }


