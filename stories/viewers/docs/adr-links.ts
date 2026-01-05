import { adrFilenameMap } from './adr-filename-map';
import { adrs } from './adr-list-data';

// Helper function to convert ADR title to Storybook story slug
// Storybook converts export names (camelCase/PascalCase) to kebab-case slugs
export const titleToStorySlug = (title: string): string => {
  let normalized = title.replace(/[-—–]/g, ' ');
  const storyName = normalized.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '');
  return storyName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([a-zA-Z])/g, '$1-$2')
    .toLowerCase();
};

// Convert ADR export name to Storybook story slug (handles acronyms)
export const exportNameToSlug = (exportName: string): string => {
  let processed = exportName.replace(/([A-Z]{2,})([A-Z][a-z])/g, (_match, acronym, word) => {
    return `${acronym}-${word}`;
  });

  processed = processed
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([a-zA-Z])/g, '$1-$2');

  return processed.toLowerCase();
};

export const storySlugFromAdrLinkText = (linkText: string): string | null => {
  if (!linkText) return null;

  const titleMatch = linkText.match(/[—:]\s*(.+)$/) ||
    linkText.match(/ADR-\d+[:\s]+(.+)$/) ||
    linkText.match(/^(.+)$/);

  if (!titleMatch) return null;

  const title = titleMatch[1].trim();
  const cleanTitle = title.replace(/^ADR-\d+\s*/, '').trim();
  if (!cleanTitle) return null;

  return titleToStorySlug(cleanTitle);
};

// Helper function to convert ADR number to Storybook story path
export const adrNumberToStoryPath = async (adrNumber: string): Promise<string> => {
  try {
    const adrData = adrs.find(adr => adr.number === adrNumber);
    if (adrData?.exportName) {
      const slug = exportNameToSlug(adrData.exportName);
      return `?path=/story/docs-adr--${slug}`;
    }

    const storyResponse = await fetch(`/stories/docs/adr/adr-${adrNumber}.stories.tsx`);
    if (storyResponse.ok) {
      const storyText = await storyResponse.text();
      const exportMatch = storyText.match(/export const (\w+):\s*Story/);
      if (exportMatch) {
        const exportName = exportMatch[1];
        const slug = exportNameToSlug(exportName);
        return `?path=/story/docs-adr--${slug}`;
      }
    }

    const filename = adrFilenameMap[adrNumber] || `ADR-${adrNumber}.md`;
    const response = await fetch(`/docs/adr/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load ADR-${adrNumber}`);
    }
    const text = await response.text();
    const titleMatch = text.match(/^# ADR-\d+:\s*(.+)$/m);
    if (titleMatch) {
      const title = titleMatch[1].trim();
      const storySlug = titleToStorySlug(title);
      return `?path=/story/docs-adr--${storySlug}`;
    }
  } catch (err) {
    console.warn(`Could not load ADR-${adrNumber} for link generation:`, err);
  }

  return '';
};
