import React, { useEffect, useMemo, useState } from 'react';
import type { Language } from 'prism-react-renderer';
import { CodeBlock } from '../shared/CodeBlock';

const ALLOWED_SOURCE_PREFIXES = [
  '/stories/',
  '/src/',
  '/tokens/',
  '/scripts/',
  '/schemas/',
  '/generated/',
  '/.storybook/'
];

const isAllowedSourcePath = (path: string): boolean =>
  ALLOWED_SOURCE_PREFIXES.some((prefix) => path.startsWith(prefix));

const normalizeSourcePath = (value: string | null): string | null => {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed || !trimmed.startsWith('/')) return null;
  if (!isAllowedSourcePath(trimmed)) return null;

  return trimmed;
};

const getSourcePathFromLocation = (): string | null => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return normalizeSourcePath(params.get('source'));
};

const getLanguageFromPath = (path: string): Language => {
  const match = path.toLowerCase().match(/\.([a-z0-9]+)$/);
  const ext = match?.[1];

  switch (ext) {
    case 'ts':
      return 'ts';
    case 'tsx':
      return 'tsx';
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'jsx';
    case 'json':
      return 'json';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    case 'sass':
      return 'sass';
    case 'less':
      return 'less';
    case 'mjs':
    case 'cjs':
      return 'javascript';
    case 'md':
      return 'markdown';
    default:
      return 'text';
  }
};

export const SourceFileViewer = () => {
  const sourcePath = useMemo(() => getSourcePathFromLocation(), []);
  const sourceLanguage = sourcePath ? getLanguageFromPath(sourcePath) : 'text';
  const [sourceCode, setSourceCode] = useState('');
  const [loading, setLoading] = useState(Boolean(sourcePath));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sourcePath) {
      setLoading(false);
      setError('No source file provided. Use query param: source=/stories/.../file.tsx');
      return;
    }

    setLoading(true);
    setError(null);

    fetch(sourcePath)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load source file (${res.status})`);
        }
        return res.text();
      })
      .then((text) => {
        setSourceCode(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load source file');
        setLoading(false);
      });
  }, [sourcePath]);

  return (
    <div className="eui-typography-root" data-eui-context="app" data-eui-theme="system">
      <div className="eui-container" data-eui-container="wide" style={{ paddingBlock: '1.25rem' }}>
        <div className="eui-stack" data-eui-gap="sm" style={{ maxWidth: '960px', marginInline: 'auto' }}>
          <div className="eui-card" data-eui-variant="elevated">
            <div className="eui-card__body eui-stack" data-eui-gap="sm">
              <div className="eui-inline" data-eui-gap="xs" data-eui-wrap="true" style={{ alignItems: 'center' }}>
                <h1 className="eui-text-title-md" style={{ margin: 0 }}>Source File</h1>
                <span className="eui-badge" data-eui-variant="subtle" data-eui-tone="neutral">
                  Read-Only
                </span>
              </div>
              <div className="eui-callout eui-docs-metadata" data-eui-tone="neutral" style={{ marginBottom: 0 }}>
                <dl className="eui-docs-metadata-list">
                  <dt className="eui-docs-metadata-label">Path</dt>
                  <dd className="eui-docs-metadata-value eui-text-body-sm">
                    <code className="eui-code-block" data-eui-variant="inline">
                      {sourcePath || '(none)'}
                    </code>
                  </dd>
                  <dt className="eui-docs-metadata-label">Language</dt>
                  <dd className="eui-docs-metadata-value eui-text-body-sm">{sourceLanguage}</dd>
                  <dt className="eui-docs-metadata-label">Raw</dt>
                  <dd className="eui-docs-metadata-value eui-text-body-sm">
                    {sourcePath ? (
                      <a
                        className="eui-link"
                        href={sourcePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-eui-link-target="new-tab"
                      >
                        Open raw source
                      </a>
                    ) : (
                      <span className="eui-text-muted">Not available</span>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="eui-card" data-eui-variant="flat">
              <div className="eui-card__body">
                <p className="eui-text-body">Loading source file...</p>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="eui-card" data-eui-variant="flat">
              <div className="eui-card__body eui-stack" data-eui-gap="xs">
                <p className="eui-text-body-strong">Failed to open source file</p>
                <p className="eui-text-body-sm">{error}</p>
              </div>
            </div>
          ) : null}

          {!loading && !error && sourcePath ? (
            <div className="eui-card" data-eui-variant="elevated">
              <div className="eui-card__body">
                <CodeBlock
                  title={sourcePath}
                  code={sourceCode}
                  language={sourceLanguage}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
