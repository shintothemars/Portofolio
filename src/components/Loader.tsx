// src/components/Loader.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current!;
    const counter = counterRef.current!;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(overlay, { opacity: 0, pointerEvents: 'none' });
      onComplete();
      return;
    }

    // Prevent body scroll during loader
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      },
    });

    // Counter animation
    const obj = { val: 0 };

    tl.set(overlay, { opacity: 1 })
      .fromTo(
        [line1Ref.current, line2Ref.current],
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out' }
      )
      .to(
        obj,
        {
          val: 100,
          duration: 1.8,
          ease: 'power2.inOut',
          onUpdate() {
            if (counter) {
              counter.textContent = String(Math.round(obj.val)).padStart(
                2,
                '0'
              );
            }
          },
        },
        '-=0.5'
      )
      // Slide the overlay out
      .to(overlay, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.2,
      });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="loader-overlay"
      aria-hidden="true"
      style={{ opacity: 1 }}
    >
      {/* Name */}
      <div className="loader-name" style={{ color: 'var(--text-primary)' }}>
        <span className="loader-name-line">
          <span
            ref={line1Ref}
            style={{ display: 'inline-block', transform: 'translateY(110%)' }}
          >
            SHINTA ARUM
          </span>
        </span>
        <span className="loader-name-line">
          <span
            ref={line2Ref}
            style={{ display: 'inline-block', transform: 'translateY(110%)' }}
          >
            IMANIYAH
          </span>
        </span>
      </div>

      {/* Vertical line */}
      <div
        style={{
          width: '1px',
          height: '48px',
          background: 'var(--border)',
        }}
      />

      {/* Counter */}
      <div className="loader-counter">
        <span ref={counterRef}>00</span>
      </div>
    </div>
  );
}
