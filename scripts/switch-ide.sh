#!/usr/bin/env bash
set -euo pipefail

# Switch IDE Helper Script
# Usage: bash scripts/switch-ide.sh [antigravity|cursor]

TARGET_IDE="${1:-}"
LOCK_FILE=".ide-session.lock"

if [[ -z "$TARGET_IDE" ]] || [[ ! "$TARGET_IDE" =~ ^(antigravity|cursor)$ ]]; then
  echo "Usage: bash scripts/switch-ide.sh [antigravity|cursor]"
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
        echo "   Please ensure you have CLOSED the $CURRENT_SESSION window."
    fi
fi

# 3. Update Environment
echo "📥 Syncing state (git pull)..."
git pull origin main || { echo "❌ Git pull failed"; exit 1; }

echo "🎨 Enforcing standards (format)..."
pnpm format

# 4. Set Lock
echo "$TARGET_IDE" > "$LOCK_FILE"
echo "✅ Session locked to: $TARGET_IDE"

# 5. Instructions
if [ "$TARGET_IDE" == "antigravity" ]; then
    echo "🚀 ACTION: Open Antigravity."
    echo "💡 PROMPT: 'Read docs/truth/project-standards.md to start session.'"
elif [ "$TARGET_IDE" == "cursor" ]; then
    echo "🚀 ACTION: Open Cursor."
    echo "💡 Rules will auto-load from .cursorrules"
fi
