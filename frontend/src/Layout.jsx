import { Outlet } from "react-router-dom"
import Header from "./components/header/Header"
import { useEffect, useState } from "react"
import { ProductContextProvider } from "./contexts/ProductContext"
import { UserContextProvider } from "./contexts/userContext"
import axios from "axios"
// import {ToastContainer, toast} from 'react-toastify'
import {Toaster, toast} from 'sonner'
import Loader from "./components/Loader"

function Layout() {
  const [products, setProducts] = useState([])
  const [isEditable, setIsEditable] = useState(false)
  const [productId, setProductId] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    const responce = await axios.get('http://localhost:3000/products')
    if(responce.data && responce.data.products){
      setProducts(responce.data.products)
    }
  }

  const addProduct = async (image, brand, name, description, price, category) => {
    await axios.post('http://localhost:3000/products', {image, brand, name, description, price, category})
    .then(() => fetchProducts())
    .catch(err => console.log(err))
  }

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`)
    .then(() => fetchProducts())
    .catch(err => console.log(err))
  }

  const updateProduct = async (id, image, brand, name, description, price, category) => {
    await axios.put(`http://localhost:3000/products/${id}`, {image, brand, name, description, price, category})
    .then(() => fetchProducts())
    .catch(err => console.log(err))
  }


  useEffect(() => {
    const fetchAllData = async () => {
      await fetchProducts();
      await fetchUsers();
      // Restore logged-in user from localStorage (if any)
      updateCurrentUser();
      setLoading(false);
    };
    fetchAllData();
  }, []);




  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState('')



  const fetchUsers = async () => {
    const responce = await axios.get('http://localhost:3000/users')
    if(responce.data){
      setUsers(responce.data)
    }
  }

  const addUser = async (username, email, password) => {
    await axios.post('http://localhost:3000/users', {username, email, password});
  }

  // useEffect(() => {
  //   fetchUsers()
  // },[])

  const updateCurrentUser = () => {
    const activeUser = localStorage.getItem('currentuser');
    if(activeUser && activeUser.length > 0){
      addCurrentUser(activeUser);
    }
  }


  const addCurrentUser = (id) => {
    // Fetch current user directly from server to ensure up-to-date data
    if (!id) return;
    axios.post('http://localhost:3000/users/currentUser', { userId: id })
      .then((res) => {
        if (res.data) setCurrentUser(res.data);
      })
      .catch((err) => console.error('Failed to load current user:', err));
  }

  const updateUser = async (id, image, username, address) => {
    await axios.put(`http://localhost:3000/users/${id}`, {image, username, address })
    setCurrentUser(prev => ({...prev, image, username, address}));
  }

  const addToCart = async (userId, productId, quantity, totalPrice) => {
    try {
      const res = await axios.post('http://localhost:3000/cart/add', {
        userId: userId,
        productId: productId,
        quantity: quantity,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        // Update current user with new cart items
        const updatedUser = { ...currentUser };
        updatedUser.cartItems = res.data.data.cartItems;
        setCurrentUser(updatedUser);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      console.error('Add to cart error:', error);
    }
  }

  const removeFromCart = async (userId, productId) => {
    try {
      const res = await axios.post('http://localhost:3000/cart/remove', {
        userId: userId,
        productId: productId,
      });
      if (res.data.success) {
        const updatedUser = { ...currentUser };
        updatedUser.cartItems = updatedUser.cartItems.filter(item => item.productId !== productId);
        setCurrentUser(updatedUser);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove from cart');
      console.error('Remove from cart error:', error);
    }
  }

  const updateQty = async (userId, productId, quantity) => {
    try {
      const res = await axios.post('http://localhost:3000/cart/updateQty', {
        userId: userId,
        productId: productId,
        quantity: quantity,
      });
      if (res.data.success) {
        const updatedUser = { ...currentUser };
        updatedUser.cartItems = updatedUser.cartItems.map(item => 
          item.productId === productId ? {...item, quantity: parseInt(quantity)} : item
        );
        setCurrentUser(updatedUser);
        // Silent update - no toast for auto-sync
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
      console.error('Update quantity error:', error);
    }
  }

  const addToWishlist = async (userId, productId) => {
    const res = await axios.post('http://localhost:3000/wishlist/add',{userId, productId});
    const updatedUser = { ...currentUser };
    if (!updatedUser.wishlistItems) updatedUser.wishlistItems = [];
    updatedUser.wishlistItems.push(productId);
    setCurrentUser(updatedUser);
    toast.success(res.data.message)
  }

  const removeFromWishlist = async (userId, productId) => {
    const res = await axios.post('http://localhost:3000/wishlist/remove',{userId, productId});
    toast.success(res.data.message)
    const updatedUser = { ...currentUser };
    updatedUser.wishlistItems = updatedUser.wishlistItems.filter(item => item !== productId);
    setCurrentUser(updatedUser);
  }

  return (
    <ProductContextProvider value={{products, addProduct, deleteProduct, updateProduct, isEditable,setIsEditable, productId, setProductId}}>
      <UserContextProvider value={{users, fetchUsers, addUser, isUserLogin: currentUser ? true : false, currentUser, addCurrentUser, updateUser, addToCart, removeFromCart, updateQty, addToWishlist, removeFromWishlist, updateCurrentUser, setCurrentUser}}>
        <div className="h-screen overflow-hidden dark:text-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700">
          <Outlet />
          {/* <ToastContainer position="top-center" /> */}
          <Toaster richColors position="top-center" />
          {loading && (
            <div className="fixed inset-0 z-50 bg-white dark:bg-black flex justify-center items-center">
              <Loader />
            </div>
          )}
        </div>
      </UserContextProvider>
    </ProductContextProvider>
  )
}

export default Layout
