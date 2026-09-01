// src/animations/textAnimations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits a text element's children into overflow-hidden spans for reveal
 * Expects: each child with class `.hero-text-overflow` containing text
 */
export function revealLines(
  lines: Element[],
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) {
  const {
    delay = 0,
    stagger = 0.1,
    duration = 1.1,
    ease = 'power4.out',
    scrollTrigger,
  } = options;

  return gsap.fromTo(
    lines,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration,
      ease,
      stagger,
      delay,
      scrollTrigger,
    }
  );
}

/**
 * Fade + slide up animation for block elements
 */
export function fadeUp(
  elements: Element | Element[] | string,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) {
  const {
    delay = 0,
    stagger = 0.08,
    duration = 0.9,
    scrollTrigger,
  } = options;

  return gsap.fromTo(
    elements,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      ease: 'power3.out',
      stagger,
      delay,
      scrollTrigger,
    }
  );
}

/**
 * Counter animation from 0 to target
 */
export function animateCounter(
  element: Element,
  target: number,
  duration = 2.5
) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = String(Math.round(obj.val)).padStart(2, '0');
    },
  });
}
