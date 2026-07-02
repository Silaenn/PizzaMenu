<div align="center">

# Fast React Pizza Co.

**Authentic Italian pizza — wood-fired since 2025**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Status](https://img.shields.io/badge/status-active-success.svg)](#)

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Author](#author)

---

## About

**Fast React Pizza Co.** is a single-page ordering interface built with React 19. It simulates a complete online pizza ordering flow — browsing an 18-item menu with category filters and live search, building a cart with quantity controls, placing an order through a validated checkout form, and reviewing past orders.

The app uses React Context + `useReducer` for state management, `localStorage` for persistence across sessions, and a slide-out cart panel with smart click-outside dismissal. Every interaction is designed to feel snappy: scroll-triggered reveal animations, dark/light theme, and a locked cart window while adding items to prevent accidental closes.

This project was built as a full-featured SPA demo — no backend, no database, no external dependencies beyond React and the DOM.

---

## Features

- **18 handcrafted pizzas** — Browse a rotating menu with ingredients, pricing, and sold-out indicators
- **Live search & category filter** — Filter by name or ingredient text; toggle between All / Vegetarian / Meat
- **Add to cart** — One-click add with "Added" visual feedback and auto-open cart panel
- **Cart lock during add** — Cart stays open and cannot be dismissed for 600 ms after adding an item, with timer reset on each new add
- **Quantity controls** — Increment, decrement, or remove items directly from the cart panel
- **Persistent cart** — Cart contents survive page refresh via `localStorage`
- **Checkout form** — Validated delivery form (name, phone, address) with order confirmation screen
- **Order history** — Expandable list of past orders with item details, timestamps, and delete action
- **Dark / light theme** — System-persistent theme toggle with smooth CSS transition
- **Scroll-based header** — Sticky header activates when the hero scrolls out of view
- **Scroll reveal animations** — Sections fade in as they enter the viewport (IntersectionObserver)
- **Responsive layout** — Works across desktop and tablet viewports

---

## Tech Stack

[![React](https://img.shields.io/badge/React-19-222222?style=flat&logo=react)](https://react.dev)
[![CSS3](https://img.shields.io/badge/CSS-3-1572B6?style=flat&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Create React App](https://img.shields.io/badge/CRA-5.0-09D3AC?style=flat&logo=create-react-app)](https://create-react-app.dev)
[![Google Fonts](https://img.shields.io/badge/Fonts-Outfit_%2F_Playfair_Display-4285F4?style=flat&logo=google-fonts)](https://fonts.google.com)

| Layer | Technology |
|---|---|
| UI Library | React 19 |
| State Management | Context API + `useReducer` |
| Persistence | `localStorage` |
| Styling | CSS (custom properties, flexbox, grid, keyframes) |
| Build Tool | Create React App 5 |
| Fonts | Outfit (body) · Playfair Display (headings) |

**No external state libraries, no CSS frameworks, no backend runtime.** Just React and the DOM.

---

## Screenshots

> Screenshots coming soon. Run the project locally to see the full experience.

```
Hero     → Full-viewport background with tagline and CTA
About    → Story section with image grid and stats
Menu     → Search + category tabs + pizza card grid
Cart     → Slide-out panel with quantity controls and total
Checkout → Validated delivery form with order summary
Confirm  → Order confirmation card with delivery info
History  → Expandable accordion of past orders
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9 (or yarn / pnpm)

Verify your setup:

```bash
node -v   # v18.x.x or higher
npm -v    # 9.x.x or higher
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/pizza-menu.git
cd pizza-menu

# Install dependencies
npm install
```

No environment variables or API keys are required. This project runs entirely client-side.

---

## Usage

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000). The development server supports hot reload — edits to `src/` reflect instantly in the browser.

**Build for production:**

```bash
npm run build
```

Outputs an optimised static bundle to `build/`, ready for deployment to any static host (Vercel, Netlify, GitHub Pages, etc.).

**Run tests:**

```bash
npm test
```

Launches the test runner in watch mode. (Default CRA test suite.)

---

## Project Structure

```
pizza-menu/
├── public/
│   ├── index.html              # HTML shell with SEO meta tags
│   ├── manifest.json           # PWA manifest
│   ├── logo.png                # App logo / favicon
│   └── pizzas/                 # Pizza images (x18) + hero-bg
├── src/
│   ├── index.js                # React entry point
│   ├── index.css               # Global styles
│   ├── data.js                 # Pizza menu data (18 items)
│   ├── hooks/
│   │   └── useScrollReveal.js  # IntersectionObserver hook
│   └── components/
│       ├── App.js              # Root component, layout orchestration
│       ├── CartContext.js       # useReducer + Context + localStorage
│       ├── Header.js           # Sticky nav, theme toggle, cart badge
│       ├── Hero.js             # Full-viewport hero section
│       ├── About.js            # Story section with image grid
│       ├── Menu.js             # Search + filter + pizza grid
│       ├── Pizza.js            # Individual pizza card with Add button
│       ├── Cart.js             # Slide-out cart panel
│       ├── Checkout.js         # Delivery form with validation
│       ├── OrderConfirm.js     # Post-checkout confirmation
│       ├── OrderHistory.js     # Past orders accordion
│       ├── Footer.js           # Page footer
│       └── Icons.js            # SVG icon components
└── package.json
```

---

## Deployment

The production build is a fully static `build/` directory that can be served by any static host.

**Vercel (recommended):**

```bash
npx vercel --prod
```

**Netlify:**

```bash
npx netlify deploy --prod --dir=build
```

**GitHub Pages:**

Set `"homepage": "https://<user>.github.io/pizza-menu"` in `package.json`, then:

```bash
npm run build
npx gh-pages -d build
```

No server configuration needed — the app is 100 % client-side.

---

## Author

Built by [@deoosilaen](https://github.com/deoosilaen).

Questions, feedback, or suggestions? Open an issue or start a discussion.

---

<div align="center">
  <sub>Made with 🍕 · Fast React Pizza Co. 2025</sub>
</div>
