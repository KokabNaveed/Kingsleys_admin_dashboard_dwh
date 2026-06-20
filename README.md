# Kingsleys Chicken — Admin Dashboard (React Template)

A fully responsive React admin dashboard template, converted from the original
static HTML mockup, with working **Sign In** and **Sign Up** pages, protected
routing, a collapsible/off-canvas sidebar, live charts and a data-driven
navigation system designed to be easy to re-skin and extend.

## ✨ Features

- **React 18 + React Router 6** — clean, modern routing with protected routes
- **Sign In / Sign Up** pages with validation, password strength meter, show/hide
  password, and a mock auth system (works instantly, no backend required)
- **Fully responsive** — desktop sidebar, tablet icon-rail sidebar, and a
  mobile off-canvas drawer with overlay; tables collapse into cards on phones
- **Live charts** (Chart.js) with a working weekly/monthly period switcher
- **Data-driven sidebar & routing** — add a page by editing one config file
- **CSS variables theme** — re-skin colors/fonts from a single file
- **No CSS framework lock-in** — plain CSS, easy to read and modify

## 🚀 Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## 🔑 Demo login

The app seeds a demo account automatically on first run:

- **Email:** `admin@kingsleyschicken.com`
- **Password:** `admin123`

Or just click **"autofill it"** on the Sign In page. You can also create a
brand-new account from the **Sign Up** page — it's stored in `localStorage`
so it persists across refreshes (see "Connecting a real backend" below).

## 🗂️ Project structure

```
src/
├── components/         Reusable UI: Sidebar, Topbar, StatCard, ChartCard,
│                        SectionCard, RecentOrdersTable, route guards
├── context/
│   └── AuthContext.jsx Mock authentication (login/signup/logout)
├── data/
│   ├── navConfig.js     Sidebar structure + route titles (EDIT THIS to add pages)
│   └── mockData.js      Dashboard stats, chart data, recent orders
├── layouts/
│   ├── DashboardLayout.jsx  Sidebar + topbar + content shell for authenticated pages
│   └── AuthLayout.jsx       Split-screen shell shared by Login & Signup
├── pages/
│   ├── Login.jsx / Signup.jsx
│   ├── Dashboard.jsx     The main dashboard view
│   ├── GenericPage.jsx   Placeholder used by every other nav section
│   └── NotFound.jsx
├── App.jsx              Route definitions
└── index.css             Theme variables, reset, global styles
```

## ➕ Adding a new page

This template builds its sidebar **and** its routes from one file:
`src/data/navConfig.js`.

1. Add an entry (with `label`, `icon`, `path`, `description`) to the
   appropriate section in `navSections`.
2. That's it — it automatically appears in the sidebar and gets a working
   route rendering a `GenericPage` placeholder.
3. When you're ready to build the real UI for that page, open
   `src/App.jsx` and swap `<GenericPage .../>` for your own component on
   that route.

## 🎨 Re-theming / white-labeling

Almost every color, radius and font in this template is a CSS variable
defined at the top of `src/index.css`:

```css
--primary-red: #c41e3a;
--primary-yellow: #f5b041;
--sidebar-bg-top: #0f0f1a;
...
```

Change these and the whole app (sidebar, buttons, charts, badges, auth
pages) updates automatically. To change the brand name/logo, edit the
`logo` markup in `src/components/Sidebar.jsx` and `src/layouts/AuthLayout.jsx`
(the "KINGSLEYS" wordmark + drumstick icon).

## 🔌 Connecting a real backend

Everything is intentionally mocked so the template runs standalone:

- **Auth** — `src/context/AuthContext.jsx` simulates login/signup with
  `localStorage`. Replace the bodies of `login`, `signup` and `logout` with
  real `fetch`/axios calls to your API, and store a real auth token instead
  of the mock user object.
- **Dashboard data** — `src/data/mockData.js` holds the stat cards, chart
  series and recent orders. Replace with data fetched from your API (e.g.
  inside a `useEffect`).
- **Other sections** (Orders, Menu, Customers, Reports, Settings...) are
  `GenericPage` placeholders — build real screens for these as needed.

## 📱 Responsive breakpoints

| Width            | Sidebar behavior                          |
|-------------------|--------------------------------------------|
| > 1024px          | Full sidebar with labels                   |
| 768px – 1024px    | Icon-only collapsed sidebar                |
| < 768px           | Off-canvas drawer (hamburger + overlay)    |

Tables also collapse into stacked cards below 640px, and the stats grid /
chart grid reflow down to 1–2 columns on small screens.

## 📦 Tech stack

- React 18, React Router 6
- Chart.js + react-chartjs-2
- Font Awesome (icons), Google Fonts (Inter + Poppins)
- Vite (build tool)
