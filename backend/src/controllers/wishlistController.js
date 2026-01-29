import User from '../models/User.js';

export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await User.updateOne(
      { _id: userId },
      { $push: { wishlistItems: productId } }
    );
    res.status(200).json({ message: 'Item added to Wishlist!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await User.updateOne(
      { _id: userId },
      { $pull: { wishlistItems: productId } }
    );
    res.status(200).json({ message: 'Item removed from wishlist!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
