#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ignore = require('ignore');

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'personal', 'generated', 'local-files.json');

function loadGitignore(root) {
  const ig = ignore();
  const gitignorePath = path.join(root, '.gitignore');

  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf8');
    ig.add(content);
  }

  return ig;
}

function walk(dir, ig, acc) {
  for (const entry of fs.readdirSync(dir)) {
    if (entry === '.git') continue;

    const full = path.join(dir, entry);
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');

    if (ig.ignores(rel)) continue;

    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, ig, acc);
    } else {
      acc.push(rel);
    }
  }
}

function main() {
  const ig = loadGitignore(ROOT);
  const files = [];

  walk(ROOT, ig, files);

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(
    OUTPUT,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        root: ROOT,
        count: files.length,
        files
      },
      null,
      2
    )
  );

  console.log(`[export-local-files] Files written: ${files.length}`);
  console.log(`[export-local-files] Output: ${OUTPUT}`);
}

main();
