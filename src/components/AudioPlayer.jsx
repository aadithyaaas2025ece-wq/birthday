import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../utils/audio';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    sound.playSparkle();
    const nextState = sound.toggleBgm((playing) => {
      setIsPlaying(playing);
    });
    setIsPlaying(nextState);
  };

  return (
    <button 
      className="audio-toggle-btn"
      onClick={handleToggle}
      title={isPlaying ? "Mute music" : "Play ambient birthday music"}
      aria-label="Toggle ambient music"
    >
      {isPlaying ? (
        <>
          <Volume2 size={16} />
          <span>Music: On ♫</span>
        </>
      ) : (
        <>
          <VolumeX size={16} />
          <span>Play Music ♡</span>
        </>
      )}
    </button>
  );
}
