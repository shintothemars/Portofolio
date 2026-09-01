// src/components/SectionTitle.tsx

interface SectionTitleProps {
  number: string;
  title: string;
  titleLine2?: string;
}

export default function SectionTitle({ number, title, titleLine2 }: SectionTitleProps) {
  return (
    <div className="section-header">
      <div>
        <div
          style={{
            overflow: 'hidden',
            marginBottom: titleLine2 ? '4px' : undefined,
          }}
        >
          <span className="section-title" style={{ display: 'block' }}>
            {title}
          </span>
        </div>
        {titleLine2 && (
          <div style={{ overflow: 'hidden' }}>
            <span className="section-title" style={{ display: 'block' }}>
              {titleLine2}
            </span>
          </div>
        )}
      </div>
      <span className="section-number">{number}</span>
    </div>
  );
}
