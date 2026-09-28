import React from 'react';
import './ClickToEnter.css';
import { Volume2, Sparkles } from 'lucide-react';

export default function ClickToEnter({ onEnter, isEntered }) {
  if (isEntered) return null;

  return (
    <div className="click-to-enter-overlay" onClick={onEnter}>
      <div className="enter-content">
        <div className="enter-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>SANJEEV KUMAR</span>
        </div>
        <h1 className="enter-title">click to enter...</h1>
        <div className="enter-hint">
          <Volume2 size={16} />
          <span>Click anywhere to unmute & explore</span>
        </div>
      </div>
    </div>
  );
}
