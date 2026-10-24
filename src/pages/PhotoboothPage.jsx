import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Info, Camera } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../birthdayConfig';
import { sound } from '../utils/audio';

export default function PhotoboothPage({ onNext, onBack }) {
  const { photobooth } = BIRTHDAY_CONFIG;
  const [activePhoto, setActivePhoto] = useState(null);

  // Exactly three photos as required
  const photos = photobooth.photos.slice(0, 3);

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '22px', maxWidth: '600px' }}>
        <div className="tiny-label" style={{ marginBottom: '8px' }}>
          PAGE 03 • OUR MEMORIES
        </div>
        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'clamp(28px, 5.5vw, 44px)', 
          color: 'var(--deep-pink)', 
          fontWeight: 'normal',
          marginBottom: '8px'
        }}>
          {photobooth.pageTitle}
        </h2>
        <p style={{ 
          fontFamily: 'var(--font-serif)', 
          color: 'var(--ink-light)', 
          fontSize: 'clamp(14px, 2vw, 17px)',
          lineHeight: '1.6'
        }}>
          {photobooth.pageSubtitle}
        </p>
      </div>

      {/* Photobooth Strip Container */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          className="photobooth-strip"
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          whileHover={{ rotate: 0, scale: 1.01 }}
        >
          {/* Washi tape pinning the strip to the scrapbook */}
          <div 
            className="washi-tape top-center"
            style={{ 
              backgroundColor: 'var(--washi-tape-2)', 
              width: '100px',
              top: '-14px'
            }}
          />

          {/* Strip Top Header / Brand */}
          <div className="photobooth-header">
            {photobooth.stripHeader || "★ BEST FRIENDS PHOTOBOOTH • THREE MOMENTS ★"}
          </div>

          {/* Exactly Three Photos (Vertical Alignment) */}
          <div className="photobooth-slots">
            {photos.map((item, index) => (
              <div 
                key={item.id} 
                style={{ position: 'relative' }}
                onClick={() => {
                  sound.playSparkle();
                  setActivePhoto(activePhoto === index ? null : index);
                }}
              >
                <div className="photobooth-photo-frame">
                  <img 
                    src={item.src} 
                    alt={`Photobooth capture ${index + 1}: ${item.caption}`}
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
                        <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:12px; text-align:center; color:#ddd; font-family:sans-serif; background:#222;">
                          <span style="font-size:24px;">🎞️</span>
                          <span style="font-size:11px; color:#ddd; margin-top:4px;">Us ♡</span>
                        </div>
                      `;
                    }}
                  />
                  {/* Photo Label (01, 02, 03) */}
                  <div className="photobooth-photo-label">
                    {item.label}
                  </div>
                </div>

                {/* Subtitle / tooltip for each photo */}
                <div style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-sans)',
                  color: '#7b5e68',
                  marginTop: '4px',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  {item.caption}
                </div>
              </div>
            ))}
          </div>

          {/* Strip Footer & Handwritten Caption */}
          <div className="photobooth-footer">
            <div className="photobooth-handwriting">
              {photobooth.handwrittenCaption}
            </div>
            <div className="photobooth-datestamp">
              {photobooth.dateStamp}
            </div>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}
