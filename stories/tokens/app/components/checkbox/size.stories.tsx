import type { Meta, StoryObj } from '@storybook/react';
import checkboxSize from '../../../../../tokens/app/components/checkbox/size.json';
import { TokenPage, TokenSection } from '../../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(checkboxSize, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

// Используем весь объект компонента из JSON файла
const tokenRefs = collectRefs((checkboxSize as any)?.eui?.['checkbox'] ?? {}, ['eui', 'checkbox']);

const meta: Meta = {
  title: 'Tokens/App/Components/Checkbox/Size',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Components/Checkbox/Size'),
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

export const Size: Story = {
  name: 'Size',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Checkbox Size"
        description="Token definitions for checkbox size."
      />
      <TokenRefTable
        title="Size"
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
