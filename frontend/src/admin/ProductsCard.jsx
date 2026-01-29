import React from 'react'
import { useProduct } from '../contexts/ProductContext'
import { NavLink, useNavigate } from 'react-router-dom'

function ProductsCard({product}) {

    const navigate = useNavigate()

    const {deleteProduct,setProductId, setIsEditable} = useProduct()

    const editProduct = () => {
        setProductId(product._id);
        setIsEditable(true);
        navigate('/admin/addproducts')
    }

  return (
    <>
        <td className='flex gap-3 items-center p-2'>
            <div className='h-16 w-16 rounded-md bg-white overflow-hidden p-2'>
                <img src={product.image} className='h-full w-full object-contain' alt="product img" />
            </div>
        </td>
        <td className='p-2'>{product.name}</td>
        <td className='p-2'>#{product._id}</td>
        <td className='p-2'>{product.price}</td>
        <td className='p-2'>0</td>
        <td className='p-2'>0</td>
        <td className='p-2'>
            <button 
                onClick={editProduct}
                className='bg-green-500 py-1 px-2 font-semibold border-2 rounded-md hover:bg-green-700 duration-200'
            >edit</button>
        </td>
        <td className='p-2 text-center'>
            <button
                onClick={() => deleteProduct(product._id)}
                className='bg-red-500 text-white py-1 px-2 rounded-md border-2 font-semibold hover:bg-red-600 duration-200 cursor-pointer'
            >remove</button>
        </td>
    </>
  )
}

export default ProductsCard