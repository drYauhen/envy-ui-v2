import React, { useEffect, useState } from 'react';
import { adrFilenameMap } from './adr-filename-map';
import { DocViewer } from './DocViewer';
import {
  parseMarkdownMetadata,
  stripMetadataFromMarkdown,
  type DocumentMetadata
} from './canonical-metadata';

type AdrViewerProps = {
  adrNumber: string;
  title: string;
  status: string;
  date: string;
};

export const AdrViewer = ({ adrNumber, title, status, date }: AdrViewerProps) => {
  const [content, setContent] = useState<string>('');
  const [metadata, setMetadata] = useState<DocumentMetadata>({});
  const [loading, setLoading] = useState(true);

  const filename = adrFilenameMap[adrNumber] || `ADR-${adrNumber}.md`;
  const filePath = `/docs/adr/${filename}`;

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Failed to load ADR');

        const rawContent = await response.text();

        // Parse metadata from content for header display
        const parsedMetadata = parseMarkdownMetadata(rawContent);
        setMetadata(parsedMetadata);

        // Keep full content (including metadata) for rendering
        setContent(rawContent);

      } catch (error) {
        console.error('Error loading ADR content:', error);
        setContent('Error loading ADR content');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [filePath]);

  if (loading) {
    return (
      <DocViewer
        markdownPath=""
        status={status}
        date={date}
        fallback="Loading ADR document..."
      />
    );
  }

  // Show updated date in header only if it's different from creation date
  const showUpdatedDate = Boolean(metadata.lastUpdated && metadata.lastUpdated !== date);

  return (
    <DocViewer
      markdownPath=""
      content={content}
      status={status}
      date={date}
      showUpdatedDate={showUpdatedDate}
      lastUpdated={metadata.lastUpdated}
      fallback="Loading ADR document..."
    />
  );
};
