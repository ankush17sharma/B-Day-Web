/**
 * ============================================================================
 * Romantic Birthday Website Configuration
 * ============================================================================
 * 
 * This configuration file contains all the customizable text, images, and
 * settings for the romantic birthday experience.
 * 
 * CUSTOMIZATION GUIDE:
 * - Replace 'birthdayPerson' with the name of the special someone.
 * - Replace 'sender' with your name.
 * - Use '{name}' as a placeholder in strings to automatically insert the birthday person's name.
 * - Use '{sender}' as a placeholder in strings to automatically insert your name.
 * - Image URLs can be Unsplash links or relative local paths (e.g., 'assets/images/photo1.jpg').
 * - Audio file can be placed under 'assets/music/'.
 * 
 * ============================================================================
 */

const CONFIG = {
  // --- Personal Details ---
  // The name of the birthday celebrant and the person giving the gift
  birthdayPerson: "Aanya",
  sender: "Aryan",

  // --- Landing Screen ---
  // The initial fullscreen curtain screen before unlocking the celebration
  landing: {
    title: "To My Favorite Person ❤️",
    subtitle: "Something special is waiting for you...",
    buttonText: "Open Your Surprise ✨",
    backgroundImage: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=1200&q=80"
  },

  // --- Hero Section ---
  // The opening romantic greeting right after the landing screen unlocks
  hero: {
    subtitle: "To the girl who makes my world brighter, my heart happier, and every ordinary day extraordinary.",
    backgroundImage: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1200&q=80",
    scrollHint: "Scroll down for your surprise ↓"
  },

  // --- Background Music ---
  // Music player settings (plays automatically upon landing screen interaction)
  music: {
    file: "assets/music/background.mp3",
    title: "Our Little Love Story ♡"
  },

  // --- Photo Gallery ---
  // Polaroid-style memory snapshots with loving captions
  gallery: {
    sectionTitle: "Our Love Story 💕",
    images: [
      {
        url: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800&q=80",
        caption: "That smile I could stare at forever."
      },
      {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
        caption: "Every moment with you feels magical."
      },
      {
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
        caption: "My favorite place is right beside you."
      },
      {
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
        caption: "Little moments, biggest memories."
      },
      {
        url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
        caption: "Somehow, you make everything beautiful."
      },
      {
        url: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
        caption: "Forever wouldn't be long enough."
      }
    ]
  },

  // --- Heartfelt Love Letter ---
  // Interactive letter inside an animated envelope with typewriter effect
  letter: {
    sectionTitle: "A Letter for You 💌",
    envelopeLabel: "To My Beautiful {name} ❤️",
    content: `Happy Birthday, my love!\n\nToday is the day the world got a little more beautiful because you were born.\n\nI wish I could wrap all my love, happiness, and every beautiful thing in the universe and give it to you today.\n\nYou make ordinary moments feel magical. Your smile is my favorite sight, your laughter my favorite sound, and your presence my favorite feeling.\n\nI hope this year brings you everything your heart wishes for. I hope you always find reasons to smile, dreams to chase, and love surrounding you wherever you go.\n\nIf I could choose again, in every lifetime, I would still choose you.\n\nHappy Birthday, my princess. ❤️\n\nForever yours,\n{sender}`
  },

  // --- Reasons Why I Love You ---
  // Interactive flip cards and infinite random reason generator
  reasons: {
    sectionTitle: "Reasons Why I Love You 💗",
    list: [
      "Your beautiful smile.",
      "Your adorable little habits.",
      "Your kind and beautiful heart.",
      "The way you make me laugh.",
      "The way you understand me.",
      "The warmth of your hugs.",
      "Simply because you're YOU."
    ],
    extraReasons: [
      "The way your eyes light up when you're happy.",
      "Your contagious laughter that fills my heart.",
      "How you always know the right thing to say.",
      "The way you care about everyone around you.",
      "Your strength and determination.",
      "How you make even boring days exciting.",
      "The way you hold my hand.",
      "Your beautiful soul.",
      "How you make me want to be a better person.",
      "Every single thing about you.",
      "The way you look at me.",
      "Your passion for the things you love.",
      "How you never give up.",
      "The way you dance when nobody's watching.",
      "Your morning voice.",
      "How you steal all the blankets.",
      "The way you scrunch your nose.",
      "Your terrible jokes that I secretly love.",
      "How safe I feel with you.",
      "Because my heart chose you."
    ],
    moreButtonText: "Give Me Another Reason ❤️"
  },

  // --- Interactive Birthday Cake ---
  // 3D CSS cake with blowing candle animation and confetti explosion
  cake: {
    sectionTitle: "Make a Birthday Wish 🎂",
    wishButtonText: "Make a Wish ✨",
    wishMessage: "May all your dreams come true, my love! ✨❤️"
  },

  // --- Secret Easter Egg ---
  // Hidden interactive heart button requiring multi-clicks to unlock
  secret: {
    clicksRequired: 5,
    title: "Secret message unlocked! ❤️",
    message: "You have no idea how much happiness you bring into my life.\n\nI love you more than words can ever explain. 💕"
  },

  // --- Grand Finale ---
  // Cinematic lines presentation and virtual hug burst animation
  finale: {
    backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    lines: [
      "Out of all the beautiful things in this world...",
      "You are my favorite. ❤️",
      "Happy Birthday, {name}.",
      "I hope I get to celebrate a thousand more birthdays with you.",
      "I love you endlessly. 💕"
    ],
    hugButtonText: "Send Me a Virtual Hug 🤗",
    hugMessage: "Sending you the biggest hug in the universe! ❤️\n\nYou deserve all the love in the world. 💕"
  }
};
