# Design Tokens

This directory contains all design tokens for the Envy UI system.

## Structure

Tokens are organized by context:
- **app/**: Application context tokens
- **website/**: Website context tokens  
- **report/**: Report context tokens

Each context contains:
- **foundations/**: Base tokens (colors, spacing, typography, shape)
- **semantic/**: Semantic tokens (text, background, border, focus, shadow, shape, layout, typography)
- **components/**: Component-specific tokens
- **themes/**: Theme-specific overrides

## Token Resolution Order

1. Foundation Tokens (base values)
2. Semantic Tokens (semantic mappings)
3. Context Tokens (context-specific overrides)
4. Theme Tokens (theme-specific overrides)
5. Component Tokens (component-specific values)

