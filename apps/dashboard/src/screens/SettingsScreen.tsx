import React, { useEffect } from 'react';
import { Card, Button } from '@shared/components';
import { useRestaurant, useUpdateRestaurant, useRestaurantId } from '../hooks';
import '../styles/screens.css';

interface SettingsScreenProps {
  onBack?: () => void;
}

export const SettingsScreen = React.forwardRef<HTMLDivElement, SettingsScreenProps>(
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
        <div className="settings-screen loading-container">
          <div className="spinner spinner-lg" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="settings-screen overflow-y-auto"
      >
        <div className="settings-header">
          <h1 className="settings-title">⚙️ Settings</h1>
          <p className="settings-subtitle">Configure your restaurant</p>
        </div>

        {/* Restaurant Status */}
        <Card variant="elevated" className="settings-card">
          <div className="settings-row">
            <div>
              <h3 className="settings-label">Restaurant Open</h3>
              <p className="settings-description">
                {isOpen ? 'Currently accepting orders' : 'Closed to new orders'}
              </p>
            </div>
            <input
              type="checkbox"
              checked={isOpen}
              onChange={(e) => setIsOpen(e.target.checked)}
              style={{
                accentColor: 'var(--color-primary)',
                width: '40px',
                height: '24px',
                cursor: 'pointer',
              }}
            />
          </div>
        </Card>

        {/* Operating Hours */}
        <Card variant="elevated" className="settings-card">
          <div className="settings-group">
            <h3 className="settings-label">Operating Hours</h3>
            <div className="time-row">
              <div className="time-field">
                <p className="time-label">Opens</p>
                <p className="time-value">{openTime}</p>
              </div>
              <div className="time-field">
                <p className="time-label">Closes</p>
                <p className="time-value">{closeTime}</p>
              </div>
            </div>
            <p className="settings-description">
              Max Capacity: {maxCapacity} guests
            </p>
          </div>
        </Card>

        {/* Restaurant Info */}
        {restaurant && (
          <Card variant="elevated" className="settings-card">
            <div className="settings-group">
              <h3 className="settings-label">{restaurant.name}</h3>
              <p className="settings-info-text">{restaurant.address}</p>
              <p className="settings-info-text">{restaurant.phone}</p>
              <p className="settings-info-text">{restaurant.email}</p>
            </div>
          </Card>
        )}

        {/* Save Button */}
        <Button
          label={updateMutation.isLoading ? 'Saving...' : 'Save Settings'}
          onClick={handleSave}
          className="settings-save-button"
          disabled={updateMutation.isLoading}
        />
      </div>
    );
  }
);

SettingsScreen.displayName = 'SettingsScreen';
