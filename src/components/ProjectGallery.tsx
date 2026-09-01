// src/components/ProjectGallery.tsx
import type { ReactNode } from 'react';

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
  hasVisualization?: boolean;
  visualizationSlot?: ReactNode;
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="img-placeholder"
      aria-label={label}
      style={{ aspectRatio: '4/3' }}
    >
      <div className="img-placeholder-text">
        <div style={{ fontSize: '28px', marginBottom: '12px', opacity: 0.2 }}>⬚</div>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em' }}>SCREENSHOT</div>
        <div style={{ fontSize: '9px', marginTop: '8px', color: 'var(--text-muted)', opacity: 0.5, lineHeight: 1.6 }}>
          Taruh gambar di<br />
          <code style={{ color: 'var(--accent)', opacity: 0.7 }}>src/assets/projects/</code>
        </div>
      </div>
    </div>
  );
}

export default function ProjectGallery({
  images,
  projectName,
  hasVisualization,
  visualizationSlot,
}: ProjectGalleryProps) {
  // STRET — tampilkan visualisasi clustering
  if (hasVisualization && visualizationSlot) {
    return (
      <div
        className="project-image-wrap"
        data-cursor-label="EXPLORE"
        style={{ width: '100%' }}
      >
        {visualizationSlot}
      </div>
    );
  }

  // Kalau belum ada gambar
  if (images.length === 0) {
    return (
      <div
        className="project-image-wrap"
        data-cursor-label="OPEN"
        style={{ width: '100%' }}
      >
        <ImagePlaceholder label={`${projectName} screenshot placeholder`} />
        <div className="project-image-overlay">
          <span className="project-image-label">VIEW CASE STUDY →</span>
        </div>
      </div>
    );
  }

  // Kalau ada 1 gambar — tampilkan penuh
  if (images.length === 1) {
    return (
      <div className="project-image-wrap" data-cursor-label="VIEW" style={{ width: '100%' }}>
        <img
          src={images[0]}
          alt={`${projectName} screenshot`}
          loading="lazy"
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
        />
        <div className="project-image-overlay">
          <span className="project-image-label">VIEW CASE STUDY →</span>
        </div>
      </div>
    );
  }

  // Kalau ada 2+ gambar — cover besar + thumbnail row
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Cover image */}
      <div className="project-image-wrap" data-cursor-label="VIEW">
        <img
          src={images[0]}
          alt={`${projectName} cover`}
          loading="lazy"
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
        />
        <div className="project-image-overlay">
          <span className="project-image-label">VIEW CASE STUDY →</span>
        </div>
      </div>

      {/* Thumbnail row (max 3 extra) */}
      {images.length > 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(images.length - 1, 3)}, 1fr)`, gap: '8px' }}>
          {images.slice(1, 4).map((img, i) => (
            <div
              key={i}
              className="project-image-wrap"
              data-cursor-label="VIEW"
              style={{ overflow: 'hidden' }}
            >
              <img
                src={img}
                alt={`${projectName} screenshot ${i + 2}`}
                loading="lazy"
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
