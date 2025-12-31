# ADR-0022: Storybook Model as AI-Agent-Oriented Architecture Layer

**Status:** Proposed (Exploratory)  
**Date:** 2025-12-25  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  
- [ADR-0008](./ADR-0008-tsx-layer-react-aria-and-storybook-layering.md) — TSX Layer (React Aria) and Storybook Layering  
- [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model  
- [ADR-0012](./ADR-0012-interactive-components-evolution-layered-architecture-and-contexts.md) — Interactive Components Evolution, Layered Architecture and Contexts  
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
- All story elements must use Envy UI components for structure, layout, and styling
- Component model (`component-model/`) is renderer-agnostic and doesn't contain Storybook-specific concerns (helpers, demonstration patterns, story rules). This requires a separate layer for Storybook-specific configuration.

**Motivation:**

Envy UI v2 aims to be predictable and self-documenting for both human developers and AI agents. Storybook stories must:

- Use only Envy UI components for structure (no inline styles for layout/spacing)
- Follow consistent patterns across all components
- Be predictable for AI agents to generate
- Serve as both documentation and validation layer

This requires a **separate Storybook Model layer** that extends the component model with Storybook-specific concerns while maintaining separation from renderer-agnostic component definitions.

**Future Considerations:**

The Storybook Model establishes patterns and structure that may inform future system evolution. The architecture could potentially support extension beyond technical tokens to UX tokens and design principles, and may facilitate AI-assisted workflows. These are exploratory directions, not current commitments.

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
- Storybook model provides **declarative configuration** with explicit rules about which Envy UI components to use
- This makes story generation predictable and unambiguous for AI agents

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
- Envy UI components ensure consistent spacing, typography, and layout across all stories

**2. Maintainability**
- Envy UI components centralize styling through tokens
- Changes to design system propagate automatically through components

**3. Validation**
- Stories using Envy UI components validate that components work together correctly
- Stories serve as both documentation and test layer — they should use real components

**4. AI Agent Predictability**
- Clear, unambiguous rules prevent inconsistent behavior

### Why Require Asking User When Component Missing?

**1. Maintains System Integrity**
- System should use only Envy UI components — no exceptions
- Missing components indicate gap in system that should be addressed

**2. AI Agent Clarity**
- Unambiguous error handling prevents agents from making architectural decisions

### Examples

**Example 1: Switch with Label**

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
      "description": "Use eui-form-field with data-eui-label-position='inline' for switch with label"
    }
  }
}
```

**Example 2: Skeleton in Card**

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
- Declarative configuration with explicit rules makes story generation predictable
- Unambiguous error handling guides agent behavior

**2. Consistency Across Stories**
- All stories use Envy UI components for structure, ensuring consistent spacing, typography, and layout patterns

**3. Maintainability**
- Changes to design system propagate automatically through Envy UI components
- Clear separation of concerns simplifies maintenance

**4. System Integrity**
- Stories validate component integration
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

**3. Initial Setup Effort**
   - Storybook model files need to be created for each component
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
   - Use `eui-form-field` with inline label position
   - Ensure all structure uses Envy UI components

**4. Iterate and Improve**
   - Test approach with Switch
   - Refine storybook-model structure based on learnings
   - Update storybook.manifest.json with improved rules
   - Document patterns and best practices

**5. Scale to Other Components**
   - Apply validated patterns to other components
   - Create storybook-model files for each component
   - Ensure all stories use storybook-model patterns

### Future Considerations

**1. Validation Tooling**
   - Linter to check stories against storybook-model
   - CI check to ensure stories use only Envy UI components
   - Automated detection of inline styles (except allowed exceptions)

**2. Story Generation**
   - Automated story creation based on component-model + storybook-model
   - Validation that generated stories follow rules

**3. Documentation**
   - Storybook model serves as documentation for demonstration patterns
   - Clear examples of how to structure stories for each component
   - Guidelines for creating new storybook-model files

**4. Potential Future Evolution**

The structured patterns established in Storybook Model may inform future system expansion, potentially supporting extension beyond technical tokens to UX tokens and design principles, and facilitating AI-assisted workflows. These are exploratory considerations, not current commitments.

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

The storybook-model is not a replacement for component-model — it extends it with Storybook-specific concerns while maintaining clear separation of concerns. Both layers work together: component-model defines what the component is, storybook-model defines how to demonstrate it in Storybook.

**Evolution and Changes:** This initial model serves as a starting point. Changes and refinements are expected as the system matures and learnings from practice inform what works best.


