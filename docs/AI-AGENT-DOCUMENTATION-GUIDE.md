# AI Agent Documentation Guide

**Document ID:** guide-ai-agent-documentation
**Status:** Active
**Date:** 2026-01-15
**Last Updated:** 2026-04-06
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Guide

---
**Purpose:** Complete reference guide for AI agents working with documentation in Envy UI.

## Overview

This guide provides step-by-step instructions for AI agents to create, update, and maintain documentation in the Envy UI project. It consolidates all documentation workflows, formatting rules, and automation commands.

## Documentation System Architecture

### Two-Part Header System

All documentation uses a two-part header system:

1. **Preview Header** (Storybook) - Minimal metadata displayed above document
   - Status badge
   - Last Updated date

2. **Document Header** (inside markdown) - Full metadata rendered as structured definition list
   - All mandatory fields
   - Parsed and displayed using DocumentMetadata component
   - Uses callout component with neutral tone

### Title Case System

All document titles follow proper English Title Case with technical acronym preservation.

**Implementation:**
- Utility: `scripts/utils/title-case.mjs`
- Applied during: Data generation (`scripts/generate-unified-doc-data.mjs`)
- Affects: Story names, menu navigation, data files

**See:** [CANONICAL-DOC-FORMAT](CANONICAL-DOC-FORMAT.md) for complete rules and examples.

## Document Types

### ADR (Architectural Decision Records)

**Location:** `docs/adr/`
**Naming:** `ADR-XXXX-descriptive-title.md`
**Template:** `docs/adr/ADR-TEMPLATE.md`

**Canonical format:**
```markdown
# ADR-XXXX: Title

**Status:** <Proposed | Accepted | Exploratory | Superseded | Rejected>
**Date:** <YYYY-MM-DD>
**Last Updated:** <YYYY-MM-DD>
**Owner:** <name>
**Assistance:** <AI-assisted drafting (human-reviewed) | None>
**Related:**
- [ADR-XXXX](./ADR-XXXX-title.md) — Description
- [ARCH-XXX](../architecture/ARCH-xxx.md) — Description

---

## Context
...
```

**Mandatory fields:** Status, Date, Last Updated, Owner, Assistance, Related

**Authorial voice rules:**
- Decision statements use first-person singular to match the named owner ("I decided...", "I intentionally chose...")
- System behavior uses neutral language ("The system defines...", "This decision establishes...")
- Avoid collective language ("we", "our", "we assume") in ADRs

### Architecture Documents

**Location:** `docs/architecture/`
**Naming:** `ARCH-category-XXX-descriptive-title.md`

**Canonical format:**
```markdown
# Title

**Document ID:** ARCH-category-XXX-title
**Status:** <Active | Draft | In-Progress | Mandatory | Guide | Advisory>
**Date:** <YYYY-MM-DD>
**Last Updated:** <YYYY-MM-DD>
**Owner:** <name>
**Assistance:** <AI-assisted drafting (human-reviewed) | None>
**Category:** <Architecture Rules (Binding) | Reference | Guide>
**Related:**
- [ADR-XXXX](../adr/ADR-XXXX-title.md) — Description
- [ARCH-XXX](./ARCH-xxx.md) — Description

---

## Content starts here...
```

**Mandatory fields:** Document ID, Status, Date, Last Updated, Owner, Assistance, Category, Related

## Complete Workflow for Creating/Updating Documents

### Step 1: Create or Update Markdown File

1. **Use the appropriate template:**
   - ADR: `docs/adr/ADR-TEMPLATE.md`
   - Architecture: Follow canonical format above

2. **Apply canonical header format:**
   - All fields on separate lines
   - No blank lines between fields
   - Separator line (`---`) after metadata
   - One blank line after separator before content

3. **Save the file** with proper naming:
   - ADR: `docs/adr/ADR-XXXX-descriptive-title.md`
   - Architecture: `docs/architecture/ARCH-category-XXX-descriptive-title.md`

### Step 2: Format Headers (Optional)

If updating existing documents or want to ensure canonical format:

```bash
npm run docs:format-headers
```

This script:
- Extracts existing metadata
- Applies canonical formatting
- Preserves document content
- Skips template files

### Step 3: Regenerate Data and Stories

**CRITICAL:** Always regenerate after creating/updating documents.

```bash
# Option 1: Regenerate data only (faster)
npm run docs:regenerate-data

# Option 2: Regenerate data AND story files (complete)
npm run docs:regenerate-all
```

**What happens:**
- Extracts titles from filenames
- Applies Title Case conversion
- Generates metadata in `adr-list-data.ts` and `architecture-data.ts`
- (With --stories) Creates/updates story files

**Generated files:**
- `stories/viewers/docs/adr-list-data.ts`
- `stories/viewers/docs/architecture-data.ts`
- `stories/docs/adr/*.stories.tsx` (with --stories)
- `stories/docs/architecture/*.stories.tsx` (with --stories)

### Step 4: Validate (Optional but Recommended)

```bash
npm run docs:validate
```

Checks:
- All links point to existing files
- No broken cross-references
- Files are properly registered

## Title Case Rules Reference

### Acronyms (Always Uppercase)

**Technical:**
UI, API, CSS, HTML, ARIA, DOM, HTTP, HTTPS, URL, URI, SVG, XML, JSON, REST, AJAX, CORS

**JavaScript/TypeScript:**
JS, JSX, TS, TSX, NPM, CLI, SDK

**React:**
SSR, CSR

**AI/ML:**
AI, ML

**Design:**
UX, DX

**Colors:**
RGB, RGBA, HSL, HSLA

**Other:**
ID, IDs, UUID, GUID, DTCG

### Small Words (Lowercase Unless First/Last)

**Articles:** a, an, the

**Conjunctions:** and, or, nor, but, yet, so, for

**Prepositions:** in, on, at, of, to, for, with, vs, from, into, onto, by, as, via, per, up, out, off

### Rules

1. Always capitalize first and last word
2. Preserve acronyms in uppercase
3. Keep small words lowercase (unless first/last)
4. Capitalize all other words

## Common Scenarios

### Scenario 1: Creating a New ADR

```bash
# 1. Create markdown file from template
cp docs/adr/ADR-TEMPLATE.md docs/adr/ADR-0042-new-decision.md

# 2. Edit the file with your content
# (Fill in all mandatory fields)

# 3. Regenerate data and stories
npm run docs:regenerate-all

# 4. Verify in Storybook
npm run storybook
```

### Scenario 2: Updating Existing Document

```bash
# 1. Edit the markdown file
# (Update content, Last Updated date)

# 2. Regenerate data only (no need to regenerate stories)
npm run docs:regenerate-data

# 3. Verify changes
npm run storybook
```

### Scenario 3: Fixing Title Formatting

```bash
# If titles are not displaying correctly in Storybook menu:

# 1. Check if new acronym needs to be added
# Edit: scripts/utils/title-case.mjs
# Add to ACRONYMS Set

# 2. Regenerate all data and stories
npm run docs:regenerate-all

# 3. Verify in Storybook
```

### Scenario 4: Adding New Acronym to Title Case

```javascript
// File: scripts/utils/title-case.mjs

const ACRONYMS = new Set([
  // ... existing acronyms
  'newacr', // Add new acronym in lowercase
]);
```

Then regenerate:
```bash
npm run docs:regenerate-all
```

### Scenario 5: Batch Formatting All Documents

```bash
# 1. Format all headers to canonical format
npm run docs:format-headers

# 2. Regenerate all data and stories
npm run docs:regenerate-all

# 3. Validate
npm run docs:validate
```

## Important Files Reference

### Scripts

| File | Purpose |
|------|---------|
| `scripts/format-doc-headers.mjs` | Format document headers to canonical format |
| `scripts/generate-unified-doc-data.mjs` | Generate metadata and story files |
| `scripts/utils/title-case.mjs` | Title Case conversion utility |

### Data Files (Generated)

| File | Purpose |
|------|---------|
| `stories/viewers/docs/adr-list-data.ts` | ADR metadata (auto-generated) |
| `stories/viewers/docs/architecture-data.ts` | Architecture metadata (auto-generated) |

### Components

| File | Purpose |
|------|---------|
| `stories/viewers/docs/DocViewer.tsx` | Document viewer component |
| `stories/viewers/docs/DocumentMetadata.tsx` | Metadata display component |
| `stories/viewers/docs/parse-metadata.ts` | Metadata parsing utility |

### Styles

| File | Purpose |
|------|---------|
| `src/ui/docs.css` | Documentation styles (metadata grid, callout override) |

## npm Scripts Reference

```json
{
  "docs:format-headers": "Format document headers to canonical format",
  "docs:regenerate-data": "Regenerate metadata files only",
  "docs:regenerate-all": "Regenerate metadata AND story files",
  "docs:validate": "Validate links and registry"
}
```

## Validation and Quality Checks

### Before Committing

Run this checklist:

```bash
# 1. Format headers
npm run docs:format-headers

# 2. Regenerate data
npm run docs:regenerate-all

# 3. Validate
npm run docs:validate

# 4. Check in Storybook
npm run storybook
```

### What to Verify

- [ ] Document has all mandatory fields
- [ ] Header follows canonical format
- [ ] Title displays correctly in Storybook menu (proper Title Case)
- [ ] Metadata renders as structured definition list
- [ ] All links work
- [ ] No validation errors

### Link Validation Process

**CRITICAL:** Always run link validation after creating, moving, or renaming documents.

#### When to Validate Links

Run `npm run docs:validate` after:
- Creating new documents
- Renaming or moving existing documents
- Adding links to other documents
- Updating document IDs or paths
- Regenerating documentation data

#### Understanding Validation Output

**No broken links (✅):**
```
✅ All links validated successfully
Found: 0 error(s), 0 warning(s)
```

**Broken link error (❌):**
```
❌ workflows/adr-workflow.md:123: Broken external link to '../../generated/figma/README.md'
```
- **Fix:** Remove the link or create the missing target file

**Unregistered file warning (⚠️):**
```
ℹ️ architecture/ARCH-tokens-005-new-doc.md: File exists but is not registered in docs-registry.ts
```
- **Fix:** Add the file to the appropriate data file (architecture-data.ts, workflow-data.ts, etc.)

**Missing storybookId warning (⚠️):**
```
⚠️ docs-registry.ts: Document 'architecture/ARCH-tokens-005-new-doc.md' (arch-TOKENS-005) doesn't have storybookId
```
- **Fix:** Run `npm run docs:regenerate-data` to generate storybookId automatically
- For manually registered docs: Add `storybookId` field to the registry entry

#### Link Validation Best Practices

**Always verify target files exist:**
```bash
# Before adding a link to another document:
ls docs/architecture/ARCH-tokens-005-token-naming.md

# If file doesn't exist, create it first:
# 1. Create the markdown file
# 2. Run npm run docs:regenerate-all
# 3. Then add the link
```

**Correct link format:**
```markdown
# From ADR to Architecture (relative path)
[Token Usage Rules](../architecture/ARCH-tokens-004-token-usage-rules.md)

# From Architecture to ADR (relative path)
[Token Organization](../adr/ADR-0012-token-organization-context.md)

# Within same directory
[Related Document](./ARCH-tokens-003-token-architecture.md)
```

**Automatic prefix formatting:**
- **ADR links:** Write as `[ADR-XXXX](path)` - prefix in link text (manual)
- **Architecture links:** Write as `[Title](path)` - prefix added automatically by system
  - Markdown: `[Token Usage Rules](architecture/ARCH-tokens-004-token-usage-rules.md)`
  - Displays as: `ARCH-TOKENS-004 — Token Usage Rules`
- No need to manually add ARCH prefix in link text - the DocumentMetadata component adds it automatically

**Path resolution:**
- `./file.md` - Same directory
- `../category/file.md` - Parent directory, then category
- `../../other-category/file.md` - Two levels up, then other-category

**Storybook link behavior rule (mandatory):**
- Write markdown links to source files using normal relative paths.
- Internal documentation links (`.md`) that map to registered docs open in the current tab.
- Code-file links (for example `.ts`, `.tsx`, `.js`, `.mjs`, `.css`, `.json`) open via Source File Viewer in a new tab.
- External links and unregistered files open in a new tab with external-link indicator styling.
- Do not hardcode Storybook URLs (`?path=/story/...` or `iframe.html?id=...`) in markdown documents.

#### Common Link Errors and Fixes

**Error: "Broken external link"**
- **Cause:** Target file doesn't exist
- **Fix:** Create the target file or remove the link

**Error: "Circular reference detected"**
- **Cause:** Document A links to B, B links to C, C links back to A
- **Fix:** Review link structure, break circular references

**Warning: "File not registered"**
- **Cause:** New file created but not added to data files
- **Fix:** Run `npm run docs:regenerate-all` to auto-register

**Warning: "Missing storybookId"**
- **Cause:** Document doesn't have Storybook story ID for link resolution
- **Fix:** For ADR/Architecture: Regenerate data with `npm run docs:regenerate-all`
- **Fix:** For other docs: Add `storybookId` field manually or create Storybook story

#### Validation Workflow Example

```bash
# Scenario: You created a new Architecture document

# 1. Create markdown file
# docs/architecture/ARCH-tokens-005-token-naming.md

# 2. Regenerate data and stories (includes validation)
npm run docs:regenerate-all

# 3. Validate links
npm run docs:validate

# Output should show:
# ✅ Found 0 error(s), 0 warning(s)

# 4. If you get warnings about missing storybookId:
# Already handled by step 2! If warnings persist, check:
# - Did you run docs:regenerate-all (not just docs:regenerate-data)?
# - Is the file following naming conventions?
# - Is the file in the correct directory?

# 5. Verify in Storybook
npm run storybook
# Navigate to Docs/Architecture
# Check that new document appears with proper Title Case
```

## Troubleshooting

### Title Not Displaying Correctly

**Problem:** "Canonical Ui Namespace" instead of "Canonical UI Namespace"

**Solution:**
1. Check if acronym is in `scripts/utils/title-case.mjs`
2. Add if missing
3. Run `npm run docs:regenerate-all`

### Metadata Block Showing as Plain Text

**Problem:** Metadata renders as continuous text, not structured grid

**Solution:**
1. Check header format follows canonical format (no blank lines between fields)
2. Ensure separator line (`---`) is present
3. Run `npm run docs:format-headers`
4. Run `npm run docs:regenerate-data`

### Story Not Appearing in Storybook

**Problem:** Document doesn't show in Storybook navigation

**Solution:**
1. Run `npm run docs:regenerate-all` (with --stories flag)
2. Check story file was created in `stories/docs/adr/` or `stories/docs/architecture/`
3. Restart Storybook if necessary

### Broken Links

**Problem:** Links between documents don't work

**Solution:**
1. Verify target file exists
2. Check relative path is correct
3. Run `npm run docs:validate`
4. Fix any reported errors

## Best Practices for AI Agents

### DO

✅ **Always** use canonical document format
✅ **Always** regenerate data after creating/updating documents
✅ **Always** use `npm run docs:regenerate-all` for new documents
✅ **Always** check Title Case rules before adding new acronyms
✅ **Always** validate after making changes
✅ **Always** follow existing patterns in the codebase
✅ Use relative paths for links between documents

### DON'T

❌ **Never** manually edit generated files (`adr-list-data.ts`, `architecture-data.ts`)
❌ **Never** manually edit story files (regenerate instead)
❌ **Never** skip metadata fields
❌ **Never** use incorrect header formatting
❌ **Never** forget to update Last Updated date
❌ **Never** create documents without running regeneration
❌ **Never** commit without validating

## Quick Reference Card

### New ADR
```bash
cp docs/adr/ADR-TEMPLATE.md docs/adr/ADR-XXXX-title.md
# Edit file
npm run docs:regenerate-all
```

### Update Existing
```bash
# Edit file
npm run docs:regenerate-data
```

### Fix Formatting
```bash
npm run docs:format-headers
npm run docs:regenerate-all
```

### Add Acronym
```javascript
// scripts/utils/title-case.mjs
const ACRONYMS = new Set([..., 'newacr']);
```
```bash
npm run docs:regenerate-all
```

## Related Documentation

- [CANONICAL-DOC-FORMAT](CANONICAL-DOC-FORMAT.md) - Canonical format specification
- [DOCS-GUIDE](DOCS-GUIDE.md) - General documentation guide
- [workflows/adr-workflow.md](workflows/WORKFLOW-001-adr-workflow.md) - ADR-specific workflow

## Support

For questions or issues:
1. Check this guide first
2. Check related documentation
3. Review existing documents for patterns
4. Check script output for error messages
5. Use `npm run docs:validate` to identify issues
