# Session Summary Prompt

**Usage**: Copy and paste the following block into your IDE chat (Cursor or Antigravity) to generate a standardized session summary.

---

```markdown
Please summarize the current session for the project handoff log.

**Instructions**:

1. Review our conversation history and the changes we made.
2. Generate a summary block in the exact format below.
3. Be concise but specific about what files changed and what logic was implemented.

**Output Format**:

## [YYYY-MM-DD HH:MM] [IDE Name]: "[Short Session Title]"

**Summary**: [Bulleted list of accomplishments, file changes, and key decisions]
**Next Steps**: [Specific instructions for the next agent/developer]
**Status**: [🟢 Complete | 🟡 In Progress | 🔴 Blocked]
```
