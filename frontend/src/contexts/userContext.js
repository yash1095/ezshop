import { createContext, useContext } from "react";

export const UserContext = createContext({
    users: [
        {
            userName: 'user unknown',
            email: 'user@email.com',
            password: 'user@123',
            image: 'image',
            address: 'adderess',
            cartItems: [
                {
                    productId: null,
                    quantity: 1,
                }
            ],
            wishlistItems: []
        }
    ],
    addUser: () => {},
    updateUser: () => {},
    addCurrentUser: () => {},
    addToCart: () => {},
    fetchUsers: () => {},
    setIsUserLogin: () => {},
    isUserLogin: null,
    currentUser: null,
    removeFromCart: () => {},
    updateQty: () => {},
    addToWishlist: () => {},
    removeFromWishlist: () => {},
    updateCurrentUser: () => {},
})

export const useUser = () => {
    return useContext(UserContext)
}

export const UserContextProvider = UserContext.Provider