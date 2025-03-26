import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {useCallback, useContext} from "react";
import apiClient from "../../../services/requests.ts";
import {CartContext} from "@context/CartContext.ts"
import {IStripeData} from "@interfaces/IStripeData.ts";
import {useNavigate, useSearchParams} from "react-router";
import {DangerButton} from "@ui/Buttons.tsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);


interface IStripeClientSecret {
    clientSecret: string;
}

export default function Checkout() {

    const {cartItems} = useContext(CartContext);
    const [searchParams] = useSearchParams()
    const orderID = searchParams.get("orderID");
    const navigate = useNavigate();


    const handleCancel = async () => {
        navigate("/products")
    }


    // useEffect(() => {
    //     const deleteOrder = async () => {
    //         try {
    //             console.log("Unmounted");
    //             await apiClient.delete(`orders/${orderID}`);
    //             console.log("Order deleted");
    //         } catch (error) {
    //             console.error("Error deleting order:", error);
    //         }
    //     };
    //
    //     return () => {
    //         deleteOrder();
    //     };
    // }, [orderID]);

    //!WARNING: gets triggered by PAYING so it won´t work

    const fetchClientSecret = useCallback(async () => {
        // Create a Checkout Session

        const items: IStripeData[] = cartItems.map((item) => ({
                price_data: {
                    currency: "SEK",
                    product_data:
                        {
                            name: item.name,
                            images:
                                [item.image]
                        }
                    ,
                    unit_amount: item.price * 100
                }
                ,

                quantity: item.quantity as number
            })
        )

        const data = await apiClient.post<IStripeClientSecret>("/checkout/create-session", {
            items: items,
            orderID: orderID
        });

        return data.clientSecret;
    }, []);

    const options = {fetchClientSecret};

    return (
        <div id="checkout">

            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout/>
            </EmbeddedCheckoutProvider>
            <div className={"max-w-[500px] mx-auto my-5"}>
                <DangerButton onClick={handleCancel}>Cancel</DangerButton>
            </div>
        </div>
    )
}