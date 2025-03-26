import {ReactNode, useEffect, useState} from "react";
import {ICartItem} from "@interfaces/IProduct.ts";
import {CartContext} from "@context/CartContext.ts";


export const CartProvider = ({children}: { children: ReactNode }) => {
    const cachedCart = localStorage.getItem("cartItems");
    const [cartItems, setCartItems] = useState<ICartItem[]>(cachedCart ? JSON.parse(cachedCart) : []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);


    const addToCart = (item: ICartItem) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
        if (isItemInCart) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? {
                            ...cartItem,
                            quantity: item.quantity ? (item.quantity > item.stock ? item.stock : item.quantity) : (cartItem.quantity ? cartItem.quantity : 1) + 1
                        }
                        : cartItem
                )
            );
        } else {
            setCartItems([...cartItems, {...item, quantity: 1}]);
        }
    };

    const removeFromCart = (item: ICartItem) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
        if (!isItemInCart) return;
        if (isItemInCart.quantity === 1) {
            setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
        } else {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? {...cartItem, quantity: (cartItem.quantity ? cartItem.quantity : 1) - 1}
                        : cartItem
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };


    const deleteCartItem = (id: ICartItem["id"]) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.id === id);
        if (!isItemInCart) return;
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * (item.quantity ? item.quantity : 1), 0);
    };

    const getCartTotalItems = () => {

        return cartItems.reduce((total, item) => total + (item.quantity ? item.quantity : 1), 0);
    }


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getCartTotal,
                getCartTotalItems,
                deleteCartItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}