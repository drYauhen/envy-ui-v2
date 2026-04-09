// Migration metadata - source of truth for Docs/Migrations stories

import { DocMetadata } from './doc-types';

export const migrations: DocMetadata[] = [
  {
    number: "0000",
    title: "Third-Party Dependency Migration Log",
    category: "migration",
    status: "Active",
    date: "2026-04-08",
    lastUpdated: "2026-04-08",
    owner: "Eugene Goncharov",
    assistance: "AI-assisted drafting (human-reviewed)",
    exportName: "thirdPartyDependencyMigrationLog",
    markdownPath: "/docs/migrations/README.md",
    storybookId: "docs-migrations--third-party-dependency-migration-log",
    aliases: ["migrations/README.md"]
  },
  {
    number: "0001",
    title: "React Aria and React Stately Upgrade",
    category: "migration",
    status: "Completed",
    date: "2026-04-08",
    lastUpdated: "2026-04-08",
    owner: "Eugene Goncharov",
    assistance: "AI-assisted drafting (human-reviewed)",
    exportName: "reactAriaAndReactStatelyUpgrade",
    markdownPath: "/docs/migrations/2026-04-08-react-aria-react-stately-upgrade.md",
    storybookId: "docs-migrations--react-aria-and-react-stately-upgrade",
    aliases: ["migrations/2026-04-08-react-aria-react-stately-upgrade.md"]
  }
];
