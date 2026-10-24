# 🌸 A Little World for You ♡ — Sahana's Birthday Scrapbook

A cute, pink-and-cream scrapbook birthday website created for **Sahana** (Dumbo) by **Aadi**. Built with **React**, **Vite**, **Framer Motion**, and **Web Audio**, featuring separate cinematic pages, scrapbook Polaroid frames, an authentic 3-photo photobooth strip, an interactive cake with real microphone blow detection, and a wax-sealed emotional letter.

---

## 🌟 The 5 Dedicated Pages

1. **Page 1 — Welcome (`#/welcome`)**
   - Preserves the visual style of your starting page: soft blush pink & cream paper textures, floating sparkles (`✦`, `♡`, `✿`, `⋆`), pulsing heart, and the heartfelt greeting: *"Happy Birthday, my favorite human."*
   - Signature: *"made with a whole lot of love by Aadi ♡"*.
   - Interactive button: *"Open your little world →"* that smoothly transitions to Page 2.

2. **Page 2 — Sahana's Solo Gallery (`#/gallery`)**
   - Dedicated photo gallery celebrating Sahana's solo pictures.
   - Scrapbook-style polaroid frames with washi tape, gentle tilt angles, handwritten notes, and an interactive Lightbox viewer when clicked.

3. **Page 3 — Our Three-Photo Photobooth Strip (`#/photobooth`)**
   - Dedicated page with **exactly three photos of us**, arranged vertically in an authentic printed photobooth strip.
   - Vintage photobooth header: *"★ SAHANA & AADI • OFFICIAL PHOTO STRIP ★"*, cream borders, glossy print sheen, date stamp, and handwritten caption underneath: *"Three moments, infinite memories. So lucky to have you in my corner, Dumbo. ♡"*.

4. **Page 4 — Interactive Birthday Cake (`#/cake`)**
   - Cute animated multi-tier pink and cream birthday cake with a candle and flickering flame.
   - **Microphone blowing detection**: click *"Enable Mic to Blow"* and blow softly into your mic to extinguish the candle with real-time breath intensity feedback.
   - **Clickable fallback**: tap the flame or the *"Tap to Blow Out Candle 🎂"* button if mic is unavailable.
   - Extinguishing the candle triggers a burst of pink & gold confetti, a joyful celebration chime, and reveals a sweet birthday wish card for Sahana.

5. **Page 5 — The Emotional Ending (`#/letter`)**
   - Wax-sealed envelope: *"To My Favorite Person in the Universe ♡"*.
   - Tap to break the wax seal with an unfolding animation and paper rustle sound effect.
   - Reveals an aged cream parchment letter with Aadi's sincere, intimate poem and message.
   - Signed: *"Always in your corner, Aadi"*.
   - Includes *"Celebrate Again 🎉"* confetti button and *"Replay Our Little World ↺"* to start over.

---

## 📸 How to Replace Photos

Place your photos inside the [`public/images/`](file:///e:/birthday/public/images) folder using these exact filenames:
- **Sahana's solo gallery photos (Page 2):**
  - `/images/her-1.jpg`
  - `/images/her-2.jpg`
  - `/images/her-3.jpg`
  - `/images/her-4.jpg`
- **Our 3 photobooth photos (Page 3):**
  - `/images/photobooth-1.jpg`
  - `/images/photobooth-2.jpg`
  - `/images/photobooth-3.jpg`

*(Sample placeholder images have been included so you can preview the layout immediately before replacing them).*

---

## 🛠️ Personalization

All personalization is centralized in **[`src/birthdayConfig.js`](file:///e:/birthday/src/birthdayConfig.js)**:
```javascript
export const BIRTHDAY_CONFIG = {
  herName: "Sahana",
  nickname: "Dumbo",
  yourName: "Aadi",
  // ...
};
```

---

## 🚀 How to Run Locally

### 1. Start the local development server
```bash
npm run dev
```
Open your browser and visit: **`http://localhost:5173/`**

### 2. Build for production & deployment (e.g., Vercel)
```bash
npm run build
```
This produces an optimized build in the `dist/` folder, configured with root paths for smooth Vercel deployment.
