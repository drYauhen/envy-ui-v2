const DEFAULT_GROUPS = [
  { id: 'neutral', title: 'Foundation Neutral' },
  { id: 'brand', title: 'Foundation Brand' },
  { id: 'accent', title: 'Foundation Accent' },
  { id: 'signal', title: 'Signal' },
  { id: 'status', title: 'Status' },
  { id: 'text', title: 'Semantic Text' },
  { id: 'background', title: 'Semantic Background' },
  { id: 'border', title: 'Semantic Border' },
  { id: 'focus', title: 'Semantic Focus' }
];

const toTitleCase = (value = '') =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());

const slugFromSegments = (segments = []) =>
  segments
    .join('-')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();

const formatLabel = (segments = []) => toTitleCase(segments.join(' '));

module.exports = function registerStorybookColorsFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'json/storybook-colors',
    format({ dictionary }) {
      const groupsMap = new Map();

      const ensureGroup = (groupId) => {
        if (!groupsMap.has(groupId)) {
          const defaultGroup = DEFAULT_GROUPS.find((group) => group.id === groupId);
          const index = defaultGroup ? DEFAULT_GROUPS.indexOf(defaultGroup) : undefined;
          groupsMap.set(groupId, {
            id: groupId,
            title: defaultGroup?.title ?? `Color ${toTitleCase(groupId)}`,
            sortKey: typeof index === 'number' ? `0-${index.toString().padStart(2, '0')}` : `1-${groupId}`,
            tokens: []
          });
        }

        return groupsMap.get(groupId);
      };

      dictionary.allTokens
        .filter((token) => token?.path?.[0] === 'eui' && token?.path?.[1] === 'color')
        .forEach((token) => {
          const groupId = token.path[2] || 'color';
          const group = ensureGroup(groupId);
          const detailSegments = token.path.slice(3);
          const labelSegments = detailSegments.length > 0 ? detailSegments : token.path.slice(1);
          const tokenId = slugFromSegments(labelSegments);

          group.tokens.push({
            id: tokenId,
            label: formatLabel(labelSegments),
            path: token.path.join('.'),
            cssVar: `--${token.name}`,
            value: token.$value ?? token.value ?? token.original?.value ?? ''
          });
        });

      const groups = Array.from(groupsMap.values())
        .sort((a, b) => (a.sortKey || a.id).localeCompare(b.sortKey || b.id))
        .map((group) => ({
          id: group.id,
          title: group.title,
          tokens: group.tokens.sort((a, b) => a.path.localeCompare(b.path))
        }));

      return JSON.stringify({ groups }, null, 2);
    }
  });
};
