import type { Meta, StoryObj } from '@storybook/react';
import spacingTokens from '../../../../tokens/app/semantic/spacing.json';
import foundationDimensions from '../../../../tokens/app/foundations/dimension.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';
import { getSectionParameters } from '../../../../.storybook/preview';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(foundationDimensions, [], flatTokenMap);
flattenTokens(spacingTokens, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const spacingRefs = collectRefs((spacingTokens as any)?.eui?.spacing ?? {}, ['eui', 'spacing']);

const meta: Meta = {
  title: 'Tokens/App/Semantic/Spacing',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('Tokens/App/Semantic/Spacing'),
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  const value = resolveReference(token.ref) || token.ref;
  const numericValue = parseFloat(value);
  const unit = value.replace(/[\d.]/g, '');

  // Convert rem to pixels (app context base font size is 14px)
  const pixelValue = unit === 'rem' ? numericValue * 14 : numericValue;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{
        width: `${pixelValue}px`,
        height: '24px',
        background: 'var(--eui-color-brand-700, #066a8d)',
        borderRadius: '4px',
        minWidth: '4px'
      }} />
      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{value}</span>
    </div>
  );
};

export const Spacing: Story = {
  name: 'Spacing',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Semantic Spacing Tokens"
        description="Named spacing tokens (xs, sm, md, etc.) that reference foundation dimension tokens. These provide human-readable spacing values for consistent component spacing."
      />
      <TokenRefTable
        title="Spacing Scale"
        refs={spacingRefs}
        emptyMessage="No spacing tokens found."
        renderPreview={renderPreview}
        tokenLabel="Token path"
        referenceLabel="Value"
        showType
      />
    </TokenPage>
  )
};

