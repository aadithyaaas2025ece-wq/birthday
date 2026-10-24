import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Mail } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../birthdayConfig';
import { sound } from '../utils/audio';

export default function LetterPage({ onRestart }) {
  const { letter, yourName } = BIRTHDAY_CONFIG;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    sound.playEnvelopeOpen();
    setIsOpen(true);
    
    // Gentle floating confetti
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#d97996', '#f6dce2', '#fff8f0']
      });
    }, 400);
  };

  const handleCelebrateAgain = () => {
    sound.playCelebration();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#d97996', '#a84d6b', '#f6dce2', '#d4af37', '#fff8f0']
    });
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
      <div style={{ textAlign: 'center', marginBottom: '24px', maxWidth: '640px' }}>
        <div className="tiny-label" style={{ marginBottom: '8px' }}>
          PAGE 05 • THE FINAL CHAPTER
        </div>
        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'clamp(28px, 5.5vw, 44px)', 
          color: 'var(--deep-pink)', 
          fontWeight: 'normal',
          marginBottom: '8px'
        }}>
          {letter.pageTitle}
        </h2>
        <p style={{ 
          fontFamily: 'var(--font-serif)', 
          color: 'var(--ink-light)', 
          fontSize: 'clamp(14px, 2vw, 17px)',
          lineHeight: '1.6'
        }}>
          {letter.pageSubtitle}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Sealed Envelope Screen */
          <motion.div
            key="envelope-closed"
            className="envelope-wrapper"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={handleOpenEnvelope}
          >
            <div className="envelope-closed">
              {/* Washi tape on envelope corner */}
              <div 
                className="washi-tape top-left" 
                style={{ backgroundColor: 'var(--washi-tape-1)' }} 
              />
              
              {/* Wax Seal with Heart */}
              <motion.div 
                className="wax-seal"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>♡</span>
              </motion.div>

              <h3 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(20px, 3.8vw, 28px)', 
                color: 'var(--deep-pink)', 
                fontWeight: 'normal',
                marginBottom: '10px'
              }}>
                {letter.envelopeLabel}
              </h3>

              <div style={{ 
                fontFamily: 'var(--font-hand)', 
                fontSize: '22px', 
                color: '#8c606e' 
              }}>
                {letter.envelopeSubtext}
              </div>

              <div style={{ marginTop: '22px' }}>
                <button 
                  className="btn-primary" 
                  onClick={handleOpenEnvelope}
                  style={{ gap: '8px' }}
                >
                  <Mail size={16} />
                  <span>Break Seal & Read Letter</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Unfolded Parchment Paper Letter */
          <motion.div
            key="envelope-opened"
            className="letter-parchment"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* Washi tape at top of the letter */}
            <div 
              className="washi-tape top-center" 
              style={{ backgroundColor: 'var(--washi-tape-2)', width: '120px' }} 
            />

            {/* Letter Date Stamp */}
            <div style={{ 
              textAlign: 'right', 
              fontFamily: 'var(--font-sans)', 
              fontSize: '11px', 
              letterSpacing: '0.15em', 
              color: '#a87886', 
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              {letter.date}
            </div>

            {/* Letter Prose Paragraphs */}
            <div className="letter-content">
              {letter.paragraphs.map((para, idx) => (
                <p key={idx}>
                  {para}
                </p>
              ))}

              {/* Poem Stanza (Exact 4 lines preserved with line breaks) */}
              {letter.poem && (
                <div style={{
                  margin: '28px 0',
                  paddingLeft: '18px',
                  borderLeft: '2px solid rgba(217, 121, 150, 0.4)',
                  fontStyle: 'italic',
                  lineHeight: '1.9',
                  color: 'var(--ink)'
                }}>
                  {letter.poem.map((line, idx) => (
                    <div key={idx} style={{ minHeight: '1.5em' }}>
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sincere, Understated Signature: "Always in your corner, Aadi" */}
            <div className="letter-signature-wrap" style={{ marginTop: '36px', textAlign: 'right' }}>
              <div className="letter-closing" style={{ fontStyle: 'italic', fontSize: '17px', color: 'var(--ink-light)' }}>
                {letter.closing}
              </div>
              <div 
                className="letter-sign-name"
                style={{ 
                  fontFamily: 'var(--font-hand)', 
                  fontSize: '32px', 
                  color: 'var(--deep-pink)', 
                  marginTop: '4px' 
                }}
              >
                {letter.signature || yourName}
              </div>
            </div>

            {/* Action Buttons at bottom of letter */}
            <div style={{ 
              marginTop: '40px', 
              paddingTop: '24px', 
              borderTop: '1px solid rgba(217, 121, 150, 0.2)', 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '14px' 
            }}>
              <button 
                className="btn-primary" 
                onClick={handleCelebrateAgain}
                style={{ gap: '8px' }}
              >
                <Sparkles size={16} />
                <span>Celebrate Again 🎉</span>
              </button>

              <button 
                className="btn-secondary" 
                onClick={() => {
                  sound.playSparkle();
                  onRestart();
                }}
                style={{ gap: '8px' }}
              >
                <RotateCcw size={15} />
                <span>Replay Our Little World ↺</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
