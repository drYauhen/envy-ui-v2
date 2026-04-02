import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { Button, Ellipsis } from '../../src/ui';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../utils/story-layout';
import '../i18n/config';

const meta: Meta = {
  title: 'Architecture/i18n/Demo'
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1.5rem',
  padding: '2rem',
  backgroundColor: 'var(--eui-color-background-surface)',
  color: 'var(--eui-color-text-primary)'
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: '0.75rem',
  alignItems: 'center'
};

const cardStyle = {
  maxWidth: 520,
  padding: '1.5rem'
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '0.5rem',
  maxWidth: 360
};

const helperTextStyle = {
  margin: 0,
  color: 'var(--eui-color-text-muted)',
  fontSize: '0.875rem'
};

const boundedStyle = {
  maxWidth: 260,
  padding: '0.5rem 0.75rem',
  borderRadius: '0.5rem',
  border: '1px dashed var(--eui-color-border-muted)'
};

const I18nDemo = () => {
  const { t, i18n } = useTranslation();
  const [itemName, setItemName] = React.useState('Project X');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div style={containerStyle}>
          <StoryStack>
            <StorySection title="Locale Switcher">
              <div style={rowStyle}>
                <strong>Current locale:</strong>
                <span>{i18n.language}</span>
                <Button
                  intent="secondary"
                  size="sm"
                  isDisabled={i18n.language === 'en'}
                  onPress={() => changeLanguage('en')}
                >
                  English
                </Button>
                <Button
                  intent="secondary"
                  size="sm"
                  isDisabled={i18n.language === 'de'}
                  onPress={() => changeLanguage('de')}
                >
                  Deutsch
                </Button>
              </div>
            </StorySection>

            <StorySection title="Resolved Strings in UI">
              <div className="eui-card" data-eui-variant="flat" style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>{t('labels.settings')}</h3>
                <p style={helperTextStyle}>
                  <strong>{t('labels.status')}:</strong> {t('messages.loading')}
                </p>
                <div style={rowStyle}>
                  <Button intent="primary">{t('actions.save')}</Button>
                  <Button intent="secondary">{t('actions.cancel')}</Button>
                </div>
              </div>
            </StorySection>

            <StorySection title="Interpolation & Dynamic Values">
              <div style={fieldStyle}>
                <label className="eui-label" htmlFor="i18n-item-name">
                  {t('labels.name')}
                </label>
                <input
                  id="i18n-item-name"
                  className="eui-input"
                  data-eui-size="md"
                  value={itemName}
                  onChange={(event) => setItemName(event.target.value)}
                />
                <p style={helperTextStyle}>{t('a11y.removeItem', { name: itemName })}</p>
              </div>
            </StorySection>

            <StorySection title="Truncation + i18n">
              <p style={helperTextStyle}>
                Translations are resolved in the app layer, then passed into DS components like Ellipsis.
              </p>
              <div style={boundedStyle}>
                <Ellipsis>{t('actions.saveChanges')}</Ellipsis>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  );
};

export const VerticalSlice: Story = {
  name: 'Vertical Slice',
  render: () => <I18nDemo />
};
