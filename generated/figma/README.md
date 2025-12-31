# generated/figma/

Purpose: Figma platform artifacts derived from tokens and platform structures.
Source/workflow: Style Dictionary platforms `figma`, `figmaScoped`, `pluginVariables`; structures currently curated manually.
Consumers/destinations: Figma plugin workflows and Figma Variables import.
Artifact types/roles: Adapter payloads, variables payloads, and structures for Figma.

**For detailed workflow documentation, see:** [`docs/workflows/figma-workflow.md`](../../docs/workflows/figma-workflow.md)

Producers
- `style-dictionary/config.js` platform `figma` (format `figma/adapter`)
- `style-dictionary/config.js` platform `figmaScoped` (format `figma/variables-scoped`)
- `style-dictionary/config.js` platform `pluginVariables` (format `figma/variables-full`)
- Figma plugin (snapshots, migrations)

Expected artifacts
- `adapter/variables.adapter.json` (adapter payload used by the Figma plugin import UI - legacy, colors only)
- `tokens/variables.tokens.full.json` (full variables payload)
- `tokens/variables.tokens.scoped.json` (scoped variables payload - preferred for import)
- `structures/structures.eui.button.json` (structures payload for UI generation - frozen)
- `snapshots/` (Figma Variables snapshots created via plugin for migration tracking)
- `migrations/` (migration files for automated binding updates - future)

Regeneration
- `npm run tokens:build` (builds all token outputs)
- Or individually:
  - `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform figma`
  - `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform figmaScoped`
  - `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform pluginVariables`
