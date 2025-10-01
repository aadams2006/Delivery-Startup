# Hovr — Autonomous Delivery Concept

This project showcases a conceptual marketing site for **Hovr**, a premium autonomous drone delivery platform. The experience mirrors the sleek, glassmorphic aesthetic of modern aerospace brands while splitting content across dedicated pages and providing a sandbox operator dashboard.

## Structure

- `index.html` — Landing page with hero metrics, value propositions, and calls to explore deeper.
- `solutions.html` — Detailed overview of the service lines and deployment packages.
- `technology.html` — Deep dive into the network, including a Leaflet-powered live mission map.
- `company.html` — Story, mission, and leadership profile.
- `auth.html` — Login/create-account flow that stores demo credentials securely in local storage.
- `dashboard.html` — Authenticated operator dashboard showcasing live missions, schedules, and account settings.
- `styles.css` — Shared glassmorphic design system across all pages.
- `dashboard.js` — Vanilla JS powering the dashboard tabs, schedule editing, and account persistence.

## Local usage

Open any of the HTML files in a browser using a local server to ensure videos and fonts stream correctly:

```bash
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000/index.html`.

Create an account via **Create Account** on the authentication page to unlock the dashboard experience.
