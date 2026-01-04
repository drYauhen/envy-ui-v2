import React from 'react';
import type { CSSProperties } from 'react';
import type { DocRegistryItem } from './docs-registry';
import {
  docsContainerStyle,
  docsTitleStyle,
  docsDescriptionStyle,
  docsListStyle,
  docsListItemStyle,
  docsLinkStyle,
  docsItemTitleStyle,
  docsItemMetaStyle
} from './adr-list-styles';

type DocSectionListViewerProps = {
  title: string;
  description?: React.ReactNode;
  docs: DocRegistryItem[];
};

const disabledLinkStyle: CSSProperties = {
  ...docsLinkStyle,
  cursor: 'default',
  opacity: 0.7
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
    <div style={docsContainerStyle}>
      <h1 style={docsTitleStyle}>{title}</h1>
      {description ? <div style={docsDescriptionStyle}>{description}</div> : null}
      <ul style={docsListStyle}>
        {sortedDocs.map((doc) => {
          const storyPath = doc.storybookId ? `?path=/story/${doc.storybookId}` : null;
          const meta = (
            <div style={docsItemMetaStyle}>
              <span>Path: {doc.path}</span>
              {!doc.storybookId ? <span>Storybook: not available</span> : null}
            </div>
          );

          return (
            <li key={doc.id} style={docsListItemStyle}>
              {storyPath ? (
                <a href={storyPath} style={docsLinkStyle}>
                  <div style={docsItemTitleStyle}>{doc.title}</div>
                  {meta}
                </a>
              ) : (
                <div style={disabledLinkStyle}>
                  <div style={docsItemTitleStyle}>{doc.title}</div>
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
