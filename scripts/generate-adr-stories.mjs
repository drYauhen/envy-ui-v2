import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Parse adr-list-data.ts to extract exportName for each ADR
 * This file is the SINGLE SOURCE OF TRUTH for ADR metadata
 */
function parseAdrListData() {
  const adrListPath = 'stories/viewers/docs/adr-list-data.ts';
  const content = readFileSync(adrListPath, 'utf-8');
  const adrList = [];

  // Extract ADR entries from the array
  // Pattern: { number: 'XXXX', title: '...', status: '...', date: '...', exportName: '...' }
  const adrPattern = /\{\s*number:\s*['"]([\d]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*status:\s*['"]([^'"]+)['"],\s*date:\s*['"]([^'"]+)['"](?:,\s*exportName:\s*['"]([^'"]+)['"])?\s*\}/g;

  let match;
  while ((match = adrPattern.exec(content)) !== null) {
    const [, number, title, status, date, exportName] = match;
    adrList.push({
      number,
      title,
      status,
      date,
      exportName: exportName || null
    });
  }

  return adrList;
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
  // Handle multiple ADRs with same number by matching filename/title
  const matchingAdrs = adrListData.filter(adr => adr.number === number);
  let adrData;

  if (matchingAdrs.length === 1) {
    // Single ADR with this number
    adrData = matchingAdrs[0];
  } else if (matchingAdrs.length > 1) {
    // Multiple ADRs with same number - match by filename similarity
    const filename = file.replace(/^ADR-\d+-/, '').replace('.md', '').replace(/-/g, ' ');
    adrData = matchingAdrs.find(adr =>
      adr.title.toLowerCase().includes(filename.toLowerCase()) ||
      filename.toLowerCase().includes(adr.title.toLowerCase().replace(/[^\w\s]/g, ''))
    ) || matchingAdrs[0]; // fallback to first if no match
  }

  let storyName;
  if (adrData && adrData.exportName) {
    // Use exportName from adr-list-data.ts
    storyName = adrData.exportName;
  } else {
    // Fallback: generate from title (same logic as before)
    storyName = title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '');
  }

  // Use the full ADR filename for the story file (remove .md, add .stories.tsx)
  const storyFilename = file.replace('.md', '.stories.tsx');
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

  writeFileSync(join(storiesDir, storyFilename), storyContent);
  console.log(`Generated: ${storyFilename} (export: ${storyName})`);
});

/**
 * Generate Architecture Stories
 * Uses architecture-data.ts as source of truth
 */
function generateArchitectureStories() {
  console.log('\n🏗️  Generating Architecture Stories...');

  const archDataPath = 'stories/viewers/docs/architecture-data.ts';
  const archDataContent = readFileSync(archDataPath, 'utf-8');

  // Extract architectures array
  const architecturesMatch = archDataContent.match(/export const architectures: ArchitectureMetadata\[\] = \[([\s\S]*?)\];/);
  if (!architecturesMatch) {
    console.error('❌ Could not parse architecture-data.ts');
    return;
  }

  const architectures = [];
  const entryPattern = /\{\s*id:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*filename:\s*['"]([^'"]+)['"](?:,\s*storybookId:\s*['"]([^'"]+)['"])?/g;

  let match;
  while ((match = entryPattern.exec(architecturesMatch[1])) !== null) {
    const [, id, title, filename, storybookId] = match;
    architectures.push({ id, title, filename, storybookId });
  }

  let generated = 0;
  for (const arch of architectures) {
    console.log(`Processing architecture: ${arch.filename}, storybookId: ${arch.storybookId || 'NONE'}`);
    const storyFilename = arch.filename.replace('.md', '.stories.tsx');
    const storyPath = join('stories/docs/architecture', storyFilename);

    // Use title from architecture-data.ts as the display name
    const displayName = arch.title;
    console.log(`  📝 Using title from data: ${displayName}`);

    // Generate export name (camelCase)
    let storyName = arch.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '');

    const storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { DocViewer } from '../../viewers/docs/DocViewer';
import { getSectionParameters } from '../../../.storybook/preview';

type Story = StoryObj;

const meta: Meta = {
  title: 'Docs/Architecture',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Docs/Architecture'),
    layout: 'fullscreen',
    controls: { hidden: true },
    actions: { hidden: true },
    interactions: { hidden: true },
    a11y: { hidden: true }
  }
};

export default meta;

export const ${storyName}: Story = {
  name: '${displayName}',
  render: () => (
    <DocViewer
      markdownPath="/docs/architecture/${arch.filename}"
      fallback="Loading ${displayName.toLowerCase()}..."
    />
  )
};
`;

    writeFileSync(storyPath, storyContent);
    console.log(`✅ Generated: ${storyFilename} (${arch.id})`);
    generated++;
  }

  console.log(`\n✅ Generated ${generated} Architecture stories`);
  console.log(`📝 Source of truth: stories/viewers/docs/architecture-data.ts\n`);
}

// Generate both ADR and Architecture stories
generateArchitectureStories();

console.log(`\n✅ Generated ${adrFiles.length} ADR stories`);
console.log(`📝 Source of truth: stories/viewers/docs/adr-list-data.ts\n`);
