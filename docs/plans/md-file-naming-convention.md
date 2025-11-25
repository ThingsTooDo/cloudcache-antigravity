# MD File Naming Convention

**Last Updated**: 2025-11-25
**Topic**: Naming Conventions for Markdown Files

## Overview

This document outlines the strict naming conventions for all Markdown (`.md`) files within the codebase. These rules are designed to ensure consistency, readability, and ease of navigation.

## Rules

### 1. File Naming

- **Lowercase Only**: All filenames must be entirely in lowercase.
- **Hyphens for Separation**: Use hyphens (`-`) to separate words. Do not use underscores (`_`) or spaces.
- **No Dates in Filenames**: Do not include dates (e.g., `2025-11-24`) in the filename itself. Dates belong in the file header.
- **Descriptive Names**: Choose clear, descriptive names that indicate the file's purpose.

**Examples:**

- ✅ `md-file-naming-convention.md`
- ✅ `project-standards.md`
- ❌ `MD_File_Naming_Convention.md`
- ❌ `2025-11-25-naming-convention.md`
- ❌ `naming convention.md`

### 2. File Headers

Every Markdown file must include a header section at the very top containing metadata.

- **Title**: The first line should be a level 1 header (`# Title`).
- **Metadata**: Immediately following the title, include metadata such as `Last Updated`, `Created`, or `Topic`.

**Template:**

```markdown
# [Descriptive Title]

**Last Updated**: YYYY-MM-DD
**Topic**: [Brief Topic Description]

[Content starts here...]
```

## Enforcement

- New files created must adhere to these rules.
- Existing files should be refactored to match these conventions when they are touched or during scheduled cleanup.
