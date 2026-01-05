# Scripts Reference

This document lists the root-level npm scripts and how they are intended to be used.

## Conventions

- Run scripts from the repository root unless noted otherwise.
- Use `npm run <script>` (examples below).
- Some scripts are helpers used by other scripts (not typically run directly).
- Keep `package.json` scripts grouped by domain and update this reference on any script change.

## Summary

Script groups: Documentation, ADRs, Tokens, Tailwind, Icons, Figma, Dev App, Storybook, Vitest.

## Documentation

- `docs:copy`: Copy docs assets into `public/docs/` for Storybook.
- `docs:watch`: Watch docs and re-run `docs:copy`.
- `docs:validate`: Validate docs links against the registry and Storybook ids.

## ADRs

- `adr:generate`: Generate ADR story files from `adr-list-data.ts`.
- `adr:validate`: Validate ADR consistency and link mapping.

## Tokens

- `tokens:build`: Build tokens via Style Dictionary.
- `tokens:build:tokenstudio`: Build Token Studio export (legacy/experimental; may be broken).
- `tokens:build:figma`: Build Figma outputs for all contexts.
- `tokens:build:figma:app`: Build Figma outputs for app context.
- `tokens:build:figma:website`: Build Figma outputs for website context.
- `tokens:build:figma:report`: Build Figma outputs for report context.
- `tokens:copy-readme`: Copy tokens README to public docs.
- `tokens:generate-docs`: Generate token reference docs.
- `tokens:generate-metadata`: Generate token metadata files.
- `tokens:generate-types`: Generate token TypeScript types.
- `tokens:generate-vscode`: Generate VS Code CSS data.
- `tokens:validate`: Validate token usage.
- `tokens:watch`: Watch tokens and rebuild on changes.
- `tokens:full`: Run the full token pipeline (build + generate + validate).

## Tailwind

- `tailwind:generate-config`: Generate Tailwind config from tokens.
- `tailwind:watch`: Watch tokens and regenerate Tailwind config.

## Icons

- `icons:normalize`: Normalize SVG icon inputs.
- `icons:generate`: Generate icon assets and metadata.
- `icons:process`: Normalize + generate icons.

## Figma

- `figma:build`: Build the Figma plugin bundle.
- `figma:analyze`: Analyze Figma snapshot output.
- `figma:migration:generate`: Generate Figma variable migration maps.

## Dev App (root)

- `dev:app`: Start the dev app and server via the automation script.
- `build:app`: Build the dev app (`apps/dev-app`).
- `preview:app`: Preview the dev app build (`apps/dev-app`).

Note: The dev app has its own scripts inside `apps/dev-app/` (e.g., `npm run dev`, `npm run server:init`).

## Storybook

- `storybook:sync-nav`: Sync navigation order from config.
- `storybook:sync-config`: Sync navigation config into preview sorter.
- `storybook:prepare`: Build tokens + copy docs + generate Tailwind config.
- `storybook:dev`: Start Storybook on port 6006.
- `storybook:restart`: Restart Storybook after adding new story files (manual).
- `storybook`: Prepare + run Storybook with nodemon restarts and docs/tokens/Tailwind watchers.
- `storybook:build`: Build Storybook for static deployment.

## Vitest (Storybook)

- `vitest:setup`: Install Playwright Chromium for browser tests.
- `vitest:storybook`: Run Storybook-driven Vitest in watch mode.
