# Design Tokens

This directory contains all design tokens for the Envy UI system.

## Structure

Tokens are organized by context:
- **app/**: Application context tokens
- **website/**: Website context tokens  
- **report/**: Report context tokens

Each context contains:
- **foundations/**: Base tokens (colors, spacing, typography, shape, dimension)
- **semantic/**: Semantic tokens (text, background, border, focus, shadow, shape, layout, typography)
- **components/**: Component-specific tokens
- **themes/**: Theme-specific overrides

## Token Resolution Order

1. Foundation Tokens (base values)
2. Semantic Tokens (semantic mappings)
3. Context Tokens (context-specific overrides)
4. Theme Tokens (theme-specific overrides)
5. Component Tokens (component-specific values)

## Foundation Tokens Overview

### Dimension Scale
A numeric scale (0-20) for component sizing following a 4px grid system:
- Rem-based values calculated relative to context base font size (app: 14px base)
- Used for component heights, widths, icon sizes
- Numeric naming provides predictable progression (dimension.0, dimension.1, ... dimension.20)
- Separate from spacing scale (which uses named tokens: xs, sm, md, lg for layout/padding/margin)

**Common dimension mappings** (in app context):
- `dimension.7` = 28px (small avatars, compact controls)
- `dimension.8` = 32px (medium avatars, icon buttons)
- `dimension.10` = 40px (large avatars, standard buttons)
- `dimension.11` = 44px (navigation items, touch targets)
- `dimension.12` = 48px (large buttons, headers)

