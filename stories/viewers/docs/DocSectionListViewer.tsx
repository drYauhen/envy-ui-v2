import React from 'react';
import type { DocRegistryItem } from './docs-registry';

type DocSectionListViewerProps = {
  title: string;
  description?: React.ReactNode;
  docs: DocRegistryItem[];
};

const sortDocs = (docs: DocRegistryItem[]) => {
  return [...docs].sort((a, b) => {
    const aReadme = a.path.endsWith('/README.md') || a.path === 'README.md';
    const bReadme = b.path.endsWith('/README.md') || b.path === 'README.md';
    if (aReadme !== bReadme) {
      return aReadme ? -1 : 1;
    }
    return a.title.localeCompare(b.title);
  });
};

export const DocSectionListViewer: React.FC<DocSectionListViewerProps> = ({
  title,
  description,
  docs
}) => {
  const sortedDocs = sortDocs(docs);

  return (
    <div className="eui-docs eui-docs-container eui-container" data-eui-container="standard">
      <h1 className="eui-text-heading-5 eui-docs-title">{title}</h1>
      {description ? (
        <div className="eui-text-body eui-docs-description">
          {description}
        </div>
      ) : null}
      <ul className="eui-docs-list">
        {sortedDocs.map((doc) => {
          const storyPath = doc.storybookId ? `?path=/story/${doc.storybookId}` : null;
          const meta = (
            <div className="eui-text-caption eui-docs-item-meta">
              <span>Path: {doc.path}</span>
              {!doc.storybookId ? <span>Storybook: not available</span> : null}
            </div>
          );

          return (
            <li key={doc.id}>
              {storyPath ? (
                <a
                  href={storyPath}
                  className="eui-card eui-docs-list-item eui-docs-list-link"
                  data-eui-variant="elevated"
                >
                  <div className="eui-text-title-md">
                    {doc.title}
                  </div>
                  {meta}
                </a>
              ) : (
                <div
                  className="eui-card eui-docs-list-item eui-docs-list-item--disabled"
                  data-eui-variant="muted"
                >
                  <div className="eui-text-title-md">
                    {doc.title}
                  </div>
                  {meta}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
