# generated/tokenstudio/

Purpose: Token Studio platform artifacts derived from tokens.
Source/workflow: `style-dictionary/config.js` platform `tokenstudio`.
Consumers/destinations: Token Studio import workflows.
Artifact types/roles: JSON export for Token Studio.

Producers
- `style-dictionary/config.js` platform `tokenstudio`

Expected artifacts
- `tokenstudio.json` (Token Studio export derived from tokens)

Regeneration
- `./node_modules/.bin/style-dictionary build --config style-dictionary/config.js --platform tokenstudio`
