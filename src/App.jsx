import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SparkleBackground from './components/SparkleBackground';
import AudioPlayer from './components/AudioPlayer';
import Navigation from './components/Navigation';

import WelcomePage from './pages/WelcomePage';
import GalleryPage from './pages/GalleryPage';
import PhotoboothPage from './pages/PhotoboothPage';
import CakePage from './pages/CakePage';
import LetterPage from './pages/LetterPage';

// Hash routes mapping to page numbers 1-5
const HASH_MAP = {
  '#/welcome': 1,
  '#/gallery': 2,
  '#/photobooth': 3,
  '#/cake': 4,
  '#/letter': 5
};

const PAGE_TO_HASH = {
  1: '#/welcome',
  2: '#/gallery',
  3: '#/photobooth',
  4: '#/cake',
  5: '#/letter'
};

export default function App() {
  const getInitialPage = () => {
    const hash = window.location.hash;
    return HASH_MAP[hash] || 1;
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Sync hash changes with state
  useEffect(() => {
    const handleHashChange = () => {
      const page = HASH_MAP[window.location.hash];
      if (page && page !== currentPage) {
        setCurrentPage(page);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  // Navigate handler that updates both state and URL hash
  const navigateTo = (pageNum) => {
    const clamped = Math.max(1, Math.min(5, pageNum));
    setCurrentPage(clamped);
    const targetHash = PAGE_TO_HASH[clamped];
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Background Floating Ambient Sparkles (✦ ♡ ✿) */}
      <SparkleBackground />

      {/* Floating Ambient Music & Sound Effects Player */}
      <AudioPlayer />

      {/* Page View with Cinematic Transition */}
      <main style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {currentPage === 1 && (
            <WelcomePage 
              key="page-welcome" 
              onNext={() => navigateTo(2)} 
            />
          )}

          {currentPage === 2 && (
            <GalleryPage 
              key="page-gallery" 
              onNext={() => navigateTo(3)} 
              onBack={() => navigateTo(1)} 
            />
          )}

          {currentPage === 3 && (
            <PhotoboothPage 
              key="page-photobooth" 
              onNext={() => navigateTo(4)} 
              onBack={() => navigateTo(2)} 
            />
          )}

          {currentPage === 4 && (
            <CakePage 
              key="page-cake" 
              onNext={() => navigateTo(5)} 
              onBack={() => navigateTo(3)} 
            />
          )}

          {currentPage === 5 && (
            <LetterPage 
              key="page-letter" 
              onRestart={() => navigateTo(1)} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Bottom Scrapbook Navigation Bar */}
      <Navigation 
        currentPage={currentPage}
        totalPages={5}
        onNavigate={navigateTo}
      />
    </div>
  );
}
