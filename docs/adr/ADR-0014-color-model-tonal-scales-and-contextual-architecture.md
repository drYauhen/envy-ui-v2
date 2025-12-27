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

I introduced a canonical tonal scale with steps 50, 100, 200, 300, 400, 500, 600, 700, 800, 900. I treat **500 as the reference/base tone** for each color family. The entire scale is **generated programmatically from the base 500 color** using OKLCH best practices:

1. **Base 500 is preserved exactly** as the reference tone
2. **Lightness steps are adaptive** based on the base color's lightness:
   - For dark base colors (< 55% lightness): smaller steps for darkening (600-900) to avoid near-black values
   - For medium-dark base (55-65%): moderate steps
   - For light base (> 65%): standard steps
3. **Chroma follows a parabolic curve** (decreases at edges) for natural appearance
4. **Hue shifts slightly** at edges for more natural color transitions

The scale **expresses relative tonal positions, not strict linear mathematical steps**, and remains intentionally non-dogmatic so spacing can be adjusted over time without changing token shape.

**Special case: Neutral colors**
- Neutral 500 is set to 65% lightness (lighter than typical 50%) to provide a brighter, more usable light palette
- More granular steps for light shades (50-500), larger steps for dark shades (600-900)
- This reflects the need for more light color variations in UI design

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
- Automated script (`generate-tonal-scale-from-base-v2.mjs`) generates all scale levels from base 500
- Uses `culori` library for accurate OKLCH color space operations
- Adaptive step calculation based on base color lightness
- Parabolic chroma reduction and slight hue shift for natural appearance

**Color Token Structure:**
- Foundation tokens: OKLCH values directly in token files
- Semantic tokens: reference foundation tokens via aliases
- Component tokens: reference semantic tokens, never foundation directly

**Component Usage:**
- Primary buttons use `brand.500` (via `brand.primary` semantic token)
- Accent buttons use `accent.500` (via `accent.primary` semantic token)
- This ensures components use the base reference tone, not darker variants

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
