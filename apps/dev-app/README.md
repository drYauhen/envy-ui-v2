# Envy UI - Dev Test App

Development and testing application for the Envy UI component library.

## Purpose

This application provides an isolated environment to:
- Test components from `packages/tsx/` in real application scenarios
- Verify CSS tokens and component styles
- Test context and theme switching
- Compare with previous version (if imported)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

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

## Structure

- `src/main.tsx` - React entry point
- `src/App.tsx` - Main app component with navigation
- `src/pages/` - Page components
  - `Home.tsx` - Welcome page
  - `Components.tsx` - Component showcase

## CSS Imports

All required CSS files are imported in `src/index.css`:
- Design tokens from `generated/css/tokens.css`
- Tailwind utilities
- Component CSS from `src/ui/`

## Context and Themes

The app uses `data-eui-context="app"` and `data-eui-theme="default"` attributes for proper token resolution.

To test different contexts/themes, modify the attributes in `src/App.tsx`.

