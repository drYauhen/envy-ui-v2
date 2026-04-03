#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import StyleDictionary from 'style-dictionary';
import registerCssVariablesThemedFormat from '../style-dictionary/formats/cssVariablesThemed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const fixtureRoot = path.join(repoRoot, 'style-dictionary', 'fixtures', 'themed-css');
const fixtureTokensDir = path.join(fixtureRoot, 'tokens');
const snapshotPath = path.join(fixtureRoot, 'expected', 'tokens.css');

function normalizeNewlines(content) {
  return content.replace(/\r\n/g, '\n');
}

function firstDiffLine(left, right) {
  const leftLines = normalizeNewlines(left).split('\n');
  const rightLines = normalizeNewlines(right).split('\n');
  const maxLines = Math.max(leftLines.length, rightLines.length);

  for (let i = 0; i < maxLines; i += 1) {
    const leftLine = leftLines[i] ?? '';
    const rightLine = rightLines[i] ?? '';
    if (leftLine !== rightLine) {
      return {
        line: i + 1,
        expected: leftLine,
        actual: rightLine
      };
    }
  }

  return null;
}

async function buildFixtureOutput() {
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'envy-themed-css-snapshot-'));
  const buildPath = path.join(tmpRoot, 'generated', 'css');

  try {
    registerCssVariablesThemedFormat(StyleDictionary, { allowedContexts: ['app'], contextMirrors: {} });

    const sd = new StyleDictionary({
      usesDtcg: true,
      source: [path.join(fixtureTokensDir, '**', '*.json')],
      log: {
        verbosity: 'silent'
      },
      platforms: {
        css: {
          transformGroup: 'css',
          buildPath: `${buildPath}${path.sep}`,
          files: [
            {
              destination: 'tokens.css',
              format: 'css/variables-themed',
              options: {
                sort: 'name'
              }
            }
          ]
        }
      }
    });

    await sd.hasInitialized;
    await sd.buildPlatform('css');

    const outputPath = path.join(buildPath, 'tokens.css');
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Missing generated fixture output: ${path.relative(repoRoot, outputPath)}`);
    }

    return normalizeNewlines(fs.readFileSync(outputPath, 'utf8'));
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
}

async function main() {
  const shouldUpdate = process.argv.includes('--update');
  const actual = await buildFixtureOutput();

  if (shouldUpdate || !fs.existsSync(snapshotPath)) {
    fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
    fs.writeFileSync(snapshotPath, actual, 'utf8');
    console.log(`Updated themed CSS snapshot: ${path.relative(repoRoot, snapshotPath)}`);
    return;
  }

  const expected = normalizeNewlines(fs.readFileSync(snapshotPath, 'utf8'));
  if (expected !== actual) {
    const diff = firstDiffLine(expected, actual);
    console.error('Themed CSS snapshot check failed.');
    if (diff) {
      console.error(`First difference at line ${diff.line}`);
      console.error(`Expected: ${diff.expected}`);
      console.error(`Actual:   ${diff.actual}`);
    }
    console.error('\nIf this change is intentional, run:');
    console.error('npm run resolver:verify:themed-css-snapshot -- --update');
    process.exit(1);
  }

  console.log('Themed CSS snapshot check passed.');
}

main().catch((error) => {
  console.error(error?.message || error);
  process.exit(1);
});
