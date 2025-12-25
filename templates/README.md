# Hero Section Templates

This directory contains template configurations for CMS Hero Sections.

## Structure

Each template is defined as a JSON file following the `hero-section-schema.json` schema.

## Template Categories

- **centered** - Content centered horizontally and vertically
- **split** - Content and media side-by-side
- **minimal** - Minimalist design with focus on typography
- **full-width** - Full-width background with overlay content
- **video** - Video background with overlay
- **gradient** - Gradient background variations

## Usage

Templates are consumed by the CMS backend and rendered using the design system components.

### Backend Integration

```typescript
import heroConfig from './hero-centered-v1.json';

// Apply template to page
page.heroSection = heroConfig;
```

### Frontend Rendering

Templates are rendered using the HTML+CSS layer components:
- `eui-button` for CTAs
- Token system for colors, spacing, typography
- Responsive breakpoints from tokens

## Adding New Templates

1. Create a new JSON file following the schema
2. Add it to `system.manifest.json` under `templates.heroSection`
3. Create a Storybook story in `stories/templates/hero-section/`
4. Document responsive behavior and theme compatibility

## Responsive Behavior

All templates must define responsive behavior for:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

Layout automatically adapts based on breakpoints defined in the template.

