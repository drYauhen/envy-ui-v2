# ADR-0014: Color Model, Tonal Scales, and Contextual Architecture

Status: Accepted  
Date: 2025-12-18  
Last Updated: 2025-12-26  
Owner: Eugene Goncharov  
Assistance: AI-assisted drafting (human-reviewed)

---

## Context

I needed the color system to move beyond the initial bootstrap palette so it could scale, remain inspectable, and stay future-proof for multiple consumption surfaces. The system must serve application UI first, while also accommodating printable/exported artifacts and potential multiple visual identities without destabilizing downstream layers. The previous shape lacked a clear tonal contract, making inspection and recalibration risky.

## Decision: Color Model Strategy

I adopted **OKLCH (Oklch Lightness Chroma Hue)** as the primary color model for foundation tokens. OKLCH provides perceptual uniformity, ensuring that equal steps in lightness appear equally different to the human eye. This makes tonal scales more predictable and visually consistent.

All foundation color tokens are stored in OKLCH format (e.g., `oklch(50% 0.20 220)`). The system generates CSS custom properties directly from OKLCH values, which modern browsers support natively. This approach ensures:
- Perceptually uniform color transitions
- Better visual distinction between tonal steps
- Future-proof color representation
- Direct browser support without conversion overhead

RGB/HEX values are treated as distribution formats only, used for compatibility with tools that don't support OKLCH yet.

## Decision: Tonal Scale and Gradation

I introduced a canonical tonal scale with steps 50, 100, 200, 300, 400, 500, 600, 700, 800, 900. The scale uses **asymmetric anchor points** optimized for application UI:

- **Brand colors**: **700 is the canonical anchor** (perceptually dark, suitable for primary actions)
- **Accent colors**: **600 is the canonical anchor** (Viking Blue, suitable for interactive elements)
- **Neutral colors**: Distributed with more light shades (50-300) for UI surfaces, fewer dark shades (800-900) for text

The entire scale is **generated programmatically from the anchor color** using OKLCH best practices:

1. **Anchor color is preserved exactly** as the reference tone (Brand-700, Accent-600)
2. **Lightness steps are adaptive** based on the anchor color's lightness:
   - For dark anchor colors (< 55% lightness): smaller steps for darkening (800-900) to avoid near-black values
   - For medium-dark anchor (55-65%): moderate steps
   - For light anchor (> 65%): standard steps
3. **Asymmetric distribution**: More steps in the lighter range (50-600) for UI surfaces, fewer in the darker range (700-900)
4. **Chroma follows a parabolic curve** (decreases at edges) for natural appearance
5. **Hue shifts slightly** at edges for more natural color transitions

The scale **expresses relative tonal positions, not strict linear mathematical steps**, and remains intentionally non-dogmatic so spacing can be adjusted over time without changing token shape.

**Special case: Neutral colors**
- Neutral scale is rebalanced with more light shades (50-300) for UI surfaces
- Neutral-50 is set to 98% lightness for very light backgrounds
- More granular steps for light shades (50-500), larger steps for dark shades (600-900)
- This reflects the need for more light color variations in UI design

**Related:** See [ADR-0026](./ADR-0026-app-default-color-positioning.md) for details on how these anchor colors align with app-default optimization.

## Decision: Layering and Aliasing

I set the layering model so base colors provide tonal scales only; semantic tokens reference those base colors via aliases; components never consume base colors directly. This separation keeps component APIs stable and allows base values to change without cascading refactors in semantic or component layers.

## Contexts, Profiles, and Themes (Forward-Looking)

I defined clear extension dimensions without implementing them yet:
- Contexts (e.g., application shell, content areas, print/export) describe environmental constraints.
- Profiles (e.g., screen, monochrome print, alternative outputs) describe how material may render within a context.
- Themes (visual identity within a context) may remap semantic tokens to express brand or look.

These dimensions remain intentionally unimplemented; they exist to guide future remapping of semantic tokens without redefining the base model.

## Implementation Details

**Tonal Scale Generation:**
- Automated scripts generate all scale levels from anchor colors:
  - `generate-tonal-scale-from-base-700.mjs` for brand colors (anchor: 700)
  - `generate-tonal-scale-from-base-600-accent.mjs` for accent colors (anchor: 600)
- Uses `culori` library for accurate OKLCH color space operations
- Adaptive step calculation based on anchor color lightness
- Asymmetric distribution with more light shades for UI surfaces
- Parabolic chroma reduction and slight hue shift for natural appearance

**Color Token Structure:**
- Foundation tokens: OKLCH values directly in token files
- Semantic tokens: reference foundation tokens via aliases
- Component tokens: reference semantic tokens, never foundation directly

**Component Usage:**
- Primary buttons use `brand.700` (via `brand.primary` semantic token)
- Accent buttons use `accent.600` (via `accent.primary` semantic token)
- This ensures components use the canonical anchor colors, optimized for application UI

**Related:** See [ADR-0026](./ADR-0026-app-default-color-positioning.md) for details on semantic token optimization for app-default.

## Consequences

- **Benefits**: 
  - Perceptually uniform color transitions using OKLCH
  - Scalable layering with clear separation of concerns
  - Safer recalibration of base values (change 500, regenerate scale)
  - Stable component surface insulated from base changes
  - Adaptive steps prevent near-black values for dark base colors
  - Brighter neutral palette provides more usable light shades
  - Future contexts/profiles/themes have defined hooks without disturbing current consumers
- **Trade-offs**: 
  - Requires modern browser support for OKLCH (Safari 15.4+, Chrome 111+, Firefox 113+)
  - Added abstraction up front with automated generation
  - Recalibration work relies on the established structure and generation script
- Documenting the intent and implementation reduces ambiguity when recalibration, alternate profiles, or multiple themes are introduced later. 
