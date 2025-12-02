# Prompt Archive Template

**Last Updated**: 2025-12-01  
**Rule Reference**: `docs/truth/all-code-truth.mdc`  
**Usage**: Copy this template when creating a new prompt archive file.

---

## Template

Copy everything below the line when creating a new prompt archive:

---

# Prompt Archive: [Topic Name]

| Field | Value |
|-------|-------|
| **Agent** | Cursor / Antigravity |
| **Related Plan** | [`plan-name.md`](../../plans/plan-name.md) or N/A |
| **Started** | YYYY-MM-DD |
| **Last Updated** | YYYY-MM-DD HH:MM |
| **Total Prompts** | 0 |

**Rule Reference**: [`all-code-truth.mdc`](../../truth/all-code-truth.mdc)

---

## Session: YYYY-MM-DD

<details open>
<summary><strong>HH:MM</strong> — Prompt #1</summary>

```text
The exact prompt text goes here, preserved verbatim.
Multi-line prompts are fully captured.
```

**Context**: Brief note about what we were working on  
**Outcome**: Resolved / In Progress / Blocked / Paused

</details>

---

<details>
<summary><strong>HH:MM</strong> — Prompt #2</summary>

```text
Follow-up prompt text...
```

**Context**: ...  
**Outcome**: ...

</details>

---

## Format Notes

### Metadata Table
- Update **Last Updated** and **Total Prompts** after each new prompt
- Link to related plan if one exists

### Details Sections
- Use `<details open>` for the most recent prompt (expanded by default)
- Use `<details>` for older prompts (collapsed by default)
- Include timestamp in 24-hour format

### Prompt Text
- Always wrap in ```` ```text ```` code blocks
- Preserve exact wording including typos (they may be relevant)
- Include any code snippets the user provided

### Status Indicators
- **Resolved**: Prompt was addressed successfully
- **In Progress**: Still working on this
- **Blocked**: Cannot proceed, needs external input
- **Paused**: Intentionally deferred

### Session Grouping
- Group prompts by date under `## Session: YYYY-MM-DD` headers
- Add horizontal rules (`---`) between prompts for visual separation



