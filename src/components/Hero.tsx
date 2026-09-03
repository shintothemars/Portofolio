// src/components/Hero.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import * as THREE from 'three';

// ─── Three.js Particle Field ────────────────────────────────────────────────
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 500;
  const { mouse } = useThree();
  const elapsedRef = useRef(0);

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    elapsedRef.current += delta;
    pointsRef.current.rotation.y = elapsedRef.current * 0.03 + mouse.x * 0.08;
    pointsRef.current.rotation.x = mouse.y * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#c8ff00"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Hero Component ──────────────────────────────────────────────────────────
interface HeroProps {
  loaded: boolean;
}

export default function Hero({ loaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!loaded) return;

    const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);
    const support = [
      subtitleRef.current,
      descRef.current,
      bottomRef.current,
      scrollHintRef.current,
    ].filter(Boolean);

    if (prefersReduced) {
      gsap.set([...lines, ...support], {
        opacity: 1,
        yPercent: 0,
        filter: 'blur(0px)',
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        lines,
        { yPercent: 105, opacity: 0, filter: 'blur(8px)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.1,
        }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          bottomRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [loaded, prefersReduced]);

  // Mouse parallax on hero text
  useEffect(() => {
    if (prefersReduced || !loaded) return;
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      const validLines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);
      if (validLines.length > 0) {
        gsap.to(validLines, {
          x: x * 8,
          y: y * 4,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.03,
        });
      }
    };

    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, [loaded, prefersReduced]);

  const hidden = { opacity: 0 };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section"
      aria-label="Introduction"
    >
      {/* Three.js background */}
      <div className="hero-canvas" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: false, alpha: true }}
          dpr={Math.min(window.devicePixelRatio, 1.5)}
          style={{ background: 'transparent' }}
        >
          <Particles />
        </Canvas>
      </div>

      {/* Main content */}
      <div className="hero-content">
        <div ref={subtitleRef} className="hero-subtitle" style={hidden}>
          <span>MACHINE LEARNING</span>
          <span style={{ margin: '0 16px', color: 'var(--text-muted)' }}>/</span>
          <span>WEB · MOBILE · UI/UX</span>
        </div>

        <h1 aria-label="Shinta Arum Imaniyah">
          <span className="hero-text-overflow">
            <span
              ref={line1Ref}
              className="hero-text"
              style={{ display: 'block', ...hidden }}
            >
              SHINTA
            </span>
          </span>
          <span className="hero-text-overflow">
            <span
              ref={line2Ref}
              className="hero-text"
              style={{ display: 'block', ...hidden }}
            >
              ARUM
            </span>
          </span>
          <span className="hero-text-overflow">
            <span
              ref={line3Ref}
              className="hero-text"
              style={{ display: 'block', ...hidden }}
            >
              IMANIYAH
            </span>
          </span>
        </h1>

        <p
          ref={descRef}
          style={{
            ...hidden,
            maxWidth: '480px',
            fontSize: 'clamp(14px, 1.6vw, 17px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginTop: '24px',
            fontWeight: 300,
          }}
        >
          Building intelligent digital products through machine learning,
          software engineering, and user-centered design.
        </p>
      </div>

      {/* Bottom bar */}
      <div ref={bottomRef} className="hero-bottom" style={hidden}>
        <div className="hero-meta">
          <span
            className="label"
            style={{ color: 'var(--text-muted)', fontSize: '10px' }}
          >
            LOCATION
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.1em',
            }}
          >
            Semarang, Indonesia
          </span>
        </div>
        <div className="hero-links">
          <a
            href="https://github.com/shintothemars"
            className="hero-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            data-cursor-label="GITHUB"
          >
            GitHub
          </a>
          <a
            href="mailto:shintaaa.arum@gmail.com"
            className="hero-link"
            aria-label="Send email"
            data-cursor-label="EMAIL"
          >
            Email
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="hero-scroll-hint"
        aria-hidden="true"
        style={hidden}
      >
        <div className="hero-scroll-line" />
        <span>SCROLL TO EXPLORE</span>
        <span style={{ color: 'var(--accent)' }}>↓</span>
      </div>
    </section>
  );
}
