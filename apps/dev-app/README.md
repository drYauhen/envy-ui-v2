# Envy UI - Dev Test App

Development and testing application for the Envy UI component library.

## Purpose

This application provides an isolated environment to:
- Test components from `packages/tsx/` in real application scenarios
- Verify CSS tokens and component styles
- Test context and theme switching
- Demonstrate component integration with GraphQL APIs
- Compare with previous version (if imported)

## Quick Start

### Automated Launch (Recommended)

From the **root** of the repository:

```bash
npm run dev:app
```

This single command will:
- ✅ Install dependencies automatically
- ✅ Initialize database if needed
- ✅ Start both frontend and GraphQL server
- ✅ Handle port conflicts automatically

**Frontend**: http://localhost:5173  
**GraphQL Playground**: http://localhost:3001/graphql

### Manual Setup

If you need to run components separately:

```bash
# Terminal 1: Frontend
cd apps/dev-app
npm install
npm run dev

# Terminal 2: GraphQL Server
cd apps/dev-app/server
npm install
npm run db:init  # First time only
npm run dev
```

**For detailed instructions, see:** [Dev App Workflow](../../docs/workflows/dev-app-workflow.md)

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Deployment

This app is configured for Vercel deployment. The `vercel.json` file contains the necessary configuration.

To deploy:
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

## Importing Legacy Version

To test components from a previous version of the library:

### Option 1: GitHub Dependency

Add to `package.json`:
```json
{
  "dependencies": {
    "envy-ui-v1": "github:username/repo#branch"
  }
}
```

### Option 2: npm link

1. Clone the previous version repository
2. Run `npm link` in that repository
3. Run `npm link envy-ui-v1` in this app

### Option 3: Local Path

Add to `package.json`:
```json
{
  "dependencies": {
    "envy-ui-v1": "file:../path-to-old-version"
  }
}
```

## Architecture

The dev-app consists of:

- **Frontend**: React + Vite application (`src/`)
- **Backend**: GraphQL server with SQLite database (`server/`)
- **Automation**: Automated launcher script (from root: `scripts/dev-app.mjs`)

**For detailed architecture, see:** [Dev App Architecture](../../docs/architecture/dev-app-architecture.md)

## Structure

```
apps/dev-app/
├── src/
│   ├── main.tsx          # React entry point, CSS imports
│   ├── App.tsx            # Main app component with SideNav
│   ├── api/
│   │   └── graphql.ts     # GraphQL client
│   └── pages/             # Page components
│       ├── Home.tsx
│       └── Components.tsx
└── server/
    ├── index.ts           # GraphQL server
    ├── schema/
    │   └── schema.ts       # GraphQL schema
    └── db/
        ├── database.ts     # Database queries
        ├── init.sql        # Database schema
        └── seed.ts         # Initial data
```

## CSS Imports

All required CSS files are imported in `src/main.tsx` (not `index.css`):
- Design tokens from `@generated/css/tokens.css`
- Tailwind utilities
- Component CSS from `@src/ui/`
- Icons CSS from `@src/ui/icons/_icons.css`

**Important**: CSS must be imported in `main.tsx` in the correct order. See [Dev App Workflow](../../docs/workflows/dev-app-workflow.md#css-imports) for details.

## Context and Themes

The app uses `data-eui-context="app"` and `data-eui-theme="default"` attributes for proper token resolution.

To test different contexts/themes, modify the attributes in `src/App.tsx`.

## Navigation Data

Navigation data is stored in SQLite database and fetched via GraphQL API. The data matches Storybook stories (`stories/tsx/side-nav.stories.tsx`).

**To update navigation data:**
1. Edit `server/db/seed.ts`
2. Reinitialize database: `cd server && rm -f db/database.sqlite && npm run db:init`

**For more details, see:** [Dev App Workflow](../../docs/workflows/dev-app-workflow.md#updating-navigation-data)

## Documentation

- **[Dev App Workflow](../../docs/workflows/dev-app-workflow.md)** - Complete usage guide
- **[Dev App Architecture](../../docs/architecture/dev-app-architecture.md)** - Technical architecture
- **[Server README](./server/README.md)** - GraphQL server documentation

