// src/components/ProjectSection.tsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '../data/projects';
import ProjectGallery from './ProjectGallery';
import ProjectModal from './ProjectModal';
import ClusterVisualization from './ClusterVisualization';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

interface ProjectSectionProps {
  project: Project;
  reverse?: boolean;
}

export default function ProjectSection({
  project,
  reverse = false,
}: ProjectSectionProps) {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const numRef      = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const infoRef     = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLButtonElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current!;

    const textEls = [
      numRef.current,
      categoryRef.current,
      titleRef.current,
      descRef.current,
      infoRef.current,
      ctaRef.current,
    ].filter(Boolean);

    const imgEl = imageRef.current;

    gsap.set(textEls, { opacity: 0, y: 28 });
    gsap.set(imgEl, { opacity: 0, x: reverse ? -40 : 40 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(textEls, {
          opacity: 1, y: 0,
          duration: 0.9, ease: 'power3.out', stagger: 0.08,
        });
        gsap.to(imgEl, {
          opacity: 1, x: 0,
          duration: 1.1, ease: 'power3.out', delay: 0.1,
        });
      },
    });

    // Subtle parallax on image scroll
    gsap.to(imgEl, {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.8,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t: ScrollTrigger) => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, [reverse, prefersReduced]);

  useEffect(() => {
    if (!prefersReduced) return;
    gsap.set(
      [numRef.current, categoryRef.current, titleRef.current, descRef.current, infoRef.current, ctaRef.current],
      { opacity: 1, y: 0 }
    );
    gsap.set(imageRef.current, { opacity: 1, x: 0 });
  }, [prefersReduced]);

  return (
    <>
      <article
        ref={sectionRef}
        className="project-item container-wide"
        id={`project-${project.id}`}
      >
        {/* Project number */}
        <div ref={numRef} className="project-num">
          {project.num} / 05
        </div>

        <div className={`project-layout ${reverse ? 'reverse' : ''}`}>

          {/* ── LEFT: Text ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Category */}
            <div ref={categoryRef} className="project-category">
              <span>{project.category}</span>
              <span className="project-year">{project.year}</span>
            </div>

            {/* Title */}
            <h3 ref={titleRef} className="project-title" style={{ marginBottom: '20px' }}>
              {project.title}
              {project.titleLine2 && (
                <>
                  <br />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.62em', letterSpacing: '0.06em' }}>
                    {project.titleLine2}
                  </span>
                </>
              )}
            </h3>

            {/* Short description */}
            <p ref={descRef} className="project-description">
              {project.shortDesc}
            </p>

            {/* Compact info row: Role + Type */}
            <div ref={infoRef} style={{ marginTop: '4px', marginBottom: '28px' }}>
              {/* Role */}
              <div style={{ display: 'flex', gap: '32px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div>
                  <div className="project-meta-label" style={{ marginBottom: '5px' }}>Role</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {project.role.join(' · ')}
                  </div>
                </div>
                <div>
                  <div className="project-meta-label" style={{ marginBottom: '5px' }}>Project Type</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {project.type}
                  </div>
                </div>
              </div>

              {/* Tools tags */}
              <div>
                <div className="project-meta-label" style={{ marginBottom: '10px' }}>Tools</div>
                <div className="project-tools">
                  {project.tools.map((tool) => (
                    <span key={tool} className="tool-tag">{tool}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              ref={ctaRef}
              className="project-cta"
              onClick={() => setModalOpen(true)}
              aria-label={`View ${project.title} case study`}
              data-cursor-label="OPEN"
              style={{ alignSelf: 'flex-start' }}
            >
              VIEW CASE STUDY
              <span className="project-cta-arrow">↗</span>
            </button>
          </div>

          {/* ── RIGHT: Image / Visualization ── */}
          <div ref={imageRef}>
            <ProjectGallery
              images={project.images}
              projectName={project.title}
              hasVisualization={project.hasVisualization}
              visualizationSlot={
                project.hasVisualization ? <ClusterVisualization /> : undefined
              }
            />
          </div>
        </div>
      </article>

      {/* Modal */}
      {modalOpen && (
        <ProjectModal project={project} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
