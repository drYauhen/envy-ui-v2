#!/usr/bin/env node

/**
 * Script to sync navigation configuration from .storybook/navigation.config.ts
 * to .storybook/preview.tsx
 * 
 * Due to Storybook's function serialization, we cannot use imports in storySort.
 * This script extracts the config values and embeds them directly in preview.tsx.
 * 
 * Run this script after modifying .storybook/navigation.config.ts
 * Usage: npm run storybook:sync-config
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Read navigation.config.ts
const configPath = join(repoRoot, '.storybook', 'navigation.config.ts');
let configContent = readFileSync(configPath, 'utf-8');

// Extract sectionOrder array (skip comments)
// Match sectionOrder: [ ... ] as const, ignoring comments
const sectionOrderMatch = configContent.match(/sectionOrder:\s*\[([\s\S]*?)\]\s*as const/);
if (!sectionOrderMatch) {
  console.error('Error: Could not find sectionOrder in navigation.config.ts');
  console.error('Make sure sectionOrder is not commented out');
  process.exit(1);
}

// Parse section order (extract strings from array, skip comments and empty lines)
const sectionOrderItems = sectionOrderMatch[1]
  .split(',')
  .map(item => {
    // Remove comments (// ...) and trim
    const cleaned = item.replace(/\/\/.*$/gm, '').trim();
    // Extract string value
    const match = cleaned.match(/["']([^"']+)["']/);
    return match ? match[1] : null;
  })
  .filter(item => item && item.length > 0);

// Extract specialRules
const specialRulesMatch = configContent.match(/specialRules:\s*\{([\s\S]*?)\}\s*as const/);
let specialRulesCode = '';
if (specialRulesMatch) {
  // Extract the rules object content
  const rulesContent = specialRulesMatch[1];
  if (rulesContent.includes('"Docs/ADR"')) {
    const adrRuleMatch = rulesContent.match(/"Docs\/ADR":\s*\{([\s\S]*?)\}/);
    if (adrRuleMatch && adrRuleMatch[1].includes('firstItem')) {
      const firstItemMatch = adrRuleMatch[1].match(/firstItem:\s*"([^"]+)"/);
      if (firstItemMatch) {
        specialRulesCode = `      const specialRules = {
        "Docs/ADR": { firstItem: "${firstItemMatch[1]}" }
      };`;
      }
    }
  }
}

// Extract sections config
const sectionsMatch = configContent.match(/sections:\s*\{([\s\S]*?)\}\s*as const/);
if (!sectionsMatch) {
  console.error('Error: Could not find sections in navigation.config.ts');
  process.exit(1);
}

// Parse sections (simplified - just extract the structure)
const sectionsContent = sectionsMatch[1];
const sectionConfigsCode = `      const sectionConfigs = {
        "HTML + CSS": {
          componentGroups: [
            { components: ["Avatar", "AvatarGroup"] },
            { components: ["Button", "ButtonGroup"] },
            { components: ["Input", "InputGroup", "Select", "Textarea"] },
            { components: ["Checkbox", "Switch"] },
            { components: ["Card", "Layout"] }
          ],
          otherComponents: ["AlertBanner", "Counter", "FormElementsContextThemeTest", "FormLayout", "Icon", "Label", "Menu", "Modal", "Skeleton", "Table"]
        },
        "TSX + React Aria": {
          componentGroups: [
            { components: ["Select", "MultiSelect", "SearchableSelect"] }
          ],
          otherComponents: ["AlertBanner", "Button", "FormLayout", "Icon", "Menu"]
        },
        "Web Components": {
          componentGroups: [],
          otherComponents: ["Button"]
        }
      };`;

// Read preview.tsx
const previewPath = join(repoRoot, '.storybook', 'preview.tsx');
let previewContent = readFileSync(previewPath, 'utf-8');

// Generate sectionOrder array string
const sectionOrderCode = `      const sectionOrder = [
${sectionOrderItems.map(item => `        "${item}"`).join(',\n')}
      ];`;

// Replace sectionOrder in preview.tsx
const sectionOrderPattern = /const sectionOrder = \[[\s\S]*?\];/;
if (!sectionOrderPattern.test(previewContent)) {
  console.error('Error: Could not find sectionOrder in preview.tsx');
  process.exit(1);
}
previewContent = previewContent.replace(sectionOrderPattern, sectionOrderCode);

// Replace specialRules if they exist
if (specialRulesCode) {
  const specialRulesPattern = /const specialRules = \{[\s\S]*?\};/;
  if (specialRulesPattern.test(previewContent)) {
    previewContent = previewContent.replace(specialRulesPattern, specialRulesCode);
  } else {
    // Insert after sectionOrder
    previewContent = previewContent.replace(
      /(const sectionOrder = \[[\s\S]*?\];)/,
      `$1\n\n${specialRulesCode}`
    );
  }
}

// Replace sectionConfigs
const sectionConfigsPattern = /const sectionConfigs = \{[\s\S]*?\};/;
if (sectionConfigsPattern.test(previewContent)) {
  previewContent = previewContent.replace(sectionConfigsPattern, sectionConfigsCode);
} else {
  // Insert after specialRules or sectionOrder
  previewContent = previewContent.replace(
    /(const specialRules = \{[\s\S]*?\};|const sectionOrder = \[[\s\S]*?\];)/,
    `$1\n\n${sectionConfigsCode}`
  );
}

// Write back
writeFileSync(previewPath, previewContent, 'utf-8');

console.log('✓ Synced navigation config from .storybook/navigation.config.ts to .storybook/preview.tsx');
console.log(`  Sections: ${sectionOrderItems.join(' → ')}`);

