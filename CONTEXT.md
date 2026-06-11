# Samyuktha Yoga Project Context

## Project Summary

This is a Vite React website for Samyuktha Yoga. The current site is a single-page layout with a fixed navbar, image hero, about section, class cards, and contact/booking form.

The requested next step is a visual redesign into an aesthetic wellness-related website using pastel colors only. Before touching source code, this document and `DESIGN.md` capture the relevant context, visual direction, constraints, and implementation notes.

## Tech Stack

- React `18.2.0`
- Vite `3.2.3`
- Tailwind CSS `3.2.4`
- Framer Motion `7.6.18`
- EmailJS browser SDK `3.10.0`
- Font Awesome brand icons
- Lottie React
- DaisyUI is installed but not currently configured in `tailwind.config.cjs`

Package scripts:

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## Current App Structure

Main app file:

- `src/App.jsx`

Rendered sections:

1. `Navbar`
2. `Content`
3. `AboutMe`
4. `Classes`
5. `ContactMe`

Component files:

- `src/components/Navbar/Navbar.jsx`
- `src/components/Navbar/navbar.css`
- `src/components/Content/Content.jsx`
- `src/components/Content/content.css`
- `src/components/AboutMe/AboutMe.jsx`
- `src/components/AboutMe/aboutMe.css`
- `src/components/Classes/Classes.jsx`
- `src/components/Classes/classes.css`
- `src/components/ContactMe/ContactMe.jsx`
- `src/components/ContactMe/contactMe.css`
- `src/components/Common/Card.jsx`
- `src/components/Common/styles.css`
- `src/components/Common/Divider.jsx`

Data files:

- `src/data/index.js`
- `src/data/classes.js`

Validation/helper files:

- `lib/validate.js`

## Current Content

### Brand

Displayed brand name:

- `SAMYUKTHA YOGA`

Current navbar subtext:

- `May 2023 batch`

### Hero

Current hero image:

- `/assets/content-image.jpg`

Current hero copy:

- `GUIDING YOU TOWARDS A STRONG MIND AND BODY`

### About

Current bio states:

- Samyuktha is a `200hr Yoga certified teacher based in Dubai` (previously Bangalore).
- Yoga has been a major part of her life for many years.
- She provides virtual classes for all levels.
- Styles include Hatha and Ashtanga Style Yoga.
- Tone is warm, personal, and welcoming.

Current about image:

- `/assets/about-me-image.jpg`

### Classes

Current active class entries:

1. `BEGINNERS BATCH`
   - Subtitle: `12-Day Program`
   - Style: 60 minute Hatha style flow
   - Timing: `Monday, Wednesday, Friday - (8.30am to 9.30am)`
   - Image: `/assets/classes_beginners.jpg`

2. `VINYASA - (Intermediate/Advanced)`
   - Subtitle: `8-Day Program`
   - Style: 60 minute energising Vinyasa flow
   - Timing: `Tuesday, Thursday - (8.30am to 9.30am)`
   - Image: `/assets/classes_vinyasa.jpg`

Currently commented-out class entries:

- Pranayama/breath work
- Weekend workshop

### Contact

The contact form collects:

- Name
- Email
- Class type
- Message

Active class type options:

- `BEGINNERS BATCH (8.30am to 9.30am)`
- `INTERMEDIATE BATCH (8.30am to 9.30am)`

Submit button:

- `Book Session`

Contact behavior:

- Uses EmailJS environment variables:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

Instagram link:

- `https://www.instagram.com/samyuktha.acharya`

## Existing Assets

Local image assets in `public/assets`:

- `about-me-image.jpg`
- `classes_beginners.jpg`
- `classes_private.jpg`
- `classes_vinyasa.jpg`
- `classes_weekend.jpg`
- `content-image.jpg`
- `content-image-old.jpg`
- `IMG-20221213-WA0002.jpg`
- `IMG-20221213-WA0004.jpg`
- `IMG-20221213-WA0006.jpg`
- `logo-icon.png`

Lottie asset:

- `src/lotties/yoga-sloth.json`

## Current Styling State

Global CSS:

- `src/index.css`

Current global tokens are mostly black, white, and teal:

- `--color-bg: #ffffff`
- `--color-bg-variant: #000000`
- `--color-primary: #ffffff`
- `--color-primary-variant: #000000`
- `--btn-primary: #10a19d`
- `--btn-primary-text: #ffffff`

Current global section behavior:

- `section { height: 100vh; }`

Several individual sections override this to `height: 100%`.

Current visual issues for the requested redesign:

- Palette is not pastel-led.
- Black borders and white surfaces feel stark.
- Hero text uses `mark`, which creates a blocky highlight.
- Card shadows are heavy.
- Contact Instagram icon uses the native bright Instagram gradient, which conflicts with a pastel-only direction.
- Some layout sizing is rigid and may need mobile refinement.

## Design Constraints

- User requested pastel colors only.
- The site should become aesthetic and wellness-related.
- Do not touch source code until `DESIGN.md` and `CONTEXT.md` are created.
- Existing React/Vite structure should be preserved unless a change is clearly useful.
- Existing EmailJS behavior should be preserved.
- Existing content can be refined for presentation, but the underlying class/contact intent should stay intact.
- Use approved or owned media only.

## Instagram Media Notes

The user said references can be taken from the Instagram account if needed. The currently linked account in the repo is:

- `samyuktha.acharya`

Implementation notes:

- If images or clips from Instagram are used, they should be exported or otherwise approved for use.
- Do not rely on hotlinking Instagram media.
- Prefer adding selected media files to `public/assets`.
- If using video clips, keep them small and optimized for page performance.
- A video/reel can be useful in the hero or a short practice-moments section, but it is not required for the first redesign pass.

## Recommended Implementation Scope

First implementation pass:

1. Add pastel theme tokens in `src/index.css`.
2. Update global body, buttons, forms, typography, and section rhythm.
3. Redesign `Navbar`.
4. Redesign `Content` hero.
5. Redesign `AboutMe`.
6. Redesign `Card` and `Classes`.
7. Redesign `ContactMe` visuals without changing EmailJS logic.
8. Build and visually test.

Second implementation pass, if assets are approved:

1. Select Instagram-derived images or clips.
2. Add optimized files under `public/assets`.
3. Add optional media section or replace hero/class imagery.
4. Re-test performance and mobile layout.

## Verification Plan

After code changes begin:

1. Run `npm run build`.
2. Start the Vite dev server.
3. Open the site locally.
4. Check desktop and mobile layouts.
5. Verify no obvious text overlap.
6. Verify pastel-only visual direction.
7. Verify the booking form still renders and validates.

## Open Questions

- Should the navbar keep `May 2023 batch`, or should it be updated/removed?
- Should the website stay single-page, or should class details become separate views later?
- Which Instagram images/clips are approved for use?
- Should the redesign include a new gallery/practice-moments section, or only refresh existing sections first?
