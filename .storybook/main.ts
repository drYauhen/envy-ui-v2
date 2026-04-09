import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import svgr from 'vite-plugin-svgr';
import { createSourceFileEndpointPlugin } from './plugins/source-file-endpoint';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    './addons/context-theme-switcher/preset.js'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../public', '../docs', '../assets', '../tokens'],
  async viteFinal(config) {
    const repoRoot = path.resolve(currentDir, '..');

    config.plugins = config.plugins || [];
    // Keep main.ts as a thin wiring layer: custom Storybook behavior must live in .storybook/plugins/*.
    config.plugins.push(createSourceFileEndpointPlugin(repoRoot));

    // Add SVGR plugin to Vite config
    config.plugins.push(
      svgr({
        svgrOptions: {
          icon: true, // Use viewBox for sizing instead of width/height
          dimensions: false, // Remove width/height attributes
          replaceAttrValues: {
            '#000': 'currentColor',
            '#000000': 'currentColor',
          },
        },
      })
    );

    // Ensure static files from docs/ are served
    // This allows fetch() to load markdown files
    if (config.server) {
      config.server.fs = {
        ...config.server.fs,
        allow: ['..']
      };
    }

    // Ensure JSON imports are properly handled
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = config.optimizeDeps.include || [];
    config.optimizeDeps.include.push('**/*.json');

    return config;
  },
};

export default config;
