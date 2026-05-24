import React, { useState } from 'react';
import './styles/global.css';
import './styles/components.css';
import './styles/screens.css';
import './styles/animations.css';
import './styles/responsive.css';
import { QueryProvider } from './providers/QueryProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomeScreen } from './screens/HomeScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { MenuScreen } from './screens/MenuScreen';
import { CRMScreen } from './screens/CRMScreen';
import { SettingsScreen } from './screens/SettingsScreen';

type Screen = 'home' | 'orders' | 'menu' | 'crm' | 'settings';

const NAV_ITEMS: { id: Screen; label: string; icon: React.ReactNode }[] = [
  {
    id: 'home', label: 'Dashboard',
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    id: 'orders', label: 'Orders',
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
  },
  {
    id: 'crm', label: 'Customers',
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  },
  {
    id: 'menu', label: 'Menu',
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h18v4H3zM3 10h18M3 17h18M3 21h18"/><path d="M7 7v14M17 7v14"/></svg>,
  },
  {
    id: 'settings', label: 'Settings',
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  },
];

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [menuCategory, setMenuCategory] = useState<string | undefined>(undefined);

  const goToMenu = (category?: string) => {
    setMenuCategory(category);
    setCurrentScreen('menu');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'orders':   return <OrdersScreen   onBack={() => setCurrentScreen('home')} />;
      case 'menu':     return <MenuScreen     onBack={() => setCurrentScreen('home')} initialCategory={menuCategory} />;
      case 'crm':      return <CRMScreen      onBack={() => setCurrentScreen('home')} />;
      case 'settings': return <SettingsScreen onBack={() => setCurrentScreen('home')} />;
      case 'home':
      default:
        return <HomeScreen onNavigate={(s, category?) => {
          if (s === 'menu') { goToMenu(category); } else { setCurrentScreen(s as Screen); }
        }} />;
    }
  };

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-name">The Diner</span>
          <span className="sidebar-logo-sub">Operations HQ</span>
        </div>
        <div className="sidebar-nav">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`sidebar-nav-btn${currentScreen === id ? ' active' : ''}`}
              onClick={() => { setMenuCategory(undefined); setCurrentScreen(id); }}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="app-content">
        <div className="screen-container">
          <div className="screen-content">
            {renderScreen()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <AppContent />
      </QueryProvider>
    </ErrorBoundary>
  );
}
