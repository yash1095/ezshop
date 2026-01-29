import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from "./components/home/Home.jsx"
import About from './components/about/About.jsx'
import Contact from './components/contact/Contact.jsx'
import Products from './components/home/products/Products.jsx'
import Checkout from './components/checkout/Checkout.jsx'
import Orders from './components/home/Orders.jsx'
import OrderDetail from './components/orders/OrderDetail.jsx'
import Wishlist from './components/home/Wishlist.jsx'
import Cart from './components/home/Cart/Cart.jsx'
import Admin from './admin/Admin.jsx'
import Dashboard from './admin/Dashboard.jsx'
import AddProducts from './admin/AddProducts.jsx'
import ProductList from './admin/ProductList.jsx'
import Login from './Login/Login.jsx'
import Profile from './components/profile/Profile.jsx'
import Signin from './signin/Signin.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<Layout />}>
      <Route path='/' element={<App />} >
        <Route path='' element={<Home />}>
          <Route path='' element={<Products />} />
          <Route path='orders' element={<Orders />} />
          <Route path='order/:id' element={<OrderDetail />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='login' element={<Login />} />
        <Route path='signin' element={<Signin />} />
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path='admin' element={<Admin />}>
        <Route path='' element={<Dashboard />} />
        <Route path='addproducts' element={<AddProducts />} />
        <Route path='productlist' element={<ProductList />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
