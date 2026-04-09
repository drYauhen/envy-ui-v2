import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const ALLOWED_SOURCE_PREFIXES = [
  '/stories/',
  '/packages/',
  '/apps/',
  '/src/',
  '/tokens/',
  '/scripts/',
  '/schemas/',
  '/generated/',
  '/.storybook/'
];

const ALLOWED_ROOT_SOURCE_FILES = new Set([
  '/package.json',
  '/package-lock.json',
  '/tsconfig.json',
  '/vitest.config.ts',
  '/layer-generation.config.json'
]);

const isAllowedSourcePath = (sourcePath: string): boolean =>
  ALLOWED_ROOT_SOURCE_FILES.has(sourcePath) ||
  ALLOWED_SOURCE_PREFIXES.some((prefix) => sourcePath.startsWith(prefix));

export const createSourceFileEndpointPlugin = (repoRoot: string): Plugin => ({
  name: 'envy-ui-source-file-endpoint',
  configureServer(server) {
    server.middlewares.use('/__source-file', async (req, res) => {
      try {
        const parsedUrl = new URL(req.url || '', 'http://localhost');
        const requestedPath = parsedUrl.searchParams.get('path')?.trim() || '';

        if (!requestedPath.startsWith('/') || !isAllowedSourcePath(requestedPath)) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Invalid or disallowed source path');
          return;
        }

        const relativePath = requestedPath.replace(/^\/+/, '');
        const absolutePath = path.resolve(repoRoot, relativePath);

        if (!absolutePath.startsWith(`${repoRoot}${path.sep}`) && absolutePath !== repoRoot) {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Path is outside repository root');
          return;
        }

        const sourceText = await fs.readFile(absolutePath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(sourceText);
      } catch (error) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(`Failed to read source file: ${(error as Error)?.message || 'Unknown error'}`);
      }
    });
  }
});
