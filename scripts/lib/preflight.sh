#!/usr/bin/env bash
#
# Pre-flight validation script
#
# Checks for required tools, environment variables, build artifacts, and infrastructure
# before running deployment or infrastructure operations.
#

set -euo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Source core library
source "$SCRIPT_DIR/core.sh"

# Check if a command exists
check_command() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    die "Required command not found: $cmd. Please install it first."
  fi
}

# Check if environment variable is set
check_env_var() {
  local var="$1"
  if [[ -z "${!var:-}" ]]; then
    die "Required environment variable not set: $var"
  fi
}

# Check if build artifact exists
check_build_artifact() {
  local module="$1"
  local artifact_path="$ROOT_DIR/apps/$module/dist/index.js"
  
  if [[ ! -f "$artifact_path" ]]; then
    die "Build artifact not found: $artifact_path. Run 'pnpm --filter @cloudcache/$module build:bundle' first."
  fi
  
  log "Build artifact found: $artifact_path ($(du -h "$artifact_path" | cut -f1))"
}

# Check if KV namespace exists (for app module)
check_kv_namespace() {
  local module="$1"
  local env="$2"
  
  if [[ "$module" != "app" ]]; then
    return 0  # Only app module uses KV
  fi
  
  setup_cf_env
  setup_wrangler_token
  
  local wrangler_toml="$ROOT_DIR/apps/$module/wrangler.toml"
  local kv_id=""
  
  if [[ "$env" == "prod" ]]; then
    kv_id=$(grep -A 2 '\[\[kv_namespaces\]\]' "$wrangler_toml" | grep 'id =' | head -1 | sed 's/.*id = "\(.*\)".*/\1/' || echo "")
  else
    kv_id=$(grep -A 2 "\[\[env.$env.kv_namespaces\]\]" "$wrangler_toml" | grep 'id =' | head -1 | sed 's/.*id = "\(.*\)".*/\1/' || echo "")
  fi
  
  if [[ -z "$kv_id" ]]; then
    log "⚠️  KV namespace ID not found in wrangler.toml for $module ($env)"
    return 0  # Not a hard failure, just a warning
  fi
  
  # Verify namespace exists via API
  local namespace_check
  namespace_check=$(curl -sS "${CF_AUTH_HEADERS[@]}" \
    "${CF_ACCT_BASE}/storage/kv/namespaces/$kv_id" 2>&1 || echo "")
  
  if echo "$namespace_check" | jq -e '.success == false' >/dev/null 2>&1; then
    log "⚠️  KV namespace $kv_id not found or not accessible"
    return 0  # Not a hard failure
  fi
  
  log "KV namespace verified: $kv_id"
}

# Main preflight check function
preflight_check() {
  local operation="${1:-deploy}"
  local module="${2:-}"
  local env="${3:-}"
  
  step "Running pre-flight checks for $operation"
  
  # Check required commands
  log "Checking required commands..."
  check_command "jq"
  check_command "curl"
  check_command "wrangler"
  check_command "pnpm"
  
  # Check environment variables
  log "Checking environment variables..."
  if [[ -f "$ROOT_DIR/.env" ]]; then
    set -a
    source "$ROOT_DIR/.env"
    set +a
  fi
  
  check_env_var "CF_API_TOKEN"
  check_env_var "CF_ACCOUNT_ID"
  
  # Setup Cloudflare environment
  setup_cf_env
  setup_wrangler_token
  
  # Module-specific checks
  if [[ -n "$module" ]]; then
    log "Checking module-specific requirements for $module..."
    
    # Check build artifacts for Workers modules
    if [[ "$module" == "app" || "$module" == "admin" ]]; then
      if [[ "$operation" == "deploy" ]]; then
        check_build_artifact "$module"
      fi
    fi
    
    # Check KV namespace if deploying
    if [[ -n "$env" && "$operation" == "deploy" ]]; then
      check_kv_namespace "$module" "$env"
    fi
  fi
  
  log "✅ Pre-flight checks passed"
}

# Export function for use in other scripts
export -f preflight_check check_command check_env_var check_build_artifact check_kv_namespace

# If script is run directly, run preflight check
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  preflight_check "$@"
fi

