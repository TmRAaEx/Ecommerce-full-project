import {Link, useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import apiClient from "../../../services/requests.ts";
import {IStripeSession} from "@interfaces/IStripeData.ts";
import {useNavigate} from "react-router";
import {useOrders} from "@hooks/useOrders.ts";
import IOrder from "@interfaces/IOrder.ts";
import OrderItem from "@components/Shop/OrderItem.tsx";
import CartIcon from "@ui/CartIcon.tsx";
import {useContext} from "react";
import {CartContext} from "@context/CartContext.ts";

export default function OrderConfirmation() {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get("session_id");

    const [sessionData, setSessionData] = useState<IStripeSession | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const [order, setOrder] = useState<IOrder | null>(null);
    const {clearCart} = useContext(CartContext)

    const {getOrderByPaymentID} = useOrders();

    useEffect(() => {
        const getSessionData = async () => {
            if (!session_id) return;

            try {
                setLoading(true);
                const session = await apiClient.get<IStripeSession>(`/checkout/session-status?session_id=${session_id}`);

                if (session.status === "open") {
                    setError("Something went wrong. Please try again.");
                    navigate(-1)
                } else if (session.status === "complete") {
                    setSessionData(session);
                    clearCart()
                    localStorage.removeItem("customer");

                    const order = await getOrderByPaymentID(session_id)
                    setOrder(order)
                } else {
                    setError("Unknown error. Please try again.");
                }
            } catch (err) {
                setError("Failed to fetch session data.");
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        getSessionData();
    }, [session_id]);

    if (loading) return <div className="text-center text-lg font-semibold">Loading order details...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 text-center bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>

            {sessionData ? (
                <div className="text-lg">

                    {sessionData.status === "complete" ? (
                        <>
                            <p className="text-green-500 font-semibold mt-4">Thank you! Your order is confirmed. 🎉</p>
                            <ul className="flex flex-col gap-3">{order?.order_items.map(item => <OrderItem
                                item={item}/>)}</ul>
                        </>
                    ) : (
                        <p className="text-yellow-500 font-semibold mt-4">Your order is still processing.</p>
                    )}
                </div>
            ) : (
                <p>No session data found.</p>
            )}
            <Link to={"/products"}>
                <button
                    className={"w-full border-white rounded bg-blue-700 p-3 mt-2 text-white flex justify-around"}>Continue
                    shopping<CartIcon/>
                </button>
            </Link>
        </div>
    );
}
