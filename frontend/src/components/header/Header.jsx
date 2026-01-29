import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Login from '../../Login/Login'
import Switch from './Switch'
import { useUser } from '../../contexts/userContext'
import profile from '../../assets/profile.png'
import Profile from '../profile/Profile'
import $ from 'jquery'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { isUserLogin, currentUser } = useUser()

  $('#menu').slideUp(0);
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
    $('#menu').slideToggle();
  }

  return (
    <>
    <div className="m-auto py-4 min-[900px]:pe-4 justify-center items-center grid grid-cols-12 dark:text-white border-b">
      <div className='max-[900px]:col-span-12 min-[900px]:col-span-3 lg:col-span-3 xl:col-span-2 2xl:col-span-2 px-4 flex items-center'>
        <Link
          to=''
          className='font-bold text-3xl'
        ><h1>EZShop</h1></Link>
        <span className='ms-auto font-bold min-[900px]:hidden'>
          <button onClick={toggleMenu} className='cursor-pointer'>Menu</button>
        </span>
      </div>
      <nav id='menu' className={`ps-2 min-[900px]:!overflow-visible min-[900px]:!flex items-center gap-5 min-[900px]:col-span-9 max-[900px]:px-8 max-[900px]:mt-4 lg:col-span-9 xl:col-span-10 2xl:col-span-10 max-[900px]:col-span-12  ${isMenuOpen ? '' : 'max-[900px]:hidden'}`}>
        <div className='flex'>
          <input type="search" placeholder='Search' className='max-[900px]:w-full border border-e-0 font-semibold py-1 px-2 rounded-s-md outline-none dark:text-white text-black' />
          <button className='bg-gray-400 hover:bg-gray-500 px-4 rounded-e-md border cursor-pointer duration-200'>
            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
          </button>
        </div>
        <ul className='flex max-[900px]:flex-col gap-3 max-[900px]:my-3 ms-auto'>
          <li>
            <NavLink
              to=''
              onClick={toggleMenu}
              className={({isActive})=>`${isActive ? 'font-bold' : 'font-normal'}`}
            >Home</NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              onClick={toggleMenu}
              className={({isActive})=>`${isActive ? 'font-bold' : 'font-normal'}`}
            >About</NavLink>
          </li>
          <li>
            <NavLink
              to='/contact'
              onClick={toggleMenu}
              className={({isActive})=>`${isActive ? 'font-bold' : 'font-normal'}`}
            >Contact</NavLink>
          </li>
        </ul>
        <div className='flex gap-1 justify-end items-center'>
          <button className='border relative rounded py-1 px-2 me-2 cursor-pointer hover:bg-slate-900 hover:text-white active:bg-white active:text-black duration-200 dark:hover:bg-white dark:hover:text-black'>
            <div className='text-[10px] bg-red-500 absolute px-1 rounded-full top-[-10px] right-[-8px] text-white'>{isUserLogin ? currentUser?.cartItems.length : 0 }</div>
            <NavLink to={'cart'} onClick={toggleMenu}>Cart</NavLink>
          </button>
          {isUserLogin ? (
            <>
              <NavLink 
                to={'/profile'}
                onClick={toggleMenu}
                className='h-8 w-8 border-2 rounded-full overflow-hidden cursor-pointer duration-200 hover:ring-4 hover:ring-blue-400'
              >
                  <img src={currentUser?.image ? (currentUser.image) : (profile)} id='proimg' className='w-full h-full object-cover text-xs' alt="profile" />
              </NavLink>
            </>
          ): (
            <NavLink to={'/login'} onClick={toggleMenu}
             >
              <button className='border rounded py-1 px-2 cursor-pointer hover:bg-slate-900 hover:text-white active:bg-white active:text-black duration-200 dark:hover:bg-white dark:hover:text-black'>
                Login
              </button>
            </NavLink>
          )}
          <div>
            <Switch />
          </div>
        </div>
      </nav>
    </div>
    </>
  )
}

export default Header