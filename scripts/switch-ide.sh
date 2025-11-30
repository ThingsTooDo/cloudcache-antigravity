#!/usr/bin/env bash
set -euo pipefail

# Switch IDE Helper Script
# Usage: bash scripts/switch-ide.sh [antigravity|cursor] [--shutdown] [--app "App Name"]

TARGET_IDE=""
SHUTDOWN=false
APP_TO_QUIT=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    antigravity|cursor)
      TARGET_IDE="$1"
      shift
      ;;
    --shutdown)
      SHUTDOWN=true
      shift
      ;;
    --app)
      APP_TO_QUIT="$2"
      shift
      shift
      ;;
    *)
      echo "Unknown argument: $1"
      exit 1
      ;;
  esac
done

LOCK_FILE=".ide-session.lock"
PLANS_DIR="docs/plans"

if [[ -z "$TARGET_IDE" ]]; then
  echo "Usage: bash scripts/switch-ide.sh [antigravity|cursor] [--shutdown] [--app \"App Name\"]"
  exit 1
fi

echo "🔄 Requesting switch to $TARGET_IDE..."

# 1. Check Git Status (The Gatekeeper)
if ! git diff-index --quiet HEAD --; then
  echo "❌ BLOCKED: Uncommitted changes detected."
  echo "   You must commit or stash your work before switching context."
  git status --short
  exit 1
fi

# 2. Check Session Lock & Instructions
if [ -f "$LOCK_FILE" ]; then
    CURRENT_SESSION=$(cat "$LOCK_FILE")
    if [ "$CURRENT_SESSION" == "$TARGET_IDE" ]; then
        echo "ℹ️  You are already in a $TARGET_IDE session."
    else
        echo "⚠️  Switching context from $CURRENT_SESSION to $TARGET_IDE"
        if [ "$SHUTDOWN" = true ] && [ -n "$APP_TO_QUIT" ]; then
             echo "   🛑 Auto-shutdown enabled for: $APP_TO_QUIT"
        else
             echo "   Please ensure you have CLOSED the $CURRENT_SESSION window."
        fi
    fi
fi

# 3. Update Environment
echo "📥 Syncing state (git pull)..."
git pull origin main || { echo "❌ Git pull failed"; exit 1; }

echo "🎨 Enforcing standards (format)..."
pnpm format

# 4. Set Lock
# 4. Set Lock
echo "$TARGET_IDE" > "$LOCK_FILE"
echo "✅ Session locked to: $TARGET_IDE"

echo "📤 Syncing state (git push)..."
git add "$LOCK_FILE"
git commit -m "chore: lock session to $TARGET_IDE" || echo "⚠️  Lock file already committed or no changes."
git push origin main || { echo "❌ Git push failed"; exit 1; }

# 5. Instructions & Shutdown
if [ "$TARGET_IDE" == "antigravity" ]; then
    echo "🚀 ACTION: Open Antigravity."
    echo "💡 PROMPT: 'Read docs/truth/all-code-truth.mdc to start session.'"
elif [ "$TARGET_IDE" == "cursor" ]; then
    echo "🚀 ACTION: Open Cursor."
    echo "💡 Rules will auto-load from .cursorrules"
fi

if [ "$SHUTDOWN" = true ]; then
    if [ -n "$APP_TO_QUIT" ]; then
        echo "🛑 Shutting down $APP_TO_QUIT..."
        # Use osascript to quit the app gracefully
        osascript -e "quit app \"$APP_TO_QUIT\"" || echo "⚠️  Failed to quit $APP_TO_QUIT. Please close manually."
    else
        echo "⚠️  --shutdown requested but no --app specified. Skipping shutdown."
    fi
fi
