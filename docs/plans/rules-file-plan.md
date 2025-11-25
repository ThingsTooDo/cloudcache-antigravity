# Rules File Plan

**Last Updated**: 2025-11-24
**Rule Reference**: `.cursor/rules/all-code-truth.mdc`
**Related**: `docs/all-system-truth.md`

This document outlines the strategy for managing rules and "truth" files within the Cloudcache project to ensure consistency and AI context awareness.

## Objective

To establish a robust, self-enforcing system of documentation and rules that guides both human developers and AI assistants (like Cursor and Antigravity) to write correct, consistent code.

## Core Components

### 1. The "Truth" Architecture

We utilize a hierarchical "Truth" system to avoid conflicting information:

- **System Truth** (`docs/all-system-truth.md`): The root node. Defines the golden path and indexes all other truth files.
- **Domain Truths** (`docs/all-<domain>-truth.md`): Canonical sources for specific domains (Git, Deployment, Local Dev).
- **Rule Definitions** (`.cursor/rules/*.mdc`): Machine-readable rules that enforce the patterns defined in the Truth files.

### 2. Naming Conventions

Strict naming conventions are enforced to ensure discoverability and prevent "drift":

- **Files**: Lowercase, hyphen-separated (e.g., `my-new-feature.md`).
- **Truth Files**: Must start with `all-` and end with `-truth.md`.
- **Plans**: Must follow `YYYY-MM-DD-feature-name.md` and live in `docs/plans/`.

### 3. Enforcement Mechanisms

- **Pre-commit Hooks**: `scripts/all-git-truth.sh` runs automatically to format code and validate markdown structures.
- **CI/CD**: Validation scripts run in the pipeline to catch any non-compliant files.
- **AI Context**: `.cursorrules` and `.cursor/rules/all-code-truth.mdc` are designed to be ingested by AI tools to provide immediate context on these constraints.

## Implementation Steps (2025-11-24)

1. **Renaming**: Corrected `docs/zero-trust/TOKENS.md` to `docs/zero-trust/tokens.md` to comply with naming rules.
2. **Documentation**: Created this plan file to formalize the strategy.
3. **Verification**: Validated changes using the `all-git-truth.sh` script.

## Future Improvements

- **Automated Rule Generation**: Explore generating `.mdc` files directly from Truth markdown files to ensure perfect sync.
- **Expanded Coverage**: Add Truth files for Testing and Database Schema management.
