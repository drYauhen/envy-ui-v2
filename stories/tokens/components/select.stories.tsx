import type { Meta, StoryObj } from '@storybook/react';
import selectColors from '../../../tokens/components/select/colors.json';
import selectDropdown from '../../../tokens/components/select/dropdown.json';
import selectPrimitive from '../../../tokens/components/select/primitive.json';
import semanticColors from '../../../tokens/semantic/colors/text.json';
import semanticShape from '../../../tokens/semantic/shape.json';
import semanticShadow from '../../../tokens/semantic/shadow.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(semanticColors, [], flatTokenMap);
flattenTokens(semanticShape, [], flatTokenMap);
flattenTokens(semanticShadow, [], flatTokenMap);
flattenTokens(selectColors, [], flatTokenMap);
flattenTokens(selectDropdown, [], flatTokenMap);
flattenTokens(selectPrimitive, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((selectColors as any)?.eui?.select ?? {}, ['eui', 'select']),
  ...collectRefs((selectDropdown as any)?.eui?.select ?? {}, ['eui', 'select']),
  ...collectRefs((selectPrimitive as any)?.eui?.select ?? {}, ['eui', 'select'])
];

const byCategory = (category: string) => allRefs.filter((token) => token.path.includes(category));

const colorRefs = byCategory('background').concat(byCategory('border')).concat(byCategory('color'));
const dropdownRefs = byCategory('dropdown');
const primitiveRefs = byCategory('primitive');

const meta: Meta = {
  title: 'Tokens/Components/Select',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  if (token.path.includes('background') || token.path.includes('border') || token.path.includes('color')) {
    return <TokenSwatch reference={token.ref} resolveReference={resolveReference} />;
  }
  return null;
};

export const Select: Story = {
  name: 'Select',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Select Component Tokens"
        description="Token definitions for Select component including colors, dropdown, and primitive tokens."
      />

      <TokenRefTable
        title="Colors"
        refs={colorRefs}
        emptyMessage="No color tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />

      <TokenRefTable
        title="Dropdown"
        refs={dropdownRefs}
        emptyMessage="No dropdown tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />

      <TokenRefTable
        title="Primitive"
        refs={primitiveRefs}
        emptyMessage="No primitive tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};

