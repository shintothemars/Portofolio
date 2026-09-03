// src/components/ProjectCard.tsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '../data/projects';
import ProjectGallery from './ProjectGallery';
import ClusterVisualization from './ClusterVisualization';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  reverse?: boolean;
}

export default function ProjectCard({
  project,
  index,
  total,
  reverse = false,
}: ProjectCardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const formattedNum = String(index + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    if (!section) return;

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
    if (imgEl) {
      gsap.set(imgEl, { opacity: 0, x: reverse ? -40 : 40 });
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(textEls, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
        });
        if (imgEl) {
          gsap.to(imgEl, {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: 'power3.out',
            delay: 0.1,
          });
        }
      },
    });

    // Subtle parallax on image scroll
    let parallaxTween: gsap.core.Tween | null = null;
    if (imgEl) {
      parallaxTween = gsap.to(imgEl, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      });
    }

    return () => {
      st.kill();
      if (parallaxTween) parallaxTween.kill();
    };
  }, [reverse, prefersReduced]);

  useEffect(() => {
    if (!prefersReduced) return;
    gsap.set(
      [
        numRef.current,
        categoryRef.current,
        titleRef.current,
        descRef.current,
        infoRef.current,
        ctaRef.current,
      ],
      { opacity: 1, y: 0 }
    );
    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 1, x: 0 });
    }
  }, [prefersReduced]);

  return (
    <article
      ref={sectionRef}
      className="project-item container-wide"
      id={`project-${project.id}`}
      aria-label={`${project.title} project`}
    >
      {/* Project number dynamic calculation */}
      <div ref={numRef} className="project-num">
        {formattedNum} / {formattedTotal}
      </div>

      <div className={`project-layout ${reverse ? 'reverse' : ''}`}>
        {/* ── LEFT: Typography & Details ── */}
        <div className="project-content-col">
          {/* Category & Year */}
          <div ref={categoryRef} className="project-category">
            <span>{project.categories.join(' · ')}</span>
            <span className="project-year">{project.year}</span>
          </div>

          {/* Title */}
          <h3 ref={titleRef} className="project-title">
            <Link
              to={`/project/${project.id}`}
              className="project-title-link"
              data-cursor-label="VIEW"
            >
              {project.title}
              {project.titleLine2 && (
                <>
                  <br />
                  <span className="project-title-sub">
                    {project.titleLine2}
                  </span>
                </>
              )}
            </Link>
          </h3>

          {/* Short description */}
          <p ref={descRef} className="project-description">
            {project.description}
          </p>

          {/* Compact info row: Role + Type */}
          <div ref={infoRef} className="project-info-row">
            <div className="project-meta-badges">
              {project.role && project.role.length > 0 && (
                <div>
                  <div className="project-meta-label">Role</div>
                  <div className="project-meta-text">
                    {project.role.join(' · ')}
                  </div>
                </div>
              )}
              {project.type && (
                <div>
                  <div className="project-meta-label">Project Type</div>
                  <div className="project-meta-text">{project.type}</div>
                </div>
              )}
            </div>

            {/* Tools tags */}
            {project.tools && project.tools.length > 0 && (
              <div className="project-tools-block">
                <div className="project-meta-label">Tools</div>
                <div className="project-tools">
                  {project.tools.map((tool) => (
                    <span key={tool} className="tool-tag">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA Link to Route */}
          <div ref={ctaRef} className="project-cta-wrapper">
            <Link
              to={`/project/${project.id}`}
              className="project-cta"
              aria-label={`View ${project.title} case study`}
              data-cursor-label="OPEN"
            >
              VIEW CASE STUDY
              <span className="project-cta-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Image / Interactive Slot ── */}
        <div ref={imageRef} className="project-visual-col">
          <ProjectGallery
            images={project.images}
            coverImage={project.coverImage}
            projectName={project.title}
            projectId={project.id}
            hasVisualization={project.hasVisualization}
            visualizationSlot={
              project.hasVisualization ? <ClusterVisualization /> : undefined
            }
          />
        </div>
      </div>
    </article>
  );
}
