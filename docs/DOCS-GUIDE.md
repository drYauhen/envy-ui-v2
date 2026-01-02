# Documentation Guide

**CRITICAL:** This guide applies to ALL documents in `docs/`, not just ADR.

## Single Source of Truth

**`stories/viewers/docs/docs-registry.ts` is the SINGLE SOURCE OF TRUTH for all documentation.**

All documentation metadata must be defined here FIRST:
- Unique `id` for each document
- `path` relative to `docs/` root
- `title` from markdown header
- `category` (adr, architecture, workflows, tasks, steps, other)
- `exportName` (optional, for Storybook exports)
- `aliases` (optional, for renamed files)

## Workflow for New Document

### Step 1: Add to docs-registry.ts FIRST

```typescript
// In stories/viewers/docs/docs-registry.ts
{
  id: 'category-document-name',
  path: 'category/document-name.md',
  title: 'Document Title',
  category: 'category'
}
```

**ID Rules:**
- Use kebab-case
- Prefix with category (e.g., `arch-`, `workflow-`)
- Example: `arch-accessibility`, `workflow-adr`

### Step 2: Create Document

Create the markdown file at the path specified in registry.

### Step 3: Validate Links

```bash
npm run docs:validate
```

This checks:
- ✅ All links point to existing files
- ✅ All linked files are registered in registry
- ✅ No broken cross-references

## Workflow for Renaming/Moving Document

1. **Update docs-registry.ts:**
   ```typescript
   {
     id: 'category-document-name',
     path: 'category/new-name.md', // Updated path
     title: 'Document Title',
     category: 'category',
     aliases: ['category/old-name.md'] // Add old path as alias
   }
   ```

2. **Rename/move the file**

3. **Update all links** in other documents (or use aliases for backward compatibility)

4. **Validate:**
   ```bash
   npm run docs:validate
   ```

## Cross-Reference Links

When linking between documents in different directories:

```markdown
- [Document Title](../category/document-name.md)
```

**Note:** The example above uses placeholder paths. Replace `category` and `document-name` with actual directory and file names.

**Path resolution:**
- `./file.md` - Same directory
- `../category/file.md` - Parent directory, then category
- `../../category/file.md` - Two levels up, then category

**Validation:**
- ✅ Target file exists
- ✅ Target is registered in docs-registry.ts
- ✅ Link path is correct

## ADR Documents

ADR documents are automatically registered from `adr-list-data.ts`. You don't need to manually add them to `docs-registry.ts`.

However, ADR guide documents (README.md, AGENT-GUIDE.md, TEMPLATE.md) must be manually registered.

## Common Mistakes

### ❌ DON'T:
- Create document before adding to `docs-registry.ts`
- Use incorrect relative paths in links
- Forget to update registry when renaming files
- Skip validation before committing

### ✅ DO:
- Always update `docs-registry.ts` FIRST
- Always run `npm run docs:validate` after changes
- Use correct relative paths for cross-directory links
- Add aliases when renaming files

## Quick Checklist

When creating/modifying document:

- [ ] Updated `docs-registry.ts` with document entry
- [ ] Created/updated markdown file
- [ ] Ran `npm run docs:validate` (no broken links)
- [ ] Verified links work correctly
- [ ] Checked cross-references are valid

## Troubleshooting

**Broken link error:**
1. Check target file exists at resolved path
2. Verify link path is correct (relative to source file)
3. Check if target is registered in `docs-registry.ts`

**Unregistered file warning:**
1. Add file to `docs-registry.ts`
2. Run validation again

**Cross-directory link not working:**
1. Verify relative path is correct
2. Use `../` to go up one directory level
3. Example: From `workflows/adr-workflow.md` to `adr/ADR-0001.md` → `../adr/ADR-0001.md`

## Integration with ADR System

ADR documents are automatically included in the registry from `adr-list-data.ts`. The validation system:
- Parses ADR entries from `adr-list-data.ts`
- Maps filenames from `adr-filename-map.ts`
- Validates all ADR cross-references
- Checks links between ADR and other documents

**See also:**
- [`docs/adr/AGENT-GUIDE.md`](./adr/AGENT-GUIDE.md) - ADR-specific guide
- [`docs/workflows/adr-workflow.md`](./workflows/adr-workflow.md) - ADR workflow

