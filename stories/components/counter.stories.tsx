import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const meta: Meta = {
  title: 'HTML + CSS/Components/Counter',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem'
} as const;

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
} as const;

const sectionTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#0f172a'
} as const;

const rowStyle = {
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap',
  alignItems: 'center'
} as const;

// Code panel styles for expandable code sections
const codePanelStyle: React.CSSProperties = {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  background: '#f8fafc',
  color: '#0f172a',
  marginTop: '1.5rem'
};

const summaryStyle: React.CSSProperties = {
  cursor: 'pointer',
  fontWeight: 400,
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e2e8f0',
  background: '#f1f5f9',
  color: '#64748b',
  listStyle: 'none'
};

const codeWrapStyle: React.CSSProperties = {
  padding: '0.75rem 1rem 1rem',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: '0.78rem',
  lineHeight: 1.6,
  margin: 0,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowX: 'hidden'
};

// Helper function to get initials from name
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const Variants: Story = {
  name: 'Variants',
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Counter Variants</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Counter has two main variants: text (simple text) and pill (rounded badge with background).
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Text Variant</h4>
          <div style={rowStyle}>
            <div className="eui-counter" data-eui-variant="text">+5</div>
            <div className="eui-counter" data-eui-variant="text">12</div>
            <div className="eui-counter" data-eui-variant="text">99+</div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Pill Variant</h4>
          <div style={rowStyle}>
            <div className="eui-counter" data-eui-variant="pill">5</div>
            <div className="eui-counter" data-eui-variant="pill">12</div>
            <div className="eui-counter" data-eui-variant="pill">99+</div>
          </div>
        </div>
      </div>
    </div>
  )
};

const inButtonsCode = `<button class="eui-button" data-eui-intent="primary" data-eui-size="md">
  Show All
  <span class="eui-counter" data-eui-variant="pill">35</span>
</button>

<button class="eui-button" data-eui-intent="secondary" data-eui-size="md">
  Messages
  <span class="eui-counter" data-eui-variant="pill">12</span>
</button>

<button class="eui-button" data-eui-intent="accent" data-eui-size="md">
  Items
  <span class="eui-counter" data-eui-variant="pill">8</span>
</button>

<!-- Disabled buttons -->
<button class="eui-button" data-eui-intent="primary" data-eui-size="md" disabled>
  Show All
  <span class="eui-counter" data-eui-variant="pill">35</span>
</button>`;

export const InButtons: Story = {
  name: 'In Buttons',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Counter in Buttons</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Counter adapts its colors based on button intent. Hover over buttons to see Counter highlight.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Primary Button</h4>
          <div style={rowStyle}>
            <button className="eui-button" data-eui-intent="primary" data-eui-size="md">
              Show All
              <span className="eui-counter" data-eui-variant="pill">35</span>
            </button>
            <button className="eui-button" data-eui-intent="primary" data-eui-size="md">
              Messages
              <span className="eui-counter" data-eui-variant="pill">12</span>
            </button>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Secondary Button</h4>
          <div style={rowStyle}>
            <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">
              Show All
              <span className="eui-counter" data-eui-variant="pill">35</span>
            </button>
            <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">
              Messages
              <span className="eui-counter" data-eui-variant="pill">12</span>
            </button>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Accent Button</h4>
          <div style={rowStyle}>
            <button className="eui-button" data-eui-intent="accent" data-eui-size="md">
              Show All
              <span className="eui-counter" data-eui-variant="pill">35</span>
            </button>
            <button className="eui-button" data-eui-intent="accent" data-eui-size="md">
              Messages
              <span className="eui-counter" data-eui-variant="pill">12</span>
            </button>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Disabled Buttons</h4>
          <div style={rowStyle}>
            <button className="eui-button" data-eui-intent="primary" data-eui-size="md" disabled>
              Show All
              <span className="eui-counter" data-eui-variant="pill">35</span>
            </button>
            <button className="eui-button" data-eui-intent="secondary" data-eui-size="md" disabled>
              Messages
              <span className="eui-counter" data-eui-variant="pill">12</span>
            </button>
            <button className="eui-button" data-eui-intent="accent" data-eui-size="md" disabled>
              Items
              <span className="eui-counter" data-eui-variant="pill">8</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Code Panel */}
      <details style={codePanelStyle} open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
        <summary style={summaryStyle}>Expand to inspect code</summary>
        <Highlight code={inButtonsCode} language="markup" theme={themes.vsLight}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, ...codeWrapStyle, background: 'transparent' }}>
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </details>
    </div>
    );
  }
};

export const WithAvatarGroups: Story = {
  name: 'With AvatarGroups',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Counter with AvatarGroups</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          <strong>Hover over AvatarGroups to see related Counter highlight!</strong> Counter uses text variant to match avatar styling.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Basic (Related via Wrapper)</h4>
          <div className="eui-related-group" data-eui-group-id="avatars-1" data-eui-relation-type="avatar">
            <div className="eui-avatar-group" data-eui-size="md">
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=1" alt="User 1" />
              </div>
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=2" alt="User 2" />
              </div>
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=3" alt="User 3" />
              </div>
            </div>
            <div className="eui-counter" data-eui-variant="text" data-eui-related="avatars-1">+5</div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>With More Avatars</h4>
          <div className="eui-related-group" data-eui-group-id="avatars-2" data-eui-relation-type="avatar">
            <div className="eui-avatar-group" data-eui-size="md">
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=10" alt="User 1" />
              </div>
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=11" alt="User 2" />
              </div>
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=12" alt="User 3" />
              </div>
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=13" alt="User 4" />
              </div>
            </div>
            <div className="eui-counter" data-eui-variant="text" data-eui-related="avatars-2">+12</div>
          </div>
        </div>
      </div>
      
      {/* Code Panel */}
      <details style={codePanelStyle} open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
        <summary style={summaryStyle}>Expand to inspect code</summary>
        <Highlight code={contextsCode} language="markup" theme={themes.vsLight}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, ...codeWrapStyle, background: 'transparent' }}>
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </details>
    </div>
    );
  }
};

const withAvatarGroupsCode = `<div class="eui-related-group" data-eui-group-id="avatars-1" data-eui-relation-type="avatar">
  <div class="eui-avatar-group" data-eui-size="md">
    <div class="eui-avatar" data-eui-size="md">
      <img src="..." alt="User 1" />
    </div>
    <div class="eui-avatar" data-eui-size="md">
      <img src="..." alt="User 2" />
    </div>
    <div class="eui-avatar" data-eui-size="md">
      <img src="..." alt="User 3" />
    </div>
  </div>
  <div class="eui-counter" data-eui-variant="text" data-eui-related="avatars-1">+5</div>
</div>`;

const withFilterCode = `<!-- Text variant with filter -->
<div class="eui-counter" data-eui-variant="text" data-eui-filtered="true">+5</div>

<!-- Pill variant with filter -->
<div class="eui-counter" data-eui-variant="pill" data-eui-filtered="true">35</div>

<!-- Filter variant (always shows icon) -->
<div class="eui-counter" data-eui-variant="filter">5</div>

<!-- With AvatarGroup (filtered) -->
<div class="eui-related-group" data-eui-group-id="avatars-filtered" data-eui-relation-type="filter">
  <div class="eui-avatar-group" data-eui-size="md">
    <!-- avatars... -->
  </div>
  <div class="eui-counter" data-eui-variant="filter" data-eui-related="avatars-filtered">5</div>
</div>`;

export const WithFilter: Story = {
  name: 'With Filter Indicator',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Counter with Filter Indicator</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Counter can show a filter icon (via <code>::before</code>) to indicate filtered/incomplete values. The number represents visible items, but there may be more filtered out.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Text Variant with Filter</h4>
          <div style={rowStyle}>
            <div className="eui-counter" data-eui-variant="text" data-eui-filtered="true">+5</div>
            <div className="eui-counter" data-eui-variant="text" data-eui-filtered="true">12</div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Pill Variant with Filter</h4>
          <div style={rowStyle}>
            <div className="eui-counter" data-eui-variant="pill" data-eui-filtered="true">5</div>
            <div className="eui-counter" data-eui-variant="pill" data-eui-filtered="true">35</div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Filter Variant (Always Shows Icon)</h4>
          <div style={rowStyle}>
            <div className="eui-counter" data-eui-variant="filter">5</div>
            <div className="eui-counter" data-eui-variant="filter">12</div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>With AvatarGroup (Filtered)</h4>
          <div className="eui-related-group" data-eui-group-id="avatars-filtered" data-eui-relation-type="filter">
            <div className="eui-avatar-group" data-eui-size="md">
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=20" alt="User 1" />
              </div>
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=21" alt="User 2" />
              </div>
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=22" alt="User 3" />
              </div>
            </div>
            <div className="eui-counter" data-eui-variant="filter" data-eui-related="avatars-filtered">5</div>
          </div>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
            <strong>Hover over AvatarGroup to see Counter highlight!</strong> Filter icon indicates that only 5 avatars are visible, but there may be more filtered out.
          </p>
        </div>
      </div>
      
      {/* Code Panel */}
      <details style={codePanelStyle} open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
        <summary style={summaryStyle}>Expand to inspect code</summary>
        <Highlight code={withFilterCode} language="markup" theme={themes.vsLight}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, ...codeWrapStyle, background: 'transparent' }}>
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </details>
    </div>
    );
  }
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Counter Sizes</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Counter supports three sizes: small, medium (default), and large.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Text Variant</h4>
          <div style={rowStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div className="eui-counter" data-eui-variant="text" data-eui-size="sm">+5</div>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Small</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div className="eui-counter" data-eui-variant="text" data-eui-size="md">+5</div>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Medium</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div className="eui-counter" data-eui-variant="text" data-eui-size="lg">+5</div>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Large</span>
            </div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Pill Variant</h4>
          <div style={rowStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div className="eui-counter" data-eui-variant="pill" data-eui-size="sm">5</div>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Small</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div className="eui-counter" data-eui-variant="pill" data-eui-size="md">5</div>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Medium</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div className="eui-counter" data-eui-variant="pill" data-eui-size="lg">5</div>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Large</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const contextsCode = `<button class="eui-button" data-eui-intent="primary" data-eui-size="md">
  Messages
  <span class="eui-counter" data-eui-variant="pill">5</span>
</button>

<div class="eui-related-group" data-eui-group-id="avatars-3" data-eui-relation-type="avatar">
  <div class="eui-avatar-group" data-eui-size="md">
    <!-- avatars... -->
  </div>
  <div class="eui-counter" data-eui-variant="text" data-eui-related="avatars-3">+5</div>
</div>`;

export const Contexts: Story = {
  name: 'All Contexts',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Counter in Different Contexts</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Counter adapts to different contexts and button intents. Colors automatically adjust based on parent context.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>In Primary Buttons</h4>
          <div style={rowStyle}>
            <button className="eui-button" data-eui-intent="primary" data-eui-size="md">
              Messages
              <span className="eui-counter" data-eui-variant="pill">5</span>
            </button>
            <button className="eui-button" data-eui-intent="primary" data-eui-size="md">
              Notifications
              <span className="eui-counter" data-eui-variant="pill">12</span>
            </button>
            <button className="eui-button" data-eui-intent="primary" data-eui-size="md">
              Items
              <span className="eui-counter" data-eui-variant="pill" data-eui-filtered="true">35</span>
            </button>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>In Secondary Buttons</h4>
          <div style={rowStyle}>
            <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">
              Messages
              <span className="eui-counter" data-eui-variant="pill">5</span>
            </button>
            <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">
              Notifications
              <span className="eui-counter" data-eui-variant="pill">12</span>
            </button>
            <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">
              Items
              <span className="eui-counter" data-eui-variant="pill" data-eui-filtered="true">35</span>
            </button>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>In Accent Buttons</h4>
          <div style={rowStyle}>
            <button className="eui-button" data-eui-intent="accent" data-eui-size="md">
              Messages
              <span className="eui-counter" data-eui-variant="pill">5</span>
            </button>
            <button className="eui-button" data-eui-intent="accent" data-eui-size="md">
              Notifications
              <span className="eui-counter" data-eui-variant="pill">12</span>
            </button>
            <button className="eui-button" data-eui-intent="accent" data-eui-size="md">
              Items
              <span className="eui-counter" data-eui-variant="pill" data-eui-filtered="true">35</span>
            </button>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>After AvatarGroups</h4>
          <div style={rowStyle}>
            <div className="eui-related-group" data-eui-group-id="avatars-3" data-eui-relation-type="avatar">
              <div className="eui-avatar-group" data-eui-size="md">
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=30" alt="User 1" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=31" alt="User 2" />
                </div>
              </div>
              <div className="eui-counter" data-eui-variant="text" data-eui-related="avatars-3">+5</div>
            </div>
            <div className="eui-related-group" data-eui-group-id="avatars-4" data-eui-relation-type="avatar">
              <div className="eui-avatar-group" data-eui-size="md">
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=32" alt="User 1" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=33" alt="User 2" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=34" alt="User 3" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=35" alt="User 4" />
                </div>
              </div>
              <div className="eui-counter" data-eui-variant="text" data-eui-filtered="true" data-eui-related="avatars-4">+12</div>
            </div>
          </div>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
            <strong>Hover over AvatarGroups to see Counter highlight!</strong>
          </p>
        </div>
      </div>
      
      {/* Code Panel */}
      <details style={codePanelStyle} open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
        <summary style={summaryStyle}>Expand to inspect code</summary>
        <Highlight code={contextsCode} language="markup" theme={themes.vsLight}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, ...codeWrapStyle, background: 'transparent' }}>
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </details>
    </div>
    );
  }
};

const complexExamplesCode = `<div class="eui-related-group" data-eui-group-id="avatars-row-1" data-eui-relation-type="avatar">
  <div class="eui-avatar-group" data-eui-size="md">
    <div class="eui-avatar" data-eui-size="md">
      <img src="https://i.pravatar.cc/150?img=40" alt="User 1" />
    </div>
    <div class="eui-avatar" data-eui-size="md">
      <img src="https://i.pravatar.cc/150?img=41" alt="User 2" />
    </div>
  </div>
  <div class="eui-counter" data-eui-variant="text" data-eui-related="avatars-row-1">+3</div>
</div>

<!-- Standalone Counter -->
<div class="eui-counter" data-eui-variant="pill">12</div>

<!-- Counter in Secondary Button -->
<button class="eui-button" data-eui-intent="secondary" data-eui-size="md">
  View All
  <span class="eui-counter" data-eui-variant="pill">35</span>
</button>

<!-- Counter in Primary Button with Filter -->
<button class="eui-button" data-eui-intent="primary" data-eui-size="md">
  Messages
  <span class="eui-counter" data-eui-variant="pill" data-eui-filtered="true">8</span>
</button>

<!-- Filtered AvatarGroup with Counter -->
<div class="eui-related-group" data-eui-group-id="avatars-filtered" data-eui-relation-type="filter">
  <div class="eui-avatar-group" data-eui-size="md">
    <div class="eui-avatar" data-eui-size="md">
      <img src="https://i.pravatar.cc/150?img=50" alt="User 1" />
    </div>
    <div class="eui-avatar" data-eui-size="md">
      <img src="https://i.pravatar.cc/150?img=51" alt="User 2" />
    </div>
    <div class="eui-avatar" data-eui-size="md">
      <img src="https://i.pravatar.cc/150?img=52" alt="User 3" />
    </div>
  </div>
  <div class="eui-counter" data-eui-variant="filter" data-eui-related="avatars-filtered">5</div>
</div>`;

export const ComplexExamples: Story = {
  name: 'Complex Examples',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Complex Real-World Examples</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Examples showing Counter in various contexts as it would appear in actual applications.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Row with Multiple Counters</h4>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="eui-related-group" data-eui-group-id="avatars-row-1" data-eui-relation-type="avatar">
              <div className="eui-avatar-group" data-eui-size="md">
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=40" alt="User 1" />
                </div>
                <div className="eui-avatar" data-eui-size="md">
                  <img src="https://i.pravatar.cc/150?img=41" alt="User 2" />
                </div>
              </div>
              <div className="eui-counter" data-eui-variant="text" data-eui-related="avatars-row-1">+3</div>
            </div>
            
            <div className="eui-counter" data-eui-variant="pill">12</div>
            
            <button className="eui-button" data-eui-intent="secondary" data-eui-size="md">
              View All
              <span className="eui-counter" data-eui-variant="pill">35</span>
            </button>
            
            <button className="eui-button" data-eui-intent="primary" data-eui-size="md">
              Messages
              <span className="eui-counter" data-eui-variant="pill" data-eui-filtered="true">8</span>
            </button>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Filtered Avatar Group</h4>
          <div className="eui-related-group" data-eui-group-id="avatars-filtered-complex" data-eui-relation-type="filter">
            <div className="eui-avatar-group" data-eui-size="md">
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=50" alt="User 1" />
              </div>
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=51" alt="User 2" />
              </div>
              <div className="eui-avatar" data-eui-size="md">
                <img src="https://i.pravatar.cc/150?img=52" alt="User 3" />
              </div>
            </div>
            <div className="eui-counter" data-eui-variant="filter" data-eui-related="avatars-filtered-complex">5</div>
          </div>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
            Filter icon indicates that only 5 avatars are visible (some may be filtered out). Hover to see visual connection.
          </p>
        </div>
      </div>
      
      {/* Code Panel Section: Expandable code viewer */}
      <details style={codePanelStyle} open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
        <summary style={summaryStyle}>Expand to inspect code</summary>
        
        {/* Code Display: Syntax-highlighted code block */}
        <Highlight code={complexExamplesCode} language="markup" theme={themes.vsLight}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              style={{ ...style, ...codeWrapStyle, background: 'transparent' }}
            >
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </details>
    </div>
    );
  }
};

