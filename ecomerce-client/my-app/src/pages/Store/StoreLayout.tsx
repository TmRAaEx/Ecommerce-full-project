import {Outlet} from "react-router";
import {CartProvider} from "@providers/CartProvider.tsx";
import ShopHeader from "@components/Shop/ShopHeader.tsx";

export default function StoreLayout() {

    return <>
        <CartProvider>
            <ShopHeader/>
            <main>
                <Outlet></Outlet>
            </main>
        </CartProvider>
    </>
}