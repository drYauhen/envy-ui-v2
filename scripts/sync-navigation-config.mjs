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

// Parse sections dynamically from navigation.config.ts
const sectionsContent = sectionsMatch[1];
const sectionConfigs = {};

// Parse each section - need to handle nested objects properly
// Match: "Section Name": { ... } with proper brace matching
let pos = 0;
const sectionPattern = /"([^"]+)":\s*\{/g;
let sectionMatch;

while ((sectionMatch = sectionPattern.exec(sectionsContent)) !== null) {
  const sectionName = sectionMatch[1];
  const startPos = sectionMatch.index + sectionMatch[0].length;
  
  // Find matching closing brace
  let braceCount = 1;
  let endPos = startPos;
  while (braceCount > 0 && endPos < sectionsContent.length) {
    if (sectionsContent[endPos] === '{') braceCount++;
    if (sectionsContent[endPos] === '}') braceCount--;
    endPos++;
  }
  
  const sectionBody = sectionsContent.substring(startPos, endPos - 1);
  
  // Parse componentGroups - need to handle nested arrays properly
  const componentGroupsMatch = sectionBody.match(/componentGroups:\s*\[/);
  const componentGroups = [];
  if (componentGroupsMatch) {
    const groupsStartPos = componentGroupsMatch.index + componentGroupsMatch[0].length;
    // Find matching closing bracket for componentGroups array
    let bracketCount = 1;
    let groupsEndPos = groupsStartPos;
    while (bracketCount > 0 && groupsEndPos < sectionBody.length) {
      if (sectionBody[groupsEndPos] === '[') bracketCount++;
      if (sectionBody[groupsEndPos] === ']') bracketCount--;
      groupsEndPos++;
    }
    const groupsContent = sectionBody.substring(groupsStartPos, groupsEndPos - 1);
    
    // Match each group object: { components: [...] } with proper brace/bracket matching
    const groupPattern = /\{\s*components:\s*\[/g;
    let groupMatch;
    while ((groupMatch = groupPattern.exec(groupsContent)) !== null) {
      const groupStartPos = groupMatch.index + groupMatch[0].length;
      // Find matching closing bracket for components array
      let compBracketCount = 1;
      let compEndPos = groupStartPos;
      while (compBracketCount > 0 && compEndPos < groupsContent.length) {
        if (groupsContent[compEndPos] === '[') compBracketCount++;
        if (groupsContent[compEndPos] === ']') compBracketCount--;
        compEndPos++;
      }
      const componentsStr = groupsContent.substring(groupStartPos, compEndPos - 1);
      const components = componentsStr
        .split(',')
        .map(c => {
          // Remove comments and extract string value
          const cleaned = c.replace(/\/\/.*$/gm, '').trim();
          const match = cleaned.match(/["']([^"']+)["']/);
          return match ? match[1] : null;
        })
        .filter(c => c && c.length > 0);
      if (components.length > 0) {
        componentGroups.push({ components });
      }
    }
  }
  
  // Parse otherComponents - need to handle nested arrays properly
  const otherComponentsMatch = sectionBody.match(/otherComponents:\s*\[/);
  let otherComponents = [];
  if (otherComponentsMatch) {
    const otherStartPos = otherComponentsMatch.index + otherComponentsMatch[0].length;
    // Find matching closing bracket for otherComponents array
    let bracketCount = 1;
    let otherEndPos = otherStartPos;
    while (bracketCount > 0 && otherEndPos < sectionBody.length) {
      if (sectionBody[otherEndPos] === '[') bracketCount++;
      if (sectionBody[otherEndPos] === ']') bracketCount--;
      otherEndPos++;
    }
    const otherComponentsStr = sectionBody.substring(otherStartPos, otherEndPos - 1);
    otherComponents = otherComponentsStr
      .split(',')
      .map(c => {
        // Remove comments and extract string value
        const cleaned = c.replace(/\/\/.*$/gm, '').trim();
        const match = cleaned.match(/["']([^"']+)["']/);
        return match ? match[1] : null;
      })
      .filter(c => c && c.length > 0);
  }
  
  sectionConfigs[sectionName] = {
    componentGroups,
    otherComponents
  };
}

// Generate sectionConfigs code
const sectionConfigsCode = `      const sectionConfigs = {
${Object.entries(sectionConfigs).map(([sectionName, config]) => {
  const groupsCode = config.componentGroups.length > 0
    ? `          componentGroups: [\n${config.componentGroups.map(group => 
        `            { components: [${group.components.map(c => `"${c}"`).join(', ')}] }`
      ).join(',\n')}\n          ],`
    : '          componentGroups: [],';
  const otherComponentsCode = `          otherComponents: [${config.otherComponents.map(c => `"${c}"`).join(', ')}]`;
  return `        "${sectionName}": {\n${groupsCode}\n${otherComponentsCode}\n        }`;
}).join(',\n')}
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

