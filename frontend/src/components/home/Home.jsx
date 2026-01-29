import React, { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useUser } from '../../contexts/userContext';
import axios from 'axios';

function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [ordersCount, setOrdersCount] = useState(0)

  const {currentUser} = useUser()

  useEffect(() => {
    const fetchOrdersCount = async () => {
      if (currentUser?._id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/orders?userId=${currentUser._id}`
          )
          setOrdersCount(response.data?.length || 0)
        } catch (error) {
          setOrdersCount(0)
        }
      }
    }

    fetchOrdersCount()
  }, [currentUser?._id])

  const categories = [
        'Smart Phones',
        'Laptops',
        'Television',
        'Wearables',
        'Footwear',
        'Kitchen Appliances',
        'Audio',
  ];

  const toggleSidebar = () =>{
    const sidebar = document.getElementById('sidebar')
    if(sidebar.style.left == '0%'){
      sidebar.style.left = '-100%'
      setIsOpen(prev => !prev)
    } else {
      sidebar.style.left = '0%'
      setIsOpen(prev => !prev)
    }
  }
  
  return (
    <>
      <div className="dark:text-white">
        <div className="grid grid-cols-12 relative">
          <div id='sidebar' className="z-10 duration-500 ease-in-out max-[900px]:border-e dark:border-white md:col-span-3 lg:col-span-3 xl:col-span-2 2xl:col-span-2 max-[900px]:fixed max-[900px]:bg-white dark:max-[900px]:bg-gradient-to-r from-gray-900 to-gray-800 h-full max-[900px]:left-[-100%]">
            <button onClick={toggleSidebar} className='dark:text-white absolute right-3 top-3 border text-sm p-1 rounded-md hover:bg-white hover:text-black hover:border-white duration-200 hidden max-[900px]:inline'>close</button>
            <div className='px-8 py-5 dark:text-white font-semibold text-center'>
              <div onClick={isOpen ? toggleSidebar : null} className='mb-3'>
                <NavLink 
                  to=''
                  className={({isActive})=>`${isActive ? 'font-bold text-blue-400 dark:text-purple-400' : ''}`}
                >
                  <div className='flex items-center m-auto gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 640 512"><path fill="currentColor" d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6l0 167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5l0-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128l2.2 0z"/></svg>
                    <div>Products</div>
                  </div>
                </NavLink>
              </div>
              <div onClick={isOpen ? toggleSidebar : null} className='mb-3'>
                <NavLink 
                  to='orders'
                  className={({isActive})=>`${isActive ? 'font-bold text-blue-400 dark:text-purple-400' : ''} `}
                >
                  <div className='flex items-center m-auto gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 640 512"><path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l16 0c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                    <div className='relative'>
                      <div className='text-[10px] bg-red-500 absolute px-1 rounded-full top-[-4px] right-[-12px] text-white'>{ordersCount}</div>
                      Orders
                    </div>
                  </div>
                </NavLink>
              </div>
              <div onClick={isOpen ? toggleSidebar : null} className='mb-3'>
                <NavLink 
                  to='wishlist'
                  className={({isActive})=>`${isActive ? 'font-bold text-blue-400 dark:text-purple-400' : ''}`}
                >
                  <div className='flex items-center m-auto gap-1'>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                    <div className='relative'>
                      <div className='text-[10px] bg-red-500 absolute px-1 rounded-full top-[-4px] right-[-12px] text-white'>{currentUser?.wishlistItems?.length}</div>
                      Wishlist
                    </div>
                  </div>
                </NavLink>
              </div>
              <div>
                <div className='flex items-center m-auto gap-1 border-b-2 pb-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="currentColor" d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"/></svg>
                  <div>Categories</div>
                </div>
                <div>
                  <div className='ms-5 border-s-2'>
                    {categories.map((category) => (
                      <div key={category} className='flex items-center gap-1 py-2 cursor-pointer text-nowrap'>
                        <hr className='border w-5' />
                        <input type="checkbox" defaultChecked id={category} />
                        <label htmlFor={category}>{category}</label>
                      </div>
                    ))}
                  </div>
                  <div className='flex gap-2 text-xs'>
                    <button className='py-2 px-3 border rounded-md hover:bg-gray-600 hover:text-white duration-200 active:bg-gray-500'>Apply</button>
                    <button className='py-2 px-3 border rounded-md bg-gray-600 text-white hover:bg-white hover:text-gray-800 duration-200 active:bg-gray-200'>Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={toggleSidebar} className='ps-[4px] bg-black dark:bg-white max-[900px]:absolute h-full left-1.5 rounded-full top-5 cursor-pointer min-[900px]:hidden'></button>
          <div id='backGround' onClick={toggleSidebar} className={`${!isOpen ? 'hidden' : ''} duration-500 opacity-0 fixed z-[5] bg-black/20 dark:bg-gray-500/10 w-screen h-full backdrop-blur-xs`}></div>
          <div 
            className="border-s dark:border-white p-2 md:p-5 max-[900px]:col-span-12 max-[900px]:ms-4 min-[900px]:col-span-9 lg:col-span-9 xl:col-span-10 2xl:col-span-10 shadow-[inset_0_0_30px_#0000007f] rounded-tl-xl overflow-y-scroll"
            style={{height: 'calc(100vh - 4.35rem)'}}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home