import React from 'react';
import { Card, Skeleton } from '@shared/components';
import { useCustomersList, useRestaurantId } from '../hooks';
import type { Customer } from '@restaurant/types';
import '../styles/screens.css';

interface CRMScreenProps {
  onBack?: () => void;
}

export const CRMScreen = React.forwardRef<HTMLDivElement, CRMScreenProps>(
  ({ onBack }, ref) => {
    const restaurantId = useRestaurantId();
    const { data: customers, isLoading, error } = useCustomersList(restaurantId);

    const formatCurrency = (amount: any) => {
      const num = typeof amount === 'string' ? parseFloat(amount) : amount;
      return `$${num.toFixed(2)}`;
    };

    return (
      <div
        ref={ref}
        className="crm-screen overflow-y-auto"
      >
        <div className="crm-header">
          <h1 className="crm-title">👥 CRM</h1>
          <p className="crm-subtitle">Customer relationships ({customers?.length || 0})</p>
        </div>

        <div className="customers-list">
          {isLoading ? (
            <>
              <Skeleton className="customer-card" />
              <Skeleton className="customer-card" />
              <Skeleton className="customer-card" />
            </>
          ) : error ? (
            <p className="error-text">Failed to load customers</p>
          ) : customers && customers.length > 0 ? (
            customers.map((customer: Customer) => (
              <Card key={customer.id} variant="elevated" className="customer-card">
                <h3 className="customer-name">
                  {customer.firstName} {customer.lastName}
                </h3>
                {customer.email && (
                  <p className="customer-email">{customer.email}</p>
                )}
                <div className="customer-stats">
                  <div className="stat-item">
                    <p className="stat-label">Orders</p>
                    <p className="stat-value">{customer.totalOrders}</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-label">Loyalty Pts</p>
                    <p className="stat-value">{customer.loyaltyPoints}</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-label">Total Spend</p>
                    <p className="stat-value">{formatCurrency(customer.totalSpent)}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="empty-state-container">
              <p className="empty-state-text">No customers yet</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

CRMScreen.displayName = 'CRMScreen';
