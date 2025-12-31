import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { CSSProperties } from 'react';

type MarkdownViewerProps = {
  markdownPath: string;
  fallback?: string;
};

const containerStyle: CSSProperties = {
  lineHeight: 1.6,
  color: '#0f172a'
};

const loadingStyle: CSSProperties = {
  color: '#64748b',
  fontStyle: 'italic'
};

const errorStyle: CSSProperties = {
  color: '#dc2626',
  fontStyle: 'italic'
};

export const MarkdownViewer = ({ markdownPath, fallback = 'Loading...' }: MarkdownViewerProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(markdownPath)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load');
        setLoading(false);
      });
  }, [markdownPath]);

  if (loading) {
    return <p style={loadingStyle}>{fallback}</p>;
  }

  if (error) {
    return <p style={errorStyle}>Failed to load documentation from {markdownPath}</p>;
  }

  return (
    <div style={containerStyle}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}: any) => (
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              marginTop: '1rem', 
              marginBottom: '0.5rem',
              color: '#0f172a'
            }} {...props} />
          ),
          h2: ({node, ...props}: any) => (
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 700, 
              marginTop: '1rem', 
              marginBottom: '0.5rem',
              color: '#0f172a'
            }} {...props} />
          ),
          h3: ({node, ...props}: any) => (
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 700, 
              marginTop: '0.75rem', 
              marginBottom: '0.5rem',
              color: '#0f172a'
            }} {...props} />
          ),
          p: ({node, ...props}: any) => (
            <p style={{ 
              margin: '0 0 0.75rem',
              lineHeight: 1.6
            }} {...props} />
          ),
          ul: ({node, ...props}: any) => (
            <ul style={{ 
              margin: '0.5rem 0',
              paddingLeft: '1.5rem',
              lineHeight: 1.6
            }} {...props} />
          ),
          ol: ({node, ...props}: any) => (
            <ol style={{ 
              margin: '0.5rem 0',
              paddingLeft: '1.5rem',
              lineHeight: 1.6
            }} {...props} />
          ),
          li: ({node, ...props}: any) => (
            <li style={{ 
              marginTop: '0.25rem'
            }} {...props} />
          ),
          code: ({node, inline, ...props}: any) => {
            if (inline) {
              return (
                <code style={{
                  background: '#f1f5f9',
                  padding: '0.125rem 0.25rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.9em',
                  fontFamily: 'monospace'
                }} {...props} />
              );
            }
            return (
              <code style={{
                display: 'block',
                background: '#f1f5f9',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.9em',
                fontFamily: 'monospace',
                overflow: 'auto',
                margin: '0.75rem 0'
              }} {...props} />
            );
          },
          strong: ({node, ...props}: any) => (
            <strong style={{ fontWeight: 700 }} {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

