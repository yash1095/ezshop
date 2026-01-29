import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

function Orders() {
  const { currentUser, isUserLogin } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isUserLogin || !currentUser) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/orders?userId=${currentUser._id}`
        );
        setOrders(response.data);
      } catch (error) {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isUserLogin, currentUser]);

  if (!isUserLogin) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Please login to view orders</h2>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No orders found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="px-5 md:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-6 hover:shadow-lg transition">
            <div className="grid grid-cols-12 gap-4">
              {/* Order Info */}
              <div className="col-span-12 md:col-span-6">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-bold text-lg">{order._id}</p>
                <p className="text-sm text-gray-600 mt-2">Order Date</p>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Status & Amount */}
              <div className="col-span-12 md:col-span-3">
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <p className="text-sm text-gray-600 mt-4">Amount</p>
                <p className="font-bold text-lg">₹{order.totalAmount.toLocaleString()}</p>
              </div>

              {/* Items Count & Action */}
              <div className="col-span-12 md:col-span-3">
                <p className="text-sm text-gray-600">Items</p>
                <p className="font-bold text-lg">{order.items.length} items</p>
                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Items Preview */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-semibold mb-2">Items:</p>
              <div className="flex gap-2 overflow-x-auto">
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-xs bg-gray-500 px-3 py-1 rounded whitespace-nowrap">
                    {typeof item.productId === 'object' ? item.productId.name : item.productId} (x{item.quantity})
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;