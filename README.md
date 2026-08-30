# Swastik Institution — Website

A premium, animated, static educational website for **Swastik Institution**
(Subhash Nagar, Ludhiana, Punjab). Frontend-only — no backend, database, or
authentication.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)
- CSS 3D transforms for the floating "orbit" scenes (no heavy 3D engine, kept
  lightweight and fast)

## Contact Info (single source of truth)

All phone / WhatsApp numbers are defined in **one file**:
`src/data/contact.js`

```js
export const PHONE_TEL = "tel:7889169106";
export const WHATSAPP_NUMBER = "917889169106"; // wa.me/917889169106
```

Every "Call Now" and "WhatsApp Us" button across the site (Navbar, Hero,
Contact section, floating WhatsApp bubble, and final CTA) imports from this
file — update the number here once and it updates everywhere.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repo in Vercel.
3. Framework preset: **Vite** (auto-detected via `vercel.json`).
4. Build command: `npm run build` — Output directory: `dist`.
5. No environment variables are required.

## Accessibility & Performance notes

- Respects `prefers-reduced-motion` (animations are disabled/shortened).
- Keyboard-focus-visible states on all interactive elements.
- Semantic HTML landmarks (`header`, `main`, `section`, `footer`).
- No fake forms, logins, dashboards, or fabricated statistics/testimonials —
  testimonials are clearly labeled as demo placeholders.
