import type { Meta, StoryObj } from '@storybook/react';
import { MultiContextViewer } from '../utils/multi-context-viewer';
import { StorySection, StoryStack } from '../utils/story-layout';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Docs/Doc Shell',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

export const DocShellP0: Story = {
  name: 'Doc Shell P0',
  parameters: {
    ...getSectionParameters('HTML + CSS/Docs/Doc Shell'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <MultiContextViewer contexts={[{ context: 'app' }]}>
      {() => (
        <div className="eui-container eui-docs" data-eui-container="standard">
          <StoryStack>
            <StorySection title="Layout Primitives">
              <div className="eui-stack" data-eui-gap="md">
                <div className="eui-section">
                  <div className="eui-section__title eui-text-title-md">Section Header</div>
                  <div className="eui-section__content">
                    <div className="eui-grid" data-eui-cols="2">
                      <div className="eui-card" data-eui-variant="flat">
                        <div className="eui-docs-content">
                          <p className="eui-text-body">Container + section + card</p>
                        </div>
                      </div>
                      <div className="eui-card" data-eui-variant="flat">
                        <div className="eui-docs-content">
                          <p className="eui-text-body">Grid column</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="eui-divider" data-eui-variant="subtle" />
                <div className="eui-inline" data-eui-gap="sm" data-eui-wrap="true">
                  <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="neutral">Badge</span>
                  <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="info">Info</span>
                  <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="success">Success</span>
                </div>
              </div>
            </StorySection>

            <StorySection title="Markdown Structure">
              <div className="eui-card" data-eui-variant="elevated">
                <div className="eui-docs-content">
                  <h1 className="eui-text-heading-5">Documentation Shell</h1>
                  <p className="eui-text-body">
                    This block uses <code className="eui-text-code-base eui-docs-code-inline">eui-docs-content</code>{' '}
                    and semantic text styles.
                  </p>
                  <h2 className="eui-text-heading-6">Lists</h2>
                  <ul>
                    <li className="eui-text-body">Ordered content uses list spacing tokens.</li>
                    <li className="eui-text-body">Inline code uses Envy UI typography tokens.</li>
                  </ul>
                  <h3 className="eui-text-title-md">Table</h3>
                  <div className="eui-docs-table-wrap">
                    <table className="eui-docs-table">
                      <thead>
                        <tr>
                          <th className="eui-text-body-sm">Token</th>
                          <th className="eui-text-body-sm">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="eui-text-body-sm">--eui-spacing-md</td>
                          <td className="eui-text-body-sm">16px</td>
                        </tr>
                        <tr>
                          <td className="eui-text-body-sm">--eui-color-text-primary</td>
                          <td className="eui-text-body-sm">Primary text</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <blockquote className="eui-docs-callout eui-text-body-sm">
                    Callouts use status tokens and inherit typography from the docs shell.
                  </blockquote>
                  <pre className="eui-docs-pre">
                    <code className="eui-text-code-base eui-docs-code-block">
                      {`<div class="eui-docs-content">\n  <h1 class="eui-text-heading-5">Doc Shell</h1>\n</div>`}
                    </code>
                  </pre>
                </div>
              </div>
            </StorySection>
          </StoryStack>
        </div>
      )}
    </MultiContextViewer>
  )
};
