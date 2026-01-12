# ADR-0039: Focus Ring Geometry Canon v1

**Status:** Accepted (v1)

**Date:** 2026-01-15

**Owner:** Eugene Goncharov

**Related:**
- [ADR-0006](./ADR-0006-focus-policy-architecture.md) — Focus policy architecture
- [ADR-0007](./ADR-0007-focus-token-separation-and-policy-mapping.md) — Token separation and policy mapping
- [Component CSS Architecture](../architecture/component-css-architecture.md) — Focus state patterns

---

## Decision Summary

This ADR establishes the **canonical v1 focus ring geometry**.

- **Focus ring width:** 2px
- **Focus ring offset:** 2px
- **Geometry is fixed** across all components (no base/accessible split)
- **Accessibility is achieved by color contrast**, not geometry
- **Policy affects color only**:
  - Default (theme) focus color for mouse and keyboard
  - System focus color for keyboard when `data-eui-focus-policy="system"` is active
  - Mouse focus remains visible (never suppressed)
- **Rendering pattern:** box-shadow with a gap using `--eui-color-background-surface`

## Rationale

1. Consistent focus geometry improves scanability and visual stability.
2. WCAG 2.2 AA compliance is achievable via contrast and color, without thicker rings.
3. Policy-driven color differences preserve accessibility modes while keeping layout stable.

## Implementation Notes

**Tokens**
- `--eui-color-focus-ring` — theme-driven focus color
- `--eui-color-system-focus` — system focus color (orange)
- `--eui-focus-ring-width` — 2px
- `--eui-focus-ring-offset-default` — 2px

**CSS Pattern**
```css
/* Theme focus */
:focus {
  box-shadow:
    0 0 0 var(--eui-focus-ring-offset-default) var(--eui-color-background-surface),
    0 0 0 calc(var(--eui-focus-ring-offset-default) + var(--eui-focus-ring-width))
      var(--eui-focus-ring-color);
}

/* Keyboard focus with policy-driven color */
:focus-visible {
  box-shadow:
    0 0 0 var(--eui-focus-ring-offset-default) var(--eui-color-background-surface),
    0 0 0 calc(var(--eui-focus-ring-offset-default) + var(--eui-focus-ring-width))
      var(--eui-focus-ring-color-keyboard);
}
```

## Future Revision Note

If real-world usage shows insufficient visibility or usability issues, this canon may be revisited. Until then, **geometry is fixed for v1**.
