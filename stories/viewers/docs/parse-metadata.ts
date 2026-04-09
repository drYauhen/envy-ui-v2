import { DocumentMetadataFields } from './DocumentMetadata';

/**
 * Parse document metadata from markdown content.
 * Extracts the metadata block between the title and the first --- separator.
 */
export function parseDocumentMetadata(content: string): {
  metadata: DocumentMetadataFields;
  variant: 'adr' | 'architecture';
  contentWithoutMetadata: string;
} | null {
  const lines = content.split('\n');

  // Find the title line (first # heading)
  const titleIndex = lines.findIndex(line => line.trim().startsWith('# '));
  if (titleIndex === -1) return null;

  const titleLine = lines[titleIndex].trim();

  // Determine variant based on title format
  const isADR = /^# ADR-\d{4}:/.test(titleLine);
  const isArchitecture = !isADR && lines.some(line => line.trim().startsWith('**Document ID:**'));
  const variant: 'adr' | 'architecture' = isADR ? 'adr' : 'architecture';

  // Find the separator line (---)
  const separatorIndex = lines.findIndex((line, index) =>
    index > titleIndex && line.trim() === '---'
  );

  if (separatorIndex === -1) return null;

  // Extract metadata lines (between title and separator)
  const metadataLines = lines.slice(titleIndex + 1, separatorIndex);
  const metadataText = metadataLines.join('\n');

  // Parse metadata fields
  const metadata: DocumentMetadataFields = {};

  // Document ID (Architecture only)
  const documentIdMatch = metadataText.match(/\*\*Document ID:\*\*\s*(.+)/);
  if (documentIdMatch) {
    metadata.documentId = documentIdMatch[1].trim();
  }

  // Status
  const statusMatch = metadataText.match(/\*\*Status:\*\*\s*(.+)/);
  if (statusMatch) {
    metadata.status = statusMatch[1].trim();
  }

  // Risk (Migration records)
  const riskMatch = metadataText.match(/\*\*Risk:\*\*\s*(.+)/);
  if (riskMatch) {
    metadata.risk = riskMatch[1].trim();
  }

  // Date
  const dateMatch = metadataText.match(/\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    metadata.date = dateMatch[1];
  }

  // Last Updated
  const lastUpdatedMatch = metadataText.match(/\*\*Last Updated:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  if (lastUpdatedMatch) {
    metadata.lastUpdated = lastUpdatedMatch[1];
  }

  // Owner
  const ownerMatch = metadataText.match(/\*\*Owner:\*\*\s*(.+)/);
  if (ownerMatch) {
    metadata.owner = ownerMatch[1].trim();
  }

  // Assistance
  const assistanceMatch = metadataText.match(/\*\*Assistance:\*\*\s*(.+)/);
  if (assistanceMatch) {
    metadata.assistance = assistanceMatch[1].trim();
  }

  // Category (Architecture only)
  const categoryMatch = metadataText.match(/\*\*Category:\*\*\s*(.+)/);
  if (categoryMatch) {
    metadata.category = categoryMatch[1].trim();
  }

  // Related documents
  const relatedMatch = metadataText.match(/\*\*Related:\*\*\s*\n((?:- .+\n?)*)/);
  if (relatedMatch) {
    const relatedSection = relatedMatch[1];
    const relatedLinks: Array<{ text: string; href: string; description?: string }> = [];

    // Parse each related link
    // Format: - [Text](href) — Description
    const linkRegex = /^- \[(.+?)\]\((.+?)\)(?:\s*—\s*(.+))?$/gm;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(relatedSection)) !== null) {
      const [, text, href, description] = linkMatch;
      relatedLinks.push({
        text: text.trim(),
        href: href.trim(),
        description: description?.trim()
      });
    }

    if (relatedLinks.length > 0) {
      metadata.related = relatedLinks;
    }
  }

  // Create content without metadata block
  // Keep title, remove metadata lines, keep separator and everything after
  const contentWithoutMetadata = [
    lines[titleIndex], // Title
    '',
    ...lines.slice(separatorIndex) // Separator and content
  ].join('\n');

  return {
    metadata,
    variant,
    contentWithoutMetadata
  };
}
