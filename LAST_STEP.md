## Session Snapshot (Editable Section)

**Last updated:** 2025-12-20

### Context

This session focused on enforcing token-first usage and documenting the runtime rules for token consumption.
The work was not feature-oriented; it addressed correctness in component styles and contract examples.

### What was done

- Aligned runtime button CSS with token usage rules:
  - Removed literal fallbacks and fixed token name mismatches.
  - Routed size/shape/layout/focus values through token variables.
  - Updated group-position corner tokens to generated names.
- Updated HTML + CSS Button contract to use token variables (no literal sizes/colors).
- Updated focus policy to use the system focus token.
- Added `docs/architecture/token-usage-rules.md` as a normative rulebook.
- Ran `npm run tokens:build`, `npm run figma:build`, and `npm run storybook:build`.

### Why it matters

These changes reduce token drift, eliminate silent fallbacks, and make the token contract explicit.
They also establish a shared reference for future audits and enforcement.

### Open context / notes

- Decide how to handle remaining non-token literals in runtime CSS (e.g. transparent/white/black in state mixes).
- Consider whether to introduce tokens for those values or document explicit exceptions.
