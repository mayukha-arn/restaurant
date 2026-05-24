import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import { colors, spacing, typography } from '@shared/tokens';
import { HomeScreen } from './screens/HomeScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { MenuScreen } from './screens/MenuScreen';
import { CRMScreen } from './screens/CRMScreen';
import { SettingsScreen } from './screens/SettingsScreen';

type Screen = 'home' | 'orders' | 'menu' | 'crm' | 'settings';

export default function App() {
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Navigation Header */}
      {currentScreen !== 'home' && (
        <View style={styles.navBar}>
          <Pressable
            onPress={() => setCurrentScreen('home')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </Pressable>
          <Text style={styles.currentPageTitle}>
            {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}
          </Text>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.light,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  backButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    backgroundColor: colors.primary,
    borderRadius: 6,
    marginRight: spacing[4],
  },
  backButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: typography.fontSize.sm,
  },
  currentPageTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.primary,
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
