import React, { useState, useRef } from 'react';
import './ProfileCard.css';
import SocialIcon from './SocialIcon';
import { CheckCircle2, ShieldAlert, Sparkles, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProfileCard({ profile, onOpenEditor }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [copied, setCopied] = useState(false);

  // 3D Card Tilt Effect on mouse movement
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#881c9c', '#ffffff', '#c084fc']
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="profile-container">
      <div
        ref={cardRef}
        className="profile-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
      >
        {/* Background Subtle Gradient Glow */}
        <div className="card-glass-glow" />

        {/* Top Badges / Actions */}
        <div className="card-top-bar" style={{ justifyContent: 'flex-end' }}>
          <button 
            className="share-pill-btn" 
            onClick={handleCopyLink} 
            title="Copy link to clipboard"
            aria-label="Share profile"
          >
            {copied ? <Check size={13} className="copied-check" /> : <Share2 size={13} />}
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <img
              src={profile.avatar}
              alt={profile.displayName}
              className="avatar-image"
              loading="eager"
            />
            <div className="avatar-ring" />
          </div>
        </div>

        {/* User Identity & UID */}
        <div className="identity-section">
          <div className="name-wrapper">
            <h1 className="display-name glow-text">{profile.displayName}</h1>
            {profile.verified && (
              <span className="verified-badge" title="Verified Account">
                <CheckCircle2 size={18} fill="#ffffff" color="#0d0d0d" />
              </span>
            )}
          </div>

          {/* Bio Description */}
          <p className="bio-description">{profile.description}</p>
        </div>

        {/* Discord Widget / Presence Box */}
        {profile.discord && (
          <div className="discord-widget">
            <div className="discord-widget-header">
              <div className="discord-user-info">
                <ShieldAlert size={18} className="discord-status-icon" />
                <span className="discord-status-title">{profile.discord.status}</span>
              </div>
              <div className="discord-badges">
                <span className="discord-badge-pill" title="HypeSquad Balance">⚖️</span>
                <span className="discord-badge-pill" title="Discord Nitro">🚀</span>
              </div>
            </div>
            <p className="discord-subtext">
              {profile.discord.subtext || "Bloody Sweet • Sanjeev Kumar"}
            </p>
          </div>
        )}

        {/* Social Icons Bar */}
        <div className="socials-container">
          <div className="socials-grid">
            {profile.socials.map((social) => (
              <SocialIcon key={social.id} social={social} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
