# Layer Generation Workflow

**Document ID:** workflow-layer-generation-workflow
**Last Updated:** 2026-01-10
**Category:** Workflow

> **Status:** Experimental. HTML/CSS/TSX generators are stubs and this workflow is not the canonical component pipeline.  
> Canonical CSS uses `tokens:build:canonical` + `scripts/generate-component-css.mjs` and contract-driven structure CSS.

## Overview

The **Layer Generation System** provides a structured approach to managing component development across multiple technological layers in Envy UI. This workflow describes how to use the system for efficient component development and maintenance.

## 🎯 Purpose

This workflow solves the challenge of working with multiple component layers simultaneously by providing:

- **Structured progression** through component layers
- **Dependency management** between layers
- **Automated generation** of related artifacts
- **CLI tooling** for easy operation

## 📋 Available Layers

| Layer | Description | Dependencies | Status |
|-------|-------------|--------------|---------|
| `tokens` | Design tokens and semantic mappings | None | ✅ Active |
| `html-css` | Pure HTML/CSS components | `tokens` | ⚠️ Stub |
| `tsx-clean` | Clean React components (no external deps) | `tokens`, `html-css` | ⚠️ Stub |
| `tsx` | Full React components with state | `tokens`, `tsx-clean` | ⚠️ Stub |
| `tsx-react-aria` | Accessible components with React Aria | `tokens`, `tsx` | ❌ Disabled |
| `web-components` | Framework-agnostic web components | `tokens`, `html-css` | ❌ Disabled |

## 🚀 Quick Start

### Check Available Layers
```bash
npm run layers:list
```

### Generate Default Layers
```bash
npm run layers:generate
```

### Generate Specific Layers
```bash
# Only tokens
npm run layers:generate -- --layers tokens

# Multiple layers
npm run layers:generate -- --layers tokens,html-css
```

## 📋 Workflow Steps

### 1. **Token Development**
```bash
# Edit tokens in tokens/**/*.json
# Then generate
npm run layers:generate -- --layers tokens
```

### 2. **Component Generation**
```bash
# Generate all selected layers
npm run layers:generate
```

### 3. **Verification**
```bash
# Check generated files in generated/ directory
ls -la generated/
```

## 🛠️ CLI Commands Reference

### List Layers
```bash
npm run layers:list
```
Shows all available layers with their status and dependencies.

### Generate Layers
```bash
npm run layers:generate [options]
```

**Options:**
- `--layers, -l <layers>` - Comma-separated list of layers
- `--help, -h` - Show help

**Examples:**
```bash
# Generate default selected layers
npm run layers:generate

# Generate only tokens
npm run layers:generate -- --layers tokens

# Generate specific combination
npm run layers:generate -- --layers tokens,html-css,tsx-clean
```

### Help
```bash
npm run layers:help
```
Shows usage information and examples.

## ⚙️ Configuration

### Main Configuration File
- **Location**: `layer-generation.config.json`
- **Schema**: `schemas/layer-generation.schema.json`

### Key Configuration Options

```json
{
  "layers": {
    "tokens": {
      "enabled": true,
      "dependsOn": [],
      "generator": {
        "command": "npm run tokens:build"
      }
    }
  },
  "generation": {
    "selectedLayers": ["tokens", "html-css", "tsx-clean", "tsx"],
    "autoGenerate": false,
    "triggerOnTokenChange": true
  }
}
```

## 🔄 Integration with Other Workflows

### Token Workflow
- **Before**: Use [Tokens Workflow](./WORKFLOW-005-tokens-workflow.md) to modify tokens
- **After**: Run layer generation to propagate changes
- **Integration**: Layer generation automatically calls token build scripts

### Storybook Workflow
- **Integration**: Layer generation can trigger Storybook updates
- **Future**: Visual addon for layer management in Storybook UI

### Development Workflow
1. **Modify tokens** → Generate tokens layer
2. **Review token changes** → Generate component layers
3. **Test components** → Iterate on token/component relationship

## 🐛 Troubleshooting

### Common Issues

**"Layer not found" error**
```bash
# Check available layers
npm run layers:list

# Verify layer name in config
cat layer-generation.config.json
```

**"Dependency resolution failed"**
```bash
# Check layer dependencies
npm run layers:list

# Generate dependencies first
npm run layers:generate -- --layers tokens
```

**Generation script fails**
```bash
# Check individual script
npm run tokens:build

# Check script permissions
ls -la scripts/generate-layers.mjs
```

### Debug Mode
```bash
# Run with verbose output
DEBUG=* npm run layers:generate -- --layers tokens
```

## 📁 File Locations

### Configuration
- `layer-generation.config.json` - Main configuration
- `schemas/layer-generation.schema.json` - Configuration validation

### Scripts
- `scripts/generate-layers.mjs` - Main orchestrator
- `package.json` - CLI command definitions

### Generated Output
- `generated/css/` - CSS tokens and components
- `generated/js/` - JavaScript/TypeScript output
- `generated/tsx/` - React components
- `generated/storybook/` - Storybook-specific files

### Storybook Integration
- `.storybook/addons/layer-generation/` - Storybook addon (future)
- `.storybook/middleware.js` - API endpoints (future)

## 🔧 Extending the System

### Adding a New Layer

1. **Add to configuration:**
```json
"my-layer": {
  "name": "My Custom Layer",
  "description": "Description",
  "platforms": ["tsx"],
  "enabled": true,
  "dependsOn": ["tokens"],
  "generator": {
    "command": "npm run generate:my-layer"
  }
}
```

2. **Add npm script:**
```json
"generate:my-layer": "node scripts/generate-my-layer.mjs"
```

3. **Implement generator script:**
```javascript
// scripts/generate-my-layer.mjs
import { generateComponents } from '../lib/component-generator.js';

console.log('Generating my layer...');
// Implementation here
```

### Modifying Dependencies

Update the `dependsOn` array in `layer-generation.config.json`:

```json
"my-layer": {
  "dependsOn": ["tokens", "another-layer"]
}
```

## 📊 Monitoring and Metrics

### Current Status
- **Active layers**: tokens
- **Stub layers**: html-css, tsx-clean, tsx
- **Disabled layers**: tsx-react-aria, web-components

### Performance Metrics
- Token generation: ~1.8 seconds
- Full layer generation: ~3-5 seconds (estimated)

## 🎯 Best Practices

### Development Workflow
1. **Always generate tokens first** when making token changes
2. **Use specific layers** during development to avoid unnecessary work
3. **Check generated output** before committing changes
4. **Run full generation** before releases

### Configuration Management
1. **Keep configuration in sync** with available scripts
2. **Test configuration changes** with `npm run layers:list`
3. **Document custom layers** in this workflow
4. **Version control** configuration alongside code changes

## 🔗 Related Documentation

- **[WORKFLOW_MANIFEST.md](../../WORKFLOW_MANIFEST.md)** - Core project rules
- **[Tokens Workflow](./WORKFLOW-005-tokens-workflow.md)** - Token development process
- **[Storybook Workflow](./WORKFLOW-003-storybook-workflow.md)** - Storybook development
- **[Scripts Reference](./WORKFLOW-004-scripts-reference.md)** - All available npm scripts
- **[Architecture Overview](../architecture/)** - System architecture docs

## 📝 Future Enhancements

### Planned Features
- **Storybook UI addon** for visual layer management
- **AI-assisted generation** between layers
- **Caching system** to avoid redundant generation
- **Watch mode** for automatic regeneration
- **Testing integration** for generated components

### Long-term Vision
- **Multi-platform generation** (React, Vue, Angular, Web Components)
- **Component composition** from multiple layers
- **Version management** for generated artifacts
- **CI/CD integration** with automated deployment

---

**Last updated**: January 7, 2025
**System version**: v1.0.0
