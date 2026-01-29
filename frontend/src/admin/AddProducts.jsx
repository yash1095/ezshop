import React, { useEffect, useState } from 'react'
import { useProduct } from '../contexts/ProductContext'
import { toast } from 'sonner'

export default function ProductForm() {
    const [image, setImage] = useState(null)
    const [brand, setBrand] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')

    const {products,addProduct, isEditable, setIsEditable, productId, updateProduct} = useProduct()

    const categories = [
        'Smart Phones',
        'Laptops',
        'Television',
        'Wearables',
        'Footwear',
        'Kitchen Appliances',
        'Audio',
    ];

    const handleImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const image = reader.result
            setImage(image)
        }
    }

    const add = (e) => {
        e.preventDefault()
        if(image && brand && name && description && price){
            addProduct(image, brand, name, description, price, category)
            setImage(null)
            setBrand('')
            setName('')
            setDescription('')
            setPrice('')
            setCategory('')
            toast.success('new product added.')
        }
        
    }

    const update = () => {
        updateProduct(productId, image, brand, name, description, price, category)
        setIsEditable(false)
        setImage(null)
        setBrand('')
        setName('')
        setDescription('')
        setPrice('')
        setCategory('')
        toast.success('product updated')
    }

    useEffect(() => {
        if (isEditable) {
            const product = products.find((product) => product._id === productId)
            if (product) {
                setImage(product.image);
                setBrand(product.brand);
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category);
            }
        }
    },[isEditable, productId, products])

  return (
    <div className='max-w-xl p-8 rounded-md bg-gray-200 dark:bg-gray-500/20 m-auto border shadow-xl'>
        <h2 className='font-bold text-3xl'>Add Products</h2>
        <div className='mt-4'>
            <img 
                src={image}
                className='border rounded-md w-[50%] aspect-square overflow-hidden dark:border-white object-contain bg-white text-black' 
                alt="Product Image"
            />
            <input 
                type="file"
                accept='image'
                value={''}
                className='border dark:border-white mt-2 rounded-md p-1'
                onChange={handleImage}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor="brand">Brand</label>
            <input 
                type="text" 
                value={brand}
                id='brand'
                className='border w-full outline-blue-400 dark:border-white mt-2 rounded-md p-1 '
                onChange={(e) => setBrand(e.target.value)}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor="name">Product Name</label>
            <input 
                type="text" 
                value={name}
                id='name'
                className='border w-full outline-blue-400 dark:border-white mt-2 rounded-md p-1'
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        
        <div className='mt-4'>
            <label htmlFor="price">Price</label>
            <input 
                type="number" 
                value={price}
                id='price'
                className='border w-full outline-blue-400 dark:border-white mt-2 rounded-md p-1'
                onChange={(e) => setPrice(e.target.value)}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor="categories">Category</label>
            <select id="categories" value={category} onChange={(e) => setCategory(e.target.value)}
                className='w-full border rounded-md p-1 dark:bg-gray-700'    
            >
                <option value="">-- choose a category --</option>
                {
                    categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))
                }
            </select>
        </div>
        <div className='mt-4'>
            <label htmlFor="desc">Description</label>
            <textarea 
                type="text" 
                value={description}
                id='desc'
                className='border w-full outline-blue-400 dark:border-white mt-2 rounded-md p-1'
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div className='mt-4'>
            {!isEditable ? (
                <button 
                    className='py-2 px-4 bg-blue-500 rounded-md hover:bg-blue-400'
                    onClick={add}
                >add</button>
            ) : (
                <button 
                    className='py-2 px-4 bg-blue-500 rounded-md hover:bg-blue-400'
                    onClick={update}
                >save changes</button>
            )}
        </div>
    </div>
  )
}
