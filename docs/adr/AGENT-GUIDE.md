# ADR Agent Guide

**CRITICAL:** This guide must be followed when creating or modifying ADRs to prevent broken links.

## Single Source of Truth

**`stories/viewers/docs/adr-list-data.ts` is the SINGLE SOURCE OF TRUTH for ADR metadata.**

All ADR metadata (number, title, status, date, exportName) must be defined here FIRST, then:
- Story files are generated from this data
- Overview links use this data
- Internal ADR links use this data

## Workflow for New ADR

### Step 1: Add to adr-list-data.ts FIRST

```typescript
// In stories/viewers/docs/adr-list-data.ts
{ 
  number: '0030', 
  title: 'Your ADR Title', 
  status: 'Accepted', 
  date: '2025-01-02',
  exportName: 'YourAdrTitle' // IMPORTANT: Must match story export name
}
```

**Export Name Rules:**
- Remove all non-alphanumeric characters
- Remove all spaces
- Result must match the export name in the generated story file
- Example: "Token Organization - Context" → `TokenOrganizationContext`
- **Best practice:** Always provide exportName for reliable linking

### Step 2: Create ADR File

```bash
# Copy template
cp docs/adr/ADR-TEMPLATE.md docs/adr/ADR-0030-your-title.md
```

Fill in the template with correct number, title, status, date.

### Step 3: Update Filename Map

**CRITICAL:** Add entry to `stories/viewers/docs/adr-filename-map.ts`:

```typescript
// In stories/viewers/docs/adr-filename-map.ts
"0030": "ADR-0030-your-title.md"
```

**Note:** This file maps ADR numbers to actual filenames. It's required for the ADR viewer to load the correct file.

### Step 4: Generate Stories

**Option A: Use Script (Recommended)**

```bash
npm run adr:generate
```

This will:
- Read `adr-list-data.ts` for exportName
- Generate story file with correct export name
- Ensure links work correctly

**Option B: Manual Creation (If script doesn't work)**

If the script doesn't work or you need to create manually, create `stories/docs/adr/adr-XXXX.stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const [ExportName]: Story = {
  name: 'ADR-XXXX [Title]',
  render: () => (
    <AdrViewer
      adrNumber="XXXX"
      title="[Title]"
      status="[Status]"
      date="YYYY-MM-DD"
    />
  )
};
```

**Important:** The export name must match `exportName` from `adr-list-data.ts` exactly.

### Step 5: Validate

```bash
npm run adr:validate
```

This checks:
- ✅ exportName matches story file export
- ✅ File exists in filename map
- ✅ All links are valid
- ✅ Formatting is correct

### Step 6: Restart Storybook

**CRITICAL:** After creating a new story file, restart Storybook:

```bash
# Stop Storybook (Ctrl+C)
# Then restart
npm run storybook
```

Storybook needs to reload to pick up new story files. If you see "Couldn't find story matching..." error, restart Storybook.

## Workflow for Modifying ADR

### If changing title:

1. **Update adr-list-data.ts FIRST:**
   ```typescript
   { 
     number: '0030', 
     title: 'New Title', // Updated
     status: 'Accepted', 
     date: '2025-01-02',
     exportName: 'NewTitle' // MUST update if title changed
   }
   ```

2. **Update ADR file:**
   - Update header: `# ADR-0030: New Title`
   - Update title in content

3. **Regenerate:**
   ```bash
   npm run adr:generate
   npm run adr:validate
   ```

### If changing exportName:

1. **Update adr-list-data.ts:**
   ```typescript
   exportName: 'NewExportName'
   ```

2. **Regenerate stories:**
   ```bash
   npm run adr:generate
   ```

3. **Validate:**
   ```bash
   npm run adr:validate
   ```

## Link Validation

### Internal ADR Links

Links in ADR markdown files use format:
```markdown
- [ADR-XXXX](./ADR-XXXX-title.md) — Title
```

**Validation:**
- ✅ File exists: `docs/adr/ADR-XXXX-title.md`
- ✅ Link uses relative path: `./ADR-XXXX-...`
- ✅ Title matches actual ADR title

### Links to Architecture Documents

**CRITICAL:** When linking to Architecture documents from ADR:

1. **Check if document exists FIRST:**
   ```bash
   ls docs/architecture/token-usage-rules.md
   ```

2. **If document doesn't exist, CREATE IT:**
   - Don't create broken links
   - Create the Architecture document first
   - Follow workflow in `docs/architecture/README.md`
   - Update `docs/architecture/README.md` index

3. **Use correct path format:**
   ```markdown
   - [Token Usage Rules](../architecture/token-usage-rules.md) — Current rules
   - [Accessibility Reference](../architecture/accessibility-reference.md) — Reference documentation
   ```

4. **Path rules:**
   - From ADR: `../architecture/filename.md`
   - Always use relative paths
   - Check file exists before committing

5. **After creating Architecture document:**
   - ✅ Add to `docs/architecture/README.md` index
   - ✅ Create Storybook story if needed
   - ✅ Update `docs-registry.ts` if needed
   - ✅ Verify link works

### Overview Links

Links in overview are generated from `adr-list-data.ts`:
- Uses `exportName` if provided
- Otherwise generates from title

**To fix broken overview links:**
1. Check `exportName` in `adr-list-data.ts`
2. Verify it matches actual export name in story file
3. Run `npm run adr:generate` to regenerate
4. Run `npm run adr:validate` to verify

## Common Mistakes

### ❌ DON'T:
- Create ADR file before adding to `adr-list-data.ts`
- Forget to update `adr-filename-map.ts`
- Manually edit story files if using auto-generation (they'll be overwritten)
- Change exportName without regenerating stories
- Use different exportName in `adr-list-data.ts` and story file
- Skip validation before committing
- Forget to restart Storybook after creating new story file

### ✅ DO:
- Always update `adr-list-data.ts` FIRST (single source of truth)
- Always update `adr-filename-map.ts` with filename mapping
- Always run `npm run adr:generate` after changes (or create story manually)
- Always run `npm run adr:validate` before committing
- Always restart Storybook after creating new story file
- Use `exportName` for all ADRs to ensure reliable linking
- **Check Architecture documents exist before linking** (create if missing)
- **Update `docs/architecture/README.md`** when creating new Architecture documents
- Verify links work in Storybook after changes

## Quick Checklist

When creating/modifying ADR:

- [ ] Updated `adr-list-data.ts` with correct `exportName` (FIRST)
- [ ] Created/updated ADR markdown file
- [ ] Updated `adr-filename-map.ts` with filename mapping
- [ ] Created story file (via `npm run adr:generate` or manually)
- [ ] Ran `npm run adr:validate` (no errors)
- [ ] Restarted Storybook (if new story file created)
- [ ] **Checked all Architecture document links exist** (create if missing)
- [ ] **Updated `docs/architecture/README.md`** if created new Architecture document
- [ ] Verified links work in Storybook
- [ ] Checked overview page links work

## Troubleshooting

**Broken overview link:**
1. Check `exportName` in `adr-list-data.ts`
2. Check actual export name in story file
3. They must match exactly
4. Run `npm run adr:generate` to fix

**Broken internal link:**
1. Verify target ADR file exists
2. Check filename matches link exactly
3. Use relative path: `./ADR-XXXX-title.md`

**Validation errors:**
1. Read error message carefully
2. Fix in `adr-list-data.ts` if exportName issue
3. Fix in ADR markdown if formatting issue
4. Re-run validation

**exportName mismatch error:**
1. Check `exportName` in `adr-list-data.ts`
2. Check actual export name in story file
3. Update `adr-list-data.ts` to match story file
4. Or run `npm run adr:generate` to regenerate story file

## Why This Matters

- **Broken links** confuse users and break navigation
- **Inconsistent exportName** causes overview links to fail
- **Manual edits** to story files get overwritten on regeneration
- **Missing validation** allows errors to slip into production

Following this guide ensures:
- ✅ All links work correctly
- ✅ Overview page is reliable
- ✅ Internal ADR links are valid
- ✅ No broken navigation in Storybook

