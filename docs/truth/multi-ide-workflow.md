# Multi-IDE Workflow & Governance

**Last Updated**: 2025-11-25
**Standard Reference**: `docs/standards/all-code-truth.md`

## The "Clean Slate" Protocol

To prevent drift, we enforce a strict "One Driver" policy.

### 1. Switching to Antigravity

1. **Terminal**: Run `pnpm switch:antigravity`
2. **Action**: Close Cursor completely.
3. **Context Injection**: In Antigravity chat, type:
   > "Read docs/standards/all-code-truth.md and docs/plans/active-plan.md. I am starting a session."

### 2. Switching to Cursor

1. **Terminal**: Run `pnpm switch:cursor`
2. **Action**: Close Antigravity completely.
3. **Context**: Cursor automatically loads rules via `.cursorrules`.

## Shared State

- **Plans**: ALWAYS in `docs/plans/`. Never in IDE-specific storage.
- **Docs**: `docs/` is the only place for long-term knowledge.

## Conflict Prevention

1. **Always pull before opening IDE**: `git pull origin main`
2. **Always commit before switching IDEs**: Ensures clean state
3. **Never work in both simultaneously**: Prevents lock file conflicts
4. **Use pre-commit hooks**: Already configured via Husky

## Source-of-Truth Files (NEVER IGNORE)

- `docs/all-*-truth.md` files

- `docs/standards/all-code-truth.md`
- `.gitignore`, `.prettierrc`, `eslint.config.js`
- All `/scripts/` shell scripts
- All configuration files: `package.json`, `tsconfig.json`, `wrangler.toml`
