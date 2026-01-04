import { readdir, writeFile, mkdir } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

function toCamelCase(str) {
  return str.split('-').map((word, index) => 
    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
}

function toPascalCase(str) {
  return str.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
}

function generateStoryForTokenFile(componentName, tokenFileName) {
  const componentNameCamel = toCamelCase(componentName);
  const tokenFileBase = basename(tokenFileName, '.json');
  const tokenFileVar = toPascalCase(tokenFileBase);
  const importVar = `${componentNameCamel}${tokenFileVar}`;
  
  // Token path: stories/tokens/app/components/alert-banner/colors.stories.tsx
  // -> ../../../../../tokens/app/components/alert-banner/colors.json
  const tokenRelativePath = `../../../../../tokens/app/components/${componentName}/${tokenFileName}`;
  
  // Viewers path: stories/tokens/app/components/alert-banner/colors.stories.tsx
  // -> ../../../../viewers/tokens/TokenLayout
  const viewersPath = `../../../../viewers/tokens`;
  
  // Component path for collectRefs - use name with dash in quotes
  const componentPath = componentName; // 'alert-banner' или 'button'
  
  const displayName = componentName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const categoryDisplayName = tokenFileBase.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return `import type { Meta, StoryObj } from '@storybook/react';
import ${importVar} from '${tokenRelativePath}';
import { TokenPage, TokenSection } from '${viewersPath}/TokenLayout';
import { TokenRefTable } from '${viewersPath}/TokenRefTable';
import { TokenSwatch } from '${viewersPath}/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '${viewersPath}/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(${importVar}, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Use the entire component object from the JSON file
const tokenRefs = collectRefs((${importVar} as any)?.eui?.['${componentPath}'] ?? {}, ['eui', '${componentPath}']);

const meta: Meta = {
  title: 'Tokens/App/Components/${displayName}/${categoryDisplayName}',
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

export const ${tokenFileVar}: Story = {
  name: '${categoryDisplayName}',
  render: () => (
    <TokenPage>
      <TokenSection
        title="${displayName} ${categoryDisplayName}"
        description="Token definitions for ${componentName} ${tokenFileBase}."
      />
      <TokenRefTable
        title="${categoryDisplayName}"
        refs={tokenRefs}
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

async function getComponentTokenFiles(componentName) {
  const componentDir = join(projectRoot, 'tokens/app/components', componentName);
  try {
    const files = await readdir(componentDir);
    return files.filter(f => f.endsWith('.json')).sort();
  } catch {
    return [];
  }
}

async function main() {
  const componentsDir = join(projectRoot, 'tokens/app/components');
  const components = await readdir(componentsDir, { withFileTypes: true });
  
  for (const component of components) {
    if (!component.isDirectory()) continue;
    
    const componentName = component.name;
    const tokenFiles = await getComponentTokenFiles(componentName);
    
    if (tokenFiles.length === 0) {
      console.log(`Skipping ${componentName} (no token files)`);
      continue;
    }
    
    // Create directory for component stories
    const storiesComponentDir = join(projectRoot, 'stories/tokens/app/components', componentName);
    await mkdir(storiesComponentDir, { recursive: true });
    
    // Create story for each token file
    for (const tokenFile of tokenFiles) {
      const storyContent = generateStoryForTokenFile(componentName, tokenFile);
      const storyPath = join(storiesComponentDir, `${basename(tokenFile, '.json')}.stories.tsx`);
      await writeFile(storyPath, storyContent);
      console.log(`Created story: ${componentName}/${basename(tokenFile, '.json')}.stories.tsx`);
    }
  }
}

main().catch(console.error);
