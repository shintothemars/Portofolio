// src/pages/Home.tsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ProjectFilter from '../components/ProjectFilter';
import ProjectSection from '../components/ProjectSection';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import {
  getPublishedProjects,
  getAllCategories,
  type Project,
} from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  loaded: boolean;
}

export default function Home({ loaded }: HomeProps) {
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const allProjects = useMemo(() => getPublishedProjects(), []);
  const categories = useMemo(() => getAllCategories(allProjects), [allProjects]);

  // Compute count of projects for each category
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: allProjects.length,
    };

    categories.forEach((cat) => {
      if (cat === 'ALL') return;
      counts[cat] = allProjects.filter((p) =>
        p.categories.some(
          (c) => c.toLowerCase() === cat.toLowerCase()
        )
      ).length;
    });

    return counts;
  }, [allProjects, categories]);

  // Filter projects according to active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') {
      return allProjects;
    }
    return allProjects.filter((p) =>
      p.categories.some(
        (c) => c.toLowerCase() === activeCategory.toLowerCase()
      )
    );
  }, [allProjects, activeCategory]);

  // Refresh ScrollTrigger when filter updates
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [activeCategory]);

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

      {/* About Me (Right below Hero) */}
      <About />

      {/* Selected Works */}
      <section
        id="work"
        className="works-section"
        aria-label="Selected works"
      >
        <div className="container-wide">
          <SectionTitle number="02" title="SELECTED" titleLine2="WORKS" />

          {/* Interactive Dynamic Filter */}
          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            projectCounts={projectCounts}
          />
        </div>

        {/* Dynamic Project Feed */}
        <ProjectSection projects={filteredProjects} />
      </section>

      {/* Skills */}
      <Skills />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}
