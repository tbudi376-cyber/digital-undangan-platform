# Agent Brief: Structural Layout Differentiation for the 5 Temu Waktu Themes

This document is an agent-facing implementation brief for an AI coding agent (e.g. running the `/impeccable` skill in Antigravity). It supersedes the "Zero Architecture Changes" constraint in `THEME_REDESIGN_BRIEF.md` Section 5.1 for this specific initiative.

## 0. Problem Statement

Audit finding: `ThemeElegant`, `ThemeRustic`, `ThemeSoftPastel`, and `ThemeConservatory` all compose the exact same shared components (`CoverScreen`, `Countdown`, `Gallery`, `GiftSection`, `RsvpForm`, `Guestbook`) in the exact same vertical stacking order, differentiated only by color tokens and font family. Only `ThemeMinimalist` diverges structurally (left-aligned, monospace, asymmetric).

Result: the 5 themes read as "one template, 5 skins" rather than 5 distinct design languages, despite having genuinely different color/typography direction.

Goal: give each theme a structurally distinct **composition** — different spatial arrangement, information hierarchy, and interaction pattern — while keeping the same underlying `ClientData` props contract so no backend/GAS changes are required.

---

## 1. Theme Elegant — "Vertical Portrait Salon" (baseline, keep as reference)

Keep as the canonical symmetric, centered, single-column vertical scroll — badge → centered name → guest plaque → full-width pill CTA, sections stacked and centered. This remains the "classic" composition other themes should visibly diverge from.

---

## 2. Theme Rustic — "Field Journal Collage"

Replace the centered-card stacking with an asymmetric scrapbook composition:
- **Cover**: Photo occupies an off-center rotated frame (`rotate-[-2deg]`) rather than full-bleed background; name lockup sits beside it, not on top of it.
- **Event details**: Two-column journal layout — akad/resepsi cards staggered at different vertical offsets (like taped-in journal entries), not a centered symmetric pair.
- **Gallery**: Staggered polaroid-style grid with alternating rotation per photo (`rotate-[-3deg]`, `rotate-[2deg]`) and visible "tape corner" accents, instead of a uniform grid.
- **Section dividers**: Torn-paper edge SVG instead of the shared olive-vine divider.

---

## 3. Theme Minimalist — "Architectural Split Screen" (push further)

Already the most structurally distinct — extend it:
- **Layout**: Full-bleed alternating split-screen sections (photo left / content right, then flipped next section), not stacked centered cards.
- **Navigation**: Fixed left-edge vertical index rail with section numbers (`01`, `02`, `03`...) that highlights the active section on scroll.
- **Names**: Overlapping asymmetric baseline typography (groom name large top-left, bride name large bottom-right, overlapping the fold) instead of centered "Nama & Nama".

---

## 4. Theme Soft Pastel — "Love Story Timeline"

Replace centered stacked sections with a vertical timeline/chat composition:
- **Structure**: A glowing center beam runs the page length; content cards alternate left/right of the beam like a chat thread or story timeline, connected by short beam segments.
- **Amplop Digital**: Bank/gift cards render as a fanned card stack (like a wallet) that spreads on tap, instead of a single static card.
- **Countdown**: Floating glassmorphism orb cluster instead of a horizontal 4-box row.

---

## 5. Theme Conservatory — "Living Scene with Interactive Hotspots" (build the original vision)

This is not a new idea — it is the theme as originally specified in `THEME_INTERACTIVE_ELEVATION_BRIEF.md` Section 4, which was never implemented. Build it now:
- **Cover/Hero**: Single illustrated glasshouse scene canvas (SVG or layered CSS), not a photo-background cover screen.
- **4 hotspots** positioned within the scene, each opening a drawer/modal on tap:
  1. Canvas easel → Gallery lightbox
  2. Signpost → Event details + maps
  3. Treasure chest → GiftSection (needs its own `"conservatory"` variant — see below)
  4. Postbox/lantern → RsvpForm (needs its own `"conservatory"` variant — see below)
- **Dual-mode fallback**: below the scene, keep a linear scroll version for guests who prefer not to interact with hotspots (accessibility requirement from the original brief, Section 4.1).
- **Prerequisite fix**: this cannot ship correctly until `Countdown.tsx`, `Gallery.tsx`, `GiftSection.tsx`, `RsvpForm.tsx`, and `Guestbook.tsx` each get an actual `"conservatory"` variant (emerald palette) instead of silently reusing `"rustic"`.

---

## 6. Execution Order & Verification Gates

1. Add `"conservatory"` variant support to the 5 shared components listed above (unblocks Section 5, and fixes the standalone visual-consistency bug independent of this brief).
2. Rebuild `ThemeConservatory.tsx` as the hotspot living-scene layout (Section 5).
3. Restructure `ThemeSoftPastel.tsx` into the timeline composition (Section 4).
4. Restructure `ThemeRustic.tsx` into the collage composition (Section 2).
5. Extend `ThemeMinimalist.tsx` into the split-screen composition (Section 3).
6. Leave `ThemeElegant.tsx` as the unchanged baseline.
7. After each theme: run `npm run verify` (`tsc --noEmit`, `eslint`, `next build`) — 0 errors before moving to the next theme.
8. Update `app/page.tsx` catalog card screenshots/descriptions once layouts change, and fix the duplicate Unsplash image between `elegant` and `conservatory` catalog entries while in there.
