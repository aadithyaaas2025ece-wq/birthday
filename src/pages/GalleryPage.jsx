import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../birthdayConfig';
import { sound } from '../utils/audio';

export default function GalleryPage({ onNext, onBack }) {
  const { herGallery, herName } = BIRTHDAY_CONFIG;
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openLightbox = (photo) => {
    sound.playSparkle();
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    sound.playSparkle();
    setSelectedPhoto(null);
  };

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px', maxWidth: '640px' }}>
        <div className="tiny-label" style={{ marginBottom: '8px' }}>
          PAGE 02 • HER SOLO GALLERY
        </div>
        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'clamp(28px, 5.5vw, 44px)', 
          color: 'var(--deep-pink)', 
          fontWeight: 'normal',
          marginBottom: '10px'
        }}>
          {herGallery.pageTitle || `Celebrating ${herName}`}
        </h2>
        <p style={{ 
          fontFamily: 'var(--font-serif)', 
          color: 'var(--ink-light)', 
          fontSize: 'clamp(14px, 2vw, 17px)',
          lineHeight: '1.6'
        }}>
          {herGallery.pageSubtitle}
        </p>
      </div>

      {/* Scrapbook Polaroid Grid (Her Photos Only) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 'clamp(20px, 3.5vw, 36px)',
        width: '100%',
        maxWidth: '920px',
        margin: '0 auto'
      }}>
        {herGallery.photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="polaroid-card"
            style={{ 
              transform: `rotate(${photo.rotation || '0deg'})`,
              zIndex: 1
            }}
            whileHover={{ scale: 1.03, y: -6, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLightbox(photo)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
          >
            {/* Scrapbook Washi Tape on Top */}
            <div 
              className="washi-tape top-center" 
              style={{ backgroundColor: photo.tapeColor || 'var(--washi-tape-1)' }}
            />

            {/* Photo Image Frame */}
            <div className="polaroid-image-wrap">
              <img 
                src={photo.src} 
                alt={photo.title || `Photo of ${herName}`} 
                loading="lazy"
                onError={(e) => {
                  const currentSrc = e.target.getAttribute('src') || '';
                  if (!e.target.dataset.triedAlt && currentSrc.endsWith('.jpg')) {
                    e.target.dataset.triedAlt = '1';
                    e.target.src = currentSrc.replace(/\.jpg$/, '.jpeg');
                    return;
                  }
                  if (e.target.dataset.triedAlt === '1') {
                    e.target.dataset.triedAlt = '2';
                    e.target.src = currentSrc.replace(/\.jpeg$/, '.jpg.jpeg');
                    return;
                  }
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `
                    <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:16px; text-align:center; color:#a84d6b;">
                      <span style="font-size:32px;">🌸</span>
                      <span style="font-size:12px; color:#a84d6b; margin-top:6px; font-family:serif; font-style:italic;">A Special Memory</span>
                    </div>
                  `;
                }}
              />
            </div>

            {/* Handwritten Polaroid Caption */}
            <div className="polaroid-caption">
              <div className="polaroid-title">{photo.title}</div>
              <div className="polaroid-sub">{photo.caption}</div>
              <div style={{
                marginTop: '6px',
                fontSize: '11px',
                fontFamily: 'var(--font-sans)',
                color: '#b17b8c',
                letterSpacing: '0.05em'
              }}>
                {photo.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeLightbox}
                style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '-14px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--deep-pink)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
                aria-label="Close photo preview"
              >
                <X size={18} />
              </button>

              <div style={{ borderRadius: '4px', overflow: 'hidden', maxHeight: '65vh' }}>
                <img 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.title} 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                />
              </div>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-hand)', fontSize: '26px', color: 'var(--ink)' }}>
                  {selectedPhoto.title}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--ink-light)', marginTop: '4px' }}>
                  {selectedPhoto.caption}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#b17b8c', marginTop: '6px' }}>
                  {selectedPhoto.date}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
