# Figma Variables Snapshots

## Purpose

Snapshots capture the current state of Figma Variables before token structure changes.
They are used for:
- Migration tracking (old → new variable paths)
- Usage analysis (which variables are used where)
- Rollback reference (what was the state before changes)

## Structure

- `YYYY-MM-DD-HHmmss-snapshot.json` - Timestamped snapshots
- `latest-snapshot.json` - Symlink to the most recent snapshot (future)

## Workflow

1. **Before changing tokens:**
   - Open Figma plugin → Snapshot tab
   - Click "Create Snapshot"
   - Copy JSON or download file
   - Save to: `generated/figma/snapshots/YYYY-MM-DD-HHmmss-snapshot.json`

2. **After changing tokens:**
   - Generate migration file (future)
   - Uses snapshot as baseline for migration

## Snapshot Format

```json
{
  "timestamp": "2025-01-15T14:30:22.000Z",
  "version": "1.0.0",
  "collections": [
    {
      "id": "...",
      "name": "Envy UI • Colors / Brand",
      "modes": [
        { "id": "...", "name": "app-default" }
      ]
    }
  ],
  "variables": [
    {
      "id": "...",
      "name": "eui/color/brand/700",
      "path": "eui.color.brand.700",
      "collection": "Envy UI • Colors / Brand",
      "collectionId": "...",
      "type": "COLOR",
      "valuesByMode": {
        "app-default": { "r": 0.19, "g": 0.25, "b": 0.90, "a": 1 }
      },
      "usages": [
        {
          "nodeId": "...",
          "nodeName": "Button",
          "nodeType": "COMPONENT",
          "property": "fills",
          "index": 0
        }
      ]
    }
  ],
  "summary": {
    "totalCollections": 5,
    "totalVariables": 120,
    "totalUsages": 45,
    "variablesWithUsages": 30
  }
}
```

## Usage in Migration

Snapshots serve as the baseline for generating migration files:
- Compare snapshot (old state) with new token structure
- Generate mappings: old path → new path
- Identify deleted variables and their usages
- Create migration file for automatic binding updates

