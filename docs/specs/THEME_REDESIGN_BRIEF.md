# Agent Brief: High-End Visual Elevation for Temu Waktu Themes

This document is an agent-facing implementation brief. It is designed to be consumed directly by an AI coding agent running the `/impeccable` skill to redesign and elevate the visual fidelity of the 3 core themes in `components/themes/`.

---

## 1. Objective & Leading Words

The current implementations of `ThemeElegant`, `ThemeRustic`, and `ThemeMinimalist` are structurally complete and modular, but visually plain. They require deep visual elevation from basic CSS cards into **couture-level digital invitations** that provoke an immediate emotional "wow" response on mobile devices.

### Leading Words
- **Editorial**: Layouts must look like Vogue / Kinfolk spreads, not generic SaaS bootstrap cards.
- **Atmospheric**: Rich ambient depth using layered gradients, grain textures, delicate box-shadows, and micro-animations.
- **Tactile**: Interactive elements must feel physical (wax seals, gold leaf foils, deckled edges, embossed paper cards).
- **Responsive**: Flawless mobile-first presentation (360px–430px viewport primary, responsive to desktop tablet).

---

## 2. Theme 1: Theme Elegant (`components/themes/ThemeElegant.tsx`)

### Art Direction: *Parisian Salon & Champagne Rose Luxury*
Transform from a generic pink card into a prestigious, high-jewelry aesthetic.

### Visual Requirements
1. **Palette**:
   - Primary: Deep wine rose (`#6B1728`) and warm champagne gold accents (`#D4AF37`, `#F3E5AB`).
   - Background: Soft silk ivory (`#FDFBF7`) with subtle warm radial ambient lights.
2. **Cover Screen**:
   - Wax seal interactive button with realistic shadow, pulse effect, and gold embossed ring.
   - Dual-tone decorative arch frame with delicate gold stroke corners (`border-amber-400/40`).
3. **Typography**:
   - High-contrast serif headlines (`font-serif italic font-normal`) paired with spaced uppercase letter-spaced sans (`tracking-[0.25em] text-[10px]`).
4. **Interactive Accents**:
   - Shimmer animation on gold buttons and borders (`bg-gradient-to-r via-amber-200`).
   - Bank accounts and gift cards styled as metallic foil cards with gold chip ornament.

---

## 3. Theme 2: Theme Rustic (`components/themes/ThemeRustic.tsx`)

### Art Direction: *Tuscan Olive Garden & Botanical Linen*
Transform from plain green into an artisanal Mediterranean countryside celebration.

### Visual Requirements
1. **Palette**:
   - Primary: Deep Tuscan sage (`#2E4A3D`) and warm earthy terracotta (`#A65D46`).
   - Background: Warm textured handmade paper / linen tone (`#F8F5EE`).
2. **Ornamentation**:
   - Hand-crafted deckled edge shadows (`shadow-[0_10px_30px_rgba(46,74,61,0.08)]`).
   - Delicate botanical leaf accents framing the bride and groom portraits.
3. **Typography**:
   - Literary, warm serif with gentle line-height (`leading-relaxed`) and earthy olive muted tags (`bg-stone-200/60 text-stone-700`).
4. **Cards & Sections**:
   - RSVP & Gift sections framed with double-lined fine borders (`border-stone-300/80 border-dashed`).

---

## 4. Theme 3: Theme Minimalist (`components/themes/ThemeMinimalist.tsx`)

### Art Direction: *Kinfolk / Architectural Modern Monolith*
Transform from basic Tailwind slate cards into a bold, high-contrast Swiss design editorial.

### Visual Requirements
1. **Palette**:
   - Strict monochrome: Deep obsidian black (`#0A0A0A`), crisp stark white (`#FFFFFF`), and refined cool concrete gray (`#E5E7EB`).
2. **Hero & Cover**:
   - Massive editorial typography: Groom and bride names overlapping with asymmetric baseline shifts.
   - Minimalist date stamp styled as a gallery exhibition plaque (`DATE. 31 / 12 / 2026`).
3. **Grid & Dividers**:
   - Hairline borders (`border-black/10`).
   - Clean tabular layout with monospace numerals for countdown and event coordinates.
4. **Micro-interactions**:
   - Crisp hover state transitions (no blurs; pure sharp opacity and scale transforms).

---

## 5. Execution Rules & Constraints

1. **Zero Architecture Changes**:
   - Preserve all data bindings (`ClientData`), props, and child components (`CoverScreen`, `AudioPlayer`, `RsvpForm`, `GiftSection`, `Guestbook`, `Gallery`, `Countdown`).
   - Do NOT break the existing audio trigger mechanism in `CoverScreen.tsx` and `AudioPlayer.tsx`.
2. **CSS & Styling**:
   - Use Tailwind CSS v4 classes exclusively.
   - No external npm CSS libraries.
3. **Verification**:
   - After modifying any theme, execute:
     ```powershell
     npm run verify
     ```
     Verify with zero TypeScript errors, zero ESLint errors, and successful static page compilation.
