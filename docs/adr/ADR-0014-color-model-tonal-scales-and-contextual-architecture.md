# ADR-0014: Color Model, Tonal Scales, and Contextual Architecture

Status: Accepted  
Date: 2025-12-18  
Owner: Eugene Goncharov  
Assistance: AI-assisted drafting (human-reviewed)

---

## Context

I needed the color system to move beyond the initial bootstrap palette so it could scale, remain inspectable, and stay future-proof for multiple consumption surfaces. The system must serve application UI first, while also accommodating printable/exported artifacts and potential multiple visual identities without destabilizing downstream layers. The previous shape lacked a clear tonal contract, making inspection and recalibration risky.

## Decision: Color Model Strategy

I treated RGB as a distribution format only, not the conceptual source of truth. I designed the system to remain compatible with perceptual color models (e.g., OKLCH) so that future recalibration can be handled as infrastructure work rather than API change. The perceptual model is intentionally not exposed as a public surface. Current RGB values are derived representations that I may recalibrate later without breaking consumers. No immediate OKLCH implementation is required; the structure simply allows it.

## Decision: Tonal Scale and Gradation

I introduced a canonical tonal scale with steps 50, 100, 200, 300, 400, 500, 600, 700, 800, 900. I treat 500 as the reference/base tone for each family. The scale expresses relative tonal positions, not strict linear mathematical steps, and it remains intentionally non-dogmatic so spacing can be adjusted over time without changing token shape.

## Decision: Layering and Aliasing

I set the layering model so base colors provide tonal scales only; semantic tokens reference those base colors via aliases; components never consume base colors directly. This separation keeps component APIs stable and allows base values to change without cascading refactors in semantic or component layers.

## Contexts, Profiles, and Themes (Forward-Looking)

I defined clear extension dimensions without implementing them yet:
- Contexts (e.g., application shell, content areas, print/export) describe environmental constraints.
- Profiles (e.g., screen, monochrome print, alternative outputs) describe how material may render within a context.
- Themes (visual identity within a context) may remap semantic tokens to express brand or look.

These dimensions remain intentionally unimplemented; they exist to guide future remapping of semantic tokens without redefining the base model.

## Consequences

- Benefits: scalable layering, clearer inspection, safer recalibration of base values, and a stable component surface insulated from base changes. Future contexts/profiles/themes have defined hooks without disturbing current consumers.
- Trade-offs: added abstraction up front and deferred perceptual implementation; recalibration work will rely on the established structure rather than new schemas.
- Documenting the intent now reduces ambiguity when recalibration, alternate profiles, or multiple themes are introduced later. 
