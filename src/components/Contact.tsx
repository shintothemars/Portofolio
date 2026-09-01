// src/components/Contact.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lines = headingRef.current?.querySelectorAll('.contact-heading-line > span');
    if (!lines) return;

    gsap.set(lines, { yPercent: 100 });
    gsap.set(contentRef.current, { opacity: 0, y: 24 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to(lines, {
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.08,
        });
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.3,
        });
      },
    });
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section container-wide"
      aria-label="Contact"
    >
      {/* Large heading */}
      <h2
        ref={headingRef}
        className="contact-heading"
        aria-label="Let's build something"
      >
        {["LET'S", 'BUILD', 'SOMETHING.'].map((word) => (
          <span key={word} className="contact-heading-line">
            <span
              style={{
                display: 'inline-block',
                ...(prefersReduced ? {} : { transform: 'translateY(100%)' }),
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h2>

      {/* Content */}
      <div
        ref={contentRef}
        style={{ opacity: prefersReduced ? 1 : 0 }}
      >
        {/* Email */}
        <div style={{ marginBottom: '32px' }}>
          <div
            className="label"
            style={{ marginBottom: '12px', color: 'var(--text-muted)' }}
          >
            EMAIL
          </div>
          <a
            href="mailto:shintaaa.arum@gmail.com"
            className="contact-email"
            aria-label="Send email to shintaaa.arum@gmail.com"
            data-cursor-label="EMAIL"
          >
            shintaaa.arum@gmail.com
          </a>
        </div>

        {/* CTA */}
        <a
          href="mailto:shintaaa.arum@gmail.com"
          className="contact-cta"
          aria-label="Get in touch via email"
          data-cursor-label="GO"
        >
          GET IN TOUCH
          <span>→</span>
        </a>

        {/* Links */}
        <div className="contact-links">
          <a
            href="https://github.com/shintothemars"
            className="contact-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            data-cursor-label="GITHUB"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
