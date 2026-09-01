// src/components/Navbar.tsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface NavbarProps {
  loaded: boolean;
}

export default function Navbar({ loaded }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Reveal navbar after loader
  useEffect(() => {
    if (!loaded) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
    );
  }, [loaded]);

  // Scrolled state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={navRef}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{ opacity: 0 }}
    >
      {/* Logo */}
      <a
        href="/"
        className="navbar-logo"
        aria-label="Shinta Arum Imaniyah"
      >
        SHINTA<sup>®</sup>
      </a>

      {/* Desktop nav */}
      <nav aria-label="Main navigation">
        <ul
          className={`navbar-links ${menuOpen ? 'open' : ''}`}
          role="list"
        >
          <li>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('work');
              }}
            >
              WORK
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('about');
              }}
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('contact');
              }}
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
