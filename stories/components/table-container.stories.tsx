import type { Meta, StoryObj } from '@storybook/react';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../utils/story-layout';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/TableContainer',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('HTML + CSS/Components/TableContainer'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  }
};

export default meta;

type Story = StoryObj;

export const TableContainer: Story = {
  name: 'Table Container',
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div className="eui-container" data-eui-container="standard">
          <StoryStack>
            <StorySection title="Overflow">
              <div className="eui-table-container" style={{ maxWidth: '360px' }}>
                <table className="eui-table">
                  <thead>
                    <tr>
                      <th>Token</th>
                      <th>Value</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>--eui-spacing-xl</td>
                      <td>32px</td>
                      <td>Large spacing value for padding.</td>
                    </tr>
                    <tr>
                      <td>--eui-radius-default</td>
                      <td>8px</td>
                      <td>Default rounding for cards and panels.</td>
                    </tr>
                    <tr>
                      <td>--eui-color-text-primary</td>
                      <td>#0f172a</td>
                      <td>Primary text color for App context.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
