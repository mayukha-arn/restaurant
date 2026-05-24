# Restaurant Dashboard - Development Setup Guide

## Project Overview

This is a fullstack restaurant operations system with:
- **Frontend**: Expo Web app with vintage 1950s diner theme
- **Backend**: Hono API on Cloudflare Workers
- **Database**: PostgreSQL with Drizzle ORM
- **Type Safety**: End-to-end TypeScript with code generation

## 🎨 Frontend: Vintage Diner Theme

### Completed (Section 2)

✅ **Design System**
- Complete design tokens (colors, typography, spacing, radius, shadows)
- Vintage Americana diner color palette
- Reusable UI components (Button, Card, Badge, Skeleton)

✅ **Diner-Themed Homepage**
- Checkered restaurant table background
- 4 clickable food items that navigate to sections:
  - 🍟 **Fries** → Orders page
  - 🍔 **Burger** → Menu page
  - 🥤 **Cola** → Settings page
  - 🍦 **Ice Cream** → CRM page

✅ **Dashboard Pages**
- **Home**: Diner-themed navigation with food items
- **Orders**: View and manage customer orders
- **Menu**: Manage menu categories and items
- **CRM**: Customer profiles and order history
- **Settings**: Restaurant configuration

### Design Tokens

Located in `packages/shared/src/tokens/`:

```typescript
// Colors
- Primary: #DC143C (Crimson red)
- Secondary: #C0C0C0 (Chrome silver)
- Accent: #FFD700 (Gold)
- Light: #FFFACD (Lemon chiffon)

// Typography
- Sans, Serif, Mono, Diner fonts
- Font sizes: xs to 5xl
- Font weights: light to extrabold

// Spacing Scale
- 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 (in pixels)

// Radius, Shadows, Elevation
- Complete set for consistent UI
```

### Component Library

Located in `packages/shared/src/components/`:

- **Button**: Primary, secondary, outline, ghost variants; sm, md, lg sizes
- **Card**: Default, elevated, filled variants with optional padding
- **Badge**: For status indicators (success, warning, error, info)
- **Skeleton**: Loading placeholders

### UI Usage Example

```typescript
import { Button, Card, Badge } from '@shared/components';
import { colors, spacing, typography } from '@shared/tokens';

<Card variant="elevated" style={{ padding: spacing[4] }}>
  <Text style={{ fontSize: typography.fontSize.lg, color: colors.primary }}>
    Title
  </Text>
  <Badge label="Status" variant="success" />
  <Button label="Action" onPress={() => {}} />
</Card>
```

## 📦 Monorepo Structure

```
apps/dashboard/                   # Expo Web app
├── src/
│   ├── index.tsx               # Main app with navigation
│   └── screens/
│       ├── HomeScreen.tsx       # Diner-themed home
│       ├── OrdersScreen.tsx
│       ├── MenuScreen.tsx
│       ├── CRMScreen.tsx
│       └── SettingsScreen.tsx

services/backend/                 # Hono API (Cloudflare Workers)
├── src/
│   └── index.ts                # API entry point
├── wrangler.toml               # Cloudflare config
└── .env.local                  # Local PostgreSQL config

packages/
├── shared/                      # Design system & UI components
│   ├── tokens/                 # Design tokens
│   └── components/             # Reusable UI components
├── types/                      # Shared TypeScript types
└── api-client/                 # Generated API client
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# From root
npm install

# Install workspace dependencies
cd apps/dashboard && npm install
cd ../../../services/backend && npm install
```

### 2. Set Up Environment

```bash
# Copy environment files
cp .env.example .env.local
cp apps/dashboard/.env.example apps/dashboard/.env.local
cp services/backend/.env.example services/backend/.env.local
```

### 3. Database Setup (When Available Locally)

```bash
# Start PostgreSQL
docker-compose up -d

# Run migrations
cd services/backend
pnpm run migrate

# Seed data
pnpm run seed
```

### 4. Run Development Server

```bash
# From root
pnpm dev:dashboard

# This starts Expo on web at http://localhost:19000
```

### 5. Testing the Diner Theme

1. Open the app at `http://localhost:19000`
2. You'll see the **diner-themed homepage** with:
   - Checkered restaurant table background
   - 4 clickable food items
3. Click any food item to navigate to that section:
   - Click 🍟 (Fries) → Orders page
   - Click 🍔 (Burger) → Menu page
   - Click 🥤 (Cola) → Settings page
   - Click 🍦 (Ice Cream) → CRM page
4. Use "← Back to Home" button to return

## 📋 Available Scripts

```bash
# Development
pnpm dev              # All services
pnpm dev:dashboard    # Frontend only
pnpm dev:backend      # Backend only

# Build & Quality
pnpm build            # Production build
pnpm lint             # ESLint
pnpm typecheck        # TypeScript check
pnpm test             # Run tests

# Code Generation
pnpm gen:contract     # Generate API types from Drizzle → Hono → Orval
```

## 🏗️ Architecture Layers

### Frontend (Expo Web)

**Flow**: Screens → Generated Hooks → React Query → API

```
HomeScreen
└── onNavigate → setCurrentScreen → (OrdersScreen | MenuScreen | CRMScreen | SettingsScreen)
    └── useGenerated Hooks (from @api-client)
        └── React Query
            └── API (http://localhost:8787)
```

### Backend (Hono)

**Flow**: Drizzle Schema → drizzle-zod → Hono Routes → OpenAPI

```
Database
└── Drizzle ORM schema
    └── drizzle-zod validation
        └── Hono routes
            └── OpenAPI generation
```

### Type Generation

**Single Source of Truth**: Drizzle Schema

```
Drizzle Schema
└── drizzle-zod (validation)
    └── Hono OpenAPI
        └── Orval
            └── @api-client (hooks, types)
```

## 📝 Development Workflow

### Adding a New Page

1. Create screen in `apps/dashboard/src/screens/NewScreen.tsx`
2. Export from `apps/dashboard/src/screens/index.ts`
3. Add to navigation in `apps/dashboard/src/index.tsx`
4. Use design tokens and shared components

### Adding a Design Token

1. Edit `packages/shared/src/tokens/diner-theme.ts`
2. Export from `packages/shared/src/tokens/index.ts`
3. Import and use in components

### Adding a UI Component

1. Create in `packages/shared/src/components/NewComponent.tsx`
2. Export from `packages/shared/src/components/index.ts`
3. Use in any screen

### Adding an API Endpoint (When Backend Ready)

1. Define Drizzle schema in `services/backend/src/schema`
2. Create validation with drizzle-zod
3. Add Hono route in `services/backend/src/routes`
4. Run `pnpm gen:contract` to generate frontend types
5. Use generated hooks in screens

## 🎯 Next Steps

### Section 3: Backend & API Layer

What needs to be done:
- Set up Drizzle ORM with PostgreSQL
- Define database schemas (customers, menu, orders, etc.)
- Create Hono API routes with validation
- Set up OpenAPI generation
- Implement business logic (order validation, pricing, etc.)
- Write backend tests

### Section 4: Frontend Integration

What needs to be done:
- Generate API client with Orval
- Replace mock data with real API calls
- Implement React Query hooks
- Add loading and error states
- Seed database with sample data

## 📚 File Locations

- **Design tokens**: `packages/shared/src/tokens/`
- **UI components**: `packages/shared/src/components/`
- **Dashboard screens**: `apps/dashboard/src/screens/`
- **Main app**: `apps/dashboard/src/index.tsx`
- **Backend**: `services/backend/src/`
- **Shared types**: `packages/types/src/`
- **Generated client**: `packages/api-client/src/`

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Change Expo port
pnpm dev:dashboard -- --port 19001
```

### Dependencies Not Installing
```bash
# Clean and reinstall
rm -rf node_modules pnpm-lock.yaml
npm install
```

### TypeScript Errors
```bash
pnpm typecheck
```

## 📞 Architecture Guardrails

See `guardrails.md` for full guidelines:

✅ **Do**:
- Use design tokens from `@shared/tokens`
- Import types from `@api-client` only
- Keep business logic in hooks/backend
- Use generated API hooks from Orval
- Validate on backend with drizzle-zod

❌ **Don't**:
- Hardcode colors/spacing/sizing
- Create manual frontend DTOs
- Put complex logic in page components
- Make direct fetch calls
- Duplicate enums across frontend/backend

## Version History

- **v1.0.0**: Initial setup with design system and diner theme
- **Next**: Backend API layer implementation
