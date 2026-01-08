import React from 'react';
import { addons, types, useGlobals } from 'storybook/manager-api';
import { IconButton, WithTooltip } from 'storybook/internal/components';
import '../../../src/ui/icons/_icons.css';

const ADDON_ID = 'envy-ui/context-theme-switcher';
const TOOL_ID = `${ADDON_ID}/tool`;

const THEME_OPTIONS = {
  app: [
    { value: 'default', label: 'Default' },
    { value: 'accessibility', label: 'Accessibility' }
  ],
  website: [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Dark' },
    { value: 'toy-r-us', label: 'Toy-R-Us' }
  ],
  report: [
    { value: 'print', label: 'Print' },
    { value: 'screen', label: 'Screen' }
  ]
};

const FOCUS_OPTIONS = [
  { value: 'derived', label: 'Derived' },
  { value: 'system', label: 'System' }
];

const menuStyle = {
  display: 'grid',
  gap: '8px',
  minWidth: '240px',
  padding: '10px 12px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)'
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

const dividerStyle = {
  gridColumn: '1 / -1',
  height: '1px',
  backgroundColor: '#e2e8f0',
  margin: '2px 0'
};

function ContextThemeSwitcher() {
  const [globals, updateGlobals] = useGlobals();
  const appTheme = globals.appTheme || 'default';
  const websiteTheme = globals.websiteTheme || 'default';
  const reportTheme = globals.reportTheme || 'print';
  const focusPolicy = globals.focusPolicy || 'derived';
  const [isOpen, setIsOpen] = React.useState(false);

  const updateGlobal = React.useCallback((key, value) => {
    updateGlobals({ [key]: value });
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
          {renderRow('App', appTheme, THEME_OPTIONS.app, (value) => updateGlobal('appTheme', value))}
          {renderRow('Website', websiteTheme, THEME_OPTIONS.website, (value) => updateGlobal('websiteTheme', value))}
          {renderRow('Report', reportTheme, THEME_OPTIONS.report, (value) => updateGlobal('reportTheme', value))}
          <div style={dividerStyle} />
          {renderRow('Focus', focusPolicy, FOCUS_OPTIONS, (value) => updateGlobal('focusPolicy', value))}
          <div style={dividerStyle} />
          <div style={{ ...rowStyle, gridTemplateColumns: '1fr', justifyContent: 'center' }}>
            <button
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'center'
              }}
              onClick={() => {
                alert('Layer Generation Commands:\n\n• npm run layers:list\n• npm run layers:generate\n• npm run layers:help\n\nSee: Docs → Workflows → Layer Generation Workflow');
              }}
              title="Layer Generation: Generate component layers from tokens"
            >
              🛠️ Generate Layers
            </button>
          </div>
        </div>
      )}
    >
      <IconButton title="Context themes & Layer generation" aria-label="Context themes" active={isOpen}>
        <span
          aria-hidden="true"
          data-eui-icon="envisio-logo"
          style={{ fontSize: '14px' }}
        />
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
