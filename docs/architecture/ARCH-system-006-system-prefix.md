# System Prefix

**Document ID:** ARCH-system-006-system-prefix
**Status:** Draft
**Date:** 2026-01-15
**Last Updated:** 2026-01-14
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Architecture Rules (Binding)
**Related:**


---

Definition
- System Prefix is the single canonical prefix for the system (currently `eui`).

Rule
- The token JSON root key must match the System Prefix.
- The token JSON root key must match the System Prefix across all contexts.
- Context token directories (`tokens/contexts/app`, `tokens/contexts/website`, `tokens/contexts/report`) do not match the prefix; they are environment scopes. The old `web` name is deprecated and renamed to `website` (legacy artifacts may exist under `tokens/legacy/contexts/web`).

Flows
- Semantic flow: token folder structure + JSON root define canonical token paths.
- Runtime flow: CSS variables, data attributes, and class names derive from System Prefix.

Consequences
- Generators may hardcode the root name and assume it matches the System Prefix.
- Runtime layers derive selectors from System Prefix; CSS remains build-time.
- Changing the prefix requires updating the token JSON root key and regenerating all artifacts.
