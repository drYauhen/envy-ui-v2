# Figma Workflow

Complete guide to working with Figma integration in Envy UI v2.

## Overview

Figma integration enables bidirectional synchronization between design tokens and Figma Variables. The system includes:
- **Figma Plugin** - Custom plugin for importing/exporting Variables
- **Scripts** - Automation tools for analysis and migration
- **Artifacts** - Generated files for Figma consumption

## Context Separation

The token system is split into three separate systems for Figma:
- **App context:** `generated/figma/app/variables.tokens.scoped.json` (modes: `app-default`, `app-accessibility`)
- **Website context:** `generated/figma/website/variables.tokens.scoped.json` (modes: `website-default`, `website-dark`)
- **Report context:** `generated/figma/report/variables.tokens.scoped.json` (modes: `report-print`, `report-screen`)

Each context has its own Figma file. The plugin validates context match before importing to prevent accidental cross-context imports.

**File Structure:**
- `Envy UI - App Context` - Complete design system for application context
- `Envy UI - Website Context` - Complete design system for website context
- `Envy UI - Report Context` - Complete design system for report context

Each file contains:
- **Variables page**: All design tokens organized into collections
- **Components page**: All components organized by category
- **Patterns page**: Component compositions and design patterns
- **Documentation page**: Context-specific guidelines

For detailed file structure and organization, see [ADR-0027](./../adr/ADR-0027-figma-files-structure-and-organization.md).

## Quick Start: Migration Workflow

**When you change token structure (rename, delete, move variables):**

1. **Before changes:** Create snapshot in Figma plugin → "Snapshot" tab
2. **Change tokens:** Edit `tokens/` files
3. **Build:** `npm run tokens:build:figma` (or specific context: `npm run tokens:build:figma:app`)
4. **Generate migration:** `npm run figma:migration:generate`
5. **Import new tokens:** Figma plugin → "Variables" tab → Import new tokens (context will be validated)
6. **Apply migration:** Figma plugin → "Migration" tab → Load migration file → Apply

**Result:** All Figma Variable bindings are automatically updated to use new variables!

See [Complete Migration Workflow](#6-apply-migration) for detailed steps.

## Architecture

```
tokens/ (source of truth)
  ↓
Style Dictionary
  ↓
generated/figma/
  ├── adapter/          # Style Dictionary → adapter JSON (legacy)
  ├── tokens/           # Style Dictionary → tokens JSON (general, all contexts)
  ├── app/              # App context only (app-default, app-accessibility)
  ├── website/          # Website context only (website-default, website-dark)
  ├── report/           # Report context only (report-print, report-screen)
  ├── snapshots/        # Figma plugin → snapshot (backup)
  └── migrations/       # scripts/figma → migration files
  ↓
Figma Plugin (with context validation)
  ↓
Figma Variables (context-specific)
```

**Context Separation:** Each context (app, website, report) has its own JSON file to prevent accidental cross-context imports. The plugin validates context match before importing.

## File Structure

### Plugin Code
- `figma-plugin/code.ts` - Main plugin logic
- `figma-plugin/ui.html` - Plugin UI
- `figma-plugin/applicator.ts` - Component applicator logic

### Scripts
- `scripts/figma/analyze-snapshot.mjs` - Analyze changes between snapshot and tokens
- `scripts/figma/generate-migration.mjs` - Generate migration file (future)

### Generated Artifacts
- `generated/figma/app/variables.tokens.scoped.json` - App context only (preferred for app files)
- `generated/figma/website/variables.tokens.scoped.json` - Website context only (preferred for website files)
- `generated/figma/report/variables.tokens.scoped.json` - Report context only (preferred for report files)
- `generated/figma/tokens/variables.tokens.scoped.json` - General file (all contexts, for legacy use)
- `generated/figma/tokens/variables.tokens.full.json` - Full tokens (alternative)
- `generated/figma/adapter/variables.adapter.json` - Adapter format (legacy, colors only)
- `generated/figma/snapshots/` - Snapshot backups
- `generated/figma/migrations/` - Migration files
- `generated/figma/structures/` - Component structures (frozen, not actively used)

## Workflows

### 1. Import Variables (Tokens → Figma)

**Purpose:** Import design tokens into Figma as Variables.

**Steps:**
1. Build tokens for your context:
   ```bash
   # For app context
   npm run tokens:build:figma:app
   
   # For website context
   npm run tokens:build:figma:website
   
   # For report context
   npm run tokens:build:figma:report
   
   # Or build all contexts at once
   npm run tokens:build:figma
   ```

2. Open Figma plugin: Plugins → Development → Envy UI Tokens Adapter
3. Go to "Variables" tab
4. Load JSON file: Click "Load JSON file" → Select the appropriate context file:
   - `generated/figma/app/variables.tokens.scoped.json` for app context
   - `generated/figma/website/variables.tokens.scoped.json` for website context
   - `generated/figma/report/variables.tokens.scoped.json` for report context
5. Prepare import: Click "Prepare import" → Review summary
   - **Context validation:** Plugin will check if the JSON context matches existing Variables in Figma
   - **Error if mismatch:** If contexts don't match, import will be blocked with an error message
6. Select default mode: Choose default mode (e.g., `app-default`)
7. Apply changes: Click "Apply changes"

**What happens:**
- Collections are created or reused (matched by name)
- Variables are created or updated (matched by path)
- Modes are created for each context+theme combination
- Values are set for all modes

**Context Validation:**
- Each JSON file contains a `system.context` field (`"app"`, `"website"`, or `"report"`)
- Plugin automatically detects the context of existing Variables in Figma by analyzing mode names
- **Import is blocked** if contexts don't match (e.g., trying to import `app` into a file with `website` Variables)
- **Warning is shown** if importing a general file (no context) into a context-specific file
- This prevents accidental cross-context imports and keeps Figma files clean

**Modes Structure:**
- `app-default`, `app-accessibility` (app context)
- `website-default`, `website-dark` (website context)
- `report-print`, `report-screen` (report context)

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

### 5. Generate Migration File

**Purpose:** Create migration file for automatic binding updates when token structure changes.

**Steps:**
1. **Create snapshot before changes:**
   - Open Figma plugin → "Snapshot" tab
   - Click "Create Snapshot"
   - Save snapshot file (copy JSON or download)

2. **Change token structure:**
   - Edit tokens in `tokens/` directory
   - Rename paths, delete variables, move between collections, etc.

3. **Build tokens:**
   ```bash
   npm run tokens:build
   ```

4. **Generate migration:**
   ```bash
   npm run figma:migration:generate
   ```
   Or specify snapshot:
   ```bash
   npm run figma:migration:generate -- 2025-12-30T19-57-48-snapshot.json
   ```

5. **Review migration file:**
   - Location: `generated/figma/migrations/YYYY-MM-DD-migration.json`
   - Check deleted variables and their fallbacks
   - Update fallbacks manually if needed (for variables without automatic fallback)

**Migration file contains:**
- Deleted variables with suggested fallbacks
- Moved variables (changed collection)
- Usage counts for each change
- Mappings for future rename support

### 6. Apply Migration

**Purpose:** Automatically update Figma Variable bindings when token structure changes.

**Complete Workflow:**

1. **Open Figma plugin:**
   - Plugins → Development → Envy UI Tokens Adapter
   - Go to "Migration" tab

2. **Load migration file:**
   - Click "Load Migration file"
   - Select `generated/figma/migrations/YYYY-MM-DD-migration.json`
   - Or paste migration JSON directly into textarea

3. **Prepare migration:**
   - Click "Prepare migration"
   - Review summary:
     - Total changes (deleted + moved)
     - Deleted variables count
     - Moved variables count
     - Usages affected
     - Variables requiring manual review

4. **Apply migration:**
   - Click "Apply Migration"
   - Wait for completion
   - Plugin will automatically:
     - Replace deleted variables with fallback variables in all bindings
     - Update bindings for moved variables
     - Remove old variables

**What happens during migration:**
- **Deleted variables:** All bindings using deleted variables are updated to use fallback variables
- **Moved variables:** Variables that changed collection are updated (description/name)
- **Bindings:** All node bindings (fills, strokes, numeric properties) are automatically updated
- **Old variables:** Deleted variables are removed from Figma

**Example:**

```
Before migration:
- Variable: eui.color.status.error (deleted)
- Used in: 5 components (Button, Alert, etc.)
- Fallback: eui.color.status.application.completed

After migration:
- All 5 components now use: eui.color.status.application.completed
- Old variable eui.color.status.error is removed
```

**Important notes:**
- Migration is **irreversible** - make sure you have a snapshot backup
- Variables requiring manual review should be checked before applying
- If fallback is not found, those bindings will be skipped (with warning)

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

### generate-migration.mjs

**Purpose:** Generate migration file from snapshot comparison.

**Usage:**
```bash
# Generate migration from latest snapshot
npm run figma:migration:generate

# Generate migration from specific snapshot
npm run figma:migration:generate -- 2025-12-30T19-57-48-snapshot.json
```

**Output:**
- Migration file in `generated/figma/migrations/YYYY-MM-DD-migration.json`
- Summary of changes (deleted, moved, added)
- Warnings for variables requiring manual review
- Suggested fallbacks for deleted variables

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

### Changing Token Structure (Complete Workflow)

**Full process from snapshot to migration:**

1. **Create snapshot (before changes):**
   - Open Figma plugin → "Snapshot" tab
   - Click "Create Snapshot"
   - Copy JSON or download file
   - Save to: `generated/figma/snapshots/YYYY-MM-DD-HHmmss-snapshot.json`

2. **Change tokens:**
   ```bash
   # Edit tokens in tokens/
   vim tokens/foundations/colors/brand.json
   # Or delete/rename variables, move between collections, etc.
   ```

3. **Build tokens:**
   ```bash
   npm run tokens:build
   ```

4. **Analyze changes (optional):**
   ```bash
   npm run figma:analyze
   # Shows what will be deleted, added, moved
   ```

5. **Generate migration:**
   ```bash
   npm run figma:migration:generate
   # Or specify snapshot:
   npm run figma:migration:generate -- 2025-12-30T19-57-48-snapshot.json
   ```

6. **Review migration file:**
   - Open: `generated/figma/migrations/YYYY-MM-DD-migration.json`
   - Check deleted variables and fallbacks
   - Update fallbacks manually if needed

7. **Import new tokens (IMPORTANT - do this first!):**
   - Open Figma plugin → "Variables" tab
   - Load: `generated/figma/tokens/variables.tokens.scoped.json`
   - Click "Prepare import" → "Apply changes"
   - **This creates new variables from updated tokens**
   - Without this step, migration won't find new variables to bind to!

8. **Apply migration (then update bindings):**
   - Open Figma plugin → "Migration" tab
   - Click "Load Migration file"
   - Select: `generated/figma/migrations/YYYY-MM-DD-migration.json`
   - Click "Prepare migration" → Review summary
   - Click "Apply Migration"
   - **All bindings are automatically updated!**

**Why this order matters:**
1. **Step 7 (Import):** Creates new variables in Figma from your updated tokens
2. **Step 8 (Migration):** Updates all existing bindings to use the new variables (or fallbacks)
3. **Result:** Your Figma file now uses the new token structure, all bindings are preserved!

**What happens:**
- New variables are created from updated tokens (step 7)
- Old bindings are updated to use new/fallback variables (step 8)
- Old variables are removed (step 8)

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

- [ADR-0027: Figma Files Structure and Organization](./../adr/ADR-0027-figma-files-structure-and-organization.md) — File structure, page organization, and Code Connect strategy
- [ADR-0025: Figma Variables Integration Strategy](./../adr/ADR-0025-figma-variables-integration-strategy.md) — Variables structure, modes, and export strategy
- [ADR-0003: Data-Driven Figma Variables Pipeline](./../adr/ADR-0003-data-driven-figma-variables-pipeline.md) — Adapter pipeline and plugin architecture
- [Generated Figma README](../../generated/figma/README.md)

