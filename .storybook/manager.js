import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandUrl: '/',
    brandImage: '/assets/logo/full-color.svg',
  },
});

// Import section badges addon
// The addon is registered in ./addons/section-badges/register.js
import './addons/section-badges/register.js';

