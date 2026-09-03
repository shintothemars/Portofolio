// src/App.tsx
import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Initialize Lenis smooth scroll (synced with GSAP ScrollTrigger)
  useLenis();

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <BrowserRouter>
      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Loading screen */}
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Global persistent header navigation */}
      <Navbar loaded={loaded} />

      {/* Main routed content */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home loaded={loaded} />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
