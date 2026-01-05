import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(async () => {
  const [{ storybookTest }, { playwright }] = await Promise.all([
    import('@storybook/addon-vitest/vitest-plugin'),
    import('@vitest/browser-playwright'),
  ]);
  const storybookPlugins = await storybookTest({ configDir: path.join(dirname, '.storybook') });

  return {
    plugins: storybookPlugins,
    test: {
      name: 'storybook',
      coverage: {
        enabled: false,
      },
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({}),
        instances: [{ browser: 'chromium' }],
      },
      setupFiles: './vitest.setup.ts',
    },
  };
});
