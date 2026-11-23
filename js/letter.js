/**
 * Letter & Typewriter Module
 * Handles the animated envelope opening sequence and character-by-character love letter typing effect.
 */

function initLetter() {
  if (typeof CONFIG === 'undefined' || !CONFIG.letter) {
    console.warn('Letter configuration missing in CONFIG.');
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
  const letterTitleEl = document.querySelector('#letter-section .section-title');
  if (letterTitleEl && CONFIG.letter.sectionTitle) {
    letterTitleEl.textContent = formatText(CONFIG.letter.sectionTitle);
  }

  // Envelope Label
  const envelopeLabelEl = document.querySelector('.envelope-label');
  if (envelopeLabelEl && CONFIG.letter.envelopeLabel) {
    envelopeLabelEl.textContent = formatText(CONFIG.letter.envelopeLabel);
  }

  // Envelope and Letter DOM elements
  const envelope = document.getElementById('envelope');
  const envelopeHint = document.querySelector('.envelope-hint');
  const letterContainer = document.getElementById('letter-container');
  const letterText = document.getElementById('letter-text');

  if (!envelope || !letterContainer || !letterText) return;

  let hasOpened = false;

  envelope.addEventListener('click', () => {
    if (hasOpened) return;
    hasOpened = true;

    // Open envelope
    envelope.classList.add('opened');

    // Hide opening hint
    if (envelopeHint) {
      envelopeHint.style.opacity = '0';
      envelopeHint.style.transform = 'translateY(10px)';
      envelopeHint.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      setTimeout(() => {
        envelopeHint.style.display = 'none';
      }, 400);
    }

    // Wait 800ms for envelope flap animation to complete
    setTimeout(() => {
      letterContainer.classList.add('visible');

      // Give a tiny moment for letter paper to slide into view, then start typewriter
      setTimeout(() => {
        startTypewriter();
      }, 400);
    }, 800);
  });

  /**
   * Starts the typewriter effect on #letter-text
   */
  function startTypewriter() {
    const rawContent = CONFIG.letter.content || '';
    const formattedContent = formatText(rawContent);

    // Clear any existing content
    letterText.innerHTML = '';

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'letter-cursor typewriter-cursor';
    cursor.textContent = '|';
    cursor.style.display = 'inline-block';
    cursor.style.marginLeft = '2px';
    cursor.style.animation = 'cursorBlink 0.8s infinite';
    cursor.style.color = 'var(--deep-burgundy, #800020)';
    cursor.style.fontWeight = 'bold';

    // Inject cursor blinking keyframes if not defined in stylesheet
    if (!document.getElementById('cursor-blink-style')) {
      const style = document.createElement('style');
      style.id = 'cursor-blink-style';
      style.textContent = `
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    letterText.appendChild(cursor);

    let charIndex = 0;
    const totalChars = formattedContent.length;
    const typingSpeed = 30; // 30ms per character as specified

    function typeNextChar() {
      if (charIndex < totalChars) {
        const char = formattedContent[charIndex];

        if (char === '\n') {
          const br = document.createElement('br');
          letterText.insertBefore(br, cursor);
        } else {
          const textNode = document.createTextNode(char);
          letterText.insertBefore(textNode, cursor);
        }

        charIndex++;

        // Keep cursor in view with smooth scroll
        if (charIndex % 15 === 0 || char === '\n') {
          cursor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        setTimeout(typeNextChar, typingSpeed);
      } else {
        // Typing finished! Fade out and remove cursor after a gentle pause
        setTimeout(() => {
          cursor.style.transition = 'opacity 0.6s ease';
          cursor.style.opacity = '0';
          setTimeout(() => {
            if (cursor.parentNode) {
              cursor.parentNode.removeChild(cursor);
            }
          }, 600);
        }, 1500);
      }
    }

    typeNextChar();
  }
}

// Export globally
window.initLetter = initLetter;
