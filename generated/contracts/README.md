# Contracts (Token-Derived Component APIs)

Contracts are generated, token-derived artifacts that live under `generated/` to
align with the project's generative model. They provide literal unions and const
arrays for component APIs.

## How generation works
- Script: `scripts/generate-contracts.ts` (Node, CommonJS).
- Reads DTCG-compatible token JSON directly (no Style Dictionary).
- Each component has configured axes and JSON paths; keys at those paths become literal unions.
- No primitive resolution; only literal keys are emitted.
- Output is written to `generated/contracts/*.contract.ts` and is deterministic/idempotent.

## Adding a component
1. Extend `COMPONENTS` in `scripts/generate-contracts.ts` with axis configs:
   - `sources`: token files to read.
   - `path`: JSON path to the axis root.
   - `excludeKeys` (optional): keys to drop.
2. Run `node scripts/generate-contracts.ts`.
3. Import generated types/consts from `generated/contracts/<component>.contract.ts` in your component code.

## Extending axes safely
- Keep axes orthogonal (intent, size, shape, state, etc.).
- Avoid compound keys; each axis should map to direct children in the JSON.
- If token structure changes, update the axis config instead of hardcoding unions.

## Scope / Non-goals
- No JSX or component generation.
- No token mutation or reinterpretation.
- Not coupled to React/ARIA/Radix; purely TypeScript contracts.
