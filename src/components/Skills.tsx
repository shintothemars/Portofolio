// src/components/Skills.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from './SectionTitle';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Machine Learning',
    items: ['Python', 'TensorFlow / Keras', 'PyTorch', 'CNN', 'Google Colab', 'Machine Learning'],
  },
  {
    title: 'Web',
    items: ['React', 'JavaScript', 'HTML', 'CSS', 'Flask', 'Streamlit'],
  },
  {
    title: 'Mobile',
    items: ['Flutter', 'Android'],
  },
  {
    title: 'Design',
    items: ['Figma', 'UI/UX Design'],
  },
  {
    title: 'Game',
    items: ['Unity', 'Educational Game Design'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const cards = gridRef.current?.querySelectorAll('.skill-category');
    if (!cards) return;

    gsap.set(cards, { opacity: 0, y: 24 });

    ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
        });
      },
    });
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 'clamp(80px, 12vw, 160px)',
        paddingBottom: 'clamp(80px, 12vw, 160px)',
      }}
      aria-label="Skills and technologies"
    >
      <div className="container-wide">
        <SectionTitle number="03" title="SKILLS" titleLine2="& TECH" />

        <div ref={gridRef} className="skills-grid">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="skill-category"
              style={{ opacity: prefersReduced ? 1 : 0 }}
            >
              <div className="skill-category-title">{cat.title}</div>
              <ul className="skill-list" role="list">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
