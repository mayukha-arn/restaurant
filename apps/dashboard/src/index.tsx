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

const NAV_ITEMS: { id: Screen; label: string }[] = [
  { id: 'home',     label: 'Home' },
  { id: 'settings', label: 'Settings' },
  { id: 'crm',      label: 'CRM' },
  { id: 'orders',   label: 'Orders' },
  { id: 'menu',     label: 'Menu' },
];

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'orders':   return <OrdersScreen  onBack={() => setCurrentScreen('home')} />;
      case 'menu':     return <MenuScreen    onBack={() => setCurrentScreen('home')} />;
      case 'crm':      return <CRMScreen     onBack={() => setCurrentScreen('home')} />;
      case 'settings': return <SettingsScreen onBack={() => setCurrentScreen('home')} />;
      case 'home':
      default:
        return <HomeScreen onNavigate={(s) => setCurrentScreen(s as Screen)} />;
    }
  };

  return (
    <div className="app-container">
      {/* Persistent Top Navbar */}
      <nav className="topnav">
        <span className="topnav-logo">DINER LOGO</span>
        <div className="topnav-tabs">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              className={`topnav-tab${currentScreen === id ? ' active' : ''}`}
              onClick={() => setCurrentScreen(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Screen Content */}
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
