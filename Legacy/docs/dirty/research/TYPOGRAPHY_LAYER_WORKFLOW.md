# Typography Layer Workflow

**Date:** 2026-01-04  
**Status:** Draft notes (in progress)

## Scope

Finish the typography token layer for NVUI v2 and apply it across Storybook stories so all rendering uses the library styles (no ad-hoc inline styling).

## Intent

- Use Storybook as a readiness check for NVUI typography.
- Ensure typography tokens cover application needs and mature design-system standards.
- Replace story-level styling with library typography styles/components.

## Assumptions (to confirm)

- Source of truth for typography is the tokens layer (Style Dictionary).
- App font family and scale already exist in tokens or can be standardized.
- Storybook should render using NVUI typography without custom inline styles.
- App context uses a stable primary font (Source Sans Pro) as the default baseline.
- Website and Report contexts may require dynamic, client-defined font stacks.

## Open Questions

- Which text styles are required (display, H1–H6, body, body-strong, caption, label, code, overline)?
- Should typography tokens be context-specific (app/website/report) or shared?
- What is the preferred scale: modular scale, fixed steps, or custom values?
- Should letter-spacing/line-height be tokenized per style or derived?
- How do we handle code typography (mono font) across stories?

## Context Notes

### App Context

- Primary font is **Source Sans Pro** (stable baseline for application UI).
- App typography should be consistent and predictable; alternate fonts are not a priority now.

### Website Context

- Typography should support dynamic, client-defined font stacks.
- Expect wide variation across templates (similar to CMS/WordPress theme systems).
- Potential future requirement: auto-generating typography token layers per client/theme.

### Report Context

- Typography may vary per report template and compliance requirements.
- Must support accessibility and standards (e.g., PDF/UA, WCAG/AA, VC/VSAC as applicable).
- Anticipate multiple font stacks and rule sets depending on output constraints.

## Decision (Draft)

- **App baseline font:** Source Sans Pro (with Source Sans 3 fallback, then system UI stack).

## Inventory (Current Status)

- **Foundation typography tokens:**
  - `tokens/app/foundations/typography/` (8 files: font-family, font-size, font-weight, etc.)
  - `tokens/website/foundations/typography/`
  - `tokens/report/foundations/typography/`

- **Semantic typography tokens (reorganized):**
  - `tokens/app/semantic/typography/headings.json` - heading.1-6 hierarchy
  - `tokens/app/semantic/typography/titles.json` - title.lg/md/sm variants
  - `tokens/app/semantic/typography/body.json` - body.* + bodyStrong.* styles
  - `tokens/app/semantic/typography/labels.json` - label.* + caption + overline
  - `tokens/app/semantic/typography/code.json` - code.base/small styles

- **Generated outputs:**
  - `generated/css/tokens.css`
  - `generated/storybook/colors.json`
  - `schemas/dtcg-2025.10-schema.json` - Local DTCG validation schema

- **Token viewers:**
  - Enhanced with resolved values display
  - Metadata integration for actual token outputs

## Related Drafts

- `docs/dirty/TYPOGRAPHY_TEXT_STYLE_MAPPING.md` (component mapping and semantic roles)

## Proposal (Draft)

### 1) Define Typography Tokens

- Foundations:
  - font families (primary, monospace)
  - font sizes (scale)
  - line heights
  - font weights
  - letter spacing

- Semantic styles:
  - display / h1–h6
  - body / body-strong
  - caption / label / overline
  - code

### 2) Generate CSS & Storybook Outputs

- Ensure Style Dictionary exports typography tokens into:
  - CSS variables
  - Storybook-friendly JSON (if needed)

### 3) Apply Typography in Storybook

- Replace inline styles in stories with:
  - NVUI typography classes (preferred), or
  - NVUI typography components (if available)
- Enforce typography at the preview wrapper level:
  - `body` or `.sb-preview-wrapper` uses NVUI base typography class

### 4) Validation

- Visual audit across sections (Docs, Tokens, Components)
- Check accessibility: contrast, line-height, spacing
- Compare against app UI (baseline parity)

## Decisions Needed

- Final list of required text styles and naming
- Whether typography tokens live under each context or shared across all contexts
- Whether to ship a `Typography` component layer or only CSS classes

## Done / Notes

- [ ] Typography token layer defined
- [ ] Generated CSS updated
- [ ] Storybook uses only NVUI typography
- [ ] Story-level inline typography styles removed
