# Scripts Reference

**Document ID:** workflow-scripts-reference
**Last Updated:** 2026-04-03
**Category:** Workflow


This document lists the root-level npm scripts and how they are intended to be used.

## Conventions

- Run scripts from the repository root unless noted otherwise.
- Use `npm run <script>` (examples below).
- Some scripts are helpers used by other scripts (not typically run directly).
- Keep `package.json` scripts grouped by domain and update this reference on any script change.

## Summary

Script groups: Documentation, ADRs, Tokens, Tailwind, Icons, Figma, Dev App, Storybook, Vitest.

## Documentation

### Assets and Validation
- `docs:copy`: Copy docs assets into `public/docs/` for Storybook.
- `docs:watch`: Watch docs and re-run `docs:copy`.
- `docs:validate`: Validate docs links against the registry and Storybook ids.

### Unified Documentation System
- `docs:format-headers`: Format all document headers to canonical format.
- `docs:regenerate-data`: Generate metadata files (`adr-list-data.ts`, `architecture-data.ts`) from markdown files. Applies Title Case conversion.
- `docs:regenerate-all`: Generate metadata AND story files. Use this after creating/updating documents.

**Usage:**
- After creating new document: `npm run docs:regenerate-all`
- After updating existing document: `npm run docs:regenerate-data`
- To fix formatting: `npm run docs:format-headers && npm run docs:regenerate-all`

**Note:** `adr-list-data.ts`, `architecture-data.ts`, and story files are AUTO-GENERATED. Never edit manually.

## ADRs (Legacy - Use Unified System Above)

- `adr:generate`: (Legacy) Generate ADR story files from `adr-list-data.ts`.
- `adr:validate`: (Legacy) Validate ADR consistency and link mapping.

**Recommendation:** Use `docs:regenerate-all` instead of `adr:generate` for new workflow.

## Tokens

- `tokens:build`: Build tokens via Style Dictionary (platform outputs; not canonical CSS).
- `tokens:build:sd`: Build Style Dictionary platform outputs. The themed CSS formatter writes `generated/css/tokens.themed.css`.
- `tokens:build:canonical`: Build canonical CSS via Style Dictionary canonical platforms.
- `tokens:build:canonical:sd`: Explicit canonical build via Style Dictionary canonical platforms.
- `tokens:build:tokenstudio`: Build Token Studio export (legacy/experimental; may be broken).
- `tokens:build:figma`: Build Figma outputs for all contexts.
- `tokens:build:figma:app`: Build Figma outputs for app context.
- `tokens:build:figma:website`: Build Figma outputs for website context (canonical; `web` renamed to `website`).
- `tokens:build:figma:report`: Build Figma outputs for report context.
- `resolver:check`: CI-ready resolver integrity check (phase validations + canonical build + themed CSS snapshot regression).
- `resolver:verify:themed-css-snapshot`: Verify `css/variables-themed` output against fixture snapshot (`-- --update` to refresh intentionally).
- `tokens:copy-readme`: Copy tokens [README](README.md) to public docs.
- `tokens:generate-docs`: Generate token reference docs.
- `tokens:generate-metadata`: Generate token metadata files.
- `tokens:generate-types`: Generate token TypeScript types.
- `tokens:generate-vscode`: Generate VS Code CSS data.
- `tokens:validate`: Validate token usage.
- `validate:css-vars`: Validate runtime CSS variable completeness (A/B/C validators).
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
- `storybook:prepare`: Build canonical tokens + copy docs + copy tokens [README](README.md).
- `storybook:dev`: Start Storybook on port 6006.
- `storybook:restart`: Restart Storybook after adding new story files (manual).
- `storybook`: Prepare + run Storybook with nodemon restarts and docs/tokens/Tailwind watchers.
- `storybook:build`: Build Storybook for static deployment.

## Vitest (Storybook)

- `vitest:setup`: Install Playwright Chromium for browser tests.
- `vitest:storybook`: Run Storybook-driven Vitest in watch mode.
