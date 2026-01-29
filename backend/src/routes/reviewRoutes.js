import express from 'express';
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  markHelpful,
} from '../controllers/reviewController.js';

const router = express.Router();

/**
 * POST /api/reviews
 * Create a new review
 */
router.post('/', createReview);

/**
 * GET /api/reviews/product/:productId
 * Get all reviews for a product
 */
router.get('/product/:productId', getProductReviews);

/**
 * PUT /api/reviews/:id
 * Update a review
 */
router.put('/:id', updateReview);

/**
 * DELETE /api/reviews/:id
 * Delete a review
 */
router.delete('/:id', deleteReview);

/**
 * PUT /api/reviews/:id/helpful
 * Mark review as helpful
 */
router.put('/:id/helpful', markHelpful);

export default router;
