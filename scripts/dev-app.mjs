#!/usr/bin/env node

/**
 * Automated Dev App Launcher
 * 
 * This script automates the setup and launch of the dev-app:
 * 1. Checks and installs dependencies for dev-app and server
 * 2. Initializes database if needed
 * 3. Starts both frontend (Vite) and GraphQL server concurrently
 * 
 * Usage:
 *   npm run dev:app
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const FRONTEND_PORT = 5173;
const GRAPHQL_PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');
const devAppDir = join(repoRoot, 'apps', 'dev-app');
const serverDir = join(devAppDir, 'server');
const dbPath = join(serverDir, 'db', 'database.sqlite');

function runCommand(command, cwd = repoRoot, silent = false) {
  if (!silent) {
    console.log(`\n▶️  ${command}`);
  }
  try {
    execSync(command, { 
      cwd, 
      stdio: silent ? 'pipe' : 'inherit',
      env: { ...process.env }
    });
  } catch (error) {
    if (!silent) {
      console.error(`❌ Error: ${error.message}`);
    }
    throw error;
  }
}

function checkAndInstall(cwd, name) {
  if (!existsSync(cwd)) {
    console.error(`❌ Directory does not exist: ${cwd}`);
    throw new Error(`Directory ${name} not found at ${cwd}`);
  }
  
  const nodeModulesPath = join(cwd, 'node_modules');
  const packageJsonPath = join(cwd, 'package.json');
  
  if (!existsSync(packageJsonPath)) {
    console.error(`❌ package.json not found in ${cwd}`);
    throw new Error(`package.json not found in ${name}`);
  }
  
  if (!existsSync(nodeModulesPath)) {
    console.log(`\n📦 Installing dependencies in ${name}...`);
    runCommand('npm install', cwd);
    console.log(`✅ ${name} dependencies installed`);
  } else {
    console.log(`✅ ${name} dependencies already installed`);
    
    // For server, rebuild native modules (better-sqlite3) to ensure compatibility
    if (name === 'server') {
      const betterSqlite3Path = join(nodeModulesPath, 'better-sqlite3');
      if (existsSync(betterSqlite3Path)) {
        console.log(`\n🔧 Rebuilding native modules (better-sqlite3) for current Node.js version...`);
        try {
          runCommand('npm rebuild better-sqlite3', cwd, true);
          console.log(`✅ Native modules rebuilt`);
        } catch (error) {
          console.warn(`⚠️  Failed to rebuild native modules, trying full reinstall...`);
          runCommand('npm install', cwd);
        }
      }
    }
  }
}

function checkAndInitDB() {
  const dbDir = join(serverDir, 'db');
  if (!existsSync(dbDir)) {
    console.error(`❌ Database directory does not exist: ${dbDir}`);
    throw new Error(`Database directory not found`);
  }
  
  if (!existsSync(dbPath)) {
    console.log('\n🗄️  Initializing database...');
    try {
      runCommand('npm run server:init', devAppDir);
      if (existsSync(dbPath)) {
        console.log('✅ Database initialized');
      } else {
        console.warn('⚠️  Database file was not created, but continuing...');
      }
    } catch (error) {
      console.warn('⚠️  Database initialization failed, but continuing...');
      console.warn('   You may need to run: cd apps/dev-app && npm run server:init');
    }
  } else {
    console.log('✅ Database already initialized');
  }
}

function killProcessOnPort(port) {
  try {
    // Find process using the port (macOS/Linux)
    const result = execSync(`lsof -ti:${port}`, { encoding: 'utf-8', stdio: 'pipe' }).trim();
    if (result) {
      const pids = result.split('\n').filter(pid => pid);
      if (pids.length > 0) {
        console.log(`\n🔌 Port ${port} is in use, killing process(es): ${pids.join(', ')}`);
        pids.forEach(pid => {
          try {
            execSync(`kill -9 ${pid}`, { stdio: 'pipe' });
          } catch (e) {
            // Ignore errors if process already terminated
          }
        });
        // Wait a bit for port to be released
        execSync('sleep 1', { stdio: 'pipe' });
        console.log(`✅ Port ${port} is now free`);
      }
    }
  } catch (error) {
    // Port is not in use, which is fine
  }
}

function checkAndFreePorts() {
  console.log('\n🔍 Checking if ports are available...');
  killProcessOnPort(FRONTEND_PORT);
  killProcessOnPort(GRAPHQL_PORT);
}

// Main execution
console.log('🚀 Starting Dev App...\n');

try {
  // 1. Check and install dev-app dependencies
  checkAndInstall(devAppDir, 'dev-app');

  // 2. Check and install server dependencies
  checkAndInstall(serverDir, 'server');

  // 3. Check and initialize database
  checkAndInitDB();

  // 4. Check and free ports if needed
  checkAndFreePorts();

  // 5. Start both frontend and server
  console.log('\n🎯 Starting frontend and GraphQL server...');
  console.log(`   Frontend: http://localhost:${FRONTEND_PORT}`);
  console.log(`   GraphQL:  http://localhost:${GRAPHQL_PORT}/graphql`);
  console.log('\n   Press Ctrl+C to stop\n');
  
  runCommand('npm run dev:all', devAppDir);
} catch (error) {
  console.error('\n❌ Failed to start Dev App');
  console.error('   Error:', error.message);
  process.exit(1);
}

