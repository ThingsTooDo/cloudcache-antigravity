#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

safe_load_env() {
  local envfile="$1"
  if [[ -f "$envfile" ]]; then
    grep -E '^[A-Za-z_][A-Za-z0-9_]*=' "$envfile" | sed 's/^/export /' > /tmp/.env.export
    # shellcheck disable=SC1091
    source /tmp/.env.export
    rm /tmp/.env.export
  fi
}

append_unique() {
  local line="$1" file="$2"
  grep -qxF "$line" "$file" 2>/dev/null || echo "$line" >> "$file"
}

# Existence checks (best-effort; not authoritative)
resource_exists() {
  local type="$1" name="$2"
  case "$type" in
    d1) pnpm exec wrangler d1 list 2>/dev/null | grep -q "$name" || false ;;
    kv) pnpm exec wrangler kv:namespace list 2>/dev/null | grep -q "$name" || false ;;
    r2) pnpm exec wrangler r2 bucket list 2>/dev/null | grep -q "$name" || false ;;
  esac
}

get_account_id() {
  # Prefer explicit CLOUDFLARE_ACCOUNT_ID, fallback to CF_ACCOUNT_ID
  if [[ -n "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
    echo "$CLOUDFLARE_ACCOUNT_ID"
  else
    echo "${CF_ACCOUNT_ID:-}"
  fi
}

# Setup token for wrangler compatibility.
# Uses single CF_API_TOKEN and maps it to CLOUDFLARE_API_TOKEN for wrangler.
select_module_token() {
  if [[ -z "${CF_API_TOKEN:-}" ]]; then
    echo "❌ Missing CF_API_TOKEN. Set CF_API_TOKEN in your environment."
    return 1
  fi
  # Map CF_API_TOKEN to CLOUDFLARE_API_TOKEN for wrangler compatibility
  export CLOUDFLARE_API_TOKEN="$CF_API_TOKEN"
}

ensure_local_toml_account_id() {
  local file="$1"
  local acct
  acct="$(get_account_id)"
  [[ -z "$acct" ]] && return 0

  if ! grep -q '^account_id\s*=\s*"\?.\+"\?' "$file" 2>/dev/null; then
    printf 'account_id = "%s"\n\n' "$acct" | cat - "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  fi
}

