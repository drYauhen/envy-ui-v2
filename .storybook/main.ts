import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

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
    // Add SVGR plugin to Vite config
    config.plugins = config.plugins || [];
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
