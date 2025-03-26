import {OrderCardHeader} from "@components/Admin/Order/OrderHead.tsx";
import {OrderItemRow} from "@components/Admin/Order/OrderItem.tsx";
import {OrderCardFooter} from "@components/Admin/Order/OrderFooter.tsx";
import {useState} from "react";
import IOrder from "@interfaces/IOrder.ts";

export default function LoadingOrder() {
    const isExpanded = false;
    const editingState = useState({
        id: null,
        quantity: {},
    })

    const order: IOrder = {
        id: null,
        customer_id: 0,
        customer_firstname: "Loading",
        customer_lastname: "...",
        order_items: [
            {
                id: 0,
                product_name: "Loading",
                product_id: 0,
                order_id: 0,
                quantity: 0,
                unit_price: 0,
                created_at: ""
            }
        ],
        total_price: 0,
        payment_status: "unpaid",
        payment_id: "null",
        order_status: "pending",
        customer_email: "",
        customer_phone: "",
        customer_city: "",
        customer_country: "",
        customer_postal_code: "",
        customers_created_at: "",
        customer_street_address: "",
        created_at: ""
    }
    return <>
        <div className="w-full max-w-lg min-w-[360px] mx-auto border rounded-lg shadow-lg bg-white overflow-hidden">
            <OrderCardHeader order={order}/>

            <div className="overflow-x-auto max-w-full">
                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-3 text-sm font-semibold text-gray-700">Product</th>
                        <th className="p-3 text-sm font-semibold text-gray-700 text-center">Quantity</th>
                        <th className="p-3 text-sm font-semibold text-gray-700 text-center">Price</th>
                        <th className="p-3 text-sm font-semibold text-gray-700 text-center">Total</th>
                        <th className="p-3 text-sm font-semibold text-gray-700 text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.order_items.map((item) => (
                        <OrderItemRow
                            key={item.id}
                            item={item}
                            editingState={editingState}
                            setEditingState={() => {
                            }}
                            updateQuantity={() => {
                            }}
                            saveQuantity={() => {
                            }}
                            deleteOrderItem={() => {
                            }}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            <OrderCardFooter
                order={order}
                isExpanded={isExpanded}
                toggleExpanded={() => {
                }}
                onDeleteOrder={() => {
                }}
            />
        </div>
    </>
}