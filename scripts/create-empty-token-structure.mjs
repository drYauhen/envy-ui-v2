#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const SCHEMA_URL = 'https://schemas.s1seven.com/style-dictionary/v3/schema.json';

// Компоненты и их файлы
const components = {
  'alert-banner': ['border.json', 'colors.json', 'spacing.json', 'z-index.json'],
  'app-shell': ['layout.json'],
  'avatar': ['border.json', 'colors.json', 'shape.json', 'size.json', 'typography.json'],
  'avatar-group': ['layout.json'],
  'button': ['border.json', 'colors.json', 'focus.json', 'group.json', 'layout.json', 'separator.json', 'shape.json', 'size.json'],
  'calendar': ['border.json', 'colors.json', 'size.json', 'spacing.json', 'typography.json'],
  'card': ['status.json', 'variant.json'],
  'celebration': ['animation.json', 'colors.json'],
  'checkbox': ['border.json', 'colors.json', 'focus.json', 'layout.json', 'shape.json', 'size.json'],
  'content': ['colors.json', 'spacing.json'],
  'counter': ['colors.json', 'shape.json', 'size.json', 'spacing.json', 'typography.json'],
  'detail-panel': ['colors.json', 'shadow.json', 'size.json', 'spacing.json'],
  'divider': ['colors.json', 'size.json', 'spacing.json'],
  'form': ['spacing.json'],
  'header': ['colors.json', 'size.json', 'spacing.json'],
  'hero-section': ['colors.json', 'size.json', 'spacing.json', 'typography.json'],
  'input': ['border.json', 'colors.json', 'focus.json', 'group.json', 'shape.json', 'size.json', 'typography.json'],
  'menu': ['border.json', 'colors.json', 'shadow.json', 'shape.json', 'size.json', 'spacing.json'],
  'modal': ['backdrop.json', 'colors.json', 'shadow.json', 'shape.json', 'size.json', 'spacing.json'],
  'select': ['colors.json', 'dropdown.json', 'primitive.json'],
  'sidebar': ['animation.json', 'colors.json', 'size.json', 'spacing.json'],
  'skeleton': ['animation.json', 'colors.json', 'shape.json', 'size.json'],
  'switch': ['border.json', 'colors.json', 'focus.json', 'shape.json', 'size.json'],
  'table': ['border.json', 'colors.json', 'expandable-cell.json', 'folder.json', 'spacing.json'],
  'textarea': ['size.json', 'typography.json'],
  'title-bar': ['colors.json', 'size.json', 'spacing.json']
};

// Foundations файлы
const foundationsFiles = {
  'colors': ['accent.json', 'brand.json', 'neutral.json', 'signal.json', 'status.json', 'status-application.json'],
  'typography': ['font-family.json', 'font-size.json', 'font-style.json', 'font-weight.json', 'letter-spacing.json', 'line-height.json', 'text-decoration.json', 'text-transform.json']
};

const foundationsRoot = ['breakpoints.json', 'shape.json', 'spacing.json'];

// Semantic файлы
const semanticFiles = {
  'colors': ['background.json', 'border.json', 'focus.json', 'text.json'],
  'layout': ['container.json', 'page.json', 'section.json', 'toolbar.json'],
  'typography': ['text-styles.json']
};

const semanticRoot = ['shadow.json', 'shape.json'];

// Themes
const themes = {
  'website': ['default.json', 'dark.json'],
  'report': ['print.json', 'screen.json']
};

function createEmptyFile(filePath, description) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  
  const content = {
    $schema: SCHEMA_URL,
    eui: {
      $description: description
    }
  };
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
  console.log(`Created: ${filePath}`);
}

function createContextStructure(context) {
  const contextPath = path.join(repoRoot, 'tokens', context);
  
  // Foundations
  console.log(`\nCreating ${context}/foundations/...`);
  for (const file of foundationsRoot) {
    const filePath = path.join(contextPath, 'foundations', file);
    const category = file.replace('.json', '');
    createEmptyFile(filePath, `${context} context - Foundation ${category}. This structure is defined but currently empty. Tokens will be added when ${context} context is developed.`);
  }
  
  for (const [subdir, files] of Object.entries(foundationsFiles)) {
    for (const file of files) {
      const filePath = path.join(contextPath, 'foundations', subdir, file);
      const category = file.replace('.json', '').replace('-', ' ');
      createEmptyFile(filePath, `${context} context - Foundation ${subdir}/${category}. This structure is defined but currently empty. Tokens will be added when ${context} context is developed.`);
    }
  }
  
  // Semantic
  console.log(`\nCreating ${context}/semantic/...`);
  for (const file of semanticRoot) {
    const filePath = path.join(contextPath, 'semantic', file);
    const category = file.replace('.json', '');
    createEmptyFile(filePath, `${context} context - Semantic ${category}. This structure is defined but currently empty. Tokens will be added when ${context} context is developed.`);
  }
  
  for (const [subdir, files] of Object.entries(semanticFiles)) {
    for (const file of files) {
      const filePath = path.join(contextPath, 'semantic', subdir, file);
      const category = file.replace('.json', '');
      createEmptyFile(filePath, `${context} context - Semantic ${subdir}/${category}. This structure is defined but currently empty. Tokens will be added when ${context} context is developed.`);
    }
  }
  
  // Components
  console.log(`\nCreating ${context}/components/...`);
  for (const [component, files] of Object.entries(components)) {
    for (const file of files) {
      const filePath = path.join(contextPath, 'components', component, file);
      const category = file.replace('.json', '');
      createEmptyFile(filePath, `${context} context - Component ${component}/${category}. This structure is defined but currently empty. Tokens will be added when ${context} context is developed.`);
    }
  }
  
  // Themes
  console.log(`\nCreating ${context}/themes/...`);
  if (themes[context]) {
    for (const theme of themes[context]) {
      const filePath = path.join(contextPath, 'themes', theme);
      const themeName = theme.replace('.json', '');
      createEmptyFile(filePath, `${context} context - ${themeName} theme. This structure is defined but currently empty. Tokens will be added when ${context} context is developed.`);
    }
  }
}

// Main
console.log('Creating empty token structures for website and report contexts...\n');

createContextStructure('website');
createContextStructure('report');

console.log('\n✅ Done! Empty token structures created.');

