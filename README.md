# 💖 Romantic Birthday Surprise Website

A bespoke, immersive, and romantic birthday web application crafted with passion, elegant typography, interactive micro-animations, and heartfelt personal touches.

Built with modern vanilla HTML5, CSS3, and JavaScript — no build steps, bundlers, or heavy frameworks required. Just double-click `index.html` to open in any web browser!

---

## ✨ Key Features

- **Magical Landing Screen**: Fullscreen ambient entrance with twinkling stars, floating hearts, and an invitation to reveal the surprise.
- **Cinematic Hero Banner**: Dreamy photography overlay with smooth parallax scroll cue.
- **Interactive Love Story Polaroid Gallery**: Vintage-style polaroid cards that open into a full-featured lightbox with keyboard and mobile touch-swipe navigation.
- **Animated Love Letter**: An interactive wax-sealed envelope that opens to reveal an authentic typewriter effect typing out your personal message.
- **Reasons Why I Love You**: Interactive 3D flip cards revealing personalized reasons, plus a surprise generator button for infinite romantic moments.
- **Birthday Cake Celebration**: 3-tiered birthday cake with flickering candles you can blow out, followed by realistic multi-point canvas fireworks and heart confetti bursts.
- **Secret Heart Easter Egg**: A subtle floating heart button with an interactive click counter that unlocks a secret hidden love note with sparkling animations.
- **Cinematic Finale & Virtual Hug**: Staggered cinematic declarations and an interactive "Virtual Hug" button that blankets the screen in cascading hearts.
- **Ambient Floating Hearts & Background Music**: Smooth floating CSS hearts across all sections and an integrated floating audio player with audio equalizer bars and smooth volume fade-in.

---

## 🚀 Quick Start Guide

1. Clone or download this project folder to your computer.
2. Open `index.html` directly in your favorite modern browser (Chrome, Edge, Safari, Firefox).
3. Click **"Open Your Surprise ✨"** to begin the experience and enjoy the background music and animations!

---

## 🎨 How to Customize (Easy 5-Minute Setup)

All customizable text, names, images, and audio paths are centrally managed in a single file:  
📁 **`js/config.js`**

Open `js/config.js` in any text editor (VS Code, Notepad, etc.) to tailor the experience:

### 1. Change Names
```javascript
const CONFIG = {
  birthdayPerson: "Aanya", // Change to your loved one's name
  sender: "Aryan",         // Change to your name
  // ...
};
```
Every `{name}` and `{sender}` token throughout letters, headlines, and captions will automatically update!

### 2. Personalize the Photos
Update the URLs in `CONFIG.gallery.images` with links to your own photos, cloud storage URLs, or local image paths in `assets/`:
```javascript
gallery: {
  sectionTitle: "Our Love Story 💕",
  images: [
    { url: "assets/images/photo1.jpg", caption: "Our first trip together." },
    { url: "assets/images/photo2.jpg", caption: "That smile I could stare at forever." },
    // Add as many photos as you wish!
  ]
}
```

### 3. Change Background Music
1. Add your romantic MP3 song into the `assets/music/` directory (e.g. `assets/music/song.mp3`).
2. Update the config:
```javascript
music: {
  file: "assets/music/song.mp3",
  title: "Can't Help Falling in Love ♡"
}
```

### 4. Write Your Love Letter
Customize the handwritten letter in `CONFIG.letter.content`. Supports line breaks (`\n`) and `{name}` / `{sender}` tokens:
```javascript
letter: {
  sectionTitle: "A Letter for You 💌",
  envelopeLabel: "To My Beautiful {name} ❤️",
  content: `Happy Birthday, my love!\n\nToday is the day the world got a little more beautiful...`
}
```

### 5. Customize the Reasons Why You Love Them
Add, edit, or remove reasons in `CONFIG.reasons.list` and bonus reasons in `CONFIG.reasons.extraReasons`:
```javascript
reasons: {
  list: [
    "Your beautiful smile.",
    "Your kind and caring heart.",
    "The way you make me laugh every day."
  ],
  extraReasons: [
    "How safe I feel when I'm with you.",
    "The way your eyes sparkle when you're happy."
  ]
}
```

---

## 📁 Project Structure

```text
BDAy/
├── index.html            # Core HTML markup and component hierarchy
├── README.md             # Documentation and guide
├── css/
│   ├── style.css         # Theme palette, CSS custom properties, global styles
│   ├── animations.css    # Keyframe animations (floats, pulses, flips, sparkles)
│   └── sections.css      # Section-specific styles (cake, envelope, polaroids)
├── js/
│   ├── config.js         # Single source of truth for all content and settings
│   ├── confetti.js       # Standalone canvas particle & fireworks engine
│   ├── particles.js      # tsParticles configuration and ambient CSS floating hearts
│   ├── gallery.js        # Polaroid gallery & mobile swipe-enabled lightbox
│   ├── letter.js         # Interactive envelope opening & typewriter effect
│   ├── cake.js           # Cake candle blow-out and wish reveal logic
│   ├── surprise.js       # Secret easter egg click-counter & sparkling modal
│   └── app.js            # Main orchestrator & IntersectionObserver controller
└── assets/
    └── music/            # Place your background MP3 audio files here
```

---

## 🌐 Free Deployment Options

Share this website with your partner anywhere in the world:

### Option A: GitHub Pages (Recommended)
1. Push this folder to a GitHub repository.
2. In your repository, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Within 1–2 minutes, your site will be live at `https://<username>.github.io/<repo-name>/`.

### Option B: Netlify Drop (Instant)
1. Visit [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `BDAy` folder onto the page.
3. Your site is deployed instantly with a shareable URL!

### Option C: Vercel
1. Install Vercel CLI (`npm i -g vercel`) and run `vercel`, or import your repository directly on [Vercel Dashboard](https://vercel.com).
2. Deploy with zero configuration.

---

## 📱 Mobile Responsiveness & Performance

- **Fluid Breakpoints**: Optimized for all viewports with custom media query breakpoints at `768px` (tablets) and `480px` (phones).
- **GPU Accelerated**: Animations strictly leverage `transform` and `opacity` properties with `will-change` hints for smooth 60fps rendering on mobile devices.
- **Lazy Loading**: Images use native `loading="lazy"` attributes to ensure rapid initial load times.
- **Battery-Friendly Canvas**: The particle and confetti engines automatically pause rendering loops when idle or off-screen.

---

## 📜 Credits & Attributions

- **Fonts**: [Google Fonts](https://fonts.google.com/) — *Great Vibes*, *Playfair Display*, and *Poppins*.
- **Particle Engine**: [tsParticles](https://particles.js.org/) for landing star and heart constellations.
- **Photography**: Romantic imagery sourced from [Unsplash](https://unsplash.com/).
