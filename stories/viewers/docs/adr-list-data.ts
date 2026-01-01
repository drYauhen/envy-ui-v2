/**
 * ADR list data
 * 
 * This file contains the list of all Architectural Decision Records.
 * Update this file when adding new ADRs to the system.
 * 
 * Format:
 * - number: ADR number (4 digits with leading zeros)
 * - title: ADR title (must match the title in the ADR markdown file)
 * - status: ADR status (must match exactly as in ADR file)
 * - date: ADR date (YYYY-MM-DD format)
 * - exportName: (optional) Story export name - if provided, used for link generation instead of generating from title
 */

export type AdrListItem = {
  number: string;
  title: string;
  status: string;
  date: string;
  exportName?: string; // Optional: story export name for accurate link generation
};

export const adrs: AdrListItem[] = [
  { number: '0001', title: 'React Aria as Headless Accessibility Foundation', status: 'Accepted', date: '2025-12-15' },
  { number: '0002', title: 'Data-Driven Storybook Pipeline via Style Dictionary', status: 'Accepted', date: '2025-12-15' },
  { number: '0003', title: 'Data-Driven Figma Variables Pipeline via Adapter JSON', status: 'Accepted', date: '2025-12-15' },
  { number: '0004', title: 'Context-Aware UI Components and Projection Model', status: 'Accepted', date: '2025-12-15' },
  { number: '0005', title: 'Canonical UI Namespace and Reference Component Baseline', status: 'Accepted', date: '2025-12-15' },
  { number: '0006', title: 'Focus Policy Architecture Driven with System Focus', status: 'Accepted', date: '2025-12-15' },
  { number: '0007', title: 'Focus Token Separation and Policy Mapping', status: 'Accepted', date: '2025-12-15' },
  { number: '0008', title: 'TSX Layer (React Aria) and Storybook Layering', status: 'Accepted', date: '2025-12-16' },
  { number: '0009', title: 'AVE Token Rule — Profile-Aware Visual Encoding', status: 'Accepted', date: '2025-12-16' },
  { number: '0010', title: 'Host-Flexible Interactive Components (React Aria v2, Alpha)', status: 'Accepted', date: '2025-12-16' },
  { number: '0011', title: 'Token-Driven Component Contracts (v1, Exploratory)', status: 'Accepted', date: '2025-12-17' },
  { number: '0012', title: 'Interactive Components Evolution, Layered Architecture, and Contexts (Exploratory Snapshot)', status: 'Accepted', date: '2025-12-17' },
  { number: '0013', title: 'Current Architectural Intent (Exploratory) — Envy UI v2', status: 'Accepted', date: '2025-12-17' },
  { number: '0014', title: 'Color Model, Tonal Scales, and Contextual Architecture', status: 'Accepted', date: '2025-12-18' },
  { number: '0015', title: 'Token-First Contract Layer and Renderer-Agnostic Model', status: 'Accepted', date: '2025-12-18' },
  { number: '0016', title: 'Prefix Unification to eui', status: 'Accepted', date: '2025-12-19' },
  { number: '0017', title: 'Layered Token Architecture for Contexts and Themes', status: 'Accepted', date: '2025-12-20' },
  { number: '0018', title: 'Typography Units Architecture - REM, EM, and PX', status: 'Accepted', date: '2025-01-21' },
  { number: '0019', title: 'Layout Components Architecture', status: 'Accepted', date: '2025-12-21' },
  { number: '0020', title: 'Elevation System Architecture', status: 'Accepted', date: '2025-12-20' },
  { number: '0021', title: 'Web Components as Framework-Agnostic Implementation Layer', status: 'Exploratory', date: '2025-01-XX' },
  { number: '0022', title: 'Storybook Model as AI-Agent-Oriented Architecture Layer', status: 'Proposed (Exploratory)', date: '2025-12-25' },
  { number: '0023', title: 'Token Organization - Context and Theme Separation', status: 'Accepted', date: '2025-12-26', exportName: 'TokenOrganizationContextAndThemeSeparation' },
  { number: '0024', title: 'CSS Layer Strategy for Context Priority', status: 'Accepted', date: '2025-12-26', exportName: 'CSSLayerStrategyForContextPriority' },
  { number: '0025', title: 'Figma Variables Integration Strategy', status: 'Accepted', date: '2025-12-26' },
  { number: '0026', title: 'App-Default Color Positioning and Semantic Token Optimization', status: 'Accepted', date: '2025-12-29', exportName: 'AppDefaultColorPositioning' },
  { number: '0027', title: 'Figma Files Structure and Organization', status: 'Accepted', date: '2025-12-31', exportName: 'FigmaFilesStructureandOrganization' },
  { number: '0028', title: 'Internationalization (i18n) and RTL Support Architecture', status: 'Proposed', date: '2025-01-01', exportName: 'Internationalizationi18nandRTLSupportArchitecture' },
  { number: '0029', title: 'Accessibility Architecture and Decision Framework', status: 'Accepted', date: '2025-12-31', exportName: 'AccessibilityArchitectureandDecisionFramework' }
];

