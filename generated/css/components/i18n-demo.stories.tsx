import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import '../../src/i18n/config'; // Initialize i18n

// Minimal UI components for the demo (simulating DS components)
const Button = ({ children, onClick, ...props }: any) => (
  <button
    onClick={onClick}
    style={{ padding: '8px 16px', cursor: 'pointer', marginRight: 8 }}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children }: any) => (
  <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8, maxWidth: 400 }}>
    {children}
  </div>
);

const I18nDemo = () => {
  const { t, i18n } = useTranslation();
  const [itemName, setItemName] = useState('Project X');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Language Switcher */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <strong>Current Locale:</strong> {i18n.language}
        <div style={{ marginLeft: 16 }}>
          <Button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>
            English
          </Button>
          <Button onClick={() => changeLanguage('de')} disabled={i18n.language === 'de'}>
            Deutsch
          </Button>
        </div>
      </div>

      <hr style={{ width: '100%' }} />

      {/* Vertical Slice Demo */}
      <Card>
        <h3 style={{ marginTop: 0 }}>{t('labels.settings')}</h3>
        
        <p>
          <strong>{t('labels.status')}:</strong> {t('messages.loading')}
        </p>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Button>{t('actions.save')}</Button>
          <Button>{t('actions.cancel')}</Button>
        </div>

        <p style={{ marginTop: 16, fontStyle: 'italic', color: '#666' }}>
          {/* Interpolation Example */}
          {t('a11y.removeItem', { name: itemName })}
        </p>
      </Card>
    </div>
  );
};

const meta: Meta = {
  title: 'Architecture/i18n/Demo',
  component: I18nDemo,
};

export default meta;

export const VerticalSlice: StoryObj = {};