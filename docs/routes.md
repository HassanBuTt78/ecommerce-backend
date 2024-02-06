-   /api

    -   /v1

        -   /auth

            -   `POST /register` # User registration
            -   `POST /login` # User login
            -   `POST /logout` # User logout

        -   /users

            -   `GET /` # Get current user profile
            -   `PUT /` # Update user profile

        -   /products

            -   `GET /` # Get a list of all products
            -   `GET /:productId` # Get details of a specific product
            -   `POST /` # Add a new product (Admin only)
            -   `PUT /:productId` # Update a product (Admin only)
            -   `DELETE /:productId` # Delete a product (Admin only)

        -   /cart

            -   `GET /` # Get the current user's shopping cart
            -   `POST /add/:productId` # Add a product to the shopping cart
            -   `PUT /update/:productId` # Update the quantity of a product in the cart
            -   `DELETE /remove/:productId` # Remove a product from the cart

        -   /orders

            -   `GET /` # Get a list of all orders for the current user
            -   `GET /:orderId` # Get details of a specific order
            -   `POST /` # Place a new order
            -   `PUT /:orderId` # Update the status of an order (Admin only)

        -   /reviews

            -   `GET /:productId` # Get reviews for a specific product
            -   `POST /:productId` # Add a new review for a product

        -   /payments

            -   `POST /` # Process a payment
