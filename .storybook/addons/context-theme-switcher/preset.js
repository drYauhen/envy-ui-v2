import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const managerEntries = (entry = []) => [
  ...entry,
  resolve(__dirname, './manager.js')
];
