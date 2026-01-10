#!/usr/bin/env node

/**
 * Validates token architecture against canonical rules
 * Ensures compliance with Primitives → Raw → Semantics → Themes → Components
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Canonical directory classification
const CANONICAL_PATHS = [
  'tokens/primitives/**',
  'tokens/contexts/**/raw/**',
  'tokens/contexts/**/semantics/**',
  'tokens/contexts/**/themes/**',
  'tokens/contexts/**/components.json'
];

const EXCLUDED_PATHS = [
  'tokens/knowledge/**',
  'tokens/legacy/**',
  '**/node_modules/**',
  '**/.git/**'
];

// Utility to check if path matches patterns
function matchesPath(path, patterns) {
  return patterns.some(pattern => {
    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
    return regex.test(path);
  });
}

// Utility to find all JSON files recursively
function findJsonFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // Skip excluded directories
      if (!matchesPath(filePath, EXCLUDED_PATHS)) {
        findJsonFiles(filePath, fileList);
      }
    } else if (file.endsWith('.json') && !file.endsWith('.meta.json')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Load and parse all token files
function loadTokenFiles() {
  const allFiles = findJsonFiles(join(repoRoot, 'tokens'));
  const tokenFiles = {};

  allFiles.forEach(filePath => {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const relativePath = relative(join(repoRoot, 'tokens'), filePath);
      tokenFiles[relativePath] = JSON.parse(content);
    } catch (error) {
      console.error(`❌ Error parsing ${filePath}: ${error.message}`);
      process.exit(1);
    }
  });

  return tokenFiles;
}

// Build canonical token index: Map<tokenPath, { file, layer }>
function buildTokenIndex(tokenFiles) {
  const tokenIndex = new Map();

  Object.entries(tokenFiles).forEach(([filePath, content]) => {
    // Determine layer from file path
    let layer = 'unknown';
    if (filePath.startsWith('primitives/')) layer = 'primitives';
    else if (filePath.includes('/raw/')) layer = 'raw';
    else if (filePath.includes('/semantics/')) layer = 'semantics';
    else if (filePath.includes('/themes/')) layer = 'themes';
    else if (filePath.includes('/components.json')) layer = 'components';
    else if (filePath.startsWith('knowledge/')) layer = 'knowledge';
    else if (filePath.startsWith('legacy/')) layer = 'legacy';

    // Extract all token paths from the file
    function extractTokenPaths(obj, currentPath = '') {
      if (typeof obj === 'object' && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
          const path = currentPath ? `${currentPath}.${key}` : key;

          if (key === '$value') {
            // This is a token definition - add to index
            tokenIndex.set(path, { file: filePath, layer: layer });
          } else if (typeof value === 'object') {
            extractTokenPaths(value, path);
          }
        }
      }
    }

    extractTokenPaths(content);
  });

  return tokenIndex;
}

// Extract all token references from a value
function extractReferences(value) {
  if (typeof value !== 'string') return [];
  const refRegex = /\{([^}]+)\}/g;
  const refs = [];
  let match;
  while ((match = refRegex.exec(value)) !== null) {
    refs.push(match[1]);
  }
  return refs;
}

// Deep traverse token object to find all $value fields
function findAllValues(obj, path = '', results = []) {
  if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (key === '$value') {
        results.push({
          path: currentPath.replace(/\.\$value$/, ''),
          value: value,
          file: null // Will be set by caller
        });
      } else {
        findAllValues(value, currentPath, results);
      }
    }
  }
  return results;
}

// Check if value looks like a literal (not a reference)
function isLiteralValue(value) {
  if (typeof value !== 'string') return false;
  if (value.startsWith('{') && value.endsWith('}')) return false;

  // Common literal patterns
  const literalPatterns = [
    /^\d+(?:\.\d+)?(?:px|rem|em|%|deg|ms|s|pt|pc|in|cm|mm)$/,
    /^#[0-9a-fA-F]{3,8}$/,
    /^rgb\(|^rgba\(|^hsl\(|^hsla\(|^oklch\(|^oklab\(|^lab\(|^lch\(/,
    /^\d+(?:\.\d+)?$/
  ];

  return literalPatterns.some(pattern => pattern.test(value));
}

// Main validation logic
function validateTokenArchitecture() {
  console.log('🔍 Loading token files...');
  const tokenFiles = loadTokenFiles();
  console.log('🏗️  Building token index...');
  const tokenIndex = buildTokenIndex(tokenFiles);

  const errors = [];
  const warnings = [];

  console.log(`📊 Found ${Object.keys(tokenFiles).length} token files`);
  console.log(`📊 Indexed ${tokenIndex.size} tokens across all layers`);

  // Track all defined tokens for reference validation
  const definedTokens = new Set();

  // Step 1: No literals outside primitives
  console.log('\n1️⃣ Checking for literals outside primitives...');

  Object.entries(tokenFiles).forEach(([filePath, content]) => {
    const values = findAllValues(content);
    values.forEach(({ path, value }) => {
      const fullPath = `${filePath}:${path}`;

      if (!filePath.startsWith('primitives/') && isLiteralValue(value)) {
        errors.push({
          rule: 'no-literals-outside-primitives',
          file: filePath,
          path: path,
          value: value,
          message: `Literal value "${value}" found outside primitives in ${fullPath}`
        });
      }

      // Track defined tokens
      if (!path.includes('$')) { // Skip metadata paths
        definedTokens.add(path);
      }
    });
  });

  // Step 2: No self-alias references
  console.log('\n2️⃣ Checking for self-alias references...');

  Object.entries(tokenFiles).forEach(([filePath, content]) => {
    const values = findAllValues(content);
    values.forEach(({ path, value }) => {
      const refs = extractReferences(value);
      refs.forEach(ref => {
        if (ref === path) {
          errors.push({
            rule: 'no-self-aliases',
            file: filePath,
            path: path,
            value: value,
            message: `Self-alias reference {${ref}} found in ${filePath}:${path}`
          });
        }
      });
    });
  });

  // Step 3: Reference resolution (DISABLED - now handled by Step 10)
  console.log('\n3️⃣ Checking reference resolution...');
  console.log('   (Reference resolution now handled by raw → primitives completeness check)');

  // Step 4: Layer boundary rules
  console.log('\n4️⃣ Checking layer boundary rules...');

  Object.entries(tokenFiles).forEach(([filePath, content]) => {
    const values = findAllValues(content);
    values.forEach(({ path, value }) => {
      const refs = extractReferences(value);

      // Raw layer should only reference primitives
      if (filePath.includes('/raw/')) {
        refs.forEach(ref => {
          if (!ref.startsWith('eui.')) {
            warnings.push({
              rule: 'raw-layer-boundaries',
              file: filePath,
              path: path,
              value: value,
              message: `Raw layer references non-primitive {${ref}} in ${filePath}:${path}`
            });
          }
        });
      }

      // Semantics layer should only reference raw (preferred)
      if (filePath.includes('/semantics/')) {
        refs.forEach(ref => {
          if (!ref.includes('.raw.')) {
            warnings.push({
              rule: 'semantics-layer-boundaries',
              file: filePath,
              path: path,
              value: value,
              message: `Semantics layer references non-raw {${ref}} in ${filePath}:${path} (consider raw reference)`
            });
          }
        });
      }

      // Themes should only reference semantics
      if (filePath.includes('/themes/')) {
        refs.forEach(ref => {
          if (!ref.includes('.color.') && !ref.includes('.focus.') && !ref.includes('.typography.')) {
            // Allow semantic references, warn on others
            if (ref.includes('.raw.')) {
              errors.push({
                rule: 'theme-layer-boundaries',
                file: filePath,
                path: path,
                value: value,
                message: `Theme references raw token {${ref}} in ${filePath}:${path} (should reference semantics)`
              });
            }
          }
        });
      }
    });
  });

  // Step 5: Theme constraints
  console.log('\n5️⃣ Checking theme constraints...');

  Object.entries(tokenFiles).forEach(([filePath, content]) => {
    if (!filePath.includes('/themes/')) return;

    const values = findAllValues(content);
    values.forEach(({ path, value }) => {
      if (isLiteralValue(value)) {
        errors.push({
          rule: 'theme-literal-constraint',
          file: filePath,
          path: path,
          value: value,
          message: `Theme contains literal value "${value}" in ${filePath}:${path} (themes should only reference semantics)`
        });
      }
    });
  });

  // Step 6: Namespace enforcement (DISABLED - now handled by Step 11)
  console.log('\n6️⃣ Checking namespace enforcement...');
  console.log('   (Namespace enforcement now handled by raw namespace enforcement check)');

  // Step 7: No scales in semantics
  console.log('\n7️⃣ Checking for numeric scales in semantics...');

  Object.entries(tokenFiles).forEach(([filePath, content]) => {
    if (!filePath.includes('/semantics/')) return;

    // Check for numeric scale keys (50, 100, 200, etc.)
    function checkScales(obj, currentPath = '') {
      if (typeof obj === 'object' && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
          const path = currentPath ? `${currentPath}.${key}` : key;

          // Check if key looks like a numeric scale
          if (/^\d+$/.test(key) && ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].includes(key)) {
            warnings.push({
              rule: 'no-scales-in-semantics',
              file: filePath,
              path: path,
              message: `Numeric scale key "${key}" found in semantics at ${filePath}:${path}`
            });
          }

          if (typeof value === 'object') {
            checkScales(value, path);
          }
        }
      }
    }

    checkScales(content);
  });

  // Step 8: Canon-only build input guard
  console.log('\n8️⃣ Checking build input scope...');

  const buildConfigPath = join(repoRoot, 'style-dictionary', 'config.mjs');
  try {
    const buildConfig = readFileSync(buildConfigPath, 'utf-8');

    // Check if config properly excludes knowledge/legacy
    if (!buildConfig.includes("tokens', 'legacy'") || !buildConfig.includes("tokens', 'knowledge'")) {
      warnings.push({
        rule: 'build-input-guard',
        file: 'style-dictionary/config.mjs',
        message: 'Build config may not properly exclude knowledge/legacy directories'
      });
    }
  } catch (error) {
    warnings.push({
      rule: 'build-input-guard',
      file: 'style-dictionary/config.mjs',
      message: `Could not verify build config exclusions: ${error.message}`
    });
  }

  // Step 9: Schema validation
  console.log('\n9️⃣ Checking schema validation...');

  Object.entries(tokenFiles).forEach(([filePath, content]) => {
    if (!matchesPath(`tokens/${filePath}`, CANONICAL_PATHS)) {
      return; // Skip non-canonical files
    }

    // Check if canonical files have schema
    if (!content.$schema) {
      errors.push({
        rule: 'schema-validation',
        file: filePath,
        message: `Canonical token file missing $schema reference: ${filePath}`
      });
    } else {
      // Check if schema path is local (not remote)
      if (content.$schema.startsWith('http://') || content.$schema.startsWith('https://')) {
        errors.push({
          rule: 'schema-validation',
          file: filePath,
          message: `Canonical token file uses remote schema URL (should be local): ${filePath}`
        });
      } else {
        // Check if schema path resolves to an existing file
        try {
          const fileDir = dirname(join(repoRoot, 'tokens', filePath));
          const schemaPath = join(fileDir, content.$schema);
          if (!statSync(schemaPath).isFile()) {
            errors.push({
              rule: 'schema-resolution',
              file: filePath,
              schema: content.$schema,
              resolvedPath: relative(repoRoot, schemaPath),
              message: `Schema path "${content.$schema}" does not resolve to existing file in ${filePath} (attempted: ${relative(repoRoot, schemaPath)})`
            });
          }
        } catch (error) {
          errors.push({
            rule: 'schema-resolution',
            file: filePath,
            schema: content.$schema,
            message: `Schema path "${content.$schema}" resolution failed in ${filePath}: ${error.message}`
          });
        }
      }

      // Check if schema path points to our DTCG schema
      if (!content.$schema.includes('dtcg-2025.10-schema.json')) {
        warnings.push({
          rule: 'schema-validation',
          file: filePath,
          message: `Canonical token file uses non-standard schema: ${content.$schema} in ${filePath}`
        });
      }
    }

    // Check for custom fields that should be in $extensions
    function checkExtensions(obj, path = '') {
      if (typeof obj === 'object' && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = path ? `${path}.${key}` : key;

          // Skip standard DTCG fields and our known structures
          const allowedKeys = ['$schema', '$value', '$type', '$description', 'eui'];
          if (!allowedKeys.includes(key) && !key.startsWith('$')) {
            // This is a custom field that should be in $extensions
            if (path === '' || !path.includes('.$extensions')) {
              warnings.push({
                rule: 'extensions-normalization',
                file: filePath,
                path: currentPath,
                message: `Custom field "${key}" should be moved to $extensions in ${filePath}:${currentPath}`
              });
            }
          }

          if (typeof value === 'object') {
            checkExtensions(value, currentPath);
          }
        }
      }
    }

    checkExtensions(content);
  });

  // Step 10: Raw → Primitives completeness (ERROR)
  console.log('\n🔟 Checking raw → primitives completeness...');

  // Check all raw token references using the token index
  for (const [tokenPath, tokenInfo] of tokenIndex.entries()) {
    if (tokenInfo.layer !== 'raw') continue;

    // Get the token's value from the file
    const fileContent = tokenFiles[tokenInfo.file];

    // Find the token's value using the path
    function getTokenValue(obj, pathParts) {
      let current = obj;
      for (const part of pathParts) {
        if (current && typeof current === 'object') {
          current = current[part];
        } else {
          return null;
        }
      }
      return current && current.$value ? current.$value : null;
    }

    const pathParts = tokenPath.split('.');
    const tokenValue = getTokenValue(fileContent, pathParts);

    if (tokenValue && typeof tokenValue === 'string') {
      const refs = extractReferences(tokenValue);
      refs.forEach(ref => {
        const targetInfo = tokenIndex.get(ref);

        if (!targetInfo) {
          errors.push({
            rule: 'raw-primitives-completeness',
            file: tokenInfo.file,
            path: tokenPath,
            target: ref,
            message: `Raw token {${tokenPath}} references missing target: {${ref}} in ${tokenInfo.file}`
          });
        } else if (targetInfo.layer !== 'primitives' && targetInfo.layer !== 'raw') {
          // Raw tokens should only reference primitives or other raw tokens
          errors.push({
            rule: 'raw-primitives-completeness',
            file: tokenInfo.file,
            path: tokenPath,
            target: ref,
            message: `Raw token {${tokenPath}} references ${targetInfo.layer} token {${ref}} in ${tokenInfo.file} (should reference primitives or raw only)`
          });
        }
      });
    }
  }

  // Step 11: Raw namespace enforcement (ERROR)
  console.log('\n1️⃣1️⃣ Checking raw namespace enforcement...');

  // Check all raw token paths in the index
  for (const [tokenPath, tokenInfo] of tokenIndex.entries()) {
    if (tokenInfo.layer !== 'raw') continue;

    // Extract context from file path: contexts/{context}/raw/...
    const contextMatch = tokenInfo.file.match(/contexts\/([^\/]+)\/raw\//);
    if (!contextMatch) continue;

    const context = contextMatch[1];
    const expectedPrefix = `eui.${context}.raw`;

    if (!tokenPath.startsWith(expectedPrefix)) {
      errors.push({
        rule: 'raw-namespace-enforcement',
        file: tokenInfo.file,
        path: tokenPath,
        expectedPrefix: expectedPrefix,
        message: `Raw token path "${tokenPath}" does not start with expected prefix "${expectedPrefix}" in ${tokenInfo.file}`
      });
    }
  }

  // Step 12: DTCG $value guardrail (ERROR)
  console.log('\n1️⃣2️⃣ Checking DTCG $value guardrail...');

  Object.entries(tokenFiles).forEach(([filePath, content]) => {
    if (!matchesPath(`tokens/${filePath}`, CANONICAL_PATHS)) {
      return; // Only check canonical files
    }

    // Deep traverse to find leaf tokens missing $value
    function checkLeafTokens(obj, path = '') {
      if (typeof obj === 'object' && obj !== null) {
        // Check if this object is a leaf token (has DTCG fields)
        const hasDtcgFields = Object.keys(obj).some(key =>
          key === '$type' ||
          key === '$description' ||
          key === '$extensions' ||
          key.startsWith('$')
        );

        if (hasDtcgFields) {
          // This is a leaf token - it MUST have $value
          if (!obj.hasOwnProperty('$value')) {
            errors.push({
              rule: 'dtcg-value-guardrail',
              file: filePath,
              path: path,
              message: `Leaf token missing required $value field in ${filePath}:${path}. Do not move this file to knowledge - fix by adding $value (usually a reference).`
            });
          }
        } else {
          // This is a tokenGroup - recursively check children
          for (const [key, value] of Object.entries(obj)) {
            const currentPath = path ? `${path}.${key}` : key;
            checkLeafTokens(value, currentPath);
          }
        }
      }
    }

    checkLeafTokens(content);
  });

  // Step 13: Semantics should prefer raw (WARNING)
  console.log('\n1️⃣3️⃣ Checking semantics raw preference...');

  const semanticsBypassReport = [];

  Object.entries(tokenFiles).forEach(([filePath, content]) => {
    if (!filePath.includes('/semantics/')) return;

    const values = findAllValues(content);
    values.forEach(({ path, value }) => {
      const refs = extractReferences(value);
      refs.forEach(ref => {
        // Check if this reference goes directly to primitives instead of raw
        if (ref.startsWith('eui.') && !ref.includes('.raw.') && !ref.includes('.color.') &&
            !ref.includes('.focus.') && !ref.includes('.typography.')) {

          // Verify this is actually referencing a primitive
          const isPrimitiveRef = Object.keys(tokenFiles).some(otherFile => {
            if (!otherFile.startsWith('primitives/')) return false;
            return tokenFiles[otherFile] &&
                   findAllValues(tokenFiles[otherFile]).some(({ path: p }) => p === ref);
          });

          if (isPrimitiveRef) {
            // Extract context from file path
            const contextMatch = filePath.match(/contexts\/([^\/]+)\/semantics\//);
            const context = contextMatch ? contextMatch[1] : 'unknown';

            semanticsBypassReport.push({
              context: context,
              file: filePath,
              path: path,
              reference: ref
            });
          }
        }
      });
    });
  });

  // Report semantics bypass warnings
  if (semanticsBypassReport.length > 0) {
    console.log('\n📋 Semantics Raw Preference Report:');
    console.log('┌─────────┬─────────────────────────────────────┬─────────────────────────────┬─────────────────────────────┐');
    console.log('│ Context │ File                                │ Token Path                  │ Reference                   │');
    console.log('├─────────┼─────────────────────────────────────┼─────────────────────────────┼─────────────────────────────┤');

    semanticsBypassReport.forEach(item => {
      const context = item.context.padEnd(7);
      const file = item.file.replace('tokens/contexts/', '').padEnd(35);
      const path = item.path.padEnd(27);
      const ref = item.reference.padEnd(27);
      console.log(`│ ${context} │ ${file} │ ${path} │ ${ref} │`);
    });

    console.log('└─────────┴─────────────────────────────────────┴─────────────────────────────┴─────────────────────────────┘');
    console.log(`\n⚠️  Found ${semanticsBypassReport.length} semantics tokens bypassing raw layer (warnings, not errors)`);
  }

  // Report results
  console.log('\n📊 Validation Results:');

  if (errors.length > 0) {
    console.error('\n❌ Architecture violations:');
    errors.forEach(err => {
      console.error(`  ${err.file}:${err.path || ''} - ${err.message}`);
    });
  }

  if (warnings.length > 0) {
    console.warn('\n⚠️  Architecture warnings:');
    warnings.forEach(warn => {
      console.warn(`  ${warn.file}:${warn.path || ''} - ${warn.message}`);
    });
  }

  const totalIssues = errors.length + warnings.length;

  if (totalIssues === 0) {
    console.log('✅ All token architecture rules validated!');
    console.log(`   Checked ${Object.keys(tokenFiles).length} token files`);
    process.exit(0);
  }

  if (errors.length > 0) {
    console.error(`\n❌ Found ${errors.length} violations and ${warnings.length} warnings`);
    console.error('   Critical violations must be fixed before commit');
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn(`\n⚠️  Found ${warnings.length} warnings (no critical violations)`);
    console.warn('   Consider addressing warnings to maintain architectural purity');
    process.exit(0);
  }
}

// Run validation
validateTokenArchitecture();
