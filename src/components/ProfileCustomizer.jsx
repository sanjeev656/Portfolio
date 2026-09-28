import React, { useState } from 'react';
import { Settings, X, RefreshCw, Copy, Check, Sparkles, Music, Video, User } from 'lucide-react';
import './ProfileCustomizer.css';
import { initialProfileData } from '../data/profileData';

export default function ProfileCustomizer({ profile, setProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAudioChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      audio: {
        ...prev.audio,
        [field]: value,
      },
    }));
  };

  const handleSocialChange = (index, value) => {
    setProfile((prev) => {
      const updated = [...prev.socials];
      updated[index] = { ...updated[index], url: value };
      return { ...prev, socials: updated };
    });
  };

  const handleReset = () => {
    setProfile(initialProfileData);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(profile, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <>
      {/* Floating Gear Button */}
      <button
        type="button"
        className="customizer-toggle-btn"
        onClick={() => setIsOpen(true)}
        title="Customize Profile"
        aria-label="Open Profile Customizer"
      >
        <Settings size={18} />
        <span>Customize</span>
      </button>

      {/* Drawer Modal */}
      {isOpen && (
        <div className="customizer-backdrop" onClick={() => setIsOpen(false)}>
          <div className="customizer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="customizer-header">
              <div className="customizer-header-title">
                <Sparkles size={18} className="header-sparkle" />
                <h3>Profile Editor</h3>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close customizer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="customizer-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                <User size={14} /> Profile
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
                onClick={() => setActiveTab('media')}
              >
                <Music size={14} /> Audio & Media
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'socials' ? 'active' : ''}`}
                onClick={() => setActiveTab('socials')}
              >
                <Sparkles size={14} /> Social Links
              </button>
            </div>

            {/* Tab Contents */}
            <div className="customizer-body">
              {activeTab === 'general' && (
                <div className="form-group-list">
                  <div className="input-group">
                    <label>Display Name</label>
                    <input
                      type="text"
                      value={profile.displayName}
                      onChange={(e) => handleChange('displayName', e.target.value)}
                      placeholder="Display Name"
                    />
                  </div>

                  <div className="input-group">
                    <label>UID (User ID Number)</label>
                    <input
                      type="text"
                      value={profile.uid}
                      onChange={(e) => handleChange('uid', e.target.value)}
                      placeholder="e.g. 1,253,506"
                    />
                  </div>

                  <div className="input-group">
                    <label>Bio / Description</label>
                    <textarea
                      rows={2}
                      value={profile.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Bio description"
                    />
                  </div>

                  <div className="input-group">
                    <label>Avatar Image URL</label>
                    <input
                      type="text"
                      value={profile.avatar}
                      onChange={(e) => handleChange('avatar', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="input-group">
                    <label>Page Views Count</label>
                    <input
                      type="number"
                      value={profile.pageViews}
                      onChange={(e) => handleChange('pageViews', parseInt(e.target.value) || 0)}
                      placeholder="128"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="form-group-list">
                  <div className="input-group">
                    <label>Background Video URL (MP4 / WebM)</label>
                    <input
                      type="text"
                      value={profile.backgroundVideo}
                      onChange={(e) => handleChange('backgroundVideo', e.target.value)}
                      placeholder="https://...mp4 or YouTube URL"
                    />
                  </div>

                  <div className="input-group">
                    <label>Song Title</label>
                    <input
                      type="text"
                      value={profile.audio.title}
                      onChange={(e) => handleAudioChange('title', e.target.value)}
                      placeholder="Phonk"
                    />
                  </div>

                  <div className="input-group">
                    <label>Song Audio URL (MP3)</label>
                    <input
                      type="text"
                      value={profile.audio.url}
                      onChange={(e) => handleAudioChange('url', e.target.value)}
                      placeholder="https://...mp3"
                    />
                  </div>

                  <div className="input-group">
                    <label>Song Cover Art URL</label>
                    <input
                      type="text"
                      value={profile.audio.cover}
                      onChange={(e) => handleAudioChange('cover', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              )}

              {activeTab === 'socials' && (
                <div className="form-group-list">
                  {profile.socials.map((soc, idx) => (
                    <div key={soc.id} className="input-group">
                      <label>{soc.name} URL</label>
                      <input
                        type="text"
                        value={soc.url}
                        onChange={(e) => handleSocialChange(idx, e.target.value)}
                        placeholder={`https://${soc.id}...`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customizer Actions */}
            <div className="customizer-footer">
              <button
                type="button"
                className="action-btn reset-btn"
                onClick={handleReset}
                title="Reset to default settings"
              >
                <RefreshCw size={14} />
                <span>Reset to Default</span>
              </button>

              <button
                type="button"
                className="action-btn copy-btn"
                onClick={handleCopyJson}
                title="Copy profile config as JSON"
              >
                {copiedJson ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedJson ? 'Copied JSON' : 'Copy Config JSON'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
