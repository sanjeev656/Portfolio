import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { initialProfileData } from './data/profileData';
import ClickToEnter from './components/ClickToEnter';
import BackgroundMedia from './components/BackgroundMedia';
import VolumeControl from './components/VolumeControl';
import CustomCursor from './components/CustomCursor';
import ProfileCard from './components/ProfileCard';

export default function App() {
  const [profile, setProfile] = useState(initialProfileData);
  const [isEntered, setIsEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // Animated Document Title marquee
  useEffect(() => {
    const baseTitle = `@${profile.displayName || 'Sanjeev Kumar'} • Official `;
    let currentIdx = 0;
    
    const interval = setInterval(() => {
      document.title = baseTitle.substring(currentIdx) + baseTitle.substring(0, currentIdx);
      currentIdx = (currentIdx + 1) % baseTitle.length;
    }, 450);

    return () => clearInterval(interval);
  }, [profile.displayName]);

  // Handle Audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      // Loop track
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume, isMuted]);

  // Click to Enter Handler (Unmutes & starts music & reveals card)
  const handleEnter = () => {
    setIsEntered(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio auto-play note:', err);
      });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.warn(err));
    }
  };

  const handleSeek = (newTime) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (audioRef.current) {
        audioRef.current.volume = nextMuted ? 0 : volume;
      }
      return nextMuted;
    });
  };

  return (
    <div className="guns-app-wrapper">
      {/* Hidden Audio Player Element */}
      <audio
        ref={audioRef}
        src={profile.audio.url}
        preload="auto"
        loop
      />

      {/* Custom Crosshair Cursor and Sparkle Trail */}
      <CustomCursor cursorUrl={profile.customCursor} />

      {/* Video Background & Ambient Canvas Particles */}
      <BackgroundMedia
        videoUrl={profile.backgroundVideo}
        isEntered={isEntered}
        showParticles={profile.effects.particles}
      />

      {/* Click To Enter Blur Overlay */}
      <ClickToEnter onEnter={handleEnter} isEntered={isEntered} />

      {/* Top Left Volume Pill */}
      <VolumeControl
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={handleVolumeChange}
        onToggleMute={toggleMute}
      />

      {/* Central Profile Card */}
      <main className={`main-content ${isEntered ? 'entered' : 'blurred'}`}>
        <ProfileCard profile={profile} />
      </main>
    </div>
  );
}
