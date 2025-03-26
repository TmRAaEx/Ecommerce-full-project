import {useContext} from "react";
import {CartContext} from "@context/CartContext.ts";
import CartItem from "@components/Shop/CartItem.tsx";
import {DangerButton, SubmitButton} from "@ui/Buttons.tsx";
import {useNavigate} from "react-router";
import Price from "@ui/Price.tsx";


export default function Cart() {
    const {cartItems, getCartTotal, clearCart} = useContext(CartContext);
    const navigate = useNavigate();



    return (
        <ul className="flex flex-col bg-white max-w-3xl p-5 mx-auto divide-y-2 divide-gray-300 shadow-lg rounded-lg">
            {cartItems.length > 0 ? (
                    <>
                        {
                            cartItems.map((item) => (
                                <li key={item.id} className="flex items-center h-24 w-full p-2 gap-4">
                                    <CartItem item={item}/>
                                </li>
                            ))}


                        {/* Total Price */}
                        <li className="flex justify-between items-center text-xl font-bold text-gray-900 p-4 bg-gray-100 rounded-b-lg my-2">
                            <span>Total Price:</span>
                            <span><Price price={getCartTotal()}/>
                </span>
                        </li>
                        <li>
                            <DangerButton onClick={clearCart}>
                                Clear cart
                            </DangerButton>
                        </li>
                        <li>
                            <SubmitButton onClick={() => navigate("/checkout/personal-info")}>Continue to
                                checkout</SubmitButton>
                        </li>
                    </>
                ) :
                <h1>Your cart is empty!</h1>
            }
        </ul>
    )
        ;
}
