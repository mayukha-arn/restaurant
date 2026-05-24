import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { colors, spacing, typography } from '@shared/tokens';
import { Card, Button } from '@shared/components';
import { useRestaurant, useUpdateRestaurant, useRestaurantId } from '../hooks';

interface SettingsScreenProps {
  onBack?: () => void;
}

export const SettingsScreen = React.forwardRef<any, SettingsScreenProps>(
  ({ onBack }, ref) => {
    const restaurantId = useRestaurantId();
    const { data: restaurant, isLoading } = useRestaurant(restaurantId);
    const updateMutation = useUpdateRestaurant();

    const [isOpen, setIsOpen] = React.useState(true);
    const [openTime, setOpenTime] = React.useState('06:00');
    const [closeTime, setCloseTime] = React.useState('23:00');
    const [maxCapacity, setMaxCapacity] = React.useState('50');

    // Load restaurant data when available
    useEffect(() => {
      if (restaurant) {
        setIsOpen(restaurant.isOpen);
        setOpenTime(restaurant.openingTime || '06:00');
        setCloseTime(restaurant.closingTime || '23:00');
        setMaxCapacity(restaurant.maxCapacity?.toString() || '50');
      }
    }, [restaurant]);

    const handleSave = async () => {
      updateMutation.mutate({
        id: restaurantId,
        data: {
          isOpen,
          openingTime: openTime,
          closingTime: closeTime,
          maxCapacity: parseInt(maxCapacity, 10),
        },
      });
    };

    if (isLoading) {
      return (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    return (
      <ScrollView
        ref={ref}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>⚙️ Settings</Text>
          <Text style={styles.subtitle}>Configure your restaurant</Text>
        </View>

        {/* Restaurant Status */}
        <Card variant="elevated" style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Restaurant Open</Text>
              <Text style={styles.settingDescription}>
                {isOpen ? 'Currently accepting orders' : 'Closed to new orders'}
              </Text>
            </View>
            <Switch
              value={isOpen}
              onValueChange={setIsOpen}
              trackColor={{ false: colors.secondary, true: colors.primary }}
            />
          </View>
        </Card>

        {/* Operating Hours */}
        <Card variant="elevated" style={styles.settingCard}>
          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>Operating Hours</Text>
            <View style={styles.timeRow}>
              <View style={styles.timeField}>
                <Text style={styles.timeLabel}>Opens</Text>
                <Text style={styles.timeValue}>{openTime}</Text>
              </View>
              <View style={styles.timeField}>
                <Text style={styles.timeLabel}>Closes</Text>
                <Text style={styles.timeValue}>{closeTime}</Text>
              </View>
            </View>
            <Text style={styles.settingDescription}>
              Max Capacity: {maxCapacity} guests
            </Text>
          </View>
        </Card>

        {/* Restaurant Info */}
        {restaurant && (
          <Card variant="elevated" style={styles.settingCard}>
            <View style={styles.settingGroup}>
              <Text style={styles.settingLabel}>{restaurant.name}</Text>
              <Text style={styles.infoText}>{restaurant.address}</Text>
              <Text style={styles.infoText}>{restaurant.phone}</Text>
              <Text style={styles.infoText}>{restaurant.email}</Text>
            </View>
          </Card>
        )}

        {/* Save Button */}
        <Button
          label={updateMutation.isPending ? 'Saving...' : 'Save Settings'}
          onPress={handleSave}
          style={styles.saveButton}
          disabled={updateMutation.isPending}
        />
      </ScrollView>
    );
  }
);

SettingsScreen.displayName = 'SettingsScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingVertical: spacing[4],
  },
  header: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: spacing[4],
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.secondary,
  },
  settingCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[3],
    padding: spacing[4],
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing[1],
  },
  settingDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.secondary,
  },
  settingGroup: {
    marginBottom: spacing[2],
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing[3],
  },
  timeField: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.secondary,
    marginBottom: spacing[1],
  },
  timeValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary,
  },
  infoBox: {
    marginTop: spacing[3],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    backgroundColor: colors.light,
    borderRadius: 8,
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.dark,
    marginBottom: spacing[2],
  },
  saveButton: {
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    marginBottom: spacing[6],
  },
});
