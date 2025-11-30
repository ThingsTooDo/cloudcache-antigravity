# Multi-IDE Workflow Plan: Antigravity + Cursor IDE

**Status**: ARCHIVED / COMPLETED
**Archived On**: 2025-11-30

---

# Multi-IDE Workflow Plan: Antigravity + Cursor IDE

**Goal**: Enable seamless alternation between Antigravity IDE and Cursor IDE on the Cloudflare/Cloudcache project without conflicts, drift, or errors.

---

## Executive Summary

This plan establishes a **dual-IDE governance model** that decouples project standards from tool-specific configurations. It enables seamless alternation between Antigravity IDE and Cursor IDE by treating the **filesystem as the single source of truth**, not the IDE's internal state.

**Core Philosophy**: "The Project is the Platform." The IDE is just a view.

**Key Strategy**:

1. **Centralize Standards**: Move all rules/standards to `docs/standards/` (IDE-agnostic).
2. **Enforce Isolation**: Strict git-ignoring of IDE configs.
3. **Session Locking**: A "mutex" mechanism (via script) to signal which IDE is currently "driving".

---

## CTO Recommendations & Architecture Review

### 1. Decoupling Standards from Tools

* **Critique**: Storing rules in `.cursor/rules` tightly couples governance to one vendor.
* **Decision**: We will move `all-code-truth.mdc` to `docs/standards/all-code-truth.md`. This elevates it to a project-level architectural standard, accessible to any agent or human.

### 2. The "Context Injection" Pattern

* **Critique**: Antigravity won't automatically know about Cursor rules.
* **Decision**: We must define a **Context Injection Protocol**.
  * **Cursor**: Reads `docs/standards/` via `.cursorrules` pointer.
  * **Antigravity**: User explicitly prompts "Read project standards" at session start, or we configure a system prompt if available.

### 3. Session Mutex (The "Conch Shell")

* **Critique**: "Just remembering" to switch is error-prone.
* **Decision**: The `switch-ide.sh` script will act as a soft mutex. It will update a local status file (gitignored) indicating the active session owner, warning you if you try to switch without closing the previous session properly.

---

## Risk Assessment & Problem Analysis

### Critical Risks Identified

#### 1. **IDE Configuration Conflicts** (HIGH RISK)

* **Problem**: Both IDEs store project-specific configurations that may conflict
* **Impact**: Settings overwriting each other, different formatting rules, linting conflicts
* **Files at Risk**:
  * `.cursor/` directory (Cursor-specific)
  * `~/.gemini/antigravity/brain/` (Antigravity-specific, outside project)
  * `.cursorignore` vs `.antigravityignore`
  * `.cursorrules` (Cursor) vs Antigravity's system instructions

#### 2. **Plan & Task File Divergence** (HIGH RISK)

* **Problem**: Antigravity stores plans in `~/.gemini/antigravity/brain/[session-id]/` (outside project), Cursor may create plans in `.cursor/plans/`
* **Impact**: Loss of context when switching IDEs, duplicate work, conflicting approaches
* **Current State**: Your project already has `.cursor/rules/all-code-truth.mdc` enforcing `docs/plans/` for plans

#### 3. **Code Formatting Drift** (MEDIUM RISK)

* **Problem**: Each IDE may apply different formatting on save
* **Impact**: Noisy git commits, hard-to-review diffs
* **Mitigation**: Your project already has Prettier + lint-staged configured

#### 4. **Cache & Temporary File Pollution** (MEDIUM RISK)

* **Problem**: IDEs create cache, logs, and temporary files
* **Impact**: Unnecessary git noise, large commits, merge conflicts
* **Files at Risk**:
  * `~/.cache/antigravity/` (system-level, safe)
  * `.cursor/` subdirectories (project-level, risky)
  * IDE-specific lock files or indexes

#### 5. **AI Context Mismatch** (LOW-MEDIUM RISK)

* **Problem**: Each IDE builds its own understanding of the codebase
* **Impact**: Inconsistent suggestions, duplicate work
* **Mitigation**: Use documentation as source-of-truth

---

## Proposed Changes

### Phase 1: IDE File Isolation

#### [MODIFY] [.gitignore](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/.gitignore)

Add comprehensive IDE-specific ignores to prevent cross-IDE conflicts:

```gitignore
# IDE-specific directories (MULTI-IDE SAFETY)
# Cursor IDE
.cursor/
.cursorignore
.cursorrules

# Antigravity IDE (project-level artifacts, if any)
# Note: Antigravity stores most data in ~/.gemini/antigravity/
.antigravity/

# IDE cache and temporary files
*.log
*.tmp
*~
.DS_Store
```

**Rationale**:

* Current `.gitignore` already includes `.vscode/` and `.idea/` (line 34-35)
* Need to add `.cursor/`, `.cursorignore`, `.cursorrules` to prevent Cursor-specific configs from being committed
* Antigravity stores artifacts in `~/.gemini/antigravity/` (outside project), so minimal project pollution

---

#### [NEW] [.antigravityignore](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/.antigravityignore)

Create Antigravity-specific ignore file (if supported, similar to `.cursorignore`):

```
# Add directories or file patterns to ignore during indexing
node_modules/
dist/
.wrangler/
.cursor/
.vscode/
.idea/
pnpm-lock.yaml
test-results/
docs/reports/validation/
```

**Rationale**: Prevents Antigravity from indexing IDE-specific and generated files.

---

#### [MODIFY] [.cursorignore](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/.cursorignore)

Enhance the existing (currently empty) `.cursorignore`:

```
# Add directories or file patterns to ignore during indexing
node_modules/
dist/
.wrangler/
.gemini/
.antigravity/
pnpm-lock.yaml
test-results/
docs/reports/validation/
```

**Rationale**:

* Prevents Cursor from indexing Antigravity-specific files
* Already exists but is empty (only has a comment)

---

### Phase 2: Shared Source-of-Truth (The "Constitution")

#### [MODIFY] [docs/truth/project-standards.md](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/docs/truth/project-standards.md)

**Goal**: Add a standardized "Multi-IDE Context" and "Conflict Protocol" to the top of the file so both IDEs immediately understand the collaboration model.

**New Section: Multi-IDE Collaboration Context**
> This project is jointly managed by **Antigravity** and **Cursor**. To prevent friction, drift, and regression, we adhere to a strict "One Driver" policy enforced by session locking. Both IDEs share this single source of truth.

**New Section: Conflict Warning Protocol**
> If an IDE detects a conflict (e.g., lock file mismatch, uncommitted changes):
>
> 1. **WARN**: Display a clear warning (e.g., "⚠️ Session Conflict Detected").
> 2. **DESCRIBE**: State the conflict (e.g., "Session currently locked by Antigravity").
> 3. **OFFER**: Provide resolution options:
>    * **Safe**: "Close this window and switch to the active IDE."
>    * **Force**: "Overwrite lock and claim session (WARNING: Potential data loss)."

#### [NEW] [docs/multi-ide-workflow.md](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/docs/truth/multi-ide-workflow.md)

Create the "Operating Manual" for this dual-stack approach.

**Headers**:

```markdown
# Multi-IDE Workflow & Governance

**Last Updated**: 2025-11-25
**Standard Reference**: `docs/standards/all-code-truth.md`

## The "Clean Slate" Protocol
To prevent drift, we enforce a strict "One Driver" policy.

### 1. Switching to Antigravity
1.  **Terminal**: Run `pnpm switch:antigravity`
2.  **Action**: Close Cursor completely.
3.  **Context Injection**: In Antigravity chat, type:
    > "Read docs/standards/all-code-truth.md and docs/plans/active-plan.md. I am starting a session."

### 2. Switching to Cursor
1.  **Terminal**: Run `pnpm switch:cursor`
2.  **Action**: Close Antigravity completely.
3.  **Context**: Cursor automatically loads rules via `.cursorrules`.

## Shared State
*   **Plans**: ALWAYS in `docs/plans/`. Never in IDE-specific storage.
*   **Docs**: `docs/` is the only place for long-term knowledge.
```

---

#### [NEW] [docs/rules/all-code-truth.md](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/docs/rules/all-code-truth.md)

**Action**: Copy `.cursor/rules/all-code-truth.mdc` to this location, converting from MDC to MD format.

**Changes**:

* Remove MDC frontmatter (`scope`, `enforce` fields)
* Add standard truth file header
* Keep all content intact
* Update references to point to new location

---

### Phase 3: Workflow Automation (The Mutex & Sync)

#### [NEW] [scripts/switch-ide.sh](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/scripts/switch-ide.sh)

Create a smart switching script that manages the "Session Lock" and **syncs context**.

```bash
#!/usr/bin/env bash
set -euo pipefail

# Switch IDE Helper Script
# Usage: bash scripts/switch-ide.sh [antigravity|cursor]

TARGET_IDE="${1:-}"
LOCK_FILE=".ide-session.lock"
PLANS_DIR="docs/plans"

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
    echo "💡 PROMPT: 'Read docs/standards/all-code-truth.md to start session.'"
elif [ "$TARGET_IDE" == "cursor" ]; then
    echo "🚀 ACTION: Open Cursor."
    echo "💡 Rules will auto-load from .cursorrules"
fi
```

#### [NEW] Sync Workflow (Agent Rule)

**Objective**: Ensure Antigravity's internal "brain" state is visible to Cursor.

**Mechanism**:

1. **Agent Rule**: Whenever I (Antigravity Agent) update `task.md` or `implementation_plan.md` in my brain, I MUST also copy them to:
    * `docs/plans/active-task.md`
    * `docs/plans/active-plan.md`
2. **Cursor Visibility**: Cursor can now read these files to know exactly where Antigravity left off.

---

### Phase 4: Future-Proofing with MCP (Model Context Protocol)

**Goal**: Create a "Project Knowledge Server" that bridges the two IDEs dynamically.

**Strategy**:

1. **Design Custom MCP Server**: `scripts/mcp-server.ts`
2. **Capabilities**:
    * **Resource**: `project://standards` (Serves `docs/standards/all-code-truth.md`)
    * **Resource**: `project://state` (Serves active plan/task status)
    * **Tool**: `switch_session` (Programmatic session locking)
3. **Integration**:
    * **Cursor**: Connects to local MCP server via settings.
    * **Antigravity**: Connects to local MCP server (native support).

**Benefit**: Instead of relying on file syncing and manual prompts, both IDEs query the *same* live server for "What should I do next?" and "What are the rules?".

---

### Phase 4: Documentation Updates

#### [MODIFY] [docs/all-system-truth.md](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/docs/all-system-truth.md)

Add section documenting the multi-IDE workflow:

```markdown
## Multi-IDE Support

This project supports alternating between **Antigravity IDE** and **Cursor IDE**.

**Canonical Guide**: `docs/multi-ide-workflow.md`

**Key Rules**:
1. IDE-specific files (`.cursor/`, `.antigravity/`) are gitignored
2. Shared source-of-truth: `docs/rules/all-code-truth.md`
3. Plans must be in `docs/plans/` (not IDE-specific directories)
4. Always run `pnpm switch:[ide-name]` before switching
```

---

### Phase 5: Git Hook Enhancement

#### [MODIFY] [.husky/pre-commit](file:///Users/rrokk/Projects/Cloudcache-Antigravity/cloudcache-antigravity/.husky/pre-commit)

Ensure the pre-commit hook prevents committing IDE-specific files:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Prevent committing IDE-specific files
IDE_FILES=$(git diff --cached --name-only | grep -E '^\.(cursor|antigravity|vscode)/')
if [ -n "$IDE_FILES" ]; then
  echo "❌ ERROR: Attempting to commit IDE-specific files:"
  echo "$IDE_FILES"
  echo "These files should be gitignored. Update .gitignore."
  exit 1
fi

# Existing hooks
pnpm exec lint-staged
```

---

## Verification Plan

### Automated Tests

1. **Git ignore verification**:

    ```bash
    # Create test files in .cursor/ and verify they're ignored
    touch .cursor/test-file.txt
    git status --short
    # Should NOT show .cursor/test-file.txt
    ```

2. **Format consistency**:

    ```bash
    # Run in both IDEs
    pnpm format:check
    # Should pass identically
    ```

3. **Switch script test**:

    ```bash
    # Test switch script
    pnpm switch:antigravity
    pnpm switch:cursor
    ```

### Manual Verification

1. **IDE isolation test**:
    * Open project in Antigravity, create a plan, close
    * Open project in Cursor, verify no Antigravity artifacts in git status
    * Switch back to Antigravity, verify plan is preserved in `~/.gemini/antigravity/`

2. **Code consistency test**:
    * Edit a file in Antigravity, save
    * Commit changes
    * Open in Cursor, verify formatting is identical
    * Make changes in Cursor, commit
    * Switch back to Antigravity, verify no formatting drift

3. **Rule adherence test**:
    * Both IDEs should reference `docs/rules/all-code-truth.md`
    * Verify both understand file naming conventions
    * Verify both use `docs/plans/` for plan files

---

## Files Protected from Git (Complete List)

### IDE-Specific (MUST be in .gitignore)

```
.cursor/
.cursorignore
.cursorrules
.antigravity/
```

### Build Artifacts (Already protected)

```
node_modules/
dist/
.wrangler/
test-results/
```

### Secrets & Environment (Already protected)

```
.env
.env.*
.dev.vars
wrangler.local.toml
```

### Temporary & Cache (Already protected)

```
*.log
*.tmp
*~
.DS_Store
```

---

## Source-of-Truth Files (MUST be committed)

### Documentation (The Constitution)

```
docs/standards/all-code-truth.md  <-- NEW LOCATION
docs/all-*-truth.md
docs/multi-ide-workflow.md
README.md
ARCHITECTURE-GENERAL.md
```

### Configuration

```
package.json
tsconfig.json
tsconfig.base.json
pnpm-workspace.yaml
.gitignore
.prettierrc
eslint.config.js
playwright.config.js
.cursorrules (pointing to docs/standards/)
```

### Scripts

```
scripts/**/*.sh
```

### Module Configs

```
apps/*/wrangler.toml
apps/*/package.json
apps/*/tsconfig.json
apps/*/shopify.app.toml (for shopify module)
```

---

## Migration Checklist

* [ ] **Governance**: Move `.cursor/rules/all-code-truth.mdc` → `docs/standards/all-code-truth.md`
* [ ] **Config**: Update `.cursorrules` to reference the new standards file
* [ ] **Isolation**: Update `.gitignore` with `.ide-session.lock` and IDE folders
* [ ] **Automation**: Create `scripts/switch-ide.sh` with mutex logic
* [ ] **Documentation**: Create `docs/multi-ide-workflow.md`
* [ ] **Verification**: Test the "Context Injection" flow in Antigravity

---

## Post-Implementation Workflow

### Switching from Antigravity to Cursor

```bash
# In terminal
pnpm switch:cursor
# Close Antigravity IDE
# Open Cursor IDE
```

### Switching from Cursor to Antigravity

```bash
# In terminal
pnpm switch:antigravity
# Close Cursor IDE
# Open Antigravity IDE
```

### Daily Workflow Example

```
Morning (Antigravity):
1. Open Antigravity IDE
2. Work on features
3. Commit changes
4. Run `pnpm switch:cursor`
5. Close Antigravity

Afternoon (Cursor):
1. Open Cursor IDE
2. Continue work
3. Commit changes
4. Run `pnpm switch:antigravity`
5. Close Cursor
```

---

## Open Questions for User Review

> [!IMPORTANT]
> **CTO Decision**: I have proactively selected **Option 1** (Move rules to `docs/standards/`) as it is the only architecturally sound choice for a multi-IDE setup.
>
> **Action Required**: Confirm you are ready to execute the migration of `all-code-truth.mdc` to `docs/standards/`.

> [!TIP]
> **Optional Enhancement**: Create a workflow to automatically sync Antigravity's `task.md` and `implementation_plan.md` to `docs/plans/` for cross-IDE visibility.
