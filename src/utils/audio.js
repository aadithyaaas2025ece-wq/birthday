/**
 * Web Audio API synthesizer for instant, reliable, zero-asset sound effects & music
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft sparkle / button click chime
  playSparkle() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.001, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.36);
    });
  }

  // Soft candle blow out / whoosh sound
  playBlowOut() {
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Happy celebration fanfare when candle is extinguished
  playCelebration() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // C Major chord progression joyful arpeggio
    const melody = [
      { freq: 523.25, time: 0, dur: 0.2 },    // C5
      { freq: 659.25, time: 0.15, dur: 0.2 }, // E5
      { freq: 783.99, time: 0.3, dur: 0.2 },  // G5
      { freq: 1046.5, time: 0.45, dur: 0.4 }, // C6
      { freq: 880.00, time: 0.7, dur: 0.2 },  // A5
      { freq: 1046.5, time: 0.85, dur: 0.6 }, // C6
      { freq: 1318.5, time: 1.1, dur: 0.8 }   // E6
    ];

    melody.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.freq, now + item.time);

      gain.gain.setValueAtTime(0.001, now + item.time);
      gain.gain.linearRampToValueAtTime(0.15, now + item.time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + item.time + item.dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + item.time);
      osc.stop(now + item.time + item.dur);
    });
  }

  // Paper rustle / envelope open
  playEnvelopeOpen() {
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Ambient gentle music loop (soothing music box lofi melody)
  toggleBgm(onStateChange) {
    this.init();
    if (this.bgmPlaying) {
      this.stopBgm();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startBgm();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  startBgm() {
    this.init();
    if (!this.ctx) return;
    this.bgmPlaying = true;

    // Gentle music-box lofi scale (Pentatonic in F Major)
    // F4, G4, A4, C5, D5, F5
    const scale = [349.23, 392.00, 440.00, 523.25, 587.33, 698.46];
    const pattern = [0, 2, 3, 4, 2, 4, 5, 3, 1, 2, 4, 3, 0, 1, 3, 2];
    let step = 0;

    const playStep = () => {
      if (!this.bgmPlaying || !this.ctx) return;
      
      const now = this.ctx.currentTime;
      const noteIdx = pattern[step % pattern.length];
      const freq = scale[noteIdx];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);

      step++;
      this.bgmTimer = setTimeout(playStep, 450);
    };

    playStep();
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

export const sound = new SoundEffects();
