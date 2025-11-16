#!/usr/bin/env bash
set -euo pipefail

# --- Configuration ---
ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

# --- Source Core Library ---
source "$ROOT_DIR/scripts/lib/core.sh"

# --- Load Environment ---
# Must be loaded after core lib and before any wrangler commands
load_env_file_if_exists "$ROOT_DIR/.env"
load_env_file_if_exists "$ROOT_DIR/.env.local"

# --- Configuration ---
TEMPLATE_FILE="$ROOT_DIR/docs/plans/deployment-report.template.md"
REPORTS_DIR="$ROOT_DIR/docs/reports"
ENV_FILE="$ROOT_DIR/.env"

# --- Main Function ---
main() {
    # 1. Parse Arguments & Set Up
    require_wrangler
    setup_wrangler_token
    parse_arguments "$@"

    # 2. Execute Deployment
    run_deployment

    # 3. Verify, Discover, and Report
    verification_output=$(verify_deployment)
    source <(echo "$verification_output")
    discover_module_states
    generate_report
}

# --- Helper Functions ---

verify_deployment() {
    step "Verifying deployment..."
    local deployment_url="https://app-worker-preview.cloudcache.workers.dev"
    local status="FAILED"
    local output="Playwright checks failed. See logs for details."

    step "Running Playwright verification for $deployment_url"
    export DEPLOYMENT_URL="$deployment_url"
    if npx playwright test --config="$ROOT_DIR/playwright.config.js"; then
        status="PASSED"
        output="All Playwright checks passed."
    fi
    unset DEPLOYMENT_URL

    echo "CONSOLE_STATUS=$status"
    echo "CONSOLE_OUTPUT='$output'"
}

load_environment() {
    echo "Loading environment variables from $ENV_FILE..."
    if [[ ! -f "$ENV_FILE" ]]; then
        echo "Warning: .env file not found. Assuming credentials are in the environment." >&2
        return
    fi
    # shellcheck source=/dev/null
    source "$ENV_FILE"

    # Export for Wrangler
    export CLOUDFLARE_API_TOKEN="$CF_API_TOKEN"
    export CLOUDFLARE_ACCOUNT_ID="$CF_ACCOUNT_ID"
}

parse_arguments() {
    MODULE_NAME_UPPER=$(echo "${1?Missing module name}" | tr '[:lower:]' '[:upper:]')
    MODE_NAME_LOWER=$(echo "${2?Missing mode name}" | tr '[:upper:]' '[:lower:]')
    INSTRUCTION_SUMMARY="${3?Missing instruction summary}"
    echo "Parsed arguments: Module=$MODULE_NAME_UPPER, Mode=$MODE_NAME_LOWER, Summary=$INSTRUCTION_SUMMARY"
}

run_deployment() {
    local module_lower
    module_lower=$(echo "$MODULE_NAME_UPPER" | tr '[:upper:]' '[:lower:]')
    local mode_lower
    mode_lower=$(echo "$MODE_NAME_LOWER" | tr '[:upper:]' '[:lower:]')

    step "Executing deployment for $module_lower in $mode_lower..."

    local module_dir="$ROOT_DIR/apps/$module_lower"
    cd "$module_dir" || die "Failed to change directory to $module_dir"

    local build_command="pnpm build:bundle"
    if [[ "$module_lower" == "apex" ]]; then
        build_command="pnpm exec tsup src/index.ts --format esm"
    fi

    step "Building $module_lower module..."
    eval "$build_command" || die "$MODULE_NAME_UPPER build failed"

    step "Deploying $module_lower module to $mode_lower..."
    wrangler deploy --env "$mode_lower" --no-bundle || die "$MODULE_NAME_UPPER deployment failed"

    log "✅ $MODULE_NAME_UPPER deployed successfully to $mode_lower."
}

discover_module_states() {
    echo "Discovering state of all modules..."
    ALL_MODULES=("APP" "ADMIN" "APEX")
    for MODULE in "${ALL_MODULES[@]}"; do
        if [[ "$MODULE" == "$MODULE_NAME_UPPER" ]]; then
            declare -g "${MODULE}_STATUS"="[CHANGED]"
            # In a real script, we'd get this from the build artifact or git
            declare -g "${MODULE}_VERSION"="$(git rev-parse --short HEAD)"
        else
            declare -g "${MODULE}_STATUS"="[UNCHANGED]"
            # Placeholder for querying live /healthz endpoint
            # VERSION=$(curl -s "https://.../healthz" | jq -r .version)
            declare -g "${MODULE}_VERSION"="v1.0.0-mock"
            # This is where we will inject the real URL
            declare -g "${MODULE}_URL"="TBD"
        fi
    done

    # Inject the correct URL for the deployed module
    local module_lower_deployed
    module_lower_deployed=$(echo "$MODULE_NAME_UPPER" | tr '[:upper:]' '[:lower:]')
    local url_var_name="${MODULE_NAME_UPPER}_URL"
    declare -g "$url_var_name"="https://app-worker-preview.cloudcache.workers.dev" # Default for app, will be specific below

    case "$module_lower_deployed" in
      app)
        declare -g "${MODULE_NAME_UPPER}_URL"="https://app-worker-preview.cloudcache.workers.dev"
        ;;
      admin)
        declare -g "${MODULE_NAME_UPPER}_URL"="https://admin-worker-preview.cloudcache.workers.dev"
        ;;
      apex)
        declare -g "${MODULE_NAME_UPPER}_URL"="https://apex-worker-preview.cloudcache.workers.dev"
        ;;
    esac
}

generate_report() {
    echo "Generating deployment report..."
    TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
    REPORT_FILE="$REPORTS_DIR/deployment-report-$MODULE_NAME_LOWER-$TIMESTAMP.md"
    mkdir -p "$REPORTS_DIR"

    cp "$TEMPLATE_FILE" "$REPORT_FILE"

    # --- Replace placeholders in the template ---
    sed -i '' "s|%%MODULE_NAME%%|$MODULE_NAME_UPPER|g" "$REPORT_FILE"
    sed -i '' "s|%%MODE_NAME%%|$MODE_NAME_LOWER|g" "$REPORT_FILE"
    sed -i '' "s|%%EXECUTION_TIME%%|$(date)|g" "$REPORT_FILE"
    sed -i '' "s|%%INSTRUCTION_SUMMARY%%|$INSTRUCTION_SUMMARY|g" "$REPORT_FILE"

    # --- Replace verification placeholders ---
    sed -i '' "s|%%CONSOLE_STATUS%%|${CONSOLE_STATUS:-'NOT RUN'}|g" "$REPORT_FILE"
    sed -i '' "s|%%CONSOLE_OUTPUT%%|${CONSOLE_OUTPUT:-'Verification step was not executed.'}|g" "$REPORT_FILE"

    # Replace module-specific placeholders
    for MODULE in "APP" "ADMIN" "APEX"; do
        STATUS_VAR="${MODULE}_STATUS"
        VERSION_VAR="${MODULE}_VERSION"
        URL_VAR="${MODULE}_URL"
        sed -i '' "s|%%${MODULE}_STATUS%%|${!STATUS_VAR}|g" "$REPORT_FILE"
        sed -i '' "s|%%${MODULE}_VERSION%%|${!VERSION_VAR}|g" "$REPORT_FILE"
        sed -i '' "s|%%${MODULE}_URL%%|${!URL_VAR:-'N/A'}|g" "$REPORT_FILE"
        # Add URL replacements here
    done

    echo "Report generated at: $REPORT_FILE"
}

main "$@"
