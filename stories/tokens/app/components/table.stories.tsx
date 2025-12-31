import type { Meta, StoryObj } from '@storybook/react';
import tableBorder from '../../../../tokens/app/components/table/border.json';
import tableColors from '../../../../tokens/app/components/table/colors.json';
import tableExpandableCell from '../../../../tokens/app/components/table/expandable-cell.json';
import tableFolder from '../../../../tokens/app/components/table/folder.json';
import tableSpacing from '../../../../tokens/app/components/table/spacing.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(tableBorder, [], flatTokenMap);
flattenTokens(tableColors, [], flatTokenMap);
flattenTokens(tableExpandableCell, [], flatTokenMap);
flattenTokens(tableFolder, [], flatTokenMap);
flattenTokens(tableSpacing, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((tableBorder as any)?.eui?.table ?? {}, ['eui', 'table']),
  ...collectRefs((tableColors as any)?.eui?.table ?? {}, ['eui', 'table']),
  ...collectRefs((tableExpandableCell as any)?.eui?.table ?? {}, ['eui', 'table']),
  ...collectRefs((tableFolder as any)?.eui?.table ?? {}, ['eui', 'table']),
  ...collectRefs((tableSpacing as any)?.eui?.table ?? {}, ['eui', 'table']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Table',
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

export const Table: Story = {
  name: 'Table',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Table Component Tokens"
        description="Token definitions for table component."
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
