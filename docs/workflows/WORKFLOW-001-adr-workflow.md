# ADR Workflow

**Document ID:** workflow-adr-workflow
**Status:** Active
**Date:** 2026-01-15
**Last Updated:** 2026-01-15
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Workflow

---
Complete guide to writing and managing Architectural Decision Records (ADR) in Envy UI.

## Overview

ADRs document significant architectural decisions, their context, rationale, and consequences. They serve as a historical record of architectural thinking, not as current system documentation.

**Scope:** This document covers ADR-specific rules. For general documentation rules (sections, link mapping, mermaid, assets), see [`docs/DOCS-GUIDE.md`](../DOCS-GUIDE.md).

## Single Source of Truth

**⚠️ CRITICAL:** Document markdown files are the **SINGLE SOURCE OF TRUTH** for ADR content and metadata.

**Unified Documentation System:**
- ADR metadata is extracted from markdown files during generation
- Data files (`adr-list-data.ts`, `architecture-data.ts`) are AUTO-GENERATED
- Story files are AUTO-GENERATED
- Never manually edit generated files

**Workflow:**
1. Create/update ADR markdown file with canonical header format
2. Run `npm run docs:regenerate-all` to generate data and story files
3. (Optional) Run `npm run docs:validate` to verify consistency

**Why this matters:**
- Single source of truth is the markdown file itself
- Automatic Title Case conversion for proper typography
- Consistent metadata formatting across all documents
- Reliable navigation in Storybook

**For complete agent instructions, see:** [`docs/AI-AGENT-DOCUMENTATION-GUIDE.md`](../AI-AGENT-DOCUMENTATION-GUIDE.md)

**Docs registry note:** ADR entries are auto-registered from generated `adr-list-data.ts`. Do not add individual ADRs to `docs-registry.ts` (only ADR guide docs like [README](README.md)/TEMPLATE belong there). See [`docs/DOCS-GUIDE.md`](../DOCS-GUIDE.md) for non-ADR registry rules.

## ADR Principles

### What ADRs Are

- Historical record of architectural thinking
- Context for understanding why approaches were explored
- Reference material for reflection and analysis

### What ADRs Are NOT

- Current system documentation
- Authoritative description of present architecture
- Executable instructions for implementation

## Creating a New ADR

### Step 1: Use the Template

Always use the template: `docs/adr/ADR-TEMPLATE.md`

**File naming:**
```
docs/adr/ADR-XXXX-descriptive-title.md
```

**Example:**
```
docs/adr/ADR-0027-figma-migration-strategy.md
```

### Step 2: Fill in the Template

**Required sections:**
- Status (Accepted, Proposed, Exploratory, Superseded)
- Date (YYYY-MM-DD) - Original creation date
- Last Updated (YYYY-MM-DD) - Leave blank for new ADRs, update when ADR content changes
- Owner
- Related ADRs (with markdown links)
- Context
- Decision
- Rationale
- Consequences

**Ownership rule:** Owner must be a named individual responsible for the decision.

**Language:**
- Decision statements must reflect the named owner (use first-person singular: "I decided...", "I intentionally chose...")
- Use impersonal language for system behavior and established facts ("The system assumes...", "This decision establishes...")
- Avoid collective language ("we", "our", "we assume", "we believe") in all ADR content
- When examples use a specific component (for example Button, Switch, chart adapter), explicitly label it as a **representative/reference implementation** so the ADR is read as architecture-wide, not component-limited.

**Generalization vs example boundary (required):**
- Architecture decisions and consequences must be phrased in system-level terms.
- Component/library names are allowed only as representative validation examples and must be explicitly marked as such.
- Do not frame a general ADR as if its scope is only one component unless the ADR is intentionally component-scoped.

### Formatting Rules

**Critical: Header section formatting must be exact:**

1. **Field order (required):**
   - `**Status:**` - Must be on its own line with 2 trailing spaces
   - `**Date:**` - Must be on its own line with 2 trailing spaces
   - `**Owner:**` - Must be on its own line with 2 trailing spaces
   - `**Assistance:**` - Optional, but recommended. Must end with 2 trailing spaces
   - `**Related:**` - Must be on its own line with 2 trailing spaces, followed by blank line

2. **Correct format example:**
   ```markdown
   **Status:** Accepted  
   **Date:** 2025-12-15  
   **Owner:** Eugene Goncharov  
   **Assistance:** AI-assisted drafting (human-reviewed)  
   **Related:**  

   - [ADR-0001](../adr/ADR-0001-react-aria-headless.md) — React Aria as Headless Accessibility Foundation  
   - [ADR-0002](../adr/ADR-0002-data-driven-storybook-pipeline.md) — Data-Driven Storybook Pipeline
   ```

3. **Common formatting errors (avoid):**
   - ❌ `**Related:** [ADR-0001](../adr/ADR-0001-react-aria-headless.md) (description)` - Single line format
   - ❌ `**Related ADRs:**` - Wrong field name (should be `**Related:**`)
   - ❌ Using `*` instead of `-` for list markers
   - ❌ Missing trailing spaces (breaks markdown line breaks)
   - ❌ Missing blank line after `**Related:**`
   - ❌ Using parentheses `()` instead of em-dash `—` for descriptions

4. **Related field rules:**
   - **Field name:** Always use `**Related:**` (not "Related ADRs" or other variants)
   - **Format:** Multi-line list with `-` markers (not `*`)
   - **Link format:** `- [DOC-ID](path) — Title`
   - **Separator:** Use em-dash `—` (not hyphen `-` or parentheses `()`)
   - **Trailing spaces:** Each line should end with 2 spaces for markdown line breaks
   - **Blank line:** Must have blank line after `**Related:**` before list items
   - **Scope:** Keep `Related` as curated architecture context (typically 3-7 links), not full bibliography

5. **Why trailing spaces matter:**
   - Markdown requires 2 trailing spaces for line breaks
   - Without them, fields run together on the same line
   - Validation script checks for this automatically

6. **References -> Internal Documents format (required):**
   - Each entry must include link + document title:
     - `- [DOC-ID](path) — Document Title`
   - Do not use link-only entries (for example, `- [ADR-XXXX](./ADR-XXXX-title.md)`).
   - Use em-dash `—` between link and title.
   - This is the full internal citation list for the ADR body.
   - Every link listed in `Related` should also appear here.

### Step 3: Ensure Canonical Format

**Optional but recommended:** Run formatter to ensure canonical header format:

```bash
npm run docs:format-headers
```

This ensures:
- All metadata fields are in correct order
- No blank lines between fields
- Proper separator line (`---`)
- Consistent formatting

### Step 4: Generate Data and Story Files

**CRITICAL:** Run generation script to create/update all necessary files:

```bash
npm run docs:regenerate-all
```

This script:
- Extracts metadata from markdown header
- Applies Title Case conversion to title
- Generates `adr-list-data.ts` with metadata
- Generates story file in `stories/docs/adr/`
- Ensures proper navigation in Storybook

**What gets generated:**
- `stories/viewers/docs/adr-list-data.ts` - ADR metadata
- `stories/docs/adr/ADR-XXXX-title.stories.tsx` - Story file

**Title Case conversion:** Titles are automatically converted to proper Title Case with acronym preservation (UI, API, CSS, etc.). See [CANONICAL-DOC-FORMAT](../CANONICAL-DOC-FORMAT.md) for details.

### Step 5: Verify in Storybook

**If Storybook is already running:**
- ✅ **No manual restart needed** - Changes are detected automatically
- Wait ~2 seconds for automatic reload
- Navigate to Docs/ADR section

**If Storybook is NOT running:**
```bash
npm run storybook
```

**Verify:**
- ADR appears in "Docs/ADR" section
- Title displays correctly with proper Title Case
- Metadata renders as structured definition list
- All links work

## ADR Status Values

Common status values:
- **Accepted** - Decision has been accepted and implemented
- **Exploratory** - Decision is being explored, not yet finalized
- **Proposed (Exploratory)** - Decision is proposed and in exploratory phase
- **Superseded** - Decision has been superseded by a later ADR

## Images in ADRs

Place images next to the ADR markdown file and reference them with relative paths.
For general asset rules, see [`docs/DOCS-GUIDE.md`](../DOCS-GUIDE.md).md#images-and-assets).

## Mermaid Diagrams

Mermaid rules are shared across all documentation. See [`docs/DOCS-GUIDE.md`](../DOCS-GUIDE.md).md#mermaid-diagrams-all-docs) for syntax, sizing, and max-width guidance.

If a diagram is too narrow or tall, use:
```
%% sb: maxWidth=20rem %%
```

## Storybook Navigation

ADRs are organized in Storybook:

```
Docs/ADR/
├── ADR Overview (list of all ADRs - appears first)
├── ADR-0001 React Aria as Headless Accessibility Foundation
├── ADR-0002 Data-Driven Storybook Pipeline
└── ... (all other ADRs at the same level)
```

All ADR stories use `title: 'Docs/ADR'` to group them together.

## Related Files

- **Template:** `docs/adr/ADR-TEMPLATE.md`
- **ADR List:** `stories/docs/adr/00-adr-overview.stories.tsx`
- **ADR Viewer:** `stories/viewers/docs/AdrViewer.tsx`
- **Story Generator:** `scripts/generate-adr-stories.mjs`

## Common Pitfalls and Validation Checklist

### After Creating a New ADR

**Required Steps (in order):**

1. **Add to adr-list-data.ts FIRST (SINGLE SOURCE OF TRUTH):**
   - ✅ Add entry to `stories/viewers/docs/adr-list-data.ts`
   - Format: `{ number: 'XXXX', title: 'Title', status: 'Status', date: 'YYYY-MM-DD', exportName: 'ExportName' }`
   - **exportName:** Convert title to PascalCase (remove spaces, special chars)
   - Example: "Token Organization - Context" → `TokenOrganizationContext`

2. **Create ADR file:**
   - ✅ File name: `ADR-XXXX-descriptive-title.md`
   - ✅ File location: `docs/adr/`
   - ✅ Uses template from `ADR-TEMPLATE.md`
   - ✅ Header format: `# ADR-XXXX: Title` (exact match)

3. **Update filename mapping:**
   - ✅ Add entry to `stories/viewers/docs/adr-filename-map.ts`
   - Format: `"XXXX": "ADR-XXXX-descriptive-title.md"`
   - **Auto-generate:** Run the command in the file's comment, or manually add
   - **CRITICAL:** This is required for the ADR viewer to load the correct file

4. **Generate Storybook stories:**
   - ✅ Run: `npm run adr:generate`
   - ✅ Script reads `adr-list-data.ts` for exportName
   - ✅ Verify story file created: `stories/docs/adr/adr-XXXX.stories.tsx`

5. **Validate:**
   - ✅ Run: `npm run adr:validate`
   - ✅ Checks exportName matches story file
   - ✅ Fix any errors or warnings

6. **Verify auto-reload (if Storybook is running):**
   - ✅ If running `npm run storybook`: **No manual restart needed**
   - ✅ Wait ~2 seconds for nodemon to detect new story file
   - ✅ Storybook reloads automatically
   - ✅ If not running: Start with `npm run storybook`

7. **Verify in Storybook:**
   - ✅ ADR appears in "Docs/ADR" section
   - ✅ ADR loads without errors
   - ✅ Overview page link works
   - ✅ Mermaid diagrams render correctly
   - ✅ Links to other ADRs work

8. **Validate generalization clarity:**
   - ✅ `Decision` and `Consequences` remain architecture-wide
   - ✅ Component mentions are labeled as representative examples
   - ✅ No accidental component-only framing in a general ADR

### File Naming Consistency

**Critical: File name must match exactly:**

- ADR file: `ADR-0027-figma-files-structure-and-organization.md`
- Story file: `adr-0027.stories.tsx` (lowercase, no title)
- Filename map: `"0027": "ADR-0027-figma-files-structure-and-organization.md"`
- ADR list: `number: '0027'` (4 digits with leading zeros)

**Mismatch causes:**
- ❌ ADR not loading in Storybook
- ❌ 404 errors when viewing ADR
- ❌ Broken links between ADRs

### Link Validation

**When adding links to other ADRs:**

1. **Format:**
   ```markdown
   - [ADR-XXXX](./ADR-XXXX-descriptive-title.md) — Title
   ```

2. **Check:**
   - ✅ File exists: `docs/adr/ADR-XXXX-descriptive-title.md`
   - ✅ Link uses relative path: `./ADR-XXXX-...`
   - ✅ Title matches actual ADR title

3. **In Related section:**
   - List all referenced ADRs
   - Use consistent format with em-dash separator

**When adding links to References -> Internal Documents:**
1. **Format:**
   ```markdown
   - [ADR-XXXX](./ADR-XXXX-descriptive-title.md) — Document Title
   ```
2. **Check:**
   - ✅ Link exists and resolves
   - ✅ Title text is present after link
   - ✅ No link-only entries

**When curating header `Related`:**
1. **Use only architecture-critical context links** (depends on, extends, constrains, supersedes).
2. **Do not duplicate full bibliography** in header.
3. **Ensure subset rule:** every `Related` link must also be present in `References -> Internal Documents`.

**When adding links to Architecture documents:**

1. **CRITICAL: Check if document exists FIRST:**
   ```bash
   ls docs/architecture/document-name.md
   ```

2. **If document doesn't exist, CREATE IT:**
   - ❌ **DON'T create broken links**
   - ✅ Create the Architecture document first
   - ✅ Follow workflow in `docs/architecture/README.md`
   - ✅ Update `docs/architecture/README.md` index
   - ✅ Create Storybook story if needed

3. **Format:**
   ```markdown
   - [Token Usage Rules](../architecture/ARCH-tokens-004-token-usage-rules.md) — Current rules
   - [Accessibility Reference](../architecture/ARCH-accessibility-001-accessibility-reference.md) — Reference documentation
   ```

4. **Path rules:**
   - From ADR: `../architecture/filename.md`
   - Always use relative paths
   - Verify file exists before committing

5. **After creating Architecture document:**
   - ✅ Add to `docs/architecture/README.md` index
   - ✅ Create Storybook story (if needed for viewing)
   - ✅ Update `docs-registry.ts` (if needed, include `storybookId` for link mapping)
   - ✅ Verify link works

### Quick Validation Script

After creating a new ADR, run this checklist:

```bash
# 1. Check file exists
ls docs/adr/ADR-XXXX-*.md

# 2. Check filename mapping
grep "XXXX" stories/viewers/docs/adr-filename-map.ts

# 3. Check ADR list
grep "XXXX" stories/viewers/docs/adr-list-data.ts

# 4. Check story file
ls stories/docs/adr/adr-XXXX.stories.tsx

# 5. Generate/regenerate stories
npm run adr:generate

# 6. Validate everything
npm run adr:validate

# 7. Test Mermaid syntax (manual check in Storybook)
```

### Troubleshooting

**ADR not loading:**
1. Check `adr-filename-map.ts` has correct entry
2. Verify file name matches exactly (case-sensitive)
3. **Restart Storybook** (if new story file was created)
4. Check Storybook console for errors
5. Verify `docs/` is in `staticDirs` in `.storybook/main.ts`
6. Run `npm run adr:validate` to check for issues

**"Couldn't find story matching..." error:**
1. **Restart Storybook** - Storybook needs to reload to pick up new story files
2. Verify story file exists: `stories/docs/adr/adr-XXXX.stories.tsx`
3. Check export name matches `exportName` in `adr-list-data.ts`
4. Verify story file has correct structure (see Step 5 manual creation)
5. Check Storybook console for compilation errors

**Mermaid not rendering:**
1. Check syntax: use `stroke-width` (with hyphen)
2. Verify quotes around node labels
3. Test in [Mermaid Live Editor](https://mermaid.live)
4. Check browser console for Mermaid errors

**Links broken:**
1. Verify target ADR file exists
2. Check relative path format: `./ADR-XXXX-...`
3. Verify file name matches exactly

**Architecture document link broken:**
1. Check if document exists: `ls docs/architecture/document-name.md`
2. If missing, create it following `docs/architecture/README.md` workflow
3. Update `docs/architecture/README.md` index
4. Verify path format: `../architecture/filename.md`
5. Create Storybook story if needed

## Notes for AI Agents

**IMPORTANT:** For complete step-by-step instructions, see [`docs/AI-AGENT-DOCUMENTATION-GUIDE.md`](../AI-AGENT-DOCUMENTATION-GUIDE.md)

### Quick Workflow Summary

When creating a new ADR:

1. **Follow general docs rules:** [`docs/DOCS-GUIDE.md`](../DOCS-GUIDE.md)
2. **Use template:** Copy `ADR-TEMPLATE.md` and fill in all mandatory fields
3. **Follow canonical format:** See [CANONICAL-DOC-FORMAT](../CANONICAL-DOC-FORMAT.md)
4. **Apply canonical formatting (optional):** `npm run docs:format-headers`
5. **Generate data and stories:** `npm run docs:regenerate-all`
6. **Verify in Storybook:** Check title has proper Title Case, metadata renders correctly
7. **Validate (optional):** `npm run docs:validate`

### Key Points

- **Single source of truth:** Markdown file itself (not data files)
- **Never manually edit:** Generated files (`adr-list-data.ts`, story files)
- **Title Case:** Automatically applied during generation (UI, API, CSS, etc.)
- **Metadata:** Rendered as structured definition list with callout component
- **Links:** Always verify target files exist before creating links
- **Related semantics:** Header `Related` is curated architectural context, not a complete source list
- **References quality:** In `References -> Internal Documents`, every entry must include `- [Link](path) — Document Title` (no link-only lines)

### Title Case Reminder

Common acronyms that should be uppercase:
- UI, API, CSS, HTML, ARIA, DOM, JSX, TSX, AI, ML, UX, DX, DTCG, WCAG

Common small words that should be lowercase:
- and, or, the, of, in, on, at, to, for, with, vs, as, by

**See:** [CANONICAL-DOC-FORMAT](../CANONICAL-DOC-FORMAT.md) for complete list.

### Common Mistakes to Avoid

❌ **DON'T:**
- Manually edit `adr-list-data.ts` or story files
- Skip regeneration after creating/updating documents
- Forget to update Last Updated date
- Create links to non-existent files
- Use incorrect header formatting

✅ **DO:**
- Always run `npm run docs:regenerate-all` after changes
- Follow canonical format for headers
- Verify Title Case in Storybook menu
- Check metadata renders as structured definition list
- Validate links work correctly
