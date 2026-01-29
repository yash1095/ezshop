import { createContext, useContext } from "react";

export const ProductContext = createContext({
    products: [
        {
            _id: 1,
            image: null,
            brand: 'apple',
            name: 'test Product',
            description: 'kuch bhi chalega',
            price: 0,
            category: ''
        }
    ],
    addProduct: () => {},
    deleteProduct: () => {},
    updateProduct: () => {},
    isEditable: false,
    setIsEditable: () => {},
    productId: null,
    setProductId: () => {},
})

export const useProduct = () => {
    return useContext(ProductContext)
}

export const ProductContextProvider = ProductContext.Provider