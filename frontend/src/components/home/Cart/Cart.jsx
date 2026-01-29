import React from "react";
import { useUser } from "../../../contexts/userContext";
import { useProduct } from "../../../contexts/ProductContext";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

function Cart() {

  const { isUserLogin, currentUser } = useUser();
  const { products } = useProduct();
  const navigate = useNavigate();

  const cartTotal = currentUser?.cartItems?.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  ) || 0;

  const handleCheckout = () => {
    if (!isUserLogin) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="h-full w-full">
      {isUserLogin ? (
        currentUser?.cartItems && currentUser?.cartItems.length > 0 ? (
          <div className="grid grid-cols-12 h-full bg-gradient-to-br from-blue-950/10 via-blue-700/10 to-sky-700/10 p-5 rounded-lg border">
            {/* Cart Items */}
            <div className="col-span-12 md:col-span-9 border border-e-0 h-full p-3 overflow-y-scroll">
              {currentUser?.cartItems.map((item) => {
                const product = products.find(
                  (product) => product?._id === item?.productId
                );
                return (
                  product && (
                    <div key={item?.productId}>
                      <CartItem product={product} item={item} currentUser={currentUser} />
                    </div>
                  )
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="col-span-12 md:col-span-3 border p-6 rounded-lg">
              <div className="sticky top-0">
                <h2 className="font-bold text-2xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹0</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:saturate-200 transition"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gradient-to-br from-blue-500 to-cyan-500 transition"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="mt-4 text-sm text-center">
                  <p>Items in cart: {currentUser?.cartItems.length}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <p className="font-bold text-3xl text-center mb-6">Your Cart is Empty</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:saturate-200 transition"
            >
              Continue Shopping
            </button>
          </div>
        )
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          <p className="font-bold text-3xl text-center mb-6">Please Login to View Cart</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:saturate-200 transition"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
