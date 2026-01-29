import Review from '../models/Review.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

/**
 * Create a review for a product
 * POST /api/reviews
 */
const createReview = async (req, res) => {
  try {
    const { productId, userId, rating, title, comment } = req.body;

    // Validation
    if (!productId || !userId || !rating || !title || !comment) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    if (title.length < 5 || title.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Title must be between 5 and 100 characters',
      });
    }

    if (comment.length < 10 || comment.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Comment must be between 10 and 1000 characters',
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product',
      });
    }

    // Create review
    const review = await Review.create({
      productId,
      userId,
      rating,
      title,
      comment,
      verified: true, // In real app, check if user purchased product
    });

    // Populate user info
    const populatedReview = await review.populate('userId', 'username email');

    return res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: populatedReview,
    });
  } catch (error) {
    console.error('Create review error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create review',
    });
  }
};

/**
 * Get all reviews for a product
 * GET /api/reviews/product/:productId
 */
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const skip = (page - 1) * limit;

    const reviews = await Review.find({ productId })
      .populate('userId', 'username email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments({ productId });

    // Calculate average rating
    const ratingData = await Review.aggregate([
      { $match: { productId: new (require('mongoose')).Types.ObjectId(productId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);

    const stats = ratingData[0] || { averageRating: 0, totalReviews: 0 };

    return res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
      stats: {
        averageRating: Math.round(stats.averageRating * 10) / 10,
        totalReviews: stats.totalReviews,
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
    });
  }
};

/**
 * Update a review
 * PUT /api/reviews/:id
 */
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, comment } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Update fields
    if (rating) review.rating = rating;
    if (title) review.title = title;
    if (comment) review.comment = comment;
    review.updatedAt = new Date();

    await review.save();

    return res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review,
    });
  } catch (error) {
    console.error('Update review error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update review',
    });
  }
};

/**
 * Delete a review
 * DELETE /api/reviews/:id
 */
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Delete review error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete review',
    });
  }
};

/**
 * Mark review as helpful
 * PUT /api/reviews/:id/helpful
 */
const markHelpful = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndUpdate(
      id,
      { $inc: { helpful: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error('Mark helpful error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to mark review as helpful',
    });
  }
};

export {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  markHelpful,
};
