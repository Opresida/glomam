# GLOMAM Landing Page

## Project Overview
A high-fidelity, single-page landing page for **GLOMAM (Grande Loja Maçônica do Amazonas)**, the Masonic Grand Lodge of Amazonas, Brazil.

## Technology Stack
- **Frontend:** React 19 + Vite 8
- **Package manager:** pnpm
- **Routing:** React Router DOM v7
- **3D Graphics:** Three.js (Particle Sculpture section)
- **Fonts:** Google Fonts (Cinzel, Cinzel Decorative, Cormorant Garamond, Montserrat)
- **Language:** Portuguese (pt-br)

## Project Structure
```
.
├── index.html              # Vite HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── netlify.toml            # Netlify build config + SPA redirect
├── public/                 # Static assets (favicons)
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # BrowserRouter + routes
│   ├── index.css           # Global styles and CSS variables
│   ├── pages/
│   │   └── Home.jsx        # Home page (assembles all sections)
│   ├── components/
│   │   ├── Header.jsx      # Fixed nav with mobile drawer
│   │   ├── Footer.jsx      # Footer
│   │   ├── Loader.jsx      # Full-screen loading overlay
│   │   ├── ProgressBar.jsx # Scroll progress bar
│   │   ├── Hero.jsx        # Hero/Início section
│   │   ├── Pilares.jsx     # Pilares/Princípios section
│   │   ├── Memorial.jsx    # Memorial/Historia section (carousel)
│   │   ├── NossaHistoria.jsx # Nossa História section
│   │   ├── Lideranca.jsx   # Liderança section (pyramid layout)
│   │   ├── Familias.jsx    # Paramaçônicas/Colunas section
│   │   ├── EsculturaParticulas.jsx # Three.js particle sculpture
│   │   ├── FAQ.jsx         # FAQ accordion
│   │   └── Oriente.jsx     # Contact/map section
│   └── hooks/
│       └── useReveal.js    # Scroll reveal animation hook
└── index.html.bak          # Original pure HTML backup
```

## Running the App
The app is served via Vite dev server on port 5000.

**Workflow:** `Start application`
**Command:** `pnpm dev`

## Building for Production
```
pnpm build
```
Output goes to `dist/`.

## Deployment
Configured for Netlify:
- Build command: `pnpm build`
- Publish dir: `dist/`
- SPA redirect: `/* -> /index.html` (200)

## Key Features
- Custom gold cursor (CSS)
- Scroll progress bar
- Loader overlay
- Scroll-triggered reveal animations
- Interactive image carousel (Grão-Mestres section)
- Dynamic spotlight mouse effect (Memorial section)
- Pilar card tilt effect
- Paramaçônicas flip cards (touch-friendly)
- Eye of Providence animation (Liderança)
- Infinite auto-scroll executive carousels
- Three.js particle sculpture (morphs raw stone → bust)
- FAQ accordion
- Responsive navigation with mobile hamburger drawer
- Google Maps embed
- WhatsApp floating button
- React Router with BrowserRouter (SPA routing)
