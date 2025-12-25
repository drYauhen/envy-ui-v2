# ADR-0017: Layered Token Architecture for Contexts and Themes

**Status:** Accepted  
**Date:** 2025-12-20  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  
- [ADR-0014](./ADR-0014-color-model-tonal-scales-and-contextual-architecture.md) — Color Model, Tonal Scales, and Contextual Architecture  
- [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model

---

## Context

The UI system serves a corporate-level application as its primary destination, but the application contains three distinct sub-contexts with different visual requirements:

1. **Application Shell** - The main application UI (primary destination)
2. **Website/CMS** - Content management system generating semi-static websites (may be previewed within the application or deployed standalone)
3. **Report Builder** - Static reports primarily intended for printing, but also available digitally

Each context requires different visual expressions:
- Application needs standard UI components
- Websites may use different brand colors and shapes (different themes per brand)
- Reports need print-optimized styling (monochrome, grayscale, or color print variants)

The goal is to maintain **one codebase, one syntax** for components while allowing visual appearance to be controlled by **context + theme** combination. Programmers should not think about styling; they use the same component API, and the visual output adapts based on the context and theme applied.

## Decision

I decided to implement a **layered token architecture** with the following hierarchy and resolution order:

```
Foundation → Semantic → Context → Theme → Component
```

**Structure:**
- **Foundations** - Base color scales, dimensions (neutral, brand, accent families). Shared across all contexts, context-agnostic.
- **Semantic** - Semantic tokens (text, background, border, focus) that reference foundations. Define "what" not "where".
- **Contexts** - Context-specific overrides of semantic tokens:
  - `app/` - Application shell semantic overrides
  - `website/` - Website/CMS semantic overrides  
  - `report/` - Report semantic overrides
- **Themes** - Theme-specific overrides within a context (only override what changes):
  - `app/default.json`, `app/dark.json`
  - `website/brand-a.json`, `website/brand-b.json`
  - `report/print.json`, `report/screen.json`
- **Components** - Component tokens reference semantic tokens, may have context-specific variants if needed.

**Resolution Priority:**
1. Foundation tokens provide base values
2. Semantic tokens reference foundations (can be context-neutral defaults)
3. Context tokens override semantic tokens for that context
4. Theme tokens override semantic tokens within that context
5. Component tokens reference semantic tokens (inherit context/theme via semantic layer)

**Universal Implementation Across All Layers:**
The context+theme architecture must work at **all implementation layers**, from the lowest to the highest:

- **HTML + CSS layer** - Static reports or generated sites using only HTML and CSS. Context and theme are applied via CSS custom properties and `[data-eui-context]` / `[data-eui-theme]` attributes. No JavaScript required.

- **TSX + React Aria layer** - Application UI using TypeScript and React. Same CSS-based context/theme mechanism; components remain unaware of context/theme.

- **Future layers** (e.g., Web Components) - Any future implementation layer must work with the same low-level mechanism. The architecture is anchored at the CSS/variable level, not in JavaScript/TypeScript logic.

This ensures that:
- Static reports (HTML+CSS only) can use the full context+theme system
- The same component code works across all layers
- Adding new implementation layers doesn't require re-architecting context/theme
- The solution is technology-agnostic and universal

## Rationale

**Why layered over full duplication:**
- **Maintainability** - Changes to foundations propagate through the system. Adding a new token doesn't require updating every context+theme combination.
- **Scalability** - Adding a new theme only requires overriding what differs, not duplicating the entire token set.
- **Clarity** - Clear separation of concerns: foundations are neutral, contexts define environment constraints, themes express visual identity within constraints.

**Why context base + theme overrides:**
- **Consistency** - Each context has a base semantic mapping (e.g., app has its default text colors). Themes within that context only modify what needs to differ.
- **Predictability** - Developers know that context defines the base appearance; themes are variations, not replacements.
- **Flexibility** - Can have context-specific defaults that make sense for that environment (e.g., report defaults to print-optimized), while still allowing theme variations.

**Why this over simpler alternatives:**
- Full duplication (each context+theme = complete token set) creates too much maintenance burden and duplication
- Pure foundation-only approach doesn't account for context-specific needs (e.g., reports need different text contrast than apps)
- Theme-only approach without contexts doesn't separate environment constraints from visual identity

**Alignment with existing architecture:**
- Compatible with current token structure (foundations → semantic → components)
- Extends existing `[data-eui-context]` CSS pattern (already demonstrated with focus policy)
- Maintains token-first principle (components don't know about contexts/themes)
- Anchored at the CSS/custom properties level, making it universal across all implementation layers
- Works with static HTML+CSS (no JavaScript dependency) while scaling to TypeScript/React and future technologies

## Consequences

**Benefits:**
- Single codebase, multiple visual outputs based on context+theme
- Maintainable structure with minimal duplication
- Clear extension path: new contexts or themes only override what differs
- Semantic tokens remain stable; contexts/themes remap them
- Components stay context-agnostic (they reference semantic tokens)

**Trade-offs:**
- Added complexity in token resolution (need to understand layering)
- Requires discipline to keep foundations context-neutral
- Theme files may become large if many semantic tokens need overrides
- Build pipeline needs to handle context/theme resolution

**Next Steps:**
- Design token file structure for contexts and themes
- Define resolution/merge strategy for Style Dictionary
- Implement CSS variable injection based on `[data-eui-context]` and `[data-eui-theme]`
- Create Storybook examples showing same component in different context+theme combinations
- Document token override patterns and best practices

**Future Considerations:**
- May need component-level context overrides if semantic layer isn't sufficient
- Theme switching mechanism needs to be performant (CSS variable remapping vs. class swapping)
- Consider theme inheritance (e.g., dark theme extends default theme and only overrides dark-specific values)

