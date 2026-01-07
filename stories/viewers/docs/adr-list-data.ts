/**
 * ADR list data
 * 
 * ⚠️ SINGLE SOURCE OF TRUTH ⚠️
 * 
 * This file is the SINGLE SOURCE OF TRUTH for all ADR metadata.
 * 
 * **CRITICAL:** When creating or modifying ADRs:
 * 1. Update this file FIRST
 * 2. Then run `npm run adr:generate` to generate story files
 * 3. Then run `npm run adr:validate` to verify consistency
 * 
 * Format:
 * - number: ADR number (4 digits with leading zeros)
 * - title: ADR title (must match the title in the ADR markdown file)
 * - status: ADR status (must match exactly as in ADR file)
 * - date: ADR date (YYYY-MM-DD format)
 * - exportName: (recommended) Story export name - ensures reliable linking in overview page
 * 
 * **exportName rules:**
 * - Remove all non-alphanumeric characters from title
 * - Remove all spaces
 * - Must match the export name in the generated story file
 * - Example: "Token Organization - Context" → `TokenOrganizationContext`
 * 
 * **See:** `docs/adr/AGENT-GUIDE.md` for complete workflow instructions
 */

export type AdrListItem = {
  number: string;
  title: string;
  status: string;
  date: string;
  exportName?: string; // Optional: story export name for accurate link generation
};

export const adrs: AdrListItem[] = [
  { number: '0001', title: 'React Aria as Headless Accessibility Foundation', status: 'Accepted', date: '2025-12-15', exportName: 'ReactAriaasHeadlessAccessibilityFoundation' },
  { number: '0002', title: 'Data-Driven Storybook Pipeline via Style Dictionary', status: 'Accepted', date: '2025-12-15', exportName: 'DataDrivenStorybookPipelineviaStyleDictionary' },
  { number: '0003', title: 'Data-Driven Figma Variables Pipeline via Adapter JSON', status: 'Accepted', date: '2025-12-15', exportName: 'DataDrivenFigmaVariablesPipelineviaAdapterJSON' },
  { number: '0004', title: 'Context-Aware UI Components and Projection Model', status: 'Accepted', date: '2025-12-15', exportName: 'ContextAwareUIComponentsandProjectionModel' },
  { number: '0005', title: 'Canonical UI Namespace and Reference Component Baseline', status: 'Accepted', date: '2025-12-15', exportName: 'CanonicalUINamespaceandReferenceComponentBaseline' },
  { number: '0006', title: 'Focus Policy Architecture Driven with System Focus', status: 'Accepted', date: '2025-12-15', exportName: 'FocusPolicyArchitectureDrivenwithSystemFocus' },
  { number: '0007', title: 'Focus Token Separation and Policy Mapping', status: 'Accepted', date: '2025-12-15', exportName: 'FocusTokenSeparationandPolicyMapping' },
  { number: '0008', title: 'TSX Layer (React Aria) and Storybook Layering', status: 'Accepted', date: '2025-12-16', exportName: 'TSXLayerReactAriaandStorybookLayering' },
  { number: '0009', title: 'AVE Token Rule — Profile-Aware Visual Encoding', status: 'Accepted', date: '2025-12-16', exportName: 'AVETokenRuleProfileAwareVisualEncoding' },
  { number: '0010', title: 'Host-Flexible Interactive Components (React Aria v2, Alpha)', status: 'Accepted', date: '2025-12-16', exportName: 'HostFlexibleInteractiveComponentsReactAriav2Alpha' },
  { number: '0011', title: 'Token-Driven Component Contracts (v1, Exploratory)', status: 'Accepted', date: '2025-12-17', exportName: 'TokenDrivenComponentContractsv1Exploratory' },
  { number: '0012', title: 'Interactive Components Evolution, Layered Architecture, and Contexts (Exploratory Snapshot)', status: 'Accepted', date: '2025-12-17', exportName: 'InteractiveComponentsEvolutionLayeredArchitectureandContextsExploratorySnapshot' },
  { number: '0013', title: 'Current Architectural Intent (Exploratory) — Envy UI v2', status: 'Accepted', date: '2025-12-17', exportName: 'CurrentArchitecturalIntentExploratoryEnvyUIv2' },
  { number: '0014', title: 'Color Model, Tonal Scales, and Contextual Architecture', status: 'Accepted', date: '2025-12-18', exportName: 'ColorModelTonalScalesandContextualArchitecture' },
  { number: '0015', title: 'Token-First Contract Layer and Renderer-Agnostic Model', status: 'Accepted', date: '2025-12-18', exportName: 'TokenFirstContractLayerandRendererAgnosticModel' },
  { number: '0016', title: 'Prefix Unification to eui', status: 'Accepted', date: '2025-12-19', exportName: 'PrefixUnificationtoeui' },
  { number: '0017', title: 'Layered Token Architecture for Contexts and Themes', status: 'Accepted', date: '2025-12-20', exportName: 'LayeredTokenArchitectureforContextsandThemes' },
  { number: '0018', title: 'Typography Units Architecture - REM, EM, and PX', status: 'Accepted', date: '2025-01-21', exportName: 'TypographyUnitsArchitectureREMEMandPX' },
  { number: '0019', title: 'Layout Components Architecture', status: 'Accepted', date: '2025-12-21', exportName: 'LayoutComponentsArchitecture' },
  { number: '0020', title: 'Elevation System Architecture', status: 'Accepted', date: '2025-12-20', exportName: 'ElevationSystemArchitecture' },
  { number: '0021', title: 'Web Components as Framework-Agnostic Implementation Layer', status: 'Exploratory', date: '2025-01-XX', exportName: 'WebComponentsasFrameworkAgnosticImplementationLayer' },
  { number: '0022', title: 'Storybook Model as AI-Agent-Oriented Architecture Layer', status: 'Proposed (Exploratory)', date: '2025-12-25', exportName: 'StorybookModelasAIAgentOrientedArchitectureLayer' },
  { number: '0023', title: 'Token Organization - Context and Theme Separation', status: 'Accepted', date: '2025-12-26', exportName: 'TokenOrganizationContextandThemeSeparation' },
  { number: '0024', title: 'CSS Layer Strategy for Context Priority', status: 'Accepted', date: '2025-12-26', exportName: 'CSSLayerStrategyforContextPriority' },
  { number: '0025', title: 'Figma Variables Integration Strategy', status: 'Accepted', date: '2025-12-26', exportName: 'FigmaVariablesIntegrationStrategy' },
  { number: '0026', title: 'App-Default Color Positioning and Semantic Token Optimization', status: 'Accepted', date: '2025-12-29', exportName: 'AppDefaultColorPositioningandSemanticTokenOptimization' },
  { number: '0027', title: 'Figma Files Structure and Organization', status: 'Accepted', date: '2025-12-31', exportName: 'FigmaFilesStructureandOrganization' },
  { number: '0028', title: 'Internationalization (i18n) and RTL Support Architecture', status: 'Proposed', date: '2025-01-01', exportName: 'Internationalizationi18nandRTLSupportArchitecture' },
  { number: '0029', title: 'Accessibility Architecture and Decision Framework', status: 'Accepted', date: '2025-12-31', exportName: 'AccessibilityArchitectureandDecisionFramework' },
  { number: '0030', title: 'Third-Party Library Integration Strategy', status: 'Accepted', date: '2025-01-02', exportName: 'ThirdPartyLibraryIntegrationStrategy' },
  { number: '0031', title: 'Contrast Strategy for Dynamic Colors and On-Color Tokens', status: 'Proposed', date: '2026-01-05', exportName: 'ContrastStrategyforDynamicColorsandOnColorTokens' },
  { number: '0032', title: 'Token Override Strategy for Multi-Tenant and Generative UI', status: 'Proposed', date: '2026-01-06', exportName: 'TokenOverrideStrategyforMultiTenantandGenerativeUI' },
  { number: '0033', title: 'Accessibility Strategy for Theme Switching Across Contexts', status: 'Proposed', date: '2026-01-05', exportName: 'AccessibilityStrategyforThemeSwitchingAcrossContexts' },
  { number: '0034', title: 'Theme Presets - Component Props Extension for Third-Party Integration', status: 'Proposed', date: '2026-01-06', exportName: 'ThemePresetsComponentPropsExtensionforThirdPartyIntegration' },
  { number: '0035', title: 'CSS Naming Conventions - Class Names vs Data Attributes', status: 'Accepted', date: '2026-01-07', exportName: 'CSSNamingConventionsClassNamesvsDataAttributes' },
  { number: '0036', title: 'AI-First Component Architecture Vision', status: 'Proposed (Evolutionary)', date: '2026-01-07', exportName: 'AIFirstComponentArchitectureVision' }
];
