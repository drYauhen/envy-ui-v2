# Storybook Workflow

**Document ID:** workflow-storybook-workflow
**Status:** Active
**Date:** 2026-01-10
**Last Updated:** 2026-04-06
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Workflow

---
Complete guide to working with Storybook in Envy UI.

## Overview

Storybook serves as an AI-agent-oriented architecture layer for understanding and exploring the design system. It provides:
- Component documentation and examples
- Documentation layer (Docs section: ADR, Architecture, Workflows, Tokens)
- Token visualization
- Architecture and workflow documentation

**Reminder:** Any changes to Storybook-related npm scripts must be documented in [`docs/workflows/WORKFLOW-004-scripts-reference.md`](WORKFLOW-004-scripts-reference.md).

## Accessibility Testing

Storybook includes built-in accessibility testing with `@storybook/addon-a11y`:

### Scoped Accessibility Testing

**Important Change:** Accessibility tests are now **scoped to component content only**, excluding wrapper UI elements (MultiContextViewer badges, descriptions, etc.).

**Configuration:**
```typescript
// .storybook/preview.tsx
a11y: {
  element: '[data-testid="component-under-test"]'  // Targets component containers
}
```

**Benefits:**
- ✅ **Focused testing** - Tests actual component accessibility, not viewer UI
- ✅ **Relevant results** - No false positives from wrapper elements
- ✅ **Better compliance** - Accurate WCAG assessment of components

### Theme-Based Accessibility

The accessibility theme provides **WCAG 2.2 AA compliant** high-contrast versions:
- **4.5:1 minimum contrast ratios** for normal text
- **Theme switcher** in Storybook toolbar (App → Accessibility)
- **Automatic theme switching** for all components using MultiContextViewer

**Testing accessibility:**
1. Switch to "Accessibility" theme in Storybook toolbar
2. Run a11y addon to verify WCAG 2.2 AA compliance
3. Check contrast ratios and color combinations

## Structure

```
stories/
  ├── architecture/     # Architecture story entries
  ├── components/       # Component stories (if used)
  ├── docs/             # Documentation stories (ADR, Architecture, Workflows, Tokens)
  ├── foundations/      # Foundation token stories
  ├── layouts/          # Layout stories
  ├── templates/        # Template stories
  ├── tokens/           # Token visualization (app, website, report)
  ├── tsx/              # TSX component stories (clean/react-aria)
  ├── utils/            # Storybook utilities
  ├── viewers/          # Documentation renderers and viewers
  └── web-components/   # Web component stories
```

**Note:** Documentation stories render markdown from `docs/` and use shared viewers (DocViewer + AdrViewer) to keep cross-links and mermaid handling consistent.

## Navigation Configuration

Storybook navigation is controlled by `.storybook/navigation.config.ts`.

### Section Order

Top-level sections are defined in `sectionOrder`:

```typescript
sectionOrder: [
  "Docs",
  "Tokens",
  "HTML + CSS",
  "TSX (Clean)",
  "TSX",
  "TSX + React Aria",
  "Web Components",
  "Templates"
]
```

**Note:** The "Docs" section includes ADRs, Architecture, and Workflows. Tokens documentation lives in `Docs/Tokens` (generated markdown) and token stories remain under `Tokens/...`.

### Component Grouping

Components can be grouped within sections:

```typescript
sections: {
  "HTML + CSS": {
    componentGroups: [
      { components: ["Avatar", "AvatarGroup"] },
      { components: ["Button", "ButtonGroup"] }
    ],
    otherComponents: ["AlertBanner", "Counter", ...]
  }
}
```

### Updating Navigation

1. **Edit config:**
   ```bash
   vim .storybook/navigation.config.ts
   ```

2. **Sync to preview:**
   ```bash
   npm run storybook:sync-config
   ```

   Or manually copy values to `.storybook/preview.tsx` (storySort function).

## Adding Stories

### Component Story

**File:** `stories/components/button.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonClean } from '../../packages/tsx/button/button';

const meta: Meta<typeof ButtonClean> = {
  title: 'TSX (Clean)/Components/Button',
  component: ButtonClean,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ButtonClean>;

export const Primary: Story = {
  args: {
    intent: 'primary',
    children: 'Button'
  }
};
```

### Documentation Story (DocViewer)

**File:** `stories/docs/architecture/accessibility-reference.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: { layout: 'fullscreen' }
};

export default meta;
type Story = StoryObj;

export const AccessibilityReference: Story = {
  name: 'Accessibility Reference',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/ARCH-accessibility-001-accessibility-reference.md"
      fallback="Loading accessibility reference..."
    />
  )
};
```

### ADR Story (ADR-specific)

**File:** `stories/docs/adr/adr-0025.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const FigmaVariablesIntegrationStrategy: Story = {
  name: 'ADR-0025 Figma Variables Integration Strategy',
  render: () => (
    <AdrViewer
      adrNumber="0025"
      title="Figma Variables Integration Strategy"
      status="Accepted"
      date="2025-12-26"
    />
  )
};
```

**Note:** Use `node scripts/generate-adr-stories.mjs` to auto-generate ADR stories.

## Story Structure Standard

Use the canonical story structure and layout rules defined in:
- `docs/architecture/storybook-story-structure.md`

## Development

### Primary Development Command

**⚠️ CRITICAL: `npm run storybook` is the primary development command.**

```bash
npm run storybook
```

This is the **main core development workflow** that:
1. **Prepares** the system (tokens, docs, Tailwind config)
2. **Starts** Storybook dev server on port 6006
3. **Watches** for changes and auto-reloads:
   - `.storybook/**/*.{ts,tsx,js,jsx,json}` - Storybook config changes
   - `stories/viewers/docs/**/*.{ts,tsx,js,jsx,json}` - Documentation viewer changes
   - `stories/docs/**/*.{ts,tsx,js,jsx,json}` - **Story file changes (including ADR stories)**
   - `docs/adr/**/*.md` - **ADR markdown file changes**
   - `docs/**/*.md` - Documentation changes (via docs:watch)
   - `tokens/**/*.json` - Token changes (via tokens:watch)
   - `package.json` - Package changes
   - `system.manifest.json` - Manifest changes

**Auto-prepare includes:**
- Build tokens → CSS, JS, Figma outputs
- Copy docs to public directory
- Copy token [README](README.md) files to public
- Generate Tailwind config from tokens

**Auto-reload on changes:**
- Token files → rebuild tokens + reload Storybook
- Doc files → copy to public + reload Storybook
- Story files → **automatic Storybook reload** (nodemon watches `stories/`)
- ADR markdown → **automatic reload** (nodemon watches `docs/adr/`)

### Important: No Manual Restart Needed

**When adding new story files** (e.g., via `npm run adr:generate`):
- ❌ **DO NOT** manually restart Storybook
- ✅ **Wait ~2 seconds** - nodemon detects new files automatically
- ✅ Storybook reloads automatically via `storybook:restart`

**Nodemon watches** (configured in `nodemon.json`):
- `stories/viewers/docs/**/*.{ts,tsx,js,jsx,json}` ← **ADR story files here**
- `docs/adr/**/*.md` ← **ADR markdown files here**
- Delay: 2000ms (2 seconds)
- Restart command: `npm run storybook:restart`

**When nodemon restart is needed:**
- New story files added (e.g., `stories/docs/adr/adr-0034.stories.tsx`)
- Storybook config changes (e.g., `.storybook/preview.tsx`)
- System manifest changes
- Package.json changes

**When nodemon restart is NOT needed:**
- Editing existing story files
- Editing existing documentation
- Editing existing tokens
- Editing existing components

### Alternative: Storybook Dev Only

**Only use this when you've already prepared the system:**

```bash
npm run storybook:dev
```

This **skips** auto-prepare and **does not** watch for changes. Use only when:
- Tokens already built
- Docs already copied
- No changes expected to tokens/docs
- Quick restart needed for testing

### Build Static

```bash
npm run storybook:build
```

**Output:** `storybook-static/`

## Documentation Integration

### Documentation Sections

Docs are organized by section:
- `Docs/ADR` - ADR list + individual ADR stories
- `Docs/Architecture` - Current rules and standards
- `Docs/Workflows` - How to work with the system
- `Docs/Tokens` - Token references and tooling

**ADR specifics:**
- ADRs are displayed in `Docs/ADR`
- "ADR Overview" appears first
- Each ADR is a separate story (auto-generated)

### Adding Images to Docs

1. Place the image next to the markdown file:
   ```
   docs/architecture/your-diagram.png
   ```

2. Reference in markdown:
   ```markdown
   ![Diagram](./your-diagram.png)
   ```

3. Images are auto-copied to `public/docs/` when running:
   ```bash
   npm run docs:copy
   ```

### Token Documentation

Token documentation is integrated into the token structure:
- Each active context has a [README](README.md).md file: `tokens/contexts/{context}/README.md`
- Each theme directory has a [README](README.md).md file: `tokens/contexts/{context}/themes/README.md`
- These [README](README.md) files are automatically displayed in Storybook within the Tokens section
- Documentation is shown when viewing context or theme overview stories

### Documentation Registry

Documentation metadata and link resolution are centralized:
- **Single source of truth:** `stories/viewers/docs/docs-registry.ts`
- **Storybook link mapping:** Set `storybookId` for any doc that has a Storybook story
- **Link rendering:** `DocViewer` uses the registry to map markdown links to Storybook routes
- **Navigation policy:** Registered Storybook docs open in the current tab (Storybook shell preserved); external/unregistered links open in a new tab

**Example locations:**
- `tokens/contexts/app/README.md` - App context documentation
- `tokens/contexts/app/themes/README.md` - App themes documentation
- `tokens/contexts/website/README.md` - Website context documentation
- `tokens/contexts/report/README.md` - Report context documentation

Website docs live under `tokens/contexts/website` (old `web` name is deprecated).

## Related Documentation

- [ADR-0022](../adr/ADR-0022-storybook-model-ai-agent-oriented-architecture.md) — Storybook Model as AI-Agent-Oriented Architecture Layer
- [ADR-0002](../adr/ADR-0002-data-driven-storybook-pipeline.md) — Data-Driven Storybook Pipeline
