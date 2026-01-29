import express from 'express';
import * as cartController from '../controllers/cartController.js';

const router = express.Router();

/**
 * POST /cart/add
 * Add item to cart
 * Body: { userId, productId, quantity }
 */
router.post('/add', cartController.addToCart);

/**
 * POST /cart/remove
 * Remove item from cart
 * Body: { userId, productId }
 */
router.post('/remove', cartController.removeFromCart);

/**
 * POST /cart/updateQty
 * Update cart item quantity
 * Body: { userId, productId, quantity }
 */
router.post('/updateQty', cartController.updateQuantity);

/**
 * GET /cart/:userId
 * Get user's cart
 */
router.get('/:userId', cartController.getCart);

/**
 * DELETE /cart/:userId
 * Clear entire cart
 */
router.delete('/:userId', cartController.clearCart);

export default router;
