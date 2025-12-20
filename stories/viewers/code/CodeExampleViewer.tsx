import type { CSSProperties, ReactNode } from 'react';

type CodeBlock = {
  title: string;
  code: string;
};

type CodeExampleViewerProps = {
  preview: ReactNode;
  styleText?: string;
  blocks: CodeBlock[];
};

const layoutStyle: CSSProperties = {
  display: 'grid',
  gap: '1.5rem'
};

const codeStackStyle: CSSProperties = {
  display: 'grid',
  gap: '0.75rem'
};

const summaryStyle: CSSProperties = {
  cursor: 'pointer',
  fontWeight: 600,
  marginBottom: '0.5rem'
};

const preStyle: CSSProperties = {
  background: '#0f172a',
  color: '#e2e8f0',
  padding: '12px',
  borderRadius: '8px',
  fontSize: '0.85rem',
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowX: 'hidden'
};

const CodeBlockViewer = ({ title, code }: CodeBlock) => (
  <details>
    <summary style={summaryStyle}>Expand to inspect {title}</summary>
    <pre style={preStyle}>
      <code>{code}</code>
    </pre>
  </details>
);

export const CodeExampleViewer = ({ preview, styleText, blocks }: CodeExampleViewerProps) => (
  <div style={layoutStyle}>
    {styleText ? <style>{styleText}</style> : null}
    {preview}
    <div style={codeStackStyle}>
      {blocks.map((block) => (
        <CodeBlockViewer key={block.title} {...block} />
      ))}
    </div>
  </div>
);
