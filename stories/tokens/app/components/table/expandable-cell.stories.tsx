import type { Meta, StoryObj } from '@storybook/react';
import tableExpandableCell from '../../../../../tokens/app/components/table/expandable-cell.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(tableExpandableCell, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Use the entire component object from the JSON file
const tokenRefs = collectRefs((tableExpandableCell as any)?.eui?.['table'] ?? {}, ['eui', 'table']);

const meta: Meta = {
  title: 'Tokens/App/Components/Table/Expandable Cell',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Table/Expandable Cell'),
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

export const ExpandableCell: Story = {
  name: 'Expandable Cell',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Table Expandable Cell"
        description="Token definitions for table expandable-cell."
      />
      <TokenRefTable
        title="Expandable Cell"
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
