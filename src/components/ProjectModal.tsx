// src/components/ProjectModal.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      style={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="modal-header">
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.18em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
            }}
          >
            {project.num} / 05 — CASE STUDY
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 3vw, 32px)',
              letterSpacing: '0.04em',
              marginTop: '4px',
            }}
          >
            {project.title}
          </h2>
        </div>
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Close case study"
        >
          CLOSE ✕
        </button>
      </div>

      {/* Body */}
      <div className="modal-body">
        {/* Overview */}
        <div className="modal-section">
          <div className="modal-section-label">Overview</div>
          <p className="modal-section-text">{project.fullDesc}</p>
        </div>

        {/* Role */}
        <div className="modal-section">
          <div className="modal-section-label">My Role</div>
          <p className="modal-section-text">{project.role.join(' · ')}</p>
        </div>

        {/* Responsibilities */}
        <div className="modal-section">
          <div className="modal-section-label">What I Did</div>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {project.responsibilities.map((r, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: '16px',
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent)',
                    fontSize: '10px',
                    marginTop: '4px',
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Impact */}
        <div className="modal-section">
          <div className="modal-section-label">Impact</div>
          <p className="modal-section-text">{project.impact}</p>
        </div>

        {/* What I Learned */}
        {project.learned && (
          <div className="modal-section">
            <div className="modal-section-label">What I Learned</div>
            <p className="modal-section-text">{project.learned}</p>
          </div>
        )}

        {/* Tools */}
        <div className="modal-section">
          <div className="modal-section-label">Tools & Technologies</div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            {project.tools.map((t) => (
              <span key={t} className="tool-tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Images if available */}
        {project.images.length > 0 && (
          <div className="modal-section">
            <div className="modal-section-label">Screenshots</div>
            <div className="modal-images">
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
