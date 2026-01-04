import React from 'react';
import { addons, types, useGlobals } from 'storybook/manager-api';
import { IconButton, WithTooltip } from 'storybook/internal/components';

const ADDON_ID = 'envy-ui/context-theme-switcher';
const TOOL_ID = `${ADDON_ID}/tool`;

const THEME_OPTIONS = {
  app: [
    { value: 'default', label: 'Default' },
    { value: 'accessibility', label: 'Accessibility' }
  ],
  website: [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Dark' }
  ],
  report: [
    { value: 'print', label: 'Print' },
    { value: 'screen', label: 'Screen' }
  ]
};

const menuStyle = {
  display: 'grid',
  gap: '8px',
  minWidth: '240px',
  padding: '10px 12px'
};

const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '80px 1fr',
  alignItems: 'center',
  columnGap: '8px'
};

const labelStyle = {
  fontSize: '12px',
  fontWeight: 600
};

const selectStyle = {
  fontSize: '12px',
  padding: '4px 6px',
  borderRadius: '4px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#ffffff',
  minWidth: '140px'
};

function ContextThemeSwitcher() {
  const [globals, updateGlobals] = useGlobals();
  const appTheme = globals.appTheme || 'default';
  const websiteTheme = globals.websiteTheme || 'default';
  const reportTheme = globals.reportTheme || 'print';
  const [isOpen, setIsOpen] = React.useState(false);

  const updateTheme = React.useCallback((key, value) => {
    updateGlobals({ [`${key}Theme`]: value });
  }, [updateGlobals]);

  const renderRow = (label, value, options, onChange) => (
    <div style={rowStyle}>
      <span style={labelStyle}>{label}</span>
      <select
        style={selectStyle}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <WithTooltip
      trigger="click"
      placement="bottom"
      closeOnOutsideClick
      interactive
      onVisibleChange={setIsOpen}
      tooltip={(
        <div style={menuStyle}>
          {renderRow('App', appTheme, THEME_OPTIONS.app, (value) => updateTheme('app', value))}
          {renderRow('Website', websiteTheme, THEME_OPTIONS.website, (value) => updateTheme('website', value))}
          {renderRow('Report', reportTheme, THEME_OPTIONS.report, (value) => updateTheme('report', value))}
        </div>
      )}
    >
      <IconButton title="Context themes" aria-label="Context themes" active={isOpen}>
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 16 16"
          width="14"
          height="14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M2 4h12M2 8h12M2 12h12" fill="none" />
        </svg>
      </IconButton>
    </WithTooltip>
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Context themes',
    render: () => <ContextThemeSwitcher />
  });
});
