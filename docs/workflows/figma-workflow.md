# Figma Workflow

Complete guide to working with Figma integration in Envy UI v2.

## Overview

Figma integration enables bidirectional synchronization between design tokens and Figma Variables. The system includes:
- **Figma Plugin** - Custom plugin for importing/exporting Variables
- **Scripts** - Automation tools for analysis and migration
- **Artifacts** - Generated files for Figma consumption

## Architecture

```
tokens/ (source of truth)
  ↓
Style Dictionary
  ↓
generated/figma/
  ├── adapter/          # Style Dictionary → adapter JSON
  ├── tokens/           # Style Dictionary → tokens JSON
  ├── snapshots/        # Figma plugin → snapshot (backup)
  └── migrations/       # scripts/figma → migration files
  ↓
Figma Plugin
  ↓
Figma Variables
```

## File Structure

### Plugin Code
- `figma-plugin/code.ts` - Main plugin logic
- `figma-plugin/ui.html` - Plugin UI
- `figma-plugin/applicator.ts` - Component applicator logic

### Scripts
- `scripts/figma/analyze-snapshot.mjs` - Analyze changes between snapshot and tokens
- `scripts/figma/generate-migration.mjs` - Generate migration file (future)

### Generated Artifacts
- `generated/figma/adapter/variables.adapter.json` - Adapter format (legacy, colors only)
- `generated/figma/tokens/variables.tokens.scoped.json` - Full tokens with modes (preferred)
- `generated/figma/tokens/variables.tokens.full.json` - Full tokens (alternative)
- `generated/figma/snapshots/` - Snapshot backups
- `generated/figma/migrations/` - Migration files (future)
- `generated/figma/structures/` - Component structures (frozen, not actively used)

## Workflows

### 1. Import Variables (Tokens → Figma)

**Purpose:** Import design tokens into Figma as Variables.

**Steps:**
1. Build tokens: `npm run tokens:build`
2. Open Figma plugin: Plugins → Development → Envy UI Tokens Adapter
3. Go to "Variables" tab
4. Load JSON file: Click "Load JSON file" → Select `generated/figma/tokens/variables.tokens.scoped.json`
5. Prepare import: Click "Prepare import" → Review summary
6. Select default mode: Choose default mode (e.g., `app-default`)
7. Apply changes: Click "Apply changes"

**What happens:**
- Collections are created or reused (matched by name)
- Variables are created or updated (matched by path)
- Modes are created for each context+theme combination
- Values are set for all modes

**Modes Structure:**
- `app-default`, `app-accessibility`
- `website-default`, `website-dark`
- `report-print`, `report-screen`

### 2. Export Snapshot (Figma → Backup)

**Purpose:** Create a backup of current Figma Variables state before making changes.

**Steps:**
1. Open Figma plugin → "Snapshot" tab
2. Click "Create Snapshot"
3. Review summary (collections, variables, usages)
4. Copy JSON or download file
5. Save to: `generated/figma/snapshots/YYYY-MM-DD-HHmmss-snapshot.json`

**Snapshot contains:**
- All Collections with modes
- All Variables with paths, types, valuesByMode
- All bindings (usages) - where variables are used

**When to create snapshot:**
- Before changing token structure
- Before importing new tokens
- Before major refactoring
- As regular backup

### 3. Restore from Snapshot (Backup → Figma)

**Purpose:** Restore Figma Variables from a snapshot backup.

**Steps:**
1. Open Figma plugin → "Snapshot" tab
2. Scroll to "Restore from Snapshot" section
3. Load snapshot file: Click "Load Snapshot file" → Select snapshot JSON
4. Prepare restore: Click "Prepare restore" → Review summary
5. Restore: Click "Restore from Snapshot"

**What happens:**
- Collections are created/updated with modes
- Variables are created/updated with valuesByMode
- Bindings are restored (if nodes still exist)

**Safety:**
- Shows summary before applying changes
- Warns about missing nodes
- Warns about variables to be deleted

### 4. Analyze Changes

**Purpose:** Compare snapshot (old state) with current tokens to see what changed.

**Steps:**
1. Create snapshot before changing tokens
2. Change tokens in `tokens/`
3. Build tokens: `npm run tokens:build`
4. Run analysis: `npm run figma:analyze`
5. Review output:
   - Deleted variables (not in tokens)
   - Added variables (new in tokens)
   - Moved variables (changed collection)

**Output shows:**
- Variables that will be deleted (with usage count)
- Variables that are new
- Variables that moved between collections
- Warnings about broken bindings

### 5. Generate Migration File (Future)

**Purpose:** Create migration file for automatic binding updates when token structure changes.

**Steps:**
1. Create snapshot before changes
2. Change token structure (rename paths, etc.)
3. Build tokens: `npm run tokens:build`
4. Generate migration: `npm run figma:migration:generate`
5. Review migration file: `tokens/migrations/YYYY-MM-DD-migration.json`
6. Apply migration via plugin (future)

**Migration file contains:**
- Mappings: old path → new path
- Deleted variables with fallbacks
- Usage counts for each change

### 6. Apply Migration (Future)

**Purpose:** Automatically update bindings when token structure changes.

**Steps:**
1. Generate migration file
2. Open Figma plugin → "Migration" tab (future)
3. Load migration file
4. Review summary
5. Apply migration

**What happens:**
- Old Variables are updated or replaced
- Bindings are updated to new Variable IDs
- Fallback Variables are used for deleted ones

## Scripts Reference

### analyze-snapshot.mjs

**Purpose:** Compare snapshot with current tokens.

**Usage:**
```bash
# Analyze latest snapshot
npm run figma:analyze

# Analyze specific snapshot
npm run figma:analyze -- 2025-12-30T19-57-48-snapshot.json
```

**Output:**
- Summary of changes
- List of deleted variables (with usage warnings)
- List of new variables
- List of moved variables

### generate-migration.mjs (Future)

**Purpose:** Generate migration file from snapshot comparison.

**Usage:**
```bash
npm run figma:migration:generate
```

**Output:**
- Migration file in `generated/figma/migrations/YYYY-MM-DD-migration.json`

## Artifacts Structure

### adapter/variables.adapter.json

**Format:** Legacy adapter format (colors only)
**Generated by:** Style Dictionary platform `figma`
**Used by:** Plugin import (fallback)

**Structure:**
```json
{
  "collections": [
    {
      "name": "envy-ui-v2 • Colors / Brand",
      "mode": "default",
      "variables": [
        {
          "path": "eui.color.brand.700",
          "type": "COLOR",
          "value": "oklch(...)"
        }
      ]
    }
  ]
}
```

### tokens/variables.tokens.scoped.json

**Format:** Full tokens with modes (preferred)
**Generated by:** Style Dictionary platform `figmaScoped`
**Used by:** Plugin import (primary), analysis scripts

**Structure:**
```json
{
  "collections": [
    {
      "name": "envy-ui-v2 • Colors / Colors",
      "modes": ["app-default", "website-dark", ...],
      "variables": [
        {
          "path": "eui.color.text.primary",
          "type": "COLOR",
          "valuesByMode": {
            "app-default": { "r": 0, "g": 0, "b": 0, "a": 1 },
            "website-dark": { "r": 1, "g": 1, "b": 1, "a": 1 }
          }
        }
      ]
    }
  ]
}
```

### snapshots/YYYY-MM-DD-HHmmss-snapshot.json

**Format:** Complete Figma Variables state
**Generated by:** Figma plugin export
**Used by:** Restore, analysis, migration

**Structure:**
```json
{
  "timestamp": "2025-12-30T19:57:28.115Z",
  "version": "1.0.0",
  "collections": [...],
  "variables": [
    {
      "id": "VariableID:1:123",
      "name": "eui/color/brand/700",
      "path": "eui.color.brand.700",
      "collection": "envy-ui-v2 • Colors / Brand",
      "type": "COLOR",
      "valuesByMode": {...},
      "usages": [
        {
          "nodeId": "22:76",
          "nodeName": "Button",
          "nodeType": "COMPONENT",
          "property": "fills",
          "index": 0
        }
      ]
    }
  ],
  "summary": {...}
}
```

### migrations/YYYY-MM-DD-migration.json (Future)

**Format:** Migration mappings
**Generated by:** `scripts/figma/generate-migration.mjs`
**Used by:** Plugin migration feature

**Structure:**
```json
{
  "version": "2025-12-30",
  "snapshot": "2025-12-30T19-57-48-snapshot.json",
  "mappings": [
    {
      "old": {
        "path": "eui.color.brand.700",
        "collection": "...",
        "variableId": "..."
      },
      "new": {
        "path": "eui.color.brand.primary",
        "collection": "..."
      },
      "action": "rename",
      "usages": 5
    }
  ]
}
```

## Common Workflows

### Changing Token Structure

1. **Create snapshot:**
   ```bash
   # In Figma plugin → Snapshot tab → Create Snapshot
   # Save to: generated/figma/snapshots/YYYY-MM-DD-HHmmss-snapshot.json
   ```

2. **Change tokens:**
   ```bash
   # Edit tokens in tokens/
   vim tokens/foundations/colors/brand.json
   ```

3. **Analyze changes:**
   ```bash
   npm run tokens:build
   npm run figma:analyze
   ```

4. **Generate migration (future):**
   ```bash
   npm run figma:migration:generate
   ```

5. **Import new tokens:**
   ```bash
   # In Figma plugin → Variables tab → Import
   ```

6. **Apply migration (future):**
   ```bash
   # In Figma plugin → Migration tab → Apply
   ```

### Regular Backup

1. **Create snapshot regularly:**
   - Before major token changes
   - After successful imports
   - As part of release process

2. **Store snapshots:**
   - Keep in `generated/figma/snapshots/`
   - Commit to git (they're backups)
   - Name with timestamps

### Restoring After Error

1. **Load snapshot:**
   ```bash
   # In Figma plugin → Snapshot tab → Restore from Snapshot
   # Load snapshot file
   ```

2. **Review summary:**
   - Check what will be restored
   - Verify bindings will be restored

3. **Restore:**
   - Click "Restore from Snapshot"
   - Verify Variables are restored

## Troubleshooting

### Variables not appearing in Figma

- Check that tokens were built: `npm run tokens:build`
- Verify JSON file exists: `generated/figma/tokens/variables.tokens.scoped.json`
- Check plugin console for errors

### Bindings not restored

- Nodes may have been deleted from Figma file
- Check snapshot for node IDs
- Verify nodes still exist in current file

### Migration not working

- Ensure snapshot exists before changes
- Verify migration file format
- Check plugin console for errors

## Related Documentation

- [ADR-0003: Data-Driven Figma Variables Pipeline](./../adr/ADR-0003-data-driven-figma-variables-pipeline.md)
- [ADR-0025: Figma Variables Integration Strategy](./../adr/ADR-0025-figma-variables-integration-strategy.md)
- [Generated Figma README](../../generated/figma/README.md)

