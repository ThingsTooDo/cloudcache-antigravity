# Multi-IDE Workflow Implementation Tasks
<div style="border-left: 4px solid #dfe2e5; padding-left: 15px; margin-top: -5px; margin-bottom: 25px;">
  <h2 style="color: #f78d24; margin: 0; border-bottom: none; font-size: 26px;">Multi-IDE Workflow Setup</h2>
</div>


## Phase 1: IDE File Isolation

- [x] Update `.gitignore` with comprehensive IDE-specific entries
  - [x] Add `.cursor/` directory
  - [x] Add `.cursorignore` file  
  - [x] Add `.cursorrules` file
  - [x] Add `.antigravity/` directory (if applicable)
  - [x] Verify existing IDE ignores (.vscode/, .idea/) are present
- [x] Create `.antigravityignore` file
  - [x] Add node_modules, dist, .wrangler
  - [x] Add Cursor-specific directories
  - [x] Add generated files
- [x] Enhance `.cursorignore` file
  - [x] Add Antigravity-specific paths
  - [x] Add generated/cache directories
  - [x] Mirror .antigravityignore patterns

## Phase 2: Shared Source-of-Truth (The Constitution)

- [x] Migrate Rules to Standards
  - [x] Create `docs/standards/` directory
  - [x] Move `.cursor/rules/all-code-truth.mdc` → `docs/standards/all-code-truth.md`
  - [x] Convert MDC frontmatter to standard markdown
  - [x] Update `.cursorrules` to point to `docs/standards/all-code-truth.md`
- [x] Create `docs/multi-ide-workflow.md`
  - [x] Document "Clean Slate Protocol"
  - [x] Document "Context Injection" for Antigravity
  - [x] Document Session Locking mechanism

## Phase 3: Workflow Automation (The Mutex)

- [x] Create `scripts/switch-ide.sh` with Session Lock
  - [x] Implement git status check (Gatekeeper)
  - [x] Implement `.ide-session.lock` logic (Mutex)
  - [x] Implement git pull & format
  - [x] Add explicit "Context Injection" instructions for Antigravity output
  - [x] Make executable
- [x] Update `package.json` scripts
  - [x] Add `switch:antigravity`
  - [x] Add `switch:cursor`
- [x] Update `.gitignore`
  - [x] Add `.ide-session.lock`

## Phase 4: Documentation Updates

- [x] Update `docs/all-system-truth.md`
  - [x] Add Multi-IDE Support section
  - [x] Reference `docs/multi-ide-workflow.md`
  - [x] List key rules
  - [x] Add to script manifest if needed
- [x] Update project `README.md` (if needed)
  - [x] Mention multi-IDE support
  - [x] Link to workflow guide

## Phase 5: Git Hook Enhancement

- [x] Enhance `.husky/pre-commit` hook
  - [x] Add IDE-specific file detection
  - [x] Add error message for IDE files
  - [x] Test with dummy files
  - [x] Verify existing lint-staged still works

## Phase 6: Verification & Testing

- [x] Automated tests
  - [x] Test git ignore (create .cursor/test.txt, verify ignored)
  - [x] Test format consistency (`pnpm format:check`)
  - [x] Test switch script (`pnpm switch:antigravity`)
  - [x] Test switch script (`pnpm switch:cursor`)
  - [x] Test pre-commit hook with IDE files
- [x] Manual verification
  - [x] IDE isolation test (Antigravity → Cursor)
  - [x] Code consistency test (formatting)
  - [x] Rule adherence test (both IDEs reference truth docs)
  - [x] Plan file location test (`docs/plans/`)
- [x] Cross-IDE workflow test
  - [x] Morning session in Antigravity
  - [x] Afternoon session in Cursor
  - [x] Verify no drift or conflicts

## Phase 7: Documentation Finalization

- [x] Create final walkthrough
- [x] Document any issues encountered
- [x] Update timestamps on all truth docs
- [x] Commit all changes


---
[⬅️ Return to Task File Audit](../../task-file-audit.md)
