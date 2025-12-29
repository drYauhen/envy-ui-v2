import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const projectRoot = resolve(__dirname, '..', '..');
const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        dimensions: false,
        replaceAttrValues: {
          '#000': 'currentColor',
          '#000000': 'currentColor',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@packages': resolve(projectRoot, './packages'),
      '@generated': resolve(projectRoot, './generated'),
      '@src': resolve(projectRoot, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss')({
          content: [
            resolve(projectRoot, './packages/tsx/**/*.{ts,tsx}'),
            resolve(projectRoot, './src/**/*.{ts,tsx}'),
            resolve(__dirname, './src/**/*.{ts,tsx}'),
          ],
          theme: {
            extend: {},
          },
        }),
        require('autoprefixer')(),
      ],
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});

