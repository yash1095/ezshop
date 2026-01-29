import React from 'react'
import {useProduct} from '../../contexts/ProductContext'
import Card from '../home/products/Card'
import { useUser } from '../../contexts/userContext'

function Wishlist() {
  const {products} = useProduct()
  const {currentUser} = useUser()
  return (
    <div className='grid grid-cols-12 gap-2 md:gap-4'>
      {currentUser?.wishlistItems?.map((item) => {
        const wishlistItem = products?.find((product) => product?._id === item);
        return wishlistItem && (
          <div key={wishlistItem?._id} className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3'>
            <Card product={wishlistItem} />
          </div> 
        )
      })}
    </div>
  )
}


export default Wishlist