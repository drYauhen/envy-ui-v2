# ADR-0015: Token-First Contract Layer and Renderer-Agnostic Model

**Status:** Accepted  
**Date:** 2025-12-18  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  

---

## Context

The system evolved from token-fed CSS components into a layered architecture where tokens are the primary source of truth, contracts interpret tokens, and components execute bindings. Recent commits introduced renderer-agnostic component models and generated-but-readable artifacts (contracts, templates) between tokens and runtime code so future renderers can share semantics without inferring from CSS heuristics.

## Decision

I decided to formalize a token-first architecture with an explicit Contract layer and renderer-agnostic component models: tokens stay the single source of truth; contracts interpret tokens and expose bindings (class/data naming, variant mappings) without components owning naming; components remain opaque executors that apply bindings; generated artifacts (contracts, reference templates) are human-inspectable; reference/master templates are metadata-linked verification artifacts; declarative modeling allows limited conditionals with graceful degradation to native code when complexity grows.

## Rationale

- Token primacy avoids divergent renderer interpretations and keeps geometry centralized.  
- Contracts separate semantic binding from execution logic, enabling multiple renderers to share intent.  
- Components stay free of naming decisions, improving portability.  
- Bind-based contracts let components apply bindings without understanding semantics.  
- Readable generated artifacts support auditing and alignment.  
- Reference templates provide baselines without runtime coupling.  
- Allowing declarative models with a migration path to code preserves simplicity while handling complexity.

## Consequences

- Benefits: consistent semantics across renderers, reduced heuristics, clearer separation of concerns, auditable generated artifacts, and a repeatable contract-based pattern for new components.  
- Trade-offs: extra layers (contracts/templates) to maintain and discipline to keep components free of naming; some behaviors will move to code when declarative limits are hit.  
- Renderers (CSS, Figma, future engines) can reconstruct components from tokens + contracts + component model without guessing hidden rules.
