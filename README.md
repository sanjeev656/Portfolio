# Guns.lol / Lixdroid Profile Clone in React

A high-performance, pixel-faithful React replica of the **[guns.lol/lixdroid](https://guns.lol/lixdroid)** bio-link portfolio website.

## ✨ Features Included

1. **Overlay "Click to Enter..." Screen**:
   - Heavy glassmorphic backdrop blur (`28px`)
   - Pulsing glowing prompt text
   - Unlocks browser audio context and auto-plays background music and unblurs card

2. **Looping Video Background & Particle Canvas**:
   - Fullscreen background MP4 video matching the original aesthetic video (`https://r2.guns.lol/97e272c4-3cef-4003-bb94-c1fd6bc9e499.mp4`)
   - Dark radial vignette overlay
   - Interactive starfield / cyber particle floating canvas with sparkles

3. **Interactive 3D Glassmorphic Profile Card**:
   - Dynamic 3D tilt effect following cursor position (`perspective(1000px) rotateX / rotateY`)
   - Avatar with animated dashed orbital ring and hover zoom
   - Glowing Display Name (`Lix`) with text glow and verified account badge
   - Clickable `UID 1,253,506` badge with click-to-copy functionality
   - Styled Unicode bio: `𝙷𝚎𝚕𝚕𝚘 𝚆𝚘𝚛𝚕𝚍 𝙸'𝚖 𝙻𝚒𝚡`
   - Discord status widget with badge tags (HypeSquad Balance, Nitro)
   - Real-time views counter (`👁 128`) and Share profile button with confetti burst effect

4. **Glowing Social Links**:
   - High-fidelity icons for:
     - **GitHub** (`lixdroid-404`)
     - **Reddit** (`fool-lab`)
     - **HackTheBox** (custom HTB emblem)
     - **TryHackMe** (custom THM emblem)
     - **Discord**
     - **Telegram** (`@lixdroid`)
     - **Instagram** (`@sparx_404`)
     - **Spotify**
   - Hover drop-shadow neon glow and floating tooltip tags

5. **Audio Player with Visualizer Bars**:
   - Embedded song: *"Phonk"*
   - Animated audio visualizer bars responsive to playback state
   - Spinning album artwork vinyl effect
   - Scrubbable progress bar with elapsed and total duration
   - Play / Pause controls

6. **Corner Volume Pill**:
   - Mute / Unmute quick toggle
   - Smooth volume slider (0% - 100%)
   - Volume percentage indicator

7. **Custom Cursor & Trail**:
   - Custom crosshair cursor (`b2b4e197-6acb-487e-8fd9-887fab88a05d.png`)
   - Interactive glowing spark trail on mouse movement
   - Click ripple effect

8. **Live In-Browser Customizer**:
   - Click the **Customize** button on the top-right to edit any profile data in real-time:
     - Display name, UID, bio text
     - Audio track title, MP3 URL, cover art
     - Background video URL
     - Social URLs
     - One-click "Copy Config JSON" or "Reset to @lixdroid"

---

## 🚀 Running Locally

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

Open your browser at:
`http://localhost:5173/` (or `http://127.0.0.1:5173/`)
