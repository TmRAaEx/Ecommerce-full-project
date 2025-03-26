import {NavLink} from "react-router";
import CartIcon from "@ui/CartIcon.tsx";
import {useContext} from "react";
import {CartContext} from "@context/CartContext.ts";

export default function ShopHeader() {

    const {getCartTotalItems} = useContext(CartContext);
    return (
        <div className={"w-full bg-mainBG h-25 flex flex-col justify-between"}>
            <p className={"flex w-fit h-fit text-white text-2xl p-2"}>Store</p>
            <nav className={"bg-accent w-full flex-grow flex justify-evenly align-center"}>
                <NavLink to={"/products"}><p className={"text-white text-lg"}>Products</p></NavLink>
                <NavLink to={"/categories"}><p className={"text-white text-lg"}>Categories</p></NavLink>
                <NavLink to={"/cart"}>
                    <p className="text-white text-lg flex flex-row items-center gap-1 relative">
                        Cart
                        <span className="relative">
                                <CartIcon/>
                            {getCartTotalItems() > 0 ?
                                <span
                                    className="absolute top-3 -right-1 bg-blue-500 text-white text-xs
                                font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {getCartTotalItems()}
                            </span>
                                : null}
                            </span>
                    </p>
                </NavLink>
            </nav>
        </div>
    )
}