# Dev App Workflow

Complete guide to working with the demonstration application (`apps/dev-app`) in Envy UI v2.

## Overview

The **dev-app** is a demonstration application that showcases Envy UI components in a real application context. It serves as:

- **Component Testing Environment**: Test components from `packages/tsx/` in real application scenarios
- **Integration Testing**: Verify component integration with GraphQL APIs, routing, and state management
- **Token Verification**: Test CSS tokens and component styles in the `app` context
- **Reference Implementation**: Demonstrate how to integrate Envy UI components into a real application

## Architecture

The dev-app consists of:

- **Frontend**: React + Vite application (`apps/dev-app/src/`)
- **Backend**: GraphQL server with SQLite database (`apps/dev-app/server/`)
- **Automation**: Automated launcher script (`scripts/dev-app.mjs`)

For detailed architecture, see: [Dev App Architecture](../architecture/dev-app-architecture.md)

## Quick Start

### Automated Launch (Recommended)

From the **root** of the repository:

```bash
npm run dev:app
```

This single command will:
1. ✅ Check and install dependencies for dev-app and server
2. ✅ Rebuild native modules (better-sqlite3) for Node.js compatibility
3. ✅ Free ports 5173 and 3001 if they're in use
4. ✅ Initialize database if needed
5. ✅ Start both frontend (Vite) and GraphQL server concurrently

**Frontend**: http://localhost:5173  
**GraphQL Playground**: http://localhost:3001/graphql

### Manual Launch

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

## Project Structure

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
├── server/
│   ├── index.ts           # GraphQL server (GraphQL Yoga)
│   ├── schema/
│   │   └── schema.ts       # GraphQL schema and resolvers
│   └── db/
│       ├── database.ts     # Database connection and queries
│       ├── init.sql        # Database schema
│       └── seed.ts         # Initial data (matches Storybook)
└── package.json
```

## Adding New Components

### Step 1: Import Component

Add the component import in `src/App.tsx` or the target page:

```typescript
import { ComponentName } from '@packages/tsx/component-name';
```

### Step 2: Import CSS

Add the component CSS import in `src/main.tsx`:

```typescript
import '@src/ui/component-name.css';
```

**Important**: Always import component CSS in `main.tsx`, not in component files.

### Step 3: Use Component

Use the component in your page or App component:

```typescript
<ComponentName
  prop1="value1"
  prop2="value2"
/>
```

### Step 4: Verify Context

Ensure the component is within a context container:

```typescript
<div data-eui-context="app" data-eui-theme="default">
  <ComponentName />
</div>
```

## Adding New Pages

### Step 1: Create Page Component

Create a new file in `src/pages/`:

```typescript
// src/pages/NewPage.tsx
function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
      <p>Content here</p>
    </div>
  );
}

export default NewPage;
```

### Step 2: Add Route

Update `src/App.tsx`:

```typescript
import NewPage from './pages/NewPage';

type Page = 'home' | 'components' | 'new-page';

// In render:
{currentPage === 'new-page' && <NewPage />}
```

### Step 3: Add Navigation Item

Update the database seed (`server/db/seed.ts`) or use GraphQL mutation:

```typescript
// In seed.ts
itemQueries.create(db, {
  sectionKey: 'plans', // or appropriate section
  key: 'new-page',
  label: 'New Page',
  icon: 'icon-name',
  orderIndex: 4,
  isActive: true,
  isDisabled: false,
});
```

Then reinitialize the database:

```bash
cd apps/dev-app/server
rm -f db/database.sqlite
npm run db:init
```

## Updating Navigation Data

Navigation data should match Storybook stories (`stories/tsx/side-nav.stories.tsx`).

### Method 1: Update Seed File

Edit `apps/dev-app/server/db/seed.ts` and reinitialize:

```bash
cd apps/dev-app/server
rm -f db/database.sqlite
npm run db:init
```

### Method 2: GraphQL Mutation

Use GraphQL Playground at http://localhost:3001/graphql:

```graphql
mutation {
  updateNavigationItem(
    id: 1
    label: "New Label"
    icon: "new-icon"
    badge: "5"
  ) {
    id
    label
    icon
    badge
  }
}
```

**Note**: Changes via GraphQL mutations are temporary and will be lost if the database is reinitialized.

## CSS Imports

All CSS files must be imported in `src/main.tsx` in the correct order:

1. **Design Tokens** (first)
2. **Tailwind Utilities**
3. **Focus Policy**
4. **Component CSS** (alphabetical order recommended)
5. **App Styles** (last)

Example:

```typescript
// Design tokens first
import '@generated/css/tokens.css';

// Tailwind
import '@packages/tailwind/tailwind.css';

// Focus policy
import '@src/ui/focus-policy.css';

// Component CSS
import '@src/ui/button.css';
import '@src/ui/logo.css';
import '@src/ui/side-nav.css';
import '@src/ui/icons/_icons.css';

// App styles last
import './index.css';
```

## GraphQL API

### Query Navigation

```graphql
query {
  navigation {
    key
    title
    items {
      id
      key
      label
      icon
      badge
      isActive
      isDisabled
      orderIndex
    }
  }
}
```

### Update Navigation Item

```graphql
mutation {
  updateNavigationItem(
    id: 1
    label: "Updated Label"
    icon: "updated-icon"
    badge: "10"
  ) {
    id
    label
    icon
    badge
  }
}
```

## Database Management

### Initialize Database

```bash
cd apps/dev-app/server
npm run db:init
```

This will:
- Create `db/database.sqlite`
- Run schema from `db/init.sql`
- Seed data from `db/seed.ts`

### Reset Database

```bash
cd apps/dev-app/server
rm -f db/database.sqlite
npm run db:init
```

### Database Schema

See `apps/dev-app/server/db/init.sql` for the complete schema.

**Tables:**
- `navigation_sections` - Navigation sections (Plans, Projects, etc.)
- `navigation_items` - Menu items within sections

## Troubleshooting

### Port Already in Use

The automated script (`npm run dev:app`) automatically frees ports. If you're running manually:

```bash
# Find process using port
lsof -ti:5173 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Native Module Errors (better-sqlite3)

If you see `NODE_MODULE_VERSION` errors:

```bash
cd apps/dev-app/server
npm rebuild better-sqlite3
```

The automated script handles this automatically.

### Components Not Styled

1. Check that CSS is imported in `src/main.tsx`
2. Verify `data-eui-context="app"` is set on the root container
3. Check browser console for CSS loading errors

### GraphQL Errors

1. Verify server is running: http://localhost:3001/graphql
2. Check CORS settings in `server/index.ts`
3. Verify database is initialized: `npm run db:init`

## Important Notes for AI Agents

### ⚠️ Critical Rules

1. **Always import CSS in `main.tsx`**, not in component files
2. **Navigation data must match Storybook** - use `stories/tsx/side-nav.stories.tsx` as reference
3. **Database changes are temporary** - update `seed.ts` for permanent changes
4. **Context is required** - all components must be within `data-eui-context="app"`
5. **Use automated script** - prefer `npm run dev:app` from root over manual setup

### Common Mistakes to Avoid

❌ **Don't** import CSS in component files  
❌ **Don't** hardcode navigation data in `App.tsx` (use GraphQL)  
❌ **Don't** commit `db/database.sqlite` (it's in `.gitignore`)  
❌ **Don't** modify generated files (`@generated/css/tokens.css`)  
❌ **Don't** create new pages without updating navigation seed

### ✅ Best Practices

✅ Always use `npm run dev:app` from root for launching  
✅ Update `seed.ts` to match Storybook data  
✅ Import all CSS in `main.tsx` in correct order  
✅ Use GraphQL API for dynamic navigation data  
✅ Test components in both expanded and collapsed SideNav states

## Related Documentation

- [Dev App Architecture](../architecture/dev-app-architecture.md) - Detailed architecture documentation
- [Storybook Workflow](./storybook-workflow.md) - Storybook integration
- [Component Naming Conventions](../architecture/component-naming-conventions.md) - Component naming
- [Token Usage Rules](../architecture/token-usage-rules.md) - Token usage guidelines

