import React from 'react'
import { useProduct } from '../contexts/ProductContext'
import ProductsCard from './ProductsCard'

function ProductList() {

    const {products} = useProduct()

  return (
    <table className='table-auto border-2 text-center text-white'>
        <thead>
            <tr className='bg-gray-700 border-2 text-start'>
                <td></td>
                <td className='p-2'>Product</td>
                <td className='p-2'>Product Id</td>
                <td className='p-2'>Price</td>
                <td className='p-2'>Quantity</td>
                <td className='p-2'>Sale</td>
                <td className='p-2'></td>
                <td className='p-2'></td>
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) =>(
                <tr key={product._id} className={`${index % 2 === 0 ? 'bg-gray-600' : ''} rounded-md hover:bg-blue-400 p-3 items-center border-2`}>
                    <ProductsCard product={product} />
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default ProductList