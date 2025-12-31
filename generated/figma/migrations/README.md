# Figma Variables Migrations

## Purpose

Migration files describe changes in token structure (paths, collections) and provide mappings for automatically updating Figma Variable bindings.

## Structure

- `YYYY-MM-DD-migration.json` - Date-stamped migration files

## Workflow

1. **Before changing tokens:**
   - Create snapshot in Figma plugin
   - Save to `generated/figma/snapshots/`

2. **After changing tokens:**
   - Build tokens: `npm run tokens:build`
   - Generate migration: `npm run figma:migration:generate`
   - Review migration file
   - Update fallbacks if needed

3. **Apply migration (future):**
   - Load migration file in Figma plugin
   - Review summary
   - Apply migration to update bindings

## Migration File Format

```json
{
  "version": "2025-01-15",
  "timestamp": "2025-01-15T14:30:22.000Z",
  "snapshot": "2025-01-15T14-25-10-snapshot.json",
  "snapshotTimestamp": "2025-01-15T14:25:10.000Z",
  "summary": {
    "totalChanges": 5,
    "deleted": 3,
    "moved": 2,
    "added": 10,
    "totalUsagesAffected": 15
  },
  "mappings": [],
  "deleted": [
    {
      "old": {
        "path": "eui.color.brand.700",
        "collection": "Envy UI • Colors / Brand",
        "variableId": "VariableID:1:123",
        "name": "eui/color/brand/700",
        "type": "COLOR"
      },
      "fallback": {
        "path": "eui.color.brand.600",
        "collection": "Envy UI • Colors / Brand",
        "reason": "similar-path-same-collection"
      },
      "usages": 5,
      "action": "delete",
      "requiresManualReview": false
    }
  ],
  "moved": [
    {
      "path": "eui.color.text.primary",
      "oldCollection": "Envy UI • Colors / Text",
      "newCollection": "Envy UI • Colors / Semantic",
      "usages": 10,
      "action": "move"
    }
  ]
}
```

## Migration Actions

- **delete**: Variable was removed from tokens
  - `fallback`: Suggested replacement variable (if found)
  - `requiresManualReview`: true if no fallback found or has usages

- **move**: Variable moved to different collection
  - Bindings will be updated to new collection

- **rename**: Variable path changed (future)
  - `old.path` → `new.path` mapping

## Usage in Plugin

Migration files are consumed by the Figma plugin to:
- Update Variable IDs in bindings
- Replace deleted variables with fallbacks
- Move variables to new collections
- Warn about variables requiring manual review

