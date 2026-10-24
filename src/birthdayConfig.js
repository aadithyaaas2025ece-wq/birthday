/**
 * 🎂 BIRTHDAY WEBSITE CONFIGURATION
 * =====================================
 * Centralized personalization for Sahana & Aadi's birthday website.
 * 
 * 📸 HOW TO REPLACE PHOTOS:
 * Place your own photos into the `public/images/` folder using the exact same filenames:
 * - `her-1.jpg`, `her-2.jpg`, `her-3.jpg`, `her-4.jpg` (Sahana's solo photos)
 * - `photobooth-1.jpg`, `photobooth-2.jpg`, `photobooth-3.jpg` (Our three photobooth photos)
 */

export const BIRTHDAY_CONFIG = {
  // ─── 1. Personalization ───────────────────────────────────────
  herName: "Sahana",
  nickname: "Dumbo",
  herNickname: "Dumbo",
  yourName: "Aadi",

  // ─── Page 1: Welcome Screen ───────────────────────────────────
  welcome: {
    tinyLabel: "a tiny birthday universe, made for you",
    title: "Happy Birthday,\nmy favorite human.",
    subtitle: "A little world full of memories, soft pink things, and all the love you deserve. Ready to step inside?",
    buttonText: "Open your little world",
    signature: "made with a whole lot of love by Aadi ♡"
  },

  // ─── Page 2: Sahana's Solo Gallery ────────────────────────────
  herGallery: {
    pageTitle: "Celebrating Sahana",
    pageSubtitle: "A little corner celebrating your radiance, your laughter, and the magic you bring everywhere, Dumbo.",
    photos: [
      {
        id: "her-photo-1",
        src: "/images/her-1.jpg",
        title: "Golden Hour Glow",
        caption: "That smile that can make the cloudiest day feel bright.",
        date: "Forever iconic ✨",
        rotation: "-2deg",
        tapeColor: "rgba(246, 220, 226, 0.85)"
      },
      {
        id: "her-photo-2",
        src: "/images/her-2.jpg",
        title: "Warm Brews & Big Laughs",
        caption: "Candid, carefree, and our favorite Dumbo.",
        date: "Cozy vibes ☕",
        rotation: "2.5deg",
        tapeColor: "rgba(245, 228, 206, 0.85)"
      },
      {
        id: "her-photo-3",
        src: "/images/her-3.jpg",
        title: "Blooming & Thriving",
        caption: "More beautiful than any bouquet of flowers.",
        date: "Pure joy 🌸",
        rotation: "-1.8deg",
        tapeColor: "rgba(239, 203, 213, 0.85)"
      },
      {
        id: "her-photo-4",
        src: "/images/her-4.jpg",
        title: "Peaceful Moments",
        caption: "Those gorgeous curls and that gentle, warm heart.",
        date: "Sunlit memory 📖",
        rotation: "2deg",
        tapeColor: "rgba(246, 220, 226, 0.85)"
      }
    ]
  },

  // ─── Page 3: Our Three-Photo Photobooth Strip ─────────────────
  // EXACTLY THREE PHOTOS — Vertically arranged in classic vintage printed photobooth strip
  photobooth: {
    pageTitle: "Our Photobooth Strip",
    pageSubtitle: "Three frames from our scrapbook of endless laughter, side-by-side chaos, and core memories.",
    stripHeader: "★ SAHANA & AADI • OFFICIAL PHOTO STRIP ★",
    dateStamp: "SAHANA & AADI • CHAPTER 2026",
    handwrittenCaption: "Three moments, infinite memories. So lucky to have you in my corner, Dumbo. ♡",
    photos: [
      {
        id: "strip-photo-1",
        src: "/images/photobooth-1.jpg",
        label: "Photo 01",
        caption: "The goofy chaos only we understand"
      },
      {
        id: "strip-photo-2",
        src: "/images/photobooth-2.jpg",
        label: "Photo 02",
        caption: "Always in sync, double peace signs"
      },
      {
        id: "strip-photo-3",
        src: "/images/photobooth-3.jpg",
        label: "Photo 03",
        caption: "My safe haven, through every season"
      }
    ]
  },

  // ─── Page 4: Interactive Birthday Cake ────────────────────────
  cake: {
    pageTitle: "Make a Birthday Wish",
    pageSubtitle: "Close your eyes, think of the happiest thing you want this year, and blow out the candle!",
    micPrompt: "Blow softly into your microphone to extinguish the flame!",
    micButtonStart: "🎙️ Enable Mic to Blow",
    micListeningText: "Listening... blow now! 💨",
    clickFallbackPrompt: "Or tap the flame / button below to blow it out",
    clickFallbackButton: "Tap to Blow Out Candle 🎂",
    wishRevealedTitle: "Happy Birthday, Sahana! 🌸✨",
    wishRevealedMessage: "May every single wish you whispered today come true, Dumbo. You deserve all the peace, laughter, adventures, and unconditional happiness in the world."
  },

  // ─── Page 5: The Emotional Ending Letter ──────────────────────
  // EXACT USER-SUPPLIED LETTER (Preserves tone, paragraph breaks, and poem line breaks)
  letter: {
    pageTitle: "A Letter For You",
    pageSubtitle: "One last little keepsake before you go...",
    envelopeLabel: "To My Favorite Person in the Universe ♡",
    envelopeSubtext: "(Tap to break seal & open letter)",
    date: "October 2026",
    paragraphs: [
      "I tried to write you something fancy and kept deleting it, so I’ll just say it straight. I’m really glad you’re in my life.",
      "Your laugh gets stuck in my head for hours after we talk. Ordinary days feel lighter when you’re around, and I notice it when you’re not. I haven’t figured out what to do with that yet, so I’m leaving it here.",
      "I hope this year is gentle with you. I hope you get the good news you’ve been waiting for, the slow mornings, and the people who actually show up. You deserve more than you ever ask for."
    ],
    poem: [
      "Some people arrive like the first rain on dry ground.",
      "The whole air changes before you know why.",
      "I’ve been standing in it a while now,",
      "and I haven’t once looked for a roof."
    ],
    closing: "Always in your corner,",
    signature: "Aadi"
  }
};
