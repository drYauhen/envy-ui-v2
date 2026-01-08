#!/usr/bin/env node

/**
 * Layer Generation Manager for Envy UI v2
 *
 * This script orchestrates the generation of different component layers
 * based on the layer-generation.config.json configuration.
 *
 * Features:
 * - Dependency resolution and topological sorting
 * - Parallel or sequential execution
 * - Progress tracking and error handling
 * - Integration with existing npm scripts
 */

import { readFileSync, existsSync } from 'fs';
import { execSync, spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

class LayerGenerationManager {
  constructor() {
    this.config = null;
    this.selectedLayers = [];
    this.executionOrder = [];
    this.results = new Map();
  }

  /**
   * Load and validate configuration
   */
  loadConfig() {
    const configPath = path.join(repoRoot, 'layer-generation.config.json');

    if (!existsSync(configPath)) {
      throw new Error(`Configuration file not found: ${configPath}`);
    }

    try {
      const configContent = readFileSync(configPath, 'utf8');
      this.config = JSON.parse(configContent);

      // Basic validation
      if (!this.config.layers || !this.config.generation) {
        throw new Error('Invalid configuration: missing layers or generation section');
      }

      console.log(`✅ Loaded configuration v${this.config.version}`);
      return this;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON in configuration file: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get selected layers from config or CLI args
   */
  getSelectedLayers(cliLayers = null) {
    if (cliLayers && cliLayers.length > 0) {
      this.selectedLayers = cliLayers;
    } else {
      this.selectedLayers = this.config.generation.selectedLayers || [];
    }

    // Filter only enabled layers
    this.selectedLayers = this.selectedLayers.filter(layerId => {
      const layer = this.config.layers[layerId];
      return layer && layer.enabled;
    });

    if (this.selectedLayers.length === 0) {
      throw new Error('No valid layers selected for generation');
    }

    console.log(`📋 Selected layers: ${this.selectedLayers.join(', ')}`);
    return this;
  }

  /**
   * Resolve dependencies and create execution order
   */
  resolveDependencies() {
    const visited = new Set();
    const visiting = new Set();
    const order = [];

    const visit = (layerId) => {
      if (visited.has(layerId)) return;
      if (visiting.has(layerId)) {
        throw new Error(`Circular dependency detected: ${layerId}`);
      }

      visiting.add(layerId);

      const layer = this.config.layers[layerId];
      if (!layer) {
        throw new Error(`Unknown layer: ${layerId}`);
      }

      // Visit dependencies first
      for (const dep of layer.dependsOn || []) {
        if (!this.selectedLayers.includes(dep)) {
          console.warn(`⚠️  Layer ${layerId} depends on ${dep}, but ${dep} is not selected`);
          continue;
        }
        visit(dep);
      }

      visiting.delete(layerId);
      visited.add(layerId);
      order.push(layerId);
    };

    // Visit all selected layers
    for (const layerId of this.selectedLayers) {
      visit(layerId);
    }

    this.executionOrder = order;
    console.log(`🔗 Execution order: ${this.executionOrder.join(' → ')}`);
    return this;
  }

  /**
   * Execute a single layer
   */
  async executeLayer(layerId) {
    const layer = this.config.layers[layerId];
    const startTime = Date.now();

    console.log(`\n🏗️  Generating layer: ${layer.name} (${layerId})`);

    try {
      // Execute the generation command
      const command = layer.generator.command;

      console.log(`   Running: ${command}`);

      // Use execSync for simplicity, but could be enhanced with spawn for better output handling
      execSync(command, {
        cwd: repoRoot,
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: '1' }
      });

      const duration = Date.now() - startTime;
      console.log(`✅ Layer ${layerId} generated successfully (${duration}ms)`);

      this.results.set(layerId, { success: true, duration });

      return true;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`❌ Layer ${layerId} failed (${duration}ms):`, error.message);

      this.results.set(layerId, { success: false, duration, error: error.message });

      if (this.config.generation.failFast) {
        throw error;
      }

      return false;
    }
  }

  /**
   * Execute all layers in order
   */
  async executeLayers() {
    const totalStartTime = Date.now();
    let successCount = 0;
    let failCount = 0;

    console.log(`\n🚀 Starting layer generation (${this.executionOrder.length} layers)`);
    console.log('═'.repeat(50));

    if (this.config.generation.parallelExecution) {
      // Parallel execution
      const promises = this.executionOrder.map(layerId => this.executeLayer(layerId));
      const results = await Promise.allSettled(promises);

      for (let i = 0; i < results.length; i++) {
        const layerId = this.executionOrder[i];
        const result = results[i];

        if (result.status === 'fulfilled' && result.value) {
          successCount++;
        } else {
          failCount++;
        }
      }
    } else {
      // Sequential execution
      for (const layerId of this.executionOrder) {
        const success = await this.executeLayer(layerId);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      }
    }

    const totalDuration = Date.now() - totalStartTime;

    console.log('\n' + '═'.repeat(50));
    console.log(`📊 Generation Summary:`);
    console.log(`   Total time: ${totalDuration}ms`);
    console.log(`   Successful: ${successCount}`);
    console.log(`   Failed: ${failCount}`);

    if (failCount > 0) {
      console.log(`\n❌ Failed layers:`);
      for (const [layerId, result] of this.results) {
        if (!result.success) {
          console.log(`   - ${layerId}: ${result.error}`);
        }
      }
      process.exit(1);
    } else {
      console.log(`\n🎉 All layers generated successfully!`);
    }
  }

  /**
   * Show available layers
   */
  showAvailableLayers() {
    console.log('\n📚 Available layers:');
    console.log('═'.repeat(40));

    for (const [layerId, layer] of Object.entries(this.config.layers)) {
      const status = layer.enabled ? '✅' : '❌';
      const selected = this.selectedLayers.includes(layerId) ? ' (selected)' : '';
      console.log(`${status} ${layerId}${selected}`);
      console.log(`   ${layer.name}`);
      console.log(`   ${layer.description}`);
      if (layer.dependsOn && layer.dependsOn.length > 0) {
        console.log(`   Dependencies: ${layer.dependsOn.join(', ')}`);
      }
      console.log('');
    }
  }

  /**
   * Validate configuration
   */
  validateConfig() {
    const errors = [];

    // Check that all selected layers exist and are enabled
    for (const layerId of this.selectedLayers) {
      if (!this.config.layers[layerId]) {
        errors.push(`Selected layer "${layerId}" does not exist`);
      } else if (!this.config.layers[layerId].enabled) {
        errors.push(`Selected layer "${layerId}" is not enabled`);
      }
    }

    // Check that dependencies exist
    for (const [layerId, layer] of Object.entries(this.config.layers)) {
      for (const dep of layer.dependsOn || []) {
        if (!this.config.layers[dep]) {
          errors.push(`Layer "${layerId}" depends on unknown layer "${dep}"`);
        }
      }
    }

    if (errors.length > 0) {
      console.error('❌ Configuration validation errors:');
      errors.forEach(error => console.error(`   - ${error}`));
      throw new Error('Configuration validation failed');
    }

    console.log('✅ Configuration validated successfully');
    return this;
  }

  /**
   * Main execution method
   */
  async run(cliArgs = {}) {
    try {
      // Parse CLI arguments
      const { layers: cliLayers, list, help } = cliArgs;

      this.loadConfig();

      if (help) {
        this.showHelp();
        return;
      }

      if (list) {
        this.getSelectedLayers(cliLayers);
        this.showAvailableLayers();
        return;
      }

      this.getSelectedLayers(cliLayers);
      this.validateConfig();
      this.resolveDependencies();
      await this.executeLayers();

    } catch (error) {
      console.error(`\n💥 Error: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Show help information
   */
  showHelp() {
    console.log(`
🎯 Layer Generation Manager for Envy UI v2

USAGE:
  npm run layers:generate [options]

OPTIONS:
  --layers, -l <layers>    Comma-separated list of layers to generate
  --list, -ls              List all available layers
  --help, -h               Show this help

EXAMPLES:
  npm run layers:generate                          # Generate selected layers from config
  npm run layers:generate --layers html-css,tsx   # Generate specific layers
  npm run layers:generate --list                   # List available layers

CONFIGURATION:
  Configuration is read from layer-generation.config.json
  Selected layers are defined in config.generation.selectedLayers
  Layer dependencies are automatically resolved
`);
  }
}

// CLI argument parsing
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--layers':
      case '-l':
        result.layers = args[++i]?.split(',').map(l => l.trim());
        break;
      case '--list':
      case '-ls':
        result.list = true;
        break;
      case '--help':
      case '-h':
        result.help = true;
        break;
      default:
        if (arg.startsWith('--layers=')) {
          result.layers = arg.split('=')[1].split(',').map(l => l.trim());
        }
        break;
    }
  }

  return result;
}

// Run the manager
const manager = new LayerGenerationManager();
const cliArgs = parseArgs();

manager.run(cliArgs).catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});