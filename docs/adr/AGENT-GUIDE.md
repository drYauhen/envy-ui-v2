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

### Step 3: Generate Stories

```bash
npm run adr:generate
```

This will:
- Read `adr-list-data.ts` for exportName
- Generate story file with correct export name
- Ensure links work correctly

### Step 4: Validate

```bash
npm run adr:validate
```

This checks:
- ✅ exportName matches story file export
- ✅ File exists in filename map
- ✅ All links are valid
- ✅ Formatting is correct

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
- Manually edit story files (they're auto-generated)
- Change exportName without regenerating stories
- Use different exportName in `adr-list-data.ts` and story file
- Skip validation before committing

### ✅ DO:
- Always update `adr-list-data.ts` FIRST
- Always run `npm run adr:generate` after changes
- Always run `npm run adr:validate` before committing
- Use `exportName` for all ADRs to ensure reliable linking
- Verify links work in Storybook after changes

## Quick Checklist

When creating/modifying ADR:

- [ ] Updated `adr-list-data.ts` with correct `exportName`
- [ ] Created/updated ADR markdown file
- [ ] Ran `npm run adr:generate`
- [ ] Ran `npm run adr:validate` (no errors)
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

