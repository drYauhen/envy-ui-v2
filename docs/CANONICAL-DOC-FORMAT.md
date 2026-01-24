# Canonical Documentation Format

**Last Updated:** 2026-01-15

This document defines the canonical format for all documentation in Envy UI, including ADR (Architectural Decision Records) and Architecture documents.

## Overview

Documentation in Envy UI uses a two-part header system:

1. **Preview Header** (in Storybook) — Minimal metadata displayed above the document
2. **Document Header** (in markdown file) — Full metadata within the document itself

This separation allows for a clean preview interface while maintaining complete metadata within the source documents.

The document header is automatically parsed and rendered as a structured metadata component (definition list) with labels on the left and values on the right, making it easy to scan key information about the document.

## Preview Header (Storybook)

The preview header displays **only**:
- **Status badge** — Visual indicator of document status
- **Last Updated date** — When the document was last modified

```tsx
<DocViewer
  markdownPath="/docs/adr/ADR-0001-react-aria-headless.md"
  status="Accepted"
  lastUpdated="2026-01-08"
/>
```

All other metadata (title, owner, assistance, related links, etc.) is contained within the document itself.

## Document Header Format

### ADR Documents

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

## Content starts here...
```

**Mandatory fields:**
- `Status` — Current status of the decision
- `Date` — Date when the decision was made
- `Last Updated` — Date of last modification
- `Owner` — Document owner/author
- `Assistance` — AI assistance level
- `Related` — Related documents (can be empty section)

### Architecture Documents

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

**Mandatory fields:**
- `Document ID` — Unique identifier matching filename
- `Status` — Current status of the document
- `Date` — Date when the document was created
- `Last Updated` — Date of last modification
- `Owner` — Document owner/author
- `Assistance` — AI assistance level
- `Category` — Document category/type
- `Related` — Related documents (can be empty section)

## Field Formats

### Status Values

**ADR:**
- `Proposed` — Decision proposed but not yet accepted
- `Accepted` — Decision approved and active
- `Exploratory` — Experimental/investigative document
- `Superseded` — Replaced by newer decision
- `Rejected` — Decision explicitly rejected

**Architecture:**
- `Active` — Currently active and enforced
- `Draft` — Work in progress
- `In-Progress` — Being implemented
- `Mandatory` — Must be followed
- `Guide` — Recommended patterns
- `Advisory` — Suggestions/best practices

### Dates

All dates must use ISO 8601 format: `YYYY-MM-DD`

Example: `2026-01-15`

### Owner

Full name of the document owner/primary author.

Example: `Eugene Goncharov`

### Assistance

Indicates level of AI assistance:
- `AI-assisted drafting (human-reviewed)` — AI helped write, human verified
- `None` — Written entirely by human

### Related Links

List of related documents with descriptions:

```markdown
**Related:**
- [ADR-0001](./ADR-0001-react-aria-headless.md) — React Aria as headless foundation
- [Token Usage Rules](../architecture/ARCH-tokens-004-token-usage-rules.md) — Enforceable token usage rules
```

**Link formatting:**
- **ADR links:** Include ADR-XXXX in link text (e.g., `[ADR-0001](adr/ADR-0001-react-aria-headless.md)`)
- **Architecture links:** Use title only in link text (e.g., `[Token Usage Rules](path)`)
  - System automatically adds ARCH-CATEGORY-NNN prefix when displayed
  - No need to write `[ARCH-TOKENS-004 — Token Usage Rules](path)` - just `[Token Usage Rules](path)`

**Display format:**
- Markdown: `[Token Usage Rules](architecture/ARCH-tokens-004-token-usage-rules.md)`
- Displays as: `ARCH-TOKENS-004 — Token Usage Rules — Enforceable token usage rules`

If no related documents, leave section empty:

```markdown
**Related:**

```

## Formatting Rules

1. **No blank lines** between metadata fields
2. **Separator line** (`---`) after metadata section
3. **One blank line** between separator and content
4. **All fields on separate lines** for easy parsing
5. **Consistent field order** as shown in canonical formats

## Title Case Rules

All document titles in the system follow proper English Title Case with technical acronym preservation.

### Typographic Rules

**Acronyms** (always uppercase):
- Technical: UI, API, CSS, HTML, ARIA, DOM, HTTP, HTTPS, URL, URI, SVG, XML, JSON, REST, AJAX, CORS
- JavaScript/TypeScript: JS, JSX, TS, TSX, NPM, CLI, SDK
- React: SSR, CSR
- AI/ML: AI, ML
- Design: UX, DX
- Colors: RGB, RGBA, HSL, HSLA
- Other: ID, IDs, UUID, GUID

**Small words** (lowercase, unless first/last word):
- Articles: a, an, the
- Conjunctions: and, or, nor, but, yet, so, for
- Prepositions: in, on, at, of, to, for, with, vs, from, into, onto, by, as, via, per, up, out, off

**Capitalization rules**:
- Always capitalize first and last word
- Capitalize all other words except small words and acronyms
- Small words at the beginning or end are capitalized

### Examples

✅ **Correct:**
- "Canonical UI Namespace and Reference Component Baseline"
- "React ARIA as Headless"
- "TSX Layer React ARIA and Storybook Layering"
- "Storybook Model AI Agent Oriented Architecture"
- "Component CSS Architecture"

❌ **Incorrect:**
- "Canonical Ui Namespace And Reference Component Baseline" (Ui → UI, And → and)
- "React Aria As Headless" (Aria → ARIA, As → as)
- "Storybook Model Ai Agent Oriented Architecture" (Ai → AI)

### Implementation

Title Case conversion is implemented in `scripts/utils/title-case.mjs` and automatically applied during document data generation.

## Automation

### Format Existing Documents

To apply canonical format to all documents:

```bash
npm run docs:format-headers
```

This script will:
- Extract existing metadata
- Apply canonical formatting
- Preserve document content
- Skip template files

### Regenerate Data and Stories

After formatting, regenerate metadata and story files:

```bash
# Regenerate data only (updates titles with Title Case)
npm run docs:regenerate-data

# Regenerate data and story files (complete regeneration)
npm run docs:regenerate-all
```

**What gets regenerated:**
- `stories/viewers/docs/adr-list-data.ts` - ADR metadata with proper Title Case
- `stories/viewers/docs/architecture-data.ts` - Architecture metadata with proper Title Case
- All story files in `stories/docs/adr/` and `stories/docs/architecture/`

## Template Files

### ADR Template

Location: [`docs/adr/ADR-TEMPLATE.md`](adr/ADR-TEMPLATE.md)

Use this template when creating new ADR documents.

### Architecture Template

Create new architecture documents following the canonical format shown above.

## Validation

All documents are validated for:
- Correct header format
- Mandatory fields present
- Valid status values
- Date format (YYYY-MM-DD)
- Related links point to existing files

Run validation:

```bash
npm run docs:validate
```

## Related Documentation

- [AI Agent Documentation Guide](AI-AGENT-DOCUMENTATION-GUIDE.md) — Complete guide for AI agents working with documentation
- [ADR Workflow](workflows/adr-workflow.md) — How to create and manage ADRs
- [Architecture Documentation](architecture/ARCH-system-001-architecture-documentation.md) — Architecture doc guidelines
- [Documentation Guide](DOCS-GUIDE.md) — General documentation guidelines
- [Scripts Reference](workflows/scripts-reference.md) — npm scripts for documentation
