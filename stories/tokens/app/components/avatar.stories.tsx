import type { Meta, StoryObj } from '@storybook/react';
import avatarColors from '../../../../tokens/app/components/avatar/colors.json';
import avatarSize from '../../../../tokens/app/components/avatar/size.json';
import avatarShape from '../../../../tokens/app/components/avatar/shape.json';
import avatarBorder from '../../../../tokens/app/components/avatar/border.json';
import avatarTypography from '../../../../tokens/app/components/avatar/typography.json';
import semanticColors from '../../../../tokens/app/semantic/colors/background.json';
import foundationNeutral from '../../../../tokens/app/foundations/colors/neutral.json';
import foundationTextTransform from '../../../../tokens/app/foundations/typography/text-transform.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(semanticColors, [], flatTokenMap);
flattenTokens(foundationNeutral, [], flatTokenMap);
flattenTokens(foundationTextTransform, [], flatTokenMap);
flattenTokens(avatarColors, [], flatTokenMap);
flattenTokens(avatarSize, [], flatTokenMap);
flattenTokens(avatarShape, [], flatTokenMap);
flattenTokens(avatarBorder, [], flatTokenMap);
flattenTokens(avatarTypography, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((avatarColors as any)?.eui?.avatar ?? {}, ['eui', 'avatar']),
  ...collectRefs((avatarSize as any)?.eui?.avatar ?? {}, ['eui', 'avatar']),
  ...collectRefs((avatarShape as any)?.eui?.avatar ?? {}, ['eui', 'avatar']),
  ...collectRefs((avatarBorder as any)?.eui?.avatar ?? {}, ['eui', 'avatar']),
  ...collectRefs((avatarTypography as any)?.eui?.avatar ?? {}, ['eui', 'avatar'])
];

const byCategory = (category: string) => allRefs.filter((token) => token.path.includes(category));

const colorRefs = byCategory('background').concat(byCategory('text'));
const sizeRefs = byCategory('size');
const shapeRefs = byCategory('shape');
const borderRefs = byCategory('border');
const typographyRefs = byCategory('typography');

const meta: Meta = {
  title: 'Tokens/App/Components/Avatar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  if (token.path.includes('background') || token.path.includes('text') || token.path.includes('border')) {
    return <TokenSwatch reference={token.ref} resolveReference={resolveReference} />;
  }
  if (token.path.includes('textTransform') || token.type === 'textTransform') {
    const value = resolveReference(token.ref) || token.ref;
    return (
      <span style={{ 
        fontSize: '0.875rem', 
        color: '#64748b',
        fontFamily: 'monospace',
        textTransform: value === 'uppercase' ? 'uppercase' : value === 'lowercase' ? 'lowercase' : value === 'capitalize' ? 'capitalize' : 'none'
      }}>
        {value}
      </span>
    );
  }
  return null;
};

export const Avatar: Story = {
  name: 'Avatar',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Avatar Component Tokens"
        description="Token definitions for Avatar component including colors, size, shape, border, and typography."
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
        title="Size"
        refs={sizeRefs}
        emptyMessage="No size tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />

      <TokenRefTable
        title="Shape"
        refs={shapeRefs}
        emptyMessage="No shape tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />

      <TokenRefTable
        title="Border"
        refs={borderRefs}
        emptyMessage="No border tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />

      <TokenRefTable
        title="Typography"
        refs={typographyRefs}
        emptyMessage="No typography tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Reference"
        showType
      />
    </TokenPage>
  )
};

