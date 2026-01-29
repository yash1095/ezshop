# EZShop Backend

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection configuration
│   ├── controllers/
│   │   ├── productController.js # Product business logic
│   │   ├── userController.js    # User business logic
│   │   ├── cartController.js    # Cart operations
│   │   ├── wishlistController.js # Wishlist operations
│   │   └── emailController.js   # Email operations
│   ├── models/
│   │   ├── Product.js           # Product schema
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── productRoutes.js     # Product endpoints
│   │   ├── userRoutes.js        # User endpoints
│   │   ├── cartRoutes.js        # Cart endpoints
│   │   ├── wishlistRoutes.js    # Wishlist endpoints
│   │   └── emailRoutes.js       # Email endpoints
│   └── server.js                # Main application entry point
├── .env.example                 # Environment variables template
└── package.json                 # Project dependencies
```

## Features

- RESTful API with Express.js
- MongoDB integration with Mongoose
- Product management (CRUD)
- User authentication and management
- Shopping cart operations
- Wishlist functionality
- OTP email verification
- CORS enabled for frontend communication

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update environment variables in `.env` with your configurations

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3000` (or the port specified in `.env`)

## API Endpoints

### Products
- `POST /products` - Create a new product
- `GET /products` - Get all products
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Users
- `POST /users` - Create a new user
- `GET /users` - Get all users
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user
- `POST /users/currentUser` - Get current user details

### Cart
- `POST /cart/add` - Add item to cart
- `POST /cart/remove` - Remove item from cart
- `POST /cart/updateQty` - Update item quantity

### Wishlist
- `POST /wishlist/add` - Add item to wishlist
- `POST /wishlist/remove` - Remove item from wishlist

### Email
- `POST /send-email` - Send OTP email

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Enable CORS
- **nodemailer**: Email sending
- **dotenv**: Environment variable management
