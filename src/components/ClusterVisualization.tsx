// src/components/ClusterVisualization.tsx
// Abstract animated clustering visualization for STRET project
// Pure CSS + canvas — no Three.js needed for this

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  cluster: number;
  r: number;
}

const CLUSTER_COLORS = ['#c8ff00', '#44b3ff', '#ff6b9d', '#ffb347'];
const CLUSTER_CENTERS = [
  { x: 0.25, y: 0.4 },
  { x: 0.65, y: 0.3 },
  { x: 0.45, y: 0.7 },
  { x: 0.75, y: 0.65 },
];

function createPoints(w: number, h: number): Point[] {
  const pts: Point[] = [];
  for (let c = 0; c < CLUSTER_CENTERS.length; c++) {
    const cx = CLUSTER_CENTERS[c].x * w;
    const cy = CLUSTER_CENTERS[c].y * h;
    const count = 28 + Math.floor(Math.random() * 15);
    for (let i = 0; i < count; i++) {
      const spread = Math.min(w, h) * 0.13;
      pts.push({
        x: cx + (Math.random() - 0.5) * spread * 2,
        y: cy + (Math.random() - 0.5) * spread * 2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        cluster: c,
        r: 2.5 + Math.random() * 2,
      });
    }
  }
  return pts;
}

export default function ClusterVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    let pts = createPoints(w, h);
    let animId: number;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = 'rgba(200,255,0,0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw cluster center crosses
      CLUSTER_CENTERS.forEach((c, i) => {
        const cx = c.x * w;
        const cy = c.y * h;
        ctx.strokeStyle = CLUSTER_COLORS[i];
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1;
        const size = 8;
        ctx.beginPath();
        ctx.moveTo(cx - size, cy);
        ctx.lineTo(cx + size, cy);
        ctx.moveTo(cx, cy - size);
        ctx.lineTo(cx, cy + size);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw connection lines between nearby same-cluster points
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          if (pts[i].cluster !== pts[j].cluster) continue;
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.strokeStyle = CLUSTER_COLORS[pts[i].cluster];
            ctx.globalAlpha = (1 - dist / 60) * 0.12;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Draw points
      pts.forEach((p) => {
        const color = CLUSTER_COLORS[p.cluster];
        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, color + '55');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Label clusters
      CLUSTER_CENTERS.forEach((c, i) => {
        ctx.font = `10px 'DM Mono', monospace`;
        ctx.fillStyle = CLUSTER_COLORS[i];
        ctx.globalAlpha = 0.5;
        ctx.letterSpacing = '0.1em';
        ctx.fillText(`CLUSTER ${i + 1}`, c.x * w + 12, c.y * h - 10);
        ctx.globalAlpha = 1;
      });

      if (!prefersReduced) {
        // Animate points
        pts.forEach((p) => {
          const cx = CLUSTER_CENTERS[p.cluster].x * w;
          const cy = CLUSTER_CENTERS[p.cluster].y * h;
          // Gentle attraction to cluster center
          p.vx += (cx - p.x) * 0.00008;
          p.vy += (cy - p.y) * 0.00008;
          // Add subtle noise
          p.vx += (Math.random() - 0.5) * 0.04;
          p.vy += (Math.random() - 0.5) * 0.04;
          // Damping
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.x += p.vx;
          p.y += p.vy;
        });
      }

      frame++;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
      pts = createPoints(canvas.offsetWidth, canvas.offsetHeight);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [prefersReduced]);

  return (
    <div
      style={{
        width: '100%',
        height: 'clamp(280px, 40vw, 420px)',
        position: 'relative',
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="Abstract K-Means clustering visualization for STRET project"
      />
      {/* Labels overlay */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.15em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}
      >
        K-MEANS VISUALIZATION — ABSTRACT
      </div>
    </div>
  );
}
