# ADR-0015: Token-First Contract Layer and Renderer-Agnostic Model

**Status:** Accepted (Implemented)
**Date:** 2025-12-18
**Last Updated:** 2026-01-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**


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

## Implementation Notes

This ADR has been **fully implemented** with a sophisticated token-first contract layer that serves as the semantic bridge between tokens and multiple renderers:

### Current Implementation Status
- ✅ **Token-First Architecture**: Tokens established as single source of truth throughout the system
  - DTCG-compatible JSON tokens in `tokens/` directory structure
  - Centralized token management with Style Dictionary processing
  - Semantic geometry kept in tokens, not scattered across renderers

- ✅ **Explicit Contract Layer**: Automated contract generation interprets tokens and exposes bindings
  - `scripts/generate-contracts.ts` reads token JSON and emits TypeScript unions
  - Generated contracts in `generated/tsx/` provide semantic axes (intent, size, shape, states, slots)
  - Contracts expose variant mappings and naming conventions without implementation details

- ✅ **Renderer-Agnostic Component Models**: Contracts contain no renderer-specific logic
  - Pure semantic definitions: `ButtonIntent`, `ButtonSize`, `ButtonShape`, etc.
  - No React/ARIA/CSS specifics in contracts - technology-agnostic
  - Multiple renderers can consume same contracts for consistent semantics

- ✅ **Components as Opaque Executors**: Components apply bindings without owning naming logic
  - Button component imports generated contracts for type safety
  - Component applies semantic axes (intent/size/shape) via data attributes
  - No hardcoded class names or styling logic in component code

- ✅ **Human-Inspectable Generated Artifacts**: All generated files include detailed documentation
  - Auto-generated comments explain derivation process and source tokens
  - Contract files document how axes are extracted from token JSON
  - Clear audit trail from tokens → contracts → components

- ✅ **Declarative Modeling with Graceful Degradation**: Configuration-driven generation
  - `COMPONENTS` configuration object defines axes and sources
  - Static values for semantic slots not yet in tokens (startIcon, endIcon, label)
  - Migration path to code when declarative limits are reached

### Technical Realization
- **Contract Generation Process**: Node.js script reads token JSON, extracts semantic keys, generates TypeScript unions
- **Semantic Axes**: Intent (primary/secondary/accent), Size (sm/md/lg), Shape (default/round/circle), States (active/disabled/hover), Slots (label/startIcon/endIcon)
- **Renderer Independence**: Contracts used by CSS (data attributes), React Aria (props), and future renderers
- **Type Safety**: Generated contracts provide compile-time validation of component APIs
- **Scalability**: Configuration-based approach for adding new components to the contract system

### Architecture Benefits Achieved
- **Consistent Semantics**: All renderers share same semantic understanding via contracts
- **Reduced Heuristics**: No guessing of hidden CSS rules - contracts provide explicit bindings
- **Clear Separation**: Tokens (semantics) → Contracts (bindings) → Components (execution)
- **Auditable Artifacts**: Generated contracts support verification and alignment checking
- **Repeatable Pattern**: Contract-based approach established for future components

### Evolution Path
The contract layer enables:
- **Multi-Renderer Support**: CSS, React Aria, Web Components, Figma all share contracts
- **Component Portability**: Components free of naming decisions, improved reusability
- **Semantic Consistency**: Guaranteed alignment between different rendering implementations
- **Future Extensibility**: New renderers can consume existing contracts without changes

## Status

**Accepted (Implemented)** - Token-first contract layer and renderer-agnostic model fully implemented with automated contract generation, semantic type safety, and multi-renderer compatibility.
