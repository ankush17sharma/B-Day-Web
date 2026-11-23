/**
 * Secret Heart Button & Hidden Surprise Module
 * Easter egg triggered by tapping the secret heart button multiple times.
 */

function initSurprise() {
  if (typeof CONFIG === 'undefined' || !CONFIG.secret) {
    console.warn('Secret surprise configuration missing in CONFIG.');
    return;
  }

  const formatText = (text) => {
    if (typeof replacePlaceholders === 'function') {
      return replacePlaceholders(text);
    }
    return (text || '')
      .replace(/\{name\}/g, CONFIG.birthdayPerson || '')
      .replace(/\{sender\}/g, CONFIG.sender || '');
  };

  const secretBtn = document.getElementById('secret-btn');
  const secretSection = document.getElementById('secret-section');
  const secretTitle = document.querySelector('.secret-title');
  const secretMessage = document.querySelector('.secret-message');
  const secretCloseBtn = document.querySelector('.secret-close');

  if (!secretBtn || !secretSection) return;

  const requiredClicks = CONFIG.secret.clicksRequired || 5;
  let clickCount = 0;
  let sparkleTimeout = null;

  // Pulse animation style for button clicks
  if (!document.getElementById('secret-heart-pulse-style')) {
    const style = document.createElement('style');
    style.id = 'secret-heart-pulse-style';
    style.textContent = `
      .heartbeat-click {
        animation: heartClickPulse 0.4s ease-out !important;
      }
      @keyframes heartClickPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.4); }
        100% { transform: scale(1); }
      }
      .secret-sparkle {
        position: absolute;
        pointer-events: none;
        z-index: 10;
        animation: sparkleAnim 1.2s ease-out forwards;
      }
      @keyframes sparkleAnim {
        0% {
          transform: translate(0, 0) scale(0);
          opacity: 1;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translate(var(--tx), var(--ty)) scale(1.4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Secret Heart Click Handler
  secretBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clickCount++;

    // Add heartbeat pulse animation
    secretBtn.classList.remove('heartbeat-click');
    void secretBtn.offsetWidth; // Force reflow
    secretBtn.classList.add('heartbeat-click');

    // Create a mini heart floating upward on click
    createMiniClickHeart(e.clientX || secretBtn.getBoundingClientRect().left, e.clientY || secretBtn.getBoundingClientRect().top);

    // Check if target count reached
    if (clickCount >= requiredClicks) {
      clickCount = 0;
      openSecretModal();
    }
  });

  /**
   * Spawn a tiny heart floating away on tap
   */
  function createMiniClickHeart(x, y) {
    const mini = document.createElement('span');
    mini.textContent = '♥';
    mini.style.position = 'fixed';
    mini.style.left = `${x}px`;
    mini.style.top = `${y}px`;
    mini.style.color = '#FF1493';
    mini.style.fontSize = '18px';
    mini.style.pointerEvents = 'none';
    mini.style.zIndex = '9999';
    mini.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    mini.style.opacity = '1';

    document.body.appendChild(mini);

    requestAnimationFrame(() => {
      mini.style.transform = `translate(${(Math.random() - 0.5) * 30}px, -45px) scale(1.3)`;
      mini.style.opacity = '0';
    });

    setTimeout(() => {
      if (mini.parentNode) mini.parentNode.removeChild(mini);
    }, 650);
  }

  /**
   * Open the secret message overlay
   */
  function openSecretModal() {
    // Populate text
    if (secretTitle && CONFIG.secret.title) {
      secretTitle.textContent = formatText(CONFIG.secret.title);
    }

    if (secretMessage && CONFIG.secret.message) {
      // Preserve newlines
      secretMessage.style.whiteSpace = 'pre-wrap';
      secretMessage.innerHTML = formatText(CONFIG.secret.message).replace(/\n/g, '<br>');
    }

    // Activate modal
    secretSection.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Trigger magical sparkle effect around the secret dialog
    createSparkles();
  }

  /**
   * Close the secret message overlay
   */
  function closeSecretModal() {
    secretSection.classList.remove('active');
    document.body.style.overflow = '';
    if (sparkleTimeout) {
      clearTimeout(sparkleTimeout);
      sparkleTimeout = null;
    }
  }

  // Close button listener
  if (secretCloseBtn) {
    secretCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSecretModal();
    });
  }

  // Click outside content to dismiss
  secretSection.addEventListener('click', (e) => {
    if (e.target === secretSection) {
      closeSecretModal();
    }
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && secretSection.classList.contains('active')) {
      closeSecretModal();
    }
  });

  /**
   * Generates glittering sparkles around .secret-content
   */
  function createSparkles() {
    const content = secretSection.querySelector('.secret-content');
    if (!content) return;

    const sparkleIcons = ['✨', '⭐', '✦', '💖', '★'];
    const count = 16;

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'secret-sparkle';
      sparkle.textContent = sparkleIcons[Math.floor(Math.random() * sparkleIcons.length)];

      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = Math.random() * 80 + 70;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      sparkle.style.left = '50%';
      sparkle.style.top = '50%';
      sparkle.style.fontSize = `${Math.random() * 10 + 14}px`;
      sparkle.style.setProperty('--tx', `${tx}px`);
      sparkle.style.setProperty('--ty', `${ty}px`);
      sparkle.style.color = '#FFD700';

      content.appendChild(sparkle);

      setTimeout(() => {
        if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
      }, 1300);
    }
  }
}

// Export globally
window.initSurprise = initSurprise;
