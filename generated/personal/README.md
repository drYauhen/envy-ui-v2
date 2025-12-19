# generated/personal/

This directory contains artifacts produced by personal utilities in `personal/`.
These outputs are for developer convenience and inspection, not the core pipeline.

Producers
- `personal/export-local-files.js`
- `personal/export-raw-links.js`

Expected artifacts
- `local-files.json` (list of non-ignored files under the repo)
- `raw-links.json` (raw GitHub URLs for tracked files)

Regeneration
- `node personal/export-local-files.js`
- `node personal/export-raw-links.js`
