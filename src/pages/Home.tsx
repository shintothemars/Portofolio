// src/pages/Home.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ProjectSection from '../components/ProjectSection';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  loaded: boolean;
}

export default function Home({ loaded }: HomeProps) {
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  // Scroll progress bar
  useEffect(() => {
    const bar = scrollProgressRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={scrollProgressRef}
        className="scroll-progress"
        aria-hidden="true"
        style={{ width: '100%' }}
      />

      {/* Hero */}
      <Hero loaded={loaded} />

      {/* Divider */}
      <div
        className="h-divider container-wide"
        style={{ margin: '0 auto' }}
      />

      {/* Selected Works */}
      <section
        id="work"
        className="works-section"
        aria-label="Selected works"
      >
        <div className="container-wide">
          <SectionTitle number="01" title="SELECTED" titleLine2="WORKS" />
        </div>

        {projects.map((project, i) => (
          <ProjectSection
            key={project.id}
            project={project}
            reverse={i % 2 !== 0}
          />
        ))}
      </section>

      {/* About */}
      <About />

      {/* Skills */}
      <Skills />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}
