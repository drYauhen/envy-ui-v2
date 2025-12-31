# Storybook Workflow

Complete guide to working with Storybook in Envy UI v2.

## Overview

Storybook serves as an AI-agent-oriented architecture layer for understanding and exploring the design system. It provides:
- Component documentation and examples
- ADR documentation viewer
- Token visualization
- Architecture documentation

## Structure

```
stories/
  ├── components/       # Component stories
  ├── docs/            # Documentation stories (ADR, etc.)
  ├── tokens/          # Token visualization (organized by context: app, website, report)
  └── viewers/         # Custom viewers (ADR, token viewers, etc.)
```

**Note:** Architecture documentation has been moved into the token structure itself. Each context and theme has its own README.md file that is displayed in Storybook.

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
  "Tailwind",
  "Templates"
]
```

**Note:** The "Architecture" section has been removed. Architecture documentation is now integrated into the token structure and displayed within the Tokens section.

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

### ADR Story

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

## Development

### Start Storybook

```bash
npm run storybook:dev
```

**Or with auto-prepare:**
```bash
npm run storybook
```

**Auto-prepare includes:**
- Build tokens
- Copy docs to public
- Copy token README files to public
- Generate Tailwind config

### Watch Mode

```bash
npm run storybook
```

**Watches:**
- Token files (auto-rebuild)
- Doc files (auto-copy)
- Story files (auto-reload)

### Build Static

```bash
npm run storybook:build
```

**Output:** `storybook-static/`

## Documentation Integration

### ADR Documentation

ADRs are automatically displayed in Storybook:
- Located in `Docs/ADR` section
- "ADR Overview" appears first
- Each ADR is a separate story

### Adding Images to ADRs

1. Place image in `docs/adr/`:
   ```
   docs/adr/ADR-0025-diagram.png
   ```

2. Reference in markdown:
   ```markdown
   ![Diagram](./ADR-0025-diagram.png)
   ```

3. Images are auto-copied to `public/docs/adr/` when running:
   ```bash
   npm run docs:copy
   ```

### Token Documentation

Token documentation is integrated into the token structure:
- Each context has a README.md file: `tokens/{context}/README.md`
- Each theme directory has a README.md file: `tokens/{context}/themes/README.md`
- These README files are automatically displayed in Storybook within the Tokens section
- Documentation is shown when viewing context or theme overview stories

**Example locations:**
- `tokens/app/README.md` - App context documentation
- `tokens/app/themes/README.md` - App themes documentation
- `tokens/website/README.md` - Website context documentation
- `tokens/report/README.md` - Report context documentation

## Related Documentation

- [ADR-0022: Storybook Model as AI-Agent-Oriented Architecture Layer](./../adr/ADR-0022-storybook-model-ai-agent-oriented-architecture.md)
- [ADR-0002: Data-Driven Storybook Pipeline](./../adr/ADR-0002-data-driven-storybook-pipeline.md)

