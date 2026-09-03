// src/components/Navbar.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

interface NavbarProps {
  loaded: boolean;
}

export default function Navbar({ loaded }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Reveal navbar after loader
  useEffect(() => {
    if (!loaded) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
    );
  }, [loaded]);

  // Scrolled state detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      ref={navRef}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{ opacity: loaded ? 1 : 0 }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="navbar-logo"
        aria-label="Shinta Arum Imaniyah homepage"
        data-cursor-label="HOME"
      >
        SHINTA<span className="navbar-logo-accent">.</span><sup>®</sup>
      </Link>

      {/* Desktop nav */}
      <nav aria-label="Main navigation">
        <ul
          className={`navbar-links ${menuOpen ? 'open' : ''}`}
          role="list"
        >
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              data-cursor-label="ABOUT"
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('work');
              }}
              data-cursor-label="WORK"
            >
              WORK
            </a>
          </li>
          <li>
            <a
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('skills');
              }}
              data-cursor-label="SKILLS"
            >
              SKILLS
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              data-cursor-label="CONTACT"
            >
              CONTACT
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile menu toggle */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        style={{ zIndex: 200 }}
      >
        <span
          style={{
            transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
          }}
        />
        <span style={{ opacity: menuOpen ? 0 : 1 }} />
        <span
          style={{
            transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
          }}
        />
      </button>
    </header>
  );
}
