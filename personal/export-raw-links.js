const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'generated', 'personal', 'raw-links.json');

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

// 3. Read tracked files from git (HEAD)
log('Reading tracked files from git (HEAD)...');

let trackedFiles = [];
try {
  trackedFiles = execSync('git ls-files', { encoding: 'utf8' })
    .split('\n')
    .map(f => f.trim())
    .filter(Boolean);
} catch {
  console.error('[export-raw-links] Failed to read tracked files from git');
  process.exit(1);
}

const files = trackedFiles.map(rel => ({
  path: rel,
  raw: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${rel}`
}));

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
