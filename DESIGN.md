# Samyuktha Yoga Design Direction

## Reference

The site follows the editorial direction of the "Mariyoga" landing page concept by
Natalia Sviridenko on Behance:
https://www.behance.net/gallery/201038159/Landing-page-for-a-yoga-teacher

Aesthetic in one line: calm fashion-editorial — pale periwinkle surfaces, deep
indigo high-contrast serif typography, letterspaced uppercase statements,
grayscale photography, moon-phase and mandala motifs, one violet accent, and a
near-black booking section.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--color-bg` | `#DCDDE8` | Page background (pale periwinkle) |
| `--color-bg-soft` | `#E3E4ED` | Alternate section background |
| `--color-paper` | `#F2F2F6` | Cards, photo frames, light text on dark |
| `--color-ink` | `#2E2A4F` | Primary text, headings (deep indigo) |
| `--color-ink-deep` | `#181527` | Dark section background, moon shapes |
| `--color-violet` | `#7A72AD` | Single accent (hover, focus ring) |
| `--color-violet-soft` | `#B9B4D6` | Scrollbar, subtle accents |
| `--color-line` | `rgba(46,42,79,.25)` | Hairlines on light |
| `--color-line-light` | `rgba(242,242,246,.28)` | Hairlines on dark |

No other colors. Photography is rendered grayscale via `filter: grayscale(1)`
(`.img-mono`).

## Typography

- Display: **Cormorant Garamond** (400/500/600 + italics) — headlines, statements,
  stats, wordmark. Headlines are uppercase with slight positive tracking; italics
  used for emphasis words ("yoga", "Samyuktha", "Namaste x").
- Body/labels: **Jost** (300/400/500) — small uppercase letterspaced labels
  (0.62–0.78rem, tracking 0.2–0.32em) and body copy.
- Voice: centered uppercase serif "statements" (`.statement`) instead of ordinary
  paragraphs, as in the reference.

## Recurring elements

- `.eyebrow` — numbered margin label with a leading hairline: `01 — Meet your teacher`.
- Moon-phase row (hero): crescents / half moons / full circular grayscale photo,
  hand-built SVG in `Content.jsx`.
- `Mandala` (Common/Mandala.jsx) — line-art SVG ornament at ~7% opacity behind
  Classes and Contact.
- Buttons: outlined uppercase pills (`.btn`), fill on hover; `.btn-light` on dark.
- Inputs: underline-only fields on the dark booking section.
- Stats row: large serif numerals with italic unit + small caps label, hairline grid.

## Page structure (slide deck, single page)

The page is a full-viewport slide deck (`SlideDeck` — scroll-snap container, side
dot navigation, `01 / 06` counter bottom-left, no section menu in the nav; the
only persistent CTA is "Book a session").

1. **Hero** (`#content`) — masthead "SAMYUKTHA yoga", tagline "Five studios. Two
   traditions. One breath at a time.", moon-phase row with her mat portrait.
2. **01 The teacher** (`#aboutMe`) — framed evening portrait + personal statement
   + stats row (200hr / 5 studios / 2 traditions / 60min).
3. **02 The practice** (`#path`) — beginner→expert path in three serif-numbered
   stages: Begin / Deepen / Refine.
4. **03 Studios & classes** (`#studios`) — infinite marquee of studio wordmarks
   (UFC Gym ✦ VEO by Emaar ✦ Fitness Terminal ✦ Little Yogi ✦ Anytime Fitness),
   teaching photos (UFC Gym, puppy yoga), offering list (studio/gym, kids,
   private 1:1, online).
5. **04 Off the mat** (`#life`) — staggered editorial collage of life photos
   (desert drives, coconut breaks, race days, dog cuddles, matcha, yoga
   everywhere).
6. **05 Book** (`#contactMe`, dark `--color-ink-deep`) — serif heading, underline
   form (EmailJS — logic unchanged), Instagram, footer. Fixed chrome inverts to
   paper via `body.deck-dark`.

## Photography

Originals live in `/pictures` (HEIC/DNG, descriptively renamed). Web-ready JPGs
(max 1400px, q82, grayscale applied in CSS) are exported to
`public/assets/portfolio/` with the same basenames.

## Responsive notes

- Breakpoints: 1024px (contact grid stacks), 780px (nav stacks, hero "yoga" drops
  to its own line, gallery/stats become 2-col), 600px (single-column cards).
- The hero headline must never overflow: the italic suffix becomes `display: block`
  under 780px.

## Constraints

- EmailJS behavior and env vars unchanged (`VITE_EMAILJS_*`).
- Use owned/approved imagery only; everything is grayscale-treated in CSS, so the
  source photos can stay as-is in `public/assets`.
