/**
 * Birthday Cake Interaction Module
 * Controls the candle blow-out interaction, wish reveal, and celebration fireworks/confetti.
 */

function initCake() {
  if (typeof CONFIG === 'undefined' || !CONFIG.cake) {
    console.warn('Cake configuration missing in CONFIG.');
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

  // Section Title
  const cakeTitleEl = document.querySelector('#cake-section .section-title');
  if (cakeTitleEl && CONFIG.cake.sectionTitle) {
    cakeTitleEl.textContent = formatText(CONFIG.cake.sectionTitle);
  }

  // Wish Button
  const wishBtn = document.getElementById('wish-btn');
  if (wishBtn && CONFIG.cake.wishButtonText) {
    wishBtn.textContent = formatText(CONFIG.cake.wishButtonText);
  }

  // Wish Message
  const wishMessageContainer = document.getElementById('wish-message');
  const wishMessageP = wishMessageContainer ? wishMessageContainer.querySelector('p') || wishMessageContainer : null;
  if (wishMessageP && CONFIG.cake.wishMessage) {
    wishMessageP.textContent = formatText(CONFIG.cake.wishMessage);
  }

  const cakeCanvas = document.getElementById('confetti-canvas');
  let cakeConfetti = null;

  if (wishBtn) {
    wishBtn.addEventListener('click', handleMakeWish);
  }

  function handleMakeWish() {
    if (!wishBtn || wishBtn.disabled) return;

    // 1. Disable button to prevent multi-clicks
    wishBtn.disabled = true;
    wishBtn.classList.add('disabled');
    wishBtn.style.opacity = '0.7';
    wishBtn.style.cursor = 'default';

    // 2. Extinguish all flames
    const flames = document.querySelectorAll('#cake-section .flame');
    flames.forEach((flame) => {
      flame.classList.add('blown-out');
    });

    // 3. Reveal wish message after 500ms
    setTimeout(() => {
      if (wishMessageContainer) {
        wishMessageContainer.classList.add('visible');
      }
    }, 500);

    // 4. Confetti and fireworks celebration after 800ms
    setTimeout(() => {
      triggerCakeCelebration();
    }, 800);

    // 5. Floating ambient hearts rising around the cake after 3s
    setTimeout(() => {
      spawnCakeFloatingHearts();
    }, 3000);
  }

  function triggerCakeCelebration() {
    if (!cakeCanvas || typeof ConfettiEngine === 'undefined') return;

    if (!cakeConfetti) {
      cakeConfetti = new ConfettiEngine(cakeCanvas);
    }

    const cakeSection = document.getElementById('cake-section');
    if (cakeSection) {
      cakeConfetti.resize(cakeSection.clientWidth, cakeSection.clientHeight);
    }

    const w = cakeConfetti.width;
    const h = cakeConfetti.height;

    // Fire dual bursts from lower left and right
    cakeConfetti.burst({
      x: w * 0.25,
      y: h * 0.7,
      count: 70,
      angle: -60,
      spread: 70,
      speed: 12
    });

    cakeConfetti.burst({
      x: w * 0.75,
      y: h * 0.7,
      count: 70,
      angle: -120,
      spread: 70,
      speed: 12
    });

    // Center heart burst
    setTimeout(() => {
      cakeConfetti.heartBurst({
        x: w * 0.5,
        y: h * 0.45,
        count: 60,
        speed: 9
      });
    }, 250);

    // Staggered fireworks
    setTimeout(() => {
      cakeConfetti.firework({
        startX: w * 0.2,
        startY: h,
        targetY: h * 0.25,
        heartBurst: true
      });
    }, 500);

    setTimeout(() => {
      cakeConfetti.firework({
        startX: w * 0.8,
        startY: h,
        targetY: h * 0.25,
        heartBurst: false
      });
    }, 900);

    setTimeout(() => {
      cakeConfetti.firework({
        startX: w * 0.5,
        startY: h,
        targetY: h * 0.2,
        heartBurst: true
      });
    }, 1400);
  }

  function spawnCakeFloatingHearts() {
    const cakeScene = document.querySelector('.cake-scene');
    if (!cakeScene) return;

    const heartSymbols = ['♥', '❤', '💖', '💕'];
    const totalHearts = 12;

    for (let i = 0; i < totalHearts; i++) {
      setTimeout(() => {
        const heart = document.createElement('span');
        heart.className = 'cake-ambient-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        const xPos = Math.random() * 80 + 10; // 10% to 90% across cake scene
        const size = Math.random() * 12 + 14; // 14px to 26px
        const duration = Math.random() * 2 + 2.5; // 2.5s to 4.5s

        heart.style.position = 'absolute';
        heart.style.left = `${xPos}%`;
        heart.style.bottom = '120px';
        heart.style.fontSize = `${size}px`;
        heart.style.color = '#FF69B4';
        heart.style.opacity = '0';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '5';
        heart.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;

        cakeScene.appendChild(heart);

        // Trigger float
        requestAnimationFrame(() => {
          heart.style.opacity = '0.85';
          heart.style.transform = `translateY(-${Math.random() * 120 + 80}px) scale(1.2)`;
        });

        // Clean up
        setTimeout(() => {
          heart.style.opacity = '0';
          setTimeout(() => {
            if (heart.parentNode) {
              heart.parentNode.removeChild(heart);
            }
          }, 600);
        }, (duration - 0.6) * 1000);
      }, i * 250);
    }
  }
}

// Export globally
window.initCake = initCake;
