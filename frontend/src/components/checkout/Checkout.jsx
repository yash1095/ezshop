import React, { useState } from 'react';
import { useUser } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

function Checkout() {
  const { currentUser, isUserLogin } = useUser();
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState(currentUser?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);

  const total = currentUser?.cartItems?.reduce((sum, item) => sum + (item.totalPrice || 0), 0) || 0;

  if (!isUserLogin) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Please login to checkout</h2>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!currentUser?.cartItems || currentUser.cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!shippingAddress || shippingAddress.length < 10) {
      toast.error('Please enter a valid shipping address');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        userId: currentUser._id,
        items: currentUser.cartItems,
        totalAmount: total,
        shippingAddress,
        paymentMethod
      };

      const response = await axios.post('http://localhost:3000/orders', orderData);
      
      toast.success('Order placed successfully!');
      navigate(`/order/${response.data.order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 md:px-20 py-10 h-[calc(100vh-4.5rem)] overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-12 gap-8">
        {/* Shipping & Payment Info */}
        <div className="col-span-12 md:col-span-7">
          <div className="border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter complete shipping address"
              className="w-full border rounded p-3 mb-4"
              rows="4"
            />
            <p className="text-sm text-gray-600">Minimum 10 characters required</p>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {['credit_card', 'debit_card', 'upi', 'net_banking'].map((method) => (
                <label key={method} className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span className="capitalize">{method.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-span-12 md:col-span-5">
          <div className="border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="mb-6 max-h-96 overflow-y-auto">
              {currentUser.cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between mb-3 pb-3 border-b">
                  <span>
                    {typeof item.productId === 'object' ? item.productId.name : item.productId}
                  </span>
                  <span>₹{(item.totalPrice || 0).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full px-6 py-3 bg-green-500 text-white rounded font-bold hover:bg-green-600 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="w-full mt-2 px-6 py-3 border rounded font-bold hover:bg-gray-100"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
