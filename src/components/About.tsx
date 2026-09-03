// src/components/About.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from './SectionTitle';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const interests = [
  'Machine Learning',
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Educational Technology',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set([leftRef.current, rightRef.current], { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          if (!leftRef.current || !rightRef.current) return;
          gsap.to([leftRef.current, rightRef.current], {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 'clamp(80px, 12vw, 100px)',
        paddingBottom: 'clamp(80px, 12vw, 160px)',
      }}
      aria-label="About me"
    >
      <div className="container-wide">
        <SectionTitle number="01" title="ABOUT ME" />

        <div className="about-layout">
          {/* Left — main statement + interests */}
          <div ref={leftRef} style={{ opacity: prefersReduced ? 1 : 0 }}>
            <p className="about-text">
              An <strong>Informatics graduate</strong> from Semarang, Indonesia,
              passionate about machine learning, mobile development, UI/UX
              design, and building meaningful digital products.
            </p>
            <p
              className="about-text"
              style={{ marginTop: '24px', fontSize: 'clamp(15px, 2vw, 20px)' }}
            >
              Building intelligent digital products through machine learning,
              software engineering, and user-centered design.
            </p>

            <ul
              className="about-interests"
              aria-label="Areas of interest"
              style={{ marginTop: '48px' }}
            >
              {interests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Right — details */}
          <div
            ref={rightRef}
            className="about-right"
            style={{ opacity: prefersReduced ? 1 : 0 }}
          >
            <div className="about-detail">
              <div className="about-detail-label">Background</div>
              <div className="about-detail-text">
                Informatics Graduate
                <br />
                Semarang, Indonesia
              </div>
            </div>

            <div className="about-detail">
              <div className="about-detail-label">Focus Areas</div>
              <div className="about-detail-text">
                Machine Learning & AI
                <br />
                Web & Mobile Development
                <br />
                UI/UX Design
                <br />
                Educational Technology
              </div>
            </div>

            <div className="about-detail">
              <div className="about-detail-label">Experience</div>
              <div className="about-detail-text">
                Bangkit Academy 2024 Capstone Project
                <br />
                PIMNAS Group Project
                <br />
                Freelance ML System Development
                <br />
                Final Academic Research
              </div>
            </div>

            <div className="about-detail">
              <div className="about-detail-label">Direct Contact</div>
              <div className="about-detail-text">
                <a
                  href="mailto:shintaaa.arum@gmail.com"
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '2px',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--accent)';
                    (e.target as HTMLElement).style.borderColor = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                    (e.target as HTMLElement).style.borderColor = 'var(--border)';
                  }}
                  data-cursor-label="EMAIL"
                >
                  shintaaa.arum@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
