/**
 * ADR filename mapping
 * 
 * Maps ADR numbers to their actual filenames.
 * This is needed because ADR files have descriptive names (e.g., ADR-0027-figma-files-structure-and-organization.md)
 * but AdrViewer needs to load them by number.
 * 
 * This file is auto-generated. To regenerate, run:
 * node -e "const fs = require('fs'); const files = fs.readdirSync('docs/adr').filter(f => f.startsWith('ADR-') && f.endsWith('.md') && !f.includes('TEMPLATE')); const mapping = files.map(f => { const match = f.match(/^ADR-(\d+)-(.+)\.md$/); if (match) return { number: match[1], filename: f }; return null; }).filter(Boolean); console.log('export const adrFilenameMap: Record<string, string> = ' + JSON.stringify(Object.fromEntries(mapping.map(m => [m.number, m.filename])), null, 2) + ';');"
 */

export const adrFilenameMap: Record<string, string> = {
  "0001": "ADR-0001-react-aria-headless.md",
  "0002": "ADR-0002-data-driven-storybook-pipeline.md",
  "0003": "ADR-0003-data-driven-figma-variables-pipeline.md",
  "0004": "ADR-0004-context-aware-ui-components-and-projection-model.md",
  "0005": "ADR-0005-canonical-ui-namespace-and-reference-component-baseline.md",
  "0006": "ADR-0006-focus-policy-architecture.md",
  "0007": "ADR-0007-focus-token-separation-and-policy-mapping.md",
  "0008": "ADR-0008-tsx-layer-react-aria-and-storybook-layering.md",
  "0009": "ADR-0009-ave-token-rule-profile-aware-visual-encoding.md",
  "0010": "ADR-0010-host-flexible-interactive-components-react-aria-v2-alpha.md",
  "0011": "ADR-0011-token-driven-component-contracts-v1-exploratory.md",
  "0012": "ADR-0012-interactive-components-evolution-layered-architecture-and-contexts.md",
  "0013": "ADR-0013-current-architectural-intent-exploratory.md",
  "0014": "ADR-0014-color-model-tonal-scales-and-contextual-architecture.md",
  "0015": "ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md",
  "0016": "ADR-0016-prefix-unification-eui.md",
  "0017": "ADR-0017-layered-token-architecture-contexts-and-themes.md",
  "0018": "ADR-0018-typography-units-architecture-rem-em-px.md",
  "0019": "ADR-0019-layout-components-architecture.md",
  "0020": "ADR-0020-elevation-system-architecture.md",
  "0021": "ADR-0021-web-components-framework-agnostic-layer.md",
  "0022": "ADR-0022-storybook-model-ai-agent-oriented-architecture.md",
  "0023": "ADR-0023-token-organization-context-and-theme-separation.md",
  "0024": "ADR-0024-css-layer-strategy-context-priority.md",
  "0025": "ADR-0025-figma-variables-integration-strategy.md",
  "0026": "ADR-0026-app-default-color-positioning.md",
  "0027": "ADR-0027-figma-files-structure-and-organization.md",
  "0028": "ADR-0028-internationalization-and-rtl-support.md",
  "0029": "ADR-0029-accessibility-architecture-and-decision-framework.md",
  "0030": "ADR-0030-third-party-library-integration-strategy.md"
};
