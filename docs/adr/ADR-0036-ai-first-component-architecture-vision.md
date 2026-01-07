# ADR-0036: AI-First Component Architecture Vision

**Status:** Proposed (Evolutionary)  
**Date:** 2026-01-07  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**

- [ADR-0022](./ADR-0022-storybook-model-ai-agent-oriented-architecture.md) — Storybook Model as AI-Agent-Oriented Architecture Layer
- [ADR-0035](./ADR-0035-css-naming-conventions-class-names-vs-data-attributes.md) — CSS Naming Conventions - Class Names vs Data Attributes
- [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model

---

## Context

Design systems have traditionally been built for human developers. However, with the rise of AI code generation—both through IDE assistants (GitHub Copilot, Claude Code) and autonomous agents (v0, custom agents)—the primary consumer is shifting.

AI agents have different needs than human developers:
- **Machine-readable metadata** instead of prose documentation
- **Explicit contracts** instead of implicit conventions
- **Runtime queryable information** instead of static type analysis only
- **Discoverable patterns** and component relationships

Current state: Envy UI v2 has AI-friendly patterns (consistent naming, good TypeScript types, predictable structure) but lacks AI-first architecture (no machine-readable metadata layer, no explicit runtime contracts).

---

## Decision

This ADR establishes a **vision** for building Envy UI v2 as an AI-first component library while maintaining excellent ergonomics for human developers.

### The Vision

**1. Machine-Readable Metadata**
- Component variants discoverable at runtime
- Prop types queryable (not just TypeScript static analysis)
- Common patterns explicitly documented
- Component relationships clear

**2. Explicit Contracts**
- Variant enums exported as const arrays
- Component metadata accessible at runtime
- Story metadata includes AI-oriented information
- Composition patterns documented

**3. Predictable Patterns**
- One clear way to do things (minimize ambiguity)
- Consistent naming conventions (per ADR-0035)
- Token-driven design (per ADR-0015)
- Separation of concerns (structure vs behavior)

**4. Discoverable by Design**
- Components self-describe their capabilities
- Examples show common patterns
- Accessibility requirements explicit
- Token usage documented

### Pragmatic Implementation Path

This vision will be achieved incrementally through four phases:

**Phase 1: Type Export Strategy (Quick Wins)**
- Export variant enums as const arrays
- Create lightweight component registry
- Make types runtime-queryable
- Pilot with Button, Divider components

**Phase 2: Story Metadata Enhancement**
- Add aiMetadata to story parameters
- Document common patterns
- Include accessibility guidance
- Link to token usage

**Phase 3: Composition Patterns**
- Document component relationships
- Provide real-world examples
- Based on actual usage, not theory

**Phase 4: Evolution & Documentation**
- Evaluate what worked
- Update this ADR based on learnings
- Update or supersede ADR-0022
- Expand to more components

---

## Rationale

### Why AI-First?

**IDE Assistants Need Context**
- Autocomplete for variant values (`ButtonIntents.map(...)`)
- Inline documentation and type hints
- Pattern recognition to suggest correct usage
- Type safety for confident code generation

**Autonomous Agents Need Structure**
- Queryable metadata to discover available components
- Explicit contracts to understand component capabilities
- Common pattern examples to inform generation
- Component relationships to enable correct composition

**Both Need Predictability**
- Consistent patterns reduce ambiguity
- Clear conventions enable confidence
- One way to do things minimizes decision points
- Explicit contracts prevent incorrect usage

### Why Pragmatic/Incremental?

**Learn as We Go**
- Theory vs practice often differ
- Real usage informs better patterns than speculation
- Avoid over-engineering before we understand the problem
- Ship fast, iterate, measure impact

**Low Maintenance Burden**
- Single source of truth (types are the source, not duplicated metadata)
- No complex build steps or code generation
- Leverages existing infrastructure (Storybook)
- Minimal additional overhead

**Evolutionary Approach**
- Start small, expand based on value
- Common sense over rigid rules
- ADRs evolve with learnings
- Pragmatism over dogma

### Why Not ADR-0022 Exactly?

ADR-0022 outlined a comprehensive vision with `storybook-model/` JSON schemas and a global manifest. It was well-thought-out but:

**Never Validated**
- Proposed separate directory structure and JSON schemas
- No pilot implementation to test assumptions
- Unknown maintenance burden in practice
- Unclear developer ergonomics

**Pragmatic Approach Validates Incrementally**
- Phase 1 ships immediately with minimal overhead
- Each phase tests assumptions with real usage
- Can pivot based on learnings
- Evolves based on what actually works

**Original Vision Still Informs**
- ADR-0022's intent guides this pragmatic approach
- May implement parts of ADR-0022 if they prove valuable
- Will update ADR-0022 based on learnings

---

## Consequences

### Benefits

**For IDE Assistants:**
- Autocomplete for variants
- Better IntelliSense
- Pattern suggestions
- Type safety

**For Autonomous Agents:**
- Runtime-queryable metadata
- Explicit contracts
- Common pattern discovery
- Component relationship understanding

**For Developers:**
- Consistent patterns
- Clear conventions
- Low maintenance
- Good ergonomics

**For System:**
- Incremental evolution
- Learning-based improvements
- Flexible to change
- Pragmatic over theoretical

### Trade-offs

- Slightly more exports (const arrays for variants)
- Additional metadata in stories (optional)
- Registry file to maintain (lightweight)
- Evolutionary approach means iterative updates

### Open Questions

The following will be answered through implementation and real-world usage:
- What is the optimal metadata format?
- How to balance completeness with maintenance burden?
- How much metadata is "enough"?
- Best approach for component relationship modeling?

---

## Implementation Roadmap

### Phase 1 (Week 1): Type Export Strategy
- Export variant const arrays in Button, Divider
- Create `src/ui/registry.ts` with lightweight metadata
- Update exports in `src/ui/index.ts`
- Validate with actual usage

### Phase 2 (Week 2-3): Story Metadata
- Add `aiMetadata` to Button, Divider stories
- Document common patterns
- Include accessibility info
- Test with AI agents

### Phase 3 (Week 4): Composition Patterns
- Document 5-10 common patterns
- Based on real story usage
- Add to registry as `compositionPatterns`

### Phase 4 (After Pilots): Evolution
- Evaluate what worked
- Update this ADR based on learnings
- Update or supersede ADR-0022
- Expand to more components

---

## Relationship to ADR-0022

### ADR-0022 Vision
- Comprehensive JSON schemas
- Separate `storybook-model/` directory
- Global manifest with AI workflow
- Strict rules about component usage

### ADR-0036 Pragmatic Adaptation
- Incremental type export strategy
- Metadata in existing story files
- Lightweight registry (no separate directory)
- Learn what rules actually help

### Status of ADR-0022
- Remains "Proposed (Exploratory)"
- Will be updated or superseded after ADR-0036 pilots complete
- Original vision informs pragmatic approach
- Common sense over rigid implementation

---

## Evolution Philosophy

**This ADR is intentionally flexible:**

**1. Vision over Specification**
- Describes intent, not exact implementation
- Allows learning and adaptation
- Acknowledges we don't have all answers yet

**2. Pragmatism over Dogma**
- Real-world usage trumps theoretical perfection
- Maintenance burden matters
- Developer ergonomics essential

**3. Iterative Improvement**
- Ship, measure, learn, adapt
- Update ADR based on actual experience
- Pivot if assumptions prove wrong

**4. Common Sense Priority**
- If something doesn't work, change it
- Don't follow rules blindly
- Context matters more than consistency for its own sake

---

## Notes

**Why "Evolutionary" Status?**

This ADR is marked as "Proposed (Evolutionary)" to signal that it will change. As we implement and learn:
- We may discover better approaches
- Trade-offs may shift
- Maintenance burden may be different than expected
- Real-world usage will inform refinement

This is intentional. The goal is to document a pragmatic vision that evolves with practice.

**For Future Implementers**

When implementing phases 1-4:
- Measure actual maintenance burden
- Test with real AI agents
- Document what works
- Update this ADR with learnings

This ensures future decisions are based on experience, not theory.
