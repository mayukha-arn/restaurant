# Testing Guide - Restaurant Dashboard

## 🎯 What You Have Right Now

**✅ Fully Functional Frontend**
- Vintage Americana 1950s diner themed dashboard
- Checkered restaurant table background on homepage
- 4 interactive food items for navigation
- 5 complete dashboard pages with mock data
- Complete design system
- Ready to run and test

## 🚀 How to Run & Test

### Step 1: Start the App

```bash
cd /Users/mayukhaarn/Documents/GitHub/restaurant
pnpm dev:dashboard
```

Expected output:
```
...
⚡️  Expo is waiting for you...
       Web: http://localhost:19000
```

### Step 2: Open in Browser

1. Go to: `http://localhost:19000`
2. You should see the **Expo Metro Bundler** start building
3. Wait for the app to load (may take 30-60 seconds on first run)

### Step 3: Explore the Diner Theme

Once loaded, you'll see:

#### 🍽️ Home Page (Diner Theme)
```
┌─────────────────────────────────────────┐
│  🪩 DINER DASHBOARD 🪩                  │
│  Select a food to navigate               │
├─────────────────────────────────────────┤
│                                          │
│  [Checkered White/Gray Background]      │
│                                          │
│    🍟 Fries       🍔 Burger             │
│    [Yellow Card]  [Brown Card]          │
│                                          │
│    🥤 Cola        🍦 Ice Cream          │
│    [Red Card]     [Pink Card]           │
│                                          │
├─────────────────────────────────────────┤
│  Welcome to the Diner!                  │
│  Click on any food item above to         │
│  navigate to different sections...      │
└─────────────────────────────────────────┘
```

### Step 4: Test Navigation

Click on each food item to test navigation:

**🍟 Click Fries**
- Navigates to **Orders page**
- See order list with statuses (pending, preparing, ready)
- Status badges show color coding
- Back button appears at top

**🍔 Click Burger**
- Navigates to **Menu page**
- See menu items with categories and prices
- Category badges for organization
- Back button available

**🥤 Click Cola**
- Navigates to **Settings page**
- Auto-accept toggle switch
- Operating hours configuration
- Service settings overview
- Save button (not wired to backend yet)

**🍦 Click Ice Cream**
- Navigates to **CRM page**
- Customer profiles with order counts
- Total spend per customer
- Clean card layout

### Step 5: Test Design Elements

#### 🎨 Colors (Vintage Diner Palette)
- **Red/Crimson**: Primary buttons and titles
- **Silver/Chrome**: Secondary elements
- **Gold/Yellow**: Accents and fries item
- **Cream**: Light backgrounds
- **Peach**: Ice cream item
- **Pink**: Ice cream card
- **Brown**: Burger item

#### 📏 Spacing & Layout
- Proper padding between elements
- Consistent spacing scale (4px, 8px, 12px, 16px, etc.)
- Responsive grid layout for food items

#### 🔘 Components
- **Buttons**: Red primary, outline variants
- **Cards**: Elevated with shadow effects
- **Badges**: Status indicators (success, warning, error)
- **Typography**: Diner font for titles

### Step 6: Test Interactions

- **Hover Effects**: Food items scale slightly on hover (desktop)
- **Touch Effects**: Cards respond to selection (mobile)
- **Transitions**: Smooth page transitions
- **Buttons**: Back button navigates home

## 📋 Test Checklist

- [ ] App starts without errors
- [ ] Home page loads with checkered background
- [ ] 4 food items visible and centered
- [ ] Food items are clickable
- [ ] Clicking Fries goes to Orders
- [ ] Clicking Burger goes to Menu
- [ ] Clicking Cola goes to Settings
- [ ] Clicking Ice Cream goes to CRM
- [ ] Back button returns to home
- [ ] All pages show mock data
- [ ] Colors match diner theme
- [ ] Spacing is consistent
- [ ] Typography looks good
- [ ] No console errors

## 🎨 Visual Verification

### Home Page Checklist
- [ ] Checkered white/gray table pattern background
- [ ] Red border around the main table container
- [ ] White and gold header with title
- [ ] 4 food emoji cards in center
- [ ] Each card has different border color
  - [ ] Fries: Gold border
  - [ ] Burger: Brown border
  - [ ] Cola: Red border
  - [ ] Ice Cream: Pink border
- [ ] Food info card at bottom with cream background
- [ ] Typography in diner/courier font for titles

### Page Headers
- [ ] Each page has colored title (red)
- [ ] Subtitle in gray
- [ ] Back button styled red with white text
- [ ] Header divider line in red

### Mock Data
All pages should show realistic mock data:
- Orders: ID, items, total, status
- Menu: Name, category, price
- CRM: Customer name, orders, spend
- Settings: Toggle switches, time fields

## 🔧 Troubleshooting

### App Won't Start
```bash
# Try clearing cache
rm -rf apps/dashboard/.expo

# Reinstall
npm install

# Try again
pnpm dev:dashboard
```

### Port 19000 Already in Use
```bash
# Use different port
pnpm dev:dashboard -- --port 19001
```

### Components Not Showing
- Check browser console for errors
- Verify all imports use `@shared` not relative paths
- Check tokens are properly exported

### Colors Look Wrong
- Colors are defined in `packages/shared/src/tokens/diner-theme.ts`
- Check CSS/styling in each component's StyleSheet
- Verify color hex values match theme

## 📱 Mobile Testing

The app should also work on:
- [ ] iPhone/iPad (if available)
- [ ] Android (if available)
- Run: `pnpm dev:dashboard` and scan QR code with Expo app

## 🎬 Next Steps After Testing

Once you've verified the frontend works:

1. **Ready for Backend**: When you're ready, we'll build Section 3:
   - Database schema (Drizzle ORM)
   - Hono API endpoints
   - Business logic
   - Real data

2. **Database Integration**: 
   - Set up PostgreSQL (Docker)
   - Create migrations
   - Seed test data

3. **API Generation**:
   - Generate types from Drizzle schema
   - Create OpenAPI spec
   - Generate React Query hooks
   - Replace mock data with real API calls

## 📸 Expected Screenshots

### Home Page
Should show a checkered table pattern with 4 colorful food cards arranged in a grid. The background should be white and gray checks, with a red border around the main table area.

### Orders Page
Clean list of order cards showing:
- Order #001, #002, #003
- Items ordered
- Total price
- Status badge (pending/preparing/ready)

### Menu Page
Similar card layout showing:
- Item names
- Category badges
- Prices

### CRM Page
Customer cards with:
- Names
- Order count
- Total spend amount

### Settings Page
Forms and toggles for:
- Auto-accept switch
- Time inputs
- Info boxes

## ✨ Design System Highlights

The implementation demonstrates:
- ✅ Centralized design tokens
- ✅ Reusable component library
- ✅ Consistent color palette
- ✅ Typography system
- ✅ Spacing scale
- ✅ Component variants
- ✅ Clean architecture
- ✅ No hardcoded values

All values come from the token system, making it easy to theme changes later.

## 🎉 Success Criteria

If you can:
1. Run `pnpm dev:dashboard`
2. See the diner-themed home page
3. Click food items to navigate
4. View all 5 pages with mock data
5. Go back to home from any page
6. See proper styling and colors

**Then Sections 1-2 are complete! ✅**

---

Ready to proceed to Section 3 (Backend & Database) when you're ready!
