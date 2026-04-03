#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const cssDir = path.join(repoRoot, 'generated', 'css');

const CANONICAL_FILES = [
  'tokens.primitives.css',
  'tokens.contexts.css',
  'tokens.themes.css',
  'tokens.css'
];

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: 'inherit',
    env: process.env
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function readCanonicalOutputs() {
  const outputs = new Map();
  CANONICAL_FILES.forEach((name) => {
    const filePath = path.join(cssDir, name);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing canonical output: ${path.relative(repoRoot, filePath)}`);
    }
    outputs.set(name, fs.readFileSync(filePath, 'utf8'));
  });
  return outputs;
}

function restoreCanonicalOutputs(snapshot) {
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }
  snapshot.forEach((content, name) => {
    fs.writeFileSync(path.join(cssDir, name), content, 'utf8');
  });
}

function compareSnapshots(baseSnapshot, candidateSnapshot) {
  const mismatches = [];

  CANONICAL_FILES.forEach((name) => {
    const left = baseSnapshot.get(name);
    const right = candidateSnapshot.get(name);
    if (left !== right) {
      mismatches.push(name);
    }
  });

  return mismatches;
}

function main() {
  console.log('Verifying canonical CSS parity: legacy generator vs SD canonical platforms');

  run('npm', ['run', '-s', 'tokens:build:canonical:legacy:raw']);
  const legacySnapshot = readCanonicalOutputs();

  run('npm', ['run', '-s', 'tokens:build:canonical:sd']);
  const sdSnapshot = readCanonicalOutputs();

  const mismatches = compareSnapshots(legacySnapshot, sdSnapshot);

  restoreCanonicalOutputs(legacySnapshot);

  if (mismatches.length > 0) {
    console.error('\nCanonical parity check failed. Mismatched files:');
    mismatches.forEach((name) => console.error(`- generated/css/${name}`));
    process.exit(1);
  }

  console.log('\nCanonical parity check passed (legacy == SD).');
}

main();
