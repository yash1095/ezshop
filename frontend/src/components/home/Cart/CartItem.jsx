import React, { useEffect, useState } from "react";
import { useUser } from "../../../contexts/userContext";
import { toast } from "sonner";

function CartItem({ product, item, currentUser }) {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [totalPrice, setTotalPrice] = useState(product.price);

  const {removeFromCart, updateQty} = useUser()

  const remove = () => {
    if(currentUser && product){
      removeFromCart(currentUser?._id, product?._id)
    } else {
      toast.error('error')
    }
  }
  
  // Debounced quantity update - only call after 800ms of no changes
  useEffect(() => {
    if (!product || !currentUser) return;
    const newTotalPrice = product?.price * quantity;
    setTotalPrice(newTotalPrice);
    
    // Set timeout to debounce API call
    const timer = setTimeout(() => {
      updateQty(currentUser._id, product._id, quantity);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [quantity, product, currentUser, updateQty]);

  const  addQuantity = () => {
    setQuantity(prev => prev + 1)
  }
  const  removeQuantity = () => {
    setQuantity((qty) => (qty > 1 ? qty - 1 : qty))
  }

  return (
    <div className="grid grid-cols-12 border-b py-3">
      <div className="col-span-2">
        <div className="aspect-square bg-white rounded-lg p-2">
          <img
            src={product.image}
            className="h-full w-full object-contain"
            alt=""
          />
        </div>
        <div className="mt-4 text-center">
          <div className="flex gap-3">
            <button
              onClick={removeQuantity}
              className="aspect-square border text-center pb-1 font-semibold h-8 w-8 rounded-full"
            >
              {" "}
              -{" "}
            </button>
            <input
              type="text"
              className="border rounded-md w-full text-center px-1"
              value={quantity}
              readOnly
            />
            <button
              onClick={addQuantity}
              className="aspect-square border text-center pb-1 font-semibold h-8 w-8 rounded-full"
            >
              {" "}
              +{" "}
            </button>
          </div>
          <span className="text-sm">quantity</span>
        </div>
      </div>
      <div className="col-span-10">
        <div className="ps-3 h-full relative">
          <div className="flex justify-between">
            <span className="font-semibold text-sm text-black/70 dark:text-white/70">
              {product.brand}
            </span>
          </div>
          <div className="text-xl font-semibold">{product.name}</div>
          <div className="text-green-500 font-bold mt-1">
            ₹{product?.price.toLocaleString()}
          </div>
          <div className="absolute bottom-5 right-0 font-bold flex gap-3 items-center">
            <div>
              Total:{" "}
              <span className="text-green-500">
                ₹{totalPrice?.toLocaleString()}
              </span>
            </div>
            <div>
              <button onClick={remove} className="border p-1 text-sm rounded-md bg-red-500 cursor-pointer">
                remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
