import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq, and } from 'drizzle-orm';
import { db } from '../db';
import { orders, orderItems } from '../db/schema';
import {
  insertOrderSchema,
  updateOrderSchema,
  insertOrderItemSchema,
} from '../schemas';

const app = new Hono();

// Generate order number
function generateOrderNumber(): string {
  const date = new Date();
  const timestamp = date.getTime().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

// Get orders for restaurant
app.get('/restaurant/:restaurantId', async (c) => {
  try {
    const restaurantId = parseInt(c.req.param('restaurantId'));
    const orders_data = await db.query.orders.findMany({
      where: eq(orders.restaurantId, restaurantId),
      with: {
        orderItems: {
          with: {
            menuItem: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      data: orders_data,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch orders',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Get single order
app.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const order_data = await db.query.orders.findFirst({
      where: eq(orders.id, id),
      with: {
        orderItems: {
          with: {
            menuItem: true,
          },
        },
      },
    });

    if (!order_data) {
      return c.json(
        {
          success: false,
          error: 'Order not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: order_data,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch order',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Create order
app.post(
  '/:restaurantId',
  zValidator('json', insertOrderSchema),
  async (c) => {
    try {
      const restaurantId = parseInt(c.req.param('restaurantId'));
      const data = c.req.valid('json');

      const orderNumber = generateOrderNumber();

      const result = await db
        .insert(orders)
        .values({
          ...data,
          restaurantId,
          orderNumber,
        })
        .returning();

      if (!result.length) {
        throw new Error('Failed to insert order');
      }

      return c.json(
        {
          success: true,
          data: result[0],
        },
        201
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          error: 'Failed to create order',
          code: 'CREATE_ERROR',
        },
        500
      );
    }
  }
);

// Add item to order
app.post(
  '/:orderId/items',
  zValidator('json', insertOrderItemSchema),
  async (c) => {
    try {
      const orderId = parseInt(c.req.param('orderId'));
      const data = c.req.valid('json');

      const result = await db
        .insert(orderItems)
        .values({
          ...data,
          orderId,
        })
        .returning();

      if (!result.length) {
        throw new Error('Failed to insert order item');
      }

      return c.json(
        {
          success: true,
          data: result[0],
        },
        201
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          error: 'Failed to add item to order',
          code: 'CREATE_ERROR',
        },
        500
      );
    }
  }
);

// Update order status
app.put('/:id', zValidator('json', updateOrderSchema), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = c.req.valid('json');

    const updateData: any = {
      ...data,
      updatedAt: new Date(),
    };

    if (data.status === 'completed') {
      updateData.completedAt = new Date();
    }

    const result = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();

    if (!result.length) {
      return c.json(
        {
          success: false,
          error: 'Order not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to update order',
        code: 'UPDATE_ERROR',
      },
      500
    );
  }
});

// Get order by order number
app.get('/lookup/:orderNumber', async (c) => {
  try {
    const orderNumber = c.req.param('orderNumber');
    const order_data = await db.query.orders.findFirst({
      where: eq(orders.orderNumber, orderNumber),
      with: {
        orderItems: {
          with: {
            menuItem: true,
          },
        },
      },
    });

    if (!order_data) {
      return c.json(
        {
          success: false,
          error: 'Order not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: order_data,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch order',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

export default app;
