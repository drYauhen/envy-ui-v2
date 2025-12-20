# generated/storybook/

Purpose: Storybook platform artifacts derived from tokens.
Source/workflow: `style-dictionary/config.js` platform `storybook`.
Consumers/destinations: Storybook UI and documentation.
Artifact types/roles: JSON data for Storybook visualizations.

Producers
- `style-dictionary/config.js` platform `storybook`

Expected artifacts
- `colors.json` (storybook color data derived from tokens)

Regeneration
- `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform storybook`
