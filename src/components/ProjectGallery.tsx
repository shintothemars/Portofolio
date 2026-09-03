// src/components/ProjectGallery.tsx
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ProjectGalleryProps {
  images?: string[];
  coverImage?: string;
  projectName: string;
  projectId?: string;
  hasVisualization?: boolean;
  visualizationSlot?: ReactNode;
  interactiveLink?: boolean;
}

export function ProjectPlaceholder({
  projectName,
  subtext,
}: {
  projectName: string;
  subtext?: string;
}) {
  return (
    <div
      className="img-placeholder"
      aria-label={`${projectName} visual preview`}
    >
      <div className="img-placeholder-grid" aria-hidden="true" />
      <div className="img-placeholder-text">
        <div className="img-placeholder-icon">⬡</div>
        <div className="img-placeholder-title">{projectName}</div>
        <div className="img-placeholder-sub">
          {subtext || 'PROJECT VISUAL ASSET'}
        </div>
        <div className="img-placeholder-hint">
          Drop PNG screenshot to <code>public/projects/</code>
        </div>
      </div>
    </div>
  );
}

export default function ProjectGallery({
  images = [],
  coverImage,
  projectName,
  projectId,
  hasVisualization,
  visualizationSlot,
  interactiveLink = true,
}: ProjectGalleryProps) {
  const [imgError, setImgError] = useState(false);

  const primaryImage = coverImage || (images.length > 0 ? images[0] : null);

  const renderCover = () => {
    // If real image exists, prioritize displaying the screenshot!
    if (primaryImage && !imgError) {
      return (
        <div className="project-cover-container">
          <img
            src={primaryImage}
            alt={`${projectName} cover showcase`}
            loading="lazy"
            className="project-cover-img"
            onError={() => setImgError(true)}
          />
          <div className="project-image-overlay" aria-hidden="true">
            <span className="project-image-label">VIEW CASE STUDY →</span>
          </div>
        </div>
      );
    }

    // If no screenshot image is provided, display visualization slot
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

    return (
      <ProjectPlaceholder
        projectName={projectName}
        subtext="VISUAL PREVIEW"
      />
    );
  };

  const content = (
    <div
      className="project-image-wrap"
      data-cursor-label="VIEW"
      style={{ width: '100%' }}
    >
      {renderCover()}
    </div>
  );

  if (interactiveLink && projectId) {
    return (
      <Link
        to={`/project/${projectId}`}
        className="project-image-link"
        aria-label={`Open ${projectName} project detail`}
      >
        {content}
      </Link>
    );
  }

  return content;
}
