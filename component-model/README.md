# Component Model (Renderer-Agnostic)

This layer defines components in a renderer-neutral way so CSS, Figma, and future engines project the same architecture.

## Schema highlights
- **Anatomy**: parts/slots with ownership and optionality.
- **Geometry**: token references for dimensions, spacing, radii, borders, dividers (no raw numbers).
- **Variants**: exclusive or combinable axes.
- **Rules**: declarative behaviors (e.g., stacked removes internal borders).

## Button example
- Parts: root, content, startIcon, endIcon, separator (owned by the next segment).
- Geometry: height, padding, gap, radius, border width/style/color, separator inset/thickness — all token-linked.
- Variants: intent, size, shape, stacked.
- Rules: stacked mode preserves perimeter borders, removes internal borders, separator owned by the following button; default layout contract (no grow/shrink, no wrap).

## Applying to other components
- Inputs/tabs/segmented controls can declare their anatomy (root, thumb, track, tab, indicator), geometry via tokens, and rules (e.g., when selected → indicator visible).
- Renderers consume the same model to emit CSS, Figma frames, or other outputs without guessing hidden decisions.
