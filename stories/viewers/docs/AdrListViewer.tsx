import React from 'react';
import type { CSSProperties } from 'react';
import { adrs, type AdrListItem } from './adr-list-data';
import {
  docsContainerStyle,
  docsTitleStyle,
  docsDescriptionStyle,
  docsListStyle,
  docsListItemStyle,
  docsLinkStyle,
  docsItemTitleStyle,
  docsItemMetaStyle,
  getStatusStyle
} from './adr-list-styles';
import { exportNameToSlug, titleToStorySlug } from './adr-links';

type AdrListViewerProps = {
  title?: string;
  description?: React.ReactNode;
  adrs?: AdrListItem[];
};

/**
 * AdrListViewer Component
 * 
 * Displays a list of Architectural Decision Records (ADR).
 * 
 * This component follows the pattern for documentation list viewers:
 * - Styles are separated in adr-list-styles.ts (reusable)
 * - Data is separated in adr-list-data.ts (easy to update)
 * - Component handles rendering logic only
 * 
 * This pattern can be reused for other documentation sections.
 */
export const AdrListViewer: React.FC<AdrListViewerProps> = ({
  title = 'Architectural Decision Records (ADR)',
  description,
  adrs: customAdrs
}) => {
  const adrsList = customAdrs || adrs;

  const defaultDescription = (
    <>
      <p>
        Architectural Decision Records (ADR) capture the history of architectural reasoning and decision-making over time.
        They reflect how thinking evolved at specific moments and are not guaranteed to describe the current or final state of the system.
      </p>
      <p>
        ADR documents serve as a historical record of architectural thinking, context for understanding why certain approaches were explored,
        and reference material for reflection and analysis.
      </p>
    </>
  );

  return (
    <div style={docsContainerStyle}>
      <h1 style={docsTitleStyle}>{title}</h1>
      <div style={docsDescriptionStyle}>
        {description || defaultDescription}
      </div>
      <ul style={docsListStyle}>
        {adrsList.map((adr) => {
          // Use exportName if provided, otherwise generate from title
          let storySlug: string;
          if (adr.exportName) {
            storySlug = exportNameToSlug(adr.exportName);
          } else {
            // Convert title to story slug (same logic as AdrViewer.tsx)
            storySlug = titleToStorySlug(adr.title);
          }
          const storyPath = `?path=/story/docs-adr--${storySlug}`;
          return (
            <li key={adr.number} style={docsListItemStyle}>
              <a 
                href={storyPath}
                style={docsLinkStyle}
              >
                <div style={docsItemTitleStyle}>
                  ADR-{adr.number}: {adr.title}
                </div>
                <div style={docsItemMetaStyle}>
                  <span style={getStatusStyle(adr.status)}>{adr.status}</span>
                  <span>Date: {adr.date}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
