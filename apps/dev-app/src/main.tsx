import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import design tokens first
import '@generated/css/tokens.css';

// Import Tailwind utilities
import '@packages/tailwind/tailwind.css';

// Import focus policy
import '@src/ui/focus-policy.css';

// Import component CSS
import '@src/ui/label.css';
import '@src/ui/button.css';
import '@src/ui/card.css';
import '@src/ui/checkbox.css';
import '@src/ui/switch.css';
import '@src/ui/input.css';
import '@src/ui/input-group.css';
import '@src/ui/textarea.css';
import '@src/ui/select.css';
import '@src/ui/alert-banner.css';
import '@src/ui/avatar.css';
import '@src/ui/avatar-group.css';
import '@src/ui/counter.css';
import '@src/ui/related-group.css';
import '@src/ui/skeleton.css';
import '@src/ui/celebration.css';
import '@src/ui/modal.css';
import '@src/ui/app-shell.css';
import '@src/ui/sidebar.css';
import '@src/ui/header.css';
import '@src/ui/title-bar.css';
import '@src/ui/content.css';
import '@src/ui/detail-panel.css';
import '@src/ui/skip-link.css';
import '@src/ui/table.css';
import '@src/ui/logo.css';
import '@src/ui/side-nav.css';
import '@src/ui/scrollbar.css';
import '@src/ui/transition.css';
import '@src/ui/icons/_icons.css';

// Import app styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

