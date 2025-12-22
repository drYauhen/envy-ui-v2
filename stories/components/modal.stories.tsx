import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useEffect } from 'react';

const meta: Meta = {
  title: 'HTML + CSS/Components/Modal',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  name: 'Basic Modal',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
      <div style={{ padding: '2rem' }}>
        <button
          onClick={() => dialogRef.current?.showModal()}
          className="eui-button"
          data-eui-intent="primary"
        >
          Open Modal
        </button>

        <dialog ref={dialogRef} className="eui-modal" data-eui-size="md">
          <div className="eui-modal-header">
            <h2 className="eui-modal-title">Modal Title</h2>
            <button
              className="eui-modal-close"
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
          </div>
          <div className="eui-modal-body">
            <p>This is the modal body content. You can put any content here.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="eui-modal-footer">
            <button
              className="eui-button"
              data-eui-intent="primary"
              onClick={() => dialogRef.current?.close()}
            >
              Save
            </button>
            <button
              className="eui-button"
              data-eui-intent="secondary"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>
          </div>
        </dialog>
      </div>
    );
  }
};

export const Sizes: Story = {
  name: 'Modal Sizes',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => {
    const smRef = useRef<HTMLDialogElement>(null);
    const mdRef = useRef<HTMLDialogElement>(null);
    const lgRef = useRef<HTMLDialogElement>(null);
    const xlRef = useRef<HTMLDialogElement>(null);

    return (
      <div style={{ padding: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => smRef.current?.showModal()}
          className="eui-button"
          data-eui-intent="primary"
        >
          Small
        </button>
        <button
          onClick={() => mdRef.current?.showModal()}
          className="eui-button"
          data-eui-intent="primary"
        >
          Medium
        </button>
        <button
          onClick={() => lgRef.current?.showModal()}
          className="eui-button"
          data-eui-intent="primary"
        >
          Large
        </button>
        <button
          onClick={() => xlRef.current?.showModal()}
          className="eui-button"
          data-eui-intent="primary"
        >
          Extra Large
        </button>

        <dialog ref={smRef} className="eui-modal" data-eui-size="sm">
          <div className="eui-modal-header">
            <h2 className="eui-modal-title">Small Modal</h2>
            <button className="eui-modal-close" aria-label="Close" onClick={() => smRef.current?.close()}>×</button>
          </div>
          <div className="eui-modal-body">
            <p>This is a small modal (400px max-width).</p>
          </div>
          <div className="eui-modal-footer">
            <button className="eui-button" data-eui-intent="primary" onClick={() => smRef.current?.close()}>Save</button>
            <button className="eui-button" data-eui-intent="secondary" onClick={() => smRef.current?.close()}>Cancel</button>
          </div>
        </dialog>

        <dialog ref={mdRef} className="eui-modal" data-eui-size="md">
          <div className="eui-modal-header">
            <h2 className="eui-modal-title">Medium Modal</h2>
            <button className="eui-modal-close" aria-label="Close" onClick={() => mdRef.current?.close()}>×</button>
          </div>
          <div className="eui-modal-body">
            <p>This is a medium modal (500px max-width). Default size.</p>
          </div>
          <div className="eui-modal-footer">
            <button className="eui-button" data-eui-intent="primary" onClick={() => mdRef.current?.close()}>Save</button>
            <button className="eui-button" data-eui-intent="secondary" onClick={() => mdRef.current?.close()}>Cancel</button>
          </div>
        </dialog>

        <dialog ref={lgRef} className="eui-modal" data-eui-size="lg">
          <div className="eui-modal-header">
            <h2 className="eui-modal-title">Large Modal</h2>
            <button className="eui-modal-close" aria-label="Close" onClick={() => lgRef.current?.close()}>×</button>
          </div>
          <div className="eui-modal-body">
            <p>This is a large modal (600px max-width). Good for forms with more fields.</p>
          </div>
          <div className="eui-modal-footer">
            <button className="eui-button" data-eui-intent="primary" onClick={() => lgRef.current?.close()}>Save</button>
            <button className="eui-button" data-eui-intent="secondary" onClick={() => lgRef.current?.close()}>Cancel</button>
          </div>
        </dialog>

        <dialog ref={xlRef} className="eui-modal" data-eui-size="xl">
          <div className="eui-modal-header">
            <h2 className="eui-modal-title">Extra Large Modal</h2>
            <button className="eui-modal-close" aria-label="Close" onClick={() => xlRef.current?.close()}>×</button>
          </div>
          <div className="eui-modal-body">
            <p>This is an extra large modal (800px max-width). Used for complex forms or detailed content.</p>
          </div>
          <div className="eui-modal-footer">
            <button className="eui-button" data-eui-intent="primary" onClick={() => xlRef.current?.close()}>Save</button>
            <button className="eui-button" data-eui-intent="secondary" onClick={() => xlRef.current?.close()}>Cancel</button>
          </div>
        </dialog>
      </div>
    );
  }
};

export const WithForm: Story = {
  name: 'Modal with Form',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
      <div style={{ padding: '2rem' }}>
        <button
          onClick={() => dialogRef.current?.showModal()}
          className="eui-button"
          data-eui-intent="primary"
        >
          Open Form Modal
        </button>

        <dialog ref={dialogRef} className="eui-modal" data-eui-size="lg">
          <div className="eui-modal-header">
            <h2 className="eui-modal-title">Folder Settings</h2>
            <button
              className="eui-modal-close"
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
          </div>
          <div className="eui-modal-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#2d98e8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px' }}>📁</div>
                <input type="text" className="eui-input" placeholder="Folder A" style={{ flex: 1 }} />
                <button className="eui-button" data-eui-intent="secondary" style={{ minWidth: 'auto', padding: '0.5rem' }}>🗑️</button>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#2d98e8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>0</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#2d98e8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px' }}>📁</div>
                <input type="text" className="eui-input" placeholder="Folder B" style={{ flex: 1 }} />
                <button className="eui-button" data-eui-intent="secondary" style={{ minWidth: 'auto', padding: '0.5rem' }}>🗑️</button>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#2d98e8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>4</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#2d98e8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px' }}>📁</div>
                <input type="text" className="eui-input" placeholder="New Folder" style={{ flex: 1 }} />
                <button className="eui-button" data-eui-intent="secondary" style={{ minWidth: 'auto', padding: '0.5rem' }}>🗑️</button>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#2d98e8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>0</div>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <a href="#" style={{ color: 'var(--eui-color-accent-primary)', textDecoration: 'none' }}>+ Add Folder</a>
              </div>
            </div>
          </div>
          <div className="eui-modal-footer">
            <button
              className="eui-button"
              data-eui-intent="primary"
              onClick={() => dialogRef.current?.close()}
            >
              Save
            </button>
            <button
              className="eui-button"
              data-eui-intent="secondary"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>
          </div>
        </dialog>
      </div>
    );
  }
};

export const LongContent: Story = {
  name: 'Modal with Long Content',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
      <div style={{ padding: '2rem' }}>
        <button
          onClick={() => dialogRef.current?.showModal()}
          className="eui-button"
          data-eui-intent="primary"
        >
          Open Long Content Modal
        </button>

        <dialog ref={dialogRef} className="eui-modal" data-eui-size="md">
          <div className="eui-modal-header">
            <h2 className="eui-modal-title">Long Content Example</h2>
            <button
              className="eui-modal-close"
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
          </div>
          <div className="eui-modal-body">
            <p>This modal demonstrates how long content is handled. The body area is scrollable.</p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            ))}
          </div>
          <div className="eui-modal-footer">
            <button
              className="eui-button"
              data-eui-intent="primary"
              onClick={() => dialogRef.current?.close()}
            >
              Save
            </button>
            <button
              className="eui-button"
              data-eui-intent="secondary"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>
          </div>
        </dialog>
      </div>
    );
  }
};

