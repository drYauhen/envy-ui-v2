# generated/figma/

Token-derived artifacts for Figma workflows live here. These outputs are produced
from `tokens/` via Style Dictionary and are treated as pipeline-generated data.

Producers
- `style-dictionary/config.js` platform `figma` (format `figma/adapter`)
- `style-dictionary/config.js` platform `figmaScoped` (format `figma/variables-scoped`)
- `style-dictionary/config.js` platform `pluginVariables` (format `figma/variables-full`)

Expected artifacts
- `variables.adapter.json` (adapter payload used by the Figma plugin import UI)
- `full/variables.tokens.json` (full variables payload)
- `scoped/variables.tokens.json` (scoped variables payload)

Regeneration
- `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform figma`
- `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform figmaScoped`
- `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform pluginVariables`
