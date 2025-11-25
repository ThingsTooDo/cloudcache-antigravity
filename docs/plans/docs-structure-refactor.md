# Documentation Restructuring Plan: Truth vs. Plans

## Goal

To strictly separate documentation into two distinct categories with a flattened structure:

1. **Truth** (`docs/truth/`): The current reality, rules, standards, and operational manuals.
2. **Plans** (`docs/plans/`): Intentions, future work, and active tasks.

## Target Structure (Scaffold)

The structure will be strictly limited to the following subdirectories:

```text
docs/
├── plans/                          # [INTENT]
│   ├── archive/                    # Old/Completed plans (Moved from docs/archive/plans)
│   ├── docs-structure-refactor.md  # (This Plan)
│   ├── backend-quality-improvement-plan.md
│   └── ... (active plan files)
│
└── truth/                          # [REALITY]
    ├── archive/                    # Historical documents (General archive)
    ├── zero-trust/                 # Security Policies (Preserved folder)
    ├── 001-build-strategy.md       # (Flattened from adr/)
    ├── project-standards.md        # (Flattened from standards/)
    ├── all-deployment-truth.md
    ├── all-git-truth.md
    ├── all-local-dev-truth.md
    ├── all-system-truth.md
    ├── architecture-general.md     # (Moved from root)
    ├── cto-codebase-review.md
    ├── operational-runbook.md
    └── ... (other truth files)
```

## Execution Steps

### 1. Create Directory Structure

- Create `docs/truth/`
- Create `docs/truth/archive/`
- Create `docs/truth/zero-trust/`
- Create `docs/plans/archive/`

### 2. Migrate "Truth" Content

- **Flatten Folders**:
  - Move `docs/adr/001-build-strategy.md` to `docs/truth/build-strategy.md` (RENAME: Remove numerical prefix) -> Delete `docs/adr/`
  - Move `docs/standards/project-standards.md` to `docs/truth/project-standards.md` -> Delete `docs/standards/`
- **Move Directories**:
  - Move `docs/zero-trust/*` to `docs/truth/zero-trust/` -> Delete `docs/zero-trust/`
  - Move `docs/archive/*` (excluding `plans/`) to `docs/truth/archive/`
- **Move Files**:
  - Move `docs/all-*.md` to `docs/truth/`
  - Move `docs/operational-runbook.md` to `docs/truth/`
  - Move `docs/secrets-management.md` to `docs/truth/`
  - Move `docs/shopify-*.md` to `docs/truth/`
  - Move `docs/cto-codebase-review.md` to `docs/truth/`
  - Move `docs/deployment-verified-state-*.md` to `docs/truth/`
  - Move `docs/multi-ide-workflow.md` to `docs/truth/`
  - Move `ARCHITECTURE-GENERAL.md` (from root) to `docs/truth/architecture-general.md`

### 3. Migrate "Plans" Content

- **Archive Plans**:
  - Move `docs/archive/plans/*` to `docs/plans/archive/`
- **Active Plans**:
  - Ensure all active plans remain in `docs/plans/`
  - Move `docs/app-bundle-debug.md` to `docs/plans/` (identified as transient)

### 4. Update Rules & Standards (New Step)

- **Update `docs/truth/project-standards.md`** (and any other relevant "Truth" files):
  - **Document Structure**: Explicitly define the `docs/truth` vs `docs/plans` separation.
  - **Naming Convention**: Enforce "No numerical prefixes" or dates in filenames (use kebab-case).
  - **Agent Instructions**: Add clear instructions for agents on where to place new files (Truth vs Plans) and how to merge code.

### 5. Cleanup

- Remove empty `docs/archive/` directory (after moves).
- Update `README.md` links to point to new locations.
