# Cozy Cup Backend API

Express + Node.js + MongoDB API for the Cozy Cup coffee shop application.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Auth:** JSON Web Tokens (JWT) + bcryptjs
- **Middleware:** cors, dotenv

## Setup & Running

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
   Ensure your `MONGODB_URI` points to your local or cloud MongoDB database.

3. **Seed Database:**
   Populate the database with initial coffee products:
   ```bash
   npm run seed
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Starts the server with nodemon auto-reloading on http://localhost:5001.

## API Endpoints

### Products
- `GET /api/products` - List products (supports query filters `roastLevel`, `category`, and `search`)
- `GET /api/products/:id` - Retrieve product details
- `POST /api/products` - Create a product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Authenticate and get JWT token
- `GET /api/auth/me` - Get profile details (Authenticated user)

### Orders
- `POST /api/orders` - Place order (Authenticated user)
- `GET /api/orders/myorders` - List current user's orders (Authenticated user)
- `GET /api/orders/:id` - Retrieve order details (Owner or Admin)
- `GET /api/orders` - List all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order, payment, or delivery status (Admin only)

### Inquiries (Contact)
- `POST /api/contact` - Submit contact/visit form
- `GET /api/contact` - Retrieve all messages (Admin only)
