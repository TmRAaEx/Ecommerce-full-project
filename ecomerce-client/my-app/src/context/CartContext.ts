import {createContext} from "react";
import {ICartItem} from "@interfaces/IProduct.ts";


interface ICartContext {
    cartItems: ICartItem[];
    addToCart: (item: ICartItem) => void;
    removeFromCart: (item: ICartItem) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartTotalItems: () => number,
    deleteCartItem: (id: ICartItem["id"]) => void;
}

export const CartContext = createContext<ICartContext>({
    cartItems: [],
    addToCart: () => {
    },
    removeFromCart: () => {
    },
    clearCart: () => {
    },
    getCartTotal: () => 0,
    getCartTotalItems: () => 0,
    deleteCartItem: () => {
    }
});