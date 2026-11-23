/**
 * tsParticles & Floating Hearts Setup
 * Handles delicate star/heart particle backgrounds and ambient CSS floating hearts.
 */

/**
 * Initialize tsParticles on the landing screen overlay (#landing-particles).
 * Uses a blend of twinkling stars and upward-floating hearts.
 */
function initLandingParticles() {
  const container = document.getElementById('landing-particles');
  if (!container) return;

  // Check if tsParticles is available
  if (typeof tsParticles === 'undefined' || !tsParticles.load) {
    console.warn('tsParticles library not loaded yet; falling back to ambient CSS particles.');
    _createFallbackLandingParticles(container);
    return;
  }

  const particleConfig = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      number: {
        value: 40,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: [
          '#ffffff', // Star white
          '#FFB6C1', // Blush pink
          '#FF69B4', // Hot pink
          '#FFD700', // Gold
          '#E6E6FA', // Lavender
          '#FFE4E1'  // Soft pink
        ]
      },
      shape: {
        type: ['star', 'character'],
        options: {
          star: {
            sides: 5
          },
          character: {
            value: ['♥', '❤', '★', '✦'],
            font: 'Poppins, Arial, sans-serif',
            style: '',
            weight: '600',
            fill: true
          }
        }
      },
      opacity: {
        value: { min: 0.2, max: 0.75 },
        animation: {
          enable: true,
          speed: 0.8,
          minimumValue: 0.15,
          sync: false
        }
      },
      size: {
        value: { min: 6, max: 16 },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 4,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 0.9,
        direction: 'top',
        random: true,
        straight: false,
        outModes: {
          default: 'out',
          top: 'out',
          bottom: 'out'
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 85,
          duration: 0.4
        }
      }
    },
    detectRetina: true
  };

  tsParticles
    .load('landing-particles', particleConfig)
    .catch((err) => {
      console.warn('tsParticles failed to initialize, using fallback:', err);
      _createFallbackLandingParticles(container);
    });
}

/**
 * Fallback particle generator if tsParticles CDN is blocked or unavailable.
 * @param {HTMLElement} container
 */
function _createFallbackLandingParticles(container) {
  if (!container) return;
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('span');
    const isHeart = Math.random() > 0.4;
    p.textContent = isHeart ? (Math.random() > 0.5 ? '♥' : '❤') : '★';
    p.style.position = 'absolute';
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `${Math.random() * 100}%`;
    p.style.fontSize = `${Math.random() * 14 + 10}px`;
    p.style.color = isHeart ? '#FFB6C1' : '#FFFFFF';
    p.style.opacity = (Math.random() * 0.5 + 0.2).toString();
    p.style.pointerEvents = 'none';
    p.style.animation = `heartFloat ${Math.random() * 6 + 6}s linear infinite`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    fragment.appendChild(p);
  }

  container.appendChild(fragment);
}

/**
 * Initialize subtle CSS-based floating hearts throughout the main content.
 * Generates 15-20 lightweight heart elements with randomized positions and timing.
 */
function initFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  if (!container) return;

  // Clear any existing elements to prevent duplicates
  container.innerHTML = '';

  // Inject animation styles if not already present in the stylesheet
  if (!document.getElementById('floating-hearts-style')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'floating-hearts-style';
    styleTag.textContent = `
      #floating-hearts {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
      }
      .css-floating-heart {
        position: absolute;
        bottom: -50px;
        pointer-events: none;
        will-change: transform, opacity;
        animation-name: cssHeartFloatUp;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .css-floating-heart::before,
      .css-floating-heart::after {
        content: "";
        position: absolute;
        top: 0;
        width: 52%;
        height: 80%;
        background: currentColor;
        border-radius: 50% 50% 0 0;
      }
      .css-floating-heart::before {
        left: 50%;
        transform: rotate(-45deg);
        transform-origin: 0 100%;
      }
      .css-floating-heart::after {
        left: 0;
        transform: rotate(45deg);
        transform-origin: 100% 100%;
      }
      @keyframes cssHeartFloatUp {
        0% {
          transform: translateY(0) scale(0.8) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: var(--heart-opacity, 0.2);
        }
        80% {
          opacity: var(--heart-opacity, 0.2);
        }
        100% {
          transform: translateY(calc(-100vh - 100px)) scale(1.1) rotate(var(--heart-rotate, 25deg));
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleTag);
  }

  const heartColors = [
    'rgba(255, 182, 193, 0.8)', // Blush pink
    'rgba(183, 110, 121, 0.7)', // Rose gold
    'rgba(255, 105, 180, 0.7)', // Hot pink
    'rgba(230, 230, 250, 0.7)', // Lavender
    'rgba(255, 228, 225, 0.8)'  // Misty rose
  ];

  const totalHearts = 18; // 15-20 hearts as specified
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalHearts; i++) {
    const heart = document.createElement('div');
    heart.className = 'css-floating-heart floating-heart';

    const size = Math.floor(Math.random() * 18 + 12); // 12px to 30px
    const leftPos = Math.random() * 96; // 0% to 96%
    const duration = Math.random() * 7 + 7; // 7s to 14s
    const delay = Math.random() * 10; // 0s to 10s
    const opacity = (Math.random() * 0.18 + 0.1).toFixed(2); // 0.1 to 0.3
    const rotation = (Math.random() * 40 - 20).toFixed(0); // -20deg to 20deg
    const color = heartColors[Math.floor(Math.random() * heartColors.length)];

    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${leftPos}%`;
    heart.style.color = color;
    heart.style.setProperty('--heart-opacity', opacity);
    heart.style.setProperty('--heart-rotate', `${rotation}deg`);
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;

    fragment.appendChild(heart);
  }

  container.appendChild(fragment);
}

// Export functions globally
window.initLandingParticles = initLandingParticles;
window.initFloatingHearts = initFloatingHearts;
