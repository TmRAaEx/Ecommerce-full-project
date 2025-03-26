import {ICartItem} from "@interfaces/IProduct.ts";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {CartContext} from "@context/CartContext.ts";
import Price from "@ui/Price.tsx";

export default function CartItem({item}: { item: ICartItem }) {

    const {addToCart, removeFromCart, deleteCartItem} = useContext(CartContext);
    const [quantity, setQuantity] = useState(item.quantity);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        let newQuantity = parseInt(value);

        setQuantity(newQuantity);
        if (newQuantity > 0) {
            addToCart({...item, quantity: newQuantity});
        }
    }

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);


    return (

        <>
            {/* Product Image */}
            <img src={item.image} alt={item.name} className="w-20 h-20 object-scale-down"/>

            {/* Product Details */
            }
            <div className="flex flex-col flex-grow max-w-1/2">
                <p className="text-md/4 font-semibold line-clamp-2">{item.name}</p>
                <p className="text-gray-500">{item.category}</p>
            </div>

            {/* Quantity Controls */
            }
            <div className={"flex flex-col justify-between gap-3"}>
                <span className="flex items-center justify-between w-full">
                    <p className="font-semibold text-lg text-end">
                        <Price price={item.price}/></p>
                    <button
                        onClick={() => deleteCartItem(item.id)}
                        className="bg-red-500 text-white w-7 h-7 rounded-2xl text-sm/7 font-semibold hover:bg-red-600 transition"
                    >
                            ✕
                    </button>
                </span>

                <div className="flex items-center gap-2">
                    <span className={"text-gray-500"}>(max: {item.stock})</span>
                    <button
                        className="bg-gray-200 w-7 h-7 flex text-center  items-center justify-center rounded-md  font-bold hover:bg-gray-300"
                        onClick={() => removeFromCart(item)}
                    >
                        <p className={"text-lg/7"}>
                            −
                        </p>
                    </button>

                    <input
                        type="number"
                        value={quantity}
                        max={item.stock}
                        onChange={handleChange}
                        className="w-12 h-8 text-center border border-gray-300 rounded-md"
                    />

                    <button
                        className="bg-gray-200 w-7 h-7 flex  text-center items-center justify-center rounded-md  font-bold hover:bg-gray-300"
                        onClick={() => addToCart({...item, quantity: item.quantity as number + 1})}
                    >
                        <p className={"text-lg/7"}>
                            +
                        </p>
                    </button>
                </div>
            </div>
        </>
    )
}