# EZShop - E-Commerce Platform

A full-stack e-commerce platform with React frontend and Node.js/Express backend, featuring product browsing, shopping cart, orders, reviews, and admin dashboard.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas URI
- npm or yarn package manager

### 1. Backend Setup (5 minutes)

```bash
cd backend
npm install
```

**Configure Environment:**
```bash
# Create .env file based on .env.example
cp .env.example .env

# Edit .env and add:
MONGODB_URI=mongodb://localhost:27017/ezshop
PORT=3000
```

**Start Backend:**
```bash
npm run dev    # Development mode with auto-reload
# Server starts at http://localhost:3000
```

### 2. Frontend Setup (5 minutes)

```bash
cd frontend
npm install
```

**Configure Environment:**
```bash
# Create .env.local file
cp .env.example .env.local

# VITE_API_URL should point to your backend
# Default: http://localhost:3000
```

**Start Frontend:**
```bash
npm run dev    # Development mode
# App starts at http://localhost:5173
```

### 3. Access the Application

- **User Site**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin
- **API Documentation**: Check PROJECT_DOCUMENTATION.md

---

## Project Structure

```
EZShop/
├── backend/                    # Node.js/Express server
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Authentication, validation
│   │   ├── utils/             # Utilities
│   │   ├── config/            # Configuration
│   │   └── server.js          # Main entry point
│   └── package.json
│
└── frontend/                   # React/Vite app
    ├── src/
    │   ├── components/        # React components
    │   ├── contexts/          # State management
    │   ├── utils/             # Helper functions
    │   ├── assets/            # Images and icons
    │   └── main.jsx          # Entry point
    └── package.json
```

---

## Key Features

✅ **Product Management**
- Browse products with search and filters
- View detailed product information
- Responsive product grid

✅ **Shopping Cart**
- Add/remove items
- Update quantities
- Persistent cart storage

✅ **Wishlist**
- Save favorite products
- Move items to cart

✅ **Orders & Checkout**
- Easy 2-step checkout process
- Multiple payment methods (mock)
- Order history and tracking
- Order status timeline

✅ **User Authentication**
- Secure sign up and login
- User profile management
- Session persistence

✅ **Product Reviews**
- Rate and review products
- View all product reviews
- Helpful/unhelpful voting

✅ **Contact & Support**
- Contact form with email notifications
- Automatic responses to users

✅ **Admin Dashboard**
- Sales analytics and statistics
- Recent orders overview
- Product management
- Order status updates

---

## API Endpoints Summary

### Products
```
GET    /products                 # List products
GET    /products/:id            # Get product details
```

### Users & Auth
```
POST   /users/auth/register      # Register new user
POST   /users/auth/login         # Login user
GET    /users/:id               # Get user profile
PUT    /users/:id               # Update profile
```

### Shopping
```
GET    /cart/:userId            # Get cart
POST   /cart                    # Add to cart
DELETE /cart/:id                # Remove from cart

GET    /wishlist/:userId        # Get wishlist
POST   /wishlist                # Add to wishlist
DELETE /wishlist/:id            # Remove from wishlist
```

### Orders
```
POST   /orders                  # Create order
GET    /orders                  # Get user's orders
GET    /orders/:id              # Get order details
PUT    /orders/:id/status       # Update order status
```

### Reviews
```
POST   /reviews                 # Create review
GET    /reviews/product/:id     # Get product reviews
```

### Contact
```
POST   /contact                 # Submit contact form
```

---

## User Roles

### Regular User
- Browse products
- Manage cart and wishlist
- Place orders
- Track order status
- Submit reviews and ratings
- Update profile
- Submit contact inquiries

### Admin
- Full access to dashboard
- View sales analytics
- Manage products (add, edit, delete)
- Manage orders (update status, track)
- View user information

---

## Default Admin Access

To access admin features, login with an admin account or modify the user role in the database:

```bash
# Admin URL: http://localhost:5173/admin
```

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Email**: Nodemailer

### Frontend
- **Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: TailwindCSS 4.1.10
- **Routing**: React Router v7
- **HTTP Client**: axios
- **State**: Context API
- **Notifications**: sonner
- **Animations**: framer-motion

---

## Development Commands

### Backend
```bash
npm run dev        # Start with nodemon (auto-reload)
npm start         # Start production build
npm run build     # Build for production
```

### Frontend
```bash
npm run dev       # Start dev server with HMR
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ezshop
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRY=7d
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000
```

---

## Common Tasks

### Add a New Product
1. Go to `/admin` dashboard
2. Click "Add Products"
3. Fill form and submit
4. Product appears in product list

### Track an Order
1. Go to Orders page (`/orders`)
2. Click "View Details" on any order
3. See status timeline and tracking info

### Submit a Review
1. View product details
2. Scroll to reviews section
3. Click "Write a Review"
4. Rate and submit

### Contact Support
1. Go to Contact page (`/contact`)
2. Fill out contact form
3. Submit - confirmation email sent

---

## Troubleshooting

### Port Already in Use
```bash
# Change port in .env (backend)
PORT=3001

# Or kill existing process
# On Windows: netstat -ano | findstr :3000
# On Mac/Linux: lsof -i :3000
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- If using MongoDB Atlas, allow your IP address

### CORS Errors
- Verify backend and frontend URLs match
- Check CORS_ORIGIN in backend config
- Clear browser cache and restart both servers

### Email Not Working
- Enable "Less Secure App Access" (Gmail)
- Use app-specific password, not account password
- Check EMAIL_USER and EMAIL_PASSWORD in .env

---

## Performance Tips

- **Frontend**: Uses Vite for fast development, TailwindCSS for optimized styling
- **Backend**: Implements pagination for product listings
- **Database**: Indexes on frequently queried fields
- **Caching**: Utilize browser cache for static assets

---

## Security Notes

⚠️ **Development Only**
- Uses crypto-based password hashing (replace with bcrypt for production)
- JWT secrets hardcoded (use environment variables)
- CORS allows all origins (restrict in production)

✅ **Recommended for Production**
1. Install bcrypt: `npm install bcrypt`
2. Use strong, random JWT_SECRET
3. Configure CORS restrictions
4. Enable HTTPS
5. Use environment-specific .env files
6. Implement rate limiting
7. Add request validation middleware
8. Setup proper error logging

---

## File Size

- **Frontend Build**: 628 KB (515 KB gzipped)
- **Backend Runtime**: ~50 MB with node_modules

---

## License

EZShop - All rights reserved

---

## Support

For issues or questions:
1. Check PROJECT_DOCUMENTATION.md for detailed API docs
2. Review error messages in browser console and server logs
3. Submit contact form through the app
4. Check common troubleshooting section above

---

**Version**: 1.0.0  
**Status**: Ready for Development & Testing  
**Last Updated**: 2024
