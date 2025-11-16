#!/usr/bin/env bash
#
# Master Deployment Script
#
# Deploys a single specified module to a target environment. This is the
# single source of truth for all deployment operations.
#
# Usage:
#   bash scripts/deploy-module.sh <module> <environment>
#
# Example:
#   bash scripts/deploy-module.sh app preview
#

set -euo pipefail

# --- Configuration & Setup ---
ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
source "$ROOT_DIR/scripts/lib/core.sh"

# --- Load Environment ---
# Must be loaded after core lib and before any wrangler commands
load_env_file_if_exists "$ROOT_DIR/.env"
load_env_file_if_exists "$ROOT_DIR/.env.local"

# --- Main Function ---
main() {
    # 1. Parse Arguments & Set Up
    parse_arguments "$@"
    require_wrangler
    setup_wrangler_token

    # 2. Execute Deployment
    run_deployment
}

# --- Helper Functions ---

parse_arguments() {
    MODULE="${1?Missing module name. Must be one of 'app', 'admin', or 'apex'.}"
    ENV="${2?Missing environment name. Must be one of 'preview', 'staging', or 'production'.}"

    # Validate inputs
    if [[ ! "$MODULE" =~ ^(app|admin|apex)$ ]]; then
        die "Invalid module '$MODULE'. Must be one of 'app', 'admin', or 'apex'."
    fi
    if [[ ! "$ENV" =~ ^(preview|staging|production)$ ]]; then
        die "Invalid environment '$ENV'. Must be one of 'preview', 'staging', or 'production'."
    fi

    log "Arguments parsed: Module=$MODULE, Environment=$ENV"
}

run_deployment() {
    step "Executing deployment for '$MODULE' in '$ENV' environment..."

    local module_dir="$ROOT_DIR/apps/$MODULE"
    cd "$module_dir" || die "Failed to change directory to $module_dir"

    local build_command="pnpm build:bundle"
    if [[ "$MODULE" == "apex" ]]; then
        build_command="pnpm exec tsup src/index.ts --format esm"
    fi

    step "Building $MODULE module..."
    eval "$build_command" || die "Build failed for module '$MODULE'."

    step "Deploying $MODULE module to $ENV..."
    wrangler deploy --env "$ENV" --no-bundle || die "Deployment failed for module '$MODULE' to environment '$ENV'."

    log "✅ Successfully deployed '$MODULE' to '$ENV'."
}

main "$@"
