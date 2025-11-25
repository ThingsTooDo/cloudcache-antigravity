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

    # 2. Execute Deployment
    run_deployment
}

# --- Helper Functions ---

parse_arguments() {
    MODULE="${1?Missing module name. Must be one of 'app', 'admin', or 'apex'.}"
    ENV="${2?Missing environment name. Must be one of 'preview', 'staging', or 'production'.}"

    # Validate inputs
    # Validate inputs
    if [[ ! "$MODULE" =~ ^(app|shopify|admin|adm|apex|website|web)$ ]]; then
        die "Invalid module '$MODULE'. Must be one of 'app', 'shopify', 'adm', 'apex', or 'web'."
    fi
    if [[ ! "$ENV" =~ ^(preview|staging|production)$ ]]; then
        die "Invalid environment '$ENV'. Must be one of 'preview', 'staging', or 'production'."
    fi

    log "Arguments parsed: Module=$MODULE, Environment=$ENV"
}

run_deployment() {
    step "Executing deployment for '$MODULE' in '$ENV' environment..."

    local module_dir_name="$MODULE"
    # Map 'shopify' module name to 'app' directory (legacy support)
    if [[ "$MODULE" == "shopify" ]]; then
        module_dir_name="app"
    elif [[ "$MODULE" == "app" ]]; then
        module_dir_name="app"
    elif [[ "$MODULE" == "admin" ]]; then
        module_dir_name="adm"
    elif [[ "$MODULE" == "website" ]]; then
        module_dir_name="web"
    fi

    local module_dir="$ROOT_DIR/apps/$module_dir_name"
    cd "$module_dir" || die "Failed to change directory to $module_dir"

    local build_command="pnpm build:bundle"

    # Added support for website module (Workers deployment)
    # Added support for web module (Workers deployment)
    if [[ "$MODULE" == "web" || "$MODULE" == "website" ]]; then
        # Build Astro static site AND Worker bundle
        build_command="pnpm build && pnpm exec vite build -c vite.worker.config.ts"
    fi
    if [[ "$MODULE" == "apex" ]]; then
        build_command="pnpm build"
    fi
    if [[ "$MODULE" == "shopify" || "$MODULE" == "app" ]]; then
        build_command="pnpm build && pnpm exec vite build -c vite.worker.config.ts"
    fi

    step "Building $MODULE module..."
    eval "$build_command" || die "Build failed for module '$MODULE'."

    step "Deploying $MODULE module to $ENV..."
    local max_deploy_attempts=5
    local deploy_attempt=0
    local deploy_success=false
    local sleep_duration=5

    # Disable interactive prompts and telemetry for non-interactive deployment
    export CI=true
    export WRANGLER_SEND_METRICS=false

    while [[ $deploy_attempt -lt $max_deploy_attempts ]]; do
        deploy_attempt=$((deploy_attempt + 1))
        log "Deploying... (Attempt $deploy_attempt of $max_deploy_attempts)"
        
        if [[ "$MODULE" == "apex" ]]; then
            # APEX: Cloudflare Pages deployment
            local branch_name="main"
            if [[ "$ENV" == "preview" ]]; then
                branch_name="preview"
            elif [[ "$ENV" == "staging" ]]; then
                branch_name="staging"
            fi
            
            # Use project name "apex" as defined in wrangler.toml
            if wrangler pages deploy dist --project-name=apex --branch="$branch_name" 2>&1; then
                deploy_success=true
                break
            fi
        else
            # APP/ADMIN/WEBSITE: Cloudflare Workers deployment (pre-bundled)
            if wrangler deploy --env "$ENV" --no-bundle 2>&1; then
                deploy_success=true
                break
            fi
        fi

        if [[ $deploy_attempt -lt $max_deploy_attempts ]]; then
            log "⚠️  Deployment failed. Retrying in $sleep_duration seconds..."
            sleep "$sleep_duration"
            # Exponential backoff: double the sleep duration
            sleep_duration=$((sleep_duration * 2))
        fi
    done

    if [[ "$deploy_success" != "true" ]]; then
        die "Deployment failed for module '$MODULE' to environment '$ENV' after $max_deploy_attempts attempts."
    fi

    log "✅ Successfully deployed '$MODULE' to '$ENV'."
}

main "$@"
