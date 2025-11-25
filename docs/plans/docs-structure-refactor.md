# Documentation Restructuring Plan: Truth vs. Plans

## Goal

To strictly separate documentation into two distinct categories:

1. **Truth** (`docs/truth/`): The current reality, rules, standards, and operational manuals of the codebase.
2. **Plans** (`docs/plans/`): Intentions, future work, and transient implementation details.

## Current State Analysis

Currently, `docs/` is a mix of truth files (e.g., `all-deployment-truth.md`), folders (`standards/`, `zero-trust/`), and plans (in `plans/`).

## Proposed Changes

### 1. Create `docs/truth/` Directory

This directory will house all "Source of Truth" documents.

### 2. File & Folder Migrations

#### Move to `docs/truth/`

These files represent the current state of the system.

- `docs/all-deployment-truth.md`
- `docs/all-git-truth.md`
- `docs/all-local-dev-truth.md`
- `docs/all-system-truth.md`
- `docs/operational-runbook.md`
- `docs/secrets-management.md`
- `docs/shopify-app-setup-guide.md`
- `docs/shopify-oauth-setup.md`
- `docs/cto-codebase-review.md` (Current state assessment)
- `docs/deployment-verified-state-2025-11-21.md` (State snapshot)
- `docs/multi-ide-workflow.md`
- `ARCHITECTURE-GENERAL.md` (From Root) -> `docs/truth/architecture-general.md`

#### Move Subdirectories to `docs/truth/`

- `docs/adr/` -> `docs/truth/adr/` (Architectural Decision Records are permanent truth)
- `docs/standards/` -> `docs/truth/standards/`
- `docs/zero-trust/` -> `docs/truth/zero-trust/`
- `docs/archive/` -> `docs/truth/archive/` (History is a form of truth)

#### Move to `docs/plans/`

- `docs/app-bundle-debug.md` (Appears to be a transient debug note/plan)

### 3. Root Level Exceptions

- `README.md` will remain in the project root as the entry point.

## Scaffold Structure (Target State)

The following tree illustrates the intended structure after execution:

```text
docs/
├── plans/                          # [INTENT] Future work & active tasks
│   ├── docs-structure-refactor.md  # (This Plan)
│   ├── backend-quality-improvement-plan.md
│   ├── chat-audit-schedule.md
│   └── ... (other plan files)
│
└── truth/                          # [REALITY] Current state & rules
    ├── adr/                        # Architectural Decision Records
    ├── archive/                    # Historical documents
    ├── standards/                  # Coding & Engineering Standards
    ├── zero-trust/                 # Security Policies
    ├── all-deployment-truth.md
    ├── all-git-truth.md
    ├── all-local-dev-truth.md
    ├── all-system-truth.md
    ├── architecture-general.md     # (Moved from root)
    ├── cto-codebase-review.md
    ├── deployment-verified-state-*.md
    ├── multi-ide-workflow.md
    ├── operational-runbook.md
    ├── secrets-management.md
    ├── shopify-app-setup-guide.md
    └── shopify-oauth-setup.md
```

## Execution Steps

1. Create `docs/truth` directory.
2. Move top-level truth files from `docs/` to `docs/truth/`.
3. Move `ARCHITECTURE-GENERAL.md` from root to `docs/truth/`.
4. Move `docs/app-bundle-debug.md` to `docs/plans/`.
5. Move directories `adr`, `standards`, `zero-trust`, `archive` into `docs/truth/`.
6. Update internal links in `README.md` and other docs to point to new locations.
