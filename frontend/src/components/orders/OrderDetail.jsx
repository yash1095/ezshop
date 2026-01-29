import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        toast.error('Failed to load order');
        navigate('/orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) {
    return <div className="text-center py-20">Loading order details...</div>;
  }

  if (!order) {
    return <div className="text-center py-20">Order not found</div>;
  }

  const getStatusSteps = (currentStatus) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(currentStatus);
    
    return steps.map((step, idx) => ({
      step,
      completed: idx <= currentIndex,
      active: idx === currentIndex
    }));
  };

  const statusSteps = getStatusSteps(order.status);

  return (
    <div className="px-5 md:px-20 py-10">
      <button 
        onClick={() => navigate('/orders')}
        className="mb-5 px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        ← Back to Orders
      </button>

      <div className="grid grid-cols-12 gap-8">
        {/* Order Status */}
        <div className="col-span-12">
          <div className="border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Order Status</h2>
            <div className="flex items-center justify-between relative">
              {statusSteps.map((step, idx) => (
                <div key={step.step} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step.completed ? 'bg-green-500 text-white' : step.active ? 'bg-blue-500 text-white' : 'bg-gray-500'
                  }`}>
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <span className="mt-2 text-sm capitalize">{step.step}</span>
                  {idx < statusSteps.length - 1 && (
                    <div className={`w-16 h-1 ${step.completed ? 'bg-green-500' : 'bg-gray-500'} absolute ml-20 mt-[1.1em]`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="col-span-12 md:col-span-8">
          <div className="border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Order Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Order ID</p>
                <p className="font-bold">{order._id}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Order Date</p>
                <p className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="font-bold capitalize">{order.status}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Payment Status</p>
                <p className="font-bold capitalize">{order.paymentStatus}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <p className="text-gray-700">{order.shippingAddress}</p>
          </div>

          {/* Order Items */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-semibold">
                      {typeof item.productId === 'object' ? item.productId.name : item.productId}
                    </p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{item.totalPrice.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">₹{item.price}/unit</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="col-span-12 md:col-span-4">
          <div className="border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹0</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-blue-500 p-4 rounded mb-4">
              <p className="text-sm font-semibold mb-2">Payment Method</p>
              <p className="capitalize">{order.paymentMethod.replace('_', ' ')}</p>
            </div>

            {order.trackingNumber && (
              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm font-semibold mb-2">Tracking Number</p>
                <p className="font-mono text-sm">{order.trackingNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
