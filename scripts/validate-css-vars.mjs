#!/usr/bin/env node

/**
 * CSS Variable Validators v1 - Audit + Fix + Enforce
 *
 * Validates CSS variable references and component coverage
 * to prevent undefined variables and detect regressions.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Policy: structure CSS is generated from contracts for machine-run stability.
// Escape hatch: if complexity grows, switch to hybrid only after ADR/Rules update.
const ALLOW_MANUAL_STRUCTURE_CSS = process.env.ALLOW_MANUAL_STRUCTURE_CSS === 'true';

// Runtime CSS files used by Storybook
const RUNTIME_CSS_FILES = [
  'generated/css/tokens.primitives.css',
  'generated/css/tokens.contexts.css',
  'generated/css/tokens.themes.css',
  'generated/css/components/badge.tokens.css',
  'generated/css/components/card.tokens.css',
  'generated/css/components/stack.tokens.css',
  'generated/css/components/inline.tokens.css',
  'generated/css/components/grid.tokens.css',
  'generated/css/components/section.tokens.css',
  'generated/css/components/container.tokens.css',
  'generated/css/components/page.tokens.css',
  'generated/css/components/content.tokens.css',
  'generated/css/components/code-block.tokens.css',
  'generated/css/components/table.tokens.css',
  'generated/css/components/table-container.tokens.css',
  'generated/css/components/callout.tokens.css',
  'generated/css/components/button.tokens.css',
  'generated/css/components/input.tokens.css',
  'generated/css/components/input-group.tokens.css',
  'generated/css/components/avatar.tokens.css',
  'generated/css/components/avatar-group.tokens.css',
  'generated/css/components/tooltip.tokens.css',
  'generated/css/components/side-nav.tokens.css',
  'generated/css/components/logo.tokens.css',
  'generated/css/components/form.tokens.css',
  'src/ui/focus-policy.css',
  // NOTE: Include structure CSS for components that define local vars used by tokens.
  'src/ui/components/badge/badge.structure.css',
  'src/ui/components/card/card.structure.css',
  'src/ui/components/input/input.structure.css',
  'src/ui/components/input-group/input-group.structure.css',
  'src/ui/components/form/form.structure.css',
  'src/ui/components/side-nav/side-nav.structure.css',
  'src/ui/components/logo/logo.structure.css'
];

// Golden components for contract validation
const GOLDEN_COMPONENTS = [
  {
    name: 'badge',
    structureCss: 'src/ui/components/badge/badge.structure.css',
    tokensCss: 'generated/css/components/badge.tokens.css',
    contractJson: 'tokens/components/badge.contract.json'
  },
  {
    name: 'card',
    structureCss: 'src/ui/components/card/card.structure.css',
    tokensCss: 'generated/css/components/card.tokens.css',
    contractJson: 'tokens/components/card.contract.json'
  }
];

// Utility: Extract all --variable: definitions from CSS
function extractVariableDefinitions(cssContent, filePath) {
  const definitions = new Map();
  const lines = cssContent.split('\n');

  lines.forEach((line, index) => {
    // Match: --variable-name: value;
    const defMatch = line.match(/^\s*--([a-zA-Z0-9-]+):\s*([^;]+);/);
    if (defMatch) {
      const [, varName, value] = defMatch;
      definitions.set(varName, {
        value: value.trim(),
        file: filePath,
        line: index + 1
      });
    }
  });

  return definitions;
}

// Utility: Extract all var(--variable) references from CSS
function extractVariableReferences(cssContent, filePath) {
  const references = [];
  const lines = cssContent.split('\n');

  lines.forEach((line, index) => {
    // Match: var(--variable-name)
    const varRegex = /var\(--([a-zA-Z0-9-]+)\)/g;
    let match;
    while ((match = varRegex.exec(line)) !== null) {
      const [, varName] = match;
      references.push({
        variable: varName,
        file: filePath,
        line: index + 1,
        fullMatch: match[0]
      });
    }
  });

  return references;
}

// Utility: Check if file exists and is readable
function safeReadFile(filePath) {
  try {
    if (!existsSync(filePath)) return null;
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    return null;
  }
}

function validateStructureCssPolicy(component, structureContent, errors) {
  if (ALLOW_MANUAL_STRUCTURE_CSS) return;

  const requiredMarker = `Generated from: ${component.contractJson}`;
  if (!structureContent.includes(requiredMarker)) {
    errors.push({
      rule: 'manual-structure-css-disallowed',
      component: component.name,
      file: component.structureCss,
      message: `Structure CSS must be generated from ${component.contractJson}; update ADR/Rules before allowing manual structure CSS.`
    });
  }
}

// Utility: Recursively find CSS files
function findCssFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findCssFiles(filePath, fileList);
    } else if (file.endsWith('.css')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Validator A: CSS Var Reference Completeness (ERROR)
function validateCssVarCompleteness() {
  console.log('\n🔍 Validator A: CSS Variable Reference Completeness');

  const allDefinitions = new Map();
  const allReferences = [];
  const errors = [];

  // Load all runtime CSS files
  RUNTIME_CSS_FILES.forEach(cssFile => {
    const fullPath = join(repoRoot, cssFile);
    const content = safeReadFile(fullPath);

    if (!content) {
      console.warn(`⚠️  Warning: Could not read ${cssFile}`);
      return;
    }

    // Extract definitions and references
    const definitions = extractVariableDefinitions(content, cssFile);
    const references = extractVariableReferences(content, cssFile);

    // Add to global collections
    definitions.forEach((def, varName) => {
      allDefinitions.set(varName, def);
    });
    allReferences.push(...references);
  });

  console.log(`📊 Found ${allDefinitions.size} variable definitions`);
  console.log(`📊 Found ${allReferences.size} variable references`);

  // Check 1: Every var(--X) must have --X: defined
  allReferences.forEach(ref => {
    if (!allDefinitions.has(ref.variable)) {
      errors.push({
        rule: 'undefined-variable',
        file: ref.file,
        line: ref.line,
        variable: ref.variable,
        message: `Undefined variable: --${ref.variable}`
      });
    }
  });

  // Check 2: No self-aliases (--X: var(--X))
  allDefinitions.forEach((def, varName) => {
    const value = def.value;
    // Check if value is exactly var(--varName) or var(--varName, ...)
    const selfAliasRegex = new RegExp(`^var\\(--${varName}(,\\s*[^)]+)?\\)$`);
    if (selfAliasRegex.test(value)) {
      errors.push({
        rule: 'self-alias',
        file: def.file,
        line: def.line,
        variable: varName,
        message: `Self-alias detected: --${varName}: ${value}`
      });
    }
  });

  // Check 3: No raw layer references if raw layer excluded from runtime
  // (For now, allow raw references but warn - can be made strict later)
  const rawReferences = allReferences.filter(ref => ref.variable.includes('-raw-'));
  if (rawReferences.length > 0) {
    console.warn(`\n⚠️  Warning: Found ${rawReferences.length} raw layer references in runtime CSS:`);
    rawReferences.forEach(ref => {
      console.warn(`  ${ref.file}:${ref.line} - --${ref.variable}`);
    });
  }

  return errors;
}

// Validator C: Runtime CSS Var Completeness Check (ERROR)
function validateRuntimeVarCompleteness() {
  console.log('\n🔍 Validator C: Runtime CSS Variable Completeness Check');

  const errors = [];

  // Load component token CSS files to find --eui-color-status-* references
  const componentFiles = [
    'generated/css/components/badge.tokens.css',
    'generated/css/components/card.tokens.css'
  ];

  const statusVarReferences = new Set();

  componentFiles.forEach(filePath => {
    const content = safeReadFile(join(repoRoot, filePath));
    if (!content) {
      console.warn(`⚠️  Warning: Could not read ${filePath}`);
      return;
    }

    // Find all var(--eui-color-status-*) references
    const statusVarRegex = /var\(--eui-color-status-[^)]+\)/g;
    let match;
    while ((match = statusVarRegex.exec(content)) !== null) {
      const varRef = match[0].replace('var(', '').replace(')', '');
      const normalized = varRef.replace(/^--/, '');
      statusVarReferences.add(normalized);
    }
  });

  console.log(`📊 Found ${statusVarReferences.size} --eui-color-status-* references in component CSS:`);
  statusVarReferences.forEach(ref => console.log(`  - --${ref}`));

  // Check that each referenced var is defined in contexts CSS
  const contextsContent = safeReadFile(join(repoRoot, 'generated/css/tokens.contexts.css'));
  if (!contextsContent) {
    errors.push({
      rule: 'missing-contexts-css',
      message: 'Could not read generated/css/tokens.contexts.css'
    });
    return errors;
  }

  statusVarReferences.forEach(varName => {
    const varDefinition = `--${varName}:`;
    if (!contextsContent.includes(varDefinition)) {
      errors.push({
        rule: 'undefined-status-var',
        variable: `--${varName}`,
        message: `Status variable --${varName} is referenced in component CSS but not defined in contexts CSS`
      });
    } else {
      console.log(`  ✅ --${varName} (defined in contexts CSS)`);
    }
  });

  return errors;
}

// Validator B: Contract-driven Component Coverage (ERROR)
function validateContractCoverage() {
  console.log('\n🔍 Validator B: Contract-driven Component Coverage');

  const errors = [];

  GOLDEN_COMPONENTS.forEach(component => {
    console.log(`\n📦 Checking ${component.name} component...`);

    // Read contract to get localVars that should be excluded
    const contractContent = safeReadFile(join(repoRoot, component.contractJson));
    let localVars = new Set();
    if (contractContent) {
      try {
        const contract = JSON.parse(contractContent);
        if (contract.componentVars && contract.componentVars.localVars) {
          localVars = new Set(Object.keys(contract.componentVars.localVars));
        }
      } catch (e) {
        console.warn(`⚠️  Warning: Could not parse contract ${component.contractJson}: ${e.message}`);
      }
    }

    // Read structure CSS to extract required variables
    const structureContent = safeReadFile(join(repoRoot, component.structureCss));
    if (!structureContent) {
      console.warn(`⚠️  Warning: Could not read ${component.structureCss}`);
      return;
    }

    validateStructureCssPolicy(component, structureContent, errors);
    const structureRefs = extractVariableReferences(structureContent, component.structureCss);

    // Filter to component-specific variables: var(--eui-<component>-*)
    // But exclude localVars which are defined locally in the component CSS
    const componentVarPattern = new RegExp(`^eui-${component.name}-`);
    const requiredVars = structureRefs.filter(ref =>
      componentVarPattern.test(ref.variable) && !localVars.has(`--${ref.variable}`)
    );
    const uniqueRequiredVars = Array.from(
      new Map(requiredVars.map(ref => [ref.variable, ref])).values()
    );

    console.log(`📊 ${component.name} requires ${uniqueRequiredVars.length} component variables (${localVars.size} local vars excluded)`);

    if (uniqueRequiredVars.length === 0) {
      console.warn(`⚠️  Warning: No component variables found in ${component.structureCss}`);
      return;
    }

    // Read component tokens CSS
    const tokensContent = safeReadFile(join(repoRoot, component.tokensCss));
    if (!tokensContent) {
      console.warn(`⚠️  Warning: Could not read ${component.tokensCss}`);
      return;
    }

    const tokenDefinitions = extractVariableDefinitions(tokensContent, component.tokensCss);

    // Read global tokens CSS for fallback
    const globalTokensContent = safeReadFile(join(repoRoot, 'generated/css/tokens.css'));
    const globalDefinitions = globalTokensContent ?
      extractVariableDefinitions(globalTokensContent, 'generated/css/tokens.css') : new Map();

    // Check each required variable
    uniqueRequiredVars.forEach(req => {
      const varName = req.variable;
      const definedInComponent = tokenDefinitions.has(varName);
      const definedGlobally = globalDefinitions.has(varName);

      if (!definedInComponent && !definedGlobally) {
        errors.push({
          rule: 'missing-component-variable',
          component: component.name,
          file: req.file,
          line: req.line,
          variable: varName,
          message: `Missing component variable: --${varName} (not defined in ${component.tokensCss} or global tokens)`
        });
      } else if (definedInComponent) {
        console.log(`  ✅ --${varName} (defined in component tokens)`);
      } else if (definedGlobally) {
        console.log(`  ✅ --${varName} (defined in global tokens)`);
      }
    });
  });

  return errors;
}

// Main execution
function main() {
  console.log('🚀 CSS Variable Validators v1');

  const allErrors = [];

  // Run Validator A
  const completenessErrors = validateCssVarCompleteness();
  allErrors.push(...completenessErrors);

  // Run Validator B
  const coverageErrors = validateContractCoverage();
  allErrors.push(...coverageErrors);

  // Run Validator C
  const runtimeErrors = validateRuntimeVarCompleteness();
  allErrors.push(...runtimeErrors);

  // Report results
  if (allErrors.length === 0) {
    console.log('\n✅ All CSS variable validations passed!');
    process.exit(0);
  }

  console.error('\n❌ CSS Variable Validation Errors:');
  allErrors.forEach(err => {
    console.error(`  ${err.file}:${err.line || ''} - ${err.message}`);
  });

  console.error(`\n❌ Found ${allErrors.length} validation error(s)`);
  console.error('   Fix these issues before committing');

  process.exit(1);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateCssVarCompleteness, validateContractCoverage, validateRuntimeVarCompleteness };
