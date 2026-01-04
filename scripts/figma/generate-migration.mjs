import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

const SNAPSHOTS_DIR = path.join(repoRoot, 'generated', 'figma', 'snapshots');
const MIGRATIONS_DIR = path.join(repoRoot, 'generated', 'figma', 'migrations');
const ADAPTER_PATH = path.join(repoRoot, 'generated', 'figma', 'adapter', 'variables.adapter.json');

/**
 * Loads snapshot from file
 */
function loadSnapshot(snapshotPath) {
  if (!fs.existsSync(snapshotPath)) {
    throw new Error(`Snapshot not found: ${snapshotPath}`);
  }
  return JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
}

/**
 * Loads latest snapshot
 */
function loadLatestSnapshot() {
  const latestPath = path.join(SNAPSHOTS_DIR, 'latest-snapshot.json');
  if (fs.existsSync(latestPath)) {
    try {
      const realPath = fs.readlinkSync(latestPath);
      return loadSnapshot(path.join(SNAPSHOTS_DIR, realPath));
    } catch (error) {
      // If symlink doesn't work, try to find the latest file
    }
  }
  
  // If no symlink, find latest by date
  const files = fs.readdirSync(SNAPSHOTS_DIR)
    .filter(f => f.endsWith('-snapshot.json'))
    .sort()
    .reverse();
  
  if (files.length === 0) {
    throw new Error('No snapshots found in ' + SNAPSHOTS_DIR);
  }
  
  return { snapshot: loadSnapshot(path.join(SNAPSHOTS_DIR, files[0])), filename: files[0] };
}

/**
 * Loads adapter from generated/figma/tokens/variables.tokens.scoped.json
 */
function loadAdapter() {
  const scopedPath = path.join(repoRoot, 'generated', 'figma', 'tokens', 'variables.tokens.scoped.json');
  if (fs.existsSync(scopedPath)) {
    const scoped = JSON.parse(fs.readFileSync(scopedPath, 'utf8'));
    return convertScopedToAdapter(scoped);
  }
  
  // Fallback: use old adapter (colors only)
  if (fs.existsSync(ADAPTER_PATH)) {
    const adapter = JSON.parse(fs.readFileSync(ADAPTER_PATH, 'utf8'));
    
    if (adapter.collections && adapter.collections[0] && adapter.collections[0].mode) {
      return {
        collections: adapter.collections.map(c => ({
          name: c.name,
          variables: c.variables.map(v => ({
            path: v.path,
            type: v.type
          }))
        }))
      };
    }
    
    return {
      collections: adapter.collections.map(c => ({
        name: c.name,
        variables: c.variables.map(v => ({
          path: v.path,
          type: v.type
        }))
      }))
    };
  }
  
  throw new Error(
    `Scoped tokens not found. Please run:\n` +
    `  npm run tokens:build\n` +
    `to generate tokens from source.`
  );
}

/**
 * Converts scoped tokens to adapter format
 */
function convertScopedToAdapter(scoped) {
  const collections = new Map();
  
  if (scoped.collections) {
    for (const collection of scoped.collections) {
      collections.set(collection.name, {
        name: collection.name,
        variables: collection.variables.map(v => ({
          path: v.path,
          type: v.type
        }))
      });
    }
  }
  
  return {
    collections: Array.from(collections.values())
  };
}

/**
 * Analyzes changes between snapshot and adapter
 */
function analyzeChanges(snapshot, adapter) {
  // Create map of variables from snapshot by path
  const snapshotVarsByPath = new Map();
  for (const variable of snapshot.variables) {
    snapshotVarsByPath.set(variable.path, variable);
  }
  
  // Create map of variables from adapter by path
  const adapterVarsByPath = new Map();
  for (const collection of adapter.collections) {
    for (const variable of collection.variables) {
      adapterVarsByPath.set(variable.path, {
        path: variable.path,
        collection: collection.name,
        type: variable.type
      });
    }
  }
  
  // Find deleted (exists in snapshot, not in adapter)
  const deleted = [];
  for (const [path, variable] of snapshotVarsByPath.entries()) {
    if (!adapterVarsByPath.has(path)) {
      deleted.push({
        path,
        collection: variable.collection,
        variableId: variable.id,
        name: variable.name,
        usages: variable.usages.length,
        type: variable.type
      });
    }
  }
  
  // Find added (exists in adapter, not in snapshot)
  const added = [];
  for (const [path, variable] of adapterVarsByPath.entries()) {
    if (!snapshotVarsByPath.has(path)) {
      added.push({
        path,
        collection: variable.collection,
        type: variable.type
      });
    }
  }
  
  // Find moved (exists in both, but collection changed)
  const moved = [];
  for (const [path, snapshotVar] of snapshotVarsByPath.entries()) {
    const adapterVar = adapterVarsByPath.get(path);
    if (adapterVar && snapshotVar.collection !== adapterVar.collection) {
      moved.push({
        path,
        oldCollection: snapshotVar.collection,
        newCollection: adapterVar.collection,
        usages: snapshotVar.usages.length
      });
    }
  }
  
  return {
    deleted,
    added,
    moved,
    unchanged: snapshot.variables.length - deleted.length - moved.length,
    summary: {
      totalInSnapshot: snapshot.variables.length,
      totalInAdapter: adapterVarsByPath.size,
      deleted: deleted.length,
      added: added.length,
      moved: moved.length,
      unchanged: snapshot.variables.length - deleted.length - moved.length
    }
  };
}

/**
 * Finds fallback variable for deleted variable
 * Searches for similar variable by name or type in the same collection
 */
function findFallback(deletedVar, adapter) {
  // Try to find variable with similar path
  const pathParts = deletedVar.path.split('.');
  const basePath = pathParts.slice(0, -1).join('.');
  const lastPart = pathParts[pathParts.length - 1];
  
  // Search for variables in the same collection
  for (const collection of adapter.collections) {
    if (collection.name === deletedVar.collection) {
      // Try to find variable with similar name
      for (const variable of collection.variables) {
        if (variable.path.includes(basePath) && variable.type === deletedVar.type) {
          return {
            path: variable.path,
            collection: collection.name,
            reason: 'similar-path-same-collection'
          };
        }
      }
      
      // Try to find variable of the same type
      for (const variable of collection.variables) {
        if (variable.type === deletedVar.type) {
          return {
            path: variable.path,
            collection: collection.name,
            reason: 'same-type-same-collection'
          };
        }
      }
    }
  }
  
  // If not found, return null (manual selection required)
  return null;
}

/**
 * Generates migration file
 */
function generateMigration(snapshot, snapshotFilename, analysis, adapter) {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
  
  const migration = {
    version: dateStr,
    timestamp: today.toISOString(),
    snapshot: snapshotFilename,
    snapshotTimestamp: snapshot.timestamp,
    summary: {
      totalChanges: analysis.deleted.length + analysis.moved.length,
      deleted: analysis.deleted.length,
      moved: analysis.moved.length,
      added: analysis.added.length,
      totalUsagesAffected: analysis.deleted.reduce((sum, v) => sum + v.usages, 0) +
                           analysis.moved.reduce((sum, v) => sum + v.usages, 0)
    },
    mappings: [],
    deleted: [],
    moved: []
  };
  
  // Process deleted variables
  for (const deletedVar of analysis.deleted) {
    const fallback = findFallback(deletedVar, adapter);
    
    migration.deleted.push({
      old: {
        path: deletedVar.path,
        collection: deletedVar.collection,
        variableId: deletedVar.variableId,
        name: deletedVar.name,
        type: deletedVar.type
      },
      fallback: fallback,
      usages: deletedVar.usages,
      action: 'delete',
      requiresManualReview: fallback === null || deletedVar.usages > 0
    });
  }
  
  // Process moved variables
  for (const movedVar of analysis.moved) {
    migration.moved.push({
      path: movedVar.path,
      oldCollection: movedVar.oldCollection,
      newCollection: movedVar.newCollection,
      usages: movedVar.usages,
      action: 'move'
    });
  }
  
  // Mappings для переименованных переменных (пока не реализовано, но структура готова)
  // В будущем можно добавить логику для определения переименований
  
  return migration;
}

/**
 * Saves migration file
 */
function saveMigration(migration) {
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    fs.mkdirSync(MIGRATIONS_DIR, { recursive: true });
  }
  
  const filename = `${migration.version}-migration.json`;
  const filepath = path.join(MIGRATIONS_DIR, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(migration, null, 2), 'utf8');
  
  return { filename, filepath };
}

/**
 * Prints migration information
 */
function printMigrationInfo(migration, filepath) {
  console.log('\n✅ Migration file generated!\n');
  console.log(`File: ${filepath}`);
  console.log(`Version: ${migration.version}`);
  console.log(`Snapshot: ${migration.snapshot}`);
  console.log(`Snapshot timestamp: ${migration.snapshotTimestamp}\n`);
  
  console.log('📊 Migration Summary\n');
  console.log(`Total changes: ${migration.summary.totalChanges}`);
  console.log(`  ❌ Deleted: ${migration.summary.deleted}`);
  console.log(`  🔄 Moved: ${migration.summary.moved}`);
  console.log(`  ➕ Added: ${migration.summary.added}`);
  console.log(`  ⚠️  Total usages affected: ${migration.summary.totalUsagesAffected}\n`);
  
  if (migration.deleted.length > 0) {
    const requiresReview = migration.deleted.filter(d => d.requiresManualReview).length;
    if (requiresReview > 0) {
      console.log(`⚠️  ${requiresReview} deleted variable(s) require manual review:\n`);
      migration.deleted
        .filter(d => d.requiresManualReview)
        .slice(0, 10)
        .forEach(d => {
          console.log(`  - ${d.old.path}`);
          console.log(`    Usages: ${d.usages}`);
          if (!d.fallback) {
            console.log(`    ⚠️  No fallback found - manual selection required`);
          } else {
            console.log(`    Suggested fallback: ${d.fallback.path}`);
          }
          console.log('');
        });
      
      if (requiresReview > 10) {
        console.log(`  ... and ${requiresReview - 10} more\n`);
      }
    }
  }
  
  if (migration.moved.length > 0) {
    console.log(`\n🔄 ${migration.moved.length} variable(s) moved between collections:\n`);
    migration.moved.slice(0, 10).forEach(m => {
      console.log(`  - ${m.path}`);
      console.log(`    ${m.oldCollection} → ${m.newCollection}`);
      console.log(`    Usages: ${m.usages}`);
      console.log('');
    });
    
    if (migration.moved.length > 10) {
      console.log(`  ... and ${migration.moved.length - 10} more\n`);
    }
  }
  
  if (migration.summary.totalChanges === 0) {
    console.log('✅ No changes detected! No migration needed.\n');
  } else {
    console.log('\n📝 Next steps:');
    console.log('  1. Review the migration file');
    console.log('  2. Update fallbacks for deleted variables if needed');
    console.log('  3. Apply migration via Figma plugin (future)\n');
  }
}

// Main
const snapshotArg = process.argv[2] || 'latest';

try {
  console.log('Loading snapshot...');
  const { snapshot, filename: snapshotFilename } = snapshotArg === 'latest' 
    ? loadLatestSnapshot()
    : { snapshot: loadSnapshot(path.join(SNAPSHOTS_DIR, snapshotArg)), filename: snapshotArg };
  
  console.log('Loading adapter from tokens...');
  const adapter = loadAdapter();
  
  console.log('Analyzing changes...');
  const analysis = analyzeChanges(snapshot, adapter);
  
  if (analysis.deleted.length === 0 && analysis.moved.length === 0) {
    console.log('\n✅ No changes detected! No migration needed.\n');
    process.exit(0);
  }
  
  console.log('Generating migration file...');
  const migration = generateMigration(snapshot, snapshotFilename, analysis, adapter);
  
  const { filepath } = saveMigration(migration);
  
  printMigrationInfo(migration, filepath);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('\nUsage: node scripts/figma/generate-migration.mjs [snapshot-file|latest]');
  console.error('\nExample:');
  console.error('  node scripts/figma/generate-migration.mjs latest');
  console.error('  node scripts/figma/generate-migration.mjs 2025-12-30T19-57-48-snapshot.json');
  process.exit(1);
}

