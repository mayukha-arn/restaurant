import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { customers } from '../db/schema';
import {
  insertCustomerSchema,
  updateCustomerSchema,
} from '../schemas';

const app = new Hono();

// Get customers for restaurant
app.get('/restaurant/:restaurantId', async (c) => {
  try {
    const restaurantId = parseInt(c.req.param('restaurantId'));
    const customerList = await db.query.customers.findMany({
      where: eq(customers.restaurantId, restaurantId),
    });

    return c.json({
      success: true,
      data: customerList,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch customers',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Get single customer
app.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const customer = await db.query.customers.findFirst({
      where: eq(customers.id, id),
    });

    if (!customer) {
      return c.json(
        {
          success: false,
          error: 'Customer not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch customer',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Create customer
app.post(
  '/:restaurantId',
  zValidator('json', insertCustomerSchema),
  async (c) => {
    try {
      const restaurantId = parseInt(c.req.param('restaurantId'));
      const data = c.req.valid('json');

      const result = await db
        .insert(customers)
        .values({
          ...data,
          restaurantId,
        })
        .returning();

      if (!result.length) {
        throw new Error('Failed to insert customer');
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
          error: 'Failed to create customer',
          code: 'CREATE_ERROR',
        },
        500
      );
    }
  }
);

// Update customer
app.put('/:id', zValidator('json', updateCustomerSchema), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = c.req.valid('json');

    const result = await db
      .update(customers)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(customers.id, id))
      .returning();

    if (!result.length) {
      return c.json(
        {
          success: false,
          error: 'Customer not found',
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
        error: 'Failed to update customer',
        code: 'UPDATE_ERROR',
      },
      500
    );
  }
});

// Delete customer
app.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));

    const result = await db
      .delete(customers)
      .where(eq(customers.id, id))
      .returning();

    if (!result.length) {
      return c.json(
        {
          success: false,
          error: 'Customer not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: { message: 'Customer deleted successfully' },
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to delete customer',
        code: 'DELETE_ERROR',
      },
      500
    );
  }
});

export default app;
