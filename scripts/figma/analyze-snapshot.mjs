import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

const SNAPSHOTS_DIR = path.join(repoRoot, 'generated', 'figma', 'snapshots');
const ADAPTER_PATH = path.join(repoRoot, 'generated', 'figma', 'adapter', 'variables.adapter.json');

/**
 * Загружает snapshot из файла
 */
function loadSnapshot(snapshotPath) {
  if (!fs.existsSync(snapshotPath)) {
    throw new Error(`Snapshot not found: ${snapshotPath}`);
  }
  return JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
}

/**
 * Загружает latest snapshot
 */
function loadLatestSnapshot() {
  const latestPath = path.join(SNAPSHOTS_DIR, 'latest-snapshot.json');
  if (fs.existsSync(latestPath)) {
    try {
      const realPath = fs.readlinkSync(latestPath);
      return loadSnapshot(path.join(SNAPSHOTS_DIR, realPath));
    } catch (error) {
      // Если symlink не работает, попробовать найти последний файл
    }
  }
  
  // Если нет symlink, найти последний по дате
  const files = fs.readdirSync(SNAPSHOTS_DIR)
    .filter(f => f.endsWith('-snapshot.json'))
    .sort()
    .reverse();
  
  if (files.length === 0) {
    throw new Error('No snapshots found in ' + SNAPSHOTS_DIR);
  }
  
  return loadSnapshot(path.join(SNAPSHOTS_DIR, files[0]));
}

/**
 * Загружает adapter из generated/figma/tokens/variables.tokens.scoped.json
 * (полный список всех токенов с modes)
 * Fallback: использует старый adapter (только цвета)
 */
function loadAdapter() {
  // Приоритет: использовать scoped tokens (полный список всех токенов)
  const scopedPath = path.join(repoRoot, 'generated', 'figma', 'tokens', 'variables.tokens.scoped.json');
  if (fs.existsSync(scopedPath)) {
    const scoped = JSON.parse(fs.readFileSync(scopedPath, 'utf8'));
    return convertScopedToAdapter(scoped);
  }
  
  // Fallback: использовать старый adapter (только цвета)
  if (fs.existsSync(ADAPTER_PATH)) {
    const adapter = JSON.parse(fs.readFileSync(ADAPTER_PATH, 'utf8'));
    
    // Если adapter в старом формате (один mode), конвертировать
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
 * Конвертирует scoped tokens в adapter формат
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
 * Анализирует изменения между snapshot и adapter
 */
function analyzeChanges(snapshot, adapter) {
  // Создать map переменных из snapshot по path
  const snapshotVarsByPath = new Map();
  for (const variable of snapshot.variables) {
    snapshotVarsByPath.set(variable.path, variable);
  }
  
  // Создать map переменных из adapter по path
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
  
  // Найти удаленные (есть в snapshot, нет в adapter)
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
  
  // Найти новые (есть в adapter, нет в snapshot)
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
  
  // Найти измененные (есть в обоих, но изменилась collection)
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
 * Выводит результаты анализа
 */
function printAnalysis(analysis, snapshot) {
  console.log('\n📊 Snapshot Analysis\n');
  console.log(`Snapshot: ${snapshot.timestamp}`);
  console.log(`Collections: ${snapshot.summary.totalCollections}`);
  console.log(`Variables: ${snapshot.summary.totalVariables}`);
  console.log(`Total usages: ${snapshot.summary.totalUsages}`);
  console.log(`Variables with bindings: ${snapshot.summary.variablesWithUsages}\n`);
  
  console.log('📈 Changes Summary\n');
  console.log(`Total in snapshot: ${analysis.summary.totalInSnapshot}`);
  console.log(`Total in adapter: ${analysis.summary.totalInAdapter}`);
  console.log(`✅ Unchanged: ${analysis.summary.unchanged}`);
  console.log(`❌ Deleted: ${analysis.summary.deleted} (not in tokens)`);
  console.log(`➕ Added: ${analysis.summary.added} (new in tokens)`);
  console.log(`🔄 Moved: ${analysis.summary.moved} (changed collection)\n`);
  
  if (analysis.deleted.length > 0) {
    console.log(`\n❌ Deleted Variables (${analysis.deleted.length}):\n`);
    analysis.deleted
      .sort((a, b) => b.usages - a.usages) // Сортировать по количеству использований
      .slice(0, 30) // Показать топ 30
      .forEach(v => {
        console.log(`  - ${v.path}`);
        console.log(`    Collection: ${v.collection}`);
        console.log(`    Type: ${v.type}`);
        console.log(`    Usages: ${v.usages}`);
        if (v.usages > 0) {
          console.log(`    ⚠️  WARNING: This variable is used in ${v.usages} place(s)!`);
        }
        console.log('');
      });
    
    if (analysis.deleted.length > 30) {
      console.log(`  ... and ${analysis.deleted.length - 30} more\n`);
    }
    
    const totalUsages = analysis.deleted.reduce((sum, v) => sum + v.usages, 0);
    if (totalUsages > 0) {
      console.log(`⚠️  Total bindings that will be broken: ${totalUsages}\n`);
    }
  }
  
  if (analysis.moved.length > 0) {
    console.log(`\n🔄 Moved Variables (${analysis.moved.length}):\n`);
    analysis.moved
      .sort((a, b) => b.usages - a.usages)
      .slice(0, 20)
      .forEach(v => {
        console.log(`  - ${v.path}`);
        console.log(`    Old: ${v.oldCollection}`);
        console.log(`    New: ${v.newCollection}`);
        console.log(`    Usages: ${v.usages}`);
        console.log('');
      });
    
    if (analysis.moved.length > 20) {
      console.log(`  ... and ${analysis.moved.length - 20} more\n`);
    }
  }
  
  if (analysis.added.length > 0) {
    console.log(`\n➕ New Variables (${analysis.added.length}):\n`);
    analysis.added.slice(0, 30).forEach(v => {
      console.log(`  + ${v.path}`);
      console.log(`    Collection: ${v.collection}`);
      console.log(`    Type: ${v.type}`);
      console.log('');
    });
    
    if (analysis.added.length > 30) {
      console.log(`  ... and ${analysis.added.length - 30} more\n`);
    }
  }
  
  if (analysis.deleted.length === 0 && analysis.moved.length === 0 && analysis.added.length === 0) {
    console.log('✅ No changes detected! Snapshot matches current tokens.\n');
  }
}

// Main
const snapshotArg = process.argv[2] || 'latest';

try {
  console.log('Loading snapshot...');
  const snapshot = snapshotArg === 'latest' 
    ? loadLatestSnapshot()
    : loadSnapshot(path.join(SNAPSHOTS_DIR, snapshotArg));
  
  console.log('Loading adapter from tokens...');
  const adapter = loadAdapter();
  
  console.log('Analyzing changes...');
  const analysis = analyzeChanges(snapshot, adapter);
  
  printAnalysis(analysis, snapshot);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('\nUsage: node scripts/figma/analyze-snapshot.mjs [snapshot-file|latest]');
  console.error('\nExample:');
  console.error('  node scripts/figma/analyze-snapshot.mjs latest');
  console.error('  node scripts/figma/analyze-snapshot.mjs 2025-12-30T19-57-48-snapshot.json');
  process.exit(1);
}

