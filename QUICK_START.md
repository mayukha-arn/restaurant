# Quick Start - Restaurant Dashboard

## 🍽️ What You Have Now

A fully functional **frontend** with:
- ✅ Vintage 1950s diner theme
- ✅ Checkered table background on home page
- ✅ 4 clickable food items (Fries, Burger, Cola, Ice Cream)
- ✅ 5 dashboard pages (Home, Orders, Menu, CRM, Settings)
- ✅ Complete design system (colors, typography, spacing, components)
- ✅ Mock data ready to test

## 🚀 To Test Locally

### Prerequisites
- Node.js 18+
- npm or pnpm

### Steps

1. **Start the app**:
   ```bash
   cd /Users/mayukhaarn/Documents/GitHub/restaurant
   npm install  # if not done
   pnpm dev:dashboard
   ```

2. **Open in browser**:
   ```
   http://localhost:19000
   ```

3. **Test the diner theme**:
   - See the **checkered restaurant table** as background
   - Click each **food emoji** to navigate:
     - 🍟 Fries → Orders page
     - 🍔 Burger → Menu page
     - 🥤 Cola → Settings page
     - 🍦 Ice Cream → CRM page
   - Use "← Back to Home" to return

## 📸 What You'll See

### Home Page
- Title: "🪩 DINER DASHBOARD 🪩"
- Subtitle: "Select a food to navigate"
- Checkered white/gray background (like a diner table)
- 4 colored cards with food emojis
- Info card with welcome message

### Other Pages
- Orders: Sample order list with statuses
- Menu: Sample menu items with prices
- CRM: Sample customer data with order history
- Settings: Configuration options (service hours, auto-accept, etc.)

## 🎨 Design Tokens Used

### Colors (Vintage Americana)
- **Red**: #DC143C (Crimson) - Primary buttons and accents
- **Silver**: #C0C0C0 (Chrome) - Secondary elements
- **Gold**: #FFD700 - Accents and highlights
- **Cream**: #FFFACD - Light backgrounds

### Components
- **Button**: Red primary, silver secondary, outline, ghost
- **Card**: Elevated with shadows
- **Badge**: For status (pending, ready, preparing)
- **Skeleton**: Loading states

## 📚 Structure

```
apps/dashboard/
├── src/
│   ├── index.tsx              ← Main app & navigation
│   └── screens/
│       ├── HomeScreen.tsx     ← Diner theme home
│       ├── OrdersScreen.tsx
│       ├── MenuScreen.tsx
│       ├── CRMScreen.tsx
│       └── SettingsScreen.tsx

packages/
├── shared/
│   ├── tokens/                ← Design tokens
│   └── components/            ← UI components
└── types/                      ← Shared types
```

## 🔄 Next: Backend Integration (Section 3)

When ready, we'll add:
- PostgreSQL database
- Hono API backend
- Real data fetching
- Order validation & status flows
- Customer management
- Menu item management

## 💡 Tips

- **Modify colors**: Edit `packages/shared/src/tokens/diner-theme.ts`
- **Add components**: Create in `packages/shared/src/components/`
- **Add pages**: Create in `apps/dashboard/src/screens/`
- **Update tokens**: All screens auto-import from `@shared/tokens`

## ⚡ Available Commands

```bash
pnpm dev:dashboard     # Run frontend
pnpm lint              # Check code quality
pnpm typecheck         # Check TypeScript
```

That's it! The **vintage diner theme** is ready to explore. 🍔
