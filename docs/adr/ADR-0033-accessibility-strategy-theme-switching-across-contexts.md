# ADR-0033: Accessibility Strategy for Theme Switching Across Contexts

**Status:** Proposed  
**Date:** 2026-01-05  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  

- [ADR-0017](./ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture for Contexts and Themes  
- [ADR-0023](./ADR-0023-token-organization-context-and-theme-separation.md) — Token Organization - Context and Theme Separation  
- [ADR-0029](./ADR-0029-accessibility-architecture-and-decision-framework.md) — Accessibility Architecture and Decision Framework  
- [ADR-0031](./ADR-0031-contrast-strategy-dynamic-colors-on-color-tokens.md) — Contrast Strategy for Dynamic Colors and On-Color Tokens  

---

## Context

The system is designed to support many contexts; today, three contexts are expected (app, website, report), each with different accessibility expectations:

- **App:** Dense, high-utility UI with lighter compliance pressure today.
- **Website:** Public-facing output with stronger accessibility expectations and compliance risk.
- **Report:** Generated documents (print/PDF) that may require strict compliance (e.g., PDF/UA).

The product benefits from a consistent, token-driven workflow across all contexts, rather than separate accessibility strategies per context. At the same time, default UI aesthetics and density are a priority for the app context, and overly aggressive accessibility defaults can degrade usability in dense interfaces.

Theme switching must therefore:
- Preserve an elegant default experience.
- Offer a clear, higher-accessibility alternative.
- Avoid breaking layout when sizes or contrasts change.

---

## Decision

I decided to define a baseline theme spectrum as a starting point across contexts:

1. **Default theme** prioritizes aesthetic clarity and dense information layout.
2. **Accessibility theme** prioritizes compliance and cognitive clarity, even at the cost of density.

This baseline is a practical minimum, not a hard requirement. Contexts may add more themes when needed, but aligning on the same baseline keeps the workflow consistent when components span multiple contexts.

### Core Rules

- **A two-theme baseline is recommended** for each context when feasible.
- **Additional themes are allowed** per context as requirements evolve.
- **Accessibility themes are opt-in** and should not redefine the core layout structure.
- **Token scaling should be constrained** to interactive components and focus/contrast tokens.
- **Layout containers should remain stable** across themes; scaling is not applied to layout primitives by default.
- **Cognitive accessibility is supported** via clear labels, explicit state indications, and reduced reliance on color-only cues.

### Implementation Mechanics (Baseline)

- **Interactive scale factor:** define a dedicated scale factor used only for interactive component sizing in accessibility themes (e.g., a token like `eui.scale.interactive`). This prevents global layout drift while improving hit targets.
- **Tokenized size model:** interactive sizes (height, padding, thumb size, focus ring width, etc.) must resolve through tokens that can be multiplied by the interactive scale factor per theme.
- **Stable layout primitives:** containers, grids, and page shells do not consume the interactive scale factor. This avoids cascading layout breakage when the accessibility theme is enabled.
- **Theme-scoped overrides:** accessibility themes override interactive tokens and focus/contrast tokens without redefining component structure.

---

## Rationale

### Consistent Workflow
Maintaining a unified theme strategy across contexts avoids divergent implementation paths and reduces long-term maintenance risk.

### Future Compliance
Regulatory requirements may expand for any context. Providing accessibility themes everywhere ensures readiness without retrofitting.

### Predictable Theming
Limiting scale changes to interactive components preserves layout stability and prevents "pixel-fit" layouts from breaking on theme switch.

### Cognitive Clarity
Accessibility includes cognitive needs, not just screen reader support. Providing clearer state signals and labels supports a wider audience.

---

## Consequences

### Benefits
- A unified, token-driven baseline strategy across app, website, and report contexts.
- Clear separation between aesthetic default UI and compliance-oriented variants (when used).
- Reduced risk of layout breakage when accessibility tokens change.

### Trade-offs
- Additional token sets to maintain for each context where extra themes are introduced.
- Increased validation burden when switching themes.
- Some UI density is intentionally reduced in accessibility themes.

### Implementation Notes
- Introduce constrained scaling tokens for interactive sizes and focus rings (per context).
- Keep layout primitives (grid, container, page) stable across themes.
- Ensure all components tolerate accessibility scaling without requiring per-instance adjustments.
- Validate theme switches with automated visual checks to catch layout regressions early.

---

## Notes

This ADR establishes the cross-context strategy. Component-level accessibility patterns remain defined by ADR-0029 and the Accessibility Reference.
