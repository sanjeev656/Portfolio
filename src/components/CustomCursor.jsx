import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor({ cursorUrl }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Enable the custom cursor on body
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Add a spark particle to trail occasionally
      if (Math.random() > 0.4) {
        setTrail((prev) => [
          ...prev.slice(-12),
          {
            id: Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            size: Math.random() * 4 + 2,
            opacity: 0.9,
          },
        ]);
      }
    };

    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 250);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Decay trail
    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.1, size: p.size * 0.9 }))
          .filter((p) => p.opacity > 0.05)
      );
    }, 40);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-container">
      {/* Click ripple */}
      {clicked && (
        <div
          className="cursor-ripple"
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        />
      )}

      {/* Sparkle Trail */}
      {trail.map((t) => (
        <div
          key={t.id}
          className="cursor-sparkle"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            width: `${t.size}px`,
            height: `${t.size}px`,
            opacity: t.opacity,
          }}
        />
      ))}
    </div>
  );
}
