import User from '../models/User.js';
import Product from '../models/Product.js';

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validation
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, productId, quantity',
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0',
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

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Check if product already in cart
    const existingCartItem = user.cartItems?.find(
      item => item.productId.toString() === productId
    );

    if (existingCartItem) {
      // Update quantity and total price
      existingCartItem.quantity += parseInt(quantity);
      existingCartItem.totalPrice = existingCartItem.quantity * product.price;
    } else {
      // Add new item to cart
      if (!user.cartItems) user.cartItems = [];
      user.cartItems.push({
        productId,
        quantity: parseInt(quantity),
        price: product.price,
        totalPrice,
      });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Product added to cart successfully!',
      data: {
        cartItems: user.cartItems,
        totalItems: user.cartItems.length,
      },
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add product to cart',
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validation
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, productId',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Remove item from cart
    user.cartItems = user.cartItems.filter(
      item => item.productId.toString() !== productId
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Product removed from cart successfully!',
      data: {
        cartItems: user.cartItems,
        totalItems: user.cartItems.length,
      },
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to remove product from cart',
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validation
    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, productId, quantity',
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Find and update cart item
    const cartItem = user.cartItems?.find(
      item => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in cart',
      });
    }

    // Get product to calculate new total price
    const product = await Product.findById(productId);
    cartItem.quantity = parseInt(quantity);
    cartItem.totalPrice = cartItem.quantity * (product?.price || cartItem.price);

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Quantity updated successfully!',
      data: {
        cartItems: user.cartItems,
        updatedItem: cartItem,
      },
    });
  } catch (error) {
    console.error('Update quantity error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update quantity',
    });
  }
};

/**
 * GET /cart/:userId
 * Get user's cart
 */
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const user = await User.findById(userId).populate('cartItems.productId');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const cartTotal = user.cartItems?.reduce(
      (sum, item) => sum + (item.totalPrice || 0),
      0
    ) || 0;

    return res.status(200).json({
      success: true,
      data: {
        cartItems: user.cartItems || [],
        totalItems: user.cartItems?.length || 0,
        cartTotal,
      },
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
    });
  }
};

/**
 * DELETE /cart/:userId
 * Clear entire cart
 */
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.cartItems = [];
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Cart cleared successfully!',
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
    });
  }
};
