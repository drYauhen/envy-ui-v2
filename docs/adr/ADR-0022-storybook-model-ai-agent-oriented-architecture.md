# ADR-0022: Storybook Model as AI-Agent-Oriented Architecture Layer

**Status:** Proposed (Exploratory)  
**Date:** 2025-12-25  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  
- [ADR-0008](./ADR-0008-tsx-layer-react-aria-button-and-storybook-layering.md) — TSX Layer (React Aria) Button v1 and Storybook Layering  
- [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model  
- [ADR-0012](./ADR-0012-button-evolution-layered-architecture-and-contexts.md) — Button Evolution, Layered Architecture and Contexts  
- [ADR-0017](./ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture for Contexts and Themes

---

## Context

Envy UI v2 uses Storybook as both **documentation layer** and **test layer** — stories demonstrate component usage while validating functionality through real-world patterns. The system follows a **token-first, layered architecture** where:

- **Tokens** are the single source of truth
- **Component Model** (`component-model/`) defines renderer-agnostic component anatomy, geometry, variants, and rules
- **Multiple implementation layers** (HTML+CSS, TSX, Web Components) project tokens into different runtimes
- **Storybook** serves as the primary interface for component documentation and validation

**Current State:**
- Storybook stories exist for multiple components across different layers
- Stories use a mix of approaches: some use Envy UI components, others use inline styles for layout/structure
- Temporary solutions (e.g., `eui-switch-wrapper`, `eui-checkbox-wrapper`) were created when universal form structures didn't exist
- No clear rules for AI agents when creating stories — leading to inconsistent patterns and workarounds

**Problem Statement:**

1. **Inconsistent Story Structure:** Stories use inline styles for layout, spacing, and structure instead of Envy UI components, creating technical debt and inconsistency
2. **Temporary Solutions Proliferation:** Component-specific wrappers (e.g., `eui-switch-wrapper`) duplicate functionality that should be provided by universal form structures (e.g., `eui-form-field`)
3. **Unpredictable AI Agent Behavior:** When AI agents create stories, there are no clear rules about:
   - Which Envy UI components to use for demonstration structure
   - What to do when a needed component doesn't exist
   - Whether inline styles are acceptable and in what cases
4. **Lack of Separation of Concerns:** Component model (`component-model/`) is renderer-agnostic and doesn't contain Storybook-specific concerns (helpers, demonstration patterns, story rules)

**Motivation:**

Envy UI v2 is designed for **AI-agent-oriented development** — the system should be predictable and self-documenting for both human developers and AI agents. Storybook stories must:

- Use only Envy UI components for structure (no inline styles for layout/spacing)
- Follow consistent patterns across all components
- Be predictable for AI agents to generate
- Serve as both documentation and validation layer

This requires a **separate Storybook Model layer** that extends the component model with Storybook-specific concerns while maintaining separation from renderer-agnostic component definitions.

**Long-term Vision — Generative Design Foundation:**

The Storybook Model represents a **low-level foundation** for future system evolution toward **generative design**. While the current implementation focuses on Storybook story generation, this architecture serves as a foundational layer for:

- **Higher-level token system expansion:** Moving beyond technical design tokens to UX tokens, design principles tokens (e.g., Pareto Principles, Gestalt effects), and semantic design rules
- **Generative design capabilities:** Enabling AI/LLM models to generate design solutions using Envy UI as a design system foundation
- **Specialized engine integration:** Connecting specialized design engines and LLM models that understand design principles, UX patterns, and user experience rules
- **Beyond Storybook:** Extending the model-driven approach to full generative design workflows, where the system can generate complete UI solutions based on requirements, constraints, and design principles

The current Storybook Model is a **primitive first step** — a proof of concept that establishes patterns, structure, and AI-agent interaction models. It serves as a **foundation for understanding** how to evolve the system toward true generative design capabilities, where Envy UI becomes not just a component library, but a generative design system powered by AI.

---

## Decision

This ADR establishes a **Storybook Model layer** (`storybook-model/`) as a parallel structure to `component-model/`, with the following architecture:

**Note:** This is an **initial/starting model** — not a final architecture. The structure, rules, and patterns described here are the starting point and will evolve based on learnings from pilot implementation and real-world usage. Changes and refinements are expected as the system matures.

### 1. Separation of Concerns

- **`component-model/`** — Renderer-agnostic component definitions (anatomy, geometry, variants, rules). Used by CSS, Figma, and future renderers.
- **`storybook-model/`** — Storybook-specific configuration (helpers, demonstration patterns, story rules). Used only for Storybook story generation.

Each component has:
- `component-model/{component}.json` — Renderer-agnostic model
- `storybook-model/{component}.storybook.json` — Storybook-specific model (references component-model)

### 2. Storybook Model Structure

Each `{component}.storybook.json` contains:

- **`componentName`** — Must match component-model name
- **`componentModel`** — Reference to `component-model/{component}.json`
- **`helpers`** — Envy UI components to use for story structure:
  - `container` — Main container component (e.g., `eui-card`)
  - `layout` — Layout helpers (section, row, column)
  - `wrapper` — Wrapper for component with label (e.g., `eui-form-field` for switch/checkbox)
  - Component-specific helpers as needed
- **`stories`** — Optional story-specific helper overrides
- **`rules`** — Component-level rules (what's forbidden, what's allowed)

### 3. Global Storybook Manifest

A global `storybook.manifest.json` defines:

- **Universal rules** — Forbidden/allowed patterns (no inline styles for layout, etc.)
- **Universal helpers** — Fallback helpers if component-specific helpers aren't defined
- **AI agent workflow** — Step-by-step process for agents when creating stories
- **Error handling** — What to do when components are missing

### 4. Rules for Story Creation

**Forbidden:**
- Inline styles for layout (flex, grid, positioning)
- Inline styles for spacing (margin, padding, gap)
- Inline styles for typography (font-size, font-weight, line-height)
- Inline styles for colors (background, color, border-color)
- Temporary workarounds (component-specific wrappers that duplicate universal functionality)

**Allowed:**
- Width/height constraints for demo purposes (e.g., `width: '400px'` for card) with comments explaining purpose
- Temporary placeholders with explicit TODO comments and issue references

**Component Usage:**
- Use only Envy UI components from helpers
- If helper component doesn't exist: **ASK USER** (never create inline styles as workaround)
- Follow component-model for component structure, storybook-model for demonstration structure

---

## Rationale

### Why Separate Storybook Model from Component Model?

**1. Separation of Concerns**
- Component model is **renderer-agnostic** — it must work for CSS, Figma, Web Components, and future renderers
- Storybook concerns (helpers, demonstration patterns) are **Storybook-specific** and shouldn't pollute renderer-agnostic definitions
- This separation maintains the component model's universality while providing Storybook-specific guidance

**2. Predictability for AI Agents**
- AI agents need **explicit rules** about which Envy UI components to use
- Component model doesn't (and shouldn't) contain Storybook-specific information
- Storybook model provides **declarative configuration** that agents can read and follow

**3. Scalability**
- As the system grows, Storybook-specific patterns can evolve independently from component model
- New demonstration patterns can be added to storybook-model without affecting renderer-agnostic definitions
- Universal helpers can be defined once and reused across components

**4. Maintainability**
- Clear separation makes it obvious where to look for Storybook-specific concerns
- Component model remains focused on renderer-agnostic semantics
- Storybook model can evolve based on Storybook-specific needs

### Why Prohibit Inline Styles?

**1. Consistency**
- Inline styles create inconsistency — different stories use different approaches
- Envy UI components ensure consistent spacing, typography, and layout across all stories

**2. Technical Debt**
- Inline styles are hard to maintain and update
- Changes to design system require updating multiple inline style instances
- Envy UI components centralize styling through tokens

**3. Validation**
- Stories using Envy UI components validate that components work together correctly
- Stories with inline styles don't validate component integration
- Stories serve as both documentation and test layer — they should use real components

**4. AI Agent Predictability**
- Clear rule: "Use Envy UI components, no inline styles" is easy for agents to follow
- Ambiguous rules ("sometimes inline styles are OK") lead to inconsistent behavior

### Why Require Asking User When Component Missing?

**1. Prevents Technical Debt**
- Creating inline styles as workaround accumulates technical debt
- Asking user ensures proper solution (create component or skip demonstration)

**2. Maintains System Integrity**
- System should use only Envy UI components — no exceptions
- Missing components indicate gap in system that should be addressed, not worked around

**3. AI Agent Clarity**
- Clear error handling: "Component missing → ask user" is unambiguous
- Prevents agents from making architectural decisions (creating workarounds)

### Examples of the Problem and Solution

**Example 1: Switch with Label**

**Problem (Current):**
```tsx
// Temporary solution - duplicates form-field functionality
<label className="eui-switch-wrapper">
  <input type="checkbox" className="eui-switch" />
  <span className="eui-label">Label</span>
</label>
```

**Solution (With Storybook Model):**
```tsx
// Uses universal form structure
<div className="eui-form-field" data-eui-label-position="inline">
  <input type="checkbox" className="eui-switch" data-eui-slot="input" />
  <span className="eui-label" data-eui-slot="label">Label</span>
</div>
```

**Storybook Model Configuration:**
```json
{
  "componentName": "switch",
  "helpers": {
    "wrapper": {
      "component": "eui-form-field",
      "variant": "inline",
      "description": "Use eui-form-field with data-eui-label-position='inline' for switch with label. DO NOT use eui-switch-wrapper (deprecated)."
    }
  }
}
```

**Example 2: Skeleton in Card**

**Problem (Current):**
```tsx
// Inline styles for layout
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
  <div className="eui-skeleton" data-eui-variant="text"></div>
</div>
```

**Solution (With Storybook Model):**
```tsx
// Uses Envy UI components
<div className="eui-card" data-eui-variant="elevated">
  <div className="eui-skeleton-group">
    <div className="eui-skeleton" data-eui-variant="text"></div>
  </div>
</div>
```

**Storybook Model Configuration:**
```json
{
  "componentName": "skeleton",
  "helpers": {
    "container": {
      "component": "eui-card",
      "variant": "elevated",
      "description": "Use eui-card to demonstrate skeleton loading states within a card context"
    }
  }
}
```

---

## Consequences

### Benefits

**1. Predictability for AI Agents**
- Clear rules and structure make story generation predictable
- Agents can read storybook-model and follow explicit guidelines
- Error handling is unambiguous (ask user, don't create workarounds)

**2. Consistency Across Stories**
- All stories use Envy UI components for structure
- Consistent spacing, typography, and layout patterns
- Stories serve as both documentation and validation

**3. Maintainability**
- Changes to design system propagate automatically through Envy UI components
- No need to update multiple inline style instances
- Clear separation of concerns (component-model vs storybook-model)

**4. System Integrity**
- Stories validate that components work together correctly
- No temporary solutions that duplicate functionality
- Missing components are identified and addressed, not worked around

**5. Scalability**
- New components can follow established patterns
- Universal helpers can be reused across components
- Storybook model can evolve independently from component model

### Trade-offs

**1. Additional Layer to Maintain**
- Storybook model is an additional layer that must be kept in sync with component model
- Requires discipline to maintain separation of concerns
- Initial setup effort for each component

**2. Stricter Rules**
- Prohibition of inline styles may require creating helper components that might not be needed otherwise
- Some edge cases might require exceptions (handled through explicit rules and comments)

**3. Migration Effort**
- Existing stories with inline styles need to be migrated
- Temporary solutions (wrappers) need to be removed and replaced with universal structures
- This is a one-time effort that improves long-term maintainability

### Next Steps (Exploratory Phase)

**1. Create Storybook Model Infrastructure**
   - Create `storybook-model/` directory structure
   - Define `storybook-model/schema.json`
   - Create `storybook.manifest.json` with global rules and universal helpers

**2. Pilot Implementation (Switch Component)**
   - Create `storybook-model/switch.storybook.json`
   - Reference `component-model/switch.json`
   - Define helpers (container, wrapper, layout)
   - Define rules (no inline styles, use eui-form-field, etc.)

**3. Validate Approach**
   - Rewrite `stories/components/switch.stories.tsx` using storybook-model
   - Remove `eui-switch-wrapper` (deprecated)
   - Use `eui-form-field` with inline label position
   - Remove all inline styles for layout/spacing

**4. Iterate and Improve**
   - Test approach with Switch
   - Refine storybook-model structure based on learnings
   - Update storybook.manifest.json with improved rules
   - Document patterns and best practices

**5. Scale to Other Components**
   - Apply validated patterns to other components
   - Create storybook-model files for each component
   - Migrate existing stories to use storybook-model
   - Remove temporary solutions across the system

### Future Considerations

**1. Validation Tooling**
   - Linter to check stories against storybook-model
   - CI check to ensure stories use only Envy UI components
   - Automated detection of inline styles (except allowed exceptions)

**2. Story Generation**
   - AI agents can generate stories from storybook-model
   - Automated story creation based on component-model + storybook-model
   - Validation that generated stories follow rules

**3. Documentation**
   - Storybook model serves as documentation for demonstration patterns
   - Clear examples of how to structure stories for each component
   - Guidelines for creating new storybook-model files

**4. Generative Design Evolution**
   - **Current State:** Storybook Model is a low-level foundation for predictable AI-agent interaction
   - **Future Expansion:** Extend token system to higher-level UX tokens and design principles:
     - UX tokens (user experience patterns, interaction models)
     - Design principles tokens (Pareto Principles, Gestalt effects, accessibility rules)
     - Semantic design rules (composition rules, layout principles, visual hierarchy)
   - **Generative Design Integration:**
     - Connect specialized design engines and LLM models
     - Enable AI-driven design generation using Envy UI as foundation
     - Move beyond Storybook to full generative design workflows
     - Generate complete UI solutions based on requirements, constraints, and design principles
   - **Architectural Foundation:** The patterns, structure, and AI-agent interaction models established in Storybook Model serve as the foundation for understanding how to evolve the system toward true generative design capabilities

---

## Status

* Document type: **Architecture Decision / Exploratory Analysis**
* Status: **Proposed (Exploratory)** — early-stage analysis, pilot phase
* **Initial Model:** This represents the starting architecture — not a final, immutable design. The model will evolve based on:
  - Learnings from pilot implementation (Switch component)
  - Real-world usage patterns
  - Feedback from AI agent interactions
  - System growth and new requirements
* Subject to validation through pilot implementation (Switch component)
* Will be updated and refined based on learnings from pilot and ongoing usage

---

## Notes

This document should:
- Be revisited after pilot implementation (Switch component)
- Guide decisions about storybook-model structure and rules
- Serve as reference for understanding AI-agent-oriented architecture goals
- Be updated when storybook-model moves from exploratory to implemented status
- Inform migration strategy for existing stories with inline styles

The storybook-model is not a replacement for component-model — it extends it with Storybook-specific concerns while maintaining clear separation of concerns. Both layers work together: component-model defines what the component is, storybook-model defines how to demonstrate it in Storybook.

**Evolution and Changes:** This initial model serves as a starting point. As the storybook-model is implemented and used, improvements are expected to be discovered, rules refined, helper patterns adjusted, and the structure evolved. Changes are not only expected but encouraged as the system matures and learnings from practice inform what works best.

**Foundation for Generative Design:** The Storybook Model is not just about Storybook — it represents the first primitive steps toward establishing a foundation for generative design. The patterns, structure, and AI-agent interaction models developed here will inform how the system evolves beyond technical design tokens to higher-level UX tokens, design principles, and ultimately, true generative design capabilities where Envy UI serves as a foundation for AI-driven design generation.

