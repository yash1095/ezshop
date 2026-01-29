import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Switch from '../components/header/Switch'
import profile from '../assets/profile.png'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    const menu = document.getElementById('menu')
    if(!isMenuOpen) {
      menu.style.height = '100%'
      setIsMenuOpen(prev => !prev)
    } else {
      menu.style.height = '0%'
      setIsMenuOpen(prev => !prev)
    }
  }
  
  
  
  return (
    <>
    <div className="m-auto py-4 min-[900px]:pe-4 justify-center items-center grid grid-cols-12 dark:text-white border-b">
      <div className='max-[900px]:col-span-12 min-[900px]:col-span-3 lg:col-span-3 xl:col-span-2 2xl:col-span-2 px-4 flex items-center'>
        <Link
          to='/'
          className='font-bold text-3xl'
        >EZShop</Link>
        <span className='ms-auto font-bold min-[900px]:hidden'>
          <button onClick={toggleMenu} className='cursor-pointer'>Menu</button>
        </span>
      </div>
      <nav id='menu' className={`ps-2 min-[900px]:flex items-center gap-5 min-[900px]:col-span-9 max-[900px]:px-8 max-[900px]:mt-4 lg:col-span-9 xl:col-span-10 2xl:col-span-10 max-[900px]:col-span-12 max-[900px]:overflow-hidden max-[900px]:h-[0%] ${isMenuOpen ? '' : 'max-[900px]:hidden'} duration-300 ease-in-out`}>
        <div className='flex ms-auto'>
          <input type="search" placeholder='Search' className='max-[900px]:w-full border border-e-0 font-semibold py-1 px-2 rounded-s-md outline-none dark:text-white text-black' />
          <button className='bg-gray-400 hover:bg-gray-500 px-4 rounded-e-md border border-s-0 cursor-pointer duration-200'>
            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
          </button>
        </div>
        <div className='flex gap-2 justify-end items-center'>
          <div>
            <div className='h-8 w-8 border rounded-full overflow-hidden'>
              <img src={profile} className='h-full w-full object-cover' alt="" />
            </div>
          </div>
          <Switch />
        </div>
      </nav>
    </div>
    </>
  )
}

export default Header