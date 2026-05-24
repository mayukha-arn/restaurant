import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { HTTPException } from 'hono/http-exception';
import {
  restaurants,
  menuCategories,
  menuItems,
  orders,
  customers,
} from './routes';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Error handler
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  console.error('Unhandled error:', err);

  return c.json(
    {
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
    500
  );
});

// Health check
app.get('/health', (c) => {
  return c.json({ success: true, status: 'ok' });
});

// API routes
app.route('/api/restaurants', restaurants);
app.route('/api/menu-categories', menuCategories);
app.route('/api/menu-items', menuItems);
app.route('/api/orders', orders);
app.route('/api/customers', customers);

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: 'Route not found',
      code: 'NOT_FOUND',
    },
    404
  );
});

export default app;
