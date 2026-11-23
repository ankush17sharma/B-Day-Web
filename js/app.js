/**
 * Main Orchestrator (app.js)
 * Master controller for the romantic birthday celebration website.
 * Loads last and coordinates all visual interactions, audio, scroll reveals, and celebrations.
 */

// Global template placeholder replacement helper
function replacePlaceholders(text) {
  if (typeof text !== 'string') return '';
  if (typeof CONFIG === 'undefined') return text;
  return text
    .replace(/\{name\}/g, CONFIG.birthdayPerson || '')
    .replace(/\{sender\}/g, CONFIG.sender || '');
}
window.replacePlaceholders = replacePlaceholders;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CONFIG === 'undefined') {
    console.error('Fatal: CONFIG object not found. Ensure js/config.js is loaded first.');
    return;
  }

  // 1. Populate all static content from CONFIG
  populateStaticContent();

  // 2. Set up IntersectionObserver for scroll-triggered animations
  setupScrollAnimations();

  // 3. Set up the Background Music player
  setupMusicPlayer();

  // 4. Set up Landing Screen interaction
  setupLandingScreen();

  // 5. Set up Interactive Reasons Section
  setupReasonsSection();

  // 6. Set up Virtual Hug Overlay Interaction
  setupVirtualHug();

  // 7. Initialize Sub-modules
  if (typeof initLandingParticles === 'function') {
    initLandingParticles();
  }
  if (typeof initGallery === 'function') {
    initGallery();
  }
  if (typeof initLetter === 'function') {
    initLetter();
  }
  if (typeof initCake === 'function') {
    initCake();
  }
  if (typeof initSurprise === 'function') {
    initSurprise();
  }
});

/**
 * Populates all initial text and backgrounds from CONFIG
 */
function populateStaticContent() {
  // --- Landing Screen ---
  if (CONFIG.landing) {
    const landingTitle = document.querySelector('.landing-title');
    if (landingTitle && CONFIG.landing.title) {
      landingTitle.textContent = replacePlaceholders(CONFIG.landing.title);
    }

    const landingSubtitle = document.querySelector('.landing-subtitle');
    if (landingSubtitle && CONFIG.landing.subtitle) {
      landingSubtitle.textContent = replacePlaceholders(CONFIG.landing.subtitle);
    }

    const openSurpriseBtn = document.getElementById('open-surprise-btn');
    if (openSurpriseBtn && CONFIG.landing.buttonText) {
      openSurpriseBtn.textContent = replacePlaceholders(CONFIG.landing.buttonText);
    }

    const landingBg = document.querySelector('.landing-bg');
    if (landingBg && CONFIG.landing.backgroundImage) {
      landingBg.style.backgroundImage = `url("${CONFIG.landing.backgroundImage}")`;
    }
  }

  // --- Hero Section ---
  if (CONFIG.hero) {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      heroTitle.textContent = replacePlaceholders("Happy Birthday, {name}! 🎂❤️");
    }

    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle && CONFIG.hero.subtitle) {
      heroSubtitle.textContent = replacePlaceholders(CONFIG.hero.subtitle);
    }

    const scrollHint = document.querySelector('.scroll-indicator span');
    if (scrollHint && CONFIG.hero.scrollHint) {
      scrollHint.textContent = replacePlaceholders(CONFIG.hero.scrollHint);
    }

    const heroBg = document.querySelector('#hero-section .section-bg');
    if (heroBg && CONFIG.hero.backgroundImage) {
      heroBg.style.backgroundImage = `url("${CONFIG.hero.backgroundImage}")`;
    }
  }

  // --- Finale Section ---
  if (CONFIG.finale) {
    const finaleBg = document.querySelector('#finale-section .section-bg');
    if (finaleBg && CONFIG.finale.backgroundImage) {
      finaleBg.style.backgroundImage = `url("${CONFIG.finale.backgroundImage}")`;
    }

    const hugBtn = document.getElementById('hug-btn');
    if (hugBtn && CONFIG.finale.hugButtonText) {
      hugBtn.textContent = replacePlaceholders(CONFIG.finale.hugButtonText);
    }

    populateCinematicLines();
  }
}

/**
 * Populates and prepares the finale cinematic lines
 */
function populateCinematicLines() {
  const container = document.querySelector('.cinematic-lines');
  if (!container || !CONFIG.finale?.lines) return;

  const lines = CONFIG.finale.lines;
  let existingLines = container.querySelectorAll('.cinematic-line');

  // If already populated in HTML, fill text
  if (existingLines.length >= lines.length) {
    existingLines.forEach((el, i) => {
      if (lines[i]) {
        el.textContent = replacePlaceholders(lines[i]);
      }
    });
  } else {
    // Dynamically populate lines
    container.innerHTML = '';
    lines.forEach((lineText, index) => {
      const p = document.createElement('p');
      p.className = 'cinematic-line animate-on-scroll';
      p.textContent = replacePlaceholders(lineText);
      p.style.transitionDelay = `${index * 0.25}s`;
      container.appendChild(p);
    });
  }
}

/**
 * Configures IntersectionObserver for smooth scroll-triggered animations
 */
function setupScrollAnimations() {
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  if (!scrollElements.length) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Apply staggered transition delay if element is part of a sibling list
        const parent = el.parentElement;
        if (parent && parent.children.length > 1) {
          const siblings = Array.from(parent.children).filter((c) =>
            c.classList.contains('animate-on-scroll')
          );
          const index = siblings.indexOf(el);
          if (index > 0 && !el.style.transitionDelay) {
            el.style.transitionDelay = `${(index * 0.12).toFixed(2)}s`;
          }
        }

        el.classList.add('visible');
        obs.unobserve(el); // Only trigger animation once
      }
    });
  }, observerOptions);

  scrollElements.forEach((el) => observer.observe(el));
}

/**
 * Interactive Reasons Section (Cards flip & More Reasons generator)
 */
function setupReasonsSection() {
  if (!CONFIG.reasons) return;

  // Section Title
  const reasonsTitle = document.querySelector('#reasons-section .section-title');
  if (reasonsTitle && CONFIG.reasons.sectionTitle) {
    reasonsTitle.textContent = replacePlaceholders(CONFIG.reasons.sectionTitle);
  }

  // Populate reason cards
  const grid = document.getElementById('reasons-grid');
  const cards = document.querySelectorAll('.reason-card');
  const reasonsList = CONFIG.reasons.list || [];

  cards.forEach((card, i) => {
    if (reasonsList[i]) {
      const numberSpan = card.querySelector('.reason-number');
      if (numberSpan) numberSpan.textContent = (i + 1).toString();

      const textP = card.querySelector('.reason-text');
      if (textP) textP.textContent = replacePlaceholders(reasonsList[i]);
    }

    // Flip card toggle on click
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // More reasons button interaction
  const moreBtn = document.getElementById('more-reasons-btn');
  const extraReasonContainer = document.getElementById('extra-reason');
  const extraReasonText = document.querySelector('.extra-reason-text');

  if (moreBtn && CONFIG.reasons.moreButtonText) {
    moreBtn.textContent = replacePlaceholders(CONFIG.reasons.moreButtonText);
  }

  if (moreBtn && extraReasonContainer && extraReasonText) {
    const extras = CONFIG.reasons.extraReasons || [];
    let lastIndex = -1;

    moreBtn.addEventListener('click', () => {
      if (!extras.length) return;

      // Pick a random reason different from the last one
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * extras.length);
      } while (extras.length > 1 && newIndex === lastIndex);
      lastIndex = newIndex;

      extraReasonText.style.opacity = '0';
      setTimeout(() => {
        extraReasonText.textContent = replacePlaceholders(extras[newIndex]);
        extraReasonText.style.opacity = '1';
        extraReasonContainer.classList.add('visible');
      }, 200);
    });
  }
}

/**
 * Background Music Player controller with smooth volume fade-in
 */
let bgAudio = null;
let isAudioPlaying = false;

function setupMusicPlayer() {
  const musicPlayer = document.getElementById('music-player');
  const musicToggle = document.getElementById('music-toggle');
  const musicTitle = document.querySelector('.music-title');
  bgAudio = document.getElementById('bg-music');

  if (!bgAudio) return;

  // Set music title
  if (musicTitle && CONFIG.music?.title) {
    musicTitle.textContent = CONFIG.music.title;
  }

  // Set audio source
  if (CONFIG.music?.file) {
    const sourceEl = bgAudio.querySelector('source');
    if (sourceEl) {
      sourceEl.src = CONFIG.music.file;
    } else {
      bgAudio.src = CONFIG.music.file;
    }
    bgAudio.load();
  }

  // Play / Pause toggle
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (isAudioPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }

  // Update state when audio ends or pauses externally
  bgAudio.addEventListener('play', () => updateAudioUI(true));
  bgAudio.addEventListener('pause', () => updateAudioUI(false));
}

function updateAudioUI(playing) {
  isAudioPlaying = playing;
  const musicPlayer = document.getElementById('music-player');
  const musicIcon = document.querySelector('.music-icon');

  if (musicPlayer) {
    if (playing) {
      musicPlayer.classList.add('playing');
    } else {
      musicPlayer.classList.remove('playing');
    }
  }

  if (musicIcon) {
    musicIcon.textContent = playing ? '♫' : '♪';
  }
}

function playAudio() {
  if (!bgAudio) return;

  bgAudio.volume = 0;
  const playPromise = bgAudio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        updateAudioUI(true);
        // Fade in volume over 2 seconds
        fadeVolumeIn(bgAudio, 1, 2000);
      })
      .catch((err) => {
        console.warn('Audio auto-play prevented or file missing:', err.message);
        updateAudioUI(false);
      });
  }
}

function pauseAudio() {
  if (!bgAudio) return;
  bgAudio.pause();
  updateAudioUI(false);
}

function fadeVolumeIn(audioEl, targetVolume = 1, durationMs = 2000) {
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / durationMs, 1);
    audioEl.volume = progress * targetVolume;

    if (progress < 1 && isAudioPlaying) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Landing Screen Sequence
 */
function setupLandingScreen() {
  const landingScreen = document.getElementById('landing-screen');
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  const mainContent = document.getElementById('main-content');
  const musicPlayer = document.getElementById('music-player');

  if (!landingScreen || !openSurpriseBtn) return;

  openSurpriseBtn.addEventListener('click', () => {
    // 1. Trigger landing exit animation
    landingScreen.classList.add('landing-exit');

    // 2. Play background music upon user gesture
    playAudio();

    // 3. Reveal music player
    if (musicPlayer) {
      musicPlayer.classList.remove('hidden');
      musicPlayer.classList.add('active');
    }

    // 4. Reveal main content
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.style.display = 'block';
    }

    // 5. Initialize ambient floating hearts throughout the page
    if (typeof initFloatingHearts === 'function') {
      initFloatingHearts();
    }

    // 6. Remove landing screen from layout after transition completes (1s)
    setTimeout(() => {
      landingScreen.style.display = 'none';

      // Re-trigger observer check for initial hero elements
      window.dispatchEvent(new Event('scroll'));
    }, 1000);
  });
}

/**
 * Virtual Hug celebration overlay
 */
function setupVirtualHug() {
  const hugBtn = document.getElementById('hug-btn');
  const hugOverlay = document.getElementById('hug-overlay');
  const hugCanvas = document.getElementById('hug-canvas');
  const hugMessageEl = document.querySelector('.hug-message');

  if (!hugBtn || !hugOverlay) return;

  let hugEngine = null;
  let openedTimestamp = 0;

  hugBtn.addEventListener('click', () => {
    openedTimestamp = Date.now();

    // Populate hug message
    if (hugMessageEl && CONFIG.finale?.hugMessage) {
      hugMessageEl.innerHTML = replacePlaceholders(CONFIG.finale.hugMessage).replace(/\n/g, '<br>');
    }

    // Show overlay
    hugOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Canvas confetti fireworks
    if (hugCanvas && typeof ConfettiEngine !== 'undefined') {
      if (!hugEngine) {
        hugEngine = new ConfettiEngine(hugCanvas);
      }
      hugEngine.resize(window.innerWidth, window.innerHeight);

      const w = hugEngine.width;
      const h = hugEngine.height;

      // Burst hearts from multiple vantage points
      hugEngine.heartBurst({ x: w * 0.5, y: h * 0.45, count: 70, speed: 11 });

      setTimeout(() => {
        hugEngine.heartBurst({ x: w * 0.25, y: h * 0.4, count: 50, speed: 10 });
      }, 200);

      setTimeout(() => {
        hugEngine.heartBurst({ x: w * 0.75, y: h * 0.4, count: 50, speed: 10 });
      }, 400);

      setTimeout(() => {
        hugEngine.burst({ x: w * 0.5, y: h * 0.65, count: 75, speed: 12 });
      }, 650);

      setTimeout(() => {
        hugEngine.heartBurst({ x: w * 0.5, y: h * 0.5, count: 80, speed: 9 });
      }, 1000);
    }
  });

  // Dismiss overlay when clicked anywhere after a 2-second grace period
  hugOverlay.addEventListener('click', () => {
    if (Date.now() - openedTimestamp >= 2000) {
      hugOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (hugEngine) {
        hugEngine.clear();
      }
    }
  });
}
