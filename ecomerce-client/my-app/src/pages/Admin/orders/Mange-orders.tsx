import {useOrders} from "@hooks/useOrders.ts";
import OrderCard from "@components/Admin/Order/Order.tsx";
import LoadingOrder from "@components/Admin/Order/LoadingOrder.tsx";

export default function ManageOrders() {
    const {orders = [], error, loading, deleteOrder, updateOrder} = useOrders()


    if (error) return <>{error}</>


    return <ul className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mx-auto">
        {loading && orders.length === 0 && (
            <li className="col-span-full">
                <LoadingOrder/>
            </li>
        )}

        {orders?.map((order) => (
            <li key={order.id}>
                <OrderCard order={order} deleteOrder={deleteOrder} updateOrder={updateOrder}/>
            </li>
        ))}
    </ul>

}