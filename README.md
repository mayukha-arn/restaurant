# The Diner — Operations HQ

A restaurant management dashboard built as a single-page React web app. Covers the full operations loop: live order tracking, menu management, customer CRM, and restaurant settings — all runnable in the browser with no backend required.

Live demo → **[mayukha-arn.github.io/restaurant](https://mayukha-arn.github.io/restaurant/)**

---

## What it does

| Screen | Purpose |
|--------|---------|
| **Dashboard** | At-a-glance stats (orders, revenue, pending, popular item), Chef's Picks shortcuts, recent orders table |
| **Orders** | Full order list with real-time status progression (pending → confirmed → preparing → ready → delivered) |
| **Menu** | Browse items by category; each item shows price, dietary flags, and prep time |
| **Customers** | CRM list with loyalty points, total spend, and order history |
| **Settings** | Edit restaurant info, toggle open/closed, set operating hours |

Navigation is a persistent left sidebar. Chef's Picks on the home screen deep-link directly to the relevant menu category.

---

## Tech stack

### Frontend
| Tool | Role |
|------|------|
| **React 18** | UI framework |
| **TypeScript** | Type safety across the monorepo |
| **Vite 5** | Dev server and production bundler |
| **TanStack Query v4** | Server-state management, caching, and loading/error states |
| **Plain CSS** | Design system via CSS custom properties — no CSS-in-JS |

### Monorepo
| Tool | Role |
|------|------|
| **Turborepo** | Task orchestration (build, dev, lint run in dependency order) |
| **pnpm workspaces** | Package management and hoisting |

### Backend (service stub)
| Tool | Role |
|------|------|
| **Hono** | Lightweight HTTP framework on Cloudflare Workers |
| **Drizzle ORM** | Type-safe SQL query builder |
| **PostgreSQL** | Primary database (Cloudflare D1-compatible schema) |
| **Zod** | Runtime request/response validation |

> The dashboard currently ships with a **mock API** (`packages/api-client/src/services/mock-api.ts`) so it runs entirely in the browser on GitHub Pages. The backend service in `services/backend/` is a complete Hono + Drizzle implementation ready to be deployed to Cloudflare Workers with a real PostgreSQL/D1 database.

### Deployment
- **GitHub Pages** via GitHub Actions (`peaceiris/actions-gh-pages`)
- Workflow triggers on every push to `main`, builds the Vite app, and publishes `apps/dashboard/dist/` to the `gh-pages` branch automatically

---

## Color scheme

The UI uses a warm diner-kitchen palette defined as CSS custom properties in `apps/dashboard/src/styles/global.css`:

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#E8471A` | Active nav item, accent buttons, error |
| `--color-accent` | `#F5C842` | Revenue card, gold highlights |
| `--color-dark` | `#2C1810` | Sidebar background, headings |
| `--color-background` | `#F5EDE3` | Warm cream — main content area |
| `--color-surface` | `#FFFFFF` | Cards and table surfaces |
| `--color-border` | `#E8DDD4` | Subtle warm borders |
| `--color-text-muted` | `#9E7B65` | Secondary labels, muted copy |

Typography uses **Inter** (UI text) and **Caveat** (handwritten logo and headings), both loaded from Google Fonts.

---

## Project structure

```
restaurant/
├── apps/
│   └── dashboard/          # Vite + React SPA (GitHub Pages target)
│       ├── src/
│       │   ├── screens/    # HomeScreen, OrdersScreen, MenuScreen, CRMScreen, SettingsScreen
│       │   ├── styles/     # global.css, components.css, screens.css, animations.css, responsive.css
│       │   ├── hooks/      # useOrdersList, useMenuItems*, useRestaurantId, etc.
│       │   └── providers/  # QueryProvider (TanStack Query client)
│       └── index.html
├── packages/
│   ├── api-client/         # Axios client + mock API service + generated hooks
│   └── shared/             # Reusable UI components (Card, Badge, Button, Skeleton) + design tokens
├── services/
│   └── backend/            # Hono API (Cloudflare Workers) + Drizzle schema + migrations
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions → GitHub Pages
└── turbo.json              # Turborepo pipeline config
```

---

## Running locally

```bash
# Install dependencies
pnpm install

# Start the dashboard dev server
pnpm dev:dashboard
# → http://localhost:3001
```

To run the backend service locally (requires a PostgreSQL connection):

```bash
cd services/backend
pnpm dev
# → http://localhost:8787
```

Set `VITE_API_URL=http://localhost:8787` in `apps/dashboard/.env.local` to point the dashboard at the live backend instead of the mock service.

---

## Architecture decisions

**Mock API by default** — The dashboard ships with all data living in a localStorage-backed in-memory store. This means zero infrastructure required to view the demo, and GitHub Pages deployment works without a backend. Swapping to the real API is a one-line env-var change.

**TanStack Query for all server state** — Rather than `useEffect` + `useState`, every data fetch goes through React Query. This gives automatic caching, background refetching, and loading/error states for free.

**Turborepo task graph** — `build:web` only builds the dashboard; `dev` runs all services in parallel. The `api-client` package is a dependency of `dashboard`, so Turbo ensures it's built first.

**CSS custom properties over a framework** — Keeps bundle size minimal and gives full control over the diner aesthetic. The design system is a single file (`global.css`) with sensible tokens for color, spacing, radius, and shadow.

**`resolve.dedupe` in Vite** — With multiple packages each importing React and TanStack Query, Vite can end up with two separate module instances (which breaks React context). Deduplication is enforced at the Vite config level to prevent this.
