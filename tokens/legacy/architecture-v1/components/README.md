# Component Tokens Structure

## Root Directory
Visual tokens (used by CSS, Figma, Storybook):
- `colors.json` - Color tokens for the component
- `size.json` - Size/dimension tokens
- `spacing.json` - Spacing/padding tokens
- `typography.json` - Typography tokens
- `animation.json` - Animation/duration tokens
- Other visual property files (border, shadow, etc.)

These tokens are processed by Style Dictionary and included in generated CSS variables and Figma variables.

## Subdirectories
Non-visual metadata (for documentation, agents, future use):
- `behavior/` - Accessibility, keyboard navigation, interactions
  - `accessibility.meta.json` - ARIA roles, keyboard navigation patterns, screen reader support
- `metadata/` - Implementation details, usage analytics, etc.
  - `implementation.meta.json` - React hooks, DOM structure, file locations

**Note:** 
- Files in subdirectories use `.meta.json` extension to exclude them from Style Dictionary processing
- These files are **not** processed by Style Dictionary formats (CSS, Figma)
- They are excluded from visual token generation via `!tokens/**/*.meta.json` pattern in Style Dictionary config
- They are intended for documentation and agent consumption only

## Example Structure

```
tokens/app/components/side-nav/
  colors.json          # Visual token (processed by Style Dictionary)
  size.json            # Visual token (processed by Style Dictionary)
  spacing.json         # Visual token (processed by Style Dictionary)
  typography.json      # Visual token (processed by Style Dictionary)
  animation.json       # Visual token (processed by Style Dictionary)
  behavior/            # Non-visual metadata (excluded from Style Dictionary)
    accessibility.meta.json
  metadata/            # Non-visual metadata (excluded from Style Dictionary)
    implementation.meta.json
```

