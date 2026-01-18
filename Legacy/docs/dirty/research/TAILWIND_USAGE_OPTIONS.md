# Tailwind Usage Options (Thinking Notes)

This note captures exploratory thinking about using Tailwind alongside a token-first system. It is not a decision.

## Goals

- Keep design tokens as the single source of truth.
- Allow optional convenience utilities without drifting from system rules.
- Avoid component styling divergence or hidden overrides.

## Options

### 1) Tailwind as a full token consumer

Tailwind utilities are generated from tokens (colors, spacing, typography, etc).

Pros:
- Utility classes stay aligned with tokens.
- Fast iteration for layout and prototypes.

Risks:
- Developers may overuse utilities instead of component contracts.
- Utility classes can dilute design-system intent if unconstrained.

### 2) Tailwind as a thin layout layer (recommended if used)

Use only layout/spacing utilities: margin, padding, gap, flex, grid, width, height, position.

Guardrails:
- Disable preflight to avoid global resets.
- Disable typography and color utilities.
- Avoid using utilities to override component internals.

Pros:
- Keeps tokens and component styles authoritative.
- Provides micro-adjustments where needed.

Risks:
- Still adds a parallel styling path if not constrained.

### 3) No Tailwind

Use only token-generated CSS and component classes (e.g., `eui-*`).

Pros:
- Maximum consistency and single styling approach.

Risks:
- Slower layout iteration for non-component scaffolding.

## Mapping Approach (if Tailwind is used)

- Generate Tailwind config from tokens (never hand-edit Tailwind values).
- Regenerate utilities when tokens change.
- Keep any Tailwind usage traceable to token scales.

## Open Questions

- Should Tailwind be allowed only in Storybook and dev-app?
- Do we need linting to prevent forbidden utilities?
- Should Tailwind be available only for specific contexts (app vs website/report)?

## Next Step (if adopted)

- Add a formal section in `docs/workflows/` with allowed utilities and guardrails.
- Keep Tailwind scripts documented as "optional consumer."
