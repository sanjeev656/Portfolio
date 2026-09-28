import React from 'react';
import { Play, Pause, Disc3, Volume2, RotateCcw } from 'lucide-react';
import './AudioPlayer.css';

export default function AudioPlayer({
  audioData,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
}) {
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player-bar">
      <div className="audio-player-inner">
        {/* Track Cover & Details */}
        <div className="track-info-side">
          <div className={`track-cover-wrap ${isPlaying ? 'spinning' : ''}`}>
            {audioData.cover ? (
              <img
                src={audioData.cover}
                alt={audioData.title}
                className="track-cover"
              />
            ) : (
              <Disc3 size={24} className="track-cover-fallback" />
            )}
            <div className="cover-center-hole" />
          </div>

          <div className="track-meta">
            <div className="track-title-row">
              <span className="track-title">{audioData.title || 'Phonk'}</span>
              {/* Visualizer waves */}
              <div className={`audio-waves ${isPlaying ? 'playing' : ''}`}>
                <span className="wave-bar bar-1" />
                <span className="wave-bar bar-2" />
                <span className="wave-bar bar-3" />
                <span className="wave-bar bar-4" />
              </div>
            </div>
            <span className="track-artist">{audioData.artist || 'Sanjeev Kumar'}</span>
          </div>
        </div>

        {/* Center Controls & Progress Bar */}
        <div className="audio-controls-center">
          <div className="controls-buttons-row">
            <button
              type="button"
              className="player-play-btn"
              onClick={onTogglePlay}
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label="Play or pause"
            >
              {isPlaying ? <Pause size={18} fill="#0d0d0d" /> : <Play size={18} fill="#0d0d0d" className="play-icon-offset" />}
            </button>
          </div>

          <div className="player-progress-row">
            <span className="time-display">{formatTime(currentTime)}</span>
            <div className="progress-bar-container">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime || 0}
                onChange={(e) => onSeek(parseFloat(e.target.value))}
                className="progress-slider"
                aria-label="Seek track"
              />
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="time-display">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
