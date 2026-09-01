// src/components/CustomCursor.tsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useIsMobile } from '../hooks/useMediaQuery';

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // Smooth ring follow
    const loop = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      rafId = requestAnimationFrame(loop);
    };

    let rafId = requestAnimationFrame(loop);

    const onEnterLink = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const label = target.dataset.cursorLabel || 'VIEW';
      setCursorLabel(label);
      setExpanded(true);
    };

    const onLeaveLink = () => {
      setCursorLabel('');
      setExpanded(false);
    };

    document.addEventListener('mousemove', onMove);

    // Attach to interactive elements
    const attachListeners = () => {
      const els = document.querySelectorAll(
        'a, button, .project-image-wrap, [data-cursor]'
      );
      els.forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink as EventListener);
        el.addEventListener('mouseleave', onLeaveLink);
      });
      return els;
    };

    let els = attachListeners();

    // Re-attach on DOM changes via MutationObserver
    const observer = new MutationObserver(() => {
      els.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink as EventListener);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
      els = attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      els.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink as EventListener);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className={`cursor-ring ${expanded ? 'cursor-expanded' : ''}`}
      />
      <div
        ref={labelRef}
        className={`cursor-label ${expanded ? 'cursor-expanded' : ''}`}
        style={{
          left: 0,
          top: 0,
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: expanded ? 1 : 0,
          transition: 'opacity 0.2s ease',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'var(--bg)',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
        }}
        // Follow dot position via JS — set same position
      >
        {cursorLabel}
      </div>
    </>
  );
}
