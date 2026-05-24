import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { menuItems, menuCategories } from '../db/schema';
import {
  insertMenuItemSchema,
  updateMenuItemSchema,
} from '../schemas';

const app = new Hono();

// Get menu items for a category
app.get('/category/:categoryId', async (c) => {
  try {
    const categoryId = parseInt(c.req.param('categoryId'));
    const items = await db.query.menuItems.findMany({
      where: eq(menuItems.categoryId, categoryId),
    });

    return c.json({
      success: true,
      data: items,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch menu items',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Get all menu items for restaurant
app.get('/restaurant/:restaurantId', async (c) => {
  try {
    const restaurantId = parseInt(c.req.param('restaurantId'));
    const items = await db.query.menuItems.findMany({
      where: eq(menuItems.restaurantId, restaurantId),
    });

    return c.json({
      success: true,
      data: items,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch menu items',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Get single menu item
app.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const item = await db.query.menuItems.findFirst({
      where: eq(menuItems.id, id),
    });

    if (!item) {
      return c.json(
        {
          success: false,
          error: 'Menu item not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: item,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch menu item',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Create menu item
app.post(
  '/:restaurantId/:categoryId',
  zValidator('json', insertMenuItemSchema),
  async (c) => {
    try {
      const restaurantId = parseInt(c.req.param('restaurantId'));
      const categoryId = parseInt(c.req.param('categoryId'));
      const data = c.req.valid('json');

      const result = await db
        .insert(menuItems)
        .values({
          ...data,
          restaurantId,
          categoryId,
        })
        .returning();

      if (!result.length) {
        throw new Error('Failed to insert menu item');
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
          error: 'Failed to create menu item',
          code: 'CREATE_ERROR',
        },
        500
      );
    }
  }
);

// Update menu item
app.put('/:id', zValidator('json', updateMenuItemSchema), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = c.req.valid('json');

    const result = await db
      .update(menuItems)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(menuItems.id, id))
      .returning();

    if (!result.length) {
      return c.json(
        {
          success: false,
          error: 'Menu item not found',
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
        error: 'Failed to update menu item',
        code: 'UPDATE_ERROR',
      },
      500
    );
  }
});

// Delete menu item
app.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));

    const result = await db
      .delete(menuItems)
      .where(eq(menuItems.id, id))
      .returning();

    if (!result.length) {
      return c.json(
        {
          success: false,
          error: 'Menu item not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: { message: 'Menu item deleted successfully' },
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to delete menu item',
        code: 'DELETE_ERROR',
      },
      500
    );
  }
});

export default app;
