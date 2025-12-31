import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const existingStories = new Set([
  'avatar', 'button', 'card', 'menu', 'modal', 'select'
]);

async function getComponentFiles(componentName) {
  const componentDir = join(projectRoot, 'tokens/app/components', componentName);
  try {
    const files = await readdir(componentDir);
    return files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
  } catch {
    return [];
  }
}

function generateStory(componentName, files) {
  const componentNameCapitalized = componentName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
  
  const imports = files.map(file => {
    const fileVar = file.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    return `import ${componentName}${fileVar} from '../../../../tokens/app/components/${componentName}/${file}.json';`;
  }).join('\n');

  const flattenCalls = files.map(file => {
    const fileVar = file.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    return `flattenTokens(${componentName}${fileVar}, [], flatTokenMap);`;
  }).join('\n');

  const collectCalls = files.map(file => {
    const fileVar = file.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    const componentPath = componentName.split('-').join('.');
    return `  ...collectRefs((${componentName}${fileVar} as any)?.eui?.${componentPath} ?? {}, ['eui', '${componentPath}']),`;
  }).join('\n');

  const displayName = componentName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return `import type { Meta, StoryObj } from '@storybook/react';
${imports}
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
${flattenCalls}

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
${collectCalls}
];

const meta: Meta = {
  title: 'Tokens/App/Components/${displayName}',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  if (token.path.includes('color') || token.path.includes('background') || token.path.includes('border')) {
    return <TokenSwatch reference={token.ref} resolveReference={resolveReference} />;
  }
  return null;
};

export const ${componentNameCapitalized}: Story = {
  name: '${displayName}',
  render: () => (
    <TokenPage>
      <TokenSection
        title="${displayName} Component Tokens"
        description="Token definitions for ${componentName} component."
      />
      <TokenRefTable
        title="All Tokens"
        refs={allRefs}
        emptyMessage="No tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};
`;
}

async function main() {
  const componentsDir = join(projectRoot, 'tokens/app/components');
  const components = await readdir(componentsDir, { withFileTypes: true });
  
  for (const component of components) {
    if (!component.isDirectory()) continue;
    if (existingStories.has(component.name)) {
      console.log(`Skipping ${component.name} (story already exists)`);
      continue;
    }
    
    const files = await getComponentFiles(component.name);
    if (files.length === 0) {
      console.log(`Skipping ${component.name} (no token files)`);
      continue;
    }
    
    const storyContent = generateStory(component.name, files);
    const storyPath = join(projectRoot, 'stories/tokens/app/components', `${component.name}.stories.tsx`);
    await writeFile(storyPath, storyContent);
    console.log(`Created story for ${component.name}`);
  }
}

main().catch(console.error);

