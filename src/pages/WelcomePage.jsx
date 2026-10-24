import React from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../birthdayConfig';
import { sound } from '../utils/audio';

export default function WelcomePage({ onNext }) {
  const { welcome } = BIRTHDAY_CONFIG;

  const handleStart = () => {
    sound.playSparkle();
    onNext();
  };

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.985 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <section className="welcome-cover" aria-labelledby="birthday-title">
        {/* Pulsing heart from index (5).html */}
        <div className="heart-pulsing" aria-hidden="true">♡</div>

        {/* Tiny uppercase label */}
        <div className="tiny-label">{welcome.tinyLabel}</div>

        {/* Main birthday greeting */}
        <h1 id="birthday-title" className="main-title" style={{ whiteSpace: 'pre-line' }}>
          {welcome.title}
        </h1>

        {/* Subtitle */}
        <p className="subtitle-text">
          {welcome.subtitle}
        </p>

        {/* Interactive "Open your little world" button */}
        <button 
          className="btn-primary"
          onClick={handleStart}
          aria-label="Open your little world and go to her photo gallery"
        >
          <span>{welcome.buttonText}</span>
          <span aria-hidden="true" style={{ fontSize: '18px' }}>→</span>
        </button>

        {/* Signature */}
        <div className="signature-note">
          {welcome.signature}
        </div>
      </section>
    </motion.div>
  );
}
