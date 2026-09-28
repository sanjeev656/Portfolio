import React, { useState } from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import './VolumeControl.css';

export default function VolumeControl({ volume, isMuted, onVolumeChange, onToggleMute }) {
  const [isHovered, setIsHovered] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div 
      className={`volume-control-pill ${isHovered ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        type="button"
        className="volume-icon-btn" 
        onClick={onToggleMute}
        title={isMuted ? "Unmute" : "Mute"}
        aria-label="Toggle mute"
      >
        {getVolumeIcon()}
      </button>

      <div className="volume-slider-wrapper">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="volume-slider"
          aria-label="Volume slider"
        />
        <div 
          className="volume-progress" 
          style={{ width: `${(isMuted ? 0 : volume) * 100}%` }} 
        />
      </div>
      <span className="volume-number">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
    </div>
  );
}
