# Naming Consistency Plan – Backend

**DEPRECATED**: This plan has been completed and archived.
**See**: `docs/truth/all-code-truth.mdc`

**Migration Date**: 2025-11-30
**Archived On**: 2025-12-01

---

**Goal:** Ensure no residual `shopify` references remain after the rename to `app`.

## Actions

1. Run a repo‑wide case‑insensitive search for `shopify` in all `.md`, `.sh`, `.ts`, `.js`, `.toml`, `.mdc` files.
2. Replace each occurrence with `app` where appropriate, preserving context.
3. Update any documentation tables, URLs, and script comments.
4. Add a CI check (`grep -i shopify`) that fails the build if any stray references remain.
5. Verify the change by running the updated CI locally.

**Owner:** Lead Engineer
**Due:** 2025‑11‑30
