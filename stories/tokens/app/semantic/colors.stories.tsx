import type { Meta, StoryObj } from '@storybook/react';
import textTokens from '../../../../tokens/app/semantic/colors/text.json';
import backgroundTokens from '../../../../tokens/app/semantic/colors/background.json';
import borderTokens from '../../../../tokens/app/semantic/colors/border.json';
import focusTokens from '../../../../tokens/app/semantic/colors/focus.json';
import foundationBrand from '../../../../tokens/app/foundations/colors/brand.json';
import foundationNeutral from '../../../../tokens/app/foundations/colors/neutral.json';
import foundationAccent from '../../../../tokens/app/foundations/colors/accent.json';
import foundationSignal from '../../../../tokens/app/foundations/colors/signal.json';
import foundationStatus from '../../../../tokens/app/foundations/colors/status.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(foundationBrand, [], flatTokenMap);
flattenTokens(foundationNeutral, [], flatTokenMap);
flattenTokens(foundationAccent, [], flatTokenMap);
flattenTokens(foundationSignal, [], flatTokenMap);
flattenTokens(foundationStatus, [], flatTokenMap);
flattenTokens(textTokens, [], flatTokenMap);
flattenTokens(backgroundTokens, [], flatTokenMap);
flattenTokens(borderTokens, [], flatTokenMap);
flattenTokens(focusTokens, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const categories: { id: string; label: string; refs: TokenRef[] }[] = [
  { id: 'text', label: 'Text', refs: collectRefs((textTokens as any)?.ui?.color?.text ?? {}, ['ui', 'color', 'text']) },
  {
    id: 'background',
    label: 'Background',
    refs: collectRefs((backgroundTokens as any)?.ui?.color ?? {}, ['ui', 'color'])
  },
  { id: 'border', label: 'Border', refs: collectRefs((borderTokens as any)?.ui?.color?.border ?? {}, ['ui', 'color', 'border']) },
  { id: 'focus', label: 'Focus', refs: collectRefs((focusTokens as any)?.ui?.color ?? {}, ['ui', 'color']) }
];

const getRefs = (id: string) => categories.find((category) => category.id === id)?.refs ?? [];

const meta: Meta = {
  title: 'Tokens/App/Semantic/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => (
  <TokenSwatch reference={token.ref} resolveReference={resolveReference} />
);

export const Text: Story = {
  name: 'Text',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Semantic Text Colors"
        description="Projection of tokens/semantic/colors/text.json. Values resolve through foundations."
      />
      <TokenRefTable
        title="Text"
        refs={getRefs('text')}
        emptyMessage="No tokens found for this category."
        renderPreview={renderPreview}
      />
    </TokenPage>
  )
};

export const Background: Story = {
  name: 'Background',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Semantic Background Colors"
        description="Projection of tokens/semantic/colors/background.json (includes brand.primary alias)."
      />
      <TokenRefTable
        title="Background"
        refs={getRefs('background')}
        emptyMessage="No tokens found for this category."
        renderPreview={renderPreview}
      />
    </TokenPage>
  )
};

export const Border: Story = {
  name: 'Border',
  render: () => (
    <TokenPage>
      <TokenSection title="Semantic Border Colors" description="Projection of tokens/semantic/colors/border.json." />
      <TokenRefTable
        title="Border"
        refs={getRefs('border')}
        emptyMessage="No tokens found for this category."
        renderPreview={renderPreview}
      />
    </TokenPage>
  )
};

export const Focus: Story = {
  name: 'Focus',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Semantic Focus Colors"
        description="Projection of tokens/semantic/colors/focus.json including system compatibility alias."
      />
      <TokenRefTable
        title="Focus"
        refs={getRefs('focus')}
        emptyMessage="No tokens found for this category."
        renderPreview={renderPreview}
      />
    </TokenPage>
  )
};
