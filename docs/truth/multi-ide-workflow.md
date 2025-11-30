# Multi-IDE Workflow & Governance

**Last Updated**: 2025-11-25
**Standard Reference**: `docs/standards/all-code-truth.md`

## The "Clean Slate" Protocol

To prevent drift, we enforce a strict "One Driver" policy.

### 1. Switching to Antigravity

**Option A: Smart Switch (Recommended)**

1. **Command**: Type `/switch` in Antigravity chat.
2. **Action**: The agent will summarize your session to `docs/plans/session-handoff.md`, switch the lock, and **automatically shut down** Antigravity.
3. **Open Cursor**: Launch Cursor and pick up where you left off.

**Option B: Manual Switch**

1. **Terminal**: Run `pnpm switch:antigravity`
2. **Action**: **CLOSE** the Cursor window completely (Cmd+Q).
3. **Context Injection**: In Antigravity chat, type:
   > "Read docs/truth/project-standards.md and docs/plans/active-plan.md. I am starting a session."

### 2. Switching to Cursor

1. **Terminal**: Run `pnpm switch:cursor`
2. **Action**: **CLOSE** the Antigravity window completely.
1. **Terminal**: Run `pnpm switch:cursor`
2. **Action**: **CLOSE** the Antigravity window completely.
3. **Context**: Cursor automatically loads rules via `.cursorrules`.

## Session Handoff Protocol

To ensure seamless context transfer, we use an **Active Handoff** log.

* **File**: `docs/plans/session-handoff.md`
* **Prompt Template**: `docs/standards/prompts/session-summary.md`
* **Rule**: Before switching, the active agent/user MUST append a summary of the session.
* **Antigravity**: The `/switch` command uses this template automatically.
* **Cursor**: Copy the prompt from the template file and paste it into Chat to generate your summary.

## Artifact Sync Protocol (Antigravity → Cursor)

To ensure Cursor knows what Antigravity "thinks", Antigravity agents MUST sync their internal state to the filesystem.

**Agent Rule**:
Whenever you update your internal `task.md` or `implementation_plan.md`, you MUST copy them to:

* `docs/plans/active-task.md`
* `docs/plans/active-plan.md`

This ensures the "brain" state is visible to the other IDE.

## Shared State

* **Plans**: ALWAYS in `docs/plans/`. Never in IDE-specific storage.
* **Docs**: `docs/` is the only place for long-term knowledge.

## Conflict Prevention

1. **Always pull before opening IDE**: `git pull origin main`
2. **Always commit before switching IDEs**: Ensures clean state
3. **Never work in both simultaneously**: Prevents lock file conflicts
4. **Use pre-commit hooks**: Already configured via Husky

## Source-of-Truth Files (NEVER IGNORE)

* `docs/all-*-truth.md` files

* `docs/standards/all-code-truth.md`
* `.gitignore`, `.prettierrc`, `eslint.config.js`
* All `/scripts/` shell scripts
* All configuration files: `package.json`, `tsconfig.json`, `wrangler.toml`
