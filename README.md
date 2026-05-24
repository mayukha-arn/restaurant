# Restaurant Operations Dashboard

A fullstack restaurant operations system built with a vintage Americana diner theme.

## Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Frontend**: Expo + React Native + Web with vintage diner UI
- **Backend**: Hono on Cloudflare Workers
- **Database**: PostgreSQL + Drizzle ORM
- **API Contract**: OpenAPI + Orval code generation
- **Type Safety**: drizzle-zod for validation

## Project Structure

```
apps/dashboard          # Expo Web app - restaurant dashboard
services/backend        # Hono API - Cloudflare Workers
packages/shared         # Design system & UI components
packages/types          # Shared TypeScript types
packages/api-client     # Generated API client & hooks
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Docker (for PostgreSQL)

### Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start PostgreSQL** (requires Docker):
   ```bash
   docker-compose up -d
   ```

3. **Copy environment files**:
   ```bash
   cp .env.example .env.local
   cp apps/dashboard/.env.example apps/dashboard/.env.local
   cp services/backend/.env.example services/backend/.env.local
   ```

4. **Run database migrations**:
   ```bash
   cd services/backend
   pnpm run migrate
   ```

5. **Seed the database**:
   ```bash
   cd services/backend
   pnpm run seed
   ```

### Development

- **Start all services**:
  ```bash
  pnpm dev
  ```

- **Start dashboard only**:
  ```bash
  pnpm dev:dashboard
  ```
  Opens at: http://localhost:19000

- **Start backend only**:
  ```bash
  pnpm dev:backend
  ```
  Backend at: http://localhost:8787

### Commands

```bash
pnpm lint          # Lint all packages
pnpm typecheck     # TypeScript type checking
pnpm test          # Run tests
pnpm gen:contract  # Generate API contracts from Drizzle schema
pnpm build         # Production build
```

## Architecture

### The SSOT Pipeline

All data flows through a single source of truth:

```
Drizzle Schema → drizzle-zod → Hono/OpenAPI → Orval → React Query Hooks
```

**Key Principles:**
- Database schema is the source of truth
- API types are generated, never handwritten
- Frontend types come from `@api-client` only
- Server-side validation & calculations enforce business rules
- Status transitions controlled by backend

## Features

### Dashboard Pages
- **Home**: Vintage diner themed homepage with navigation
- **Orders**: Order management with status tracking
- **Menu**: Menu categories and items management
- **CRM**: Customer records and order history
- **Settings**: Service configuration

### Design System
- Vintage Americana diner color scheme
- Typography & spacing scales
- Reusable UI components (buttons, inputs, modals, etc.)
- Loading, error, and empty states
- Semantic tokens and elevation system

## Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL`: PostgreSQL connection string
- `BACKEND_PORT`: API server port (default: 8787)
- `EXPO_PUBLIC_API_URL`: Backend URL for frontend

## Testing

```bash
pnpm test                   # Run all tests
pnpm test --filter=backend  # Backend tests only
```

## Deployment

- **Frontend**: Deploy to Netlify, Vercel, or similar
- **Backend**: Deploy to Cloudflare Workers
- **Database**: Use PostgreSQL managed service (Supabase, Render, Railway, etc.)

## Guardrails

This project follows strict architectural guardrails to ensure:
- Type safety across the entire stack
- Server-side business logic enforcement
- Code generation discipline (no manual API types)
- Proper monorepo dependency boundaries

See `guardrails.md` for detailed guidelines.
