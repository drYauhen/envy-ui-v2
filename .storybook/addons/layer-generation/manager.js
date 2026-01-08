// Storybook v10 addon - simplified toolbar button
import React from 'react';
import { addons, types } from 'storybook/manager-api';
import { IconButton } from 'storybook/components';

const ADDON_ID = 'layer-generation-addon';
const TOOL_ID = `${ADDON_ID}/tool`;

addons.register(ADDON_ID, (api) => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Layer Generation',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => (
      <IconButton
        key={TOOL_ID}
        title="Layer Generation: npm run layers:generate"
        onClick={() => {
          alert('Layer Generation Commands:\n\n• npm run layers:list\n• npm run layers:generate\n• npm run layers:help\n\nSee: Docs → Workflows → Layer Generation Workflow');
        }}
      >
        <span style={{ fontSize: '14px' }}>🛠️</span>
      </IconButton>
    ),
  });
});
