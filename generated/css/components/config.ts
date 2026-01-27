import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import de from '../locales/de.json';

// Initialize i18next
// In a real app, you might use a backend plugin to load JSONs asynchronously
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already safes from XSS
      // Configure interpolation to match the requested format: {name} instead of {{name}}
      prefix: '{',
      suffix: '}',
    },
    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;