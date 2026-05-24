# GitHub Pages Deployment Guide

## Overview

The Restaurant Dashboard is now converted from React Native/Expo to a standard React web app that can be deployed to GitHub Pages without any server or app store requirements.

**Features:**
- ✅ No backend server needed (mock API with localStorage)
- ✅ No Expo or app store installation required
- ✅ Deploy directly to GitHub Pages with one command
- ✅ All data persists across page reloads using browser localStorage
- ✅ Fully functional with all 5 screens (Home, Orders, Menu, CRM, Settings)

---

## Prerequisites

- Node.js 18+ and npm (or pnpm)
- Git
- GitHub account with a repository

---

## Step 1: Setup Your Repository

```bash
# If you don't have your repo cloned yet:
git clone https://github.com/YOUR_USERNAME/restaurant.git
cd restaurant
```

---

## Step 2: Install Dependencies

```bash
# Install all dependencies
npm install
# or
pnpm install
```

---

## Step 3: Test Locally

```bash
# Start the development server
npm run dev:dashboard
# or
pnpm dev:dashboard

# Open browser to http://localhost:3000
# Test all 5 screens:
# - Home: Navigation menu
# - Orders: List and update orders
# - Menu: Browse categories and items
# - CRM: View customers with stats
# - Settings: Configure restaurant
```

---

## Step 4: Build for Production

```bash
# Build the dashboard for web deployment
npm run build:web
# or
pnpm build:web

# Output will be in: apps/dashboard/dist/
```

---

## Step 5: Deploy to GitHub Pages

### Option A: Automatic Deployment via npm script

```bash
# Build and deploy to GitHub Pages
npm run deploy
# or
pnpm deploy
```

### Option B: Manual GitHub Pages Setup

1. **Configure GitHub Pages in Repository Settings:**
   - Go to your GitHub repository
   - Settings → Pages
   - Set "Source" to "Deploy from a branch"
   - Set branch to "gh-pages" (should be auto-created after first deploy)
   - Save

2. **Update Homepage URL in package.json:**
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/restaurant"
   ```

3. **Deploy using gh-pages:**
   ```bash
   npm run deploy
   ```

---

## Step 6: View Your Live App

After deployment, visit: `https://YOUR_USERNAME.github.io/restaurant`

Your app is now live on GitHub Pages!

---

## How It Works

### Architecture

```
GitHub Pages (Static Hosting)
    ↓
React Web App (HTML/CSS/JS)
    ↓
Mock API Service (localStorage)
    ↓
Browser LocalStorage (Data Persistence)
```

### Data Flow

1. **Frontend:** 5 React screens converted to standard HTML/CSS
2. **API:** Mock API service in `packages/api-client/src/services/mock-api.ts`
3. **Storage:** All data stored in browser's localStorage
4. **Persistence:** Data persists across page reloads

### Sample Data Included

The mock API comes with pre-populated data:
- 1 Restaurant (The Retro Diner)
- 4 Menu Categories
- 9 Menu Items
- 3 Customers
- 2 Sample Orders

All data is editable through the app (orders status updates, settings changes, etc.) and persists in localStorage.

---

## Resetting Data

If you need to reset all data to default:

Open browser console and run:
```javascript
localStorage.removeItem('restaurant_dashboard_mock_data');
location.reload();
```

---

## File Structure Changes

### New Files for Web Deployment

```
apps/dashboard/
├── index.html           (HTML entry point for Vite)
├── src/main.tsx         (React DOM bootstrap)
├── vite.config.ts       (Vite build configuration)
├── tsconfig.json        (Updated for Vite)
└── src/styles/          (CSS files for web)
    ├── global.css
    ├── components.css
    ├── screens.css
    ├── animations.css
    └── responsive.css
```

### Modified Files

```
apps/dashboard/src/
├── index.tsx            (Converted to HTML/CSS)
├── screens/             (All 5 screens converted)
│   ├── HomeScreen.tsx
│   ├── OrdersScreen.tsx
│   ├── MenuScreen.tsx
│   ├── CRMScreen.tsx
│   └── SettingsScreen.tsx
└── styles/              (CSS implementation)
```

---

## Deployment Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Repository cloned locally
- [ ] Dependencies installed (`npm install`)
- [ ] Local testing passed (`npm run dev:dashboard`)
- [ ] Build succeeds (`npm run build:web`)
- [ ] GitHub Pages enabled in repository settings
- [ ] `homepage` field updated in package.json
- [ ] Deployed to GitHub Pages (`npm run deploy`)
- [ ] Live app accessible at your GitHub Pages URL

---

## Troubleshooting

### App doesn't load

- **Check browser console** for errors (F12)
- **Clear cache:** Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
- **Check URLs:** Ensure homepage in package.json matches your GitHub Pages URL

### Styles not showing

- Verify CSS files are in `src/styles/`
- Check that CSS is properly imported in `src/index.tsx`
- Clear browser cache

### Data not persisting

- Check if localStorage is enabled in browser
- Open DevTools → Application → LocalStorage
- Should see `restaurant_dashboard_mock_data` key
- Try resetting data: `localStorage.removeItem('restaurant_dashboard_mock_data')`

### Deployment fails

- Ensure `gh-pages` dependency is installed: `npm install --save-dev gh-pages`
- Check git config: `git config user.name` and `git config user.email`
- Verify GitHub token/credentials are setup for your system

---

## Environment Variables

### Development

```bash
# Development uses mock API by default
REACT_APP_USE_MOCK_API=true
```

### Production (GitHub Pages)

```bash
# Production automatically uses mock API (no backend available)
```

---

## Next Steps

### Optional Enhancements

- Add real backend API (replace mock API)
- Add user authentication
- Add real-time WebSocket updates
- Add image uploads for menu items
- Deploy backend to Vercel, Heroku, or Railway

### Custom Domain

To use a custom domain with GitHub Pages:

1. Add CNAME file to `apps/dashboard/public/CNAME`:
   ```
   your-domain.com
   ```

2. Update DNS settings at your domain registrar

---

## Support

For issues or questions:

1. Check GitHub Issues in your repository
2. Verify all steps in this guide were followed
3. Check browser developer console (F12) for error messages
4. Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

---

## Key Features Preserved

✅ Vintage Americana diner design
✅ Beautiful animations and transitions
✅ Responsive mobile/tablet/desktop layout
✅ All 5 functional screens
✅ Real-time data updates
✅ Smooth user experience
✅ Zero external dependencies (except React)
✅ Full type safety with TypeScript

---

## Summary

Your Restaurant Dashboard is now ready for GitHub Pages deployment! 🚀

**To deploy:**
```bash
npm run deploy
```

**To visit:**
```
https://YOUR_USERNAME.github.io/restaurant
```

No backend server, no app store installation, no special setup required!
