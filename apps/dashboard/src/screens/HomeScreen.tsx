import React from 'react';
import { useOrdersList, useMenuItemsListByRestaurant, useRestaurantId } from '../hooks';
import '../styles/screens.css';

interface HomeScreenProps {
  onNavigate?: (section: string, category?: string) => void;
}

const CHEF_PICKS = [
  { name: 'Smash Burger',    category: 'Burgers',    price: 12.99, orders: 8,  emoji: '🍔', menuCategory: 'Burgers' },
  { name: 'Seasoned Fries',  category: 'Sides',      price: 4.99,  orders: 6,  emoji: '🍟', menuCategory: 'Appetizers' },
  { name: 'Homemade Cola',   category: 'Drinks',     price: 2.99,  orders: 6,  emoji: '🥤', menuCategory: 'Beverages' },
  { name: 'Ice Cream Sundae',category: 'Desserts',   price: 2.00,  orders: 5,  emoji: '🍨', menuCategory: 'Desserts' },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const restaurantId = useRestaurantId();
  const { data: orders } = useOrdersList(restaurantId);
  const { data: menuItems } = useMenuItemsListByRestaurant(restaurantId);

  // Compute stats
  const totalOrders = orders?.length ?? 0;
  const revenue = orders?.reduce((sum: number, o: any) => {
    const amt = typeof o.totalAmount === 'string' ? parseFloat(o.totalAmount) : (o.totalAmount ?? 0);
    return sum + amt;
  }, 0) ?? 0;
  const pendingOrders = orders?.filter((o: any) =>
    o.status === 'pending' || o.status === 'confirmed'
  ).length ?? 0;
  const popularItem = menuItems?.[0]?.name ?? 'Smash Burger';

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-greeting">Good day, Chef</h1>
        <p className="dashboard-subtitle">Here's what's cooking today.</p>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card stat-card--orange">
          <div className="stat-card-top">
            <span className="stat-card-label">TOTAL ORDERS</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" opacity="0.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <span className="stat-card-value">{totalOrders}</span>
        </div>

        <div className="stat-card stat-card--gold">
          <div className="stat-card-top">
            <span className="stat-card-label">REVENUE</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" opacity="0.8"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
          <span className="stat-card-value">${revenue.toFixed(2)}</span>
        </div>

        <div className="stat-card stat-card--dark">
          <div className="stat-card-top">
            <span className="stat-card-label">PENDING ORDERS</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" opacity="0.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <span className="stat-card-value">{pendingOrders}</span>
        </div>

        <div className="stat-card stat-card--light">
          <div className="stat-card-top">
            <span className="stat-card-label">POPULAR ITEM</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" opacity="0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <span className="stat-card-value stat-card-value--sm">{popularItem}</span>
        </div>
      </div>

      {/* Chef's Picks */}
      <h2 className="section-heading">Chef's Picks</h2>
      <div className="picks-grid">
        {CHEF_PICKS.map((item) => (
          <button
            key={item.name}
            className="pick-card"
            onClick={() => onNavigate?.('menu', item.menuCategory)}
          >
            <div className="pick-card-img">{item.emoji}</div>
            <div className="pick-card-body">
              <span className="pick-card-name">{item.name}</span>
              <span className="pick-card-category">{item.category}</span>
              <div className="pick-card-footer">
                <span className="pick-card-price">${item.price.toFixed(2)}</span>
                <span className="pick-card-orders">{item.orders} orders</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Orders */}
      <h2 className="section-heading">Recent Orders</h2>
      <div className="orders-table-wrap">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ORDER</th>
              <th>CUSTOMER</th>
              <th>STATUS</th>
              <th>TOTAL</th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              [...orders].reverse().map((order: any) => (
                <tr key={order.id} onClick={() => onNavigate?.('orders')} className="orders-table-row">
                  <td className="order-num">#{order.orderNumber ?? order.id}</td>
                  <td>{order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'Walk-in'}</td>
                  <td><span className={`status-pill status-pill--${order.status}`}>{capitalize(order.status)}</span></td>
                  <td className="order-total">${parseFloat(order.totalAmount ?? 0).toFixed(2)}</td>
                  <td className="order-time">{formatTime(order.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="table-empty">No orders yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function capitalize(s: string) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');
}

function formatTime(dateStr?: string) {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch { return '—'; }
}

HomeScreen.displayName = 'HomeScreen';
