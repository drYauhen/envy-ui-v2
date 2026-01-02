# Dev App Architecture

Technical architecture documentation for the demonstration application (`apps/dev-app`).

## Overview

The dev-app is a full-stack demonstration application showcasing Envy UI components in a real application context. It uses:

- **Frontend**: React 19 + Vite + TypeScript
- **Backend**: GraphQL (GraphQL Yoga) + SQLite (better-sqlite3)
- **State Management**: React hooks (useState, useEffect)
- **Styling**: Envy UI design tokens + Tailwind CSS

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Dev App (Root)                        │
│                                                          │
│  ┌──────────────────┐         ┌──────────────────┐     │
│  │   Frontend       │         │   Backend        │     │
│  │   (Vite)         │◄───────►│   (GraphQL)      │     │
│  │                  │  HTTP   │                  │     │
│  │  React + TSX     │         │  GraphQL Yoga    │     │
│  │  Components      │         │  SQLite DB       │     │
│  └──────────────────┘         └──────────────────┘     │
│         │                              │                │
│         │                              │                │
│         ▼                              ▼                │
│  ┌──────────────────┐         ┌──────────────────┐     │
│  │  Envy UI         │         │  Database        │     │
│  │  Components      │         │  (SQLite)        │     │
│  │  (packages/tsx/) │         │  navigation_*    │     │
│  └──────────────────┘         └──────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Entry Point (`src/main.tsx`)

The entry point is responsible for:

1. **CSS Imports** (in correct order):
   - Design tokens (`@generated/css/tokens.css`)
   - Tailwind utilities
   - Focus policy
   - Component CSS files
   - App-specific styles

2. **React Initialization**:
   - Creates root
   - Renders `<App />` component

### Main App Component (`src/App.tsx`)

**Responsibilities:**
- Manages application state (current page, collapsed state)
- Fetches navigation data from GraphQL API
- Renders SideNav component
- Renders page content based on current route

**State Management:**
```typescript
const [currentPage, setCurrentPage] = useState<Page>('home');
const [isCollapsed, setIsCollapsed] = useState(false);
const [sections, setSections] = useState<SideNavSection[]>([]);
const [loading, setLoading] = useState(true);
```

**Data Flow:**
1. Component mounts → `loadNavigation()` called
2. GraphQL query fetches navigation data
3. Data transformed to SideNav format
4. Sections state updated
5. SideNav component renders with data

### GraphQL Client (`src/api/graphql.ts`)

**Responsibilities:**
- GraphQL request/response handling
- Type-safe query definitions
- Error handling

**Key Functions:**
- `graphqlRequest<T>()` - Generic GraphQL request handler
- `getNavigation()` - Fetch navigation data
- `updateNavigationItem()` - Update navigation item

**Configuration:**
- URL: `import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3001/graphql'`
- CORS: Handled by server

## Backend Architecture

### GraphQL Server (`server/index.ts`)

**Technology**: GraphQL Yoga v3

**Responsibilities:**
- GraphQL endpoint (`/graphql`)
- GraphQL Playground (dev mode)
- CORS configuration
- Database initialization

**Configuration:**
- Port: `process.env.PORT || 3001`
- CORS: Allows `http://localhost:5173` (frontend)

### GraphQL Schema (`server/schema/schema.ts`)

**Types:**
- `NavigationSection` - Section with title and items
- `NavigationItem` - Individual menu item

**Queries:**
- `navigation` - Get all navigation sections with items
- `navigationSection(key: String)` - Get specific section

**Mutations:**
- `updateNavigationItem` - Update item properties

**Resolvers:**
- Convert SQLite boolean (0/1) to GraphQL boolean
- Map database fields (`order_index` → `orderIndex`)
- Filter active/disabled items

### Database Layer (`server/db/database.ts`)

**Technology**: better-sqlite3

**Responsibilities:**
- Database connection management
- Query abstractions
- Type safety

**Key Functions:**
- `initDatabase()` - Initialize connection and schema
- `getDatabase()` - Get database instance
- `sectionQueries` - Section CRUD operations
- `itemQueries` - Item CRUD operations

**Database Schema:**
- `navigation_sections` - Sections table
- `navigation_items` - Items table (foreign key to sections)

### Database Schema (`server/db/init.sql`)

**Tables:**

```sql
navigation_sections:
  - id (INTEGER PRIMARY KEY)
  - key (TEXT UNIQUE)
  - title (TEXT)
  - order_index (INTEGER)
  - created_at, updated_at (DATETIME)

navigation_items:
  - id (INTEGER PRIMARY KEY)
  - section_key (TEXT, FK to navigation_sections.key)
  - key (TEXT)
  - label (TEXT)
  - icon (TEXT)
  - badge (TEXT)
  - route_path (TEXT)
  - order_index (INTEGER)
  - is_active (BOOLEAN DEFAULT 1)
  - is_disabled (BOOLEAN DEFAULT 0)
  - created_at, updated_at (DATETIME)
```

### Seed Data (`server/db/seed.ts`)

**Purpose**: Initialize database with navigation data matching Storybook

**Data Structure:**
- 4 sections: Plans, Projects, Analytics, People
- 14 items total across sections
- Matches `stories/tsx/side-nav.stories.tsx` data

**Important**: Seed only runs if database is empty (no existing sections).

## Component Integration

### SideNav Component

**Location**: `packages/tsx/side-nav/`

**Integration Points:**
1. **Props**: Receives `sections` and `footer` from App state
2. **State**: Manages collapsed state internally or via props
3. **Styling**: Uses `@src/ui/side-nav.css` and `@src/ui/logo.css`
4. **Icons**: Uses `@src/ui/icons/_icons.css` for icon rendering

**Data Format:**
```typescript
interface SideNavSection {
  key: string;
  title?: string;
  items: SideNavItem[];
}

interface SideNavItem {
  key: string;
  label: string;
  icon: string;
  badge?: number | string;
  isSelected?: boolean;
  onAction?: () => void;
}
```

## CSS Architecture

### Import Order (Critical)

CSS must be imported in this exact order in `src/main.tsx`:

1. **Design Tokens** - Foundation
2. **Tailwind** - Utility classes
3. **Focus Policy** - Focus management
4. **Component CSS** - Component styles
5. **App Styles** - Application-specific overrides

### Context Requirements

All components must be within a context container:

```typescript
<div data-eui-context="app" data-eui-theme="default">
  {/* Components here */}
</div>
```

This ensures:
- Token resolution works correctly
- Context-specific styling applies
- Theme switching works

## Automation Script

### Launcher Script (`scripts/dev-app.mjs`)

**Purpose**: Automate setup and launch of dev-app

**Features:**
1. **Dependency Management**:
   - Checks for `node_modules` in dev-app and server
   - Installs if missing
   - Rebuilds native modules (better-sqlite3) for compatibility

2. **Port Management**:
   - Checks if ports 5173 and 3001 are in use
   - Kills processes if needed
   - Frees ports before starting

3. **Database Initialization**:
   - Checks if database exists
   - Initializes if missing
   - Runs seed data

4. **Process Management**:
   - Starts frontend and server concurrently
   - Uses `concurrently` for parallel execution

**Usage:**
```bash
npm run dev:app  # From root
```

## Data Flow

### Navigation Data Flow

```
Database (SQLite)
    ↓
GraphQL Resolvers (schema.ts)
    ↓ (transform: SQLite → GraphQL)
GraphQL API
    ↓ (HTTP)
GraphQL Client (graphql.ts)
    ↓ (fetch)
App Component (App.tsx)
    ↓ (transform: GraphQL → SideNav format)
SideNav Component
    ↓ (render)
DOM
```

### State Updates

```
User Action (click menu item)
    ↓
onAction callback
    ↓
setCurrentPage()
    ↓
useEffect hook
    ↓
Update sections with isSelected
    ↓
SideNav re-renders
```

## Technology Stack

### Frontend
- **React**: 19.2.3
- **Vite**: 5.4.0
- **TypeScript**: 5.9.3
- **React Aria**: 3.45.0 (via Envy UI components)
- **Tailwind CSS**: 3.4.0

### Backend
- **GraphQL Yoga**: 3.1.0
- **better-sqlite3**: 12.5.0
- **tsx**: 4.7.0 (TypeScript execution)

### Build Tools
- **Vite**: Frontend bundler
- **TypeScript**: Type checking
- **PostCSS**: CSS processing

## File Structure Details

### Frontend Files

```
src/
├── main.tsx              # Entry point, CSS imports
├── App.tsx               # Main app, state management
├── index.css             # App-specific styles
├── api/
│   └── graphql.ts        # GraphQL client
└── pages/
    ├── Home.tsx          # Home page
    └── Components.tsx    # Components showcase
```

### Backend Files

```
server/
├── index.ts              # GraphQL server entry
├── package.json          # Server dependencies
├── tsconfig.json         # TypeScript config
├── schema/
│   └── schema.ts         # GraphQL schema, types, resolvers
└── db/
    ├── database.ts       # DB connection, queries
    ├── init.sql          # Database schema
    ├── seed.ts           # Initial data
    └── database.sqlite   # SQLite database (gitignored)
```

## Environment Variables

### Frontend

- `VITE_GRAPHQL_URL` - GraphQL server URL (default: `http://localhost:3001/graphql`)

### Backend

- `PORT` - GraphQL server port (default: `3001`)

## Database Management

### Initialization

Database is initialized automatically by the launcher script, or manually:

```bash
cd apps/dev-app/server
npm run db:init
```

### Schema Updates

To update schema:
1. Modify `server/db/init.sql`
2. Delete `server/db/database.sqlite`
3. Run `npm run db:init`

### Data Updates

To update seed data:
1. Modify `server/db/seed.ts`
2. Delete `server/db/database.sqlite`
3. Run `npm run db:init`

**Note**: GraphQL mutations are temporary and will be lost on reinitialization.

## Security Considerations

### CORS

CORS is configured to allow only `http://localhost:5173` in development.

### Database

- Database file (`database.sqlite`) is gitignored
- No authentication required (development only)
- SQL injection protection via prepared statements

### GraphQL

- No authentication (development only)
- GraphQL Playground enabled in dev mode only

## Performance Considerations

### Database

- SQLite is file-based (no network overhead)
- Indexes on `order_index` and `section_key` for fast queries
- Prepared statements for query optimization

### Frontend

- Vite provides fast HMR (Hot Module Replacement)
- React 19 with concurrent features
- CSS imported at build time (no runtime overhead)

## Testing Strategy

### Component Testing

Components are tested in:
1. **Storybook** - Isolated component stories
2. **Dev App** - Real application integration

### Integration Testing

Dev-app serves as integration test for:
- Component + API integration
- State management
- Routing/navigation
- CSS token resolution

## Related Documentation

- [Dev App Workflow](../workflows/dev-app-workflow.md) - Usage guide
- [Storybook Workflow](../workflows/storybook-workflow.md) - Storybook integration
- [Component Naming Conventions](./component-naming-conventions.md) - Component naming

