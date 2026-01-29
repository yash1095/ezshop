import React from 'react'
import {useProduct} from '../../../contexts/ProductContext'
import Card from './Card'

function Products() {
  const {products} = useProduct()
  return (
    <div className='grid grid-cols-12 gap-2 md:gap-4'>
      {products.map((product) => (
        <div key={product._id} className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3'>
          <Card product={product} />
        </div>
      ))}
    </div>
  )
}

export default Products