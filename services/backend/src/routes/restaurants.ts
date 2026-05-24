import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { restaurants } from '../db/schema';
import {
  insertRestaurantSchema,
  updateRestaurantSchema,
  selectRestaurantSchema,
} from '../schemas';

type Env = {
  Variables: {
    restaurantId?: number;
  };
};

const app = new Hono<Env>();

// Get all restaurants
app.get('/', async (c) => {
  try {
    const allRestaurants = await db.query.restaurants.findMany();
    return c.json({
      success: true,
      data: allRestaurants,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch restaurants',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Get single restaurant
app.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const restaurant = await db.query.restaurants.findFirst({
      where: eq(restaurants.id, id),
    });

    if (!restaurant) {
      return c.json(
        {
          success: false,
          error: 'Restaurant not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch restaurant',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Create restaurant
app.post('/', zValidator('json', insertRestaurantSchema), async (c) => {
  try {
    const data = c.req.valid('json');

    const result = await db.insert(restaurants).values(data).returning();

    if (!result.length) {
      throw new Error('Failed to insert restaurant');
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
        error: 'Failed to create restaurant',
        code: 'CREATE_ERROR',
      },
      500
    );
  }
});

// Update restaurant
app.put('/:id', zValidator('json', updateRestaurantSchema), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = c.req.valid('json');

    const result = await db
      .update(restaurants)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(restaurants.id, id))
      .returning();

    if (!result.length) {
      return c.json(
        {
          success: false,
          error: 'Restaurant not found',
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
        error: 'Failed to update restaurant',
        code: 'UPDATE_ERROR',
      },
      500
    );
  }
});

// Delete restaurant
app.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));

    const result = await db
      .delete(restaurants)
      .where(eq(restaurants.id, id))
      .returning();

    if (!result.length) {
      return c.json(
        {
          success: false,
          error: 'Restaurant not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: { message: 'Restaurant deleted successfully' },
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to delete restaurant',
        code: 'DELETE_ERROR',
      },
      500
    );
  }
});

export default app;
