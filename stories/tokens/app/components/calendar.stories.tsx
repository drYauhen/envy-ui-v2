import type { Meta, StoryObj } from '@storybook/react';
import calendarBorder from '../../../../tokens/app/components/calendar/border.json';
import calendarColors from '../../../../tokens/app/components/calendar/colors.json';
import calendarSize from '../../../../tokens/app/components/calendar/size.json';
import calendarSpacing from '../../../../tokens/app/components/calendar/spacing.json';
import calendarTypography from '../../../../tokens/app/components/calendar/typography.json';
import { TokenPage, TokenSection } from '../../viewers/tokens/TokenLayout';
import { TokenRefTable } from '../../viewers/tokens/TokenRefTable';
import { TokenSwatch } from '../../viewers/tokens/TokenSwatch';
import { collectRefs, flattenTokens, resolveAlias, type FlatToken, type TokenRef } from '../../viewers/tokens/token-utils';

type Story = StoryObj;

const flatTokenMap: Record<string, FlatToken> = {};
flattenTokens(calendarBorder, [], flatTokenMap);
flattenTokens(calendarColors, [], flatTokenMap);
flattenTokens(calendarSize, [], flatTokenMap);
flattenTokens(calendarSpacing, [], flatTokenMap);
flattenTokens(calendarTypography, [], flatTokenMap);

const resolveReference = (ref: string) => resolveAlias(ref, flatTokenMap);

const allRefs: TokenRef[] = [
  ...collectRefs((calendarBorder as any)?.eui?.calendar ?? {}, ['eui', 'calendar']),
  ...collectRefs((calendarColors as any)?.eui?.calendar ?? {}, ['eui', 'calendar']),
  ...collectRefs((calendarSize as any)?.eui?.calendar ?? {}, ['eui', 'calendar']),
  ...collectRefs((calendarSpacing as any)?.eui?.calendar ?? {}, ['eui', 'calendar']),
  ...collectRefs((calendarTypography as any)?.eui?.calendar ?? {}, ['eui', 'calendar']),
];

const meta: Meta = {
  title: 'Tokens/App/Components/Calendar',
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

export const Calendar: Story = {
  name: 'Calendar',
  render: () => (
    <TokenPage>
      <TokenSection
        title="Calendar Component Tokens"
        description="Token definitions for calendar component."
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
