#!/usr/bin/env node

import { spawnSync } from 'child_process';

const removalTarget = '2026-05-15';

console.warn('[DEPRECATED] tokens:build:canonical:legacy is parity-only and scheduled for removal.');
console.warn(`[DEPRECATED] Removal target: ${removalTarget}`);
console.warn('[DEPRECATED] Use tokens:build:canonical (SD-first path) for regular builds.\n');

const result = spawnSync('npm', ['run', '-s', 'tokens:build:canonical:legacy:raw'], {
  stdio: 'inherit',
  env: process.env
});

process.exit(result.status ?? 1);
