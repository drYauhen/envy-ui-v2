#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv2020 from 'ajv/dist/2020.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const resolverDir = path.join(repoRoot, 'tokens', 'knowledge', 'resolver');
const schemaPath = path.join(repoRoot, 'schemas', 'dtcg-resolver-2025.10.schema.json');

function formatAjvError(error) {
  const pointer = error.instancePath && error.instancePath.length > 0 ? error.instancePath : '/';
  return `${pointer} ${error.message}`;
}

function main() {
  if (!fs.existsSync(schemaPath)) {
    console.error(`❌ Resolver schema not found: ${path.relative(repoRoot, schemaPath)}`);
    process.exit(1);
  }

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const resolverFiles = fs
    .readdirSync(resolverDir)
    .filter((name) => name.endsWith('.resolver.json'))
    .sort((a, b) => a.localeCompare(b));

  if (resolverFiles.length === 0) {
    console.error(`❌ No resolver files found in ${path.relative(repoRoot, resolverDir)}`);
    process.exit(1);
  }

  const errors = [];

  resolverFiles.forEach((fileName) => {
    const absolutePath = path.join(resolverDir, fileName);
    const resolver = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
    const valid = validate(resolver);
    if (valid) return;

    const ajvErrors = Array.isArray(validate.errors) ? validate.errors : [];
    errors.push(`${path.join('tokens', 'knowledge', 'resolver', fileName)}:`);
    ajvErrors.forEach((error) => {
      errors.push(`  - ${formatAjvError(error)}`);
    });
  });

  if (errors.length > 0) {
    console.error('❌ Resolver JSON schema validation failed:\n');
    errors.forEach((line) => console.error(line));
    process.exit(1);
  }

  console.log('✅ Resolver JSON schema validation passed.');
  resolverFiles.forEach((fileName) => {
    console.log(`   - ${path.join('tokens', 'knowledge', 'resolver', fileName)}`);
  });
}

main();
