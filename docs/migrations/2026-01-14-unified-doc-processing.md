# Migration: Unified ADR and Architecture Document Processing

**Date**: 2026-01-14
**Status**: ✅ Completed
**Branch**: `feature/scripts-structure`

## Overview

Unified the ADR and Architecture document processing pipelines to eliminate duplication and inconsistencies. Both document types now use identical processing patterns, data structures, and viewer components.

## Problem Statement

### Before Migration

The system had two parallel processing paths with different patterns:

**ADR Processing:**
- Data: Minimal structure (number, title, status, date, exportName)
- Component: `AdrViewer` → fetches via `adr-filename-map.ts` → wraps `DocViewer`
- Stories: 41 files using `AdrViewer` component
- Metadata: Hardcoded in data files

**Architecture Processing:**
- Data: Minimal structure (id, filename, title, date, exportName)
- Component: `DocViewer` directly with `markdownPath` prop
- Stories: 17 files using `DocViewer` directly
- Metadata: Partially extracted from markdown

**Issues:**
- Two different viewer components (`AdrViewer` vs `DocViewer`)
- Inconsistent data structures
- `adr-filename-map.ts` duplication
- Different metadata handling
- Harder to maintain and extend

## Solution Implemented

### Unified Pattern

Both ADR and Architecture now follow the same pattern:

1. **Data Structure**: Full `DocMetadata` objects with all fields
2. **Component**: `DocViewer` only (eliminated `AdrViewer`)
3. **Stories**: Identical template using `DocViewer` with `markdownPath`
4. **Metadata**: Extracted from markdown files, not hardcoded

## Changes Made

### 1. New Script: `generate-unified-doc-data.mjs`

**Location**: `scripts/generate-unified-doc-data.mjs`

**Features:**
- Unified metadata extraction from markdown files
- Parses `**Status:**`, `**Date:**`, `**Last Updated:**`, `**Owner:**`, `**Assistance:**` fields
- Generates full `DocMetadata` objects
- Story file generation with `--stories` flag
- Supports both ADR and Architecture documents

**Usage:**
```bash
# Regenerate data only
node scripts/generate-unified-doc-data.mjs all

# Regenerate data + story files
node scripts/generate-unified-doc-data.mjs all --stories

# Regenerate specific category
node scripts/generate-unified-doc-data.mjs adr --stories
node scripts/generate-unified-doc-data.mjs architecture --stories
```

**Key Functions:**
- `parseMarkdownMetadata(content)` - Extracts metadata from markdown
- `generateAdrData()` - Generates ADR data with full DocMetadata
- `generateArchitectureData()` - Generates Architecture data with full DocMetadata
- `generateStoryFile(doc, category)` - Generates story files from data
- `generateAllStoryFiles(category, docs)` - Batch story generation

### 2. Updated Data Files

#### `stories/viewers/docs/adr-list-data.ts`

**Before:**
```typescript
{
  number: "0001",
  title: "React Aria Headless",
  status: "Accepted",
  date: "2025-01-01",
  exportName: "ReactAriaasHeadlessAccessibilityFoundation"
}
```

**After:**
```typescript
{
  number: "0001",
  title: "React Aria Headless",
  category: "adr",
  status: "Accepted",
  date: "2025-12-15",
  lastUpdated: "2026-01-08",
  owner: "Eugene Goncharov",
  assistance: "AI-assisted drafting (human-reviewed)",
  exportName: "ReactAriaasHeadlessAccessibilityFoundation",
  markdownPath: "/docs/adr/ADR-0001-react-aria-headless.md"
}
```

#### `stories/viewers/docs/architecture-data.ts`

**Before:**
```typescript
{
  id: "ARCH-accessibility-001-ARCH-accessibility-001-accessibility-reference",
  filename: "ARCH-accessibility-001-accessibility-reference.md",
  title: "Accessibility Reference",
  date: "2026-01-14",
  exportName: "ArchAccessibility001AccessibilityReference"
}
```

**After:**
```typescript
{
  number: "001",
  title: "Accessibility Reference",
  category: "architecture",
  majorCategory: "ACCESSIBILITY",
  status: "Active",
  date: "2026-01-14",
  lastUpdated: "2026-01-14",
  exportName: "ArchAccessibilityNum001AccessibilityReference",
  markdownPath: "/docs/architecture/ARCH-accessibility-001-accessibility-reference.md"
}
```

### 3. Updated Type System

#### `stories/viewers/docs/doc-types.ts`

Added `markdownPath` field to `DocMetadata`:

```typescript
export type DocMetadata = {
  // Core identification
  number: string;
  title: string;
  category: DocCategory;

  // Metadata
  status?: string;
  date?: string;
  lastUpdated?: string;
  owner?: string;
  assistance?: string;

  // Type-specific
  majorCategory?: string;  // Architecture only

  // File path (NEW)
  markdownPath?: string;   // e.g., '/docs/adr/ADR-0001.md'

  // Storybook integration
  storybookId?: string;
  exportName?: string;

  // Advanced
  tags?: string[];
  aliases?: string[];
  dependencies?: string[];
};
```

### 4. Story File Template

**Unified template for both ADR and Architecture:**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/{Category}',
  parameters: {
    ...getSectionParameters('Docs/{Category}'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const {ExportName}: Story = {
  name: '{Display Name}',
  render: () => (
    <DocViewer
      markdownPath="{markdownPath}"
      title="{title}"
      status="{status}"
      date="{date}"
      lastUpdated="{lastUpdated}"
      owner="{owner}"
      assistance="{assistance}"
      fallback="Loading..."
    />
  )
};
```

**Key changes:**
- All stories use `DocViewer` directly
- Pass `markdownPath` prop instead of using `adr-filename-map`
- Metadata passed as props (extracted from markdown)

### 5. Deleted Files

- ✅ `stories/viewers/docs/AdrViewer.tsx` - Replaced by unified `DocViewer`
- ✅ `stories/viewers/docs/adr-filename-map.ts` - Replaced by `markdownPath`
- ✅ `stories/viewers/docs/AdrListViewer.tsx` - Replaced by unified `DocListViewer`
- ✅ `stories/docs/adr/ADR-TEMPLATE.stories.tsx` - Template excluded from system

### 6. Updated Files

#### `stories/viewers/docs/docs-registry.ts`

**Before:**
```typescript
import { adrFilenameMap } from './adr-filename-map';

const adrDocs = adrs.map(adr => {
  const filename = adrFilenameMap[adr.number] || `ADR-${adr.number}.md`;
  return {
    id: `adr-${adr.number}`,
    path: `adr/${filename}`,
    title: adr.title,
    category: 'adr',
    exportName: adr.exportName
  };
});
```

**After:**
```typescript
const adrDocs = adrs.map(adr => ({
  id: `adr-${adr.number}`,
  path: adr.markdownPath?.replace('/docs/', '') || `adr/ADR-${adr.number}.md`,
  title: adr.title,
  category: adr.category,
  exportName: adr.exportName,
  status: adr.status
}));
```

#### `stories/viewers/docs/adr-links.ts`

Removed dependency on `adr-filename-map.ts`, now uses `markdownPath` from data.

#### `scripts/validate-adr.mjs`

Updated to parse new DocMetadata JSON format instead of old format.

#### `scripts/validate-docs-links.mjs`

Updated to handle `markdownPath` field in both ADR and Architecture data.

#### `.storybook/viewer-registry.ts`

Removed `AdrViewer` and `AdrListViewer` imports and registry entries.

### 7. Export Name Fix for Architecture

**Issue**: Export names like `ArchTheme002Title` were causing incorrect story IDs because Storybook couldn't detect the camelCase boundary between number and capital letter.

**Solution**: Added "Num" prefix to create clear boundary:
- `ArchTheme002Title` → `ArchThemeNum002Title`
- Story ID: `arch-theme-num-002-title` ✅

**Updated in:**
- `scripts/generate-unified-doc-data.mjs` - `generateArchitectureExportName()`
- All 17 Architecture story files regenerated

### 8. DocListViewer Enhancements

**Location**: `stories/viewers/docs/DocListViewer.tsx`

**Added features:**
1. Muted prefix styling for both ADR and Architecture
2. Fixed story ID generation to handle number-to-capital transitions

**Styling:**
```tsx
// ADR
<span className="eui-text-muted">ADR-{doc.number}: </span>
{doc.title}

// Architecture
<span className="eui-text-muted">ARCH-{doc.majorCategory}-{doc.number}: </span>
{doc.title}
```

**Story ID conversion:**
```typescript
const storyNameFromExport = (exportName: string): string => (
  exportName
    .replace(/([a-z])([A-Z])/g, '$1-$2')          // lowercase to uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')    // acronym to word
    .replace(/([0-9])([A-Z])/g, '$1-$2')         // digit to uppercase (NEW)
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')      // letter to digit (NEW)
    .toLowerCase()
);
```

### 9. Template Exclusion

**[ADR-TEMPLATE](../adr/ADR-TEMPLATE.md)** is now excluded from the system:
- Script filters out files with 'TEMPLATE' in filename
- Story file deleted
- ADR count: 42 → 41 ([ADR-0001](../adr/ADR-0001-react-aria-headless.md) through [ADR-0041](../adr/ADR-0041-dtcg-schema-resolution-and-token-architecture.md))
- Template markdown still exists for agent reference

### 10. Overview Stories Simplified

Both overview stories now pass data directly without transformation:

```tsx
// ADR Overview
export const Overview: Story = {
  name: 'ADR Overview',
  render: () => <DocListViewer docs={adrs} category="adr" />
};

// Architecture Overview
export const Overview: Story = {
  name: 'Architecture Overview',
  render: () => <DocListViewer docs={architectures} category="architecture" />
};
```

## File Counts

| Type | Before | After | Change |
|------|--------|-------|--------|
| ADR Stories | 42 | 41 | -1 (template removed) |
| Architecture Stories | 17 | 17 | 0 |
| Viewer Components | 3 | 1 | -2 (unified) |
| Data Files | 3 | 2 | -1 (no filename map) |

## Git Commits

1. `feat(docs): Unify ADR and Architecture document processing` - Main unification
2. `fix(docs): Remove remaining adr-filename-map dependencies` - Import fixes
3. `fix(docs): Add 'Num' prefix to Architecture export names` - Story ID fix
4. `fix(docs): Update DocListViewer to handle number transitions` - Link fix
5. `chore(docs): Remove obsolete AdrListViewer` - Cleanup
6. `feat(docs): Add muted styling to ADR number prefix` - UI enhancement
7. `feat(docs): Add muted styling to Architecture prefix` - UI enhancement
8. `fix(docs): Filter out ADR-0000 template from overview` - Template filter
9. `fix(docs): Exclude ADR-TEMPLATE from data generation` - Template exclusion
10. `refactor(docs): Remove unnecessary filter from ADR overview` - Cleanup

## Benefits

### 1. Single Source of Truth
- Metadata lives in markdown files, not duplicated in code
- Automatic extraction via script
- Easy to update and maintain

### 2. Consistency
- Identical patterns for ADR and Architecture
- One viewer component
- One story template
- One data structure

### 3. Maintainability
- Simpler codebase (3 components → 1)
- No duplicate mappings
- Clear separation of concerns
- Easy to debug

### 4. Automation
- Full regeneration with one command
- Story files generated from data
- No manual synchronization needed

### 5. Type Safety
- Full TypeScript support with `DocMetadata`
- Compile-time validation
- Better IDE support

### 6. Extensibility
- Easy to add new document categories (workflow, tokens, guides)
- Same pattern for all categories
- Reusable components

## How to Use

### Regenerate Data After Adding/Updating Documents

```bash
# Regenerate just data files
npm run docs:regenerate-data

# Or use script directly
node scripts/generate-unified-doc-data.mjs all
```

### Regenerate Story Files

```bash
# Regenerate data + stories
node scripts/generate-unified-doc-data.mjs all --stories

# Or specific category
node scripts/generate-unified-doc-data.mjs adr --stories
node scripts/generate-unified-doc-data.mjs architecture --stories
```

### Add New ADR Document

1. Create markdown file: `docs/adr/ADR-XXXX-title.md`
2. Add metadata fields:
   ```markdown
   **Status:** Accepted
   **Date:** 2026-01-14
   **Last Updated:** 2026-01-14
   **Owner:** Your Name
   **Assistance:** AI-assisted drafting (human-reviewed)
   ```
3. Run: `node scripts/generate-unified-doc-data.mjs adr --stories`
4. Restart Storybook to see changes

### Add New Architecture Document

1. Create markdown file: `docs/architecture/ARCH-category-XXX-title.md`
2. Add metadata fields (same as ADR)
3. Run: `node scripts/generate-unified-doc-data.mjs architecture --stories`
4. Restart Storybook to see changes

### Validate Documentation

```bash
# Validate all doc links
npm run docs:validate

# Validate ADR structure
npm run adr:validate
```

## Known Issues / Notes

### Storybook Cache
After regenerating stories, you may need to:
1. Clear Storybook cache
2. Restart Storybook dev server
3. Hard refresh browser (Cmd+Shift+R)

### Node.js Version
Storybook requires Node.js v18.19.0+ or v20+. If you see module errors:
```bash
nvm use 24.11.1
npm run storybook:dev
```

### Story ID Format
Architecture stories now use format: `arch-{category}-num-{number}-{title}`
- Example: `arch-components-num-001-component-css-architecture`
- The "Num" prefix ensures proper kebab-case conversion

## Next Steps (Future Work)

### 1. Extend to Other Document Types

Apply the same unified pattern to:
- **Workflow documents** (`docs/workflows/`)
- **Token documentation** (`docs/tokens/`)
- **Guide documents** (`docs/guides/`)

### 2. Enhanced Metadata

Add support for:
- Tags for filtering/search
- Dependencies between documents
- Related documents
- Version history

### 3. Validation Improvements

- Validate metadata completeness
- Check for broken cross-references
- Ensure story files match data
- Validate export name uniqueness

### 4. Search and Filtering

Add to `DocListViewer`:
- Search by title/content
- Filter by status
- Filter by date range
- Filter by owner

### 5. Analytics

Track:
- Most viewed documents
- Recently updated documents
- Documents needing review

## Testing Checklist

After restarting Storybook, verify:

- [ ] All 41 ADR stories render correctly
- [ ] All 17 Architecture stories render correctly
- [ ] ADR overview links work
- [ ] Architecture overview links work
- [ ] Muted prefixes display correctly
- [ ] Status badges show correct colors
- [ ] Cross-document links work
- [ ] No [ADR-TEMPLATE](../adr/ADR-TEMPLATE.md) in menu
- [ ] No console errors
- [ ] Metadata displays in headers
- [ ] Link validation passes: `npm run docs:validate`

## Migration Statistics

- **Files modified**: ~70 files
- **Files deleted**: 4 files (2 viewers + 2 data files)
- **Lines added**: ~2,600
- **Lines removed**: ~1,000
- **Net change**: +1,600 lines (mostly generated story files)
- **Components unified**: 3 → 1
- **Data structures unified**: 2 → 1 (DocMetadata)

## References

- **Implementation plan**: `/Users/eugenegoncharov/.claude/plans/linear-stirring-falcon.md`
- **Branch**: `feature/scripts-structure`
- **Date completed**: 2026-01-14
- **AI assistance**: Claude Sonnet 4.5

## Questions or Issues?

If you encounter issues:
1. Check `npm run docs:validate` output
2. Verify Node.js version (24.11.1+)
3. Clear Storybook cache
4. Check this migration doc for patterns
5. Review git commits for details

---

**Status**: ✅ **COMPLETED**
**Next session starting point**: Documentation system is fully unified. Ready to extend pattern to workflow/token/guide documents if needed.
