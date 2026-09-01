// src/App.tsx
import { useState, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
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
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Loading screen */}
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Navigation */}
      <Navbar loaded={loaded} />

      {/* Main content */}
      <main id="main-content">
        <Home loaded={loaded} />
      </main>
    </BrowserRouter>
  );
}
