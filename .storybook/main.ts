import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
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
    
    // Add PostCSS support for Tailwind
    // Use createRequire for CommonJS compatibility
    const { createRequire } = await import('module');
    const { resolve } = await import('path');
    const { fileURLToPath } = await import('url');
    const require = createRequire(import.meta.url);
    const tailwindcss = require('tailwindcss');
    const autoprefixer = require('autoprefixer');
    const tailwindConfigModule = await import('../packages/tailwind/config/tailwind.config.js');
    const tailwindConfig = tailwindConfigModule.default || tailwindConfigModule;
    
    // Resolve content paths relative to project root
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = resolve(__filename, '..');
    const projectRoot = resolve(__dirname, '..');
    
    const tailwindConfigWithPaths = {
      ...tailwindConfig,
      // Resolve content paths to absolute paths
      content: tailwindConfig.content.map((path: string) => {
        // Resolve relative to project root
        if (path.startsWith('./')) {
          return resolve(projectRoot, path.slice(2));
        }
        return resolve(projectRoot, path);
      }),
    };
    
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [
        tailwindcss(tailwindConfigWithPaths),
        autoprefixer(),
      ],
    };
    
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
