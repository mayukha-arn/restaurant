import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { menuCategories } from '../db/schema';
import { insertMenuCategorySchema } from '../schemas';

const app = new Hono();

// Get categories for restaurant
app.get('/restaurant/:restaurantId', async (c) => {
  try {
    const restaurantId = parseInt(c.req.param('restaurantId'));
    const categories = await db.query.menuCategories.findMany({
      where: eq(menuCategories.restaurantId, restaurantId),
      with: {
        menuItems: true,
      },
    });

    return c.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch categories',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Get single category
app.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const category = await db.query.menuCategories.findFirst({
      where: eq(menuCategories.id, id),
      with: {
        menuItems: true,
      },
    });

    if (!category) {
      return c.json(
        {
          success: false,
          error: 'Category not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: category,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to fetch category',
        code: 'FETCH_ERROR',
      },
      500
    );
  }
});

// Create category
app.post(
  '/:restaurantId',
  zValidator('json', insertMenuCategorySchema),
  async (c) => {
    try {
      const restaurantId = parseInt(c.req.param('restaurantId'));
      const data = c.req.valid('json');

      const result = await db
        .insert(menuCategories)
        .values({
          ...data,
          restaurantId,
        })
        .returning();

      if (!result.length) {
        throw new Error('Failed to insert category');
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
          error: 'Failed to create category',
          code: 'CREATE_ERROR',
        },
        500
      );
    }
  }
);

// Update category
app.put('/:id', zValidator('json', insertMenuCategorySchema.partial()), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = c.req.valid('json');

    const result = await db
      .update(menuCategories)
      .set(data)
      .where(eq(menuCategories.id, id))
      .returning();

    if (!result.length) {
      return c.json(
        {
          success: false,
          error: 'Category not found',
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
        error: 'Failed to update category',
        code: 'UPDATE_ERROR',
      },
      500
    );
  }
});

// Delete category
app.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));

    const result = await db
      .delete(menuCategories)
      .where(eq(menuCategories.id, id))
      .returning();

    if (!result.length) {
      return c.json(
        {
          success: false,
          error: 'Category not found',
          code: 'NOT_FOUND',
        },
        404
      );
    }

    return c.json({
      success: true,
      data: { message: 'Category deleted successfully' },
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Failed to delete category',
        code: 'DELETE_ERROR',
      },
      500
    );
  }
});

export default app;
