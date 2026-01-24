# Component Examples

This directory contains HTML examples demonstrating the usage of EnvyUI v2 components built with the canonical architecture pattern.

## Available Components

### Button Component

**File:** [button.html](./button.html)

The button component follows the canonical architecture pattern established by the badge component, featuring:

- **Token-driven styling** via CSS custom properties
- **Data attribute-based API** for declarative component configuration
- **Three axes of variation:**
  - `data-eui-intent`: primary, secondary, accent, accent-finished, link
  - `data-eui-size`: sm, md, lg
  - `data-eui-shape`: default, round, circle
- **Three slots** for content composition:
  - `data-eui-slot="start-icon"`: Icon before label
  - `data-eui-slot="label"`: Button text
  - `data-eui-slot="end-icon"`: Icon after label
- **Complete state coverage:** normal, hover, focus, disabled, aria-disabled
- **Focus ring** with configurable color, width, and offset
- **Layout tokens** for flex behavior and white-space

### Avatar & Avatar Group Components

**File:** [avatar.html](./avatar.html)

Avatar and avatar-group components following the canonical architecture pattern, featuring:

#### Avatar Component

- **Token-driven styling** via CSS custom properties
- **Data attribute-based API** for declarative configuration
- **Two axes of variation:**
  - `data-eui-size`: sm (28px), md (32px), lg (40px)
  - `data-eui-role`: lead (optional, accent border)
- **Two content modes:**
  - Image slot: `<img>` for profile photos
  - Initials slot: `.eui-avatar-initials` for text fallback
- **Automatic sizing:** diameter, border, and font-size scale together
- **Theme-aware colors** for fallback background and text

#### Avatar Group Component

- **Overlapping layout** with configurable overlap amounts
- **Lead avatar support** with visual separation
- **Hover animations** (app/website contexts):
  - Hovered avatar scales up (1.1x)
  - Neighbors spread out using layout tokens
  - Smooth transitions using transition tokens
- **Context-aware behavior:**
  - Interactive animations in app/website contexts
  - Static display in report context (print-friendly)
- **Smart overlap logic:**
  - Standard overlap: 12px (dimension.3)
  - Lead separation: 8px (dimension.2)
  - Tight subgroup: 16px (dimension.4)

## Architecture

Each component follows this structure:

```
tokens/components/
  └── button.tokens.json       # Token definitions (JSON)
  └── button.contract.json     # Component contract (selectors, axes, vars)

generated/css/components/
  └── button.tokens.css        # Generated CSS custom properties

src/ui/
  └── button.css               # Component implementation CSS
```

### Token Layer

Component tokens define the design values:
- Size variations (sm, md, lg)
- Shape variations (default, round, circle)
- Intent/variant color combinations
- State definitions (disabled)
- Base properties (border, typography, focus, layout)

### Implementation Layer

Component CSS uses tokens via:
1. **Component variables** scoped to `[data-eui-context] .eui-button`
2. **Local variables** for size/shape overrides
3. **Data attribute selectors** for axes
4. **Pseudo-class selectors** for states

## Viewing Examples

To view the button component example:

1. Open `button.html` in a browser
2. Ensure the CSS imports resolve correctly (may need a local server)
3. Use the theme toggle button to test light/dark theme compatibility
4. Tab through buttons to test focus states
5. Hover over buttons to test hover states

## Adding New Components

To add a new component example:

1. Create tokens in `tokens/components/your-component.tokens.json`
2. Create contract in `tokens/components/your-component.contract.json`
3. Implement CSS in `src/ui/your-component.css`
4. Create HTML example in `examples/components/your-component.html`
5. Update this README

Follow the button and badge patterns for consistency.

## Related Documentation

- [TOKENS-001: Token System Tooling](../../docs/tokens/TOKENS-001-token-system-tooling.md)
- [TOKENS-002: Token Reference](../../docs/tokens/TOKENS-002-token-reference.md)
- [WORKFLOW-005: Tokens Workflow](../../docs/workflows/WORKFLOW-005-tokens-workflow.md)
- [Badge Component Tokens](../../tokens/components/badge.tokens.json)
- [Button Component Tokens](../../tokens/components/button.tokens.json)
- [Avatar Component Tokens](../../tokens/components/avatar.tokens.json)
- [Avatar Group Component Tokens](../../tokens/components/avatar-group.tokens.json)
