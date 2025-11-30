---
description: Automatically summarize context, handoff session, and switch to Cursor IDE.
---

1. **Summarize Session**:
   - Generate a concise summary of the current session's accomplishments, next steps, and status.
   - Append this summary to `docs/plans/session-handoff.md` following the "Session Handoff Protocol" format.

2. **Switch & Shutdown**:
   - Run the following command to switch the lock to Cursor and shut down Antigravity:

   ```bash
   pnpm switch:cursor --shutdown --app "Antigravity"
   ```
