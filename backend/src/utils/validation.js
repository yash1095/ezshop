export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateUsername = (username) => {
  return username && username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
};

export const validateProductData = (data) => {
  const { image, brand, name, description, price, category } = data;
  
  if (!image || !brand || !name || !description || !price || !category) {
    return { valid: false, message: 'Missing required fields' };
  }

  if (typeof price !== 'number' || price < 0) {
    return { valid: false, message: 'Invalid price' };
  }

  if (name.length < 3) {
    return { valid: false, message: 'Product name must be at least 3 characters' };
  }

  return { valid: true };
};

export const validateOrderData = (data) => {
  const { userId, items, totalAmount, shippingAddress, paymentMethod } = data;

  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    return { valid: false, message: 'Invalid items or user' };
  }

  if (!totalAmount || totalAmount <= 0) {
    return { valid: false, message: 'Invalid total amount' };
  }

  if (!shippingAddress || shippingAddress.length < 10) {
    return { valid: false, message: 'Invalid shipping address' };
  }

  if (!['credit_card', 'debit_card', 'upi', 'net_banking'].includes(paymentMethod)) {
    return { valid: false, message: 'Invalid payment method' };
  }

  return { valid: true };
};
