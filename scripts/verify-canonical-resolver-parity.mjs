#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const generatorScript = path.join(repoRoot, 'scripts', 'generate-canonical-css.mjs');

const filesToCompare = [
  'tokens.primitives.css',
  'tokens.contexts.css',
  'tokens.themes.css',
  'tokens.css'
];

const cssDir = path.join(repoRoot, 'generated', 'css');

function runCanonicalGeneration(useResolver) {
  const env = {
    ...process.env,
    CANONICAL_CSS_USE_RESOLVER_APP: useResolver ? 'true' : 'false'
  };

  const result = spawnSync(process.execPath, [generatorScript], {
    cwd: repoRoot,
    env,
    stdio: 'pipe',
    encoding: 'utf8'
  });

  if (result.status !== 0) {
    const mode = useResolver ? 'resolver' : 'legacy';
    throw new Error(
      `Canonical generation failed in ${mode} mode.\n` +
      `stdout:\n${result.stdout}\n` +
      `stderr:\n${result.stderr}`
    );
  }
}

function readOutputs() {
  const outputs = new Map();
  filesToCompare.forEach((fileName) => {
    const filePath = path.join(cssDir, fileName);
    outputs.set(fileName, fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null);
  });
  return outputs;
}

function restoreOutputs(outputs) {
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }

  outputs.forEach((content, fileName) => {
    const filePath = path.join(cssDir, fileName);
    if (content === null) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return;
    }
    fs.writeFileSync(filePath, content, 'utf8');
  });
}

function compareOutputs(legacyOutputs, resolverOutputs) {
  const mismatches = [];
  filesToCompare.forEach((fileName) => {
    const legacy = legacyOutputs.get(fileName);
    const resolver = resolverOutputs.get(fileName);
    if (legacy !== resolver) {
      mismatches.push({
        fileName,
        legacyLength: legacy ? legacy.length : 0,
        resolverLength: resolver ? resolver.length : 0
      });
    }
  });
  return mismatches;
}

function main() {
  console.log('🔍 Verifying canonical CSS parity: legacy vs resolver mode...');

  const initialOutputs = readOutputs();
  let legacyOutputs;
  let resolverOutputs;

  try {
    runCanonicalGeneration(false);
    legacyOutputs = readOutputs();

    runCanonicalGeneration(true);
    resolverOutputs = readOutputs();
  } finally {
    restoreOutputs(initialOutputs);
  }

  const mismatches = compareOutputs(legacyOutputs, resolverOutputs);
  if (mismatches.length > 0) {
    console.error('❌ Canonical parity check failed.');
    mismatches.forEach(({ fileName, legacyLength, resolverLength }) => {
      console.error(`  - ${fileName}: legacy=${legacyLength} chars, resolver=${resolverLength} chars`);
    });
    process.exit(1);
  }

  console.log('✅ Canonical parity check passed.');
}

main();
