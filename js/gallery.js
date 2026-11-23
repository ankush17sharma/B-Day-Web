/**
 * Gallery & Lightbox Module
 * Populates polaroid photo memories and handles touch/keyboard-enabled lightbox navigation.
 */

function initGallery() {
  if (typeof CONFIG === 'undefined' || !CONFIG.gallery) {
    console.warn('Gallery configuration missing in CONFIG.');
    return;
  }

  const galleryData = CONFIG.gallery;
  const images = galleryData.images || [];

  // Helper for placeholders if available
  const formatText = (text) => {
    if (typeof replacePlaceholders === 'function') {
      return replacePlaceholders(text);
    }
    return (text || '')
      .replace(/\{name\}/g, CONFIG.birthdayPerson || '')
      .replace(/\{sender\}/g, CONFIG.sender || '');
  };

  // Set Section Title
  const galleryTitleEl = document.querySelector('#gallery-section .section-title');
  if (galleryTitleEl && galleryData.sectionTitle) {
    galleryTitleEl.textContent = formatText(galleryData.sectionTitle);
  }

  // Lightbox DOM references
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const btnPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
  const btnNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
  const backdrop = lightbox ? lightbox.querySelector('.lightbox-backdrop') : null;

  let currentIndex = 0;

  /**
   * Update lightbox image and caption
   * @param {number} index
   */
  function showLightboxImage(index) {
    if (!images.length || !lightboxImg) return;

    // Circular wrapping
    currentIndex = (index + images.length) % images.length;
    const item = images[currentIndex];

    // Preload & display
    lightboxImg.src = item.url;
    lightboxImg.alt = item.caption ? formatText(item.caption) : `Memory ${currentIndex + 1}`;

    if (lightboxCaption) {
      lightboxCaption.textContent = item.caption ? formatText(item.caption) : '';
    }
  }

  /**
   * Open lightbox at specified image index
   * @param {number} index
   */
  function openLightbox(index) {
    if (!lightbox) return;
    showLightboxImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  /**
   * Close lightbox
   */
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scroll
  }

  // Populate Polaroid cards in the grid
  const polaroidGrid = document.querySelector('.gallery-grid');
  const polaroids = document.querySelectorAll('.polaroid');

  // If DOM cards exist, populate them
  polaroids.forEach((card, idx) => {
    const dataIdx = card.getAttribute('data-index');
    const index = dataIdx !== null ? parseInt(dataIdx, 10) : idx;

    if (images[index]) {
      const item = images[index];
      const img = card.querySelector('img');
      const caption = card.querySelector('.polaroid-caption');

      if (img) {
        img.src = item.url;
        img.alt = item.caption ? formatText(item.caption) : `Memory ${index + 1}`;
        img.loading = 'lazy';
      }

      if (caption) {
        caption.textContent = item.caption ? formatText(item.caption) : '';
      }

      // Open lightbox on card click
      card.addEventListener('click', () => {
        openLightbox(index);
      });
    }
  });

  // If there are more images in CONFIG than polaroids in DOM, generate them dynamically
  if (polaroids.length < images.length && polaroidGrid) {
    for (let i = polaroids.length; i < images.length; i++) {
      const item = images[i];
      const card = document.createElement('div');
      card.className = 'polaroid animate-on-scroll';
      card.setAttribute('data-index', i.toString());

      card.innerHTML = `
        <div class="polaroid-image">
          <img src="${item.url}" alt="${item.caption ? formatText(item.caption) : `Memory ${i + 1}`}" loading="lazy">
        </div>
        <p class="polaroid-caption">${item.caption ? formatText(item.caption) : ''}</p>
      `;

      card.addEventListener('click', () => {
        openLightbox(i);
      });

      polaroidGrid.appendChild(card);
    }
  }

  // Lightbox controls
  if (btnClose) {
    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeLightbox);
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentIndex - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentIndex + 1);
    });
  }

  // Keyboard navigation (Escape, Left Arrow, Right Arrow)
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showLightboxImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showLightboxImage(currentIndex + 1);
    }
  });

  // Touch Swipe Support for Mobile
  if (lightbox) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    lightbox.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      if (e.changedTouches.length > 0) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
      }
    }, { passive: true });

    function handleSwipe() {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const threshold = 45; // Minimum px to register as swipe

      // Ensure horizontal swipe is dominant over vertical scroll
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
        if (diffX < 0) {
          // Swiped left -> Next
          showLightboxImage(currentIndex + 1);
        } else {
          // Swiped right -> Previous
          showLightboxImage(currentIndex - 1);
        }
      }
    }
  }
}

// Export globally
window.initGallery = initGallery;
