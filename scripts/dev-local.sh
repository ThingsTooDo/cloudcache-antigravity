#!/usr/bin/env bash
#
# Start Local Development Servers Sequentially
#
# This script builds and starts local development servers for all modules
# in a specific, controlled order, with health checks at each step.
# This avoids race conditions and ensures a stable startup for validation.
#

set -euo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

source "$SCRIPT_DIR/lib/core.sh"

# --- Health Check Function ---
# Checks if a server is responsive on a given port.
# Usage: wait_for_server <port> <server_name>
wait_for_server() {
    local port="$1"
    local name="$2"
    local max_attempts=30
    local attempt=0

    step "Waiting for $name server to start on port $port..."

    while [[ $attempt -lt $max_attempts ]]; do
        if curl -s --head --fail "http://localhost:$port" >/dev/null 2>&1; then
            log "✅ $name server is up and running."
            return 0
        fi
        sleep 2
        ((attempt++))
    done

    die "❌ $name server failed to start on port $port within the timeout."
}

# --- Main Logic ---

# 1. Stop any running dev servers to ensure a clean start.
step "Stopping any existing development servers..."
bash "$SCRIPT_DIR/dev-stop.sh"

# 2. Build all modules sequentially.
step "Building all modules for local development..."
cd "$ROOT_DIR"
pnpm build:dev

# 3. Start servers sequentially in the background.
step "Starting development servers in order..."

cd "$ROOT_DIR/apps/adm"
pnpm dev &
wait_for_server 8787 "Admin"

cd "$ROOT_DIR/apps/apex"
pnpm dev &
wait_for_server 8788 "Apex"

cd "$ROOT_DIR/apps/app"
pnpm dev &
wait_for_server 8789 "App"

log "🎉 All local development servers started successfully!"
echo "  - Admin: http://localhost:8787"
echo "  - Apex:  http://localhost:8788"
echo "  - App:   http://localhost:8789"
echo ""
echo "Press Ctrl+C to stop all servers."

# Keep the script running to maintain the background processes
wait

