# Agent Brief: Interactive Elevation, Living Scene Theme & Floating Ambience

This document is an agent-facing implementation brief. It is designed to be consumed directly by an AI coding agent running the `/impeccable` skill to elevate Temu Waktu wedding invitations from static vertical pages into a deeply engaging, interactive experience inspired by premium benchmarks (such as Abadikan.id), without compromising high-fashion bridal luxury.

---

## 1. Leading Words & Creative North Star

- **Scenographic**: Spaces feel alive—drawing guests into an architectural or botanical world with depth, light, and dimension rather than flat cards over plain cream backgrounds.
- **Tactile**: Buttons, dividers, and frames possess physical weight: deckled paper edges, etched gold hairlines, wax seals, and embossed card borders.
- **Ambient**: Subtle kinetic energy—floating gold dust or garden petals, animated equalizer audio waves, and real-time floating guest wishes.
- **Hotspot**: Interactive focal points in living scenes that invite guests to tap and discover details (gallery, itinerary, RSVP, wedding gifts).
- **Dual-Mode**: Interactivity never blocks accessibility. Guests can interact via living scene hotspots OR scroll naturally down the linear storytelling hierarchy.

---

## 2. Global Interactive Floating Widgets (Injected Across All Themes)

Every theme rendered via `components/themes/ThemeRenderer.tsx` shall receive three non-intrusive floating micro-interaction widgets:

### 2.1. `AtmosphereParticles.tsx` (Ambient Particle System + Toggle Switch)
- **Visuals**: Lightweight Canvas or GPU-accelerated CSS floating particles suited to each theme:
  - *Imperial Rose & Gold*: Floating champagne gold micro-dust / bokeh sparkles.
  - *Tuscan Sage & Linen*: Drifting botanical olive leaves & dried flora petals.
  - *Soft Pastel Twilight*: Glowing starlight dust & violet nebula embers.
  - *Architectural Monochrome*: Subtle geometric dust specks / architectural grid light points.
  - *Living Scene (Conservatory)*: Whispering garden fireflies & floating glasshouse pollen.
- **Floating Switch Button**:
  - Compact pill button at top-left or right edge (`✨ Efek Suasana: ON/OFF`).
  - Allows guests with older devices or reduced-motion preferences to toggle particles with zero friction. Respects `prefers-reduced-motion`.

### 2.2. `WaveAudioPlayer.tsx` (Live Animated Equalizer)
- Replaces static rotating disk with a luxury bridal audio pill:
  - 4-bar dynamic CSS equalizer dancing to simulated frequency bars when audio is playing.
  - Delicate track title marquee (e.g., *"Canon in D — Acoustic Cello"*).
  - Tap-to-mute/pause with smooth icon transitions (Play / Pause / Volume wave).
  - Preserves auto-play initiation from `CoverScreen` ("Buka Undangan" user gesture).

### 2.3. `FloatingWishesTicker.tsx` (Live Doa & Harapan Tamu)
- Bottom floating pill/badge displaying rotating guest prayers from `Guestbook` data:
  - Rotates every 6 seconds with smooth slide-up fade animation:
    - *"Budi Santoso: 'Selamat menempuh hidup baru Anton & Dania! Sakinah mawaddah...'"*
  - Badge with guest count indicator: `💌 48 Doa Restu`.
  - Tap opens a quick drawer or smoothly scrolls to `#guestbook` section.
  - Includes a subtle `X` dismiss button so guests can hide it if desired.

---

## 3. Visual Enrichment for the 4 Existing Themes (Anti-Polos Overhaul)

Audit each existing theme component to eliminate plain, static white space:

### 3.1. `components/themes/ThemeElegant.tsx` (Imperial Rose & Gold)
- **Background Layer**: Subtle watermark damask / royal French archival filigree pattern at 3% opacity (`pointer-events-none`).
- **Section Dividers**: Custom SVG classical flourish dividers with central royal monogram crest separating Couple, Event, and Gallery.
- **Borders & Frames**: Gold dual-hairline framing (`border border-[#D4AF37]/40 outline outline-1 outline-[#D4AF37]/20 outline-offset-4`) around couple photos and countdown clocks.
- **Motion**: `intersection-observer` scroll-reveal staggered animation for event cards.

### 3.2. `components/themes/ThemeRustic.tsx` (Tuscan Sage & Linen)
- **Background Layer**: Tactile handmade paper texture (`bg-[radial-gradient(#2E4A3D_1px,transparent_1px)] [background-size:24px_24px] opacity-10`) plus botanical watercolor foliage corner vignettes.
- **Section Dividers**: Hand-drawn olive branch vine SVG dividers.
- **Borders & Frames**: Deckled edge paper card shadows (`shadow-[0_8px_30px_rgba(46,74,61,0.08)]`), wax seal stamp icons on RSVP and Gift cards.

### 3.3. `components/themes/ThemeMinimalist.tsx` (Architectural Monochrome)
- **Background Layer**: Subtle Swiss editorial grid lines (`border-x border-black/5` running full-height) with architectural coordinate markings (`48°51'24"N`).
- **Section Dividers**: Asymmetrical hairline rules with section numbering: `01 / THE UNION`, `02 / THE RENDEZVOUS`, `03 / THE REGISTRY`.
- **Borders & Frames**: Precision museum plakat borders with stark black high-contrast pill badges.

### 3.4. `components/themes/ThemeSoftPastel.tsx` (Soft Pastel Twilight)
- **Background Layer**: Ambient violet/indigo mesh gradient glow pulsing slowly (`animate-pulse-slow`) in the background.
- **Section Dividers**: Ethereal glowing beam divider with blurred glassmorphism backdrop.
- **Borders & Frames**: Frosted glassmorphism panels (`backdrop-blur-xl bg-purple-950/20 border border-purple-400/25`).

---

## 4. The 5th Signature Theme: "The Whispering Conservatory" (`theme-conservatory` / `ThemeConservatory.tsx`)

A dedicated **Interactive Living Scene Theme** inspired by Abadikan's living world concept, tailored to luxury botanical weddings.

### 4.1. Conceptual Layout
- **Hero Living Scene Canvas**:
  - Illustrated / layered glasshouse conservatory architectural background (glass arches, cascading hanging wisteria, romantic warm candlelight lanterns, marble gazebo floor).
  - 4 Clickable Interactive Hotspots positioned naturally within the scene:
    1. **Canvas Easel (Galeri Romansa)**: Tapping pulses and opens full-screen interactive photo gallery lightbox.
    2. **Carved Wooden Signpost (Rangkaian Acara & Lokasi)**: Tapping reveals animated agenda card with Google Maps navigation button.
    3. **Royal Gift Box / Treasure Chest (Tanda Kasih & Kado)**: Tapping reveals digital bank cards, QRIS, and one-click copy account number.
    4. **Vintage Postbox & Lantern (Konfirmasi Kehadiran & RSVP)**: Tapping opens RSVP form drawer with direct WhatsApp / Sheet submission.
- **Hotspot Micro-Interactions**:
  - Gentle pulsing beacon glow (`ping` effect) + floating tooltip badge: `[🔍 Ketuk untuk Membuka]`.
  - Haptic feedback / subtle sound effect or smooth modal elevation upon tap.
- **Dual-Mode Linear Flow**:
  - Below the living scene, the full traditional linear ceremony breakdown is rendered so guests who prefer ordinary vertical reading can comfortably scroll through all details.

---

## 5. Catalog Showcase & Landing Page Elevation (`app/page.tsx`)

Update the theme showcase in `app/page.tsx`:
1. **Catalog Array (`THEMES`)**:
   - Add the 5th theme:
     - `id: "conservatory"`
     - `tag: "INTERACTIVE SCENE"`
     - `title: "The Whispering Conservatory"`
     - `description: "Paviliun kaca botani interaktif. Tamu dapat mengetuk easel foto, papan agenda, peti kado, dan kotak surat RSVP di dalam pemandangan hidup yang memukau."`
     - `image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"`
     - `features: ["Living Hotspot Scene", "Ambient Firefly FX", "Live Equalizer Audio"]`
2. **Interactive Feature Badges**:
   - Render mini chips on cards: `✨ Ambient FX`, `🎵 Live Audio Wave`, `🏛️ Interactive Scene`.
   - Update demo links: `/romeo-juliet?theme=conservatory`.

---

## 6. Execution Order & Verification Gates

1. **Step 1: Floating Shared Components**
   - Create `components/ui/AtmosphereParticles.tsx`.
   - Create `components/ui/WaveAudioPlayer.tsx`.
   - Create `components/ui/FloatingWishesTicker.tsx`.
   - Mount in `components/themes/ThemeRenderer.tsx` with theme-reactive color palettes.
2. **Step 2: Elevate 4 Existing Themes**
   - Inject rich background textures, flourish SVG dividers, and frame borders into `ThemeElegant`, `ThemeRustic`, `ThemeMinimalist`, and `ThemeSoftPastel`.
3. **Step 3: Build the 5th Theme (`ThemeConservatory.tsx`)**
   - Create the living botanical gazebo scene with 4 interactive hotspots + linear fallback.
   - Register in `components/themes/ThemeRenderer.tsx` under `theme === "conservatory"`.
4. **Step 4: Update Catalog & Landing Page**
   - Add `conservatory` to `THEMES` array in `app/page.tsx` with interactive badges.
5. **Step 5: Rigorous Verification Gate**
   - Run `npm run verify` (`tsc --noEmit`, `eslint`, `next build`).
   - Acceptance: 0 TypeScript errors, 0 lint warnings, clean responsive viewport on mobile (375px) & desktop (1440px).
