// src/pages/ProjectDetail.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  getProjectById,
  getPublishedProjects,
  type Project,
} from '../data/projects';
import ProjectMeta from '../components/ProjectMeta';
import ClusterVisualization from '../components/ClusterVisualization';
import { ProjectPlaceholder } from '../components/ProjectGallery';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const prefersReduced = usePrefersReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [heroImgError, setHeroImgError] = useState(false);
  const [galleryImgErrors, setGalleryImgErrors] = useState<Record<number, boolean>>({});

  const publishedProjects = getPublishedProjects();
  const projectIndex = publishedProjects.findIndex((p) => p.id === id);
  const project: Project | undefined = publishedProjects[projectIndex];

  // Prev / Next project calculation
  const prevProject =
    projectIndex > 0 ? publishedProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < publishedProjects.length - 1
      ? publishedProjects[projectIndex + 1]
      : null;

  useEffect(() => {
    // Scroll window to top when detail page opens
    window.scrollTo(0, 0);

    if (prefersReduced || !project) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.detail-section',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.25,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [id, prefersReduced, project]);

  if (!project) {
    return (
      <div className="container-wide project-not-found">
        <div className="not-found-box">
          <span className="not-found-code">404</span>
          <h1 className="not-found-title">PROJECT NOT FOUND</h1>
          <p className="not-found-desc">
            The project you are looking for does not exist or has not been published yet.
          </p>
          <Link to="/" className="project-cta" data-cursor-label="BACK">
            ← BACK TO ALL WORKS
          </Link>
        </div>
      </div>
    );
  }

  // Safe checks for external links
  const hasLiveLink = Boolean(project.links?.live?.trim());
  const hasGithubLink = Boolean(project.links?.github?.trim());
  const hasCaseStudyLink = Boolean(project.links?.caseStudy?.trim());
  const hasAnyLink = hasLiveLink || hasGithubLink || hasCaseStudyLink;

  const primaryHeroImage = project.coverImage || (project.images && project.images[0]);

  return (
    <div ref={containerRef} className="project-detail-page">
      {/* Top Navigation Bar */}
      <div className="project-detail-topbar container-wide">
        <button
          onClick={() => navigate('/#work')}
          className="back-btn"
          aria-label="Back to projects"
          data-cursor-label="BACK"
        >
          <span className="back-arrow" aria-hidden="true">
            ←
          </span>
          <span>ALL PROJECTS</span>
        </button>

        <div className="project-detail-counter" aria-label="Project index">
          {String(projectIndex + 1).padStart(2, '0')} /{' '}
          {String(publishedProjects.length).padStart(2, '0')}
        </div>
      </div>

      {/* Main Header */}
      <header ref={headerRef} className="project-detail-header container-wide">
        <div className="project-category" style={{ marginBottom: '16px' }}>
          <span>{project.categories.join(' · ')}</span>
          <span className="project-year">{project.year}</span>
        </div>

        <h1 className="project-detail-title">
          {project.title}
          {project.titleLine2 && (
            <span className="project-detail-subtitle">
              <br />
              {project.titleLine2}
            </span>
          )}
        </h1>

        <p className="project-detail-lead">{project.description}</p>

        {/* Links (Only rendered if URL exists) */}
        {hasAnyLink && (
          <div className="project-action-links">
            {hasLiveLink && (
              <a
                href={project.links!.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-cta"
                data-cursor-label="VISIT"
              >
                LIVE DEMO ↗
              </a>
            )}
            {hasGithubLink && (
              <a
                href={project.links!.github}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-ghost-btn"
                data-cursor-label="CODE"
              >
                GITHUB REPOSITORY ↗
              </a>
            )}
            {hasCaseStudyLink && (
              <a
                href={project.links!.caseStudy}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-ghost-btn"
                data-cursor-label="READ"
              >
                EXTERNAL CASE STUDY ↗
              </a>
            )}
          </div>
        )}
      </header>

      {/* Hero Visual Slot */}
      <section
        className="project-detail-hero-media container-wide detail-section"
        aria-label="Project main preview"
      >
        {primaryHeroImage && !heroImgError ? (
          <div className="detail-hero-image-wrap">
            <img
              src={primaryHeroImage}
              alt={`${project.title} hero banner`}
              className="detail-hero-image"
              onError={() => setHeroImgError(true)}
            />
          </div>
        ) : project.hasVisualization ? (
          <div className="detail-visualization-wrapper">
            <ClusterVisualization />
          </div>
        ) : (
          <ProjectPlaceholder
            projectName={project.title}
            subtext="PRIMARY COVER ASSET"
          />
        )}
      </section>

      {/* Interactive clustering canvas demo for STRET */}
      {project.hasVisualization && primaryHeroImage && !heroImgError && (
        <section className="container-wide detail-section" aria-label="Interactive demo">
          <h2 className="detail-section-label">INTERACTIVE CLUSTERING VISUALIZATION</h2>
          <div className="detail-visualization-wrapper">
            <ClusterVisualization />
          </div>
        </section>
      )}

      {/* Structured Content Grid */}
      <div className="container-wide project-detail-content-layout">
        {/* Left Column: Narrative Sections */}
        <div className="project-detail-narrative">
          {/* Overview */}
          {project.description && (
            <section className="detail-section" aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="detail-section-label">
                PROJECT OVERVIEW
              </h2>
              <p className="detail-text">{project.description}</p>
            </section>
          )}

          {/* Role & Team */}
          {project.role && project.role.length > 0 && (
            <section className="detail-section" aria-labelledby="role-heading">
              <h2 id="role-heading" className="detail-section-label">
                MY ROLE
              </h2>
              <p className="detail-text-highlight">
                {project.role.join(' · ')}
              </p>
            </section>
          )}

          {/* Responsibilities / What I Did */}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <section
              className="detail-section"
              aria-labelledby="responsibilities-heading"
            >
              <h2 id="responsibilities-heading" className="detail-section-label">
                KEY RESPONSIBILITIES
              </h2>
              <ul className="detail-numbered-list" role="list">
                {project.responsibilities.map((resp, i) => (
                  <li key={i} className="detail-numbered-item">
                    <span className="item-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="item-text">{resp}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Impact */}
          {project.impact && (
            <section className="detail-section" aria-labelledby="impact-heading">
              <h2 id="impact-heading" className="detail-section-label">
                OUTCOME & IMPACT
              </h2>
              <p className="detail-text">{project.impact}</p>
            </section>
          )}

          {/* What I Learned */}
          {project.learned && (
            <section className="detail-section" aria-labelledby="learned-heading">
              <h2 id="learned-heading" className="detail-section-label">
                WHAT I LEARNED
              </h2>
              <p className="detail-text">{project.learned}</p>
            </section>
          )}
        </div>

        {/* Right Column: Metadata Sidebar */}
        <aside
          className="project-detail-sidebar detail-section"
          aria-label="Project technical specifications"
        >
          <div className="sidebar-sticky-card">
            <ProjectMeta
              role={project.role}
              tools={project.tools}
              year={project.year}
              type={project.type}
              client={project.client}
              duration={project.duration}
              team={project.team}
            />
          </div>
        </aside>
      </div>

      {/* Project Gallery (if multiple images exist) */}
      {project.images && project.images.length > 0 && (
        <section
          className="container-wide detail-section project-gallery-section"
          aria-labelledby="gallery-heading"
        >
          <h2 id="gallery-heading" className="detail-section-label">
            VISUAL SHOWCASE / GALLERY
          </h2>
          <div className="detail-gallery-grid">
            {project.images.map((imgSrc, i) => {
              const isError = galleryImgErrors[i];
              return (
                <div key={i} className="detail-gallery-card">
                  {!isError ? (
                    <img
                      src={imgSrc}
                      alt={`${project.title} presentation slide ${i + 1}`}
                      loading="lazy"
                      className="detail-gallery-img"
                      onError={() =>
                        setGalleryImgErrors((prev) => ({ ...prev, [i]: true }))
                      }
                    />
                  ) : (
                    <ProjectPlaceholder
                      projectName={`${project.title} #${i + 1}`}
                      subtext={`GALLERY ASSET ${String(i + 1).padStart(2, '0')}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom Pagination Navigator (Next / Prev Project) */}
      <nav
        className="project-navigator-section container-wide"
        aria-label="Project pagination"
      >
        <div className="navigator-grid">
          {prevProject ? (
            <Link
              to={`/project/${prevProject.id}`}
              className="nav-project-card prev"
              data-cursor-label="PREV"
            >
              <span className="nav-direction">← PREVIOUS WORK</span>
              <span className="nav-project-title">{prevProject.title}</span>
            </Link>
          ) : (
            <div className="nav-project-card placeholder" aria-hidden="true" />
          )}

          {nextProject ? (
            <Link
              to={`/project/${nextProject.id}`}
              className="nav-project-card next"
              data-cursor-label="NEXT"
            >
              <span className="nav-direction">NEXT WORK →</span>
              <span className="nav-project-title">{nextProject.title}</span>
            </Link>
          ) : (
            <Link
              to="/#work"
              className="nav-project-card next"
              data-cursor-label="HOME"
            >
              <span className="nav-direction">BACK TO ALL →</span>
              <span className="nav-project-title">EXPLORE WORKS</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
