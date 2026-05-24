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

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'orders':
        return <OrdersScreen onBack={() => setCurrentScreen('home')} />;
      case 'menu':
        return <MenuScreen onBack={() => setCurrentScreen('home')} />;
      case 'crm':
        return <CRMScreen onBack={() => setCurrentScreen('home')} />;
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen('home')} />;
      case 'home':
      default:
        return (
          <HomeScreen onNavigate={(section) => setCurrentScreen(section as Screen)} />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      {currentScreen !== 'home' && (
        <div className="app-navbar">
          <button
            className="back-button"
            onClick={() => setCurrentScreen('home')}
          >
            ← Back to Home
          </button>
          <h1 className="current-page-title">
            {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}
          </h1>
        </div>
      )}

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

/**
 * Root App Component
 *
 * Wraps AppContent with:
 * - ErrorBoundary: Catches JavaScript errors
 * - QueryProvider: React Query client and configuration
 */
export default function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <AppContent />
      </QueryProvider>
    </ErrorBoundary>
  );
}
