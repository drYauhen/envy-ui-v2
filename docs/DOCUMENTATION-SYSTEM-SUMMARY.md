# Documentation System Summary

**Last Updated:** 2026-01-15

---

This document provides a high-level overview of the documentation system architecture and recent updates.

## System Overview

The Envy UI documentation system uses a **unified, automated approach** for managing ADR and Architecture documentation.

### Key Principles

1. **Single Source of Truth:** Markdown files are the source of truth (not data files)
2. **Auto-Generation:** Data files and story files are AUTO-GENERATED
3. **Title Case:** Automatic Title Case conversion with acronym preservation
4. **Canonical Format:** Two-part header system (preview + document)
5. **Structured Metadata:** Rendered as definition list with callout component

## Recent Updates (2026-01-15)

### ✅ Implemented Features

#### 1. Title Case Conversion System

**Location:** `scripts/utils/title-case.mjs`

**Purpose:** Ensures consistent, professional Title Case formatting across all documentation.

**Rules:**
- Preserves acronyms in uppercase (UI, API, CSS, HTML, ARIA, AI, ML, etc.)
- Lowercases small words (and, or, the, of, in, on, at, etc.)
- Always capitalizes first and last word

**Examples:**
- ✅ "Canonical UI Namespace and Reference Component Baseline"
- ✅ "React ARIA as Headless"
- ✅ "Storybook Model AI Agent Oriented Architecture"

#### 2. Unified Documentation Generation

**Location:** `scripts/generate-unified-doc-data.mjs`

**Purpose:** Single script for generating all documentation data and story files.

**Commands:**
- `npm run docs:regenerate-data` - Generate metadata files only
- `npm run docs:regenerate-all` - Generate metadata AND story files

**Generated Files:**
- `stories/viewers/docs/adr-list-data.ts`
- `stories/viewers/docs/architecture-data.ts`
- `stories/docs/adr/*.stories.tsx`
- `stories/docs/architecture/*.stories.tsx`

#### 3. Document Metadata Component

**Location:** `stories/viewers/docs/DocumentMetadata.tsx`

**Purpose:** Renders document metadata as structured definition list.

**Features:**
- Grid layout (labels left, values right)
- Uses callout component with neutral tone
- Link resolution for related documents
- Support for ADR and Architecture variants

#### 4. Canonical Header Formatter

**Location:** `scripts/format-doc-headers.mjs`

**Purpose:** Formats existing document headers to canonical format.

**Command:** `npm run docs:format-headers`

**What it does:**
- Extracts metadata from documents
- Applies canonical formatting
- Preserves content
- Skips template files

### 📚 Documentation Updates

#### 1. AI Agent Documentation Guide (NEW)

**Location:** `docs/AI-AGENT-DOCUMENTATION-GUIDE.md`

**Purpose:** Complete reference guide for AI agents working with documentation.

**Contents:**
- Complete workflow for creating/updating documents
- Title Case rules reference
- Common scenarios with code examples
- Troubleshooting guide
- Best practices
- Quick reference card

#### 2. Canonical Document Format

**Location:** `docs/CANONICAL-DOC-FORMAT.md`

**Updates:**
- Added Title Case rules section
- Updated automation section
- Added examples of correct/incorrect formatting
- Updated Related Documentation links

#### 3. ADR Workflow

**Location:** `docs/workflows/adr-workflow.md`

**Updates:**
- Updated to unified documentation system
- Replaced old commands with new ones
- Added Title Case information
- Simplified AI agent notes
- Added link to comprehensive AI guide

#### 4. Scripts Reference

**Location:** `docs/workflows/scripts-reference.md`

**Updates:**
- Added unified documentation system section
- Updated with new commands
- Marked legacy commands
- Added usage examples

#### 5. Documentation Guide

**Location:** `docs/DOCS-GUIDE.md`

**Updates:**
- Added link to AI Agent guide
- Updated Last Updated date

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Markdown Files                            │
│              (Single Source of Truth)                            │
│  docs/adr/ADR-XXXX-title.md                                     │
│  docs/architecture/ARCH-category-XXX-title.md                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ├─ npm run docs:format-headers (optional)
                         │
                         ├─ npm run docs:regenerate-all
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Generation Pipeline                            │
│  scripts/generate-unified-doc-data.mjs                          │
│  ├─ Extract metadata from markdown headers                      │
│  ├─ Apply Title Case conversion (utils/title-case.mjs)         │
│  ├─ Generate data files                                         │
│  └─ Generate story files                                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Generated Files                               │
│  ├─ stories/viewers/docs/adr-list-data.ts                       │
│  ├─ stories/viewers/docs/architecture-data.ts                   │
│  ├─ stories/docs/adr/*.stories.tsx                              │
│  └─ stories/docs/architecture/*.stories.tsx                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Storybook                                   │
│  ├─ DocViewer (renders markdown)                                │
│  ├─ DocumentMetadata (renders structured metadata)              │
│  └─ Navigation with proper Title Case                           │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
docs/
├── AI-AGENT-DOCUMENTATION-GUIDE.md    (NEW - Complete AI guide)
├── CANONICAL-DOC-FORMAT.md            (Updated - Added Title Case)
├── DOCS-GUIDE.md                      (Updated - Added AI guide link)
├── DOCUMENTATION-SYSTEM-SUMMARY.md    (NEW - This file)
├── adr/
│   ├── ADR-TEMPLATE.md
│   └── ADR-*.md
├── architecture/
│   └── ARCH-*.md
└── workflows/
    ├── adr-workflow.md                (Updated - Unified system)
    └── scripts-reference.md           (Updated - New commands)

scripts/
├── format-doc-headers.mjs             (Existing - Formats headers)
├── generate-unified-doc-data.mjs      (Existing - Main generator)
└── utils/
    └── title-case.mjs                 (NEW - Title Case utility)

stories/
├── viewers/docs/
│   ├── DocViewer.tsx                  (Updated - Uses DocumentMetadata)
│   ├── DocumentMetadata.tsx           (NEW - Metadata component)
│   ├── parse-metadata.ts              (NEW - Parser utility)
│   ├── adr-list-data.ts               (AUTO-GENERATED)
│   └── architecture-data.ts           (AUTO-GENERATED)
└── docs/
    ├── adr/*.stories.tsx              (AUTO-GENERATED)
    └── architecture/*.stories.tsx     (AUTO-GENERATED)

src/ui/
└── docs.css                           (Updated - Metadata grid styles)
```

## Workflow Summary

### For Creating New Documents

```bash
# 1. Create/edit markdown file with canonical header
cp docs/adr/ADR-TEMPLATE.md docs/adr/ADR-XXXX-new-decision.md

# 2. (Optional) Format headers
npm run docs:format-headers

# 3. Generate data and stories
npm run docs:regenerate-all

# 4. (Optional) Validate
npm run docs:validate

# 5. Verify in Storybook
npm run storybook
```

### For Updating Existing Documents

```bash
# 1. Edit markdown file

# 2. Regenerate data only (stories unchanged)
npm run docs:regenerate-data

# 3. Verify in Storybook
```

### For Adding New Acronym

```javascript
// 1. Edit scripts/utils/title-case.mjs
const ACRONYMS = new Set([
  // ... existing
  'newacr',
]);

// 2. Regenerate all
npm run docs:regenerate-all
```

## Key npm Scripts

| Command | Purpose |
|---------|---------|
| `npm run docs:format-headers` | Format document headers to canonical format |
| `npm run docs:regenerate-data` | Generate metadata files with Title Case |
| `npm run docs:regenerate-all` | Generate metadata AND story files |
| `npm run docs:validate` | Validate links and registry |

## Important Notes

### ✅ DO

- Use markdown files as source of truth
- Run `npm run docs:regenerate-all` after creating/updating documents
- Follow canonical header format
- Verify Title Case in Storybook menu
- Check metadata renders as structured definition list

### ❌ DON'T

- Manually edit generated files (`adr-list-data.ts`, `architecture-data.ts`, story files)
- Skip regeneration after changes
- Forget to update Last Updated date
- Create documents without running generation
- Use incorrect header formatting

## Documentation for AI Agents

**Primary Reference:** [AI-AGENT-DOCUMENTATION-GUIDE.md](./AI-AGENT-DOCUMENTATION-GUIDE.md)

This comprehensive guide provides:
- Complete workflow instructions
- Title Case rules reference
- Common scenarios with examples
- Troubleshooting guide
- Best practices
- Quick reference card

**Other References:**
- [CANONICAL-DOC-FORMAT.md](./CANONICAL-DOC-FORMAT.md) - Format specification
- [workflows/adr-workflow.md](./workflows/adr-workflow.md) - ADR workflow
- [workflows/scripts-reference.md](./workflows/scripts-reference.md) - npm scripts
- [DOCS-GUIDE.md](./DOCS-GUIDE.md) - General documentation guide

## Migration Notes

### What Changed

**Before:**
- Manual maintenance of `adr-list-data.ts`
- Separate `adr:generate` command
- Inconsistent title capitalization
- Metadata as plain text in markdown

**After:**
- Automatic extraction from markdown files
- Unified `docs:regenerate-all` command
- Consistent Title Case with acronym preservation
- Metadata rendered as structured definition list

### No Action Required

All existing documentation has been:
- ✅ Formatted to canonical format
- ✅ Regenerated with Title Case
- ✅ Updated in Storybook
- ✅ Validated for consistency

## Validation

To verify system integrity:

```bash
# 1. Format all headers
npm run docs:format-headers

# 2. Regenerate all files
npm run docs:regenerate-all

# 3. Validate links
npm run docs:validate

# 4. Check in Storybook
npm run storybook
```

Expected results:
- ✅ All titles display with proper Title Case
- ✅ All metadata renders as structured definition list
- ✅ All links work correctly
- ✅ No validation errors

## Support and Troubleshooting

For issues or questions:

1. Check [AI-AGENT-DOCUMENTATION-GUIDE.md](./AI-AGENT-DOCUMENTATION-GUIDE.md#troubleshooting)
2. Review [CANONICAL-DOC-FORMAT.md](./CANONICAL-DOC-FORMAT.md)
3. Check script output for error messages
4. Run `npm run docs:validate` to identify issues
5. Verify generated files were not manually edited

## Future Enhancements

Potential improvements for consideration:

- [ ] Automated validation in pre-commit hooks
- [ ] Enhanced link checking with preview URLs
- [ ] Additional Title Case acronyms as needed
- [ ] Metadata field validation
- [ ] Auto-detection of broken links in CI/CD
