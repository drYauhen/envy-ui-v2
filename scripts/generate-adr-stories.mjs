import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const adrDir = 'docs/adr';
const storiesDir = 'stories/docs/adr';
const adrFiles = readdirSync(adrDir)
  .filter(f => f.startsWith('ADR-') && f.endsWith('.md'))
  .sort();

adrFiles.forEach(file => {
  const content = readFileSync(join(adrDir, file), 'utf-8');
  const match = content.match(/^# ADR-(\d+):\s*(.+)$/m);
  if (!match) return;
  
  const [, number, title] = match;
  const statusMatch = content.match(/\*\*Status:\*\*\s*(.+)/);
  const dateMatch = content.match(/\*\*Date:\*\*\s*(.+)/);
  const status = statusMatch ? statusMatch[1].trim() : 'Unknown';
  const date = dateMatch ? dateMatch[1].trim() : 'Unknown';
  
  const adrId = number.toLowerCase().replace(/^0+/, '');
  const storyId = `adr-${number.toLowerCase()}`;
  const storyName = title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '');
  
  const storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR/ADR-${number}',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const ${storyName}: Story = {
  name: '${title}',
  render: () => (
    <AdrViewer
      adrNumber="${number}"
      title="${title}"
      status="${status}"
      date="${date}"
    />
  )
};
`;

  writeFileSync(join(storiesDir, `${storyId}.stories.tsx`), storyContent);
  console.log(`Generated: ${storyId}.stories.tsx`);
});

console.log(`Generated ${adrFiles.length} ADR stories`);
