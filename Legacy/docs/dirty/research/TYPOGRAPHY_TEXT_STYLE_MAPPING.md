# Typography Text Style Mapping

**Date:** 2026-01-04  
**Status:** Draft notes (in progress)

## Purpose

Define a practical, component-oriented mapping of text styles for the App context. This keeps semantics (HTML tags) separate from visual size and weight, and provides a consistent baseline for stories.

## Principles

- **Semantics first:** Use correct HTML tags for structure and accessibility.
- **Style is separate:** Visual size/weight can differ from the tag level.
- **Small, consistent set:** Prefer a limited set of roles with size variants.
- **Regular + Semibold are primary:** Bold is reserved for rare emphasis.

## Style Roles (App Baseline)

- **heading**: page/section hierarchy (sizes: xl, lg, md, sm)
- **title**: component/section headers (sizes: lg, md, sm)
- **body**: main text (sizes: lg, md, sm)
- **label**: form labels and UI labels (sizes: md, sm)
- **caption**: helper/fine print (size: sm)
- **code**: inline + block code (sizes: base, sm)
- **overline**: optional; can be replaced by `label-sm` if not needed

## HTML Semantics vs Visual Size

Examples:
- A collapsible section header can be `h3` semantically but use `title-sm` visually.
- A page subsection might be `h2` semantically but use `heading-md` visually.

## Component Mapping (App)

### Form Components

- **Form title (page level):** `heading-lg` (semibold)
- **Section title (collapsible header):** `title-md` (semibold)
- **Section meta/metrics:** `label-sm` or `caption`
- **Field label:** `label-md` (semibold)
- **Field value (input text):** `body-md`
- **Placeholder text:** `body-md` with reduced contrast
- **Helper / fine print:** `caption`
- **Validation error:** `caption` (semibold) + error color

### Buttons / Interactive

- **Button label (primary/secondary):** `label-md` (semibold)
- **Button label (small):** `label-sm` (semibold)
- **Chip / tag label:** `label-sm`

### Tables

- **Table header:** `label-sm` (semibold)
- **Table cell text:** `body-sm` or `body-md` depending on density
- **Table caption/footnote:** `caption`

### Navigation

- **Side nav section title:** `label-sm` (semibold)
- **Side nav item:** `body-sm` or `body-md`
- **Top bar title:** `title-md` (semibold)
- **Breadcrumbs:** `label-sm`

### Cards / Panels

- **Card title:** `title-sm` or `title-md`
- **Card subtitle:** `body-sm`
- **Card body:** `body-md`
- **Card meta:** `caption`

### Status / System Text

- **Badge text:** `label-sm` (semibold)
- **Tooltip text:** `caption` or `body-sm`
- **Toast title:** `label-md` (semibold)
- **Toast body:** `body-sm`

## Weights (Default)

- **Regular (400)**: body, caption, most content
- **Semibold (600)**: headings, titles, labels, buttons
- **Bold (700)**: rare emphasis only

## Open Questions

- Do we need a dedicated `overline` role, or is `label-sm` sufficient?
- Should `heading-xl` exist, or is `display` needed separately?
- Do we need `body-lg` for marketing pages, or keep it App-only?
- How should code typography be applied in components vs docs?

## Next Steps

- Typography tokens are now organized in focused files instead of monolithic `text-styles.json`:
  - `tokens/app/semantic/typography/headings.json` - heading.1-6 hierarchy
  - `tokens/app/semantic/typography/titles.json` - title.lg/md/sm variants
  - `tokens/app/semantic/typography/body.json` - body.* + bodyStrong.* styles
  - `tokens/app/semantic/typography/labels.json` - label.* + caption + overline
  - `tokens/app/semantic/typography/code.json` - code.base/small styles

- Token viewers now display resolved values alongside references for better developer experience
- DTCG schema validation now uses local schema to avoid external dependency issues
- Apply the mapping to key stories to validate against real UI

