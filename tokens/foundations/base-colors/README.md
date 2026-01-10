# Base Colors Layer

This directory contains the foundational base colors that serve as the source for generating tonal color scales. These are the "source of truth" colors that define the core color palette.

## Architecture

### Base Colors (This Layer)
- **Direct OKLCH values** - no references or aliases
- **Single color per file** - each represents one core color
- **Position metadata** - indicates where the color sits in generated scales

### Generated Scales (`../colors/`)
- **Algorithmically generated** from base colors using scripts
- **50-900 tonal scales** created from base anchors
- **Context-aware** - can be overridden by themes

## File Structure

```
base-colors/
├── accent.json    # Viking Blue - targets position 600
├── brand.json     # Brand primary - targets position 700
└── neutral.json   # Neutral gray - targets position 500
```

## Base Color Schema

Each base color file follows this structure:

```json
{
  "eui": {
    "color": {
      "accent": {
        "$value": "oklch(68% 0.15 237)",
        "$type": "color",
        "$description": "Viking Blue - base color for accent scale generation",
        "position": 600
      }
    }
  }
}
```

## Generation Scripts

- `generate-tonal-scale-from-base-600-accent.mjs` - Creates accent 50-900 from accent base
- `generate-tonal-scale-from-base-700-brand.mjs` - Creates brand 50-900 from brand base
- `generate-tonal-scale-from-base-neutral.mjs` - Creates neutral 50-900 from neutral base

## Benefits

1. **Clean separation** - Base colors vs generated scales
2. **Algorithmic generation** - Consistent, mathematically-derived scales
3. **Easy maintenance** - Change one base color, update entire scale
4. **No circular references** - Generation scripts work with direct values
5. **Flexible positioning** - Base colors can target different scale positions

## Workflow

1. Update base color values in this directory
2. Run generation scripts to update `../colors/` scales
3. Run `npm run tokens:build` to regenerate CSS/JSON outputs
4. Test in Storybook to verify visual results