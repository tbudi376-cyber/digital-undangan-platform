# Agent Brief: Full Audit Findings — Fix & Cleanup Backlog

This document is an agent-facing implementation brief for an AI coding agent (e.g. running the `/impeccable` skill in Antigravity). It consolidates a full code audit conducted externally (security, correctness, dependency, design-consistency, and documentation review). Each item lists status, priority, affected files, and the concrete fix.

**Audit scope note**: `ThemeElegant.tsx`, `ThemeRustic.tsx`, `ThemeMinimalist.tsx`, and `ThemeSoftPastel.tsx` have now been read end-to-end (see item #22 and the "Confirmed clean" note below), in addition to `ThemeConservatory.tsx`, `gas/Code.gs` (all functions), and the `docs/adr/`, `docs/future-features/`, `AGENTS.md`, `CONTEXT.md`, `CLAUDE.md`, `walkthrough.md` context docs. `next build` could not be verified in the audit sandbox (no network access to Google Fonts at build time — environment limitation, not a code issue); `tsc --noEmit`, `eslint`, and `npm audit` were all run successfully. Not yet done: systematic color-contrast/accessibility audit, and on-device visual verification of items #15 and the theme cover-screen mockups shown earlier in review.

---

## ✅ Already Fixed (this pass)

1. **[CRITICAL] Next.js dependency vulnerability** — `next` was pinned to `16.2.6` in `package.json`, which has a critical unauthenticated RCE advisory (plus RCE via Image Optimization API on AVIF, SSRF, cache-confusion). Fixed: bumped to `16.3.5`, ran `npm audit fix`. `npm audit` now reports 0 vulnerabilities. Verified `tsc --noEmit` and `eslint` still pass clean after the bump.
2. **Dead code removed** — `components/ui/AudioPlayer.tsx` was unused (superseded by `WaveAudioPlayer.tsx`) and has been deleted.

---

## 🔴 Not Yet Fixed — Priority 1 (Security)

3. **RSVP backend has no rate limiting or spam protection.** Client-side cooldown in `RsvpForm.tsx` uses `localStorage`, which is trivially bypassed (incognito, direct POST to the GAS `/exec` URL). `gas/Code.gs` `doPost(e)` accepts any volume of requests.
   - **Fix**: add basic throttling in `doPost` (e.g. reject if the same `slug` already has an RSVP entry with the same guest name within N minutes), or require a simple shared secret/token param that the client sends.

4. **Formula injection risk in Google Sheets.** `nama_tamu` and `pesan` are appended to the RSVP sheet via `appendRow` without sanitization. A value starting with `=`, `+`, `-`, or `@` can be interpreted as a formula when the sheet is opened.
   - **Fix**: in `gas/Code.gs` `doPost`, prefix any string field starting with those characters with a leading apostrophe (`'`) before appending.

5. **`kehadiran` field not validated server-side.** `doPost` only checks the field exists, not that its value is `"Hadir"` or `"Tidak Hadir"`. A direct API call can submit an arbitrary value, which then skews the `!== "hadir"` count logic in `/api/rsvp-summary`.
   - **Fix**: validate against the enum in `doPost` before appending; reject/clamp invalid values.

6. **`/api/revalidate` has no required secret if `REVALIDATE_SECRET` is unset.** The check is skipped entirely (`if (expectedSecret && ...)`), so the endpoint is open to anyone if the env var isn't configured.
   - **Fix**: make the check fail closed — reject the request if `REVALIDATE_SECRET` is not configured, rather than silently allowing all requests.

7. **`/generator` (Portal Tamu + RSVP/catering recap) has zero authentication and is on a public route.** Anyone who finds the URL can view any client's guest list, messages, and catering estimates by entering their slug.
   - **Fix**: add a simple password gate (e.g. a shared passphrase stored in an env var, checked client-side against a query param or a basic login form) before rendering the tool.

---

## 🔴 Not Yet Fixed — Priority 2 (Reliability)

8. **Google Drive image URLs use an unreliable hotlink format.** `lib/utils.ts` `getDriveImageUrl` always builds `https://drive.google.com/uc?export=view&id={id}`, which Google throttles/blocks under concurrent load — the exact scenario when many guests open an invitation at once. `next.config.ts` already whitelists `drive.usercontent.google.com` and `lh3.googleusercontent.com` in `remotePatterns`, but `getDriveImageUrl` never uses them.
   - **Fix**: change the URL format to `https://drive.google.com/thumbnail?id={id}&sz=w1600` (or another stable format matching one of the already-whitelisted domains), and update `next.config.ts` remotePatterns if the chosen format needs a different host.

9. **Visual inconsistency in `ThemeConservatory.tsx`.** The cover screen and section wrappers use custom emerald/glasshouse styling, but every shared component call (`Countdown`, `Gallery`, `GiftSection`, `RsvpForm`, `Guestbook`) passes `variant="rustic"` — because none of those components have a `"conservatory"` variant defined. Result: the gift/RSVP/guestbook sections render in cream/olive rustic colors inside an otherwise emerald page.
   - **Fix**: add a `"conservatory"` variant (emerald palette, matching the cover screen) to each of: `Countdown.tsx`, `Gallery.tsx`, `GiftSection.tsx`, `RsvpForm.tsx`, `Guestbook.tsx`. Then update `ThemeConservatory.tsx` to pass `variant="conservatory"` instead of `"rustic"` in all 5 places.

---

## 🔴 Not Yet Fixed — Priority 3 (Design / UX)

10. **Duplicate catalog image.** `app/page.tsx` theme catalog cards for `elegant` and `conservatory` use the exact same Unsplash photo URL (`photo-1519741497674-611481863552`), despite the two themes having very different visual identities.
    - **Fix**: source a distinct representative image (or in-app screenshot) for the Conservatory card.

11. **No mobile navigation.** The landing page nav links (`#katalog`, `#workflow`, `#fitur`, `#harga`, `#faq`) are `hidden md:flex` with no hamburger fallback. On mobile (the primary traffic source, given WhatsApp-driven sharing), only the logo and "Pilih Tema" CTA are visible.
    - **Fix**: add a simple hamburger menu (slide-down or drawer) for the nav links on mobile breakpoints.

12. **Pricing copy says "4 tema" while the catalog shows 5.** `#harga` section lists "Pilihan 4 tema haute-couture eksklusif". This traces back to `SOP_KLIEN.md` (the WhatsApp intake questionnaire) only offering 4 theme choices (Elegant/Rustic/Minimalist/Soft Pastel) — Conservatory was added to the marketing catalog later but never wired into the actual ordering flow or pricing copy.
    - **Fix**: decide product intent — either (a) add Conservatory as a 5th standard option and update pricing copy + `SOP_KLIEN.md` questionnaire to include it, or (b) keep it as a premium add-on and say so explicitly in the pricing section. Either way, update `SOP_KLIEN.md` question 1 to match.

13. **`theme_id` naming inconsistency.** The Soft Pastel catalog card is tagged `AURA ROMANCE` / titled "Soft Pastel Twilight" in copy, but its underlying `theme_id` is `theme9` (with `pastel` also mapped to the same component in `ThemeRenderer.tsx`). Risk of data-entry error when filling the Google Sheet.
    - **Fix**: standardize on one `theme_id` (recommend `pastel`), keep `theme9` as a backward-compatible alias in `THEME_MAP` if old sheet rows use it.

14. **Gallery lightbox is missing basic interactions.** No next/prev navigation while a photo is open (must close and reopen from the grid), no `Escape` key handler, generic `alt` text (`Gallery Image 1`, etc.).
    - **Fix**: add keyboard (`Escape` to close, arrow keys to navigate) and next/prev buttons to the `Gallery.tsx` lightbox; use guest/couple-name-derived alt text where possible.

15. **Possible Toast/AudioPlayer visual collision.** `Toast.tsx` (`fixed bottom-6 left-1/2`) and `WaveAudioPlayer.tsx` (`fixed bottom-6 right-6`) sit at the same vertical position; a long RSVP success message could visually overlap the audio player pill on narrow phone screens. Flagged from position math, not confirmed on-device.
    - **Fix**: verify on an actual small-screen device; if overlap occurs, raise the Toast's bottom offset (e.g. `bottom-24`) or shrink/wrap its max-width.

16. **Structural sameness across themes.** `ThemeElegant`, `ThemeRustic`, `ThemeSoftPastel`, and `ThemeConservatory` all compose the exact same shared components in the exact same order/layout, differing only in color/typography (`ThemeMinimalist` is the sole structural outlier). See the separate brief `docs/specs/THEME_LAYOUT_DIFFERENTIATION_BRIEF.md` for the full per-theme composition redesign plan (Rustic → collage, Minimalist → split-screen, Pastel → timeline, Conservatory → interactive hotspot scene).

---

## 🔴 Not Yet Fixed — Priority 4 (Documentation, low urgency)

17. **Stale early-phase docs.** `walkthrough.md` still describes only 2 themes (Elegant, Rustic) from the project's initial build phase; `SOP_KLIEN.md` only lists 4 themes (see #12). These are expected to lag since the project was recently revived after being dormant — not a functional bug, but worth a documentation pass once the theme roster is finalized.
18. **README references a non-existent component.** README's file-structure section mentions `LinkGeneratorModal.tsx`, which does not exist — the guest-link generator is implemented inline in `app/generator/page.tsx`. README's `.env.example` reference is also stale — no such file exists in the repo.
    - **Fix**: update README file tree to match actual structure; add the missing `.env.example` file, or remove the reference.

---

## 🔴 Not Yet Fixed — Priority 0 (found in a follow-up pass over `gas/Code.gs`)

19. **[ELEVATED SEVERITY] RSVP spam risk (see #3) is multi-tenant.** Per `docs/adr/0001-google-sheets-and-apps-script-for-v1.md`, the GAS backend has a shared quota of 20,000 calls/day **across all clients**. A spam burst (or just heavy organic traffic) against a single client's invitation can exhaust the shared daily quota and take every other client's invitation offline simultaneously. This makes #3 (rate limiting) a platform-availability issue, not just a per-client nuisance — prioritize accordingly.

20. **Two divergent, unsynced client-intake pipelines exist.** `SOP_KLIEN.md` describes a manual WhatsApp questionnaire (26 numbered questions, admin manually fills the Sheet). `gas/Code.gs` `onFormSubmitAutomation` is a fully automated Google Form trigger (30 fields, different order, auto slug-collision resolution, auto Drive folder creation) that was never mentioned in `SOP_KLIEN.md`, `walkthrough.md`, or `CONTEXT.md`.
    - **Action needed (product decision, not a code fix)**: confirm which pipeline is actually live in current practice. If both are in use, document both; if only one is current, mark the other as deprecated in `AGENTS.md`/`CONTEXT.md` so future agents don't act on stale instructions.

21. **Minor: no lock/mutex around slug-collision check in `onFormSubmitAutomation`.** Reads all existing slugs, then appends — two near-simultaneous form submissions could theoretically both pass the uniqueness check before either row is appended, producing a duplicate slug. Low real-world likelihood for a boutique-volume business, but cheap to fix with `LockService.getScriptLock()`.

22. **Wrong time on "Add to Calendar" button (Soft Pastel theme only).** `ThemeSoftPastel.tsx` `createCalendarUrl()` builds a Google Calendar link with hardcoded `T080000Z/T140000Z` (08:00–14:00 UTC) regardless of the actual `akad_time`/`resepsi_time` values, and uses only `akad_date` — never `resepsi_date`. Since Indonesia is UTC+7/+8/+9, guests who tap "Simpan ke Google Calendar" get an event at the wrong local time, and if the reception is on a different day than the akad, that date is dropped entirely.
    - **Fix**: parse `akad_time`/`resepsi_time` (format `"08:00 - 10:00 WIB"` etc.) into actual start/end times, convert to UTC accounting for the relevant Indonesian timezone offset, and decide whether the calendar event should represent the akad, the resepsi, or both (e.g. two separate "Add to Calendar" links, or a combined range spanning both if same-day).

**Confirmed clean after full read-through**: `ThemeElegant.tsx` and `ThemeRustic.tsx` — no bugs found, all shared-component variants correctly wired. `ThemeMinimalist.tsx` — no bugs, one cosmetic note: hardcoded decorative GPS coordinates (Paris, `48°51'24"N // 02°21'07"E`) as Swiss-editorial flavor text, unrelated to the actual wedding venue; harmless but not personalized.

---

## Suggested Antigravity Prompt Sequence (paste per batch, report results back for review before next batch)

- [ ] **Batch 1 (clarify first, no code)**: `/superpowers:brainstorm` — grill-me on #12 (Conservatory: standard 5th theme or premium add-on?) and #20 (WhatsApp SOP vs Google Form automation — which is live?)
- [ ] **Batch 2 (security)**: `/superpowers:write-plan` + `/superpowers:execute-plan` on #19, #3, #4, #5, #6, #7
- [ ] **Batch 3 (reliability)**: `/superpowers:execute-plan` on #8, #9 (must finish before Batch 5)
- [ ] **Batch 4 (design/UX via Impeccable)**: `/impeccable harden` + `/impeccable critique` on #10, #11, #13, #14
- [ ] **Batch 5 (layout differentiation, depends on #9)**: `/impeccable audit` + `/superpowers:execute-plan` against `THEME_LAYOUT_DIFFERENTIATION_BRIEF.md` section 5
- [ ] **Batch 6 (small fix)**: `/superpowers:execute-plan` on #22 (calendar timezone bug)

---

1. **#19 first** — clarify/confirm with the project owner (human decision, not agent work) that RSVP spam is a shared-quota platform risk, then implement rate limiting from #3 with that urgency in mind.
2. Remaining security items (#4–#7) — smallest individual scope.
3. #20 — product decision needed on which intake pipeline (WhatsApp SOP vs Google Form automation) is authoritative; document the answer before touching either pipeline's code. #21 is a cheap follow-on fix once #20 is resolved.
4. Reliability items (#8–#9) — #9 (Conservatory variant fix) unblocks the layout-differentiation brief for that theme.
5. Design/UX items (#10–#15) — quick wins first (#10, #12, #13), then #11 and #14.
6. Documentation cleanup (#17–#18) — anytime, no dependencies.
7. Run `npm run verify` after each item; `npm audit` after any dependency change.
