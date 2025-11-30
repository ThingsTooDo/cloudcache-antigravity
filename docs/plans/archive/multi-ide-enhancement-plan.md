# Addendum: Multi-IDE Workflow Enhancements

**Status**: ARCHIVED / COMPLETED
**Archived On**: 2025-11-30
**Parent Plan**: `docs/plans/archive/multi-ide-workflow-plan.md`

## Goal

Enhance the Multi-IDE workflow with **automated termination** and **rich context handoff** to further reduce friction and cognitive load when switching between Antigravity and Cursor.

---

## Feature 1: Smart Switch Command (`/switch`)

**User Request**: A command like `/ide switch` that ensures termination and shuts down the IDE.

### Feasibility Analysis

- **Antigravity**: ✅ Feasible via `.agent/workflows`. We can define a workflow that summarizes context, runs the switch script, and triggers shutdown.
- **Cursor**: ⚠️ Partial. Cursor can run terminal commands, but chaining "Agent Summary" + "Terminal Command" + "Self Shutdown" is less integrated. We will implement a `pnpm switch:antigravity` enhancement for Cursor.
- **Shutdown Mechanism**: macOS apps can be closed via `osascript -e 'quit app "Name"'`.

### Implementation Plan

#### 1. Update `scripts/switch-ide.sh`

Add a `--shutdown` flag that uses AppleScript to gracefully quit the _current_ IDE after a successful lock switch.

```bash
# Pseudo-code
if [ "$SHUTDOWN" == "true" ]; then
  osascript -e "quit app \"$CURRENT_IDE_NAME\""
fi
```

#### 2. Create Antigravity Workflow (`.agent/workflows/switch.md`)

A slash command `/switch` that:

1. **Summarizes** the current chat session (see Feature 2).
2. **Executes** `pnpm switch:cursor --shutdown`.

---

## Feature 2: Session Handoff Log (Chat Summaries)

**User Request**: A summary file for each chat/session so the next IDE knows where work left off.

### Feasibility Analysis

- **Challenge**: We cannot programmatically read the _internal_ chat history of closed sessions from Cursor or Antigravity easily without an API.
- **Solution**: **"Active Handoff"**. The summary must be generated _before_ closing the session by the active agent.

### Implementation Plan

#### 1. The Handoff File: `docs/plans/session-handoff.md`

A structured log file acting as a "relay baton".

**Format**:

```markdown
# Session Handoff Log

## [2025-11-30 14:00] Antigravity: "Refactoring Auth"

**Summary**: Implemented login flow. Fixed bug in session.ts.
**Next Steps**: Verify in Cursor. Run tests.
**Status**: 🟡 In Progress
```

#### 2. Integration with `/switch`

The `/switch` workflow will include a step:

> "Summarize the current session (goal, progress, next steps) and append it to `docs/plans/session-handoff.md`."

---

## Proposed Tasks

### Phase 1: Scripting

- [x] Modify `scripts/switch-ide.sh` to accept `--shutdown` and `--app <name>` arguments.

* [x] Test `osascript` shutdown command for both "Antigravity" and "Cursor".

### Phase 2: Handoff Protocol

- [x] Create `docs/plans/session-handoff.md` template.

* [x] Define the "Handoff Structure" in `docs/truth/project-standards.md`.

### Phase 3: Antigravity Workflow

- [x] Create `.agent/workflows/switch.md`.

* [x] Test the full flow: `/switch` -> Summary -> Script -> Shutdown.

### Phase 4: Cursor Workflow

- [x] Document the manual "Summarize & Switch" pattern for Cursor users (since we can't fully automate the agent part via a single button yet).
