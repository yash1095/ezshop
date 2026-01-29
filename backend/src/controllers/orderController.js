import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!userId || !items || items.length === 0 || !shippingAddress) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure each item has price and totalPrice according to current product price
    let computedTotal = 0;
    const normalizedItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      const qty = parseInt(item.quantity) || 1;
      const price = product.price || 0;
      const itemTotal = price * qty;
      computedTotal += itemTotal;
      normalizedItems.push({
        productId: product._id,
        quantity: qty,
        price,
        totalPrice: itemTotal
      });
    }

    // Use server-calculated total amount to avoid tampering
    const serverTotalAmount = computedTotal;

    const order = new Order({
      userId,
      items: normalizedItems,
      totalAmount: serverTotalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending'
    });

    await order.save();

    // Clear user's cart after order
    await User.findByIdAndUpdate(userId, { cartItems: [] }, { new: true });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    let query = {};
    if (userId) {
      query.userId = userId;
    }

    const orders = await Order.find(query)
      .populate('userId', 'username email')
      .populate('items.productId', 'name price image')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('userId', 'username email address')
      .populate('items.productId', 'name price image brand');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;

    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status, trackingNumber, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    if (!['pending', 'completed', 'failed'].includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { paymentStatus, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Payment status updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({ message: `Cannot cancel order with status: ${order.status}` });
    }

    order.status = 'cancelled';
    order.updatedAt = new Date();
    await order.save();

    res.status(200).json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
