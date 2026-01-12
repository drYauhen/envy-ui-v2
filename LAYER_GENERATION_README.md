# Layer Generation System for Envy UI

> **Status:** Experimental. HTML/CSS and TSX generators are stubs.  
> **Canonical component pipeline:** `tokens/components/*.contract.json` + `tokens/components/*.tokens.json` → `generated/css/components/*.tokens.css` + contract-driven structure CSS (strict by default).

## Overview

This document describes the new **Layer Generation System** implemented for Envy UI, which provides a structured approach to managing layered component generation across different technological layers.

## 🎯 Problem Solved

Previously, working with multiple component layers (tokens, HTML/CSS, TSX, React Aria, Web Components) was:
- **Unstructured**: No clear workflow for progressing through layers
- **Manual**: Each layer had to be generated separately
- **Error-prone**: Easy to forget dependencies or miss steps
- **Hard to track**: No visibility into what layers exist and their status

## 🚀 Solution Implemented

### 1. **Configuration-Driven Architecture**
- **`layer-generation.config.json`** - Declarative configuration of all layers
- **`schemas/layer-generation.schema.json`** - JSON Schema validation
- **Dependency management** - Automatic resolution of layer dependencies

### 2. **CLI Management System**
```bash
# List all available layers
npm run layers:list

# Generate selected layers
npm run layers:generate

# Generate specific layers
npm run layers:generate -- --layers tokens,html-css

# Get help
npm run layers:help
```

### 3. **Layer Architecture**
```
tokens → html-css → tsx-clean → tsx → tsx-react-aria
   ↓       ↓          ↓         ↓          ↓
web-components
```

Each layer has:
- **Dependencies**: Must be generated before dependent layers
- **Platforms**: Target output formats (css, tsx, web-components, etc.)
- **Commands**: Scripts to execute for generation
- **Status**: Enabled/disabled state

### 4. **Generation Orchestrator**
- **`scripts/generate-layers.mjs`** - Main orchestration script
- **Topological sorting** - Resolves dependencies automatically
- **Parallel/sequential execution** - Configurable execution strategy
- **Error handling** - Fail-fast or continue-on-error modes

## 📁 Files Created

```
layer-generation.config.json          # Main configuration
schemas/layer-generation.schema.json  # JSON Schema validation
scripts/generate-layers.mjs          # CLI orchestrator
.storybook/middleware.js             # API endpoints (prepared)
.storybook/addons/layer-generation/  # Storybook addon (prepared)
```

## 🎮 Usage Examples

### Basic Usage
```bash
# See what layers are available
npm run layers:list

# Generate the default selected layers (tokens, html-css, tsx-clean, tsx)
npm run layers:generate

# Generate only specific layers
npm run layers:generate -- --layers tokens,html-css
```

### Configuration Example
```json
{
  "layers": {
    "tokens": {
      "name": "Design Tokens",
      "description": "Foundation tokens and semantic mappings",
      "platforms": ["css", "js", "figma", "tokenstudio"],
      "enabled": true,
      "dependsOn": [],
      "generator": {
        "command": "npm run tokens:build",
        "outputPaths": ["generated/css/tokens.css"]
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

## 🔄 Workflow Integration

### Development Workflow
1. **Modify tokens** in `tokens/**/*.json`
2. **Generate tokens**: `npm run layers:generate -- --layers tokens`
3. **Generate components**: `npm run layers:generate` (all selected layers)
4. **Check results** in `generated/` directories

### CI/CD Integration
```yaml
# Example GitHub Actions
- name: Generate component layers
  run: npm run layers:generate
```

## 📊 Current Layer Status

| Layer | Status | Description |
|-------|--------|-------------|
| `tokens` | ✅ **Active** | Design tokens generation |
| `html-css` | ⚠️ **Stub** | Pure HTML/CSS components |
| `tsx-clean` | ⚠️ **Stub** | Clean React components |
| `tsx` | ⚠️ **Stub** | Full React components |
| `tsx-react-aria` | ❌ **Disabled** | Accessible React Aria components |
| `web-components` | ❌ **Disabled** | Framework-agnostic web components |

## 🔧 Extending the System

### Adding a New Layer
1. Add to `layer-generation.config.json`:
```json
"my-layer": {
  "name": "My Custom Layer",
  "description": "Description of what this layer does",
  "platforms": ["tsx"],
  "enabled": true,
  "dependsOn": ["tokens"],
  "generator": {
    "command": "npm run generate:my-layer",
    "outputPaths": ["generated/my-layer/**"]
  }
}
```

2. Add the generation script to `package.json`:
```json
"generate:my-layer": "node scripts/generate-my-layer.mjs"
```

3. Implement the generation logic in the script.

### Modifying Dependencies
Update the `dependsOn` array in the configuration to change layer relationships.

### Changing Execution Strategy
Modify `generation.parallelExecution` and `generation.failFast` in the config.

## 🎯 Benefits Achieved

✅ **Structured workflow** - Clear progression through component layers
✅ **Dependency management** - Automatic handling of prerequisites
✅ **CLI tooling** - Easy generation from command line
✅ **Configuration-driven** - Easy to modify without code changes
✅ **Extensible** - Simple to add new layers and generators
✅ **Validation** - JSON Schema ensures configuration correctness

## 🚧 Next Steps

### Immediate Priorities
1. **Implement HTML/CSS generation** - Create actual component generators
2. **Add TSX generators** - Build React component generation
3. **Storybook UI integration** - Complete the addon for visual management
4. **API endpoints** - Finish middleware for programmatic access

### Future Enhancements
1. **AI-assisted generation** - Use LLMs to generate components
2. **Caching system** - Avoid regenerating unchanged layers
3. **Watch mode** - Auto-regeneration on file changes
4. **Testing integration** - Validate generated components
5. **Documentation generation** - Auto-docs for generated components

## 🤝 Contributing

To contribute to the layer generation system:

1. **Configuration changes**: Modify `layer-generation.config.json`
2. **New generators**: Add scripts to `scripts/` and commands to `package.json`
3. **Schema updates**: Update `schemas/layer-generation.schema.json`
4. **Testing**: Use `npm run layers:generate` to test changes

## 📚 Related Documentation

- [WORKFLOW_MANIFEST.md](./WORKFLOW_MANIFEST.md) - Overall project architecture
- [Token Architecture](./docs/architecture/token-architecture.md) - Token system details
- [Storybook Workflow](./docs/workflows/storybook-workflow.md) - Storybook integration

---

This system transforms component development from a manual, error-prone process into a structured, automated workflow that scales with your design system complexity.
