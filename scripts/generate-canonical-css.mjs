#!/usr/bin/env node

import {
  generatePrimitivesCSS,
  generateContextsCSS,
  generateThemesCSS,
  generateEntrypointCSS,
  runCanonicalCssGeneration
} from '../style-dictionary/utils/canonical-css-generator.mjs';

if (import.meta.url === `file://${process.argv[1]}`) {
  runCanonicalCssGeneration();
}

export {
  generatePrimitivesCSS,
  generateContextsCSS,
  generateThemesCSS,
  generateEntrypointCSS,
  runCanonicalCssGeneration
};
