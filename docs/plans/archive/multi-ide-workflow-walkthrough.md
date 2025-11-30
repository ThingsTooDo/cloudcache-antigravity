# Multi-IDE Workflow Implementation Walkthrough

**Status**: ARCHIVED / COMPLETED
**Archived On**: 2025-11-30

---

# Multi-IDE Workflow Implementation Walkthrough

**Date**: 2025-11-25
**Status**: Complete

## Overview

We have successfully implemented a robust **Multi-IDE Workflow** that allows seamless alternation between **Antigravity IDE** and **Cursor IDE** while preventing conflicts, drift, and errors.

## Key Components Implemented

### 1. The "Clean Slate" Protocol (Session Locking)

We introduced a mutex mechanism to ensure only one IDE is "driving" at a time.

- **Script**: `scripts/switch-ide.sh`
- **Lock File**: `.ide-session.lock` (gitignored)
- **Gatekeeper**: Prevents switching if there are uncommitted changes.
- **Safety**: Warns you to CLOSE the previous session window.

### 2. Shared Source-of-Truth (The Constitution)

We decoupled project governance from IDE specifics.

- **Standards**: `docs/truth/project-standards.md` (formerly `all-code-truth.mdc`)
- **New Sections**: Added "Multi-IDE Collaboration Context" and "Conflict Warning Protocol".
- **Updated**: `.cursorrules` now points to the shared standard.
- **Manual**: `docs/truth/multi-ide-workflow.md` is the operating manual.

### 3. IDE File Isolation

We configured strict ignore rules to prevent cross-contamination.

- **.gitignore**: Ignores `.cursor/`, `.antigravity/`, `.ide-session.lock`
- **.antigravityignore**: Ignores Cursor files
- **.cursorignore**: Ignores Antigravity files
- **Cleanup**: Removed unused VSCode/JetBrains entries.

### 4. Artifact Sync Protocol

Antigravity agents now sync their internal state to the filesystem for Cursor visibility.

- **Source**: Internal `task.md` / `implementation_plan.md`
- **Target**: `docs/plans/active-task.md` / `docs/plans/active-plan.md`

### 5. Future-Proofing (MCP)

We designed a "Project Knowledge Server" to serve standards and state dynamically.

- **Design Doc**: `docs/plans/mcp-architecture.md`

## How to Use

### Switching to Antigravity

```bash
pnpm switch:antigravity
```

_Action_: Close Cursor. Open Antigravity.
_Prompt_: "Read docs/truth/project-standards.md and docs/plans/active-plan.md. I am starting a session."

### Switching to Cursor

```bash
pnpm switch:cursor
```

_Action_: Close Antigravity. Open Cursor.
_Context_: Rules auto-load.

## Verification Results

| Test Case         | Result    | Notes                                                 |
| :---------------- | :-------- | :---------------------------------------------------- |
| **Git Ignore**    | ✅ Passed | Cleaned up and verified.                              |
| **Format Check**  | ✅ Passed | Codebase is consistent.                               |
| **Switch Script** | ✅ Passed | Successfully locked session and warned about closing. |
| **Gatekeeper**    | ✅ Passed | Blocked switch when changes were uncommitted.         |
| **References**    | ✅ Passed | All docs point to `docs/truth/project-standards.md`.  |

## Next Steps

- Review `docs/truth/multi-ide-workflow.md` to familiarize yourself with the protocol.
- Always run `pnpm switch:<ide>` before starting your day.
