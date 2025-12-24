import type { CSSProperties } from 'react';
import { Icon } from '../../../packages/tsx/icon';
import iconMetadata from '../../../assets/icons/icon-metadata.json';

type IconMetadata = {
  category: 'ui' | 'semantic';
  subcategory: string;
  tags: string[];
  description: string;
};

type IconGridProps = {
  category?: 'ui' | 'semantic' | null;
  subcategory?: string;
  size?: number;
  showSize?: boolean;
};

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: '1.5rem',
  padding: '1.5rem'
};

const iconCardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '1.5rem 1rem',
  border: '1px solid #e2e8f0',
  borderRadius: '0.75rem',
  background: '#ffffff',
  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
  cursor: 'default'
};

const iconContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '96px',
  height: '96px',
  borderRadius: '0.75rem',
  background: '#f8fafc',
  border: '1px solid #e2e8f0'
};

const iconNameStyle: CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#0f172a',
  textAlign: 'center',
  wordBreak: 'break-word'
};

const iconDescriptionStyle: CSSProperties = {
  fontSize: '0.75rem',
  color: '#64748b',
  textAlign: 'center',
  lineHeight: 1.4,
  margin: 0
};

const iconTagsStyle: CSSProperties = {
  fontSize: '0.7rem',
  color: '#94a3b8',
  textAlign: 'center',
  fontStyle: 'italic'
};

const sizeNoteStyle: CSSProperties = {
  fontSize: '0.75rem',
  color: '#64748b',
  textAlign: 'center',
  marginTop: '1rem',
  paddingTop: '1rem',
  borderTop: '1px solid #e2e8f0',
  fontStyle: 'italic'
};

export const IconGrid = ({ 
  category = null, 
  subcategory,
  size = 48,
  showSize = true 
}: IconGridProps) => {
  const allIcons = Object.entries(iconMetadata as Record<string, IconMetadata>);
  
  let filteredIcons = allIcons;
  
  if (category) {
    filteredIcons = filteredIcons.filter(([_, meta]) => meta.category === category);
  }
  
  if (subcategory) {
    filteredIcons = filteredIcons.filter(([_, meta]) => meta.subcategory === subcategory);
  }

  if (filteredIcons.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
        No icons found in this category.
      </div>
    );
  }

  return (
    <div>
      <div style={gridStyle}>
        {filteredIcons.map(([name, meta]) => (
          <div key={name} style={iconCardStyle}>
            <div style={iconContainerStyle}>
              <Icon name={name as any} size={size} />
            </div>
            <div style={iconNameStyle}>{name}</div>
            {meta.description && (
              <p style={iconDescriptionStyle}>{meta.description}</p>
            )}
            {meta.tags && meta.tags.length > 0 && (
              <div style={iconTagsStyle}>
                {meta.tags.slice(0, 3).join(', ')}
                {meta.tags.length > 3 && '...'}
              </div>
            )}
          </div>
        ))}
      </div>
      {showSize && (
        <div style={sizeNoteStyle}>
          Icons displayed at {size}px (double extra-large) for demonstration purposes. 
          In production, use standard sizes: xs (12px), sm (14px), md (16px), lg (20px), xl (24px).
        </div>
      )}
    </div>
  );
};

