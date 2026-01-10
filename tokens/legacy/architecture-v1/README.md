# Legacy Architecture v1

This directory contains the old flat token architecture that was replaced by the current contextual architecture.

## Original Structure
- `components/` - Component-specific tokens
- `themes/` - Theme overrides

## Why Legacy
This architecture was replaced by `tokens/contexts/**` which provides better separation of concerns:
- Raw layer for context-specific aliases
- Semantics layer for meaning-based tokens
- Themes layer for overrides

## Status
Preserved for historical reference and potential future migration needs. Not used in current render pipeline.
