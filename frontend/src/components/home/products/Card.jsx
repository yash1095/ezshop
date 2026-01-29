import React from 'react';
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { useUser } from '../../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

function Card({product}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  const navigate = useNavigate()

  const {addToCart, isUserLogin, currentUser, addToWishlist, removeFromWishlist} = useUser()

  const addCartItem = (e) => {
    if(currentUser && isUserLogin){
      e.preventDefault();
      addToCart(currentUser?._id, product?._id, 1, product?.price);
    } else {
      toast.error('Please login first!')
      navigate('/login')
    }
  }

  const goToCart = (e) => {
    e.preventDefault()
    navigate('/cart')
  }

  useEffect(() => {
    if(currentUser?.cartItems && currentUser?.cartItems.length > 0){
      const cartItem = currentUser?.cartItems.find((item) => item.productId === product?._id)
      if(cartItem) {
        setIsInCart(true)
      }
    } else {
      setIsInCart(false)
    }
  },[currentUser?.cartItems, product?._id, isUserLogin])

  const addWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(isUserLogin){
      addToWishlist(currentUser?._id, product?._id)
      setWishlist(prev => !prev)
    } else {
      toast.error('Please Login first!')
      navigate('/login')
    }
  }

  const removeWishlist = (e) => {
      e.stopPropagation();
      e.preventDefault();
      removeFromWishlist(currentUser?._id, product?._id)
      setWishlist(prev => !prev)
  }

  useEffect(() => {
    if(currentUser?.wishlistItems && currentUser?.wishlistItems.length > 0){
      const wishlistItem = currentUser?.wishlistItems.find((item) => item === product?._id)
      if(wishlistItem) {
        setWishlist(true)
      }
    } else {
      setWishlist(false)
    }
  },[currentUser?.wishlistItems, product?._id, isUserLogin])

  return (
    <>
    <div 
      onClick={() => setIsOpen(prev => ! prev)} 
      className='p-3 rounded-lg font-semibold cursor-pointer h-full hover:shadow-2xl shadow-blue-500/50 duration-500'>
      <div className='overflow-hidden rounded-md bg-white p-2 aspect-square relative'>
        <img 
          src={product.image}
          alt="" 
          className='h-full w-full object-contain hover:scale-[1.04] duration-200 ease-in-out m-auto'
        />
        <button onClick={wishlist ? removeWishlist : addWishlist} className='absolute top-4 right-3 cursor-pointer outline-none'>
          {!wishlist ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
          ): (
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path fill="#ff0000" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
          )}
        </button>
      </div>
      <div>
        <div className="font-bold capitalize text-gray-500 mt-2">{product.brand}</div>
        <p className='capitalize'>{product.name}</p>
        <p className='text-xs dark:text-gray-400 capitalize'>{product.description.length > 35 ? product.description.slice(0, 35) + '...' : product.description}</p>
        <p className='text-green-500'>₹ {product.price.toLocaleString()}</p>
      </div>
      {/* <div className='mt-2 flex text-sm'>
        <button className='p-2 w-full border dark:border-white text-nowrap rounded-s-md border-e-0 bg-white text-black hover:bg-gray-300 cursor-pointer'
        >add to cart</button>
        <button className='p-2 w-full border text-nowrap rounded-e-md bg-black text-white hover:bg-black/50 border-black dark:border-white cursor-pointer'
        >buy</button>
      </div> */}
    </div>
    {isOpen ? (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className='fixed inset-0 content-center z-50 backdrop-blur-xs'
      >
        <div className='h-[80%] w-[80%] m-auto bg-white dark:bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden border-2 relative'>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-12 lg:col-span-6 p-10 pe-2 relative'>
              <div className='flex gap-3'>
                <div className='w-24 h-24 border rounded-lg overflow-hidden bg-white p-2'>
                  <img src={product.image} className='h-full w-full object-contain' alt="" />
                </div>
                <div className='border rounded-lg overflow-hidden bg-white p-3 w-full aspect-square relative'>
                  <img src={product.image} className='h-full w-full object-contain' alt="" />
                  <button onClick={wishlist ? removeWishlist : addWishlist} className='absolute top-4 right-3 cursor-pointer outline-none'>
                    {!wishlist ? (
                      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                    ): (
                      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#ff0000" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                    )}
                  </button>
                </div>
              </div>
              <div className='flex mt-3 absolute left-0 right-0 overflow-hidden rounded-e-full border-2 border-s-0'>
                <button 
                  onClick={isInCart && isUserLogin ? goToCart : addCartItem}
                  className='w-full p-3 bg-white text-black hover:bg-gray-300 duration-200 cursor-pointer'
                  >{isInCart && isUserLogin ? 'go to cart' : 'add to cart'}</button>
                <button className='w-full p-3 bg-gray-800 hover:bg-gray-800/70 text-white cursor-pointer'>Buy</button>
              </div>
            </div>
            <button 
              className='font-semibold text-sm min-[900px]:text-2xl text-white bg-black absolute top-0 right-0 py-2 px-4 aspect-square border-b-2 border-s-2 dark:border-white rounded-bl-xl hover:bg-white hover:text-black duration-200 cursor-pointer'
              onClick={() => setIsOpen(prev => !prev)}
            >X</button>
            <div className='col-span-12 lg:col-span-6 p-10 ps-2 max-lg:ms-3 capitalize'>
              <h3 className='font-semibold'>{product.brand}</h3>
              <div className='font-bold text-2xl'>{product.name}</div>
              <p className='mt-5'>{product.description}</p>
              <div className='font-semibold mt-3 text-green-500'>₹ {product.price.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </motion.div>
    ) : null}
    </>
  )
}

export default Card