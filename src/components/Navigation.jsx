import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

const PAGE_NAMES = [
  "Welcome",
  "Her Gallery",
  "Photobooth Strip",
  "Make a Wish",
  "The Letter"
];

export default function Navigation({ currentPage, totalPages = 5, onNavigate }) {
  // Allow keyboard navigation (arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentPage < totalPages) {
        sound.playSparkle();
        onNavigate(currentPage + 1);
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        sound.playSparkle();
        onNavigate(currentPage - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, onNavigate]);

  const handleNext = () => {
    sound.playSparkle();
    if (currentPage < totalPages) {
      onNavigate(currentPage + 1);
    } else {
      onNavigate(1); // loop back to start
    }
  };

  const handleBack = () => {
    sound.playSparkle();
    if (currentPage > 1) {
      onNavigate(currentPage - 1);
    }
  };

  const handleDotClick = (pageNumber) => {
    sound.playSparkle();
    onNavigate(pageNumber);
  };

  return (
    <nav className="bottom-nav-bar" aria-label="Page navigation">
      {/* Back Button */}
      {currentPage > 1 ? (
        <button 
          className="btn-secondary" 
          onClick={handleBack}
          style={{ padding: '8px 16px', fontSize: '13px' }}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>
      ) : (
        <div style={{ width: '80px' }} /> // spacer for balance
      )}

      {/* Page Dots */}
      <div className="nav-dots" role="tablist" aria-label="Pages">
        {PAGE_NAMES.map((name, idx) => {
          const pageNum = idx + 1;
          const isActive = pageNum === currentPage;
          return (
            <button
              key={name}
              role="tab"
              aria-selected={isActive}
              aria-label={`Page ${pageNum}: ${name}`}
              className={`nav-dot ${isActive ? 'active' : ''}`}
              onClick={() => handleDotClick(pageNum)}
              title={`Page ${pageNum}: ${name}`}
            />
          );
        })}
      </div>

      {/* Next or Replay Button */}
      {currentPage < totalPages ? (
        <button 
          className="btn-primary" 
          onClick={handleNext}
          style={{ padding: '8px 18px', fontSize: '13px' }}
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      ) : (
        <button 
          className="btn-secondary" 
          onClick={() => { sound.playSparkle(); onNavigate(1); }}
          style={{ padding: '8px 16px', fontSize: '13px' }}
          aria-label="Replay journey from beginning"
        >
          <RotateCcw size={14} />
          <span>Start Over</span>
        </button>
      )}
    </nav>
  );
}
