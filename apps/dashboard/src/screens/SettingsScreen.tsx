import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { colors, spacing, typography } from '@shared/tokens';
import { Card, Button } from '@shared/components';

interface SettingsScreenProps {
  onBack?: () => void;
}

export const SettingsScreen = React.forwardRef<any, SettingsScreenProps>(
  ({ onBack }, ref) => {
    const [autoAccept, setAutoAccept] = React.useState(false);
    const [openTime, setOpenTime] = React.useState('9:00 AM');
    const [closeTime, setCloseTime] = React.useState('10:00 PM');

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

        <Card variant="elevated" style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Auto-accept Orders</Text>
              <Text style={styles.settingDescription}>
                Automatically accept new orders
              </Text>
            </View>
            <Switch
              value={autoAccept}
              onValueChange={setAutoAccept}
              trackColor={{ false: colors.secondary, true: colors.primary }}
            />
          </View>
        </Card>

        <Card variant="elevated" style={styles.settingCard}>
          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>Operating Hours</Text>
            <View style={styles.timeRow}>
              <View style={styles.timeField}>
                <Text style={styles.timeLabel}>Open</Text>
                <Text style={styles.timeValue}>{openTime}</Text>
              </View>
              <View style={styles.timeField}>
                <Text style={styles.timeLabel}>Close</Text>
                <Text style={styles.timeValue}>{closeTime}</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card variant="elevated" style={styles.settingCard}>
          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>Service Settings</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                ✓ Service availability tracking enabled
              </Text>
              <Text style={styles.infoText}>
                ✓ Prep time estimates active
              </Text>
              <Text style={styles.infoText}>
                ✓ Customer notifications enabled
              </Text>
            </View>
          </View>
        </Card>

        <Button
          label="Save Settings"
          onPress={() => {}}
          style={styles.saveButton}
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
