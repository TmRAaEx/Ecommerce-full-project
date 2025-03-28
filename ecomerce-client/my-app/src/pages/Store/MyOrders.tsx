import {useOrders} from "@hooks/useOrders.ts";
import Cookies from "js-cookie";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import IOrder from "@interfaces/IOrder.ts";
import OrderDetails from "@components/Shop/OrderDetails.tsx";

export default function MyOrders() {
    const navigate = useNavigate();
    const {getOrdersByCustomerId} = useOrders();

    const [orders, setOrders] = useState<IOrder[]>([]);
    const [customerCookie, setCustomerCookie] = useState<any>(null);

    useEffect(() => {
        if (!customerCookie) {
            // navigate("/login");
            return;
        }
        const customer = customerCookie.customer;

        const getData = async () => {
            const customerOrders = await getOrdersByCustomerId(customer.id, customer.token);
            console.log(customerOrders);
            setOrders(customerOrders);
        };

        getData().then();
    }, [customerCookie, navigate]);

    useEffect(() => {
        const customerData = Cookies.get("customer");
        if (customerData) {
            setCustomerCookie(JSON.parse(customerData));
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

            {/* Render orders if there are any */}
            {orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id}>
                            <OrderDetails
                                order_items={order.order_items}
                                order_status={order.order_status}
                                total_price={order.total_price}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}
