# Layer Generation Addon

This Storybook addon provides a UI panel for managing layered component generation in Envy UI v2.

## Features

- **Layer Selection**: Visual interface for selecting which component layers to generate
- **Dependency Resolution**: Automatic handling of layer dependencies
- **Generation Control**: Start generation processes with real-time feedback
- **Status Monitoring**: Visual indicators for layer status and generation progress

## Usage

The addon adds a new panel called "Layer Generation" to Storybook's addon panel area.

### Selecting Layers

1. Open the Layer Generation panel in Storybook
2. Check/uncheck the layers you want to generate
3. Click "Generate Selected" to start the process

### Available Layers

- **tokens**: Design tokens generation
- **html-css**: Pure HTML/CSS components
- **tsx-clean**: Clean React components
- **tsx**: Full React components with state
- **tsx-react-aria**: Accessible components with React Aria
- **web-components**: Framework-agnostic web components

## API Endpoints

The addon expects the following API endpoints to be available:

### GET `/layer-generation.config.json`
Returns the current layer generation configuration.

### POST `/api/layers/generate`
Triggers layer generation for selected layers.

**Request Body:**
```json
{
  "layers": ["tokens", "html-css", "tsx-clean"]
}
```

**Response:**
```json
{
  "success": true,
  "output": "Generation completed successfully",
  "layers": {
    "tokens": { "success": true, "duration": 1870 },
    "html-css": { "success": true, "duration": 2450 }
  }
}
```

### GET `/api/layers/list`
Returns information about all available layers.

## Development

### File Structure

```
.storybook/addons/layer-generation/
├── preset.js          # Storybook addon registration
├── manager.js         # Addon manager setup
├── LayerGenerationPanel.jsx  # Main React component
└── README.md          # This file
```

### Building Custom Components

The addon can be extended to support custom component generation by:

1. Adding new layer definitions to `layer-generation.config.json`
2. Implementing generation scripts in `scripts/`
3. Updating the API endpoints to handle new layer types

## Integration

To integrate this addon with your build system:

1. Ensure the API endpoints are implemented on your development server
2. Configure layer generation scripts in `package.json`
3. Update the configuration file as needed for your project structure

## Troubleshooting

### Panel Not Showing
- Check that the addon is properly registered in `.storybook/main.ts`
- Ensure all dependencies are installed
- Check browser console for JavaScript errors

### API Errors
- Verify that the development server is running
- Check that API endpoints return valid JSON
- Ensure CORS headers allow requests from Storybook

### Generation Failures
- Check console output in the addon panel
- Verify that selected layers have valid dependencies
- Ensure generation scripts are executable and have proper permissions