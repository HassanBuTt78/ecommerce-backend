# API Documentation

## Authentication

### Register User

-   **Endpoint:** `POST /api/v1/auth/register`
-   **Description:** Register a new user.
-   **Request Body:**
    -   `firstName` (string, max 20 characters, required): First name of the user.
    -   `lastName` (string, max 20 characters, required): Last name of the user.
    -   `email` (string, valid email format, required): Email address of the user.
    -   `password` (string, min 8, max 30 characters, required): User's password.
    -   `address` (object, required):
        -   `street` (string, required): Street address.
        -   `state` (string, required): State.
        -   `City` (string, required): City.
        -   `Country` (string, required): Country.
        -   `zip` (string, required): ZIP code.

**Example:**

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "securepassword",
    "role": "user",
    "address": {
        "street": "123 Main St",
        "state": "CA",
        "City": "Cityville",
        "Country": "USA",
        "zip": "12345"
    }
}
```

### User Login

-   **Endpoint:** `POST /api/v1/auth/login`
-   **Description:** Authenticate a user.
-   **Request Body:**
    -   `email` (string, valid email format, required): Email address of the user.
    -   `password` (string, min 8, max 30 characters, required): User's password.

**Example:**

```json
{
    "email": "john.doe@example.com",
    "password": "securepassword"
}
```

## User Profile

### Get Current User Profile

-   **Endpoint:** `GET /api/v1/users`
-   **Description:** Get the current user's profile.

### Update User Profile

-   **Endpoint:** `PUT /api/v1/users`
-   **Description:** Update the current user's profile.
-   **Request Body:**
    -   `firstName` (string, max 20 characters)
    -   `lastName` (string, max 20 characters)
    -   `email` (string, valid email format)
    -   `address` (object)
        -   `street` (string, required)
        -   `state` (string, required)
        -   `City` (string, required)
        -   `Country` (string, required)
        -   `zip` (string, required)

**Example:**

```json
{
    "firstName": "UpdatedName",
    "address": {
        "street": "Updated Street",
        "state": "Updated State",
        "City": "Updated City",
        "Country": "Updated Country",
        "zip": "Updated ZIP"
    }
}
```

## Products

### Get All Products

-   **Endpoint:** `GET /api/v1/products`
-   **Description:** Get a list of all products.

### Get Specific Product

-   **Endpoint:** `GET /api/v1/products/:productId`
-   **Description:** Get details of a specific product.

### Add New Product (Admin Only)

-   **Endpoint:** `POST /api/v1/products`
-   **Description:** Add a new product (Admin only).
-   **Request Body:**
    -   `name` (string, required)
    -   `description` (string, required)
    -   `image` (string, URI format)
    -   `price` (number, min 1, required)
    -   `stock` (number, required)
    -   `category` (string, valid categories, required)

**Example:**

```json
{
    "name": "New Product",
    "description": "Product Description",
    "image": "https://example.com/product-image.jpg",
    "price": 19.99,
    "stock": 100,
    "category": "electronics"
}
```

### Update Product (Admin Only)

-   **Endpoint:** `PUT /api/v1/products/:productId`
-   **Description:** Update a product (Admin only).
-   **Request Body:**
    -   `name` (string)
    -   `description` (string)
    -   `image` (string, URI format)
    -   `price` (number, min 1)
    -   `stock` (number)
    -   `category` (string, valid categories)

**Example:**

```json
{
    "name": "Updated Product Name",
    "price": 24.99
}
```

### Delete Product (Admin Only)

-   **Endpoint:** `DELETE /api/v1/products/:productId`
-   **Description:** Delete a product (Admin only).

## Shopping Cart

### Get Current User's Shopping Cart

-   **Endpoint:** `GET /api/v1/cart`
-   **Description:** Get the current user's shopping cart.

### Add Product to Shopping Cart

-   **Endpoint:** `POST /api/v1/cart/add/:productId`
-   **Description:** Add a product to the shopping cart.
-   **Request Body:**
    -   `quantity`(number, default: 1)

### Update Product Quantity in Cart

-   **Endpoint:** `PUT /api/v1/cart/update/:productId`
-   **Description:** Update the quantity of a product in the cart.
-   **Request Body:**
    -   `quantity`(number, required)

### Remove Product from Cart

-   **Endpoint:** `DELETE /api/v1/cart/remove/:productId`
-   **Description:** Remove a product from the cart.

## Orders

### Get All Orders for Current User

-   **Endpoint:** `GET /api/v1/orders`
-   **Description:** Get a list of all orders for the current user.

### Get Specific Order

-   **Endpoint:** `GET /api/v1/orders/:orderId`
-   **Description:** Get details of a specific order.

### Place a New Order

-   **Endpoint:** POST /api/v1/orders
-   **Description:** Place a new order.
-   **Request Body:**
    -   `items` (array of objects): Items will be pulled from cart if not provided in body
        -   `product_id` (string, required): The unique identifier of the product.
        -   `quantity` (number, min 1, required): The quantity of the product to be ordered.
    -   `address` (object, required)
        -   `street` (string, required): Street address for shipping.
        -   `city` (string, required): City for shipping.
        -   `state` (string, required): State for shipping.
        -   `country` (string, required): Country for shipping.
        -   `zip` (string, required): ZIP code for shipping.

**Example:**

```json
{
    "items": [
        {
            "_id": "product_id_1",
            "quantity": 2
        },
        {
            "_id": "product_id_2",
            "quantity": 1
        }
    ],
    "address": {
        "street": "123 New St",
        "city": "OrderCity",
        "state": "OrderState",
        "country": "OrderCountry",
        "zip": "54321"
    }
}
```

### Update Order Status (Admin Only)

-   **Endpoint:** `PUT /api/v1/orders/:orderId`
-   **Description:** Update the status of an order (Admin only).
-   **Request Body:**
    -   `status` (string, valid order statuses)
    -   `paymentStatus` (stri g, valid payment statuses)
    -   `paymentMethod` (string valid payment methods)
-   **Valid Statuses:**

    -   **Order Statuses:** -`pending` -`processing` -`dispatched` -`delivered`
    -   **Payment Statuses:** -`pending` -`confirmed` -`authorized` -`failed`
    -   **Payment Methods:** -`cash-on-delivery`

        **Example:**

```json
{
    "status": "processing",
    "paymentStatus": "confirmed",
    "paymentMethod": "cash-on-delivery"
}
```

## Reviews

### Get Reviews for a Specific Product

-   **Endpoint:** `GET /api/v1/reviews/:productId`
-   **Description:** Get reviews for a specific product.

### Add New Review for a Product

-   **Endpoint:** `POST /api/v1/reviews/:productId`
-   **Description:** Add a new review for a product.
-   **Request Body:**
    -   `rating` (number, min 1, max 5, required)
    -   `comment` (string, max 500)

**Example:**

```json
{
    "rating": 4,
    "comment": "This product is great!"
}
```

---
