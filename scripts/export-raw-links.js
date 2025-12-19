const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'build', 'raw-links.json');

function log(...args) {
  console.log('[export-raw-links]', ...args);
}

function parseGitHubOrigin(origin) {
  // SSH standard: git@github.com:owner/repo.git
  let m = origin.match(/^git@github\.com:(.+?)\/(.+?)(\.git)?$/);
  if (m) return { owner: m[1], repo: m[2] };

  // SSH alias: git@alias:owner/repo.git
  m = origin.match(/^git@[^:]+:(.+?)\/(.+?)(\.git)?$/);
  if (m) return { owner: m[1], repo: m[2] };

  // HTTPS: https://github.com/owner/repo.git
  m = origin.match(/^https:\/\/github\.com\/(.+?)\/(.+?)(\.git)?$/);
  if (m) return { owner: m[1], repo: m[2] };

  return null;
}

log('Working directory:', ROOT);

// 1. Read origin
let origin;
try {
  origin = execSync('git remote get-url origin').toString().trim();
  log('Git origin:', origin);
} catch {
  console.error('[export-raw-links] Failed to read git origin');
  process.exit(1);
}

const parsed = parseGitHubOrigin(origin);
if (!parsed) {
  console.error('[export-raw-links] Unsupported git origin:', origin);
  process.exit(1);
}

const { owner, repo } = parsed;
log('Parsed repo:', `${owner}/${repo}`);

// 2. Branch
let branch = 'main';
try {
  const b = execSync('git branch --show-current').toString().trim();
  if (b) branch = b;
} catch {}
log('Branch:', branch);

// 3. Walk files
function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir)) {
    if (['.git', 'node_modules', 'build'].includes(entry)) continue;

    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');

    if (stat.isDirectory()) {
      walk(full, acc);
    } else {
      acc.push({
        path: rel,
        raw: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${rel}`
      });
    }
  }
  return acc;
}

log('Scanning repository files...');
const files = walk(ROOT);
log('Files found:', files.length);

// 4. Output
const result = {
  repo: `${owner}/${repo}`,
  branch,
  count: files.length,
  generatedAt: new Date().toISOString(),
  files
};

const outDir = path.dirname(OUTPUT);
log('Ensuring output directory:', outDir);
fs.mkdirSync(outDir, { recursive: true });

log('Writing file:', OUTPUT);
fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2));

log('Done.');
log(`Exported ${files.length} raw links`);
log(`Output file: ${OUTPUT}`);