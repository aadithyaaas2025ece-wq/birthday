import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mic, MicOff, Sparkles, Heart, Flame } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../birthdayConfig';
import { sound } from '../utils/audio';

export default function CakePage({ onNext, onBack }) {
  const { cake, herName } = BIRTHDAY_CONFIG;
  const [isBlown, setIsBlown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [blowLevel, setBlowLevel] = useState(0); // 0 to 100
  const [micError, setMicError] = useState(null);
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Trigger celebration confetti and sound
  const extinguishCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    stopListening();
    sound.playBlowOut();

    // Trigger sweet celebration sound after short whoosh
    setTimeout(() => {
      sound.playCelebration();
    }, 250);

    // Confetti burst with pink, gold, cream, and rose
    const count = 200;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#d97996', '#a84d6b', '#f6dce2', '#d4af37', '#fff8f0']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  // Start microphone listener
  const startListening = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      });
      streamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.2;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListening(true);
      detectBlow();
    } catch (err) {
      console.warn("Microphone access error:", err);
      setMicError("Microphone access unavailable or denied. Please use the tap button below!");
      setIsListening(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setBlowLevel(0);
  };

  // Analyze microphone input for blow detection
  const detectBlow = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Blowing creates heavy low-frequency energy (bins 0 to 15, ~0 to 300Hz)
    let lowFreqSum = 0;
    const lowBins = 16;
    for (let i = 0; i < lowBins; i++) {
      lowFreqSum += dataArray[i];
    }
    const lowFreqAvg = lowFreqSum / lowBins;
    
    // Convert to percentage
    const level = Math.min(100, Math.round((lowFreqAvg / 180) * 100));
    setBlowLevel(level);

    // Blow threshold reached
    if (level > 45) {
      extinguishCandle();
      return;
    }

    animationFrameRef.current = requestAnimationFrame(detectBlow);
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px', maxWidth: '600px' }}>
        <div className="tiny-label" style={{ marginBottom: '8px' }}>
          PAGE 04 • MAKE A WISH
        </div>
        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'clamp(28px, 5.5vw, 44px)', 
          color: 'var(--deep-pink)', 
          fontWeight: 'normal',
          marginBottom: '8px'
        }}>
          {cake.pageTitle}
        </h2>
        <p style={{ 
          fontFamily: 'var(--font-serif)', 
          color: 'var(--ink-light)', 
          fontSize: 'clamp(14px, 2vw, 17px)',
          lineHeight: '1.6'
        }}>
          {isBlown 
            ? "Your wish has been cast into the stars! ✨" 
            : cake.pageSubtitle}
        </p>
      </div>

      {/* Birthday Cake Stage */}
      <div className="cake-stage">
        {/* The Candle */}
        <div 
          className="candle-container"
          onClick={!isBlown ? extinguishCandle : undefined}
          title={!isBlown ? "Click to blow out candle!" : "Candle extinguished"}
        >
          {/* Flame or Smoke */}
          {!isBlown ? (
            <motion.div 
              className="candle-flame"
              animate={{ 
                scale: isListening && blowLevel > 15 ? [1, 0.7, 1.2, 0.6] : [1, 1.05, 0.95, 1],
                skewX: isListening && blowLevel > 15 ? [0, 15, -15, 0] : [0, 2, -2, 0]
              }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              <div className="candle-flame-inner" />
            </motion.div>
          ) : (
            <div style={{ height: '32px', position: 'relative' }}>
              <div className="smoke-particle" style={{ left: '-4px', animationDelay: '0s' }} />
              <div className="smoke-particle" style={{ left: '4px', animationDelay: '0.3s' }} />
              <div className="smoke-particle" style={{ left: '0px', animationDelay: '0.6s' }} />
            </div>
          )}

          {/* Candle Wick & Body */}
          <div className="candle-wick" />
          <div className="candle-body" />
        </div>

        {/* Multi-Tier Birthday Cake */}
        <div className="cake-tiers">
          {/* Top Tier */}
          <div className="cake-tier-top">
            <div className="cake-frosting-drips" />
            {/* Cute Sprinkles */}
            <span style={{ position: 'absolute', top: '24px', left: '20px', color: '#d97996', fontSize: '12px' }}>✿</span>
            <span style={{ position: 'absolute', top: '30px', left: '70px', color: '#d4af37', fontSize: '10px' }}>✦</span>
            <span style={{ position: 'absolute', top: '22px', right: '25px', color: '#a84d6b', fontSize: '12px' }}>♡</span>
          </div>

          {/* Bottom Tier */}
          <div className="cake-tier-bottom">
            <div className="cake-frosting-drips" />
            {/* Strawberries / Rosettes */}
            <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '28px' }}>
              <span style={{ fontSize: '18px' }}>🍓</span>
              <span style={{ fontSize: '18px' }}>🌸</span>
              <span style={{ fontSize: '18px' }}>🍓</span>
              <span style={{ fontSize: '18px' }}>🌸</span>
              <span style={{ fontSize: '18px' }}>🍓</span>
            </div>
          </div>

          {/* Cake Stand */}
          <div className="cake-stand" />
        </div>
      </div>

      {/* Interactive Controls & Wish Card */}
      <div style={{ width: 'min(520px, 92vw)', marginTop: '20px', textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          {!isBlown ? (
            <motion.div
              key="blow-controls"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}
            >
              {/* Mic Detection Mode */}
              {!isListening ? (
                <button 
                  className="btn-primary" 
                  onClick={startListening}
                  style={{ gap: '10px' }}
                >
                  <Mic size={18} />
                  <span>{cake.micButtonStart}</span>
                </button>
              ) : (
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid var(--border-soft)',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  width: '100%'
                }}>
                  <div style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '13px', 
                    fontWeight: 600,
                    color: 'var(--deep-pink)', 
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <span>{cake.micListeningText}</span>
                  </div>

                  {/* Real-time Breath Intensity Bar */}
                  <div style={{ 
                    height: '10px', 
                    background: '#faebee', 
                    borderRadius: '999px', 
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <motion.div 
                      style={{ 
                        height: '100%', 
                        background: 'linear-gradient(90deg, #d97996, #a84d6b)',
                        borderRadius: '999px',
                        width: `${blowLevel}%`
                      }} 
                    />
                  </div>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '6px', fontFamily: 'var(--font-sans)' }}>
                    Breath detection level: {blowLevel}% (blow directly at mic)
                  </div>
                </div>
              )}

              {/* Clickable Fallback Button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: '#888', fontFamily: 'var(--font-sans)' }}>
                  {cake.clickFallbackPrompt}
                </span>
                <button 
                  className="btn-secondary" 
                  onClick={extinguishCandle}
                  style={{ gap: '8px', fontSize: '13px', padding: '10px 20px' }}
                >
                  <Flame size={15} style={{ color: '#ff7700' }} />
                  <span>{cake.clickFallbackButton}</span>
                </button>
              </div>

              {micError && (
                <div style={{ fontSize: '12px', color: '#a84d6b', marginTop: '4px', fontFamily: 'var(--font-sans)' }}>
                  {micError}
                </div>
              )}
            </motion.div>
          ) : (
            /* Revealed Wish Card */
            <motion.div
              key="wish-revealed"
              className="scrapbook-card"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ padding: '24px 20px', textAlign: 'center' }}
            >
              <div 
                className="washi-tape top-center" 
                style={{ backgroundColor: 'var(--washi-tape-1)' }} 
              />
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🌸 ✨ ♡</div>
              <h3 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(20px, 4vw, 28px)', 
                color: 'var(--deep-pink)',
                fontWeight: 'normal',
                marginBottom: '10px'
              }}>
                {cake.wishRevealedTitle}
              </h3>
              <p style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(15px, 2.2vw, 17px)', 
                color: 'var(--ink)', 
                lineHeight: '1.7',
                marginBottom: '20px'
              }}>
                {cake.wishRevealedMessage}
              </p>

              <button 
                className="btn-primary" 
                onClick={onNext}
                style={{ margin: '0 auto' }}
              >
                <span>Read Your Letter 💌</span>
                <span aria-hidden="true">→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
