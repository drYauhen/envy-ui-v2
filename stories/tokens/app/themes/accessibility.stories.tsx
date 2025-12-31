import type { Meta, StoryObj } from '@storybook/react';
import accessibilityTheme from '../../../../tokens/app/themes/accessibility.json';
import { TokenPage, TokenSection } from '../../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../../viewers/tokens/token-utils';
import foundationNeutral from '../../../../tokens/app/foundations/colors/neutral.json';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(foundationNeutral, [], flatTokenMap);
flattenTokens(accessibilityTheme, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = collectRefs((accessibilityTheme as any)?.eui ?? {}, ['eui']);

const colorRefs = allRefs.filter(r => r.path.includes('color'));
const typographyRefs = allRefs.filter(r => r.path.includes('typography'));
const shapeRefs = allRefs.filter(r => r.path.includes('radius'));

const meta: Meta = {
  title: 'Tokens/App/Themes/Accessibility',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

const renderPreview = (token: TokenRef) => {
  if (token.path.includes('color')) {
    return <TokenSwatch reference={token.ref} resolveReference={resolveReference} />;
  }
  return null;
};

export const Accessibility: Story = {
  name: 'Accessibility',
  render: () => (
    <TokenPage>
      <TokenSection
        title="App Context - Accessibility Theme"
        description="Accessibility theme tokens for app context. These tokens provide enhanced contrast and larger font sizes for improved accessibility compliance."
      />
      {colorRefs.length > 0 && (
        <TokenRefTable
          title="Colors"
          refs={colorRefs}
          emptyMessage="No color tokens found."
          renderPreview={renderPreview}
          tokenLabel="Token path"
          referenceLabel="Reference"
          showType
        />
      )}
      {typographyRefs.length > 0 && (
        <TokenRefTable
          title="Typography"
          refs={typographyRefs}
          emptyMessage="No typography tokens found."
          renderPreview={renderPreview}
          tokenLabel="Token path"
          referenceLabel="Reference"
          showType
        />
      )}
      {shapeRefs.length > 0 && (
        <TokenRefTable
          title="Shape"
          refs={shapeRefs}
          emptyMessage="No shape tokens found."
          renderPreview={renderPreview}
          tokenLabel="Token path"
          referenceLabel="Reference"
          showType
        />
      )}
      {allRefs.length === 0 && (
        <TokenSection
          title="No Theme Tokens"
          description="This theme file is currently empty or contains no token definitions."
        />
      )}
    </TokenPage>
  )
};

