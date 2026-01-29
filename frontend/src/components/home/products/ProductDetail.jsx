import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../../contexts/ProductContext';
import { useUser } from '../../../contexts/userContext';
import { toast } from 'sonner';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProduct();
  const { addToCart, isUserLogin, currentUser, addToWishlist, removeFromWishlist } = useUser();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find product from context or fetch from API
    const found = products.find(p => p._id === id);
    if (found) {
      setProduct(found);
      setLoading(false);
    } else {
      // Fetch from API if not found in context
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          toast.error('Failed to load product');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, products]);

  useEffect(() => {
    if (currentUser?.cartItems && product) {
      const cartItem = currentUser.cartItems.find(item => item.productId === product._id);
      setIsInCart(!!cartItem);
    }
  }, [currentUser, product]);

  useEffect(() => {
    if (currentUser?.wishlistItems && product) {
      const wishlistItem = currentUser.wishlistItems.find(item => item === product._id);
      setIsWishlisted(!!wishlistItem);
    }
  }, [currentUser, product]);

  const handleAddToCart = () => {
    if (!isUserLogin) {
      toast.error('Please login first!');
      navigate('/login');
      return;
    }

    addToCart(currentUser._id, product._id, quantity, product.price * quantity);
    toast.success('Added to cart!');
  };

  const handleWishlist = () => {
    if (!isUserLogin) {
      toast.error('Please login first!');
      navigate('/login');
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(currentUser._id, product._id);
      setIsWishlisted(false);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(currentUser._id, product._id);
      setIsWishlisted(true);
      toast.success('Added to wishlist');
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="px-5 md:px-20 py-10 h-[calc(100vh-4.5rem)] overflow-y-scroll">
      <button 
        onClick={() => navigate(-1)}
        className="mb-5 px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        ← Back
      </button>

      <div className="grid grid-cols-12 gap-8">
        {/* Product Image */}
        <div className="col-span-12 md:col-span-5">
          <div className="bg-white rounded-lg p-5 border">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-span-12 md:col-span-7">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <p className="text-gray-600 text-lg mb-4">{product.brand}</p>

          <div className="mb-4">
            <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-4">
            <span className="badge px-3 py-1 bg-blue-100 text-blue-800 rounded">{product.category}</span>
          </div>

          {/* Quantity & Actions */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2"
              >
                −
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className="flex-1 px-6 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isInCart ? '✓ In Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={handleWishlist}
              className={`px-6 py-2 rounded border-2 font-semibold ${
                isWishlisted 
                  ? 'bg-red-500 text-white border-red-500' 
                  : 'border-gray-300 hover:border-red-500'
              }`}
            >
              {isWishlisted ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
            </button>
          </div>

          {/* Product Info */}
          <div className="border-t pt-6">
            <h3 className="font-bold text-lg mb-3">Product Information</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Price:</strong> ₹{product.price.toLocaleString()}</li>
              <li><strong>Availability:</strong> In Stock</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
