# GLOMAM Landing Page

## Project Overview
A high-fidelity, single-page landing page for **GLOMAM (Grande Loja Maçônica do Amazonas)**, the Masonic Grand Lodge of Amazonas, Brazil.

## Technology Stack
- **Frontend:** Pure HTML5, CSS3, Vanilla JavaScript (no build system)
- **Fonts:** Google Fonts (Cinzel, Cinzel Decorative, Cormorant Garamond, Montserrat)
- **Language:** Portuguese (pt-br)

## Project Structure
```
.
├── index.html    # Entire application (HTML + CSS + JS in one file)
└── replit.md     # This file
```

## Running the App
The app is served via Python's built-in HTTP server on port 5000.

**Workflow:** `Start application`
**Command:** `python3 -m http.server 5000 --bind 0.0.0.0`

## Deployment
Configured as a **static** deployment with `publicDir: "."`.

## Key Features
- Custom magnetic cursor and progress bar
- Scroll-triggered reveal animations
- Interactive image carousel (Grão-Mestres section)
- Dynamic spotlight effects
- FAQ accordion
- Responsive navigation with mobile drawer
- Google Maps embed in contact section
