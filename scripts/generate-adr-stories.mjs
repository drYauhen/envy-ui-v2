import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Parse adr-list-data.ts to extract exportName for each ADR
 * This file is the SINGLE SOURCE OF TRUTH for ADR metadata
 */
function parseAdrListData() {
  const adrListPath = 'stories/viewers/docs/adr-list-data.ts';
  const content = readFileSync(adrListPath, 'utf-8');
  const adrMap = new Map();
  
  // Extract ADR entries from the array
  // Pattern: { number: 'XXXX', title: '...', status: '...', date: '...', exportName: '...' }
  const adrPattern = /\{\s*number:\s*['"]([\d]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*status:\s*['"]([^'"]+)['"],\s*date:\s*['"]([^'"]+)['"](?:,\s*exportName:\s*['"]([^'"]+)['"])?\s*\}/g;
  
  let match;
  while ((match = adrPattern.exec(content)) !== null) {
    const [, number, title, status, date, exportName] = match;
    adrMap.set(number, {
      number,
      title,
      status,
      date,
      exportName: exportName || null
    });
  }
  
  return adrMap;
}

const adrDir = 'docs/adr';
const storiesDir = 'stories/docs/adr';

// Load ADR list data as source of truth
const adrListData = parseAdrListData();

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
  
  // Get exportName from adr-list-data.ts (SINGLE SOURCE OF TRUTH)
  const adrData = adrListData.get(number);
  let storyName;
  if (adrData && adrData.exportName) {
    // Use exportName from adr-list-data.ts
    storyName = adrData.exportName;
  } else {
    // Fallback: generate from title (same logic as before)
    storyName = title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '');
  }
  
  const storyId = `adr-${number.toLowerCase()}`;
  
  const storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { AdrViewer } from '../../viewers/docs/AdrViewer';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const ${storyName}: Story = {
  name: 'ADR-${number} ${title}',
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
  console.log(`Generated: ${storyId}.stories.tsx (export: ${storyName})`);
});

console.log(`\n✅ Generated ${adrFiles.length} ADR stories`);
console.log(`📝 Source of truth: stories/viewers/docs/adr-list-data.ts\n`);
