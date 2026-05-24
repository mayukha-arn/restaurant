# Restaurant Dashboard API Documentation

## Base URL
- Development: `http://localhost:8787`
- Production: `https://api.example.com`

## Authentication
Currently, all endpoints are public. Authentication will be added in future versions.

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

---

## Endpoints

### Health Check
Check if the API is running.

**GET** `/health`

Response:
```json
{
  "success": true,
  "status": "ok"
}
```

---

## Restaurants

### List All Restaurants
**GET** `/api/restaurants`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Vintage Diner",
      "address": "123 Main St",
      "phone": "(555) 123-4567",
      "email": "contact@vintagediner.com",
      "description": "A classic American diner",
      "cuisineType": "American",
      "maxCapacity": 60,
      "isOpen": true,
      "openingTime": "06:00",
      "closingTime": "23:00",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Single Restaurant
**GET** `/api/restaurants/:id`

Response: Single restaurant object (same schema as above)

### Create Restaurant
**POST** `/api/restaurants`

Request body:
```json
{
  "name": "New Diner",
  "address": "456 Oak Ave",
  "phone": "(555) 456-7890",
  "email": "new@diner.com",
  "description": "A new restaurant",
  "cuisineType": "Italian",
  "maxCapacity": 50
}
```

### Update Restaurant
**PUT** `/api/restaurants/:id`

Request body: Any fields from Create endpoint (all optional)

### Delete Restaurant
**DELETE** `/api/restaurants/:id`

---

## Menu Categories

### List Categories for Restaurant
**GET** `/api/menu-categories/restaurant/:restaurantId`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "restaurantId": 1,
      "name": "Burgers",
      "description": "Classic handmade burgers",
      "displayOrder": 1,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "menuItems": []
    }
  ]
}
```

### Get Single Category
**GET** `/api/menu-categories/:id`

### Create Category
**POST** `/api/menu-categories/:restaurantId`

Request body:
```json
{
  "name": "Appetizers",
  "description": "Small plates to start",
  "displayOrder": 1,
  "isActive": true
}
```

### Update Category
**PUT** `/api/menu-categories/:id`

### Delete Category
**DELETE** `/api/menu-categories/:id`

---

## Menu Items

### List Items by Restaurant
**GET** `/api/menu-items/restaurant/:restaurantId`

### List Items by Category
**GET** `/api/menu-items/category/:categoryId`

### Get Single Menu Item
**GET** `/api/menu-items/:id`

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "categoryId": 1,
    "restaurantId": 1,
    "name": "Classic Cheeseburger",
    "description": "Juicy beef patty, melted cheddar...",
    "price": "12.99",
    "imageUrl": "https://...",
    "isAvailable": true,
    "preparationTime": 10,
    "isVegetarian": false,
    "isGlutenFree": false,
    "isSpicy": false,
    "metadata": {},
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Create Menu Item
**POST** `/api/menu-items/:restaurantId/:categoryId`

Request body:
```json
{
  "name": "New Burger",
  "description": "Delicious burger",
  "price": "14.99",
  "imageUrl": "https://...",
  "isAvailable": true,
  "preparationTime": 10,
  "isVegetarian": false,
  "isGlutenFree": false,
  "isSpicy": true
}
```

### Update Menu Item
**PUT** `/api/menu-items/:id`

### Delete Menu Item
**DELETE** `/api/menu-items/:id`

---

## Orders

### List Orders by Restaurant
**GET** `/api/orders/restaurant/:restaurantId`

Response includes order items and related menu items via `with` clause.

### Get Single Order
**GET** `/api/orders/:id`

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "restaurantId": 1,
    "customerId": 1,
    "orderNumber": "ORD-20240101-ABC",
    "status": "confirmed",
    "orderType": "dine_in",
    "subtotal": "29.97",
    "taxAmount": "2.50",
    "discountAmount": "0",
    "totalAmount": "32.47",
    "paymentStatus": "completed",
    "paymentMethod": "cash",
    "specialInstructions": "No onions",
    "estimatedCompletionTime": "2024-01-01T12:15:00Z",
    "completedAt": null,
    "notes": "Table 3",
    "createdAt": "2024-01-01T12:00:00Z",
    "updatedAt": "2024-01-01T12:05:00Z",
    "orderItems": [
      {
        "id": 1,
        "orderId": 1,
        "menuItemId": 1,
        "quantity": 2,
        "unitPrice": "12.99",
        "specialInstructions": "Extra pickles",
        "metadata": {}
      }
    ]
  }
}
```

### Create Order
**POST** `/api/orders/:restaurantId`

Request body:
```json
{
  "customerId": 1,
  "orderType": "dine_in",
  "subtotal": "25.98",
  "taxAmount": "2.16",
  "totalAmount": "28.14",
  "paymentMethod": "credit_card",
  "specialInstructions": "No onions",
  "notes": "Table 3"
}
```

Response includes generated `orderNumber`.

### Add Item to Order
**POST** `/api/orders/:orderId/items`

Request body:
```json
{
  "menuItemId": 1,
  "quantity": 2,
  "unitPrice": "12.99",
  "specialInstructions": "Extra pickles"
}
```

### Update Order Status
**PUT** `/api/orders/:id`

Request body:
```json
{
  "status": "in_progress",
  "paymentStatus": "completed",
  "notes": "Order is being prepared"
}
```

Available statuses: `pending`, `confirmed`, `in_progress`, `ready`, `completed`, `cancelled`

Payment statuses: `pending`, `completed`, `refunded`, `failed`

### Lookup Order by Order Number
**GET** `/api/orders/lookup/:orderNumber`

---

## Customers

### List Customers by Restaurant
**GET** `/api/customers/restaurant/:restaurantId`

### Get Single Customer
**GET** `/api/customers/:id`

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "restaurantId": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "(555) 111-1111",
    "address": "456 Oak Ave",
    "loyaltyPoints": 250,
    "totalOrders": 5,
    "totalSpent": "89.95",
    "lastOrderDate": "2024-01-01T12:00:00Z",
    "preferences": {
      "allergies": ["peanuts"],
      "dietaryRestrictions": []
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Create Customer
**POST** `/api/customers/:restaurantId`

Request body:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "(555) 222-2222",
  "address": "789 Pine St",
  "preferences": {
    "allergies": ["nuts"],
    "dietaryRestrictions": ["vegetarian"]
  }
}
```

### Update Customer
**PUT** `/api/customers/:id`

### Delete Customer
**DELETE** `/api/customers/:id`

---

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| FETCH_ERROR | 500 | Failed to retrieve data |
| CREATE_ERROR | 500 | Failed to create resource |
| UPDATE_ERROR | 500 | Failed to update resource |
| DELETE_ERROR | 500 | Failed to delete resource |
| NOT_FOUND | 404 | Resource not found |
| INTERNAL_ERROR | 500 | Unexpected server error |

---

## Database Schema

The API uses the following PostgreSQL schema:

- **restaurants** - Restaurant information
- **menu_categories** - Menu sections (Burgers, Sides, etc.)
- **menu_items** - Individual menu items with pricing
- **customers** - Customer profiles and loyalty data
- **orders** - Order records with status tracking
- **order_items** - Line items within orders
- **staff** - Employee information
- **inventory_items** - Stock management
- **dining_tables** - Table seating and availability

---

## Development

### Local Setup

1. Install dependencies:
```bash
cd services/backend
npm install
```

2. Set environment variables:
```bash
cp .env.example .env.local
# Edit DATABASE_URL to match your PostgreSQL setup
```

3. Run migrations:
```bash
npm run db:generate
npm run db:migrate
```

4. Seed sample data:
```bash
node src/db/seed.ts
```

5. Start development server:
```bash
npm run dev
```

The API will be available at `http://localhost:8787`

### Generate Types from Schema

To regenerate types from Drizzle schema:
```bash
npm run db:generate
```

This creates migration files in `/migrations` directory.
