# generated/figma/

Purpose: Figma platform artifacts derived from tokens and platform structures.
Source/workflow: Style Dictionary platforms `figma`, `figmaScoped`, `pluginVariables`; structures currently curated manually.
Consumers/destinations: Figma plugin workflows and Figma Variables import.
Artifact types/roles: Adapter payloads, variables payloads, and structures for Figma.

Producers
- `style-dictionary/config.js` platform `figma` (format `figma/adapter`)
- `style-dictionary/config.js` platform `figmaScoped` (format `figma/variables-scoped`)
- `style-dictionary/config.js` platform `pluginVariables` (format `figma/variables-full`)

Expected artifacts
- `adapter/variables.adapter.json` (adapter payload used by the Figma plugin import UI)
- `tokens/variables.tokens.full.json` (full variables payload)
- `tokens/variables.tokens.scoped.json` (scoped variables payload)
- `structures/structures.eui.button.json` (structures payload for UI generation)

Regeneration
- `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform figma`
- `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform figmaScoped`
- `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform pluginVariables`
