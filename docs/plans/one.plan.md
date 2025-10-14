# Cloudcache Active Plan Marker (one.plan)

This file tracks the currently active engineering plan and where to resume after any side-plan (for example, pages.dev removal).

## Current active plan
- Title: Zero Trust Access: IP Allowlist Lockdown (All Modules/Envs)
- Status: In progress
- Last completed milestones:
  - Prod lockdown: cloudcache.ai, app.cloudcache.ai, admin.cloudcache.ai
  - Staging lockdown: staging-apex.cloudcache.ai, staging-app.cloudcache.ai, staging-admin.cloudcache.ai
- Remaining (high level):
  - Decide/implement preview gating (Pages projects or staging-only)
  - Add POLICY.md and rollback helper
  - Full verification pass (200 from allowed IP, 403 from non-allowed) with CF-RAY capture

## Side-plan pauses / resumptions
- Paused for: pages.dev complete deletion and refactor (separate plan file)
- Resume here after finishing the pages.dev plan:
  1) Confirm no pages.dev artifacts remain (repo and Cloudflare)
  2) Decide preview approach (staging-only vs. Pages Access Controls)
  3) Finish docs (POLICY.md) and rollback helper
  4) Run verification matrix and close out

## Pointers
- Side plan file: docs/zero-trust/pages dev complete deletion and refactor plan.md
- Backups: docs/zero-trust/backups/

